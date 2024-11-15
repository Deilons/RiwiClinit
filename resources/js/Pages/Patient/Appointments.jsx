import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Appointments() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        axios.get('/patient/appointments')
            .then(response => {
                setAppointments(response.data);
            })
            .catch(error => {
                console.error('Error fetching appointments:', error);
            });
    }, []);

    return (
        <AuthenticatedLayout>
            <Head title="Mis Citas" />
            <h2>Mis Citas</h2>
            <ul>
                {appointments.map(appointment => (
                    <li key={appointment.id}>
                        <p>Doctor: {appointment.doctor.user.name}</p>
                        <p>Fecha: {appointment.date}</p>
                        <p>Estado: {appointment.status}</p>
                        <button onClick={() => cancelAppointment(appointment.id)}>
                            Cancelar
                        </button>
                    </li>
                ))}
            </ul>
        </AuthenticatedLayout>
    );
}
