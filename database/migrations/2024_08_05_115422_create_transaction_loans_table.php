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
    Schema::create('transaction_loans', function (Blueprint $table) {
      $table->id();
      $table->bigInteger('transaction_manage_customer_id')->nullable();
      $table->bigInteger('transaction_loan_officer_grouping_id')->nullable();
      $table->bigInteger('old_id')->nullable();

      $table->bigInteger('drop_before')->nullable();
      $table->date('drop_date_before')->nullable();

      $table->date('drop_date')->nullable();
      $table->date('request_date')->nullable();
      $table->bigInteger('request_nominal')->nullable();
      $table->bigInteger('user_mantri')->nullable();

      $table->bigInteger('approved_nominal')->nullable();
      $table->date('check_date')->nullable();
      $table->bigInteger('user_check')->nullable();

      $table->bigInteger('nominal_drop')->nullable();
      $table->bigInteger('user_drop')->nullable();

      $table->bigInteger('pinjaman')->storedAs('nominal_drop * 1.3')->nullable();

      $table->string('hari', 255)->nullable();
      $table->integer('pinjaman_ke')->nullable();
      $table->string('status', 255)->nullable();
      $table->string('notes')->nullable();
      $table->bigInteger('user_input')->nullable();
      $table->boolean('drop_langsung')->storedAs('CASE WHEN request_date = drop_date THEN TRUE ELSE FALSE END');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('transaction_loans');
  }
};
