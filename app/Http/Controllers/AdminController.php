<?php

namespace App\Http\Controllers;

use App\Helpers\AppHelper;
use App\Models\Loan;
use App\Models\TransactionLoan;
use App\Models\TransactionLoanOfficerGrouping;
use App\Models\TransactionSirculation;
use App\Models\User;
use App\Models\VIsBalanceLoanWithDailyReport;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AdminController extends Controller
{

  public function index()
  {
    $role = Role::with('permissions', 'users')->get();
    $user = User::with('rolelist')->get();
    $maintenen_workers = User::permission('maintenance worker')->with('branch', 'employee')->get();
    // dd($maintenen_workers);

    $permission = Permission::all();
    return Inertia::render('AdminPanel/Index', [
      'role' => $role,
      'permission' => $permission,
      'user' => $user,
      'maintenen_workers' => $maintenen_workers
    ]);
  }
  public function monitoring_staff()
  {
    $transaction_loan_officer_grouping_id = TransactionLoanOfficerGrouping::whereHas('branch', function ($item) {
      $item->where('wilayah', 1);
    })->pluck('id');
    $angsuran = TransactionLoan::with('branch', 'loan_officer_grouping')->whereIn('transaction_loan_officer_grouping_id', $transaction_loan_officer_grouping_id)
      ->select('id', 'transaction_loan_officer_grouping_id', 'drop_date', 'hari')
      ->get();

    $mapingAngsuran = $angsuran->groupBy('branch.id')->map(function ($items) {
      return [
        'branch' => $items->first()->branch->unit,
        'days' => $items->groupBy('hari')->map(function ($dailyItems) {
          return [
            'hari' => AppHelper::getNumbDays($dailyItems->first()->hari),
            'day' => $dailyItems->first()->hari,
            'data' =>   $dailyItems->groupBy('transaction_loan_officer_grouping_id')->map(function ($kelompokItems) {
              return [
                'kelompok' => $kelompokItems->first()->loan_officer_grouping->kelompok,
                'data' => $kelompokItems->groupBy(function ($item) {
                  return Carbon::parse($item->drop_date)->format('Y-m');
                })->map(function ($monthlyItems) {
                  return [
                    'month' => Carbon::parse($monthlyItems->first()->drop_date)->format('Y-m'),
                    'count' => $monthlyItems->count('id')
                  ];
                })->values()
              ];
            })->values()
          ];
        })->values()->sortBy('hari')->values()
      ];
    })->sortBy('branch')->values();
    // dd($mapingAngsuran->first());
    return Inertia::render('AdminPanel/MonitoringStaff', [
      'datas' => $mapingAngsuran,

    ]);
  }

  public function post_permission(Request $request)
  {
    $request->validate([
      'name' => 'required',
      'type' => 'required',
    ]);

    if ($request->type == "permission") {
      $permission = Permission::create(['name' => $request->name]);
      return redirect()->back()->with('message', 'Permission Created Successfully');
    }

    if ($request->type == "role") {
      $role = Role::create(['name' => $request->name]);
      return redirect()->back()->with('message', 'Role Created Successfully');
    }

    return redirect()->back()->with('message', 'Role Created Successfully');
  }

  public function role_assign(Request $request)
  {

    try {
      $roleid = (int) $request->role;
      $perms = $request->permission;
      $role = Role::findById($roleid);
      $role->syncPermissions($perms);
    } catch (Exception $e) {
      return redirect()->back()->withErrors('User Assigned Error');
    }

    return redirect()->back()->with('message', 'Role Assigned Successfully');
  }
  public function user_assign(Request $request)
  {

    try {
      $userid = (int) $request->username;
      $roleid = (int) $request->role;

      $user = User::find($userid);
      $role = Role::findById($roleid);
      $user->syncRoles($role);
    } catch (Exception $e) {
      return redirect()->back()->withErrors('User Assigned Error');
    }

    return redirect()->back()->with('message', 'User Assigned Successfully');
  }

  public function sirkulasiAwal(Request $request)
  {
    // dd($request->all());
    $tanggal = Carbon::parse($request->month)->startOfMonth()->addMonthNoOverflow(1)->format('Y-m-d');

    try {
      DB::beginTransaction();
      // ddd($request->all());
      $sirkulasi = TransactionSirculation::firstOrCreate([
        "transaction_loan_officer_grouping_id" => $request->transaction_loan_officer_grouping_id,
        "date" => $tanggal,
        "day" => $request->hari
      ]);

      $sirkulasi->update([
        "amount" => $request->amount_next,
        "cm_amount" => $request->cm_next,
        "mb_amount" => $request->mb_next,
        "ml_amount" => $request->ml_next,
      ]);

      DB::commit();
    } catch (Exception $e) {
      DB::rollBack();
      ddd($e);
      return redirect()->back()->withErrors('Sirkulasi Awal Error');
    }
    return redirect()->back()->with('message', 'Sirkulasi Awal Successfully');
  }

  public function giveMaintenerWorker(Request $request)
  {
    $userid = (int) $request->username;
    if ($request->type == 1) {
      try {
        $user = User::find($userid);
        $user->givePermissionTo('maintenance worker');
      } catch (Exception $e) {
        return redirect()->back()->withErrors('User Assigned Error');
      }
    } else {
      try {
        $user = User::find($userid);
        $user->revokePermissionTo('maintenance worker');
      } catch (Exception $e) {
        return redirect()->back()->withErrors('User Assigned Error');
      }
    }
    return redirect()->back()->with('message', 'User Assigned Successfully');
  }

  public function loan_balancing(Request $request)
  {
    $transactions = TransactionLoan::select('id', 'drop_date', 'hari')->get();

    $inBalanceDay = $transactions->filter(function ($transaction) {
      return AppHelper::dateName($transaction->drop_date) !== $transaction->hari;
    })->count();
    dd($inBalanceDay);
  }
}
