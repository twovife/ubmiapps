<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\LoanController;
use App\Http\Controllers\MantriAppsController;
use App\Http\Controllers\MobileAppsMantriController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionDailyRecapController;
use App\Http\Controllers\TransactionLoanController;
use App\Models\TransactionDailyRecap;
use App\Models\TransactionLoan;
use App\Models\VIsBalanceLoanWithDailyreport;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', function () {
  return Inertia::render('Dashboard');
})->middleware(['auth'])->name('home');

Route::middleware('auth')->group(function () {

  Route::controller(LoanController::class)->group(function () {


    Route::prefix('batchupdate')->name('batchupdate.')->group(function () {
      Route::get('/', 'batch_create')->name('batch_create');
      Route::post('/', 'batch_post')->name('batch_post');
    })->middleware('permission:unit');
  });

  Route::get('/getviewasd', function () {
    $data = VIsBalanceLoanWithDailyReport::all();
    dd($data);
  });


  Route::prefix('bukutransaksi')->name('transaction.')->group(function () {
    Route::controller(TransactionLoanController::class)->group(function () {
      Route::get('/', "index_buku_transaksi")->name('index_buku_transaksi');
      Route::post('/nik', "nasabah_buku_transaksi")->name('nasabah_buku_transaksi');
      Route::post('/', "store_buku_transaksi")->name('store_buku_transaksi');
      Route::get('/fastcreate', "fastcreatev2")->name('fastcreate');
      Route::get('/fastcreatev2', "fastcreatev2")->name('fastcreatev2');
      Route::get('/inputmacet', "inputmacet")->name('inputmacet');
      Route::post('/batch', "store_buku_transaksi_batch")->name('store_buku_transaksi_batch');
      Route::put('/action/{transactionLoan}', "action_buku_transaksi")->name('action_buku_transaksi');
      Route::put('/updateEverything/{transactionLoan}', "updateEverything")->name('updateEverything');
    });
  });

  Route::prefix('pinjaman')->name('pinjaman.')->group(function () {
    Route::controller(TransactionLoanController::class)->group(function () {
      Route::get('/', "index_pinjaman")->name('index_pinjaman');
      Route::get('/drop_date', "index_pinjaman_search")->name('index_pinjaman_search');
      Route::get('/pinjaman-macet', "index_pinjaman_macet")->name('index_pinjaman_macet');
      Route::get('/actionloan/{transactionLoan}', "get_loan_pinjaman")->name('get_loan_pinjaman');
      Route::post('/get-synch-angsuran/{transactionLoan}', "get_synch_angsuran")->name('get_synch_angsuran');
      Route::post('/synch-angsuran/{transactionLoan}', "synch_angsuran")->name('synch_angsuran');
      Route::get('/checkpengajuan/{transactionLoan}', "checkpengajuan")->name('checkpengajuan');
      Route::post('/actionloan/{transactionLoan}', "bayar_pinjaman")->name('bayar_pinjaman');
      Route::post('/store-pengajuan-lama/{transactionLoan}', "store_pengajuan_lama")->name('store_pengajuan_lama');
      Route::post('/white-off-loan/{transactionLoan}', "white_off_loan")->name('white_off_loan'); //router pemutihan
      Route::delete('/actionloan/{transactionLoanInstalment}', "destroy_angsuran")->name('destroy_angsuran');
      Route::delete('/deleteloan/{transactionLoan}', "destroy_loan")->name('destroy_loan');
    });
  });

  Route::prefix('administrasi')->name('administrasi.')->group(function () {
    Route::controller(EmployeeController::class)->prefix('manpower')->name('manpower.')->group(function () {
      Route::get('/', "index")->name('index');
      Route::post('/', "store")->name('store');
    });
  });
  Route::prefix('kasir')->name('kasir.')->group(function () {
    Route::controller(TransactionDailyRecapController::class)->group(function () {
      Route::prefix('rekap')->name('rekap.')->group(function () {
        Route::post('/', "rekap_post")->name('rekap_post');
        Route::post('/ceklist-kepala', "ceklist_kepala")->name('ceklist_kepala');
        Route::get('/permantri', "rekap_permantri")->name('rekap_permantri');
        Route::get('/rencana', "rencana_drop")->name('rencana_drop');
        Route::get('/rekap-satu', "rekap_satu")->name('rekap_satu');
        Route::get('/rekap-dua', "rekap_dua")->name('rekap_dua');
      });
    });
  });


  Route::prefix('mobile_apps')->name('mobile_apps.')->group(function () {
    Route::controller(MobileAppsMantriController::class)->group(function () {
      Route::get('/', "index")->name('index');
      Route::get('/create', "create")->name('create');
      Route::post('/create', "store")->name('store');
      Route::get('/transaksi', "transaksi")->name('transaksi');
      Route::get('/angsuran', "angsuran")->name('angsuran');
      Route::get('/macet', "macet")->name('macet');
      Route::get('/byDates', "byDates")->name('byDates');
      Route::get('/buku-angsuran', "buku_angsuran")->name('buku_angsuran');

      Route::get('/rencana-drop-kepala', "rencana_drop_kepala")->name('rencana_drop_kepala');

      Route::get('/buku-transaksi-kepala', "buku_transaksi_kepala")->name('buku_transaksi_kepala');

      Route::get('/rekap-permantri', "rekap_permantri")->name('rekap_permantri');
      Route::get('/rekap-satu', "rekap_satu")->name('rekap_satu');
      Route::get('/rekap-dua', "rekap_dua")->name('rekap_dua');
    });
  });

  Route::controller(AdminController::class)->prefix('admin-panel')->name('adminpanel.')->group(function () {
    Route::get('/', "index")->name('index');

    Route::get('/monitoring-staffs', "monitoring_staff")->name('monitoring_staff');
    Route::get('/loan-balancing', "loan_balancing")->name('loan_balancing');
    Route::post('/', "post_permission")->name('post_permission');
    Route::post('/role-assign', "role_assign")->name('role_assign');
    Route::post('/user-assign', "user_assign")->name('user_assign');
    Route::post('/giveMaintenerWorker', "giveMaintenerWorker")->name('giveMaintenerWorker');
    Route::post('/sirkulasiAwal', "sirkulasiAwal")->name('sirkulasiAwal');
  });

  Route::prefix('profile')->name('profile.')->group(function () {
    Route::get('/', [ProfileController::class, 'edit'])->name('edit');
    Route::patch('/', [ProfileController::class, 'update'])->name('update');
    Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
  });
});

require __DIR__ . '/auth.php';
