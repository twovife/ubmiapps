<?php

namespace App\Traits;

use App\Helpers\AppHelper;
use App\Models\Branch;
use App\Models\TransactionDailyRecap;
use App\Models\TransactionLoan;
use App\Models\TransactionLoanInstalment;
use App\Models\TransactionLoanOfficerGrouping;
use App\Models\TransactionSirculation;
use Carbon\Carbon;
use Illuminate\Http\Request;

trait RekapTrait
{
  public function getRencanaDropKepalaData(Request $request)
  {
    $authorized = auth()->user();
    $branch_id = $authorized->can('can show branch') ? ($request->branch_id ?? 1) : $authorized->employee->branch_id;
    $wilayah = $authorized->can('can show branch') ? (Branch::find($branch_id)->wilayah ?? 1) : $authorized->employee->branch->wilayah;
    $kelompok = $authorized->can('can show kelompok') ? ($request->kelompok ?? 1) : $authorized->employee->area;
    $userAuthorized = AppHelper::branch_permission($authorized, $branch_id);

    $transaction_date = $request->month ?? Carbon::now()->format('Y-m');
    $startOfMonth = Carbon::parse($transaction_date)->copy()->startOfMonth();
    $endOfMonth = Carbon::parse($transaction_date)->copy()->endOfMonth();
    $groupingId = TransactionLoanOfficerGrouping::where('branch_id', $branch_id)->get();

    $loan = TransactionLoan::with('loan_officer_grouping', 'customer', 'manage_customer')
      ->where(function ($data) use ($startOfMonth, $endOfMonth) {
        $data->whereBetween('drop_date', [$startOfMonth->format('Y-m-d'), $endOfMonth->format('Y-m-d')])
          ->orWhereBetween('request_date', [$startOfMonth->format('Y-m-d'), $endOfMonth->format('Y-m-d')]);
      })
      ->whereIn('transaction_loan_officer_grouping_id', $groupingId->pluck('id'))
      ->orderBy('drop_date')
      ->get()
      ->groupBy('drop_date');

    $datesMatchDay = collect();

    for ($i = $startOfMonth; $i->lte($endOfMonth); $i->addDays()) {
      if ($i->dayOfWeek !== 0) {
        $datesMatchDay->push($i->format('Y-m-d'));
      }
    }

    $daily_recap = TransactionDailyRecap::whereIn('transaction_loan_officer_grouping_id', $groupingId->pluck('id'))->whereIn('date', $datesMatchDay)->get()->groupBy('date');

    $instalment = TransactionLoanInstalment::whereIn('transaction_loan_officer_grouping_id', $groupingId->pluck('id'))->whereIn('transaction_date', $datesMatchDay)->get()->groupBy('transaction_date');


    $buku_rencana_drop = $datesMatchDay->map(function ($tanggal) use ($loan, $daily_recap, $instalment, $groupingId) {
      $thisDailyRecap = $daily_recap->get($tanggal, collect()); //stored as database
      $thisData = $loan->get($tanggal, collect()); //summary of drop
      $thisInstalment = $instalment->get($tanggal, collect()); //summary of instalment

      return $groupingId->map(function ($groupingId) use ($tanggal, $thisDailyRecap, $thisData, $thisInstalment) {
        $thisDataPerGrup = $thisData->where('transaction_loan_officer_grouping_id', $groupingId->id);
        $thisInstalmentPerGrup = $thisInstalment->where('transaction_loan_officer_grouping_id', $groupingId->id)->sum('nominal');
        $thisDailyRecapPerGrup = $thisDailyRecap->where('transaction_loan_officer_grouping_id', $groupingId->id)->first();
        return [
          'grouping_id' => $groupingId->id,
          'kelompok' => $groupingId->kelompok,
          'tanggal' => $tanggal,
          'kasbon' => $thisDailyRecapPerGrup ? $thisDailyRecapPerGrup->kasbon : 0,
          'transport' => $thisDailyRecapPerGrup ? $thisDailyRecapPerGrup->transport : 0,
          'masuk' => $thisDailyRecapPerGrup ? $thisDailyRecapPerGrup->masuk : 0,
          'keluar' => $thisDailyRecapPerGrup ? $thisDailyRecapPerGrup->keluar : 0,
          'target' => $thisDailyRecapPerGrup ? $thisDailyRecapPerGrup->target : 0,

          'storting' => $thisInstalmentPerGrup,
          'storting_on_database' => $thisDailyRecapPerGrup ? $thisDailyRecapPerGrup->storting : 0,
          'storting_validate' => $thisInstalmentPerGrup == ($thisDailyRecapPerGrup?->storting ?? 0) ? true : false,

          'baru' => $thisDataPerGrup->where('drop_langsung', 1)->where('status', 'success')->sum('nominal_drop'),
          'lama' => $thisDataPerGrup->where('drop_langsung', 0)->where('status', 'success')->sum('nominal_drop'),

          'drop' => $thisDataPerGrup->sum('nominal_drop'),
          'drop_on_database' => $thisDailyRecapPerGrup ? $thisDailyRecapPerGrup->drop : 0,
          'drop_validate' => $thisDataPerGrup->sum('drop_jadi') == ($thisDailyRecapPerGrup?->drop ?? 0) ? true : false,

          'rencana' => $thisDataPerGrup->where('drop_langsung', 0)->sum('approved_nominal'),
        ];
      });
    })->values();

    return [
      'datas' => $buku_rencana_drop,
      'server_filter' => [
        'month' => $transaction_date,
        'wilayah' => $wilayah,
        'branch' => $userAuthorized['branches'],
        'userAuthorized' => $userAuthorized,
        'branch_id' => $branch_id
      ]
    ];
  }

