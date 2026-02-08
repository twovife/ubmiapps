<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\Customer;
use App\Models\TransactionCustomer;
use App\Models\TransactionLoan;
use App\Models\TransactionLoanOfficerGrouping;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UpdateSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {

    try {
      DB::beginTransaction();

      $branches = Branch::all();

      foreach ($branches as $branch) {
        // Loop untuk membuat 10 kelompok untuk setiap branch
        for ($i = 1; $i <= 10; $i++) {
          // Buat entry untuk setiap kelompok di branch ini
          TransactionLoanOfficerGrouping::create([
            'branch_id' => $branch->id,  // ID cabang dari tabel branch
            'kelompok'  => $i,           // Nomor kelompok, dari 1 sampai 10
          ]);
        }
      }

      $customers = Customer::with("loan_request.loan")->get();
      $customers->map(function ($customer) {
        echo "memproses" . $customer->id . PHP_EOL;
        $nasabah = TransactionCustomer::create([
          "nama" => $customer->nama,
          "nik" => $customer->nik,
          "no_kk" => $customer->no_kk,
          "alamat" => $customer->alamat,
        ]);

        echo "nasabah baru" . $customer->id . PHP_EOL . "telah dibuat";

        if ($customer->loan_request->isNotEmpty()) {
          $drop_before = 0;
          $customer->loan_request->map(function ($transaksi) use ($nasabah, &$drop_before, $customer) {
            $drop_before = $customer->loan()->where('tanggal_drop', '<', $transaksi->tanggal_drop)->where('branch_id', $transaksi->branch_id)->where('kelompok', $transaksi->kelompok)->orderBy('tanggal_drop', 'desc')->first();
            //  $transaksi->loan()->where('tanggal_drop', '<', $transaksi->tanggal_drop)->orderBy('tanggal_drop', 'desc')->first();

            $drop_before = $drop_before?->drop ?? 0;
            $drop_date_before = $drop_before?->tanggal_drop ?? null;

            $loanOfficer = TransactionLoanOfficerGrouping::where("branch_id", $transaksi->branch_id)->where("kelompok", $transaksi->kelompok)->first();
            $manage =  $nasabah->manage_customer()->firstOrCreate([
              "transaction_loan_officer_grouping_id" => $loanOfficer->id,
            ], [
              "transaction_loan_officer_grouping_id" => $loanOfficer->id,
            ]);

            if ($transaksi->status == "open") {
              $loan = $manage->loan()->create([
                "transaction_loan_officer_grouping_id" => $manage->transaction_loan_officer_grouping_id,
                "old_id" => $transaksi->id,
                "request_date" => $transaksi->transaction_date,
                "user_mantri" => $transaksi->mantri,
                "check_date" => null,
                "user_check" => null,
                "drop_date" => $transaksi->tanggal_drop,
                "user_drop" => null,
                "hari" => $transaksi->hari,
                "pinjaman_ke" => null,
                "status" => $transaksi->status,
                "notes" => $transaksi->notes,
                "user_input" => $transaksi->mantri,
                "drop_before" => $drop_before,
                "drop_date_before" => $drop_date_before,

                "request_nominal" => $transaksi->pinjaman,
                "approved_nominal" => null,
                "nominal_drop" => null,
                "pinjaman" => null,
              ]);
            }

            if ($transaksi->status == "tolak") {
              $loan = $manage->loan()->create([
                "transaction_loan_officer_grouping_id" => $manage->transaction_loan_officer_grouping_id,
                "old_id" => $transaksi->id,
                "request_date" => $transaksi->transaction_date,
                "user_mantri" => $transaksi->mantri,
                "check_date" => $transaksi->approved_date,
                "user_check" => $transaksi->approved_by,
                "drop_date" => $transaksi->tanggal_drop,
                "user_drop" => null,
                "hari" => $transaksi->hari,
                "pinjaman_ke" => null,
                "status" => $transaksi->status,
                "notes" => $transaksi->notes,
                "user_input" => $transaksi->mantri,

                "drop_before" => $drop_before,
                "drop_date_before" => $drop_date_before,
                "request_nominal" => $transaksi->pinjaman,
                "approved_nominal" => null,
                "nominal_drop" => null,
                "pinjaman" => null,
              ]);
            }

            if ($transaksi->status == "acc") {
              $tanggal = Carbon::now()->format('Y-m-d');
              $status = $transaksi->tanggal_drop < $tanggal ? "success" : "acc";
              $loan = $manage->loan()->create([
                "transaction_loan_officer_grouping_id" => $manage->transaction_loan_officer_grouping_id,
                "old_id" => $transaksi->id,
                "request_date" => $transaksi->transaction_date,
                "user_mantri" => $transaksi->mantri,
                "check_date" => $transaksi->approved_date,
                "user_check" => $transaksi->approved_by,
                "drop_date" => $transaksi->tanggal_drop,
                "user_drop" =>  $status == "success" ? $transaksi->mantri : null,
                "hari" => $transaksi->hari,
                "pinjaman_ke" => null,
                "status" => $status,
                "notes" => $transaksi->notes,
                "user_input" => $transaksi->mantri,
                "drop_before" => $drop_before,
                "drop_date_before" => $drop_date_before,
                "request_nominal" => $transaksi->pinjaman,
                "approved_nominal" => $transaksi->loan?->drop,
                "nominal_drop" =>  $status == "success" ?  $transaksi->loan?->drop : null,
              ]);

              // id, loan_id, pembayaran_date, jumlah, status, mantri, danatitipan, created_at, updated_at

              if ($transaksi->loan?->angsuran->isNotEmpty()) {
                $transaksi->loan->angsuran->map(function ($angsuran) use ($loan) {
                  $loan->loan_instalment()->create([
                    "transaction_loan_officer_grouping_id" => $loan->transaction_loan_officer_grouping_id,
                    "transaction_date" => $angsuran->pembayaran_date,
                    "nominal" => $angsuran->jumlah,
                    "status" => $angsuran->status,
                    "instalment_notes" => $angsuran->instalment_notes,
                    "danatitipan" => $angsuran->danatitipan,
                    "user_mantri" => $angsuran->mantri,
                    "user_input" => $angsuran->mantri,
                  ]);
                });
                echo "upload data angsuran";
              }
            }
          });
          echo "success" . $customer->id . PHP_EOL;
        } else {
          echo "success with no loan" . $customer->id . PHP_EOL;
        }
      });
      DB::commit();
    } catch (Exception $e) {
      DB::rollBack();
      echo "failed" . $e;
    }
  }
}
