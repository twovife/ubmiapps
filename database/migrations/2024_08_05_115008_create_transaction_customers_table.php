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
        Schema::create('transaction_customers', function (Blueprint $table) {
            $table->id();
            $table->string('nama', 255)->nullable();
            $table->string('nik', 255)->nullable();
            $table->string('no_kk', 255)->nullable();
            $table->string('alamat', 255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_customers');
    }
};