  public function getRekapDuaData(Request $request)
  {
    $authorized = auth()->user();
    $branch_id = $authorized->can('can show branch') ? ($request->branch_id ?? 1) : $authorized->employee->branch_id;
    $wilayah = $authorized->can('can show branch') ? (Branch::find($branch_id)->wilayah ?? 1) : $authorized->employee->branch->wilayah;
    $kelompok = $authorized->can('can show kelompok') ? ($request->kelompok ?? 1) : $authorized->employee->area;
    $userAuthorized = AppHelper::branch_permission($authorized, $branch_id);

    $transaction_date = Carbon::parse($request->date ?? Carbon::now());
    $startDateofMonth = $transaction_date->copy()->startOfMonth()->format('Y-m-d');

    $dateOfMb = $transaction_date->copy()->subMonth(4);
    $dateOfCm = $transaction_date->copy()->subMonth(3);
    $transactionOffice = TransactionLoanOfficerGrouping::where('branch_id', $branch_id)->get();

    $transactionDailyRecap = TransactionDailyRecap::whereIn('transaction_loan_officer_grouping_id', $transactionOffice->pluck('id'))
      ->where('date', $transaction_date->format('Y-m-d'))->get();

    $transactionSirculation = TransactionSirculation::whereIn('transaction_loan_officer_grouping_id', $transactionOffice->pluck('id'))
      ->where('date', $startDateofMonth)
      ->get()->groupBy('transaction_loan_officer_grouping_id');

    // dd($transactionSirculation);

    $instalment = TransactionLoanInstalment::select('transaction_loan_officer_grouping_id', 'transaction_date', 'status', 'nominal')
      ->whereIn('transaction_loan_officer_grouping_id', $transactionOffice->pluck('id'))
      ->whereBetween('transaction_date', [$startDateofMonth, $transaction_date->format('Y-m-d')])
      ->get()->groupBy('transaction_loan_officer_grouping_id');

    $loan = TransactionLoan::select('transaction_loan_officer_grouping_id', 'drop_date', 'nominal_drop', 'pinjaman')
      ->whereIn('transaction_loan_officer_grouping_id', $transactionOffice->pluck('id'))
      ->whereBetween('drop_date', [$startDateofMonth, $transaction_date->format('Y-m-d')])
      ->get()->groupBy('transaction_loan_officer_grouping_id');


    // dd($loan);

    $data =  $transactionOffice->map(function ($item) use ($loan, $instalment, $transactionSirculation, $transactionDailyRecap, $transaction_date, $startDateofMonth, $dateOfCm, $dateOfMb) {
      $transaction_date = $transaction_date->format('Y-m-d');
      // dd($transaction_date);
      $thisLoan = $loan->get($item->id, collect());
      $thisInstalment = $instalment->get($item->id, collect());
      $thisSirculation = $transactionSirculation->get($item->id, collect());
      $thisDailyRecap = $transactionDailyRecap->where('transaction_loan_officer_grouping_id', $item->id)->first();
      $status_kepala = $thisDailyRecap?->daily_kepala_approval ? true : false;
      $status_kasir = $thisDailyRecap?->daily_kasir_approval ? true : false;

      $totalDrop = $thisLoan->whereBetween('drop_date', [$startDateofMonth, $transaction_date])->sum('nominal_drop') ?? 0;

      $totalStorting = $thisInstalment->whereBetween('transaction_date', [$startDateofMonth, $transaction_date])->sum('nominal') ?? 0;

      $angusuranExistingCm = $thisInstalment->where('transaction_date', $transaction_date)->where('status', 2)->sum('nominal') ?? 0;
      $totalStortingCm =  $thisInstalment->whereBetween('transaction_date', [$startDateofMonth, $transaction_date])->where('status', 2)->sum('nominal') ?? 0;

      $angusuranExistingMb = $thisInstalment->where('transaction_date', $transaction_date)->where('status', 3)->sum('nominal') ?? 0;
      $totalStortingMb =  $thisInstalment->whereBetween('transaction_date', [$startDateofMonth, $transaction_date])->where('status', 3)->sum('nominal') ?? 0;

      $angusuranExistingMl = $thisInstalment->where('transaction_date', $transaction_date)->where('status', 4)->sum('nominal') ?? 0;
      $totalStortingMl =  $thisInstalment->whereBetween('transaction_date', [$startDateofMonth, $transaction_date])->where('status', 4)->sum('nominal') ?? 0;

      $sirkulasi = $thisSirculation->sum('amount') ?? 0;
      $sirkulasiCm = $thisSirculation->sum('cm_amount') ?? 0;
      $sirkulasiMb = $thisSirculation->sum('mb_amount') ?? 0;
      $sirkulasiMl = $thisSirculation->sum('ml_amount') ?? 0;

      $storting = $thisInstalment->where('transaction_date', $transaction_date)->sum('nominal') ?? 0;
      $do11 = (int) round($thisLoan->where('drop_date', $transaction_date)->sum('nominal_drop') * 0.11) ?? 0;
      $titipan9 = (int) round($thisLoan->where('drop_date', $transaction_date)->sum('nominal_drop') * 0.09) ?? 0;
      $kasbon = $thisDailyRecap?->kasbon ?? 0;
      $debit = $do11 + $kasbon + $storting;

      $transport = $thisDailyRecap?->transport ?? 0;
      $nominaldrop =  $thisLoan->where('drop_date', $transaction_date)->sum('nominal_drop');
      $kredit = $nominaldrop + $transport;

      return [
        'type' => 'daily',
        'kelompok' => $item->kelompok,
        'id' => $item->id,
        'tanggal' => $transaction_date,
        'rekap_status' => $thisDailyRecap ? true : false,
        'status_approve_kepala' => $status_kepala,
        'status_approve_kasir' => $status_kasir,
        'status_dayly_approval' => $status_kepala && $status_kasir,
        'transaction_date' => $transaction_date,

        'kasbon' => $kasbon, //stored db
        'drop' => $nominaldrop,
        'total_drop' => $totalDrop,
        'do11' => $do11,
        'titipan9' => $titipan9,

        'debit' => $debit,
        'transport' => $transport, //stored db
        'kredit' => $kredit,
        'tunai' => $debit - $kredit,
        'tunai_ondb' => $thisDailyRecap?->tunai ?? 0, //stored db
        'is_balance' => ($debit - $kredit) == $thisDailyRecap?->tunai,


        'storting' => $storting,
        'total_storting' => $totalStorting,
        'sirkulasi' => (int) round($sirkulasi + ($totalDrop * 1.3) - ($totalStorting)),

        'angsuran_cm' => $angusuranExistingCm,
        'total_angsuran_cm' => $totalStortingCm,
        'saldo_cm' => $sirkulasiCm - $totalStortingCm,

        'angsuran_mb' => $angusuranExistingMb,
        'total_angsuran_mb' => $totalStortingMb,
        'saldo_mb' => $sirkulasiMb - $totalStortingMb,

        'angsuran_ml' => $angusuranExistingMl,
        'total_angsuran_ml' => $totalStortingMl,
        'saldo_ml' => $sirkulasiMl - $totalStortingMl,
      ];
    })->values();


    return  [
      'datas' => $data,
      'server_filter' => [
        'date' => $transaction_date->format('Y-m-d'),
        'wilayah' => $wilayah,
        'branch' => $userAuthorized['branches'],
        'userAuthorized' => $userAuthorized,
        'branch_id' => $branch_id
      ]
    ];
  }

