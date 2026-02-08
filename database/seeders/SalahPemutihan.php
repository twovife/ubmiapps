<?php

namespace Database\Seeders;

use App\Models\TransactionLoan;
use App\Models\TransactionLoanOfficerGrouping;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SalahPemutihan extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    try {
      DB::beginTransaction();

      $dateRevisi = [
        'Senin' => '2025-10-27',
        'Selasa' => '2025-10-28',
        'Rabu' => '2025-10-29',
        'Kamis' => '2025-10-30',
        'Jumat' => '2025-10-31',
        'Sabtu' => '2025-10-25',
      ];
      $transactionOfficerGroupings = TransactionLoanOfficerGrouping::where('branch_id', 7)->pluck('id');
      $loans = TransactionLoan::with('white_off')
        ->whereIn('transaction_loan_officer_grouping_id', $transactionOfficerGroupings->toArray())
        ->whereHas('white_off', function ($p0) {
          $p0->where('transaction_date', ">=", "2025-11-03");
        })
        ->get();

      // dd($loans->count());
      $loans->each(function ($loan) use ($dateRevisi) {
        $dayName = Carbon::parse($loan->white_off->transaction_date)->locale('id')->dayName;
        if (isset($dateRevisi[$dayName])) {
          $loan->white_off->transaction_date = $dateRevisi[$dayName];
          $loan->white_off->save();

          $loan->out_date = $dateRevisi[$dayName];
          $loan->save();
        }

        echo "Loan ID: {$loan->id} updated from {$loan->white_off->transaction_date} to $dateRevisi[$dayName]\n";
      });
      DB::commit();
    } catch (\Throwable $th) {
      DB::rollBack();
      echo $th;
    }
  }
}
