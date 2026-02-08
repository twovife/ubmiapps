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
    Schema::table('transaction_loans', function (Blueprint $table) {
      $table->date('out_date')->nullable();
      $table->string('out_status')->nullable(); // isinya BHT, LUNAS, PENGAJUAN, MACET, PEMUTIHAN
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::table('transaction_loans', function (Blueprint $table) {
      //
    });
  }
};
