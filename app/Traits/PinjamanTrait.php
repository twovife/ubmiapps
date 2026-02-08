<?php

namespace App\Traits;

use App\Helpers\AppHelper;
use App\Models\Branch;
use App\Models\OnlineBranch;
use App\Models\TransactionDailyRecap;
use App\Models\TransactionLoan;
use App\Models\TransactionLoanInstalment;
use App\Models\TransactionLoanOfficerGrouping;
use App\Models\TransactionSirculation;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

trait PinjamanTrait
{
  public function getTransactionLoan(Request $request, bool $withPlan = false, bool $sortDesc = false)
  {

    $authorized = auth()->user();
    $branch_id = $authorized->can('can show branch') ? ($request->branch_id ?? 1) : $authorized->employee->branch_id;
    $wilayah = $authorized->can('can show branch') ? (Branch::find($branch_id)->wilayah ?? 1) : $authorized->employee->branch->wilayah;
    $kelompok = $authorized->can('can show kelompok') ? ($request->kelompok ?? 1) : $authorized->employee->area;
    $userAuthorized = AppHelper::branch_permission($authorized, $branch_id);


    $transaction_date = $request->month ?? Carbon::now()->format('Y-m');
    $startOfMonth = Carbon::parse($transaction_date)->copy()->startOfMonth();
    $endOfMonth = Carbon::parse($transaction_date)->copy()->endOfMonth();

    $hari = $request->hari ?? AppHelper::dateName(Carbon::now()->format('Y-m-d'));

    $groupingId = TransactionLoanOfficerGrouping::where('branch_id', $branch_id)->where('kelompok', $kelompok)->first();



    $loan = TransactionLoan::with('loan_officer_grouping', 'customer', 'manage_customer', 'branch')
      ->where(function ($data) use ($startOfMonth, $endOfMonth) {
        $data->whereBetween('drop_date', [$startOfMonth->format('Y-m-d'), $endOfMonth->format('Y-m-d')])
          ->orWhereBetween('request_date', [$startOfMonth->format('Y-m-d'), $endOfMonth->format('Y-m-d')]);
      })
      ->where('transaction_loan_officer_grouping_id', $groupingId->id)
      ->where('hari', $hari)
      ->orderBy('drop_date')
      ->get();



    $loanCustId = collect($loan->pluck('transaction_manage_customer_id'))->unique();

    
    $transactionManageCustomer = TransactionLoan::whereIn('transaction_manage_customer_id', $loanCustId)
      ->where('status', 'success')
      ->orderBy('id', 'desc')
      ->get()
      ->groupBy('transaction_manage_customer_id');



    $pengajuan = collect($loan->map(function ($drop, $key) use ($transactionManageCustomer) {
      $countPinjaman = $transactionManageCustomer->get($drop->transaction_manage_customer_id, collect())->count('id') + 1;
      return [
        'nama' => $drop->customer->nama,
        'alamat' => $drop->customer->alamat,
        'nomor_anggota' => $drop->manage_customer->id,
        'pinjaman_ke' => $countPinjaman,
        'tanggal_drop' => $drop->drop_date,
        'request_date' => $drop->request_date,

        'drop' => $drop->drop_langsung ? null : $drop->drop_before,
        'request' => $drop->drop_langsung ? null : $drop->request_nominal,
        'acc' => $drop->drop_langsung ? null : $drop->approved_nominal,
        'drop_jadi' => $drop->nominal_drop,

        'check_date' => $drop->check_date,

        'nomor_pengajuan' => $drop->id,
        'nik' => $drop->customer->nik,
        'kelompok' => $drop->loan_officer_grouping->kelompok,
        'unit' => $drop->branch->unit,
        'hari' => $drop->hari,
        'status' => $drop->status,
        'drop_langsung' => $drop->drop_langsung ? 'baru' : "lama",
        'drop_langsung_status' => $drop->drop_langsung ? 2 : 1
      ];
    })->sortBy('nama')->sortBy('drop_langsung_status')->sortBy('tanggal_drop')->groupBy('tanggal_drop'));


    $numberDays = AppHelper::getNumbDays($hari);
    $datesMatchDay = collect();

    for ($i = $startOfMonth; $i->lte($endOfMonth); $i->addDays()) {
      if ($i->dayOfWeek == $numberDays) {
        $datesMatchDay->push($i->format('Y-m-d'));
      }
    }

    $lastTransaction = TransactionDailyRecap::where('transaction_loan_officer_grouping_id', $groupingId->id)->whereNotNull('daily_kepala_approval')->whereNotNull('daily_kasir_approval')->max('date');
    $ClosedTransaction = AppHelper::get_closed_date($lastTransaction);
    // jika beserta plan maka ini yang akan dikembalikan

    if ($withPlan) {
      $daily_recap = TransactionDailyRecap::where('transaction_loan_officer_grouping_id', $groupingId->id)->whereIn('date', $datesMatchDay)->get()->groupBy('date');

      $instalment = TransactionLoanInstalment::where('transaction_loan_officer_grouping_id', $groupingId->id)->whereIn('transaction_date', $datesMatchDay)->get()->groupBy('transaction_date');

      $buku_rencana_drop = $datesMatchDay->map(function ($tanggal) use ($pengajuan, $daily_recap, $instalment, $groupingId) {
        $thisDailyRecap = $daily_recap->get($tanggal, collect())->first(); //stored as database
        $thisData = $pengajuan->get($tanggal, collect()); //summary of drop
        $thisInstalment = $instalment->get($tanggal, collect())->sum('nominal'); //summary of instalment

        // dd($thisData);
        return [
          'is_generated' => $thisDailyRecap ? true : false,
          'grouping_id' => $groupingId->id,
          'kelompok' => $groupingId->kelompok,
          'tanggal' => $tanggal,
          'kasbon' =>  $thisDailyRecap?->kasbon,
          'transport' => $thisDailyRecap?->transport,
          'masuk' => $thisDailyRecap?->masuk,
          'keluar' => $thisDailyRecap?->keluar,
          'target' => $thisDailyRecap?->target,
          'storting_on_database' => $thisDailyRecap?->storting,
          'storting' => $thisInstalment,
          'storting_validate' => $thisInstalment == ($thisDailyRecap?->storting) ? true : false,
          'baru' => $thisData->where('drop_langsung', 'baru')->sum('drop_jadi'),
          'lama' => $thisData->where('drop_langsung', 'lama')->sum('drop_jadi'),

          'drop' => $thisData->sum('drop_jadi'),
          'drop_on_database' => $thisDailyRecap?->drop,
          'drop_validate' => $thisData->sum('drop_jadi') == ($thisDailyRecap?->drop) ? true : false,

          'rencana' => $thisData->where('drop_langsung', 'lama')->sum('acc'),

          'is_approved' => $thisDailyRecap?->daily_kepala_approval ? true : false,
          'is_kasir' => $thisDailyRecap?->daily_kasir_approval ? true : false,
          'at_approved' => $thisDailyRecap?->daily_kepala_approval,
          'at_kasir' => $thisDailyRecap?->daily_kasir_approval,
          'is_closed' => $thisDailyRecap?->daily_kepala_approval ? true : false,
          'button_color' => $thisDailyRecap?->daily_kepala_approval ? ($thisDailyRecap?->daily_kasir_approval ? 'success' : 'baru') : 'open',
        ];
      })->sortBy('tanggal')->values();
    }


    return [
      'datas' => $sortDesc ? $pengajuan->sortKeysDesc()->values() : $pengajuan->values(),
      'buku_rencana' => $buku_rencana_drop ?? [],
      'server_filter' => [
        'month' => $transaction_date,
        'wilayah' => $wilayah,
        'branch' => $userAuthorized['branches'],
        'userAuthorized' => $userAuthorized,
        'branch_id' => $branch_id,
        'kelompok' => $kelompok,
        'hari' => $hari,
        'closed_transaction' => $ClosedTransaction
      ]
    ];
  }

