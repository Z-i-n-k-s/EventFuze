import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ShowAttendee = ({ attendees, onClose }) => {
  if (!attendees) return null;

  // Sample attendee data structure (you would replace this with your actual data)
  const sampleAttendees = [
    {
      id: 'STU001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      semester: '5th',
      department: 'Computer Science',
      registrationDate: '2023-06-10',
      contact: '+1234567890'
    },
    {
      id: 'STU002',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      semester: '4th',
      department: 'Electrical Engineering',
      registrationDate: '2023-06-11',
      contact: '+0987654321'
    },
    {
      id: 'STU003',
      name: 'Robert Johnson',
      email: 'robert.j@example.com',
      semester: '6th',
      department: 'Mechanical Engineering',
      registrationDate: '2023-06-09',
      contact: '+1122334455'
    },
    {
      id: 'STU004',
      name: 'Sarah Williams',
      email: 'sarah.w@example.com',
      semester: '3rd',
      department: 'Civil Engineering',
      registrationDate: '2023-06-12',
      contact: '+5566778899'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-slate-800 p-4 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Event Attendees</h2>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-lg font-semibold"
          >
            <FaTimes />
          </button>
        </div>

        {/* Attendee Table */}
        <div className="p-4 md:p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-slate-700 dark:text-gray-300">
                <tr>
                  <th scope="col" className="px-4 py-3">ID</th>
                  <th scope="col" className="px-4 py-3">Name</th>
                  <th scope="col" className="px-4 py-3">Email</th>
                  <th scope="col" className="px-4 py-3">Semester</th>
                  <th scope="col" className="px-4 py-3">Department</th>
                  <th scope="col" className="px-4 py-3">Contact</th>
                  <th scope="col" className="px-4 py-3">Registration Date</th>
                </tr>
              </thead>
              <tbody>
                {sampleAttendees.map((attendee, index) => (
                  <tr key={attendee.id} className={`border-b dark:border-slate-700 ${index % 2 === 0 ? 'bg-white dark:bg-slate-800' : 'bg-gray-50 dark:bg-slate-700'}`}>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{attendee.id}</td>
                    <td className="px-4 py-3">{attendee.name}</td>
                    <td className="px-4 py-3">{attendee.email}</td>
                    <td className="px-4 py-3">{attendee.semester}</td>
                    <td className="px-4 py-3">{attendee.department}</td>
                    <td className="px-4 py-3">{attendee.contact}</td>
                    <td className="px-4 py-3">{attendee.registrationDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary and Close Button */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-gray-200 dark:border-slate-700">
            <p className="text-gray-600 dark:text-gray-300">
              Total Attendees: <span className="font-semibold">{sampleAttendees.length}</span>
            </p>
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowAttendee;