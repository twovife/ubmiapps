<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
  /**
   * The root template that is loaded on the first page visit.
   *
   * @var string
   */
  protected $rootView = 'app';

  /**
   * Determine the current asset version.
   */
  public function version(Request $request): string|null
  {
    return parent::version($request);
  }

  /**
   * Define the props that are shared by default.
   *
   * @return array<string, mixed>
   */
  public function share(Request $request): array
  {

    return array_merge(parent::share($request), [
      'auth' => [
        'user' =>  $request->user() ? $request->user()->load('employee', 'employee.branch') : $request->user(),
        'permissions' =>  $request->user() ? $request->user()->getAllPermissions()->pluck('name') : [],
      ],
      'ziggy' => function () use ($request) {
        return array_merge((new Ziggy)->toArray(), [
          'location' => $request->url(),
        ]);
      },
      'flash' => [
        'message' => fn() => $request->session()->get('message'),
        'timestamp' => fn() => Carbon::now(),
      ],
      'printUrl' => [
        'url' => $request->session()->get('printUrl'),
        'timestamp' => fn() => Carbon::now(),
      ]
      // 'serverStorage' => function () use ($request) {
      //     $getSessionFilter = Session::get($request);
      //     return $getSessionFilter;
      // },
    ]);
  }
}
