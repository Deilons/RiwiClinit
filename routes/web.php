<?php

use App\Http\Controllers\DoctorController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware(['role:doctor'])->group(function () {
        Route::get('/doctor/appointments', [DoctorController::class, 'showAppointments']);
        Route::get('/doctor/patients', [DoctorController::class, 'showPatients']);
        Route::post('/doctor/appointments/{appointmentId}/notes', [DoctorController::class, 'addDoctorNote']);
    });

    Route::middleware(['role:patient'])->group(function () {
        Route::get('/patient/appointments', [AppointmentController::class, 'index']);
        Route::post('/patient/appointments', [AppointmentController::class, 'store']);
        Route::delete('/patient/appointments/{appointmentId}', [AppointmentController::class, 'cancel']);
    });

    Route::middleware(['role:doctor'])->group(function () {
        Route::get('/patients', [PatientController::class, 'index']);
        Route::get('/patients/{patientId}', [PatientController::class, 'show']);
    });

    Route::get('/appointments', [AppointmentController::class, 'index']);
    Route::delete('/appointments/{appointmentId}', [AppointmentController::class, 'cancel']);

});




require __DIR__.'/auth.php';
