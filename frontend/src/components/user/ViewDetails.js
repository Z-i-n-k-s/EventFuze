import React, { useState } from 'react';
import { X } from 'lucide-react';

const ViewDetails = ({ event, onClose }) => {
    const [registered, setRegistered] = useState(false);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-3xl relative overflow-hidden">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-green-500 transition-colors"
                >
                    <X className="h-6 w-6" />
                </button>

                <img src={event.image} alt={event.title} className="w-full h-64 object-cover rounded-t-2xl" />

                <div className="p-6 space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{event.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300">{event.description}</p>

                    <div className="space-y-2 text-gray-600 dark:text-gray-300">
                        <p><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
                        <p><strong>Time:</strong> {event.time}</p>
                        <p><strong>Location:</strong> {event.location}</p>
                        <p><strong>Club:</strong> {event.club}</p>
                        <p><strong>Attendees:</strong> {event.attendees}</p>
                        <p><strong>Category:</strong> {event.category}</p>
                    </div>

                    <button
                        onClick={() => setRegistered(!registered)}
                        className={`w-full py-2 px-4 rounded-lg text-white transition-colors ${
                            registered ? 'bg-green-700 hover:bg-green-800' : 'bg-green-500 hover:bg-green-600'
                        }`}
                    >
                        {registered ? 'Registered Already' : 'Register'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewDetails;
