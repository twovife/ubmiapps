<?php

namespace Database\Seeders;

use App\Models\TransactionLoan;
use App\Models\TransactionLoanOfficerGrouping;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LunasinMLGantung extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    try {
      DB::beginTransaction();


      $transactionOfficerGroupings = TransactionLoanOfficerGrouping::where('branch_id', 19)->where('kelompok', 9)->pluck('id');
      $loans = TransactionLoan::with('loan_instalment')
        ->where('drop_date', '<', '2025-01-01')
        ->whereIn('transaction_loan_officer_grouping_id', $transactionOfficerGroupings->toArray())
        ->where('status', 'success')
        ->where('hari', 'sabtu')
        ->whereNull('out_date')
        ->get();

      // dd($loans->count());
      $loans->each(function ($loan) {
        $instalment = Carbon::parse($loan->drop_date)->copy()->addWeek();
        $angsuran = $loan->pinjaman - $loan->loan_instalment->sum('nominal');

        if ($angsuran == 0) {
          $loan->out_date = $loan->loan_instalment->max('transaction_date');
          $loan->out_status = 'LUNAS';
          $loan->transaction_out_reasons_id = 11;
          $loan->save();
        }

        $loan->loan_instalment()->create([
          'transaction_date' => $instalment->format('Y-m-d'),
          'nominal' => $angsuran,
          'user_input' => $loan->user_mantri,
          'status' => 1,
          'danatitipan' => 1,
          'user_mantri' => $loan->user_mantri,
        ]);

        echo "Loan ID {$loan->id} processed.\n";
      });
      DB::commit();
    } catch (\Throwable $th) {
      DB::rollBack();
      echo $th;
    }
  }
}
