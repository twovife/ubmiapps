<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\Customer;
use App\Models\TransactionCustomer;
use App\Models\TransactionLoan;
use App\Models\TransactionLoanInstalment;
use App\Models\TransactionLoanOfficerGrouping;
use App\Models\TransactionWhiteOff;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KeubahSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    // $nasabah = collect(json_decode(file_get_contents(storage_path('keubah.json')), true));
    // $ids = $nasabah->pluck('id');
    // $loans = TransactionLoan::with('loan_instalment')
    //   ->whereIn('id', $ids)
    //   ->where(function ($query) {
    //     $query->whereNull('out_date')
    //       ->orWhereHas('loan_instalment', function ($q) {
    //         $q->where('transaction_date', '>=', '2025-05-01');
    //       });
    //   })
    //   ->get();

    // $result = [
    //   'loans' => $loans,
    // ];

    // $json = json_encode($result, JSON_PRETTY_PRINT);
    // file_put_contents(storage_path('app/hasil_export2.json'), $json);

    $data = collect(json_decode(file_get_contents(storage_path('hasil_export2.json')), true));

    $loans = collect($data['loans']);
    $loans->each(
      function ($loan) {
        $transactionLoan = TransactionLoan::where(['id' => $loan['id']])->first();
        $transactionLoan->loan_instalment()->delete();
        $loanInstalments = collect($loan['loan_instalment']);
        $loanInstalments->each(
          function ($instalment) use ($transactionLoan) {
            TransactionLoanInstalment::create(
              [
                "transaction_loan_id" => $instalment['transaction_loan_id'],
                "transaction_loan_officer_grouping_id" => $instalment['transaction_loan_officer_grouping_id'],
                "transaction_date" => $instalment['transaction_date'],
                "nominal" => $instalment['nominal'],
                "status" => $instalment['status'],
                "instalment_notes" => $instalment['instalment_notes'],
                "danatitipan" => $instalment['danatitipan'],
                "user_input" => $instalment['user_input'],
                "user_mantri" => $instalment['user_mantri'],
              ]
            );
          }
        );
        echo $loan['id'] . ' - ' . $transactionLoan->pinjaman . ' - ' . $transactionLoan->loan_instalment->count() . PHP_EOL;
      }
    );
  }
}
