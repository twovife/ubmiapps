<?php

namespace Database\Seeders;

use App\Models\TransactionLoan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Permission;

class LunasSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {

    try {
      DB::beginTransaction();

      TransactionLoan::with([
        'loan_instalment:id,transaction_loan_id,nominal,transaction_date',
        'white_off:id,transaction_loan_id,nominal'
      ])->where('transaction_loan_officer_grouping_id', 18)
        ->where('status', 'success')
        ->chunk(1000, function ($loans) {
          foreach ($loans as $loan) {

            $totalAngsuran = $loan->loan_instalment->sum('nominal');
            $latestDate    = $loan->loan_instalment->max('transaction_date');
            $whiteOff      = $loan->white_off && $loan->white_off->nominal > 0;

            if ($whiteOff) {
              $loan->update([
                'total_angsuran' => $totalAngsuran,
                'out_date'       => $latestDate,
                'out_status'     => 'LUNAS',
                'transaction_out_reasons_id' => 4
              ]);
            } elseif ($totalAngsuran == $loan->pinjaman) {
              $loan->update([
                'total_angsuran' => $totalAngsuran,
                'out_date'       => $latestDate,
                'out_status'     => 'LUNAS',
                'transaction_out_reasons_id' => 1
              ]);
            } elseif ($totalAngsuran > $loan->pinjaman) {
              $loan->update([
                'total_angsuran' => $totalAngsuran,
                'out_date'       => $latestDate,
                'out_status'     => 'LUNAS Xs',
                'transaction_out_reasons_id' => 6
              ]);
            }

            echo $loan->id . " Success" . PHP_EOL;
          }
        });

      DB::commit();
    } catch (\Throwable $th) {
      DB::rollBack();
      echo $th;
    }
  }
}
