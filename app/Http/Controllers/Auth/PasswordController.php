<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class PasswordController extends Controller
{
  /**
   * Update the user's password.
   */
  public function update(Request $request): RedirectResponse
  {
    $validated = $request->validate([
      'current_password' => ['required', 'current_password'],
      'password' => ['required', Password::defaults(), 'confirmed'],
    ], [
      'current_password.current_password' => 'Password lama tidak sesuai',
      'password.required' => 'Password baru harus diisi',
      'password.confirmed' => 'Password baru tidak sesuai',
      'password.min' => 'Password baru minimal 8 karakter',
    ]);

    $request->user()->update([
      'password' => Hash::make($validated['password']),
    ]);

    return back()->with('message', 'Password berhasil diperbarui');
  }
}
