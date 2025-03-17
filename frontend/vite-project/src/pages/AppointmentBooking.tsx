import { useState } from "react";
import "tailwindcss";
import { bookAppointment } from "../routes/AppointmentRoute";

const AppointmentBooking = () => {
  const [userId, setUserId] = useState(0);
  const [time,setTime] = useState("");

  const handleBooking = async () => {
    try {
      await bookAppointment({ userId, time});
      alert("Appointment booked successfully!");
    } catch {
      alert("Error booking appointment!");
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">Book Appointment</h2>
      <input type="text" placeholder="User ID" className="border p-2 w-full my-2" onChange={(e) => setUserId(Number(e.target.value))} />
      <input type="datetime-local" onChange={(e) => setTime(e.target.value)} />
      <button className="bg-green-500 text-white p-2 rounded w-full" onClick={handleBooking}>Book</button>
    </div>
  );
}

export default AppointmentBooking