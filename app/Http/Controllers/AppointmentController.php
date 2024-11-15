<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AppointmentController extends Controller
{
    // Get appointments for the logged-in user
    public function index()
    {
        $user = Auth::user();

        if ($user->role === 'doctor') {
            $appointments = Appointment::where('doctor_id', $user->doctor->id)
                ->with(['patient.user'])
                ->get();
        } elseif ($user->role === 'patient') {
            $appointments = Appointment::where('patient_id', $user->patient->id)
                ->with(['doctor.user'])
                ->get();
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($appointments);
    }

    // Create a new appointment (for patients only)
    public function store(Request $request)
    {
        $user = Auth::user();

        if ($user->role !== 'patient') {
            return response()->json(['message' => 'Only patients can create appointments'], 403);
        }

        $request->validate([
            'doctor_id' => 'required|exists:doctors,id',
            'date' => 'required|date|after:now',
            'reason' => 'required|string',
        ]);

        $appointment = Appointment::create([
            'patient_id' => $user->patient->id,
            'doctor_id' => $request->doctor_id,
            'date' => $request->date,
            'reason' => $request->reason,
            'status' => 'scheduled',
        ]);

        return response()->json($appointment, 201);
    }

    // Add or update a note to an appointment (for doctors only)
    public function addDoctorNote(Request $request, $appointmentId)
    {
        $user = Auth::user();

        if ($user->role !== 'doctor') {
            return response()->json(['message' => 'Only doctors can add notes'], 403);
        }

        $appointment = Appointment::where('id', $appointmentId)
            ->where('doctor_id', $user->doctor->id)
            ->first();

        if (!$appointment) {
            return response()->json(['message' => 'Appointment not found'], 404);
        }

        $request->validate([
            'notes' => 'required|string',
        ]);

        $appointment->notes = $request->notes;
        $appointment->save();

        return response()->json(['message' => 'Note added successfully', 'appointment' => $appointment]);
    }

    // Cancel an appointment (for both doctors and patients)
    public function cancel($appointmentId)
    {
        $user = Auth::user();

        $appointment = Appointment::where('id', $appointmentId)
            ->where(function ($query) use ($user) {
                if ($user->role === 'doctor') {
                    $query->where('doctor_id', $user->doctor->id);
                } elseif ($user->role === 'patient') {
                    $query->where('patient_id', $user->patient->id);
                }
            })
            ->first();

        if (!$appointment) {
            return response()->json(['message' => 'Appointment not found'], 404);
        }

        $appointment->status = 'cancelled';
        $appointment->save();

        return response()->json(['message' => 'Appointment cancelled successfully']);
    }
}
