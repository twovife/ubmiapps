<?php

namespace Database\Seeders;

use App\Helpers\AppHelper;
use App\Models\TransactionCustomer;
use App\Models\TransactionLoanOfficerGrouping;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BatchInputSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $nasabahRaw = collect(json_decode(file_get_contents(storage_path('KDRFIXNIK.json'))));

    // Pre-process JSON dulu (biar gak hitung carbon/helper berulang kali)

    $nasabah = $nasabahRaw->map(function ($ns) {
      // dump($ns);
      $ns->new_nik = AppHelper::callUnknownNik($ns, true);
      $ns->day = Carbon::parse($ns->drop_date)->dayOfWeek;
      $ns->tanggal_angsuran = Carbon::parse($ns->drop_date)->addWeek()->toDateString();
      $ns->pinjaman = $ns->nominal * 1.3;
      $ns->angsuran_pertama = ($ns->nominal * 1.3) - ($ns->saldo ?? 0);

      return $ns;
    });


    $totalBatch = ceil($nasabah->count() / 100);
    $batchIndex = 1;
    // Preload grouping biar gak query berulang
    $officerGrouping = TransactionLoanOfficerGrouping::where('branch_id', 33)
      ->get()
      ->keyBy('kelompok');

    // Proses per 100 data
    $nasabah->chunk(100)->each(function ($batch) use ($officerGrouping, &$batchIndex, $totalBatch) {

      DB::beginTransaction();

      try {
        // preload customer yang udah ada biar gak query berulang
        foreach ($batch as $ns) {
          $mantriChoice = $officerGrouping[$ns->kelompok] ?? null;
          if (!$mantriChoice) {
            echo "⚠️ Kelompok {$ns->kelompok} tidak ditemukan\n";
            continue;
          }

          // 1804 mdn8
          // 1723 mdn5
          // 1622 mdn2
          $mantri = AppHelper::getMantriNoauth($mantriChoice, 922);

          // ambil customer dari cache atau buat baru
          $customer =  TransactionCustomer::firstOrCreate(['nik' => $ns->new_nik], [
            'nama' => $ns->nama,
            'alamat' => $ns->alamat,
          ]);

          // relasi manage_customer
          $manage = $customer->manage_customer()->firstOrCreate([
            'transaction_loan_officer_grouping_id' => $mantriChoice->id,
            'day' => $ns->day,
          ]);

          // buat loan
          $loan = $manage->loan()->create([
            'transaction_loan_officer_grouping_id' => $mantriChoice->id,
            'request_date' => $ns->drop_date,
            'user_mantri' => $mantri,
            'drop_date' => $ns->drop_date,
            'hari' => AppHelper::dateName($ns->drop_date),
            'status' => "open",
            'user_input' => 4955,
            'drop_before' => 0,
            'request_nominal' => $ns->nominal,
          ]);

          $loan->update([
            'user_drop' => $mantri,
            'status' => "success",
            'nominal_drop' => $ns->nominal,
            'request_nominal' => null,
          ]);

          if (($ns->nominal * 1.3) > $ns->saldo) {
            $loan->loan_instalment()->create([
              'transaction_date' => $ns->tanggal_angsuran,
              'nominal' => $ns->angsuran_pertama,
              'danatitipan' => 0,
              'transaction_loan_officer_grouping_id' => $mantriChoice->id,
              'status' => AppHelper::generateStatusAngsuran($loan->drop_date, $ns->tanggal_angsuran),
              'user_input' => 4955,
              'user_mantri' => $mantri,
            ]);
          }


          // buat cicilan pertama

          echo "✅ Loan {$loan->id} ||{$ns->drop_date} || nik {$ns->nik} sukses di-generate\n";
        }

        echo "✅ Batch {$batchIndex}/{$totalBatch} sukses (" . count($batch) . " data)\n";

        // jeda biar server gak panas (0.05 detik)
        usleep(100000);

        $batchIndex++; // kasih jeda 0.1 detik biar gak kebanyakan transaksi per detik

        DB::commit();
      } catch (\Throwable $e) {
        DB::rollBack();
        echo "❌ Error batch: " . $e->getMessage() . $ns->nik . "\n";
      }
    });

    echo "🎉 Import selesai!\n";
  }
}
