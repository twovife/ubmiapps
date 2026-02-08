<?php

namespace App\Console\Commands;

use App\Jobs\CountingBalance;
use App\Models\VIsBalanceDropWithDailyReport;
use App\Models\VIsBalanceLoanWithDailyReport;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class CountingDailyBalance extends Command
{
  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'app:counting-daily-balance';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Command description';

  /**
   * Execute the console command.
   */
  public function handle()
  {

    $dropReports = VIsBalanceDropWithDailyReport::chunk(100, function ($reports) {
      Log::channel('scheduler_reports')->info('Job Is Active', [
        'batch_type' => 'drop',  // Misalnya Anda ingin menambahkan tipe batch
        'countJob' => $reports->count(),
        'timestamp' => now()->toDateTimeString(),
      ]);

      foreach ($reports as $report) {
        // Dispatch job untuk batch ini
        CountingBalance::dispatch($report);
      }
    });

    $loanReports = VIsBalanceLoanWithDailyReport::chunk(100, function ($reports) {
      Log::channel('scheduler_reports')->info('Job Is Active', [
        'batch_type' => 'loan',  // Misalnya Anda ingin menambahkan tipe batch
        'countJob' => $reports->count(),
        'timestamp' => now()->toDateTimeString(),
      ]);

      foreach ($reports as $report) {
        // Dispatch job untuk batch ini
        CountingBalance::dispatch($report);
      }
    });
  }
}