  // public function getDataRekapDua(Request $request)
  // {
  //   $authorized = auth()->user();
  //   $branch_id = $authorized->can('can show branch') ? ($request->branch_id ?? 1) : $authorized->employee->branch_id;
  //   $wilayah = $authorized->can('can show branch') ? (Branch::find($branch_id)->wilayah ?? 1) : $authorized->employee->branch->wilayah;
  //   $kelompok = $authorized->can('can show kelompok') ? ($request->kelompok ?? 1) : $authorized->employee->area;
  //   $userAuthorized = AppHelper::branch_permission($authorized, $branch_id);

  //   $transaction_date = Carbon::parse($request->date ?? Carbon::now());

  //   $startDateofMonth = $transaction_date->copy()->startOfMonth()->format('Y-m-d');
  //   $startDateofMonthNoFormat = $transaction_date->copy()->startOfMonth();
  //   $endDateofMonth = $transaction_date->copy()->endOfMonth()->format('Y-m-d');
  //   $endDateofMonthNoFormat = $transaction_date->copy()->endOfMonth();

  //   $dateOfMb = $transaction_date->copy()->subMonth(4);
  //   $dateOfCm = $transaction_date->copy()->subMonth(3);
  //   $transactionOffice = TransactionLoanOfficerGrouping::where('branch_id', $branch_id)->get();

  //   $transactionDailyRecap = TransactionDailyRecap::whereIn('transaction_loan_officer_grouping_id', $transactionOffice->pluck('id'))
  //     ->whereBetween('date', [$startDateofMonth, $endDateofMonth])->get();

