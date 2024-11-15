import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';

export default function CreateAppointment() {
    const [doctorId, setDoctorId] = useState('');
    const [date, setDate] = useState('');
    const [reason, setReason] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/patient/appointments', { doctor_id: doctorId, date, reason })
            .then(response => {
                setMessage('Appointment created successfully');
            })
            .catch(error => {
                console.error('Error creating appointment:', error);
                setMessage('Error creating appointment');
            });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create Appointment" />
            <h2>Create Appointment</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="doctorId">Doctor:</label>
                    <input
                        type="text"
                        id="doctorId"
                        value={doctorId}
                        onChange={(e) => setDoctorId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="datetime-local"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="reason">Reason:</label>
                    <textarea
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Create</button>
            </form>
            {message && <p>{message}</p>}
        </AuthenticatedLayout>
    );
}
