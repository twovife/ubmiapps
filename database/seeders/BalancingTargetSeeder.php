<?php

namespace Database\Seeders;

use App\Models\TransactionDailyRecap;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BalancingTargetSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $targetNol = TransactionDailyRecap::where('target', 0)
      ->where('kasbon', 0)
      ->where('masuk', 0)
      ->where('keluar', 0)
      ->where('date', '2025-06-05')
      ->get();

    $targetNol->each(function ($item) {

      $dateBefore = TransactionDailyRecap::where('transaction_loan_officer_grouping_id', $item->transaction_loan_officer_grouping_id)
        ->where('date', $item->target_on)
        ->first();

      $item->update([
        'target' => $dateBefore->target + ($dateBefore->masuk - $dateBefore->keluar),
      ]);
      echo "Berhasil mengupdate target {$item->date} untuk {$item->transaction_loan_officer_grouping_id}" . PHP_EOL;
    });
  }
}
