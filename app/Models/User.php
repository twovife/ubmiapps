<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Traits\HasPermissions;
use Spatie\Permission\Traits\HasRoles;
use Znck\Eloquent\Traits\BelongsToThrough;

class User extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable, HasPermissions, HasRoles, BelongsToThrough;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */

  /**
   * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\Permission\Models\Role[] $roles
   * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\Permission\Models\Permission[] $permissions
   * @method bool hasPermissionTo($permission)
   * @method bool hasAnyPermission(...$permissions)
   */


  protected $fillable = [
    'employee_id',
    'username',
    'isactive',
    'email',
    'password',
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array<int, string>
   */
  protected $hidden = [
    'password',
    'remember_token',
  ];

  /**
   * The attributes that should be cast.
   *
   * @var array<string, string>
   */
  protected $casts = [
    'email_verified_at' => 'datetime',
  ];

  public function employee()
  {
    return $this->belongsTo(Employee::class);
  }


  public function branch()
  {
    return $this->BelongsToThrough(Branch::class, Employee::class);
  }

  public function rolelist()
  {
    return $this->belongsToMany(Role::class, 'model_has_roles', 'model_id', 'role_id');
  }
}
