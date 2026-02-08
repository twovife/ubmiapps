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
    Schema::create('transaction_sirculations', function (Blueprint $table) {
      $table->id();
      $table->bigInteger('transaction_loan_officer_grouping_id')->nullable();
      $table->date('date')->nullable();
      $table->string('day')->nullable();
      $table->bigInteger('amount')->nullable();
      $table->bigInteger('cm_amount')->nullable();
      $table->bigInteger('mb_amount')->nullable();
      $table->bigInteger('ml_amount')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('transaction_sirculations');
  }
};
