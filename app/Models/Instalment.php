<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Instalment extends Model
{
  use HasFactory;

  protected $fillable = [
    "loan_id",
    "pembayaran_date",
    "jumlah",
    "status",
    "mantri",
    "danatitipan",
    "total_angsuran",
    "saldo_terakhir",
  ];


  public function picmantri()
  {
    return $this->belongsTo(Employee::class, 'mantri', 'id');
  }


  public function loan()
  {
    return $this->belongsTo(Loan::class, 'loan_id', 'id');
  }
}
