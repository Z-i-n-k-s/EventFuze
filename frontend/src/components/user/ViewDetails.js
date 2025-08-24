import React, { useState } from 'react';
import { X } from 'lucide-react';

const ViewDetails = ({ event, onClose }) => {
    const [registered, setRegistered] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [amount, setAmount] = useState(event.fee || 0);

    const handleRegister = () => {
        if (event.fee && event.fee > 0) {
            setShowPaymentModal(true);
        } else {
            setRegistered(true);
            setShowSuccessModal(true);
        }
    };

    const handlePaymentComplete = () => {
        if (amount >= event.fee) {
            setRegistered(true);
            setShowPaymentModal(false);
            setShowSuccessModal(true);
        } else {
            alert(`Please pay the full fee of ${event.fee}`);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            {/* Main Event Modal */}
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
                        {event.fee > 0 && <p><strong>Registration Fee:</strong> ${event.fee}</p>}
                    </div>

                    <button
                        onClick={handleRegister}
                        className={`w-full py-2 px-4 rounded-lg text-white transition-colors ${
                            registered ? 'bg-green-700 hover:bg-green-800' : 'bg-green-500 hover:bg-green-600'
                        }`}
                    >
                        {registered ? 'Registered Already' : 'Register'}
                    </button>
                </div>
            </div>

            {/* Payment Modal */}
            {showPaymentModal && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-xl p-6 w-96 space-y-4">
                        <h3 className="text-xl font-bold text-gray-800">Payment Required</h3>
                        <p>Registration fee for this event is <strong>${event.fee}</strong></p>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-green-400"
                        />
                        <button
                            onClick={handlePaymentComplete}
                            className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                            Complete Registration
                        </button>
                        <button
                            onClick={() => setShowPaymentModal(false)}
                            className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-xl p-6 w-80 text-center">
                        <h3 className="text-xl font-bold text-green-700 mb-2">Successfully Registered!</h3>
                        <p className="text-gray-700 mb-4">{event.title}</p>
                        <button
                            onClick={() => setShowSuccessModal(false)}
                            className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewDetails;
