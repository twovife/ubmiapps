<?php

namespace Database\Seeders;

use App\Helpers\AppHelper;
use App\Models\TransactionLoan;
use App\Models\TransactionLoanOfficerGrouping;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BatchInputAngsuranSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $id_grup = TransactionLoanOfficerGrouping::where('branch_id', 69)
      ->whereIn('kelompok', [3, 5, 6, 7, 8, 9, 10])
      ->pluck('id');

    $transactionDate = '2026-01-19';
    $userId = 4955;

    DB::transaction(function () use ($id_grup, $transactionDate, $userId) {

      TransactionLoan::whereIn('transaction_loan_officer_grouping_id', $id_grup)
        ->where('status', 'success')
        ->whereNull('out_date')
        ->whereBetween('drop_date', ['2025-12-01', '2026-01-30'])
        ->where('hari', 'senin')
        ->chunkById(500, function ($loans) use ($transactionDate, $userId) {

          foreach ($loans as $item) {

            // Cegah duplikasi
            $exists = $item->loan_instalment()
              ->where('transaction_date', $transactionDate)
              ->exists();

            if ($exists) {
              continue;
            }

            $item->loan_instalment()->create([
              'transaction_date' => $transactionDate,
              'nominal' => $item->pinjaman / 10,
              'danatitipan' => 0,
              'transaction_loan_officer_grouping_id' => $item->transaction_loan_officer_grouping_id,
              'status' => AppHelper::generateStatusAngsuran($item->drop_date, $transactionDate),
              'user_input' => $userId,
              'user_mantri' => $item->user_mantri,
            ]);

            echo "data angsuran untuk loan ID {$item->id} telah dibuat.\n";
          }
        });
    });
  }
}
