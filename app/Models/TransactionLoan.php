<?php

namespace App\Models;

use App\Helpers\AppHelper;
use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Staudenmeir\EloquentHasManyDeep\HasRelationships;
use Znck\Eloquent\Traits\BelongsToThrough;

class TransactionLoan extends Model
{
  use HasFactory;
  use HasRelationships;
  use BelongsToThrough;

  protected $fillable = [
    "transaction_manage_customer_id",
    "transaction_loan_officer_grouping_id",
    "old_id",
    "drop_before",
    "drop_date_before",
    "drop_date",
    "request_date",
    "request_nominal",
    "user_mantri",
    "approved_nominal",
    "check_date",
    "user_check",
    "nominal_drop",
    "user_drop",
    "pinjaman",
    "hari",
    "pinjaman_ke",
    "status",
    "notes",
    "user_input",
    "drop_langsung",
    "out_date",
    "out_status",
    "total_angsuran",
    "transaction_out_reasons_id"
  ];


  protected static function boot()
  {
    parent::boot();

    static::updating(function (self $transactionLoan) {
      if (! $transactionLoan->isDirty('status')) {
        return;
      }


      $old = $transactionLoan->getOriginal('status');
      $new = $transactionLoan->status;

      if (($old === 'success') === ($new === 'success')) {
        return;
      }

      DB::transaction(function () use ($transactionLoan, $new) {

        $freshLoan = self::whereKey($transactionLoan->id)
          ->lockForUpdate()
          ->first();

        // Kalau ternyata status di DB sudah sama dgn yg mau disimpan,
        // artinya request lain sudah sempat memproses –> keluar saja.
        if ($freshLoan->status === $transactionLoan->status) {
          return;
        }

        // Kunci baris recap yang bersangkutan
        $dailyRekap = TransactionDailyRecap::where('transaction_loan_officer_grouping_id', $transactionLoan->transaction_loan_officer_grouping_id)
          ->where('date', $transactionLoan->drop_date)
          ->lockForUpdate()
          ->firstOrCreate([
            'transaction_loan_officer_grouping_id' => $transactionLoan->transaction_loan_officer_grouping_id,
            'date'   => $transactionLoan->drop_date,
          ]);

        if ($new === 'success') {
          // status baru jadi sukses → tambah nominal‑nya
          $dailyRekap->increment('drop', $transactionLoan->nominal_drop);
        } else {
          // status dicabut dari sukses → kurangi nominal lama
          $dailyRekap->decrement('drop', $transactionLoan->getOriginal('nominal_drop'));
        }
      });
    });


    static::deleting(function (self $transactionLoan) {

      DB::transaction(function () use ($transactionLoan) {

        $freshLoan = self::whereKey($transactionLoan->id)
          ->lockForUpdate()
          ->first();

        if (! $freshLoan) {
          return; // sudah dihapus oleh proses lain
        }

        // 2. Hapus semua cicilan terkait
        foreach ($freshLoan->loan_instalment as $instalment) {
          $instalment->delete();
        }

        // 3. Koreksi recap hanya jika status = success
        if ($freshLoan->status === 'success') {

          $dailyRekap = TransactionDailyRecap::query()
            ->where('transaction_loan_officer_grouping_id', $freshLoan->transaction_loan_officer_grouping_id)
            ->where('date', $freshLoan->drop_date)
            ->lockForUpdate() // kunci baris recap
            ->first();

          if ($dailyRekap) {
            $dailyRekap->decrement('drop', $freshLoan->nominal_drop);
          }
        }
      });
    });
  }

  public function loan_instalment()
  {
    return $this->hasMany(TransactionLoanInstalment::class, 'transaction_loan_id', 'id');
  }

  public function loanInstalmentOn(string|\DateTimeInterface $date)
  {
    return $this->hasMany(TransactionLoanInstalment::class, 'transaction_loan_id')
      ->whereDate('transaction_date', $date);
  }

  public function manage_customer()
  {
    return $this->belongsTo(TransactionManageCustomer::class, 'transaction_manage_customer_id', 'id');
  }

  public function branch()
  {
    return $this->belongsToThrough(Branch::class, TransactionLoanOfficerGrouping::class);
  }

  public function loan_officer_grouping()
  {
    return $this->belongsTo(TransactionLoanOfficerGrouping::class, 'transaction_loan_officer_grouping_id', 'id');
  }
  public function userinput()
  {
    return $this->belongsTo(Employee::class, 'user_input', 'id');
  }

  public function customer()
  {
    return $this->hasOneThrough(TransactionCustomer::class, TransactionManageCustomer::class, 'id', 'id', 'transaction_manage_customer_id', 'transaction_customer_id');
  }

  public function mantri()
  {
    return $this->belongsTo(Employee::class, 'user_mantri', 'id');
  }

  public function white_off()
  {
    return $this->hasOne(TransactionWhiteOff::class, 'transaction_loan_id', 'id');
  }
}
