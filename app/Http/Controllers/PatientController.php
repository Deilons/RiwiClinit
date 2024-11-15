<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Carbon\Carbon;

class PatientController extends Controller
{
    // search available appointments
    public function searchAvailableAppointments()
    {
        return Appointment::whereNull('patient_id')
                           ->whereDate('date', '>=', Carbon::now())
                           ->get();
    }

    // check availability
    public function checkAvailability(Request $request)
    {
        $request->validate(['date' => 'required|date']);

        return Appointment::where('date', $request->date)
                           ->whereNull('patient_id')
                           ->exists();
    }

    // create an appointment (for patients only )
    public function createAppointment(Request $request)
    {
        $patient = auth()->user();
        $request->validate(['date' => 'required|date']);

        Appointment::create([
            'patient_id' => $patient->id,
            'doctor_id' => $request->doctor_id,
            'date' => $request->date,
            'status' => 'scheduled',
        ]);

        return response()->json(['message' => 'Appointment created successfully']);
    }

    public function showAppointment($appointmentId)
    {
        return Appointment::where('patient_id', auth()->id())
                           ->findOrFail($appointmentId);
    }

    // cancel an appointment
    public function cancelAppointment($appointmentId)
    {
        $appointment = Appointment::findOrFail($appointmentId);
        $appointment->update(['status' => 'cancelled']);

        return response()->json(['message' => 'Appointment cancelled successfully']);
    }
}
