<?php

namespace App\Http\Controllers;

use App\Helpers\AppHelper;
use App\Models\Branch;
use App\Models\Employee;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class EmployeeController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  {

    $authorized = auth()->user();
    $branch_id = $authorized->can('can show branch') ? ($request->branch_id ?? 1) : $authorized->employee->branch_id;
    $wilayah = $authorized->can('can show branch') ? (Branch::find($branch_id)->wilayah ?? 1) : $authorized->employee->branch->wilayah;
    $kelompok = $authorized->can('can show kelompok') ? ($request->kelompok ?? 1) : $authorized->employee->area;
    $userAuthorized = AppHelper::branch_permission($authorized, $branch_id);
    // dd($userAuthorized);


    $roles = Role::with('permissions', 'users')->get();
    $employee = Employee::with('username.rolelist', 'employment')->where('branch_id', $branch_id)
      ->select('id', 'branch_id', 'nik', 'nama_karyawan', 'alamat', 'hire_date', 'area', 'janis_jaminan', 'date_resign', 'resign_status', 'resign_reson', 'employment_id')
      ->orderBy('date_resign')
      ->orderBy('employment_id')
      ->orderBy('area')
      ->get();


    $data = $employee->map(function ($item) {
      $username = $item->username->first();
      return [
        'id' => $item->id,
        'branch_id' => $item->branch_id,
        'identity_id' => $item->nik,
        'employee_name' => $item->nama_karyawan,
        'username' => $username?->username,
        'rolelist' => $username?->rolelist->map(function ($role) {
          return [
            'name' => $role->name
          ];
        }),
        'username_status' => $item->username->first()?->isactive,
        'address' => $item->alamat,
        'employment' => $item->employment->jabatan == "mantri" ? $item->employment->jabatan . " " . $item->area : $item->employment->jabatan,
        'isActive' => $item->date_resign ? false : true,
        'resign_date' => $item->date_resign,
        'hire_date' => $item->hire_date,
      ];
    });

    // dd($data);

    return Inertia::render('WebView/ManPower/Index', [
      'datas' => $data,
      'roles' => $roles,
      'server_filter' => [
        'wilayah' => $wilayah,
        'branch' => $userAuthorized['branches'],
        'userAuthorized' => $userAuthorized,
        'branch_id' => $branch_id
      ]
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    $branchCode = Branch::find($request->branch_id)->code;
    $_suffix = "_" . strtolower($branchCode);
    $request->merge(['username' => $request->username . $_suffix]);
    $validate = $request->validate([
      'id' => ['required'],
      'branch_id' => ['required'],
      'username' => ['required', 'unique:users,username'],
      'role' => ['required'],
    ]);


    try {
      DB::beginTransaction();
      $employee = Employee::find($request->id);
      $users = $employee->username()->create([
        'username' => $request->username,
        'password' => Hash::make('4343abab'),
        'email' => $request->username . '@usberdigital.com',
        'isactive' => 1
      ]);

      $role = Role::findById($request->role);
      $users->syncRoles($role);
      DB::commit();
    } catch (Exception $e) {
      DB::rollBack();
      ddd($e);
      return redirect()->back()->withErrors('Gagal Membuat User');
    }
    return redirect()->back()->with('message', 'Berhasil Membuat User');
  }

  /**
   * Display the specified resource.
   */
  public function show(Employee $employee)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Employee $employee)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Employee $employee)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Employee $employee)
  {
    //
  }
}
