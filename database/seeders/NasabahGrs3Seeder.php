<?php

namespace Database\Seeders;

use App\Models\TransactionCustomer;
use Exception;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NasabahGrs3Seeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {

    try {
      DB::beginTransaction();
      $nasabah = collect(json_decode(file_get_contents(storage_path('nasabahgrs3.json')), true));


      $nasabah->each(function ($item) {
        $transaksi = TransactionCustomer::firstOrCreate([
          'nik' => $item['NIK']
        ], [
          'nama' => $item['NAMA'],
          'alamat' => $item['DOMISILI']
        ]);

        if ($transaksi->wasRecentlyCreated) {
          // Jika $transaksi baru dibuat
          echo   $item['NIK'] . "Instance baru dibuat." . PHP_EOL;
        } else {
          // Jika $transaksi ditemukan
          echo   $item['NIK'] . "Instance Sudah ada." . PHP_EOL;
        }
      });

      echo $nasabah->count() . " Data Nasabah GRS 3" . PHP_EOL;
      DB::commit();
    } catch (Exception $e) {
      DB::rollBack();
    }
  }
}