  public function getLoan(Request $request, $dailyView = false)
  {

    $date = $request->date ?? null;
    if ($date) {
      $request->merge([
        'month' => Carbon::parse($date)->format('Y-m'),
        'hari' => AppHelper::dateName($date)
      ]);
    }


    $now = Carbon::now();
    $transaction_date = $dailyView
      ? $now->copy()->endOfMonth()
      : Carbon::parse($request->month ?? $now)->endOfMonth();
    // dd($transaction_date->format('Y-m-d'));
    $transaction_start_date = $transaction_date->copy()->startOfMonth();
    $begin_transaction = $transaction_date->copy()->startOfMonth()->subMonthNoOverflow(4);

    $hari = $request->hari ?? AppHelper::dateName($now->format('Y-m-d'));

    $tanggalSeleksi  = AppHelper::getStortingShowDate($hari);

    // dd($tanggalSeleksi);


    $authorized = auth()->user();
    $branch_id = $authorized->can('can show branch') ? ($request->branch_id ?? 1) : $authorized->employee->branch_id;
    $wilayah = $authorized->can('can show branch') ? (Branch::find($branch_id)->wilayah ?? 1) : $authorized->employee->branch->wilayah;
    $kelompok = $authorized->can('can show kelompok') ? ($request->kelompok ?? 1) : $authorized->employee->area;
    $userAuthorized = AppHelper::branch_permission($authorized, $branch_id);



    $groupingId = TransactionLoanOfficerGrouping::where('branch_id', $branch_id)->where('kelompok', $kelompok)->first();


    $hariIni = AppHelper::dateName(Carbon::now()) == $hari;
    $lastDayOfThisWeek = Carbon::now()->previous(AppHelper::getNumbDays($hari))->format('Y-m-d');
    $dayClosedParams = $hariIni ? Carbon::now()->format('Y-m-d') : $lastDayOfThisWeek;
    $ClosedTransaction = AppHelper::get_closed_date($dayClosedParams);

    $transactionSirkulan = TransactionSirculation::where('transaction_loan_officer_grouping_id', $groupingId->id)
      ->where('day', $hari)
      ->where('date', $transaction_start_date->format('Y-m-d'))
      ->first();

    $loan = TransactionLoan::with(
      ['loan_instalment' => function ($item) {
        $item->orderByDesc('transaction_date');
      }, 'manage_customer' => function ($item) {
        $item->with('loan');
      }, 'branch', 'customer', 'white_off', 'loan_officer_grouping']
    )
      ->whereBetween('drop_date', [$begin_transaction, $transaction_date->format('Y-m-d')])
      ->where('hari', $hari)
      ->where('transaction_loan_officer_grouping_id', $groupingId->id)
      ->where('status', 'success')
      ->orderBy('drop_date')
      ->get()
      ->groupBy(function ($item) {
        return Carbon::parse($item->drop_date)->format('Y-m');
      });

    $loanMl = TransactionLoan::with(
      ['loan_instalment' => function ($item) {
        $item->orderByDesc('transaction_date');
      }, 'manage_customer' => function ($item) {
        $item->with('loan');
      }, 'branch', 'customer', 'loan_officer_grouping', 'white_off']
    )
      ->where('drop_date', "<", $begin_transaction->format('Y-m-d'))
      ->where('hari', $hari)
      ->where('transaction_loan_officer_grouping_id', $groupingId->id)
      ->where(function ($item) use ($transaction_start_date, $transaction_date) {
        $item->whereHas('loan_instalment', function ($query) use ($transaction_start_date, $transaction_date) {
          $query->whereBetween('transaction_date', [$transaction_start_date->format('Y-m-d'), $transaction_date->format('Y-m-d')])
            ->where('nominal', '>', 0);
        })->orWhereHas('white_off', function ($query) use ($transaction_start_date, $transaction_date) {
          $query->whereBetween('transaction_date', [$transaction_start_date->format('Y-m-d'), $transaction_date->format('Y-m-d')])
            ->where('nominal', '>', 0);
        });
      })

      //
      ->where('status', 'success')
      ->orderBy('drop_date')
      ->get();

    $dataMlGenerate = [
      'month' => "ML",
      'type' => "ml",
      'type2' => "ML",
      'date' => Carbon::parse($begin_transaction)->subMonthNoOverflow(1)->format('Y-m-d'),
      'data' => $loanMl->map(function ($item) use ($transaction_start_date, $transaction_date, $tanggalSeleksi, $dailyView) {
        $pemutihan = $item->white_off?->transaction_date == $tanggalSeleksi ? $item->white_off->nominal : 0;

        $pemutihan_before_month = $item->white_off ? ($item->white_off->transaction_date < $transaction_start_date->format('Y-m-d') ? $item->white_off->nominal : 0) : 0;
        $pemutihan_this_month = $item->white_off ? (Carbon::parse($item->white_off->transaction_date)->format('Y-m') == $transaction_date->format('Y-m') ? $item->white_off->nominal : 0) : 0;
        $saldo =  ($item->pinjaman - $pemutihan_before_month) - ($item->loan_instalment->where('transaction_date', '<=', $transaction_date->format('Y-m-d'))->sum('nominal') + $pemutihan_this_month);

        $data = [
          'tanggal_drop' => $item->drop_date,
          'nama' => $item->customer->nama,
          'alamat' => $item->customer->alamat,
          'nomor_anggota' => $item->manage_customer->id,

          'status_pinjaman' => AppHelper::status_pinjaman($item->loan_instalment->first()?->status),

          // ini status lunas
          'lunas' => $saldo <= 0,
          'pinjaman_ke' => $item->manage_customer->loan->where('drop_date', '<=', $item->drop_date)->where('status', 'success')->count(),
          'drop' => $item->nominal_drop,
          'pinjaman' => $item->pinjaman,
          'hari' => $item->hari,
          'nik' => $item->customer->nik,
          'kelompok' => $item->loan_officer_grouping->kelompok,
          'jumlah_angsuran' => $item->loan_instalment->count(),
          'id' => $item->id,
          'instalment' => $item->loan_instalment->groupBy(function ($instalment) {
            return Carbon::parse($instalment->transaction_date)->format('Y-m-d');
          })->map(function ($instalments) {
            return [
              'total_nominal' => $instalments->sum('nominal'),
              'is_active' => $instalments->contains(function ($instalment) {
                return $instalment['danatitipan'] == true;  // Cek apakah ada 'isactive' yang true
              })
            ];
          }),
          'angs_today' => $item->loan_instalment->where('transaction_date', $tanggalSeleksi)?->sum('nominal') ?? 0,
          'pemutihan_today' => $pemutihan,
          'pemutihanThisMonth' => $pemutihan_this_month,
          'x_angs' => $item->loan_instalment->count(),
          'saldo_sebelumnya' => ($item->pinjaman - $pemutihan_before_month) - $item->loan_instalment->where('transaction_date', '<', $transaction_start_date->format('Y-m-d'))->sum('nominal'),
          'saldo' => $saldo,
          'notes' => $item->notes
        ];

        if ($dailyView) {
          $data['angsuran'] = $item->loan_instalment->sum('nominal');
          $data['is_paid'] = $item->loan_instalment->where('transaction_date', $tanggalSeleksi)->isNotEmpty() || $item->white_off?->transaction_date == $tanggalSeleksi;
        } else {
          $data['angsuran'] = $item->loan_instalment->whereBetween('transaction_date', [$transaction_start_date->format('Y-m-d'), $transaction_date->format('Y-m-d')])->sum('nominal');
        }

        return $data;
      })->sortBy('nama')->sortBy('tanggal_drop')->values(),
    ];
    // dd($dataMlGenerate);

    $groupByMonth = $loan->map(function ($item, $key) use ($transaction_date, $transaction_start_date, $tanggalSeleksi, $dailyView) {
      return [
        'month' => Carbon::parse($key)->format('FY'),
        'type' => AppHelper::generateStatusAngsuranString2(Carbon::parse($key)->startOfMonth()->format('Y-m-d'), $transaction_date->format('Y-m-d')),
        'type2' => AppHelper::generateStatusAngsuranString(Carbon::parse($key)->startOfMonth()->format('Y-m-d'), $transaction_date->format('Y-m-d')),
        'date' => Carbon::parse($key)->startOfMonth()->format('Y-m-d'),
        'data' => $item->map(function ($item) use ($transaction_start_date, $transaction_date, $tanggalSeleksi, $dailyView) {
          $pemutihan = $item->white_off?->transaction_date == $tanggalSeleksi ? $item->white_off->nominal : 0;

          $pemutihan_before_month = $item->white_off ? ($item->white_off->transaction_date < $transaction_start_date->format('Y-m-d') ? $item->white_off->nominal : 0) : 0;
          $pemutihan_this_month = $item->white_off ? (Carbon::parse($item->white_off->transaction_date)->format('Y-m') == $transaction_date->format('Y-m') ? $item->white_off->nominal : 0) : 0;
          $saldo =  ($item->pinjaman - $pemutihan_before_month) - ($item->loan_instalment->where('transaction_date', '<=', $transaction_date->format('Y-m-d'))->sum('nominal') + $pemutihan_this_month);

          $data = [
            'tanggal_drop' => $item->drop_date,
            'nama' => $item->customer->nama,
            'alamat' => $item->customer->alamat,
            'nomor_anggota' => $item->manage_customer->id,

            'status_pinjaman' => AppHelper::status_pinjaman($item->loan_instalment->first()?->status),
            // ini adalah status lunas
            'lunas' => $saldo <= 0,
            'pinjaman_ke' => $item->manage_customer->loan->where('drop_date', '<=', $item->drop_date)->where('status', 'success')->count(),
            'drop' => $item->nominal_drop,
            'pinjaman' => $item->pinjaman,
            'hari' => $item->hari,
            'nik' => $item->customer->nik,
            'kelompok' => $item->loan_officer_grouping->kelompok,
            'jumlah_angsuran' => $item->loan_instalment->count(),
            'id' => $item->id,
            'instalment' => $item->loan_instalment->groupBy(function ($instalment) {
              return Carbon::parse($instalment->transaction_date)->format('Y-m-d');
            })->map(function ($instalments) {
              return [
                'total_nominal' => $instalments->sum('nominal'),
                'is_active' => $instalments->contains(function ($instalment) {
                  return $instalment['danatitipan'] == true;  // Cek apakah ada 'isactive' yang true
                })
              ];
            }),
            'angs_today' => $item->loan_instalment->where('transaction_date', $tanggalSeleksi)?->sum('nominal') ?? 0,
            'pemutihan_today' => $pemutihan,
            'pemutihanThisMonth' => $pemutihan_this_month,
            'x_angs' => $item->loan_instalment->count(),
            'saldo_sebelumnya' => ($item->pinjaman - $pemutihan_before_month) - $item->loan_instalment->where('transaction_date', '<', $transaction_start_date->format('Y-m-d'))->sum('nominal'),
            'saldo' => $saldo,
            'notes' => $item->notes
          ];


          if ($dailyView) {
            $data['angsuran'] = $item->loan_instalment->sum('nominal');
            $data['is_paid'] = $item->loan_instalment->where('transaction_date', $tanggalSeleksi)->isNotEmpty() ||  $item->white_off?->transaction_date == $tanggalSeleksi;
          } else {
            $data['angsuran'] = $item->loan_instalment->whereBetween('transaction_date', [$transaction_start_date->format('Y-m-d'), $transaction_date->format('Y-m-d')])->sum('nominal');
          }

          return $data;
        })->sortBy('nama')->sortBy('tanggal_drop')->values(),
      ];
    })->values();

    // ddd($groupByMonth);

    $mergedData = collect([$dataMlGenerate])->merge($groupByMonth)->values();

    $dateOfWeek = [];
    for ($date = $transaction_start_date; $date->lte($transaction_date); $date->addDay()) {
      if (AppHelper::dateName($date) == $hari) {
        $dateOfWeek[] = $date->copy()->format('Y-m-d');
      }
    }
    return [
      'datas' => $mergedData,
      'dateOfWeek' => $dateOfWeek,
      'sirkulasi' => $transactionSirkulan,
      'server_filter' => [
        'closed_transaction' => $ClosedTransaction,
        'month' => $transaction_date->format('Y-m'),
        'hari' => $hari,
        'wilayah' => $wilayah,
        'branch' => $userAuthorized['branches'],
        'userAuthorized' => $userAuthorized,
        'branch_id' => $branch_id,
        'kelompok' => $kelompok,
        'groupId' => $groupingId->id,
        'today' => $dayClosedParams
      ],
    ];
  }
  public function getLoanMantri(Request $request, $dailyView = true)
  {

    $date = $request->date ?? null;
    if ($date) {
      $request->merge([
        'month' => Carbon::parse($date)->format('Y-m'),
        'hari' => AppHelper::dateName($date)
      ]);
    }


    $now = Carbon::now();
    $transaction_date = $dailyView
      ? $now->copy()->endOfMonth()
      : Carbon::parse($request->month ?? $now)->endOfMonth();
    // dd($transaction_date->format('Y-m-d'));
    $transaction_start_date = $transaction_date->copy()->startOfMonth();
    $begin_transaction = $transaction_date->copy()->startOfMonth()->subMonthNoOverflow(4);

    $hari = $request->hari ?? AppHelper::dateName($now->format('Y-m-d'));

    $tanggalSeleksi  = AppHelper::getStortingShowDate($hari);

    // dd($tanggalSeleksi);


    $authorized = auth()->user();
    $branch_id = $authorized->can('can show branch') ? ($request->branch_id ?? 1) : $authorized->employee->branch_id;
    $wilayah = $authorized->can('can show branch') ? (Branch::find($branch_id)->wilayah ?? 1) : $authorized->employee->branch->wilayah;
    $kelompok = $authorized->can('can show kelompok') ? ($request->kelompok ?? 1) : $authorized->employee->area;
    $userAuthorized = AppHelper::branch_permission($authorized, $branch_id);



    $groupingId = TransactionLoanOfficerGrouping::where('branch_id', $branch_id)->where('kelompok', $kelompok)->first();


    $hariIni = AppHelper::dateName(Carbon::now()) == $hari;
    $lastDayOfThisWeek = Carbon::now()->previous(AppHelper::getNumbDays($hari))->format('Y-m-d');
    $dayClosedParams = $hariIni ? Carbon::now()->format('Y-m-d') : $lastDayOfThisWeek;
    $ClosedTransaction = AppHelper::get_closed_date($dayClosedParams);

    $transactionSirkulan = TransactionSirculation::where('transaction_loan_officer_grouping_id', $groupingId->id)
      ->where('day', $hari)
      ->where('date', $transaction_start_date->format('Y-m-d'))
      ->first();
    // dd($transaction_date);
    $loan = TransactionLoan::with(
      ['loan_instalment' => fn($q) => $q->where('transaction_date', $tanggalSeleksi), 'manage_customer', 'customer', 'white_off']
    )
      ->whereBetween('drop_date', [$begin_transaction, $transaction_date->format('Y-m-d')])
      ->where('hari', $hari)
      ->where('transaction_loan_officer_grouping_id', $groupingId->id)
      ->where('status', 'success')
      ->orderBy('drop_date')
      ->get()
      ->groupBy(function ($item) {
        return Carbon::parse($item->drop_date)->format('Y-m');
      });
    // dd($loan);

    $loanMl = TransactionLoan::with(
      ['loan_instalment' => fn($q) => $q->where('transaction_date', $tanggalSeleksi), 'manage_customer', 'customer']
    )
      ->where('drop_date', "<", $begin_transaction->format('Y-m-d'))
      ->where('hari', $hari)
      ->where('transaction_loan_officer_grouping_id', $groupingId->id)
      ->whereHas('loan_instalment', function ($query) use ($transaction_start_date, $transaction_date) {
        $query->whereBetween('transaction_date', [$transaction_start_date->format('Y-m-d'), $transaction_date->format('Y-m-d')])
          ->where('nominal', '>', 0);
      })
      ->where('status', 'success')
      ->orderBy('drop_date')
      ->get();


    $dataMlGenerate = [
      'month' => "ML",
      'type' => "ml",
      'type2' => "ML",
      'date' => Carbon::parse($begin_transaction)->subMonthNoOverflow(1)->format('Y-m-d'),
      'data' => $loanMl->map(function ($item) use ($transaction_start_date, $transaction_date, $tanggalSeleksi, $dailyView) {
        $pemutihan = $item->white_off ? $item->white_off->nominal : 0;

        $pemutihan_this_month = $item->white_off ? (Carbon::parse($item->white_off->transaction_date)->format('Y-m') == $transaction_date->format('Y-m') ? $item->white_off->nominal : 0) : 0;
        $saldo =  $item->pinjaman - ($pemutihan + $item->total_angsuran);

        $data = [
          'tanggal_drop' => $item->drop_date,
          'nama' => $item->customer->nama,
          'alamat' => $item->customer->alamat,
          'nomor_anggota' => $item->manage_customer->id,

          'status_pinjaman' => AppHelper::status_pinjaman($item->loan_instalment->first()?->status),

          // ini status lunas
          'lunas' => $saldo <= 0,
          'drop' => $item->nominal_drop,
          'pinjaman' => $item->pinjaman,
          'hari' => $item->hari,
          'nik' => $item->customer->nik,
          'id' => $item->id,

          'angs_today' => $item->loan_instalment?->sum('nominal') ?? 0,
          'instalment' => $item->loan_instalment->groupBy(function ($instalment) {
            return Carbon::parse($instalment->transaction_date)->format('Y-m-d');
          })->map(function ($instalments) {
            return [
              'total_nominal' => $instalments->sum('nominal'),
              'is_active' => $instalments->contains(function ($instalment) {
                return $instalment['danatitipan'] == true;  // Cek apakah ada 'isactive' yang true
              })
            ];
          }),
          'pemutihan_today' => $pemutihan,
          'pemutihanThisMonth' => $pemutihan_this_month,
          'saldo' => $saldo,
          'notes' => $item->notes
        ];

        if ($dailyView) {
          $data['angsuran'] = $item->total_angsuran;
          $data['is_paid'] = $item->loan_instalment->where('transaction_date', $tanggalSeleksi)->isNotEmpty() || $item->white_off?->transaction_date == $tanggalSeleksi; //
        }

        return $data;
      })->sortBy('nama')->sortBy('tanggal_drop')->values(),
    ];
    // dd($dataMlGenerate);

    $groupByMonth = $loan->map(function ($item, $key) use ($transaction_date, $transaction_start_date, $tanggalSeleksi, $dailyView) {
      return [
        'month' => Carbon::parse($key)->format('FY'),
        'type' => AppHelper::generateStatusAngsuranString2(Carbon::parse($key)->startOfMonth()->format('Y-m-d'), $transaction_date->format('Y-m-d')),
        'type2' => AppHelper::generateStatusAngsuranString(Carbon::parse($key)->startOfMonth()->format('Y-m-d'), $transaction_date->format('Y-m-d')),
        'date' => Carbon::parse($key)->startOfMonth()->format('Y-m-d'),
        'data' => $item->map(function ($item) use ($transaction_start_date, $transaction_date, $tanggalSeleksi, $dailyView) {
          $pemutihan = $item->white_off ? $item->white_off->nominal : 0;

          $pemutihan_this_month = $item->white_off ? (Carbon::parse($item->white_off->transaction_date)->format('Y-m') == $transaction_date->format('Y-m') ? $item->white_off->nominal : 0) : 0;
          $saldo =  $item->pinjaman - ($pemutihan + $item->total_angsuran);

          $data = [
            'tanggal_drop' => $item->drop_date,
            'nama' => $item->customer->nama,
            'alamat' => $item->customer->alamat,
            'nomor_anggota' => $item->manage_customer->id,

            'status_pinjaman' => AppHelper::status_pinjaman($item->loan_instalment->first()?->status),

            // ini status lunas
            'lunas' => $saldo <= 0,
            'drop' => $item->nominal_drop,
            'pinjaman' => $item->pinjaman,
            'hari' => $item->hari,
            'nik' => $item->customer->nik,
            'id' => $item->id,

            'angs_today' => $item->loan_instalment?->sum('nominal') ?? 0,
            'instalment' => $item->loan_instalment->groupBy(function ($instalment) {
              return Carbon::parse($instalment->transaction_date)->format('Y-m-d');
            })->map(function ($instalments) {
              return [
                'total_nominal' => $instalments->sum('nominal'),
                'is_active' => $instalments->contains(function ($instalment) {
                  return $instalment['danatitipan'] == true;  // Cek apakah ada 'isactive' yang true
                })
              ];
            }),
            'pemutihan_today' => $pemutihan,
            'pemutihanThisMonth' => $pemutihan_this_month,
            'saldo' => $saldo,
            'notes' => $item->notes
          ];

          if ($dailyView) {
            $data['angsuran'] = $item->total_angsuran;
            $data['is_paid'] = $item->loan_instalment->where('transaction_date', $tanggalSeleksi)->isNotEmpty() || $item->white_off?->transaction_date == $tanggalSeleksi; //
          }

          return $data;
        })->sortBy('nama')->sortBy('tanggal_drop')->values(),
      ];
    })->values();

    // ddd($groupByMonth);

    $mergedData = collect([$dataMlGenerate])->merge($groupByMonth)->values();

    $dateOfWeek = [$tanggalSeleksi];
    // for ($date = $transaction_start_date; $date->lte($transaction_date); $date->addDay()) {
    //   if (AppHelper::dateName($date) == $hari) {
    //     $dateOfWeek[] = $date->copy()->format('Y-m-d');
    //   }
    // }
    return [
      'datas' => $mergedData,
      'dateOfWeek' => $dateOfWeek,
      'sirkulasi' => $transactionSirkulan,
      'server_filter' => [
        'closed_transaction' => $ClosedTransaction,
        'month' => $transaction_date->format('Y-m'),
        'hari' => $hari,
        'wilayah' => $wilayah,
        'branch' => $userAuthorized['branches'],
        'userAuthorized' => $userAuthorized,
        'branch_id' => $branch_id,
        'kelompok' => $kelompok,
        'groupId' => $groupingId->id,
        'today' => $dayClosedParams
      ],
    ];
  }

