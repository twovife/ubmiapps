<?php

namespace App\Http\Controllers;

use App\Helpers\AppHelper;
use App\Models\Employee;
use App\Models\TransactionCustomer;
use App\Models\TransactionLoan;
use App\Models\TransactionLoanInstalment;
use App\Models\TransactionLoanOfficerGrouping;
use App\Traits\PinjamanTrait;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TransactionLoanController extends Controller
{


  use PinjamanTrait;

  public function fastcreate(Request $request)
  {

    return Inertia::render('WebView/BukuTransaksi/BatchUpload');
  }


  // 1
  public function fastcreatev2(Request $request)
  {


    return Inertia::render('WebView/BukuTransaksi/FastCreateV2');
  }


  public function inputmacet(Request $request)
  {


    return Inertia::render('WebView/BukuTransaksi/InputMacet');
  }


  public function index_buku_transaksi(Request $request)
  {

    $data = $this->getTransactionLoan($request, true);
    return Inertia::render('WebView/BukuTransaksi/TransaksiMantri', $data);
  }



  // 2

  //  GET NIK FOR AXIOS
  public function nasabah_buku_transaksi(Request $request)
  {
    $prefix = strtoupper(substr($request->nik, 0, 2));

    if ($prefix == "UB" || $prefix == "ML") {
      return response()->json(['data' =>  null, 'return_nik' => $request->nik]);
    }

    $userEmp = auth()->user()->employee;

    $validate = $request->validate([
      'nik' => ['required', 'digits:16']
    ], [
      'required' => 'Harus Di isi',
      'digits' => 'Angka Harus 16 Digit'
    ]);

    $nasabah = TransactionCustomer::with(
      [
        'manage_customer' => function ($cust) {
          $cust->with([
            'latestTransaction',
            'loan_officer_grouping',
            'branch'
          ])->whereHas('latestTransaction', function ($item) {
            $item->where('status', 'success');
          });
        }
      ]
    )->where('nik', $request->nik)->first();


    $mapingBranch = $nasabah?->manage_customer
      ->groupBy(
        function ($customer) {
          return $customer->loan_officer_grouping->id; // Group by branch ID
        }
      )->map(function ($group) {
        $outDate = $group->first()->latestTransaction->out_date;
        $latestTransaction = $group->first()->latestTransaction;
        return [
          'wilayah' => $group->first()->branch->wilayah,
          'branch_id' => $group->first()->branch->id,
          'branch' => $group->first()->branch->unit,
          'branch2' => $group->first()->branch->unit,
          'kelompok' => $group->first()->loan_officer_grouping->kelompok,
          'kelompok_id' => $group->first()->loan_officer_grouping->kelompok,
          'day' => AppHelper::getNumberToNameDays($group->first()->day),
          'pinjaman' => $latestTransaction->drop_date,
          'out_date' => $latestTransaction->out_date,
          'lunas' => $outDate ? 'lunas' : 'belum_lunas',
          'status_show' => true,
          'status_id' => $outDate ? AppHelper::generateStatusAngsuran($latestTransaction->drop_date, $latestTransaction->out_date) : AppHelper::generateStatusAngsuran($latestTransaction->drop_date, Carbon::now()->format('Y-m-d')),
          'status' => $outDate ? AppHelper::generateStatusAngsuranString($latestTransaction->drop_date, $latestTransaction->out_date) : AppHelper::generateStatusAngsuranString($latestTransaction->drop_date, Carbon::now()->format('Y-m-d')),
          // 'tanggal_pinjaman' => $group->loan->latest('drop_date')->drop_date->format('Y-m-d'),
        ];
      });

    $data = $nasabah ?
      [
        'nik' => $nasabah->nik,
        'nama' => $nasabah->nama,
        'alamat' => $nasabah->alamat,
        'history_branch' => $mapingBranch->filter(function ($item) use ($userEmp) {
          return $item['branch_id'] === $userEmp->branch_id;
        })->sortBy('kelompok')->values(),


        'history_lain' => $mapingBranch->filter(function ($item) use ($userEmp) {
          return $item['branch_id'] !== $userEmp->branch_id;
        })->sortBy('kelompok')->sortBy('branch2')->sortBy('wilayah')->values(),


        'history_macet_lain' => $mapingBranch->filter(function ($item) use ($userEmp) {
          return $item['branch_id'] !== $userEmp->branch_id && $item['status_id'] >= 3;
        })
          ->map(function ($item) {
            // sensor nama kantor di sini
            $item['kelompok'] = '??';
            return $item;
          })->sortBy('kelompok')->sortBy('branch2')->sortBy('wilayah')->values(),

        'history_target' => $mapingBranch->filter(function ($item) use ($userEmp) {
          return $item['branch_id'] !== $userEmp->branch_id && $item['status_id'] < 3 && $item['lunas'] == 'belum_lunas';
        })
          ->map(function ($item) {
            // sensor nama kantor di sini
            $item['branch'] = '????';
            $item['kelompok'] = '??';
            $item['status_show'] = false;
            return $item;
          })->sortBy('pinjaman')->sortBy('day')->values(),


        // $nasabah->manage_customer
        //   ->filter(function ($customer) use ($userEmp) {
        //     return $customer->branch && $customer->branch->id === $userEmp->branch_id;
        //   })
        //   ->groupBy(
        //     function ($customer) {
        //       return $customer->loan_officer_grouping->id; // Group by branch ID
        //     }
        //   )->map(function ($group) {
        //     $outDate = $group->first()->latestTransaction->out_date;
        //     $latestTransaction = $group->first()->latestTransaction;
        //     return [
        //       'branch' => $group->first()->branch->unit,
        //       'kelompok' => $group->first()->loan_officer_grouping->kelompok,
        //       'day' => AppHelper::getNumberToNameDays($group->first()->day),
        //       'pinjaman' => $latestTransaction->drop_date,
        //       'out_date' => $latestTransaction->out_date,
        //       'lunas' => $outDate ? 'lunas' : 'belum_lunas',
        //       'status' => $outDate ? AppHelper::generateStatusAngsuranString($latestTransaction->drop_date, $latestTransaction->out_date) : AppHelper::generateStatusAngsuranString($latestTransaction->drop_date, Carbon::now()->format('Y-m-d')),
        //       // 'tanggal_pinjaman' => $group->loan->latest('drop_date')->drop_date->format('Y-m-d'),
        //     ];
        //   })->sortBy('kelompok')->values(),
        // maping group disini dengan return (transaction_manage_customers.transaction_loan_officer_grouping_id, transaction_manage_customers.day)

        // 'history_lain' => $nasabah->manage_customer
        //   ->filter(function ($customer) use ($userEmp) {
        //     return $customer->branch && $customer->branch->id != $userEmp->branch_id;
        //   })
        //   ->groupBy(
        //     function ($customer) {
        //       return $customer->loan_officer_grouping->id; // Group by branch ID
        //     }
        //   )->map(function ($group, $key) {
        //     $outDate = $group->first()->latestTransaction->out_date;
        //     $latestTransaction = $group->first()->latestTransaction;
        //     return [
        //       'branch' => $group->first()->branch->unit,
        //       'kelompok' => $group->first()->loan_officer_grouping->kelompok,
        //       'day' => AppHelper::getNumberToNameDays($group->first()->day),
        //       'pinjaman' => $latestTransaction->drop_date,
        //       'out_date' => $latestTransaction->out_date,
        //       'lunas' => $outDate ? 'lunas' : 'belum_lunas',
        //       'status' => $outDate ? AppHelper::generateStatusAngsuranString($latestTransaction->drop_date, $latestTransaction->out_date) : AppHelper::generateStatusAngsuranString($latestTransaction->drop_date, Carbon::now()->format('Y-m-d')),
        //       // 'tanggal_pinjaman' => $group->loan->latest('drop_date')->drop_date->format('Y-m-d'),
        //     ];
        //   })->sortBy('branch_id')->sortBy('kelompok')->values(),
        // maping group disini dengan return group per transaction_manage_customers.day total manage_customer


      ] : null;

    return response()->json(['data' => $data ?? null, 'return_nik' => $request->nik]);
  }

  public function get_instalment_nasabah(TransactionLoan $transactionLoan, Request $request)
  {

    $pinjaman = 0;
    $transactionLoan->load(['loan_instalment' => function ($query) {
      $query->orderBy('transaction_date', 'desc');
    }]);

    $instalments = $transactionLoan->loan_instalment;
    $saldo = $pinjaman;

    $sortedInstalments = [];

    foreach ($instalments as $instalment) {
      $sortedInstalments[] = [
        'transaction_date' => $instalment->transaction_date,
        'nominal' => $instalment->nominal,
        'saldo' => $saldo,
        'dana_titipan' => $instalment->danatitipan ? true : false,
        'status' => AppHelper::generateStatusAngsuranString($transactionLoan->drop_date,  $instalment['transaction_date']),
      ];
      $saldo += $instalment->nominal;
    }
    return response()->json(['data' => $sortedInstalments ?? null], 200);
  }


  public function store_buku_transaksi(Request $request)
  {

    if (!auth()->user()->hasPermissionTo('can create')) {
      return redirect()->back()->withErrors('Anda Tidak Mempunyai Akses Menambahkan');
    }

    $previousUrl = url()->previous();


    $previousRouteName = app('router')->getRoutes()->match(app('request')->create($previousUrl))->getName();
    if (!auth()->user()->hasPermissionTo('can create')) {
      return redirect()->back()->withErrors('Anda Tidak Mempunyai Akses Menghapus');
    }

    if (AppHelper::dateName($request->request_date) !== AppHelper::dateName($request->tanggal_drop)) {
      return redirect()->back()->withErrors('Hari Tidak Sama');
    }

    $newNik = AppHelper::callUnknownNik($request);
    $request->merge(['nik' => $newNik]);


    $val = $request->validate([
      'isActiveMember' => ['boolean', 'required'],
      'request_nominal' =>  ["required", 'integer', 'min:100000'],
      'nik' => ['required', 'digits:16'],
      'nama' => ['required_if:isActiveMember,false'],
      'alamat' => ['required_if:isActiveMember,false'],
      'request_date' => ['required', 'date'],
      'tanggal_drop' =>  ['required', 'date'],
    ], [
      '*.min' => 'minimal diisi 100rb'
    ]);

    $request['kelompok'] = auth()->user()->can('can show kelompok') ? ($request->kelompok ?? 1) : auth()->user()->employee->area;
    $request['branch'] = auth()->user()->can('can show branch') ? $request->branch_id : auth()->user()->employee->branch_id;

    try {
      DB::beginTransaction();
      $drop_langsung = $request->request_date == $request->tanggal_drop;

      $customer = TransactionCustomer::firstorCreate(['nik' => $request->nik], ['nama' => $request->nama, 'alamat' => $request->alamat]);
      $officerGrouping = TransactionLoanOfficerGrouping::where('branch_id', $request->branch)->where('kelompok', $request->kelompok)->first();
      $manage =  $customer->manage_customer()->firstOrCreate(['transaction_loan_officer_grouping_id' => $officerGrouping->id, 'day' => Carbon::parse($request->tanggal_drop)->dayOfWeek]);

      if ($manage->wasRecentlyCreated) {
        $request['drop_before'] = 0;
      } else {
        $drop_before = $manage->loan()->where('status', 'success')->orderBy('drop_date', 'desc')->first();
        $request['drop_before'] = $drop_before?->nominal_drop ?? 0;
        $request['drop_date_before'] = $drop_before?->drop_date ?? 0;
      }

      $mantri = AppHelper::getMantri($officerGrouping);

      $loan = $manage->loan()->create([
        'transaction_loan_officer_grouping_id' => $officerGrouping->id,
        'request_date' => $request->request_date,
        'user_mantri' => $mantri,
        'drop_date' => $request->tanggal_drop,
        'hari' => AppHelper::dateName($request->tanggal_drop),
        'status' => "open",
        'user_input' => auth()->user()->employee->id,

        'drop_before' => $request['drop_before'],
        'request_nominal' => $request->request_nominal,
      ]);


      if ($drop_langsung) {
        $loan->update([
          'user_drop' => $mantri,
          'status' => "success",
          'nominal_drop' => $request->request_nominal,
          'request_nominal' => null,
        ]);
      }

      DB::commit();
    } catch (Exception $exception) {
      DB::rollBack();
      return redirect()->back()->withErrors($exception->getMessage());
    }

    if ($previousRouteName == "mobile_apps.create") {
      return redirect()->route('mobile_apps.transaksi', ['kelompok' => $officerGrouping->kelompok]);
    }
    return redirect()->back()->with('message', 'Berhasil Menambahkan Pengajuan');
  }


  // store for batch Transksi
  public function store_buku_transaksi_batch(Request $request)
  {
    // dd($request->all());
    if (!auth()->user()->hasPermissionTo('can create')) {
      return redirect()->back()->withErrors('Anda Tidak Mempunyai Akses Menambahkan');
    }

    // if (AppHelper::dateName($request->request_date) !== AppHelper::dateName($request->tanggal_drop)) {
    //   return redirect()->back()->withErrors('Hari Tidak Sama');
    // }

    $angsuran = collect($request->angsuran)->sortBy('transaction_date')->values();

    $newNik = AppHelper::callUnknownNik($request);
    $request->merge(['nik' => $newNik]);


    $val = $request->validate([
      'isActiveMember' => ['boolean', 'required'],
      'nik' => ['required', 'digits:16'],

      'request_nominal' =>  ["required", 'integer', 'min:100000'],
      'kelompok' => ['required'],

      'nama' => ['required_if:isActiveMember,false'],
      'alamat' => ['required_if:isActiveMember,false'],

      'tanggal_drop' =>  ['required', 'date'],
    ], [
      '*.required' => "Wajib Diisi",
      '*.min' => 'minimal diisi 100rb'

    ]);


    // validasi tambahan jika angsuran ada
    if (!$angsuran->isEmpty()) {
      $dateToocheck = AppHelper::dateName($request->tanggal_drop);

      $filtered = $angsuran->filter(function ($item) use ($dateToocheck) {
        return AppHelper::dateName($item['transaction_date']) !== $dateToocheck;
      }); // mencari apakah hari sama dengan tanggal drop

      $groupedByDate = $angsuran->groupBy('transaction_date');
      $duplicates = $groupedByDate->filter(function ($group) {
        return $group->count() > 1; // Mencari grup dengan lebih dari satu item
      });


      if ($filtered->isNotEmpty()) {
        return redirect()->back()->withErrors('Hari Angsuran Tidak Sama');
      }

      if ($duplicates->isNotEmpty()) {
        return redirect()->back()->withErrors('Ada angsuran yang duplikat pada tanggal yang sama.');
      }

      if ($angsuran->sum('nominal') > ($request->request_nominal * 1.3)) {
        return redirect()->back()->withErrors('Tidak Boleh Minus');
      }
    }


    $request['kelompok'] = auth()->user()->can('can show kelompok') ? $request->kelompok : auth()->user()->employee->area;
    $request['branch'] = auth()->user()->can('can show branch') ? $request->branch_id : auth()->user()->employee->branch_id;

    try {


      DB::beginTransaction();
      $drop_langsung = !$request->request_date ? true : $request->request_date == $request->tanggal_drop;

      $customer = TransactionCustomer::firstorCreate(['nik' => $request->nik], ['nama' => $request->nama, 'alamat' => $request->alamat]);
      $officerGrouping = TransactionLoanOfficerGrouping::where('branch_id', $request->branch)->where('kelompok', $request->kelompok)->first();
      // $manage =  $customer->manage_customer()->firstOrCreate(['transaction_loan_officer_grouping_id' => $officerGrouping->id]);
      $manage =  $customer->manage_customer()->firstOrCreate(['transaction_loan_officer_grouping_id' => $officerGrouping->id, 'day' => Carbon::parse($request->tanggal_drop)->dayOfWeek]);



      if ($manage->wasRecentlyCreated) {
        $request['drop_before'] = 0;
      } else {
        $drop_before = $manage->loan()->where('status', 'success')->orderBy('drop_date', 'desc')->first();
        $request['drop_before'] = $drop_before?->nominal_drop ?? 0;
        $request['drop_date_before'] = $drop_before?->drop_date ?? 0;
      }


      $mantri = AppHelper::getMantri($officerGrouping);

      $loan = $manage->loan()->create([
        'transaction_loan_officer_grouping_id' => $officerGrouping->id,
        'request_date' => $request->request_date ?? $request->tanggal_drop,
        'user_mantri' => $mantri,
        'drop_date' => $request->tanggal_drop,
        'hari' => AppHelper::dateName($request->tanggal_drop),
        'status' => "open",
        'user_input' => auth()->user()->employee->id,

        'drop_before' => $request['drop_before'],
        'request_nominal' => $request->request_nominal,
      ]);


      if ($drop_langsung) {
        $loan->update([
          'user_drop' => $mantri,
          'status' => "success",
          'nominal_drop' => $request->request_nominal,
          'request_nominal' => null,
        ]);
      } else {
        $loan->update([
          'status' =>  "success",
          'user_check' => auth()->user()->employee->id,
          'check_date' => Carbon::now()->format('Y-m-d'),
          'approved_nominal' => $request->request_nominal,

          'nominal_drop' => (int) $request->request_nominal,
          'user_drop' => $mantri,
        ]);
      }

      if (!$angsuran->isEmpty()) {
        $hutang = $request->request_nominal * 1.3;

        $angsuran->each(function ($item) use ($loan, $officerGrouping, $mantri, &$hutang) {
          if ($hutang <= 0) return false; // Hentikan loop jika hutang sudah lunas

          $loan->loan_instalment()->create([
            'transaction_date' => $item['transaction_date'],
            'nominal' => $item['nominal'] ?? 0,
            'danatitipan' =>  isset($item['dana_titipan']) ? ($item['dana_titipan'] ? 1 : 0) : 0,
            'transaction_loan_officer_grouping_id' => $officerGrouping->id,
            'status' => AppHelper::generateStatusAngsuran($loan->drop_date,  $item['transaction_date']),
            'user_input' => auth()->user()->employee->id,
            'user_mantri' =>  $mantri,
          ]);

          $hutang -=  $item['nominal'] ?? 0;
        });
      }


      DB::commit();
    } catch (Exception $exception) {
      DB::rollBack();
      dd($exception);
      return redirect()->back()->withErrors($exception->getMessage());
    }



    return redirect()->back()->with('message', 'BERHASIL DITAMBAHKAN')->with('printUrl', route('pinjaman.index_pinjaman_search', ['kelompok' => $officerGrouping->kelompok, 'month' => Carbon::parse($request->tanggal_drop)->format('Y-m'), 'branch_id' =>  $request['branch'], 'hari' => AppHelper::dateName($request->tanggal_drop)]));
  }


  public function store_pengajuan_lama(TransactionLoan $transactionLoan, Request $request)
  {

    if (!auth()->user()->hasPermissionTo('can create')) {
      return redirect()->back()->withErrors('Anda Tidak Mempunyai Akses Menambahkan');
    }

    $previousUrl = url()->previous();

    $previousRouteName = app('router')->getRoutes()->match(app('request')->create($previousUrl))->getName();
    if (!auth()->user()->hasPermissionTo('can create')) {
      return redirect()->back()->withErrors('Anda Tidak Mempunyai Akses Menghapus');
    }

    if (AppHelper::dateName($transactionLoan->drop_date) !== AppHelper::dateName($request->request_date)) {
      return redirect()->back()->withErrors('Hari Tidak Sama');
    }
    if (AppHelper::dateName($request->request_date) !== AppHelper::dateName($request->tanggal_drop)) {
      return redirect()->back()->withErrors('Hari Tidak Sama');
    }

    $val = $request->validate([
      'request_nominal' =>  ["required", 'integer', 'min:100000'],
      'request_date' => ['required', 'date'],
      'tanggal_drop' =>  ['required', 'date'],
      'type' =>  ['required'],
    ], [
      '*.min' => 'minimal diisi 100rb'
    ]);

    try {
      DB::beginTransaction();
      $drop_langsung = $request->request_date == $request->tanggal_drop;

      $officerGrouping = TransactionLoanOfficerGrouping::find($transactionLoan->transaction_loan_officer_grouping_id);
      $mantri = AppHelper::getMantri($officerGrouping);



      $loan = TransactionLoan::create([
        'transaction_manage_customer_id' => $transactionLoan->transaction_manage_customer_id,
        'transaction_loan_officer_grouping_id' => $transactionLoan->transaction_loan_officer_grouping_id,
        'request_date' => $request->request_date,
        'user_mantri' => $mantri,
        'drop_date' => $request->tanggal_drop,
        'hari' => AppHelper::dateName($request->tanggal_drop),
        'status' => "open",
        'user_input' => auth()->user()->employee->id,
        'drop_before' => $transactionLoan->nominal_drop,
        'request_nominal' => $request->request_nominal,
      ]);
      // dd($loan);

      if ($drop_langsung) {
        $loan->update([
          'user_drop' => $mantri,
          'status' => "success",
          'nominal_drop' => $request->request_nominal,
          'request_nominal' => null,
        ]);
      }

      $transactionLoan->out_date = $request->tanggal_drop;
      $transactionLoan->transaction_out_reasons_id = 1;
      $transactionLoan->save();


      DB::commit();
    } catch (Exception $exception) {
      DB::rollBack();
      return redirect()->back()->withErrors($exception->getMessage());
    }


    return redirect()->back()->with('message', 'Berhasil Menambahkan Pengajuan');
  }


  // UBAH STATUS PINJAMAN
  public function action_buku_transaksi(TransactionLoan $transactionLoan, Request $request)
  {


    $checkPermission = AppHelper::havePermissionByPermission('can create');

    $checkPermissionMantri = AppHelper::havePermissionByPermission('unit mantri');

    if (!$checkPermission) {
      return redirect()->back()->withErrors('Anda Tidak Mempunyai Akses Action');
    }

    if ($checkPermissionMantri) {
      if ($request->status == 'acc' || $request->status == 'tolak') {
        return redirect()->back()->withErrors('ACC / Tolak Tidak Bisa Dilakukan Oleh Mantri');
      }
    }


    $val = $request->validate([
      'status' => ['required'],
      'approved_nominal' => ['required_if:status,acc'],
      'drop' => ['required_if:status,success'],
    ]);

    try {
      DB::beginTransaction();

      if ($request->status == 'acc') {
        $transactionLoan->update([
          'status' =>  $request->status,
          'user_check' => auth()->user()->employee->id,
          'check_date' => Carbon::now()->format('Y-m-d'),
          'approved_nominal' => $request->approved_nominal ?? $transactionLoan->approved_nominal,
        ]);
      }

      if ($request->status == 'tolak') {
        $transactionLoan->update([
          'status' =>  $request->status,
          'user_check' => auth()->user()->employee->id,
          'check_date' => Carbon::now()->format('Y-m-d'),
        ]);
      }

      if ($request->status == 'success') {
        $transactionLoan->update([
          'status' =>  $request->status,
          'nominal_drop' => $request->drop,
          'user_drop' => $transactionLoan->user_mantri,
        ]);
      }


      if ($request->status == 'gagal') {
        $transactionLoan->update([
          'status' =>  $request->status,
          'user_check' => auth()->user()->employee->id,
          'check_date' => Carbon::now()->format('Y-m-d'),
        ]);
      }


      DB::commit();
    } catch (Exception $exception) {
      DB::rollBack();
      return redirect()->back()->with('error', 'Terjadi Kesalahan Mohon Ulangi Lagi');
    }
    return redirect()->back()->with('message', 'Berhasil Menyimpan');
  }



  // INI ADALAH PINJAMAN YA
  public function index_pinjaman(Request $request)
  {
    // dd('asd');
    $data = $this->getLoan($request);
    return Inertia::render("WebView/Angsuran/Index", $data);
  }



  // INI INDEX PINJAMAN PERBULAN ( UNTUK CARI ML / PENGGANTI MENU MACET )
  public function index_pinjaman_search(Request $request)
  {

    $data = $this->getLoanByDate($request);
    return Inertia::render("WebView/Angsuran/SearchByDate", $data);
  }

  public function index_pinjaman_macet(Request $request)
  {
    $data = $this->getLoanMacet($request, true);
    // dd($data);
    return Inertia::render("WebView/Angsuran/SearchByDate", $data);
  }


  public function get_synch_angsuran(TransactionLoan $transactionLoan, Request $request)
  {

    $loan = $transactionLoan->load(
      [
        'loan_instalment' => function ($item) {
          $item->with('usermantri', 'userinput')
            ->orderByDesc('transaction_date');
        },
        'branch',
        'customer',
        'mantri',
        'white_off',
        'loan_officer_grouping'
      ]
    );

    $instalment = $loan->loan_instalment->map(function ($instalment) {
      return [
        'id' => $instalment->id,
        'nominal' => $instalment->nominal,
        'transaction_date' => $instalment->transaction_date,
      ];
    })->sortBy('transaction_date')->values();

    $startDay = AppHelper::getFirstDayOfMonthID($request->day, $request->month);
    $dateOfWeeks = [];
    for ($date = $startDay; $date->lte(Carbon::now()); $date->addDay()) {
      if (AppHelper::dateName($date) === $request->day) {
        $dateOfWeeks[] = $date->copy()->format('Y-m-d');
      }
    }

    $dateOfWeeks = collect($dateOfWeeks)
      ->filter(fn($item) => Carbon::parse($item)->isBefore(Carbon::today()) && Carbon::parse($item)->isAfter(Carbon::parse($loan->drop_date)))
      ->mapWithKeys(fn($item, $index) => [$index => ['date' => Carbon::parse($item)->format('Y-m-d')]]);


    $result = $dateOfWeeks->map(function ($week) use ($transactionLoan, $instalment) {
      $transactionDate = $week['date'];
      $matchedInstalment = $instalment->firstWhere('transaction_date', $transactionDate);
      if ($matchedInstalment) {
        return [
          'id' => $matchedInstalment['id'],
          'nominal' => $matchedInstalment['nominal'],
          'transaction_date' => $matchedInstalment['transaction_date'],
        ];
      } else {
        return [
          'id' => null,
          'nominal' => null,
          'transaction_date' => $transactionDate,
        ];
      }
    })->values();


    $angsuranBefore = $instalment->where('transaction_date', '<', Carbon::parse($request->month)->startOfMonth()->format('Y-m-d'))->sum('nominal');
    $saldoSebelumnya = $loan->pinjaman - $angsuranBefore;
    $data = [
      'loan' => ['id' => $loan->id, 'pinjaman' => $loan->pinjaman],
      'instalments' => $instalment,
      'angsuran' => $result,
      'saldoSebelumnya' => $saldoSebelumnya,
      'month' => $request->month,
    ];

    return response()->json(['data' => $data], 200);
    // $dataset
  }

  public function synch_angsuran(TransactionLoan $transactionLoan, Request $request)
  {

    $startOfMonth = Carbon::parse($request->month)->startOfMonth()->format('Y-m-d');
    $loan = $transactionLoan->load(
      [
        'loan_instalment' => function ($item) {
          $item->with('usermantri', 'userinput')
            ->orderByDesc('transaction_date');
        },
      ]
    );

    $Loaninstalment = $loan->loan_instalment->map(function ($instalment) {
      return [
        'id' => $instalment->id,
        'nominal' => $instalment->nominal,
        'transaction_date' => $instalment->transaction_date,
      ];
    });

    if ($request->saldobefore - collect($request->instalment)->sum('nominal') < 0) {
      return redirect()->back()->withErrors('Tidak Boleh Minus');
    }
    // ambil angsuran terakhir yang didatabase
    $angsuranBefore = $Loaninstalment->where('transaction_date', '<', $startOfMonth)->sum('nominal');
    $saldoSebelumnya = $loan->pinjaman - $angsuranBefore;

    $saldoBefore = $saldoSebelumnya - (int)$request->saldobefore;

    $loan->loan_instalment()->delete();

    $tanggalAngsuranPertama = Carbon::parse($transactionLoan->drop_date)->addWeek()->format('Y-m-d');
    $transactionLoan->loan_instalment()->create([
      'transaction_date' => $tanggalAngsuranPertama,
      'nominal' => $transactionLoan->pinjaman - (int)$request->saldobefore,
      'danatitipan' => 0,
      'transaction_loan_officer_grouping_id' => $transactionLoan->transaction_loan_officer_grouping_id,
      'status' => AppHelper::generateStatusAngsuran($transactionLoan->drop_date,  $tanggalAngsuranPertama),
      'user_input' => auth()->user()->employee->id,
      'user_mantri' => $transactionLoan->user_mantri,
    ]);



    $instalments = collect($request->instalment)->map(function ($item) {
      return [
        'id' => $item['id'] ?? null,
        'transaction_date' => $item['transaction_date'],
        'nominal' => $item['nominal'],
      ];
    })->values();

    $pinjaman = (int)$request->saldobefore;

    $instalments->each(function ($item) use ($transactionLoan, &$pinjaman) {
      if ($pinjaman <= 0) return false;

      $transactionLoan->loan_instalment()->create([
        'transaction_date' => $item['transaction_date'],
        'nominal' => $item['nominal'],
        'danatitipan' => 0,
        'transaction_loan_officer_grouping_id' => $transactionLoan->transaction_loan_officer_grouping_id,
        'status' => AppHelper::generateStatusAngsuran($transactionLoan->drop_date,  $item['transaction_date']),
        'user_input' => auth()->user()->employee->id,
        'user_mantri' => $transactionLoan->user_mantri,
      ]);

      $pinjaman -=   $item['nominal'];
    });


    return redirect()->back()->with('message', 'berhasil di sinkronkan');
  }
  // INI CONTROLLER API AXIOS ( UNTUK MENCARI KEBENARAH YANG HAKIKI , EH SALAH UNTUK MEMUNCULKAN DATA ANGSURAN )

  public function get_loan_pinjaman(TransactionLoan $transactionLoan)
  {

    $loan = $transactionLoan->load(
      [
        'loan_instalment' => function ($item) {
          $item->with('usermantri', 'userinput')
            ->orderByDesc('transaction_date');
        },
        'branch',
        'customer',
        'mantri',
        'white_off',
        'loan_officer_grouping'
      ]
    );

    $pemutihan = $loan->white_off?->nominal ?? 0;
    $saldo = ($loan->pinjaman - $pemutihan) - $loan->loan_instalment->sum('nominal');
    $pinjaman = [
      'nomor_anggota' => $loan->manage_customer->id,
      'id' => $loan->id,
      'nama' => $loan->customer->nama,
      'alamat' => $loan->customer->alamat,
      'nik' => $loan->customer->nik,
      // 'tanggal_pengajuan' => $loan->request_date,
      'tanggal_drop' => $loan->drop_date,
      'hari' => $loan->hari,
      'kelompok' => $loan->loan_officer_grouping->kelompok,
      'branch' => $loan->branch->unit,
      'pinjaman' => $loan->pinjaman,
      'status_pinjaman' => AppHelper::status_pinjaman($loan->loan_instalment->first()?->status),
      'notes' => $loan->notes ?? null,
      'lunas' => $saldo <= 0,
      'mantri' => $loan->mantri->nama_karyawan,
    ];

    $saldo = $loan->pinjaman - $loan->loan_instalment->sum('nominal');
    $instalment = $loan->loan_instalment->map(function ($instalment) use (&$saldo) {
      $saldoBefore = $saldo;
      $saldo += $instalment->nominal;
      return [
        'id' => $instalment->id,
        'nominal' => $instalment->nominal,
        'transaction_date' => $instalment->transaction_date,
        'status' => AppHelper::status_pinjaman($instalment->status),
        'danatitipan' => $instalment->danatitipan,
        'mantri' => $instalment->usermantri->nama_karyawan,
        'saldo' => $saldoBefore
      ];
    });



    $loan = $transactionLoan->load('loan_instalment');
    return response()->json(['pinjaman' => $pinjaman, 'instalment' => $instalment, 'pemutihan' => $loan->white_off ?? null], 200);
  }

  public function checkpengajuan(TransactionLoan $transactionLoan, Request $request)
  {
    // get nasabah id
    $id_transaksi = $transactionLoan->transaction_manage_customer_id;
    $transaction_list_by_manage_customer = TransactionLoan::where('transaction_manage_customer_id', $id_transaksi)
      ->where('drop_date', '>', $transactionLoan->drop_date)
      ->whereIn('status', ['open', 'acc', 'tolak', 'gagal'])
      ->get();

    $data = [
      'loan_out_status' => $transactionLoan->transaction_out_reasons_id,
      'cek_pengajuan' => $transaction_list_by_manage_customer
    ];

    return response()->json(['data' => $data ?? null], 200);
  }

  //  NAH INI POST UNTUK BAYAR ASUNYA
  public function bayar_pinjaman(Request $request, TransactionLoan $transactionLoan)
  {

    if (!auth()->user()->hasPermissionTo('can create')) {
      return redirect()->back()->withErrors('Anda Tidak Mempunyai Akses Untuk Melakukan ini');
    }


    $val = $request->validate([
      'type_transaksi' => ['required'],
      'nominal' => ['required_if:type_transaksi,bayar'],
      'transaction_date' => ['required_if:type_transaksi,bayar', 'date'],
    ]);

    $transactionLoan->with('loan_instalment', 'loan_officer_grouping');

    $isPaidToday = $transactionLoan->loan_instalment->where('transaction_date', $request->transaction_date);

    if (!auth()->user()->hasPermissionTo('area')) {
      $user_area = auth()->user()->employee->area;
      if ($transactionLoan->loan_officer_grouping->kelompok == $user_area) {
        return redirect()->back()->withErrors('Anda Tidak Boleh Mengubah Angsuran Yang Ditandatangani Oleh Karyawan Lain');
      };
    }

    if ($request->type_transaksi == 'bayar') {
      if (AppHelper::dateName($request->transaction_date) !== AppHelper::dateName($transactionLoan->drop_date)) {
        return redirect()->back()->withErrors('Hari Tidak Sama');
      }

      if ($request->transaction_date == $transactionLoan->drop_date) {
        return redirect()->back()->withErrors('Ini drop Baru, isi yang bulan sebelumnya (pelunasan)');
      }

      if ($request->transaction_date < $transactionLoan->drop_date) {
        return redirect()->back()->withErrors('tanggal bayar tidak boleh kurang dari tanggal drop');
      }

      if ($isPaidToday->isNotEmpty()) {
        if (!$request->danatitipan) {
          return redirect()->back()->withErrors('Angsuran Hari Ini Sudah Dibayar');
        }
      }

      $totalAngsuran = $transactionLoan->loan_instalment->sum('nominal');
      $pinjaman = $transactionLoan->pinjaman;
      if ($pinjaman == $totalAngsuran || $pinjaman < $totalAngsuran) {
        return redirect()->back()->withErrors('Pinjaman Sudah Lunas');
      }
      if ($transactionLoan->pinjaman < ($totalAngsuran + $request->nominal)) {
        return redirect()->back()->withErrors('Angsuran Tidak Boleh Minus');
      }
    }



    $employee = AppHelper::getMantri($transactionLoan->loan_officer_grouping);


    try {
      DB::beginTransaction();
      if ($request->type_transaksi == "bayar") {
        $transactionLoan->loan_instalment()->create([
          'nominal' => $request->nominal,
          'transaction_loan_officer_grouping_id' => $transactionLoan->transaction_loan_officer_grouping_id,
          'transaction_date' => $request->transaction_date,
          'status' => AppHelper::generateStatusAngsuran($transactionLoan->drop_date, $request->transaction_date),
          'danatitipan' => $request->danatitipan ? 1 : 0,
          'user_input' => auth()->user()->employee->id,
          'user_mantri' => $employee,
        ]);
      }

      if ($request->type_transaksi == "notes") {
        $transactionLoan->notes = $request->notes;
        $transactionLoan->save();
      }


      DB::commit();
    } catch (Exception $e) {
      DB::rollBack();
      dd($e);
      return redirect()->back()->with('error', 'data gagal diubah');
    }
    return redirect()->back()->with('message', 'data berhasil diubah');
  }


  public function  white_off_loan(TransactionLoan $transactionLoan, Request $request)
  {
    $val = $request->validate([
      'nominal' => ['required', 'integer', 'min:1'],
      'transaction_date' => ['required', 'date'],
    ]);

    if (AppHelper::dateName($request->transaction_date) !== AppHelper::dateName($transactionLoan->drop_date)) {
      return redirect()->back()->withErrors('Hari Tidak Sama');
    }

    try {
      DB::beginTransaction();

      $outDate = $transactionLoan->out_date;
      $reason = $transactionLoan->transaction_out_reasons_id;

      $transactionLoan->out_date = $outDate ? $outDate : $request->transaction_date;
      $transactionLoan->out_status = 'LUNAS';
      $transactionLoan->transaction_out_reasons_id = $reason ? $reason : 4;
      $transactionLoan->total_angsuran = $transactionLoan->loan_instalment()->sum('nominal') + $request->nominal;


      $transactionLoan->white_off()->create([
        'transaction_loan_officer_grouping_id' => $transactionLoan->transaction_loan_officer_grouping_id,
        'transaction_date' => $request->transaction_date,
        'nominal' => $request->nominal,
      ]);


      $transactionLoan->save();
      DB::commit();
    } catch (Exception $e) {
      DB::rollBack();
      return redirect()->back()->withErrors('Data gagal diubah');
    }

    return redirect()->back()->with('message', 'Data berhasil diubah');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy_angsuran(TransactionLoanInstalment $transactionLoanInstalment)
  {

    $permission =  AppHelper::havePermissionByDate($transactionLoanInstalment->transaction_date);
    if (!$permission['status']) {
      return redirect()->back()->withErrors($permission['message']);
    }
    try {
      DB::beginTransaction();
      $transactionLoanInstalment->delete();
      DB::commit();
    } catch (Exception $e) {
      ddd($e);
      DB::rollBack();
      return redirect()->back()->withErrors('data gagal diubah');
    }
    return redirect()->back()->with('message', 'data berhasil diubah');
  }


  public function destroy_loan(TransactionLoan $transactionLoan)
  {

    // check permission
    $permission =  AppHelper::havePermissionByDate($transactionLoan->drop_date);
    if (!$permission['status']) {
      return redirect()->back()->withErrors($permission['message']);
    }

    try {
      DB::beginTransaction();
      $transactionLoan->delete();
      DB::commit();
    } catch (Exception $e) {
      DB::rollBack();
      return redirect()->back()->withErrors('data gagal diubah');
    }
    return redirect()->back()->with('message', 'data berhasil dihapus');
  }

  public function delete_loan(TransactionLoan $transactionLoan)
  {
    try {
      DB::beginTransaction();
      $transactionLoan->delete();
      DB::commit();
    } catch (Exception $e) {
      DB::rollBack();
      return redirect()->back()->withErrors('data gagal diubah');
    }
    return redirect()->back()->with('message', 'data berhasil dihapus');
  }




  public function updateEverything(TransactionLoan $transactionLoan, Request $request)
  {

    $permission =  AppHelper::havePermissionByDate($transactionLoan->drop_date);
    if (!$permission['status']) {
      return redirect()->back()->withErrors($permission['message']);
    }



    $validate = $request->validate([
      "updateType" => ['required'],
    ]);

    $wrongLoansInstalment = $transactionLoan->loan_instalment->where('transaction_date', "<", $transactionLoan->drop_date);
    if ($wrongLoansInstalment->count() > 0) {
      return redirect()->back()->withErrors('Pinjaman Mempunyai Angsuran Dengan Tanggal < Tanggal Drop yang diubah, Hubungi IT Untuk Mengubah');
    }

    if ($transactionLoan->drop_date < $transactionLoan->request_date) {
      return redirect()->back()->withErrors('Tanggal Drop Lebih Kecil Dari Tanggal Pengajuan');
    }

    if (AppHelper::dateName($transactionLoan->drop_date) != AppHelper::dateName($transactionLoan->request_date)) {
      return redirect()->back()->withErrors('Nama Hari Tidak Sama');
    } else {
      if (AppHelper::dateName($transactionLoan->drop_date) != $transactionLoan->hari) {
        return redirect()->back()->withErrors('Nama Hari Tidak Sama');
      }
    }


    try {
      DB::beginTransaction();
      if ($request->updateType == "detailchange") {
        $transactionLoan->update([
          "request_date" => $request->request_date,
          "drop_date" => $request->drop_date,
          "request_nominal" =>  $request->request_nominal,
          "approved_nominal" => $request->approved_nominal,
          "user_check" => $request->approved_nominal ?  ($transactionLoan->user_check ?? auth()->user()->employee->id) : null,
          "check_date" => $request->approved_nominal ?  ($transactionLoan->check_date ?? Carbon::now()) : null,
          "nominal_drop" => $request->nominal_drop,
          "user_drop" => $request->approved_nominal ? ($transactionLoan->user_drop ?? auth()->user()->employee->id)  : null,
          "status" => $request->request_date == $request->drop_date ? 'success' : $transactionLoan->status,
        ]);
      }
      if ($request->updateType == "resetdata") {
        $transactionLoan->update([
          "approved_nominal" => null,
          "check_date" => null,
          "user_check" => null,
          "nominal_drop" => null,
          "user_drop" => null,
          "status" => 'open',
        ]);
        $transactionLoan->loan_instalment()->delete();
      }
      DB::commit();
    } catch (Exception $e) {
      DB::rollBack();
      return redirect()->back()->withErrors('data gagal diubah');
    }



    return redirect()->back()->with('message', 'data berhasil diubah');
  }
}
