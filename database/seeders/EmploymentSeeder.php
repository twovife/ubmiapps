<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\Employment;
use Exception;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EmploymentSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $employment = collect([
      ['jabatan' => 'pimpinan'],
      ['jabatan' => 'wakil pimpinan'],
      ['jabatan' => 'kepala mantri'],
      ['jabatan' => 'staf'],
      ['jabatan' => 'kasir'],
      ['jabatan' => 'mantri'],
      ['jabatan' => 'pusat'],
    ]);

    $employment->each(function ($item, $key) {
      Employment::firstOrCreate($item);
    });

    echo 'emplyment_generated' . PHP_EOL;
    $employmentData = Employment::all();
    echo 'employment called' . PHP_EOL;
    $employees = Employee::get();
    echo 'employee called' . PHP_EOL;

    try {
      DB::beginTransaction();
      $employees->each(function ($employee) use ($employmentData) {
        if ($employee->jabatan === 'pimpinan') {
          $employee->update(['employment_id' => $employmentData->where('jabatan', 'pimpinan')->first()->id]);
        } elseif ($employee->jabatan === 'wakil pimpinan') {
          $employee->update(['employment_id' => $employmentData->where('jabatan', 'wakil pimpinan')->first()->id]);
        } elseif ($employee->jabatan === 'kepala mantri') {
          $employee->update(['employment_id' => $employmentData->where('jabatan', 'kepala mantri')->first()->id]);
        } elseif ($employee->jabatan === 'staf') {
          $employee->update(['employment_id' => $employmentData->where('jabatan', 'staf')->first()->id]);
        } elseif ($employee->jabatan === 'kasir') {
          $employee->update(['employment_id' => $employmentData->where('jabatan', 'kasir')->first()->id]);
        } elseif ($employee->jabatan === 'mantri') {
          $employee->update(['employment_id' => $employmentData->where('jabatan', 'mantri')->first()->id]);
        } else {
          $employee->update(['employment_id' => $employmentData->where('jabatan', 'pusat')->first()->id]);
        }
        echo $employee->id . PHP_EOL;
      });
      DB::commit();
    } catch (Exception $e) {
      throw $e;
    }
  }
}
