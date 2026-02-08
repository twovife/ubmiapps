<?php

namespace Database\Seeders;

use App\Models\TransactionLoan;
use App\Models\TransactionLoanInstalment;
use App\Models\TransactionLoanOfficerGrouping;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PindahTotalResotSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $kelompok_asal = TransactionLoanOfficerGrouping::where('branch_id', 34)
      ->where('kelompok', 7)
      ->firstOrFail();
    echo 'dari kelompok' . $kelompok_asal->id . PHP_EOL;
    $kelompok_tujuan = TransactionLoanOfficerGrouping::where('branch_id', 34)
      ->where('kelompok', 1)
      ->firstOrFail();

    echo 'ke kelompok' . $kelompok_tujuan->id . PHP_EOL;

    DB::transaction(function () use ($kelompok_asal, $kelompok_tujuan) {

      $loanIds = TransactionLoan::where('transaction_loan_officer_grouping_id', $kelompok_asal->id)
        ->whereNull('out_status')
        ->where('hari', 'rabu')
        ->pluck('id');

      echo 'jumlah loan yang dipindah: ' . $loanIds->count() . PHP_EOL;

      if ($loanIds->isEmpty()) {
        return;
        echo "tidak ada loan yang dipindah" . PHP_EOL;
      }

      TransactionLoanInstalment::whereIn('transaction_loan_id', $loanIds)
        ->update([
          'transaction_loan_officer_grouping_id' => $kelompok_tujuan->id
        ]);

      echo "instalment berhasil diupdate" . PHP_EOL;



      TransactionLoan::whereIn('id', $loanIds)
        ->update([
          'transaction_loan_officer_grouping_id' => $kelompok_tujuan->id
        ]);
      echo "loan berhasil diupdate" . PHP_EOL;

      // export log id mana yang berhasil diupdate

      Log::channel('swaplog')->info("BEFORE", [
        'loans_moved' => $loanIds->toArray(),
      ]);
      // optional: log sukses
    });
  }
}