  public static function getLoanByDate(Request $request)
  {
    $transaction_date = Carbon::parse($request->month)->endOfMonth() ?? Carbon::now()->endOfMonth();
    $transaction_start_date = $transaction_date->copy()->startOfMonth();
    $begin_transaction = $transaction_date->copy()->startOfMonth();

    $authorized = auth()->user();
    $branch_id = $authorized->can('can show branch') ? ($request->branch_id ?? 1) : $authorized->employee->branch_id;
    $wilayah = $authorized->can('can show branch') ? (Branch::find($branch_id)->wilayah ?? 1) : $authorized->employee->branch->wilayah;
    $kelompok = $authorized->can('can show kelompok') ? ($request->kelompok ?? 1) : $authorized->employee->area;
    $userAuthorized = AppHelper::branch_permission($authorized, $branch_id);


    $hari = $request->hari ?? AppHelper::dateName(Carbon::now()->format('Y-m-d'));
    // dd($hari);


    $hariIni = AppHelper::dateName(Carbon::now()) == $hari;
    $lastDayOfThisWeek = Carbon::now()->previous(AppHelper::getNumbDays($hari))->format('Y-m-d');
    $dayClosedParams = $hariIni ? Carbon::now()->format('Y-m-d') : $lastDayOfThisWeek;
    $ClosedTransaction = AppHelper::get_closed_date($dayClosedParams);

    $loan = TransactionLoan::with(
      ['loan_instalment' => function ($item) {
        $item->orderByDesc('transaction_date');
      }, 'manage_customer' => function ($item) {
        $item->with('loan');
      }, 'branch', 'customer', 'loan_officer_grouping']
    )
      ->whereBetween('drop_date', [$begin_transaction, $transaction_date->format('Y-m-d')])
      ->where('hari', $hari)
      ->whereHas('branch', function ($branch) use ($branch_id, $kelompok) {
        $branch->where('branch_id', $branch_id)->where('kelompok', $kelompok);
      })
      ->where('status', 'success')
      ->orderBy('drop_date')
      ->get()
      ->groupBy(function ($item) {
        return Carbon::parse($item->drop_date)->format('Y-m');
      });



    $groupByMonth = $loan->map(function ($item, $key) use ($transaction_date, $transaction_start_date) {
      return [
        'month' => Carbon::parse($key)->format('FY'),
        'date' => Carbon::parse($key)->startOfMonth()->format('Y-m-d'),
        'data' => $item->map(function ($item) use ($transaction_start_date, $transaction_date) {

          return [
            'tanggal_drop' => $item->drop_date,
            'nama' => $item->customer->nama,

            'alamat' => $item->customer->alamat,
            'nomor_anggota' => $item->manage_customer->id,

            'status_pinjaman' => AppHelper::status_pinjaman($item->loan_instalment->first()?->status),
            'lunas' => $item->loan_instalment->sum('nominal') == $item->pinjaman,

            'pinjaman_ke' => $item->manage_customer->loan->where('drop_date', '<=', $item->drop_date)->where('status', 'success')->count(),
            'drop' => $item->nominal_drop,

            'pinjaman' => $item->pinjaman,
            'hari' => $item->hari,

            'nik' => $item->customer->nik,

            'kelompok' => $item->loan_officer_grouping->kelompok,
            'jumlah_angsuran' => $item->loan_instalment->count(),

            'id' => $item->id,
            'instalment' => $item->loan_instalment->groupBy(function ($instalment) {
              return Carbon::parse($instalment->transaction_date)->format('Y-m-d');
            })->map(function ($instalments) {
              return $instalments->sum('nominal');
            }),
            'x_angs' => $item->loan_instalment->count(),
            'angsuran' => $item->loan_instalment->sum('nominal'),

            'saldo' => $item->pinjaman - $item->loan_instalment->sum('nominal'),
            'notes' => $item->notes

          ];
        })->sortBy('nama')->sortBy('tanggal_drop')->values(),
      ];
    })->values();

    return  [
      'datas' => $groupByMonth,
      'select_branch' => auth()->user()->can('can show branch'),
      'select_kelompok' => auth()->user()->can('can show kelompok'),
      'server_filter' => [
        'closed_transaction' => $ClosedTransaction,
        'today' => $dayClosedParams,
        'month' => $transaction_date->format('Y-m'),
        'hari' => $hari,
        'wilayah' => $wilayah,
        'branch' => $userAuthorized['branches'],
        'userAuthorized' => $userAuthorized,
        'branch_id' => $branch_id,
        'kelompok' => $kelompok,
        'searchMonth' => true
      ],
    ];
  }

