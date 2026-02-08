<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class TransactionLoanInstalment extends Model
{
  use HasFactory;

  protected $fillable = [
    "transaction_loan_id",
    "transaction_loan_officer_grouping_id",
    "transaction_date",
    "nominal",
    "status",
    "instalment_notes",
    "danatitipan",
    "user_mantri",
    "user_input"
  ];


  protected static function boot()
  {
    parent::boot();

    static::creating(function (self $transactionLoanInstalment) {
      if ($transactionLoanInstalment->nominal <= 0) {
        return;
      }

      DB::transaction(function () use ($transactionLoanInstalment) {
        $recap = TransactionDailyRecap::query()
          ->where('transaction_loan_officer_grouping_id', $transactionLoanInstalment->transaction_loan_officer_grouping_id)
          ->where('date', $transactionLoanInstalment->transaction_date)
          ->firstOrCreate([
            'transaction_loan_officer_grouping_id' => $transactionLoanInstalment->transaction_loan_officer_grouping_id,
            'date'                                 => $transactionLoanInstalment->transaction_date,
          ]);

        $recap->increment('storting', $transactionLoanInstalment->nominal);

        $sumInstalment = TransactionLoan::withSum('loan_instalment', 'nominal')
          ->where('id', $transactionLoanInstalment->transaction_loan_id)
          ->first();

        // dd($sumInstalment);
        if ($sumInstalment) {
          $newTotal = $sumInstalment->loan_instalment_sum_nominal + $transactionLoanInstalment->nominal;
          // dd($newTotal);

          $attrs = ['total_angsuran' => $newTotal];

          // Lunas bila total angsuran ≥ pinjaman (kolom 'pinjaman' atau 'nominal_drop')
          if ($newTotal >= $sumInstalment->pinjaman /* atau $loan->nominal_drop */) {
            $attrs['out_date']   = $transactionLoanInstalment->transaction_date;
            $attrs['out_status'] = 'LUNAS';
          } else {
            $attrs['out_date']   = null;
            $attrs['out_status'] = null;
          }

          $sumInstalment->update($attrs);
        }
      });
    });


    static::deleting(function (self $transactionLoanInstalment): void {

      // Abaikan angsuran bernominal 0 / negatif
      if ($transactionLoanInstalment->nominal <= 0) {
        return;
      }

      /**
       * 1) Jalankan dalam transaksi + retry   (Laravel 10+ bisa pakai attempts=3)
       * 2) Lock parent‑loan dulu, baru lock recap — konsisten agar anti‑deadlock
       */
      DB::connection()->transaction(function () use ($transactionLoanInstalment) {

        /*────────── 1. LOCK & UPDATE PARENT LOAN ──────────*/
        $sumInstalment = TransactionLoan::withSum('loan_instalment', 'nominal')
          ->where('id', $transactionLoanInstalment->transaction_loan_id)
          ->first();


        $freshLoan = self::whereKey($transactionLoanInstalment->id)
          ->first();

        // dd($sumInstalment);
        // Jika parent loan sudah hilang (soft‑deleted / race), keluar
        if (!$freshLoan) {
          return; //
        }
        if (!$sumInstalment) {
          return;
        }

        // Hitung total angsuran setelah baris ini dihapus
        $newTotal = $sumInstalment->loan_instalment_sum_nominal - $transactionLoanInstalment->nominal;
        if ($newTotal < 0) {                 // tidak boleh negatif
          $newTotal = 0;
        }

        // Siapkan kolom yang akan diperbarui
        $attrs = ['total_angsuran' => $newTotal];

        // Tentukan status lunas / belum lunas
        $plafond = $sumInstalment->pinjaman;          // atau $loan->nominal_drop
        if ($newTotal >= $plafond) {
          $attrs['out_date']   = $transactionLoanInstalment->transaction_date;
          $attrs['out_status'] = 'LUNAS';
        } else {
          $attrs['out_date']   = null;
          $attrs['out_status'] = null;
        }

        // UPDATE parent loan (1 query)
        $sumInstalment->update($attrs);

        /*────────── 2. LOCK & UPDATE REKAP HARIAN ──────────*/
        $recap = TransactionDailyRecap::query()
          ->where('transaction_loan_officer_grouping_id', $transactionLoanInstalment->transaction_loan_officer_grouping_id)
          ->where('date', $transactionLoanInstalment->transaction_date)              // row‑level lock
          ->firstOrCreate([
            'transaction_loan_officer_grouping_id' => $transactionLoanInstalment->transaction_loan_officer_grouping_id,
            'date'                                 => $transactionLoanInstalment->transaction_date,
          ]);

        // Kurangi storting secara atomik
        $recap->decrement('storting', $transactionLoanInstalment->nominal);
      }, attempts: 3); // retry otomatis bila deadlock
    });
  }

  public function loan()
  {
    return $this->belongsTo(TransactionLoan::class, 'transaction_loan_id', 'id');
  }

  public function usermantri()
  {
    return $this->belongsTo(Employee::class, 'user_mantri', 'id');
  }

  public function userinput()
  {
    return $this->belongsTo(Employee::class, 'user_input', 'id');
  }

  public function loan_officer_grouping()
  {
    return $this->belongsTo(TransactionLoanOfficerGrouping::class, 'transaction_loan_officer_grouping_id', 'id');
  }
}
