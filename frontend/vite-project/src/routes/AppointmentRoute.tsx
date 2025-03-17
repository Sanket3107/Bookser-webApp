import axios from 'axios';

interface Appointment {
    userId: number;
    time: string;
}

const endPoint = `${import.meta.env.VITE_API_URL}/appointments`;

export const bookAppointment = (appointment : Appointment) => axios.post(`${endPoint}/book/${appointment.userId}`, appointment);