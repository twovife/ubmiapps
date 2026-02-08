<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Exception;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
  /**
   * Display the registration view.
   */
  public function create(): Response
  {
    $employees = Employee::where('branch_id', 2)->whereNull('date_resign')->get();
    return Inertia::render('Auth/Register', [
      'employees' => $employees,
    ]);
  }

  /**
   * Handle an incoming registration request.
   *
   * @throws \Illuminate\Validation\ValidationException
   */
  public function store(Request $request)
  {

    // dd($request->all());

    $request->validate([
      'employee_id' => ['required'],
      'username' => ['required', 'unique:users,username'],
      'password' => ['required', 'confirmed', Rules\Password::defaults()],
    ]);

    try {
      DB::beginTransaction();
      User::create([
        'employee_id' => $request->employee_id,
        'username' => $request->username,
        'password' => Hash::make($request->password),
        'email' => $request->username . '@gmail.com',
        'isactive' => 1
      ]);

      DB::commit();
    } catch (Exception $e) {
      ddd($e);
      return redirect()->back()->withEror('gagal');
    }
    return redirect()->back()->with('message', 'sukses');
  }
}
