import React, { useState } from 'react';
import { 
  FaUsers, 
  FaCalendarAlt, 
  FaTrophy, 
  FaImage, 
  FaPlus, 
  FaSearch,
  FaEye,
  FaEdit
} from 'react-icons/fa';
import EditDetails from '../../components/subAdmin/EditDetails';
import ViewEventDet from '../../components/subAdmin/ViewEventDet';


const ClubDashboard = () => {
  // Mock data for demonstration
  const [clubData, setClubData] = useState({
    name: "Tech Innovators Club",
    description: "A club for technology enthusiasts and innovators",
    totalMembers: 128,
    totalEvents: 24,
    upcomingEvents: 3,
    milestones: 5
  });

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Web Development Workshop",
      date: "2023-06-15",
      time: "14:00 - 16:00",
      location: "Tech Building Room 302",
      attendees: 42,
      type: "Workshop",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=250&fit=crop",
      description: "Learn web development techniques and build your first website."
    },
    {
      id: 2,
      title: "Annual Hackathon",
      date: "2023-07-20",
      time: "10:00 - 18:00",
      location: "Innovation Hub",
      attendees: 86,
      type: "Competition",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop",
      description: "Compete in our annual hackathon and win exciting prizes."
    },
    {
      id: 3,
      title: "AI & Machine Learning Talk",
      date: "2023-06-08",
      time: "16:00 - 17:30",
      location: "Main Auditorium",
      attendees: 64,
      type: "Seminar",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=250&fit=crop",
      description: "Learn about the latest advancements in AI and machine learning."
    },
    {
      id: 4,
      title: "Tech Career Fair",
      date: "2023-08-05",
      time: "11:00 - 15:00",
      location: "Student Union Building",
      attendees: 120,
      type: "Networking",
      category: "Career",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
      description: "Connect with tech companies and explore career opportunities."
    }
  ]);

  const [activeTab, setActiveTab] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  // Filter events based on search query
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle saving edited event
  const handleSaveEvent = (updatedEvent) => {
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    setEditingEvent(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-4 md:p-6">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 md:p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">
            {clubData.name}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search events..."
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-5 flex items-center transition-transform hover:scale-105">
          <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
            <FaUsers className="text-white text-xl" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{clubData.totalMembers}</h3>
            <p className="text-gray-500 dark:text-gray-400">Total Members</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-5 flex items-center transition-transform hover:scale-105">
          <div className="bg-purple-500 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
            <FaCalendarAlt className="text-white text-xl" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{clubData.totalEvents}</h3>
            <p className="text-gray-500 dark:text-gray-400">Total Events</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-5 flex items-center transition-transform hover:scale-105">
          <div className="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
            <FaTrophy className="text-white text-xl" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{clubData.upcomingEvents}</h3>
            <p className="text-gray-500 dark:text-gray-400">Upcoming Events</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-5 flex items-center transition-transform hover:scale-105">
          <div className="bg-red-500 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
            <FaImage className="text-white text-xl" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{clubData.milestones}</h3>
            <p className="text-gray-500 dark:text-gray-400">Milestones</p>
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-5 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 md:mb-0">Events</h2>
          <div className="flex flex-wrap items-center gap-3">
            <button 
              className={`px-4 py-2 rounded-lg ${activeTab === 'recent' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300'}`}
              onClick={() => setActiveTab('recent')}
            >
              Recent Events
            </button>
            <button 
              className={`px-4 py-2 rounded-lg ${activeTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300'}`}
              onClick={() => setActiveTab('all')}
            >
              All Events
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center">
              <FaPlus className="mr-2" /> Create New Event
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEvents.map(event => (
            <div key={event.id} className="border border-gray-200 dark:border-slate-700 rounded-lg p-4 transition-transform hover:-translate-y-1">
              <div className="mb-3">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <div className="flex justify-between items-start">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded">
                    {event.type}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">{event.date}</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{event.title}</h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <p><span className="font-medium">Time:</span> {event.time}</p>
                <p><span className="font-medium">Location:</span> {event.location}</p>
                <p><span className="font-medium">Attendees:</span> {event.attendees}</p>
              </div>
             <div className="flex space-x-2">
  <button 
    onClick={() => setSelectedEvent(event)}
    className="flex-1 px-3 py-3 bg-green-600 text-white text-sm rounded-lg hover:bg-green-900 transition-colors flex items-center justify-center"
  >
    <FaEye className="mr-1" /> View Details
  </button>
  <button 
    onClick={() => setEditingEvent(event)}
    className="flex-1 px-3 py-3 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center"
  >
    <FaEdit className="mr-1" /> Edit
  </button>
</div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500 dark:text-gray-400">No events found matching your search.</p>
          </div>
        )}
      </div>

      {/* View Details Modal */}
      {selectedEvent && (
        <ViewEventDet
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}

      {/* Edit Details Modal */}
      {editingEvent && (
        <EditDetails
          event={editingEvent} 
          onClose={() => setEditingEvent(null)}
          onSave={handleSaveEvent}
        />
      )}
    </div>
  );
};

export default ClubDashboard;