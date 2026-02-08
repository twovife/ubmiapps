<?php

namespace App\Http\Controllers;

use App\Helpers\AppHelper;
use App\Models\Branch;
use App\Models\TransactionDailyRecap;
use App\Models\TransactionLoan;
use App\Models\TransactionLoanInstalment;
use App\Models\TransactionLoanOfficerGrouping;
use App\Models\TransactionSirculation;
use App\Traits\RekapTrait;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use PHPUnit\TextUI\Output\SummaryPrinter;

class TransactionDailyRecapController extends Controller
{

  use RekapTrait;


  public function rekap_post(Request $request)
  {
    try {
      DB::beginTransaction();
      $dailyTransaction = TransactionDailyRecap::firstOrNew(
        ['transaction_loan_officer_grouping_id' => $request->id, 'date' => $request->date]
      );

      if ($request->type == 2 && !$dailyTransaction->daily_kepala_approval) {
        return redirect()->back()->withError('Data belum di approve kepala');
      }

      $dailyTransaction->update([
        "kasbon" => $request->kasbon,
        "transport" => $request->transport,
        "daily_kasir_approval" => $request->type == 1 ? $dailyTransaction->daily_kasir_approval : Carbon::now(),
        "daily_kasir_approval_user" => $request->type == 1 ? $dailyTransaction->daily_kasir_approval_user : auth()->user()->employee->id
      ]);



      $dailyTransaction->save();
      DB::commit();
    } catch (Exception $e) {
      DB::rollBack();
      return redirect()->back()->withError('Data Gagal Diperbarui, Refresh / Hub IT');
    }

    return redirect()->back()->with('message', 'Data berhasil disimpan.');
  }

  public function ceklist_kepala(Request $request)
  {
    $validate = $request->validate([
      'id' => ['required'],
      'date' => ['required'],
      'keluar' => ['required'],
      'baru' => ['required'],
      'lama' => ['required'],
      'rencana' => ['required'],
      'tanggal_rencana_minggu_depan' => ['required'],
      'rencana_minggu_depan' => ['required'],
      'target_minggu_depan' => ['required'],
    ]);


    try {
      DB::beginTransaction();
      $sumAllDrop = TransactionLoan::where('transaction_loan_officer_grouping_id', $request->id)->where('drop_date', $request->date)->where('status', 'success')->sum('nominal_drop');
      $sumAllInstalment = TransactionLoanInstalment::where('transaction_loan_officer_grouping_id', $request->id)->where('transaction_date', $request->date)->sum('nominal');

      $check_thisDay = TransactionDailyRecap::firstOrCreate(['transaction_loan_officer_grouping_id' => $request->id, 'date' => $request->date]);
      $check_thisDay->update([
        'drop' => $sumAllDrop,
        'storting' => $sumAllInstalment,
        'keluar' => $request->keluar,
        'daily_kepala_approval' => Carbon::now(),
        'daily_kepala_approval_user' =>  auth()->user()->employee->id,
      ]);


      $fillTragetMingguDepan = TransactionDailyRecap::firstOrCreate(['transaction_loan_officer_grouping_id' => $request->id, 'date' => $request->tanggal_rencana_minggu_depan]);
      $fillTragetMingguDepan->update([
        'target' => $request->target_minggu_depan,
        'target_on' =>  $request->date,
      ]);





      DB::commit();
    } catch (Exception $e) {
      DB::rollBack();
      return redirect()->back()->withError('Data Gagal Diperbarui, Refresh / Hub IT');
    }
    return redirect()->back()->with('message', $message ?? 'Data berhasil disimpan.');
  }

  public function rekap_permantri(Request $request)
  {
    $data = $this->getRekapPermantriData($request);
    return Inertia::render('WebView/Rekap/RekapPerMantri', $data);
  }

  public function rencana_drop(Request $request)
  {
    $data = $this->getRencanaDropKepalaData($request);
    return Inertia::render('WebView/RencanaDropKepala/Index', $data);
  }

  public function rekap_dua(Request $request)
  {
    $data = $this->getDataRekapDua($request);
    // ddd($data);
    return Inertia::render('WebView/Rekap/RekapDua', $data);
  }
  public function rekap_satu(Request $request)
  {
    $data = $this->getRekapDuaData($request);
    return Inertia::render('WebView/Rekap/RekapSatu', $data);
  }

  public function deleteRekap(TransactionDailyRecap $transactionDailyRecap, Request $request)
  {
    try {
      DB::beginTransaction();
      $transactionDailyRecap->delete();
      DB::commit();
    } catch (Exception $e) {
      DB::rollBack();
      return redirect()->back()->withError('Data Gagal Diperbarui, Refresh / Hub IT');
    }
    return redirect()->back()->with('message', 'Data berhasil dihapus.');
  }
}