  public static function getLoanMacet(Request $request, $dailyView = false)
  {
    if ($dailyView) {
      $transaction_date = Carbon::now()->endOfMonth();
    } else {
      $transaction_date = Carbon::now()->endOfMonth();
    }


    $transaction_start_date = $transaction_date->copy()->startOfMonth();
    $begin_transaction = $transaction_date->copy()->startOfMonth()->subMonthNoOverflow(4);


    $authorized = auth()->user();
    $branch_id = $authorized->can('can show branch') ? ($request->branch_id ?? 1) : $authorized->employee->branch_id;
    // dd($branch_id);
    $wilayah = $authorized->can('can show branch') ? (Branch::find($branch_id)->wilayah ?? 1) : $authorized->employee->branch->wilayah;
    $kelompok = $authorized->can('can show kelompok') ? ($request->kelompok ?? 1) : $authorized->employee->area;
    $userAuthorized = AppHelper::branch_permission($authorized, $branch_id);


    $hari = $request->hari ?? AppHelper::dateName(Carbon::now()->format('Y-m-d'));
    $tanggalSeleksi = AppHelper::getStortingShowDate($hari);
    $groupingId = TransactionLoanOfficerGrouping::where('branch_id', $branch_id)->where('kelompok', $kelompok)->first();
    $onlineDate = Carbon::parse(OnlineBranch::where('branch_id', $branch_id)->first()->online_date ?? Carbon::now()->subMonths(4))->subMonth()->endOfMonth()->format('Y-m-d');



    $loan = TransactionLoan::with(
      ['loan_instalment' => function ($item) {
        $item->orderByDesc('transaction_date');
      }, 'manage_customer' => function ($item) {
        $item->with('loan');
      }, 'branch', 'customer', 'loan_officer_grouping']
    )
      ->where('drop_date', "<", $begin_transaction)
      ->where('hari', $hari)
      ->where('transaction_loan_officer_grouping_id', $groupingId->id)
      ->whereNull('out_status')
      ->where('status', 'success')
      ->orderBy('drop_date')
      ->get()
      ->groupBy(function ($item) {
        return Carbon::parse($item->drop_date)->format('Y-m');
      });





    $hariIni = AppHelper::dateName(Carbon::now()) == $hari;
    $lastDayOfThisWeek = Carbon::now()->previous(AppHelper::getNumbDays($hari))->format('Y-m-d');
    $dayClosedParams = $hariIni ? Carbon::now()->format('Y-m-d') : $lastDayOfThisWeek;
    $ClosedTransaction = AppHelper::get_closed_date($dayClosedParams);


    // dd($dataMlGenerate);

    $groupByMonth = $loan->map(function ($item, $key) use ($transaction_date, $transaction_start_date, $tanggalSeleksi, $dailyView) {
      return [
        'month' => Carbon::parse($key)->format('FY'),
        'type' => AppHelper::generateStatusAngsuranString2(Carbon::parse($key)->startOfMonth()->format('Y-m-d'), $transaction_date->format('Y-m-d')),
        'type2' => AppHelper::generateStatusAngsuranString(Carbon::parse($key)->startOfMonth()->format('Y-m-d'), $transaction_date->format('Y-m-d')),
        'date' => Carbon::parse($key)->startOfMonth()->format('Y-m-d'),
        'data' => $item->map(function ($item) use ($transaction_start_date, $transaction_date, $tanggalSeleksi, $dailyView) {
          $data = [
            'tanggal_drop' => $item->drop_date,
            'nama' => $item->customer->nama,
            'alamat' => $item->customer->alamat,
            'nomor_anggota' => $item->manage_customer->id,

            'status_pinjaman' => AppHelper::status_pinjaman($item->loan_instalment->first()?->status),
            'lunas' => $item->loan_instalment->sum('nominal') == $item->pinjaman,
            'pinjaman_ke' => $item->manage_customer->loan->where('drop_date', '<=', $item->drop_date)->where('status', 'success')->count(),
            'drop' => $item->nominal_drop,
            'pinjaman' => $item->pinjaman,
            'hari' => $item->hari,
            'nik' => $item->customer->nik,
            'kelompok' => $item->loan_officer_grouping->kelompok,
            'jumlah_angsuran' => $item->loan_instalment->count(),
            'id' => $item->id,
            'instalment' => $item->loan_instalment->groupBy(function ($instalment) {
              return Carbon::parse($instalment->transaction_date)->format('Y-m-d');
            })->map(function ($instalments) {
              return [
                'total_nominal' => $instalments->sum('nominal'),
                'is_active' => $instalments->contains(function ($instalment) {
                  return $instalment['danatitipan'] == true;  // Cek apakah ada 'isactive' yang true
                })
              ];
            }),
            'angs_today' => $item->loan_instalment->where('transaction_date', $tanggalSeleksi)?->sum('nominal') ?? 0,
            'x_angs' => $item->loan_instalment->count(),
            'saldo_sebelumnya' => $item->pinjaman - $item->loan_instalment->where('transaction_date', '<', $transaction_start_date->format('Y-m-d'))->sum('nominal'),
            'saldo' => $item->pinjaman - $item->loan_instalment->where('transaction_date', '<=', $transaction_date->format('Y-m-d'))->sum('nominal'),
            'notes' => $item->notes
          ];


          if ($dailyView) {
            $data['angsuran'] = $item->loan_instalment->sum('nominal');
            $data['is_paid'] = $item->loan_instalment->where('transaction_date', $tanggalSeleksi)->isNotEmpty();
          } else {
            $data['angsuran'] = $item->loan_instalment->whereBetween('transaction_date', [$transaction_start_date->format('Y-m-d'), $transaction_date->format('Y-m-d')])->sum('nominal');
          }

          return $data;
        })->sortBy('nama')->sortBy('tanggal_drop')->values(),
      ];
    })->values();

    $dateOfWeek = [];
    for ($date = $transaction_start_date; $date->lte($transaction_date); $date->addDay()) {
      if (AppHelper::dateName($date) == $hari) {
        $dateOfWeek[] = $date->copy()->format('Y-m-d');
      }
    }

    return  [
      'datas' => $groupByMonth,
      'select_branch' => auth()->user()->can('can show branch'),
      'select_kelompok' => auth()->user()->can('can show kelompok'),
      'server_filter' => [
        'closed_transaction' => $ClosedTransaction,
        'today' => $dayClosedParams,
        'hari' => $hari,
        'wilayah' => $wilayah,
        'branch' => $userAuthorized['branches'],
        'userAuthorized' => $userAuthorized,
        'branch_id' => $branch_id,
        'kelompok' => $kelompok,
        'type_show' => 'macet',
        'searchMonth' => false,
        'onlineDate' => $onlineDate,
      ],
    ];
  }
}
