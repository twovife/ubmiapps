<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionLoanOfficerGrouping extends Model
{
  use HasFactory;

  protected $fillable = ['branch_id', 'kelompok'];


  public function branch()
  {
    return $this->belongsTo(Branch::class);
  }

  public function transactionDailyRecap()
  {
    return $this->hasMany(TransactionDailyRecap::class);
  }

  public function transactionSirculation()
  {
    return $this->hasMany(TransactionSirculation::class);
  }
}
