<?php

namespace Database\Seeders;

use App\Models\OnlineBranch;
use App\Models\TransactionDailyRecap;
use App\Models\TransactionLoan;
use App\Models\TransactionLoanOfficerGrouping;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;

class ChangeWrongDateGlobalSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $getOnlineBranch = OnlineBranch::pluck('branch_id');
    $groupingId = TransactionLoanOfficerGrouping::whereIn('branch_id', $getOnlineBranch)->pluck('id');

    $wrongDate = "2025-09-05";
    $trueDate = "2025-09-12";
    $beforeDate = "2025-08-29";

    try {
      $getWrongDate = TransactionLoan::whereIn('transaction_loan_officer_grouping_id', $groupingId)->where('drop_date', $wrongDate)->get();
      $getWrongDate->groupBy('transaction_loan_officer_grouping_id')->map(function ($item, $man_id) use ($wrongDate, $trueDate, $beforeDate) {
        $item->groupBy('drop_date')->map(function ($item, $date) use ($man_id, $wrongDate, $trueDate, $beforeDate) {

          $dailyRecap = TransactionDailyRecap::where('transaction_loan_officer_grouping_id', $man_id)
            ->where('date', $wrongDate)
            ->first();

          $dailyRecapRevisi = TransactionDailyRecap::updateOrCreate(
            [
              'transaction_loan_officer_grouping_id' => $man_id,
              'date' => $trueDate,
            ],
            [
              'target_on' => $beforeDate,
              'target' => $dailyRecap?->target ?? 0,
            ]
          );

          if ($dailyRecapRevisi->wasRecentlyCreated) {
            echo "Berhasil membuat rekap harian {$dailyRecapRevisi->date} untuk {$man_id}" . PHP_EOL;
          } else {
            echo "Berhasil mengupdate rekap harian {$dailyRecapRevisi->date} untuk {$man_id}" . PHP_EOL;
          }


          $item->map(function ($item) use ($trueDate, $wrongDate) {
            $item->update([
              'drop_date' => $trueDate,
            ]);
            echo "Berhasil mengubah tanggal {$item->drop_date} menjadi {$wrongDate} untuk {$item->transaction_loan_officer_grouping_id}" . PHP_EOL;
          });

          $dailyRecap?->delete();

          // echo "Berhasil mengubah tanggal {$wrongDate} menjadi {$trueDate} untuk {$man_id} pada tanggal {$date}" . PHP_EOL;
        });
      });
    } catch (Exception $e) {
      echo "eror {$e->getMessage()}";
    }
  }
}
