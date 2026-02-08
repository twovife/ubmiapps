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
    // jika sudah ada table online_branches, maka skip migrasi ini
    if (Schema::hasTable('online_branches')) {
      return;
    }
    Schema::create('online_branches', function (Blueprint $table) {
      $table->id();
      $table->bigInteger('branch_id')->nullable();
      $table->date('online_date')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('online_branches');
  }
};
