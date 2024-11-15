import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ShowAppointment() {
    const { appointmentId } = useParams();
    const [appointment, setAppointment] = useState(null);

    useEffect(() => {
        axios.get(`/appointments/${appointmentId}`)
            .then(response => {
                setAppointment(response.data);
            })
            .catch(error => {
                console.error('Error fetching appointment details:', error);
            });
    }, [appointmentId]);

    return (
        <AuthenticatedLayout>
            <Head title="Appointment Details" />
            <h2>Appointment Details</h2>
            {appointment && (
                <div>
                    <p>Doctor: {appointment.doctor.user.name}</p>
                    <p>Fecha: {appointment.date}</p>
                    <p>Estado: {appointment.status}</p>
                    <p>Observaciones: {appointment.reason}</p>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
