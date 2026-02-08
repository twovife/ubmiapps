<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
  use HasFactory;

  protected $fillable = [
    "nama",
    "nik",
    "no_kk",
    "alamat",
    "unit_id",
    "mantri",
    "area",
  ];

  public function loan_request()
  {
    return $this->hasMany(LoanRequest::class, 'customer_id', 'id');
  }

  public function loan()
  {
    return $this->hasMany(Loan::class, 'customer_id', 'id');
  }

  public function employee()
  {
    return $this->belongsTo(Employee::class, "mantri", 'id');
  }

  public function branch()
  {
    return $this->belongsTo(Branch::class, 'unit_id', 'id');
  }
}
