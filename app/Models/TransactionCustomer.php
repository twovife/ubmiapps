<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionCustomer extends Model
{
  use HasFactory;

  protected $fillable  = [
    "nama",
    "nik",
    "no_kk",
    "alamat",
  ];

  public function manage_customer()
  {
    return $this->hasMany(TransactionManageCustomer::class, 'transaction_customer_id', 'id');
  }

  public function transaction_loans()
  {
    return $this->hasManyThrough(
      TransactionLoan::class, // Model tujuan (Loan)
      TransactionManageCustomer::class, // Model perantara (ManageCustomer)
      'transaction_customer_id', // Foreign key di tabel manage_customer
      'transaction_manage_customer_id', // Foreign key di tabel loan
      'id', // Primary key di tabel customer
      'id'  // Primary key di tabel manage_customer
    );
  }
}
