<?php


namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DoctorController extends Controller

{
    // show appointments of the logged-in doctor
    public function showAppointments()
    {
        $doctor = Auth::user()->doctor; // verify if the user is a doctor

        if (!$doctor) {
            return response()->json(['error' => 'Doctor no encontrado'], 404);
        }

        $appointments = $doctor->appointments()
            ->with('patient.user')
            ->get();

        return response()->json($appointments);
    }

    // show patients of the logged-in doctor
    public function showPatients()
    {
        $doctor = Auth::user()->doctor; // verify if the user is a doctor

        if (!$doctor) {
            return response()->json(['error' => 'Doctor no encontrado'], 404);
        }

        $patients = $doctor->appointments()
            ->with('patient.user')
            ->distinct('patient_id')
            ->get()
            ->pluck('patient');

        return response()->json($patients);
    }
}


