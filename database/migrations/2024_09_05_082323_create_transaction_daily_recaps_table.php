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
    Schema::create('transaction_daily_recaps', function (Blueprint $table) {
      $table->id();
      $table->bigInteger('transaction_loan_officer_grouping_id')->nullable();
      $table->date('date')->nullable();

      $table->bigInteger('kasbon')->default(0);
      $table->bigInteger('storting')->default(0);

      $table->bigInteger('sharingdo')->storedAs('drop * 0.11')->default(0); //do 11%
      $table->bigInteger('titipan')->storedAs('drop * 0.9')->default(0); //do 9%
      $table->bigInteger('debt')->storedAs('drop * 0.11 + kasbon + storting')->default(0);

      $table->bigInteger('drop')->default(0);
      $table->bigInteger('transport')->default(0);
      $table->bigInteger('kred')->storedAs('drop + transport')->default(0);
      $table->decimal('tunai', 20, 0)->storedAs('debt - kred')->default(0);

      $table->bigInteger('masuk')->storedAs('drop * 0.13')->default(0);
      $table->bigInteger('keluar')->default(0);
      $table->bigInteger('target')->default(0);


      $table->timestamp('daily_kepala_approval')->nullable();
      $table->bigInteger('daily_kepala_approval_user')->nullable();

      $table->timestamp('daily_kasir_approval')->nullable();
      $table->bigInteger('daily_kasir_approval_user')->nullable();

      $table->timestamp('monthly_kepala_approval')->nullable();
      $table->bigInteger('monthly_kepala_approval_user')->nullable();

      $table->timestamp('monthly_kasir_approval')->nullable();
      $table->bigInteger('monthly_kasir_approval_user')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('transaction_daily_recaps');
  }
};
