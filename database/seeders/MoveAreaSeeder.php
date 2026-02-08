<?php

namespace Database\Seeders;

use App\Models\TransactionLoan;
use App\Models\TransactionLoanInstalment;
use App\Models\TransactionLoanOfficerGrouping;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class MoveAreaSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $area1 = 1;
    $area2 = 2;

    DB::transaction(function () use ($area1, $area2) {

      // AMBIL LOAN IDS SEKALI, AMAN
      $loanIdsArea1 = TransactionLoan::where('transaction_loan_officer_grouping_id', $area1)
        // ->where('hari', 'jumat')
        ->pluck('id')
        ->toArray();

      $loanIdsArea2 = TransactionLoan::where('transaction_loan_officer_grouping_id', $area2)
        // ->where('hari', 'jumat')
        ->pluck('id')
        ->toArray();


      // INSTALMENT TERKAIT
      $instIdsArea1 = TransactionLoanInstalment::whereIn('transaction_loan_id', $loanIdsArea1)
        ->pluck('id')
        ->toArray();

      $instIdsArea2 = TransactionLoanInstalment::whereIn('transaction_loan_id', $loanIdsArea2)
        ->pluck('id')
        ->toArray();

      Log::channel('swaplog')->info("BEFORE", [
        'loans_area1' => $loanIdsArea1,
        'loans_area2' => $loanIdsArea2,
        'inst_area1'  => $instIdsArea1,
        'inst_area2'  => $instIdsArea2
      ]);


      // SWAP

      // AREA 1 → TEMP
      TransactionLoan::whereIn('id', $loanIdsArea1)
        ->update(['transaction_loan_officer_grouping_id' => 99999]);

      TransactionLoanInstalment::whereIn('id', $instIdsArea1)
        ->update(['transaction_loan_officer_grouping_id' => 99999]);


      // AREA 2 → AREA 1
      TransactionLoan::whereIn('id', $loanIdsArea2)
        ->update(['transaction_loan_officer_grouping_id' => $area1]);

      TransactionLoanInstalment::whereIn('id', $instIdsArea2)
        ->update(['transaction_loan_officer_grouping_id' => $area1]);


      // TEMP → AREA 2
      TransactionLoan::whereIn('id', $loanIdsArea1)
        ->update(['transaction_loan_officer_grouping_id' => $area2]);

      TransactionLoanInstalment::whereIn('id', $instIdsArea1)
        ->update(['transaction_loan_officer_grouping_id' => $area2]);


      // LOG AFTER

      $afterLoansArea1 = TransactionLoan::where('transaction_loan_officer_grouping_id', $area1)
        // ->where('hari', 'jumat')
        ->pluck('id')
        ->toArray();

      $afterLoansArea2 = TransactionLoan::where('transaction_loan_officer_grouping_id', $area2)
        // ->where('hari', 'jumat')
        ->pluck('id')
        ->toArray();

      Log::channel('swaplog')->info("AFTER", [
        'loans_area1' => $afterLoansArea1,
        'loans_area2' => $afterLoansArea2
      ]);
    });
  }
}
