import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
const domain="https://appointment-backend-weld.vercel.app"

    const [phone, setPhone] = useState('');
    const [data, setData] = useState(null);
    const [form, setForm] = useState({ name: '', date: '', time: '', service: '', specialRequests: '' });
    const [action, setAction] = useState('');

    const checkAppointment = async () => {
        try {
            const response = await axios.get(`${domain}/appointments/${phone}`);
            setData(response.data);
            setAction(response.data.exists ? 'updateOrDelete' : 'create');
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreate = async () => {
        try {
            await axios.post(`${domain}/appointments`, {
                phone,
                ...form,
            });
            alert('Appointment created');
            setData(null);
            setAction('');
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`${domain}/appointments/${phone}`, {
                ...form,
            });
            alert('Appointment updated');
            setData(null);
            setAction('');
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${domain}/appointments/${phone}`);
            alert('Appointment deleted');
            setData(null);
            setAction('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Appointment System</h1>
            <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Enter phone number"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <button
                        onClick={checkAppointment}
                        className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                    >
                        Check Appointment
                    </button>
                </div>

                {action === 'create' && (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-4">Create Appointment</h2>
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full p-2 border border-gray-300 rounded-md mb-2"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                        <input
                            type="date"
                            className="w-full p-2 border border-gray-300 rounded-md mb-2"
                            value={form.date}
                            onChange={(e) => setForm({ ...form, date: e.target.value })}
                        />
                        <select
                            className="w-full p-2 border border-gray-300 rounded-md mb-2"
                            value={form.time}
                            onChange={(e) => setForm({ ...form, time: e.target.value })}
                        >
                            <option value="">Select Time</option>
                            <option value="10am">10am</option>
                            <option value="1pm">1pm</option>
                            <option value="3pm">3pm</option>
                            <option value="5pm">5pm</option>
                        </select>
                        <select
                            className="w-full p-2 border border-gray-300 rounded-md mb-2"
                            value={form.service}
                            onChange={(e) => setForm({ ...form, service: e.target.value })}
                        >
                            <option value="">Select Service</option>
                            <option value="facial">Facial</option>
                            <option value="massage">Massage</option>
                            <option value="haircut">Haircut</option>
                            <option value="manicure">Manicure</option>
                        </select>
                        <textarea
                            placeholder="Any special requests"
                            className="w-full p-2 border border-gray-300 rounded-md mb-2"
                            value={form.specialRequests}
                            onChange={(e) => setForm({ ...form, specialRequests: e.target.value })}
                        />
                        <button
                            onClick={handleCreate}
                            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
                        >
                            Create
                        </button>
                    </div>
                )}

                {action === 'updateOrDelete' && data && (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-4">Existing Appointment</h2>
                        <p className="mb-2">Name: {data.appointment.name}</p>
                        <p className="mb-2">Date: {new Date(data.appointment.date).toLocaleDateString()}</p>
                        <p className="mb-2">Time: {data.appointment.time}</p>
                        <p className="mb-2">Service: {data.appointment.service}</p>
                        <p className="mb-4">Special Requests: {data.appointment.specialRequests}</p>

                        <h2 className="text-xl font-semibold mb-4">Update Appointment</h2>
                        <input
                            type="text"
                            placeholder="New Name"
                            className="w-full p-2 border border-gray-300 rounded-md mb-2"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                        <input
                            type="date"
                            className="w-full p-2 border border-gray-300 rounded-md mb-2"
                            value={form.date}
                            onChange={(e) => setForm({ ...form, date: e.target.value })}
                        />
                        <select
                            className="w-full p-2 border border-gray-300 rounded-md mb-2"
                            value={form.time}
                            onChange={(e) => setForm({ ...form, time: e.target.value })}
                        >
                            <option value="">Select Time</option>
                            <option value="10am">10am</option>
                            <option value="1pm">1pm</option>
                            <option value="3pm">3pm</option>
                            <option value="5pm">5pm</option>
                        </select>
                        <select
                            className="w-full p-2 border border-gray-300 rounded-md mb-2"
                            value={form.service}
                            onChange={(e) => setForm({ ...form, service: e.target.value })}
                        >
                            <option value="">Select Service</option>
                            <option value="facial">Facial</option>
                            <option value="massage">Massage</option>
                            <option value="haircut">Haircut</option>
                            <option value="manicure">Manicure</option>
                        </select>
                        <textarea
                            placeholder="Any special requests"
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                            value={form.specialRequests}
                            onChange={(e) => setForm({ ...form, specialRequests: e.target.value })}
                        />
                        <button
                            onClick={handleUpdate}
                            className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 mb-2"
                        >
                            Update
                        </button>
                        <button
                            onClick={handleDelete}
                            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
