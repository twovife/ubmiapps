<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
  use HasFactory;

  protected $fillable  = [
    'nip',
    'nama_karyawan',
    'nik',
    'alamat',
    'kota',
    'hire_date',
    'jabatan',
    'area',
    'branch_id',
    'janis_jaminan',
    'date_resign',
    'resign_status',
    'resign_reson',
    'pencairan_simpanan_date',
    'pencairan_simpanan_by',
    'pencairan_simpanan_w_date',
    'pencairan_simpanan_w_by',
    'handover_jaminan',
    'handover_jaminan_by',
  ];

  public function branch()
  {
    return $this->belongsTo(Branch::class);
  }

  public function username()
  {
    return $this->hasMany(User::class, 'employee_id', 'id');
  }

  public function employment()
  {
    return $this->belongsTo(Employment::class);
  }
}
