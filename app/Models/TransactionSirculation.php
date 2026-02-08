<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionSirculation extends Model
{
  use HasFactory;

  protected $fillable = ["transaction_loan_officer_grouping_id", "date", "day", "amount", "cm_amount", "mb_amount", "ml_amount", "ccm_amount", "month2_amount", "month1_amount"];


  public function transaction_loan_officer_grouping()
  {
    return $this->belongsTo(TransactionLoanOfficerGrouping::class, 'transaction_loan_officer_grouping_id', 'id');
  }
}
