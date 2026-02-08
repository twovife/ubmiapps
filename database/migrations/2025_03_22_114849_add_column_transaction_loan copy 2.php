<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    if (Schema::hasColumn('transaction_loans', 'total_angsuran')) {
      return; // jika kolom sudah ada, maka skip migrasi ini
    }
    Schema::table('transaction_loans', function (Blueprint $table) {
      $table->integer('total_angsuran')->default(0)->after('pinjaman'); // tambahkan kolom baru di sini
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void {}
};
