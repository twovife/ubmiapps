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

class BatchInputV2Seeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  private function createAngsuran(
    $loan,
    string $tanggal,
    $nominal,
    $mantriChoice,
    int $mantri
  ): void {
    if ($nominal === null || $nominal === '' || $nominal <= 0) {
      return;
    }

    $loan->loan_instalment()->create([
      'transaction_date' => $tanggal,
      'nominal' => $nominal,
      'danatitipan' => 0,
      'transaction_loan_officer_grouping_id' => $mantriChoice->id,
      'status' => AppHelper::generateStatusAngsuran(
        $loan->drop_date,
        $tanggal
      ),
      'user_input' => 4955,
      'user_mantri' => $mantri,
    ]);
  }

  public function run(): void
  {

    $nasabahRaw = collect(json_decode(file_get_contents(storage_path('smg1sbt.json'))));

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

    $id_branch = 87;
    $id_mantri_default = 2474;

    $totalBatch = ceil($nasabah->count() / 100);
    $batchIndex = 1;
    // Preload grouping biar gak query berulang
    $officerGrouping = TransactionLoanOfficerGrouping::where('branch_id', $id_branch)
      ->get()
      ->keyBy('kelompok');

    // Proses per 100 data
    $nasabah->chunk(100)->each(function ($batch) use ($id_mantri_default, $officerGrouping, &$batchIndex, $totalBatch) {

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
          $mantri = AppHelper::getMantriNoauth($mantriChoice, $id_mantri_default);

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

          switch (AppHelper::dateName($ns->drop_date)) {
            case 'jumat':
              $date_angs1 = "2026-01-02";
              $date_angs2 = "2026-01-09";
              $date_angs3 = "2026-01-23";
              break;
            case 'sabtu':
              $date_angs1 = "2026-01-03";
              $date_angs2 = "2026-01-10";
              $date_angs3 = "2026-01-17";
              break;
            // minggu
            case 'senin':
              $date_angs1 = "2026-01-05";
              $date_angs2 = "2026-01-12";
              $date_angs3 = "2026-01-19";
              break;
            case 'selasa':
              $date_angs1 = "2026-01-06";
              $date_angs2 = "2026-01-13";
              $date_angs3 = "2026-01-20";
              break;
            case 'rabu':
              $date_angs1 = "2026-01-07";
              $date_angs2 = "2026-01-14";
              $date_angs3 = "2026-01-21";
              break;
            case 'kamis':
              $date_angs1 = "2026-01-08";
              $date_angs2 = "2026-01-15";
              $date_angs3 = "2026-01-22";
              break;

            default:
              $date_angs1 = "2026-01-05";
              $date_angs2 = "2026-01-12";
              $date_angs3 = "2026-01-19";
              break;
          }

          if (isset($ns->angs_1) && is_numeric($ns->angs_1) && $ns->angs_1 > 0) {
            $this->createAngsuran(
              $loan,
              $date_angs1,
              $ns->angs_1,
              $mantriChoice,
              $mantri
            );
          }

          if (isset($ns->angs_2) && is_numeric($ns->angs_2) && $ns->angs_2 > 0) {
            $this->createAngsuran(
              $loan,
              $date_angs2,
              $ns->angs_2,
              $mantriChoice,
              $mantri
            );
          }
          if (isset($ns->angs_3) && is_numeric($ns->angs_3) && $ns->angs_3 > 0) {
            $this->createAngsuran(
              $loan,
              $date_angs3,
              $ns->angs_3,
              $mantriChoice,
              $mantri
            );
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
