<?php

namespace Database\Seeders;

use App\Models\TransactionLoan;
use App\Models\TransactionLoanOfficerGrouping;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Permission;

class LunasinSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {

    try {
      DB::beginTransaction();
      $grouping = TransactionLoanOfficerGrouping::where('branch_id', 56)
        ->pluck('id');
      $loan = TransactionLoan::where('status', 'success')
        ->whereBetween('drop_date', ["2025-06-01", "2025-10-31"])
        ->whereIn('transaction_loan_officer_grouping_id', $grouping)
        ->whereIn('hari', ['kamis', 'jumat', 'sabtu'])
        ->get();


      $loan->each(function ($item) {
        $delete_angsuran = $item->loan_instalment()->delete();
        $add_angsuran = $item->loan_instalment()->create([
          'transaction_date' => Carbon::parse($item->drop_date)->addWeeks(1)->format('Y-m-d'),
          'nominal' => $item->pinjaman,
          'user_input' => $item->user_mantri,
          'status' => 1,
          'user_mantri' => $item->user_mantri,
        ]);


        echo $item->id . " Success" . PHP_EOL;
      });

      DB::commit();
    } catch (\Throwable $th) {
      DB::rollBack();
      echo $th;
    }
  }
}
