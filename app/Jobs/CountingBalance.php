<?php

namespace App\Jobs;

use App\Models\TransactionDailyRecap;
use App\Models\VIsBalanceDropWithDailyReport;
use App\Models\VIsBalanceLoanWithDailyReport;
use Carbon\Carbon;
use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class CountingBalance implements ShouldQueue
{
  use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

  /**
   * Create a new job instance.
   */

  public $tries = 5;
  public $retryAfter = 60;

  protected $report;

  public function __construct($report)
  {
    $this->report = $report;
  }

  public function retryUntil()
  {
    // Job akan berhenti retry setelah 10 menit
    return Carbon::now()->addMinutes(2);
  }

  /**
   * Execute the job.
   */
  public function handle(): void
  {
    try {
      if ($this->report instanceof VIsBalanceDropWithDailyReport) {
        $dailyRecap = TransactionDailyRecap::find($this->report->id);
        if ($dailyRecap) {
          $dailyRecap->update([
            'drop' => $this->report->nominal_drop
          ]);
        }
      }

      if ($this->report instanceof VIsBalanceLoanWithDailyReport) {
        $dailyRecap = TransactionDailyRecap::find($this->report->id);
        if ($dailyRecap) {
          $dailyRecap->update([
            'storting' => $this->report->total_nominal
          ]);
        }
      }

      Log::channel('job_reports')->info('Job CountingBalance', [
        'report_id' => $this->report->id,
        'batch_type' => $this->report instanceof VIsBalanceLoanWithDailyReport ? 'loan' : 'drop',  // Misalnya Anda ingin menambahkan tipe batch
        'timestamp' => now()->toDateTimeString(),
      ]);
    } catch (Exception $e) {
      Log::error("Error updating daily recap: " . $e->getMessage());
      // Bisa juga melakukan retry atau melanjutkan eksekusi

      throw $e;
    }
  }
}
