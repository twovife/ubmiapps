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
    Schema::table('transaction_sirculations', function (Blueprint $table) {
      $table->integer('month1_amount')->default(0)->after('amount'); // tambahkan kolom baru di sini
      $table->integer('month2_amount')->default(0)->after('month1_amount'); // tambahkan kolom baru di sini
      $table->integer('ccm_amount')->default(0)->after('month2_amount'); // tambahkan kolom baru di sini
    });

    Schema::table('transaction_daily_recaps', function (Blueprint $table) {
      $table->integer('month1_amount')->default(0)->after('storting'); // tambahkan kolom baru di sini
      $table->integer('month2_amount')->default(0)->after('month1_amount'); // tambahkan kolom baru di sini
      $table->integer('ccm_amount')->default(0)->after('month2_amount'); // tambahkan kolom baru di sini
      $table->integer('cm_amount')->default(0)->after('ccm_amount'); // tambahkan kolom baru di sini
      $table->integer('mb_amount')->default(0)->after('cm_amount'); // tambahkan kolom baru di sini
      $table->integer('ml_amount')->default(0)->after('mb_amount'); // tambahkan kolom baru di sini
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void {}
};
