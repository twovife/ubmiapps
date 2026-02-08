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
    Schema::create('employment_permissions', function (Blueprint $table) {
      $table->id();
      $table->integer('employee_id')->nullable();
      $table->integer('branch_id')->nullable();
      $table->integer('can_create')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('employment_permissions');
  }
};
