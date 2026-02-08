<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermitSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    Permission::create(['name' => 'can show branch']);
    Permission::create(['name' => 'can show kelompok']);
    Permission::create(['name' => 'can create']);
    Permission::create(['name' => 'can update']);
    Permission::create(['name' => 'can update pusat']);
    Permission::create(['name' => 'can create pusat']);
    Permission::create(['name' => 'mantri apps']);
    Permission::create(['name' => 'pusat apps']);
    Permission::create(['name' => 'unit apps']);
    Permission::create(['name' => 'unit kasir']);
    Permission::create(['name' => 'unit pimpinan']);
    Permission::create(['name' => 'unit mantri']);

    $mantri = Role::create(['name' => 'mantri']);
    $mantri->givePermissionTo(['can create', 'mantri apps', 'area', 'unit mantri']);

    $admin = Role::create(['name' => 'kasir']);
    $admin->givePermissionTo(['can create', 'can update', 'mantri apps', 'unit apps', 'unit', 'can show kelompok', 'unit kasir']);

    $admin = Role::create(['name' => 'pimpinan']);
    $admin->givePermissionTo(['can create', 'can update', 'mantri apps', 'unit apps', 'unit', 'can show kelompok', 'unit pimpinan']);

    $pusat = Role::create(['name' => 'admin']);
    $pusat->givePermissionTo(['can create pusat', 'can update pusat', 'mantri apps', 'unit apps', 'pusat apps', 'pusat', 'can show kelompok', 'can show branch']);
  }
}
