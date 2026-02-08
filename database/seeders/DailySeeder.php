<?php

namespace Database\Seeders;

use App\Models\TransactionDailyRecap;
use App\Models\TransactionLoan;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DailySeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $daily = collect(json_decode(file_get_contents(storage_path('daily.json')), true));
    try {
      DB::beginTransaction();
      $daily->each(function ($item) {
        $transaction = TransactionLoan::where('drop_date', $item['date'])->where('transaction_loan_officer_grouping_id', $item['transaction_loan_officer_grouping_id'])->get();
        $date = Carbon::parse($item['date']);
        $targetDate = $date->copy()->subWeek();

        $dailyBefore = null;
        $masuk = (int) round($transaction->sum('nominal_drop') * 0.13);

        while (!$dailyBefore && $targetDate->greaterThanOrEqualTo($date->copy()->subWeeks(4))) { // Ubah jumlah minggu sesuai kebutuhan
          $dailyBefore = TransactionDailyRecap::where('date', $targetDate->toDateString())
            ->where('transaction_loan_officer_grouping_id', $item['transaction_loan_officer_grouping_id'])
            ->first();

          if (!$dailyBefore) {
            $targetDate->subWeek();
          }
        }
        TransactionDailyRecap::create([
          'transaction_loan_officer_grouping_id' => $item['transaction_loan_officer_grouping_id'],
          'date' => $item['date'],
          'kasbon' => $item['kasbon'],
          'target' => $item['target'] ?? ($dailyBefore->target + ($dailyBefore->masuk  - $dailyBefore->keluar)),
          'masuk' => $masuk,
          'keluar' => $item['keluar'],
        ]);
        echo $item['date'] . $item['transaction_loan_officer_grouping_id'] . PHP_EOL;
      });
      DB::commit();
    } catch (Exception $e) {
      DB::rollBack();
      echo $e;
    }
  }
}
