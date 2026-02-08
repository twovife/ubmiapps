<?php

namespace Database\Seeders;

use App\Models\TransactionDailyRecap;
use App\Models\TransactionLoan;
use App\Models\TransactionLoanInstalment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CompareSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $dailyTransactions = TransactionDailyRecap::all();

    $dailyTransactions->each(function ($dailyTransaction) {

      $sumInstalment = TransactionLoanInstalment::where('transaction_loan_officer_grouping_id', $dailyTransaction->transaction_loan_officer_grouping_id)->where('transaction_date', $dailyTransaction->date)->sum('nominal') ?? 0;

      if ($dailyTransaction->storting != $sumInstalment) {
        $dailyTransaction->storting = $sumInstalment;
      }

      $dailyTransaction->save();
    });
  }
}
