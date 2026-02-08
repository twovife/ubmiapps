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
    Schema::create('debt_reliefs', function (Blueprint $table) {
      $table->id();
      $table->bigInteger('transaction_loan_id');
      $table->bigInteger('transaction_loan_officer_grouping_id');
      $table->date('relief_date');
      $table->bigInteger('nominal');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('debt_reliefs');
  }
};
