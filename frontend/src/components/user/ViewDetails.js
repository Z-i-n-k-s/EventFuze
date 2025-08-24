import React, { useState } from 'react';
import { X } from 'lucide-react';
import SummaryApi from '../../common';
import { useSelector } from 'react-redux';

const ViewDetails = ({ event, onClose }) => {
  const [registered, setRegistered] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [amount, setAmount] = useState(event.registrationFee || 0);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state?.user?.user);

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? 'Invalid Date'
      : date.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
  };
  console.log(event)

  // ---- Register API Call ----
  const registerForEvent = async (amountPaid) => {
    try {
      setLoading(true);
      const res = await fetch(SummaryApi.registerForEvent.url, {
        method: SummaryApi.registerForEvent.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: user?._id, // Student ID from props
          eventId: event?.id,  // Event ID
          amountPaid: amountPaid || 0,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to register for event');
      }

      setRegistered(true);
      setShowPaymentModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error registering for event:', error);
      alert('Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ---- Handle Register Button ----
  const handleRegister = () => {
    if (!event.isFree && event.registrationFee > 0) {
      setShowPaymentModal(true);
    } else {
      registerForEvent(0);
    }
  };

  // ---- Handle Payment Completion ----
  const handlePaymentComplete = () => {
    if (amount >= event.registrationFee) {
      registerForEvent(amount);
    } else {
      alert(`Please pay the full fee of ${event.registrationFee} ${event.currency}`);
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

        <img
          src={event.image}
          alt={event.title}
          className="w-full h-64 object-cover rounded-t-2xl"
          onError={(e) => (e.target.src = 'https://via.placeholder.com/400x300?text=Event+Image')}
        />

        <div className="p-6 space-y-4">
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{event.title}</h2>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300">{event.description}</p>

          {/* Event Info */}
          <div className="space-y-2 text-gray-600 dark:text-gray-300">
            <p><strong>Date:</strong> {formatDate(event.date)}</p>
            <p><strong>Time:</strong> {event.startTime} - {event.endTime}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Club:</strong> {event.club}</p>
            <p><strong>Category:</strong> {event.category}</p>
            <p><strong>Status:</strong> {event.status}</p>
            <p><strong>Attendees:</strong> {event.attendees} / {event.maxParticipants}</p>
            <p>
              <strong>Registration Window:</strong>{' '}
              {`${formatDate(event.registrationStart)} - ${formatDate(event.registrationDeadline)}`}
            </p>
            <p>
              <strong>Fee:</strong>{' '}
              {event.isFree ? 'Free' : `${event.registrationFee} ${event.currency}`}
            </p>
          </div>

          {/* Register Button */}
          <button
            onClick={handleRegister}
            disabled={loading || registered}
            className={`w-full py-2 px-4 rounded-lg text-white transition-colors ${
              registered
                ? 'bg-green-700 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {loading
              ? 'Processing...'
              : registered
              ? 'Registered Already'
              : 'Register'}
          </button>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl p-6 w-96 space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Payment Required</h3>
            <p>
              Registration fee for this event is{' '}
              <strong>{event.registrationFee} {event.currency}</strong>
            </p>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-green-400"
            />
            <button
              onClick={handlePaymentComplete}
              disabled={loading}
              className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              {loading ? 'Processing...' : 'Complete Registration'}
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
            <h3 className="text-xl font-bold text-green-700 mb-2">
              Successfully Registered!
            </h3>
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
