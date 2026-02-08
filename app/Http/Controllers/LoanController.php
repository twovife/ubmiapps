<?php

namespace App\Http\Controllers;

use App\Helpers\AppHelper;
use App\Models\Customer;
use App\Models\Employee;
use App\Models\Instalment;
use App\Models\Loan;
use App\Models\LoanRequest;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class LoanController extends Controller
{
  //
}
