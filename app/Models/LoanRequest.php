<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoanRequest extends Model
{
  use HasFactory;

  protected $fillable = [
    'transaction_date',
    'customer_id',
    'branch_id',
    'mantri',
    'kelompok',
    'hari',
    'pinjaman',
    'pinjaman_ke',
    'tanggal_drop',
    'approved_date',
    'approved_by',
    'status',
    'loan_notes',
  ];

  public function customer()
  {
    return $this->belongsTo(Customer::class, 'customer_id', 'id');
  }

  public function droper()
  {
    return $this->belongsTo(Employee::class, 'mantri', 'id');
  }

  public function approver()
  {
    return $this->belongsTo(Employee::class, 'approved_by', 'id');
  }

  public function branch()
  {
    return $this->belongsTo(Branch::class, 'branch_id', 'id');
  }

  public function loan()
  {
    return $this->hasOne(Loan::class, 'loan_request_id', 'id');
  }
}
