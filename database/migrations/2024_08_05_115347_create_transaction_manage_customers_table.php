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
    Schema::create('transaction_manage_customers', function (Blueprint $table) {
      $table->id();
      $table->bigInteger('transaction_customer_id')->nullable();
      $table->bigInteger('transaction_loan_officer_grouping_id')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('transaction_manage_customers');
  }
};
