<?php

namespace Database\Seeders;

use App\Models\TransactionLoan;
use App\Models\TransactionLoanInstalment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GantiMantriSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $oldUserIds = [5799];

    $newUserId = 370;

    DB::transaction(function () use ($oldUserIds, $newUserId) {

      TransactionLoan::whereIn('user_mantri', $oldUserIds)
        ->update(['user_mantri' => $newUserId]);
      echo "Updated user_mantri in TransactionLoan" . PHP_EOL;

      TransactionLoan::whereIn('user_check', $oldUserIds)
        ->update(['user_check' => $newUserId]);
      echo "Updated user_check in TransactionLoan" . PHP_EOL;

      TransactionLoan::whereIn('user_drop', $oldUserIds)
        ->update(['user_drop' => $newUserId]);
      echo "Updated user_drop in TransactionLoan" . PHP_EOL;

      TransactionLoan::whereIn('user_input', $oldUserIds)
        ->update(['user_input' => $newUserId]);
      echo "Updated user_input in TransactionLoan" . PHP_EOL;

      TransactionLoanInstalment::whereIn('user_mantri', $oldUserIds)
        ->update(['user_mantri' => $newUserId]);
      echo "Updated user_mantri in TransactionLoanInstalment" . PHP_EOL;
      //
      TransactionLoanInstalment::whereIn('user_input', $oldUserIds)
        ->update(['user_input' => $newUserId]);
      echo "Updated user_input in TransactionLoanInstalment" . PHP_EOL;
    });
  }
}
