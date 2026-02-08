<?php

namespace App\Http\Controllers;


use App\Traits\PinjamanTrait;
use App\Traits\RekapTrait;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MobileAppsMantriController extends Controller
{
  use RekapTrait;
  use PinjamanTrait;
  public function index()
  {
    return Inertia::render('MobileApps/Index');
  }

  public function create()
  {
    return Inertia::render('MobileApps/Create/Index');
  }

  public function transaksi(Request $request)
  {
    $data = $this->getTransactionLoan($request, false, true);
    return Inertia::render('MobileApps/BukuTransaksiMantri/TransaksiMantri', $data);
  }

  public function angsuran(Request $request)
  {
    $data = $this->getLoanMantri($request, true);
    return Inertia::render("MobileApps/Angsuran/Index", $data);
  }

  public function buku_angsuran(Request $request)
  {
    $data = $this->getLoan($request);
    return Inertia::render("MobileApps/BukuAngsuranMantri/Index", $data);
  }

  public function macet(Request $request)
  {
    $data = $this->getLoanMacet($request);

    return Inertia::render("MobileApps/Angsuran/SearchByDate", $data);
  }

  public function byDates(Request $request)
  {
    $data = $this->getLoanByDate($request);
    return Inertia::render("MobileApps/Angsuran/SearchByDate", $data);
  }


  public function buku_transaksi_kepala(Request $request)
  {
    $data = $this->getTransactionLoan($request, true);
    return Inertia::render('MobileApps/BukuTransaksiKepala/TransaksiMantri', $data);
  }

  public function rencana_drop_kepala(Request $request)
  {
    $data = $this->getRencanaDropKepalaData($request);
    return Inertia::render('MobileApps/RencanaDropKepala/Index', $data);
  }

  public function rekap_permantri(Request $request)
  {
    $data = $this->getRekapPermantriData($request);
    return Inertia::render('MobileApps/Rekap/RekapPerMantri', $data);
  }

  public function rekap_dua(Request $request)
  {
    $data = $this->getDataRekapDua($request);
    return Inertia::render('MobileApps/Rekap/RekapDua', $data);
  }
  public function rekap_satu(Request $request)
  {
    $data = $this->getRekapDuaData($request);
    return Inertia::render('MobileApps/Rekap/RekapSatu', $data);
  }
}
