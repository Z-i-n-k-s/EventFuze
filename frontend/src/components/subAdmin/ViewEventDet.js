import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUsers,
  FaTag,
  FaList,
} from "react-icons/fa";
import ShowAttendee from "./ShowAttendee"; // Update path as needed

const ViewEventDet = ({ event, onClose }) => {
  const [showAttendees, setShowAttendees] = useState(false);

  if (!event) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-slate-800 p-4 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Event Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-lg font-semibold"
          >
            &times;
          </button>
        </div>

        {/* Event Image */}
        <div className="relative">
          <img
            src={event.images[0]}
            alt={event.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <span className="bg-blue-100 dark:bg-blue-900/80 text-blue-800 dark:text-blue-200 text-xs font-medium px-2.5 py-0.5 rounded">
              {event.type}
            </span>
          </div>
        </div>

        {/* Event Content */}
        <div className="p-5 md:p-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {event.title}
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {event.description}
          </p>

          {/* Event Details */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center">
              <FaCalendarAlt className="text-blue-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                <p className="text-gray-800 dark:text-white">{event.date}</p>
              </div>
            </div>

            <div className="flex items-center">
              <FaClock className="text-blue-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Time</p>
                <p className="text-gray-800 dark:text-white">{event.time}</p>
              </div>
            </div>

            <div className="flex items-center">
              <FaMapMarkerAlt className="text-blue-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Location
                </p>
                <p className="text-gray-800 dark:text-white">
                  {event.location}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <FaUsers className="text-blue-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Attendees
                </p>
                <p className="text-gray-800 dark:text-white">
                  {event.attendees} people
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <FaTag className="text-blue-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Category
                </p>
                <p className="text-gray-800 dark:text-white">
                  {event.category}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-slate-700">
            <button
              onClick={() => setShowAttendees(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
            >
              <FaList className="mr-2" /> Show All Attendees
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Show Attendees Modal */}
      {showAttendees && (
        <ShowAttendee
          attendees={event.attendees}
          onClose={() => setShowAttendees(false)}
        />
      )}
    </div>
  );
};

export default ViewEventDet;
