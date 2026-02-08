<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\TransactionLoanOfficerGrouping;
use App\Models\TransactionLoan;
use App\Models\TransactionLoanInstalment;
use Illuminate\Support\Facades\DB;

class DeleteAngsuranSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    DB::beginTransaction();

    try {
      $officerGrouping = TransactionLoanOfficerGrouping::where('branch_id', 21)->get();

      foreach ($officerGrouping as $group) {
        echo "🧹 Menghapus data loan dan angsuran untuk kelompok: {$group->kelompok}\n";

        // ambil semua loan ID terkait kelompok ini
        $loanIds = TransactionLoan::where('transaction_loan_officer_grouping_id', $group->id)
          ->pluck('id');

        if ($loanIds->isEmpty()) {
          echo "   ⚠️ Tidak ada loan untuk kelompok ini.\n";
          continue;
        }

        // hapus semua angsuran (loan instalment)
        TransactionLoanInstalment::whereIn('transaction_loan_id', $loanIds)->delete();

        // hapus semua loan
        TransactionLoan::whereIn('id', $loanIds)->delete();

        echo "   ✅ Loan & angsuran berhasil dihapus ({$loanIds->count()} loan)\n";
      }

      DB::commit();
      echo "🎉 Semua data loan & angsuran branch 21 berhasil dibersihkan!\n";
    } catch (\Throwable $e) {
      DB::rollBack();
      echo "❌ Gagal menghapus data: " . $e->getMessage() . "\n";
    }
  }
}
