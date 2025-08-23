import React, { useState } from 'react';
import EditDetails from '../../components/subAdmin/EditDetails';

const EventManagement = () => {
  // Sample data based on your schema
  const [events, setEvents] = useState([
    {
      _id: '1',
      title: 'Annual Tech Conference',
      description: 'A gathering of tech enthusiasts to discuss the latest trends in technology.',
      category: 'Technology',
      date: '2023-11-15',
      startTime: '09:00',
      endTime: '17:00',
      location: 'University Auditorium',
      maxParticipants: 200,
      registeredStudents: ['std101', 'std102', 'std103', 'std104'],
      clubsId: ['club1', 'club2'],
      images: ['image1.jpg', 'image2.jpg'],
      createdBy: 'admin1',
      status: 'upcoming',
      isFree: true,
      registrationFee: 0,
      currency: 'USD',
      createdAt: '2023-10-01T10:00:00Z',
      updatedAt: '2023-10-05T14:30:00Z',
      provideCertificate: true
    },
    {
      _id: '2',
      title: 'Music Festival',
      description: 'Annual music festival featuring local bands and artists.',
      category: 'Music',
      date: '2023-12-05',
      startTime: '14:00',
      endTime: '22:00',
      location: 'Campus Grounds',
      maxParticipants: 500,
      registeredStudents: ['std101', 'std105', 'std106', 'std107', 'std108'],
      clubsId: ['club3'],
      images: ['music1.jpg'],
      createdBy: 'admin2',
      status: 'upcoming',
      isFree: false,
      registrationFee: 15,
      currency: 'USD',
      createdAt: '2023-09-20T08:45:00Z',
      updatedAt: '2023-10-10T11:20:00Z',
      provideCertificate: false
    },
    {
      _id: '3',
      title: 'Charity Run',
      description: '5K run to raise funds for local community projects.',
      category: 'Sports',
      date: '2023-10-10',
      startTime: '08:00',
      endTime: '12:00',
      location: 'City Park',
      maxParticipants: 300,
      registeredStudents: ['std109', 'std110', 'std111'],
      clubsId: ['club4', 'club5'],
      images: ['run1.jpg', 'run2.jpg'],
      createdBy: 'admin1',
      status: 'completed',
      isFree: false,
      registrationFee: 10,
      currency: 'USD',
      createdAt: '2023-08-15T09:30:00Z',
      updatedAt: '2023-10-11T13:45:00Z',
      provideCertificate: true
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  // Filter events based on status and search term
  const filteredEvents = events.filter(event => {
    const matchesFilter = filter === 'all' || event.status === filter;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Function to handle event deletion
  const handleDeleteEvent = (id) => {
    setEvents(events.filter(event => event._id !== id));
    setDeleteConfirm(null);
  };

  // Function to toggle certificate provision
  const toggleCertificate = (id) => {
    setEvents(events.map(event => 
      event._id === id ? { ...event, provideCertificate: !event.provideCertificate } : event
    ));
  };

  // Function to get status badge color
  const getStatusColor = (status) => {
    switch(status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'ongoing': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'completed': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    }
  };

  // Function to handle event update after editing
  const handleEventUpdate = (updatedEvent) => {
    setEvents(events.map(event => 
      event._id === updatedEvent._id ? updatedEvent : event
    ));
    setEditingEvent(null);
  };

  return (
    <div className="min-h-screen bg-green-100 dark:bg-slate-900 p-4 md:p-6">
      {/* Header */}
      <div className=" rounded-lg shadow-sm p-4 md:p-6 mb-6">
        <div className="flex flex-col">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
    <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">
      Event Management
    </h1>
  </div>
  <div className="flex items-center">
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search events..."
        className="pl-4 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  </div>
</div>
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'upcoming', 'ongoing', 'completed'].map((status) => (
          <button
            key={status}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === status 
                ? 'bg-green-700 text-white' 
                : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
            }`}
            onClick={() => setFilter(status)}
          >
            {status === 'all' ? 'All Events' : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <div 
              key={event._id} 
              className="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-slate-700 transition-transform hover:-translate-y-1"
            >
              <div className="p-4 bg-gray-50 dark:bg-slate-700 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{event.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                  {event.status}
                </span>
              </div>
              
              <div className="h-48 bg-gray-200 dark:bg-slate-600 flex items-center justify-center">
                {event.images && event.images.length > 0 ? (
                  <img 
                    src={event.images[0]} 
                    alt={event.title} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-gray-500 dark:text-gray-400">No Image Available</div>
                )}
              </div>
              
              <div className="p-4">
                <p className="text-gray-600 dark:text-gray-300 mb-4">{event.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex">
                    <span className="font-medium text-gray-700 dark:text-gray-300 w-32">Category:</span>
                    <span className="text-gray-600 dark:text-gray-400">{event.category}</span>
                  </div>
                  
                  <div className="flex">
                    <span className="font-medium text-gray-700 dark:text-gray-300 w-32">Date & Time:</span>
                    <span className="text-gray-600 dark:text-gray-400">{event.date} | {event.startTime} - {event.endTime}</span>
                  </div>
                  
                  <div className="flex">
                    <span className="font-medium text-gray-700 dark:text-gray-300 w-32">Location:</span>
                    <span className="text-gray-600 dark:text-gray-400">{event.location}</span>
                  </div>
                  
                  <div className="flex">
                    <span className="font-medium text-gray-700 dark:text-gray-300 w-32">Participants:</span>
                    <span className="text-gray-600 dark:text-gray-400">{event.registeredStudents.length} / {event.maxParticipants}</span>
                  </div>
                  
                  <div className="flex">
                    <span className="font-medium text-gray-700 dark:text-gray-300 w-32">Fee:</span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {event.isFree ? 'Free' : `${event.registrationFee} ${event.currency}`}
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 dark:text-gray-300 w-32">Certificate:</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={event.provideCertificate}
                        onChange={() => toggleCertificate(event._id)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex">
                    <span className="font-medium text-gray-700 dark:text-gray-300 w-32">Clubs:</span>
                    <div className="flex flex-wrap gap-1">
                      {event.clubsId.map(clubId => (
                        <span key={clubId} className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs rounded">
                          Club {clubId}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-slate-700 flex justify-between gap-2">
                <button 
                  className="flex-1 px-3 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-900 transition-colors"
                  onClick={() => setEditingEvent(event)}
                >
                  Edit
                </button>
                
                <button 
                  className="flex-1 px-3 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
                  onClick={() => setDeleteConfirm(event)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500 dark:text-gray-400">No events found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Are you sure you want to delete the event "{deleteConfirm.title}"? This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button 
                className="px-4 py-2 bg-gray-300 dark:bg-slate-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-slate-500 transition-colors"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                onClick={() => handleDeleteEvent(deleteConfirm._id)}
              >
                Delete Event
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Event Modal */}
      {editingEvent && (
        <EditDetails
          event={editingEvent} 
          onClose={() => setEditingEvent(null)} 
          onSave={handleEventUpdate}
        />
      )}
    </div>
  );
};

export default EventManagement;