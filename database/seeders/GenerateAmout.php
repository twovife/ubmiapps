<?php

namespace Database\Seeders;

use App\Models\TransactionDailyRecap;
use App\Models\TransactionLoan;
use App\Models\TransactionLoanInstalment;
use App\Models\TransactionSirculation;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CompareSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    // TransactionSirculation::chunkById(5000, function ($sirkulasi) {

    //   // Ambil daftar ID loan dlm chunk ini
    //   $loanIds = $sirkulasi->pluck('transaction_loan_officer_grouping_id');
    //   $loanDate = $sirkulasi->pluck('date');
    //   $loanDay = $sirkulasi->pluck('day');

    //   $targetCCMStart = Carbon::parse($loanDate->first())->subMonths(2)->startOfMonth()->format('Y-m-d');
    //   $targetCCMEnd = Carbon::parse($loanDate->first())->subMonths(2)->endOfMonth()->format('Y-m-d');

    //   $targetN2Start = Carbon::parse($loanDate->first())->subMonths(1)->startOfMonth()->format('Y-m-d');
    //   $targetN2End = Carbon::parse($loanDate->first())->subMonths(1)->endOfMonth()->format('Y-m-d');

    //   $targetN1Start = Carbon::parse($loanDate->first())->startOfMonth()->format('Y-m-d');
    //   $targetN1End = Carbon::parse($loanDate->first())->endOfMonth()->format('Y-m-d');

    //   $transactionCCM = TransactionLoan::with(['loan_instalment' => fn($q) => $q->where('id', 1)])->where('transaction_loan_officer_grouping_id', $loanIds)
    //     ->whereIn('drop_date',)
    //     ->whereBetween('day', [$targetCCMStart, $targetCCMEnd])
    //     ->get();

    //   $transactionN2 = TransactionLoan::with(['loan_instalment' => fn($q) => $q->where('id', 1)])->where('transaction_loan_officer_grouping_id', $loanIds)
    //     ->whereIn('drop_date',)
    //     ->whereBetween('day', [$targetN2Start, $targetN2End])
    //     ->get();

    //   $transactionN1 = TransactionLoan::with(['loan_instalment' => fn($q) => $q->where('id', 1)])->where('transaction_loan_officer_grouping_id', $loanIds)
    //     ->whereIn('drop_date',)
    //     ->whereBetween('day', [$targetN1Start, $targetN1End])
    //     ->get();

    //   // ----- 1 query GROUP BY utk subset ini -----
    //   $totals = DB::table('transaction_loan_instalments')
    //     ->select('transaction_loan_id', DB::raw('SUM(nominal) AS total'))
    //     ->whereIn('transaction_loan_id', $loanIds)
    //     ->groupBy('transaction_loan_id')
    //     ->pluck('total', 'transaction_loan_id');   // [id => total]

    //   foreach ($loans as $loan) {
    //     $total = $totals[$loan->id] ?? 0;

    //     if ($total !== $loan->total_angsuran) {
    //       $loan->update(['total_angsuran' => $total]);
    //     }
    //     echo "Updated loan ID {$loan->id} with total_angsuran: {$total}" . PHP_EOL;
    //   }
    // });
  }
}