  //   $transactionSirculation = TransactionSirculation::with('transaction_loan_officer_grouping')
  //     ->whereIn('transaction_loan_officer_grouping_id', $transactionOffice->pluck('id'))
  //     ->whereBetween('date', [$startDateofMonth, $endDateofMonth])
  //     ->get()->groupBy('transaction_loan_officer_grouping_id');

  //   $saldoAwalBulan = $transactionSirculation->map(function ($item) use ($startDateofMonth) {
  //     $sirkulasi = $item->sum('amount') ?? 0;
  //     $sirkulasiCm = $item->sum('cm_amount') ?? 0;
  //     $sirkulasiMb = $item->sum('mb_amount') ?? 0;
  //     $sirkulasiMl = $item->sum('ml_amount') ?? 0;
  //     return [
  //       'kelompok' => $item->first()->transaction_loan_officer_grouping->kelompok,
  //       'sirkulasi' => $sirkulasi,
  //       'sirkulasiCm' => $sirkulasiCm,
  //       'sirkulasiMb' => $sirkulasiMb,
  //       'sirkulasiMl' => $sirkulasiMl,
  //     ];
  //   })->sortBy('kelompok')->values();

  //   $datesOfMonth = [];
  //   while ($startDateofMonthNoFormat->lte($endDateofMonthNoFormat)) {
  //     if ($startDateofMonthNoFormat->dayOfWeek !== Carbon::SUNDAY) {
  //       $datesOfMonth[] = $startDateofMonthNoFormat->format('Y-m-d');
  //     }
  //     $startDateofMonthNoFormat->addDay(); // Tambah 1 hari
  //   }

  //   $instalment = TransactionLoanInstalment::select('transaction_loan_officer_grouping_id', 'transaction_date', 'status', 'nominal')
  //     ->whereIn('transaction_loan_officer_grouping_id', $transactionOffice->pluck('id'))
  //     ->whereBetween('transaction_date', [$startDateofMonth, $endDateofMonth])
  //     ->get()->groupBy('transaction_loan_officer_grouping_id');

  //   $loan = TransactionLoan::select('transaction_loan_officer_grouping_id', 'drop_date', 'nominal_drop', 'pinjaman')
  //     ->whereIn('transaction_loan_officer_grouping_id', $transactionOffice->pluck('id'))
  //     ->whereBetween('drop_date', [$startDateofMonth, $endDateofMonth])
  //     ->get()->groupBy('transaction_loan_officer_grouping_id');

  //   $data = collect($datesOfMonth)->map(function ($date) use ($transactionOffice, $loan, $instalment, $transactionSirculation, $transactionDailyRecap, $startDateofMonth, $dateOfCm, $dateOfMb) {
  //     return [
  //       'tanggal' => $date,
  //       'data' =>  $transactionOffice->map(function ($item) use ($date, $loan, $instalment, $transactionSirculation, $transactionDailyRecap, $startDateofMonth, $dateOfCm, $dateOfMb) {
  //         $transaction_date = $date;
  //         // dd($transaction_date);
  //         $thisLoan = $loan->get($item->id, collect());
  //         $thisInstalment = $instalment->get($item->id, collect());
  //         $thisSirculation = $transactionSirculation->get($item->id, collect());
  //         $thisDailyRecap = $transactionDailyRecap->where('transaction_loan_officer_grouping_id', $item->id)->where('date', $transaction_date)->first();

  //         $status_kepala = $thisDailyRecap?->daily_kepala_approval ? true : false;
  //         $status_kasir = $thisDailyRecap?->daily_kasir_approval ? true : false;

  //         $totalDrop = $thisLoan->whereBetween('drop_date', [$startDateofMonth, $transaction_date])->sum('nominal_drop') ?? 0;

  //         $totalStorting = $thisInstalment->whereBetween('transaction_date', [$startDateofMonth, $transaction_date])->sum('nominal') ?? 0;

  //         $angusuranExistingCm = $thisInstalment->where('transaction_date', $transaction_date)->where('status', 2)->sum('nominal') ?? 0;
  //         $totalStortingCm =  $thisInstalment->whereBetween('transaction_date', [$startDateofMonth, $transaction_date])->where('status', 2)->sum('nominal') ?? 0;

  //         $angusuranExistingMb = $thisInstalment->where('transaction_date', $transaction_date)->where('status', 3)->sum('nominal') ?? 0;
  //         $totalStortingMb =  $thisInstalment->whereBetween('transaction_date', [$startDateofMonth, $transaction_date])->where('status', 3)->sum('nominal') ?? 0;

  //         $angusuranExistingMl = $thisInstalment->where('transaction_date', $transaction_date)->where('status', 4)->sum('nominal') ?? 0;
  //         $totalStortingMl =  $thisInstalment->whereBetween('transaction_date', [$startDateofMonth, $transaction_date])->where('status', 4)->sum('nominal') ?? 0;

  //         $sirkulasi = $thisSirculation->sum('amount') ?? 0;
  //         $sirkulasiCm = $thisSirculation->sum('cm_amount') ?? 0;
  //         $sirkulasiMb = $thisSirculation->sum('mb_amount') ?? 0;
  //         $sirkulasiMl = $thisSirculation->sum('ml_amount') ?? 0;

