<?php

namespace Database\Seeders;

use App\Models\TransactionLoanOfficerGrouping;
use Exception;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SirkulasiSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $sirkulasi = collect(json_decode(file_get_contents(storage_path('sirculation.json')), true));
    $grouping = TransactionLoanOfficerGrouping::where('branch_id', 32)->get();
    $maping = $sirkulasi->map(function ($item) use ($grouping) {
      return [
        'transaction_loan_officer_grouping_id' => $grouping->where('kelompok', $item['kelompok'])->first()->id,
        'date' => $item['date'],
        'amount' => $item['amount'],
        'day' => $item['day'],
        'cm_amount' => $item['cm_amount'],
        'mb_amount' => $item['mb_amount'],
        'ml_amount' => $item['ml_amount'],
      ];
    })->values();
    // dd($maping);
    try {
      DB::beginTransaction();
      $grouping->each(function ($group) use ($maping) {
        $group->transactionSirculation()->createMany($maping->where('transaction_loan_officer_grouping_id', $group->id)->toArray());
        echo $group->id . PHP_EOL;
      });
      echo "berhasil";
      DB::commit();
    } catch (Exception $e) {
      DB::rollBack();
      echo $e;
    }
    // try {
    //   DB::beginTransaction();
    //   $counter = 1;
    //   $accountType = UnitPayment::firstOrCreate([
    //     'account_name' => "GORO"
    //   ], [
    //     "account_name" => "GORO",
    //     "account_type" => "GORO",
    //     "remark" => "GORO UMROH"
    //   ]);

    //   collect($goro)->each(function ($item) use (&$counter, $accountType) {

    //     $accountType->transactions()->create([
    //       "branch_id" => $item['branch_id'],
    //       "transaction_date" => $item['transaction_date'],
    //       "nominal" => $item['nominal'],
    //       "remark" => "PEMBAYARAN GORO UMROH",
    //     ]);
    //     echo $counter . PHP_EOL;
    //     $counter++;
    //   });

    //   $data = [
    //     [
    //       "account_name" => "LAIN",
    //       "account_type" => "GORO",
    //       "remark" => "TRANSACTION"
    //     ],
    //     [
    //       "account_name" => "STOR DO",
    //       "account_type" => "GORO",
    //       "remark" => NULL
    //     ],
    //     [
    //       "account_name" => "PG",
    //       "account_type" => "GORO",
    //       "remark" => "PINJAMAN MODAL"
    //     ],
    //   ];
    //   collect($data)->each(function ($item) {
    //     $accountType = UnitPayment::firstOrCreate([
    //       'account_name' => $item['account_name']
    //     ], [
    //       "account_name" => $item['account_name'],
    //       "account_type" => $item['account_type'],
    //       "remark" => $item['remark']
    //     ]);
    //   });
    //   DB::commit();
    // } catch (Exception $e) {
    //   DB::rollBack();
    //   dd($e);
    // }

    // $grouping = TransactionLoanOfficerGrouping::where('branch_id', 32)->where('kelompok', 6)->first();
    // $grouping->transactionSirculation()->createMany([
    //   [
    //     'date' => '2024-08-01',
    //     'day' => 'senin',
    //     'amount' => 48322000,
    //     "cm_amount" => 11700000,
    //     "mb_amount" => 0,
    //     "ml_amount" => 28713000,
    //   ],
    //   [
    //     'date' => '2024-08-01',
    //     'day' => 'selasa',
    //     'amount' => 40974000,
    //     "cm_amount" => 1190000,
    //     "mb_amount" => 0,
    //     "ml_amount" => 22594000,
    //   ],
    //   [
    //     'date' => '2024-08-01',
    //     'day' => 'rabu',
    //     'amount' => 42148000,
    //     "cm_amount" => 1700000,
    //     "mb_amount" => 0,
    //     "ml_amount" => 25408000,
    //   ],
    //   [
    //     'date' => '2024-08-01',
    //     'day' => 'kamis',
    //     'amount' => 40913000,
    //     "cm_amount" => 1285000,
    //     "mb_amount" => 0,
    //     "ml_amount" => 23983000,
    //   ],
    //   [
    //     'date' => '2024-08-01',
    //     'day' => 'jumat',
    //     'amount' => 47061000,
    //     "cm_amount" => 845000,
    //     "mb_amount" => 0,
    //     "ml_amount" => 30006000,
    //   ],
    //   [
    //     'date' => '2024-08-01',
    //     'day' => 'sabtu',
    //     'amount' => 52191000,
    //     "cm_amount" => 910000,
    //     "mb_amount" => 0,
    //     "ml_amount" => 35841000,
    //   ],
    // ]);
  }
}
