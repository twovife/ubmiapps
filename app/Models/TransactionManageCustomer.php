<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Znck\Eloquent\Traits\BelongsToThrough;

class TransactionManageCustomer extends Model
{
  use HasFactory;
  use BelongsToThrough;

  protected $fillable = [
    "transaction_customer_id",
    "transaction_loan_officer_grouping_id",
    "day",
    "residential_address",
    "alternative_name",
    "status",
    'notes'
  ];

  public function customers()
  {
    return $this->belongsTo(TransactionCustomer::class, 'transaction_customer_id', 'id');
  }

  public function loan()
  {
    return $this->hasMany(TransactionLoan::class, 'transaction_manage_customer_id', 'id');
  }

  public function latestTransaction()
  {
    return $this->hasOne(TransactionLoan::class, 'transaction_manage_customer_id', 'id')
      ->where('status', 'success')
      ->latest('drop_date'); // atau pakai 'drop_date' kalau itu kolom waktunya
  }

  // Di model ManageCustomer.php


  public function loan_officer_grouping()
  {
    return $this->belongsTo(TransactionLoanOfficerGrouping::class, 'transaction_loan_officer_grouping_id', 'id');
  }

  public function branch()
  {
    return $this->belongsToThrough(Branch::class, TransactionLoanOfficerGrouping::class);
  }
}