  //         $storting = $thisInstalment->where('transaction_date', $transaction_date)->sum('nominal') ?? 0;
  //         $do11 = (int) round($thisLoan->where('drop_date', $transaction_date)->sum('nominal_drop') * 0.11) ?? 0;
  //         $titipan9 = (int) round($thisLoan->where('drop_date', $transaction_date)->sum('nominal_drop') * 0.09) ?? 0;
  //         $kasbon = $thisDailyRecap?->kasbon ?? 0;
  //         $debit = $do11 + $kasbon + $storting;

  //         $transport = $thisDailyRecap?->transport ?? 0;
  //         $nominaldrop =  $thisLoan->where('drop_date', $transaction_date)->sum('nominal_drop');
  //         $kredit = $nominaldrop + $transport;

  //         return [
  //           'type' => 'daily',
  //           'kelompok' => $item->kelompok,
  //           'id' => $item->id,
  //           'tanggal' => $transaction_date,
  //           'rekap_status' => $thisDailyRecap ? true : false,
  //           'status_approve_kepala' => $status_kepala,
  //           'status_approve_kasir' => $status_kasir,
  //           'status_dayly_approval' => $status_kepala && $status_kasir,
  //           'transaction_date' => $transaction_date,

  //           'kasbon' => $kasbon, //stored db
  //           'drop' => $nominaldrop,
  //           'total_drop' => $totalDrop,
  //           'do11' => $do11,
  //           'titipan9' => $titipan9,

  //           'debit' => $debit,
  //           'transport' => $transport, //stored db
  //           'kredit' => $kredit,
  //           'tunai' => $debit - $kredit,
  //           'tunai_ondb' => $thisDailyRecap?->tunai ?? 0, //stored db
  //           'is_balance' => ($debit - $kredit) == $thisDailyRecap?->tunai,


  //           'storting' => $storting,
  //           'total_storting' => $totalStorting,
  //           'sirkulasi' => (int) round($sirkulasi + ($totalDrop * 1.3) - ($totalStorting)),

  //           'angsuran_cm' => $angusuranExistingCm,
  //           'total_angsuran_cm' => $totalStortingCm,
  //           'saldo_cm' => $sirkulasiCm - $totalStortingCm,

  //           'angsuran_mb' => $angusuranExistingMb,
  //           'total_angsuran_mb' => $totalStortingMb,
  //           'saldo_mb' => $sirkulasiMb - $totalStortingMb,

  //           'angsuran_ml' => $angusuranExistingMl,
  //           'total_angsuran_ml' => $totalStortingMl,
  //           'saldo_ml' => $sirkulasiMl - $totalStortingMl,
  //         ];
  //       })->values()
  //     ];
  //   })->values();


  //   return  [
  //     'datas' => $data,
  //     'saldoAwalBulan' => $saldoAwalBulan,
  //     'server_filter' => [
  //       'date' => $transaction_date->format('Y-m-d'),
  //       'wilayah' => $wilayah,
  //       'branch' => $userAuthorized['branches'],
  //       'userAuthorized' => $userAuthorized,
  //       'branch_id' => $branch_id
  //     ]
  //   ];

  //   // dd($data);
  // }

