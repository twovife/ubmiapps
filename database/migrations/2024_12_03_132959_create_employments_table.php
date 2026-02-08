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
    Schema::create('employments', function (Blueprint $table) {
      $table->id();
      $table->string('jabatan')->nullable();
      $table->timestamps();
    });

    Schema::table('employees', function (Blueprint $table) {
      $table->integer('employment_id')->nullable();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('employments');
  }
};
