<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appointment;


class AppointmentController extends Controller
{
    // Get all appointments with associated doctors and patients
    public function index()
    {
        $appointments = Appointment::with(['doctor.user', 'patient.user'])->get();
        return response()->json($appointments);
    }

    // Create a new appointment
    public function store()
    {
        $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctors,id',
            'date' => 'required|date',
        ]);

    $existingAppointment = Appointment::where('doctor_id', $request->doctor_id)
        ->where('date', $request->date)
        ->first();

    if ($existingAppointment) {
        return response()->json(['error' => 'Doctor is not available at this time'], 400);
    }

    $appointment = Appointment::create([
        'patient_id' => $request->patient_id,
        'doctor_id' => $request->doctor_id,
        'date' => $request->date,
        'status' => 'scheduled',
    ]);

    return response()->json($appointment, 201);

    }

    // Show a single appointment by ID
    public function show($id)
    {
        $appointment = Appointment::with(['doctor.user', 'patient.user'])->findOrFail($id);
        return response()->json($appointment);
    }

    // Update an existing appointment
    public function update(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:scheduled,completed,cancelled',
        ]);

        $appointment = Appointment::findOrFail($id);
        $appointment->update([
            'status' => $request->status,
        ]);

        return response()->json($appointment);
    }

    // Delete an existing appointment
    public function destroy($id)
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->delete();

        return response()->json(['message' => 'Appointment deleted successfully']);
    }

}