  public function getDataRekapDua(Request $request)
  {
    $authorized = auth()->user();
    $branch_id = $authorized->can('can show branch') ? ($request->branch_id ?? 1) : $authorized->employee->branch_id;
    $wilayah = $authorized->can('can show branch') ? (Branch::find($branch_id)->wilayah ?? 1) : $authorized->employee->branch->wilayah;
    $kelompok = $authorized->can('can show kelompok') ? ($request->kelompok ?? 1) : $authorized->employee->area;
    $userAuthorized = AppHelper::branch_permission($authorized, $branch_id);

    $transaction_date = Carbon::parse($request->date ?? Carbon::now());

    $startDateofMonth = $transaction_date->copy()->startOfMonth()->format('Y-m-d');
    $endDateofMonth = $transaction_date->copy()->endOfMonth()->format('Y-m-d');

    $transactionOffice = TransactionLoanOfficerGrouping::where('branch_id', $branch_id)->get();
    $groupingIds = $transactionOffice->pluck('id');

    $transactionDailyRecap = TransactionDailyRecap::whereIn('transaction_loan_officer_grouping_id', $groupingIds)
      ->whereBetween('date', [$startDateofMonth, $endDateofMonth])
      ->get();

    $transactionSirculation = TransactionSirculation::with('transaction_loan_officer_grouping')
      ->whereIn('transaction_loan_officer_grouping_id', $groupingIds)
      ->whereBetween('date', [$startDateofMonth, $endDateofMonth])
      ->get()
      ->groupBy('transaction_loan_officer_grouping_id');

    $saldoAwalBulan = $transactionSirculation->map(function ($item) {
      return [
        'kelompok' => $item->first()->transaction_loan_officer_grouping->kelompok,
        'sirkulasi' => $item->sum('amount') ?? 0,
        'sirkulasiCm' => $item->sum('cm_amount') ?? 0,
        'sirkulasiMb' => $item->sum('mb_amount') ?? 0,
        'sirkulasiMl' => $item->sum('ml_amount') ?? 0,
      ];
    })->sortBy('kelompok')->values();

    // ============================
    // AGREGASI INSTALMENT (SQL)
    // ============================

    $instalmentAgg = TransactionLoanInstalment::selectRaw("
        transaction_loan_officer_grouping_id,
        transaction_date,
        SUM(nominal) as total,
        SUM(CASE WHEN status = 2 THEN nominal ELSE 0 END) as cm,
        SUM(CASE WHEN status = 3 THEN nominal ELSE 0 END) as mb,
        SUM(CASE WHEN status = 4 THEN nominal ELSE 0 END) as ml
    ")
      ->whereIn('transaction_loan_officer_grouping_id', $groupingIds)
      ->whereBetween('transaction_date', [$startDateofMonth, $endDateofMonth])
      ->groupBy('transaction_loan_officer_grouping_id', 'transaction_date')
      ->get()
      ->groupBy(['transaction_loan_officer_grouping_id', 'transaction_date']);

    // ============================
    // AGREGASI LOAN (SQL)
    // ============================

    $loanAgg = TransactionLoan::selectRaw("
        transaction_loan_officer_grouping_id,
        drop_date,
        SUM(nominal_drop) as drop_total
    ")
      ->whereIn('transaction_loan_officer_grouping_id', $groupingIds)
      ->whereBetween('drop_date', [$startDateofMonth, $endDateofMonth])
      ->groupBy('transaction_loan_officer_grouping_id', 'drop_date')
      ->get()
      ->groupBy(['transaction_loan_officer_grouping_id', 'drop_date']);

    // ============================
    // GENERATE DATES
    // ============================

    $datesOfMonth = [];
    $cursor = Carbon::parse($startDateofMonth);

    while ($cursor->format('Y-m-d') <= $endDateofMonth) {
      if ($cursor->dayOfWeek !== Carbon::SUNDAY) {
        $datesOfMonth[] = $cursor->format('Y-m-d');
      }
      $cursor->addDay();
    }

    // ============================
    // BUILD RESPONSE
    // ============================

    $data = collect($datesOfMonth)->map(function ($date) use (
      $transactionOffice,
      $loanAgg,
      $instalmentAgg,
      $transactionSirculation,
      $transactionDailyRecap,
      $startDateofMonth
    ) {

      return [
        'tanggal' => $date,
        'data' => $transactionOffice->map(function ($item) use (
          $date,
          $loanAgg,
          $instalmentAgg,
          $transactionSirculation,
          $transactionDailyRecap,
          $startDateofMonth
        ) {

          $thisLoan = data_get($loanAgg, $item->id . '.' . $date . '.0.drop_total', 0);
          $thisInst = data_get($instalmentAgg, $item->id . '.' . $date . '.0', null);

          $storting = $thisInst->total ?? 0;
          $cm = $thisInst->cm ?? 0;
          $mb = $thisInst->mb ?? 0;
          $ml = $thisInst->ml ?? 0;

          $thisSirculation = $transactionSirculation->get($item->id, collect());
          $thisDailyRecap = $transactionDailyRecap
            ->where('transaction_loan_officer_grouping_id', $item->id)
            ->where('date', $date)
            ->first();

          $totalDrop = collect($loanAgg[$item->id] ?? [])
            ->filter(function ($rows, $d) use ($startDateofMonth, $date) {
              return $d >= $startDateofMonth && $d <= $date;
            })
            ->sum(function ($rows) {
              return $rows->first()->drop_total ?? 0;
            });


          $stortingAgg = collect($instalmentAgg[$item->id] ?? [])
            ->filter(function ($rows, $d) use ($startDateofMonth, $date) {
              return $d >= $startDateofMonth && $d <= $date;
            })
            ->reduce(function ($carry, $rows) {

              $row = $rows->first();

              $carry['total'] += $row->total ?? 0;
              $carry['cm'] += $row->cm ?? 0;
              $carry['mb'] += $row->mb ?? 0;
              $carry['ml'] += $row->ml ?? 0;

              return $carry;
            }, [
              'total' => 0,
              'cm' => 0,
              'mb' => 0,
              'ml' => 0
            ]);

          $totalStorting = $stortingAgg['total'];
          $totalStortingCm = $stortingAgg['cm'];
          $totalStortingMb = $stortingAgg['mb'];
          $totalStortingMl = $stortingAgg['ml'];

          $do11 = (int) round($thisLoan * 0.11);
          $titipan9 = (int) round($thisLoan * 0.09);

          $kasbon = $thisDailyRecap?->kasbon ?? 0;
          $transport = $thisDailyRecap?->transport ?? 0;

          $debit = $do11 + $kasbon + $storting;
          $kredit = $thisLoan + $transport;

          return [
            'type' => 'daily',
            'kelompok' => $item->kelompok,
            'id' => $item->id,
            'tanggal' => $date,
            'rekap_status' => $thisDailyRecap ? true : false,
            'status_approve_kepala' => $thisDailyRecap?->daily_kepala_approval ? true : false,
            'status_approve_kasir' => $thisDailyRecap?->daily_kasir_approval ? true : false,
            'status_dayly_approval' => ($thisDailyRecap?->daily_kepala_approval && $thisDailyRecap?->daily_kasir_approval),

            'kasbon' => $kasbon,
            'drop' => $thisLoan,
            'total_drop' => $totalDrop,
            'do11' => $do11,
            'titipan9' => $titipan9,

            'debit' => $debit,
            'transport' => $transport,
            'kredit' => $kredit,
            'tunai' => $debit - $kredit,
            'tunai_ondb' => $thisDailyRecap?->tunai ?? 0,
            'is_balance' => ($debit - $kredit) == $thisDailyRecap?->tunai,

            'storting' => $storting,
            'total_storting' => $totalStorting,
            'sirkulasi' => (int) round($thisSirculation->sum('amount') + ($totalDrop * 1.3) - $totalStorting),

            'angsuran_cm' => $cm,
            'total_angsuran_cm' => $totalStortingCm,
            'saldo_cm' => $thisSirculation->sum('cm_amount') - $totalStortingCm,

            'angsuran_mb' => $mb,
            'total_angsuran_mb' => $totalStortingMb,
            'saldo_mb' => $thisSirculation->sum('mb_amount') - $totalStortingMb,

            'angsuran_ml' => $ml,
            'total_angsuran_ml' => $totalStortingMl,
            'saldo_ml' => $thisSirculation->sum('ml_amount') - $totalStortingMl,
          ];
        })->values()
      ];
    })->values();

    return [
      'datas' => $data,
      'saldoAwalBulan' => $saldoAwalBulan,
      'server_filter' => [
        'date' => $transaction_date->format('Y-m-d'),
        'wilayah' => $wilayah,
        'branch' => $userAuthorized['branches'],
        'userAuthorized' => $userAuthorized,
        'branch_id' => $branch_id
      ]
    ];
  }

  public function getRekapPermantriData(Request $request)
  {
    $authorized = auth()->user();
    $branch_id = $authorized->can('can show branch') ? ($request->branch_id ?? 1) : $authorized->employee->branch_id;
    $wilayah = $authorized->can('can show branch') ? (Branch::find($branch_id)->wilayah ?? 1) : $authorized->employee->branch->wilayah;
    $kelompok = $authorized->can('can show kelompok') ? ($request->kelompok ?? 1) : $authorized->employee->area;
    $userAuthorized = AppHelper::branch_permission($authorized, $branch_id);

    $transaction_date = Carbon::parse($request->month ?? Carbon::now());

    $startDateofMonth = $transaction_date->copy()->startOfMonth()->format('Y-m-d');
    $endDateofMonth = $transaction_date->copy()->endOfMonth()->format('Y-m-d');

    $dateOfMb = $transaction_date->copy()->subMonth(4);
    $dateOfCm = $transaction_date->copy()->subMonth(3);

    $transactionOffice = TransactionLoanOfficerGrouping::where('branch_id', $branch_id)->where('kelompok', $kelompok)->first();

    $transactionDailyRecap = TransactionDailyRecap::where('transaction_loan_officer_grouping_id', $transactionOffice->id)
      ->whereBetween('date', [$startDateofMonth, $endDateofMonth])->get();

    $transactionSirculation = TransactionSirculation::where('transaction_loan_officer_grouping_id', $transactionOffice->id)
      ->where('date', $startDateofMonth)
      ->get();

    $instalment = TransactionLoanInstalment::select('transaction_loan_officer_grouping_id', 'transaction_date', 'status', 'nominal')
      ->where('transaction_loan_officer_grouping_id', $transactionOffice->id)
      ->whereBetween('transaction_date', [$startDateofMonth, $endDateofMonth])
      ->get();

    $loan = TransactionLoan::select('transaction_loan_officer_grouping_id', 'drop_date', 'nominal_drop', 'pinjaman')
      ->where('transaction_loan_officer_grouping_id', $transactionOffice->id)
      ->whereBetween('drop_date', [$startDateofMonth, $endDateofMonth])
      ->get();

    $dates = $loan->pluck('drop_date')->merge($instalment->pluck('transaction_date'))->unique()->sort()->values();

    $saldoAwalBulan = $transactionSirculation->map(function ($item) {
      return [
        'kelompok' => $item->transaction_loan_officer_grouping->kelompok,
        'hari' => $item->day,
        'day' => AppHelper::getNumbDays($item->day),
        'sirkulasi' => $item->amount ?? 0,
        'sirkulasiCm' =>  $item->cm_amount ?? 0,
        'sirkulasiMb' =>  $item->mb_amount ?? 0,
        'sirkulasiMl' =>  $item->ml_amount ?? 0,
      ];
    })->sortBy('day')->values();

    // dd($saldoAwalBulan);
    $data = $dates->map(function ($date) use ($loan, $instalment, $transactionSirculation, $transactionDailyRecap, $transactionOffice, $startDateofMonth, $kelompok) {
      // 'tanggal' => $date,

      $transaction_date = Carbon::parse($date)->format('Y-m-d');

      $thisLoan = $loan->where('drop_date', $transaction_date);
      $thisInstalment = $instalment->where('transaction_date', $transaction_date);
      $thisSirculation = $transactionSirculation;
      $thisDailyRecap = $transactionDailyRecap->where('date', $transaction_date)->first();
      $status_kepala = $thisDailyRecap?->daily_kepala_approval ? true : false;
      $status_kasir = $thisDailyRecap?->daily_kasir_approval ? true : false;

      $totalDrop = $loan->whereBetween('drop_date', [$startDateofMonth, $transaction_date])->sum('nominal_drop') ?? 0;
      $totalStorting = $instalment->whereBetween('transaction_date', [$startDateofMonth, $transaction_date])->sum('nominal') ?? 0;

      $angusuranExistingCm = $thisInstalment->where('status', 2)->sum('nominal') ?? 0;
      $totalStortingCm = $instalment->whereBetween('transaction_date', [$startDateofMonth, $transaction_date])->where('status', 2)->sum('nominal') ?? 0;

      $angusuranExistingMb = $thisInstalment->where('status', 3)->sum('nominal') ?? 0;
      $totalStortingMb = $instalment->whereBetween('transaction_date', [$startDateofMonth, $transaction_date])->where('status', 3)->sum('nominal') ?? 0;

      $angusuranExistingMl = $thisInstalment->where('status', 4)->sum('nominal') ?? 0;
      $totalStortingMl = $instalment->whereBetween('transaction_date', [$startDateofMonth, $transaction_date])->where('status', 4)->sum('nominal') ?? 0;

      $sirkulasi = $thisSirculation->sum('amount') ?? 0;
      $sirkulasiCm = $thisSirculation->sum('cm_amount') ?? 0;
      $sirkulasiMb = $thisSirculation->sum('mb_amount') ?? 0;
      $sirkulasiMl = $thisSirculation->sum('ml_amount') ?? 0;

      $storting = $thisInstalment->sum('nominal') ?? 0;
      $do11 = (int) round($thisLoan->sum('nominal_drop') * 0.11) ?? 0;
      $titipan9 = (int) round($thisLoan->sum('nominal_drop') * 0.09) ?? 0;
      $kasbon = $thisDailyRecap?->kasbon ?? 0;
      $debit = $do11 + $kasbon + $storting;

      $transport = $thisDailyRecap?->transport ?? 0;
      $nominaldrop = $thisLoan->sum('nominal_drop');
      $kredit = $nominaldrop + $transport;
      return [
        'type' => 'permantri',
        'kelompok' => $kelompok,
        'id' => $transactionOffice->id,
        'tanggal' => $transaction_date,
        'rekap_status' => $thisDailyRecap ? true : false,
        'status_approve_kepala' => $status_kepala,
        'status_approve_kasir' => $status_kasir,
        'status_dayly_approval' => $status_kepala && $status_kasir,
        'transaction_date' => $transaction_date,

        'kasbon' => $kasbon,
        'drop' => $nominaldrop,
        'total_drop' => $totalDrop,
        'do11' => $do11,
        'titipan9' => $titipan9,

        'debit' => $debit,
        'transport' => $transport,
        'kredit' => $kredit,
        'tunai' => $debit - $kredit,
        'tunai_ondb' => $thisDailyRecap?->tunai ?? 0,
        'is_balance' => ($debit - $kredit) == $thisDailyRecap?->tunai,

        'storting' => $storting,
        'total_storting' => $totalStorting,
        'sirkulasi' => (int) round($sirkulasi + ($totalDrop * 1.3) - $totalStorting),

        'angsuran_cm' => $angusuranExistingCm,
        'total_angsuran_cm' => $totalStortingCm,
        'saldo_cm' => $sirkulasiCm - $totalStortingCm,

        'angsuran_mb' => $angusuranExistingMb,
        'total_angsuran_mb' => $totalStortingMb,
        'saldo_mb' => $sirkulasiMb - $totalStortingMb,

        'angsuran_ml' => $angusuranExistingMl,
        'total_angsuran_ml' => $totalStortingMl,
        'saldo_ml' => $sirkulasiMl - $totalStortingMl,
      ];
    })->values();

    return [
      'datas' => $data,
      'saldoAwalBulan' => $saldoAwalBulan,
      'server_filter' => [
        'month' => $transaction_date->format('Y-m'),
        'wilayah' => $wilayah,
        'branch' => $userAuthorized['branches'],
        'userAuthorized' => $userAuthorized,
        'branch_id' => $branch_id
      ]
    ];
  }
}
