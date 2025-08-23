import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, MapPin, Trash2, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const RegisterEvent = () => {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [showUnregisterModal, setShowUnregisterModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const sectionRef = useRef(null);

  // Demo data - loads immediately
  useEffect(() => {
    const demoEvents = [
      {
        id: 1,
        title: "Photography Workshop",
        date: "2024-12-15",
        time: "10:00 AM",
        location: "Creative Studio, Building A",
        status: "upcoming",
        club: "Photography Club",
        registeredAt: "2024-11-20"
      },
      {
        id: 2,
        title: "Innovation Challenge",
        date: "2024-12-20",
        time: "2:00 PM",
        location: "Innovation Hub, Floor 3",
        status: "upcoming",
        club: "Innovation & Design",
        registeredAt: "2024-11-25"
      },
      {
        id: 3,
        title: "Cultural Festival",
        date: "2024-12-05",
        time: "6:00 PM",
        location: "Main Auditorium",
        status: "completed",
        club: "Cultural Club",
        registeredAt: "2024-11-10"
      },
      {
        id: 4,
        title: "Tech Talk Series",
        date: "2024-12-18",
        time: "4:00 PM",
        location: "Tech Center, Room 201",
        status: "cancelled",
        club: "Tech Club",
        registeredAt: "2024-11-15"
      },
      {
        id: 5,
        title: "Islamic Study Circle",
        date: "Every Friday",
        time: "7:00 PM",
        location: "Community Center",
        status: "ongoing",
        club: "Islamic Society",
        registeredAt: "2024-10-05"
      },
      {
        id: 6,
        title: "Robotics Championship",
        date: "2024-12-25",
        time: "9:00 AM",
        location: "Engineering Building",
        status: "upcoming",
        club: "Robotics Club",
        registeredAt: "2024-11-30"
      }
    ];

    setRegisteredEvents(demoEvents);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'upcoming':
        return {
          color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
          icon: <Clock className="w-3 h-3" />,
          label: 'Upcoming'
        };
      case 'ongoing':
        return {
          color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
          icon: <CheckCircle className="w-3 h-3" />,
          label: 'Ongoing'
        };
      case 'completed':
        return {
          color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
          icon: <CheckCircle className="w-3 h-3" />,
          label: 'Completed'
        };
      case 'cancelled':
        return {
          color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
          icon: <XCircle className="w-3 h-3" />,
          label: 'Cancelled'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
          icon: <AlertCircle className="w-3 h-3" />,
          label: 'Unknown'
        };
    }
  };

  const handleUnregister = (event) => {
    setSelectedEvent(event);
    setShowUnregisterModal(true);
  };

  const confirmUnregister = () => {
    setRegisteredEvents(prev => prev.filter(event => event.id !== selectedEvent.id));
    setShowUnregisterModal(false);
    setSelectedEvent(null);
  };

  const formatDate = (dateString) => {
    if (dateString === "Every Friday") return dateString;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Filtered events based on search and status
  const filteredEvents = registeredEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || event.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 py-20 px-4">
      <div className="max-w-4xl mx-auto" ref={sectionRef}>
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-700 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
            My Registered Events
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Manage your registered events and stay updated on your activities
          </p>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{ transitionDelay: '200ms' }}>
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 text-center border border-slate-200/50 dark:border-slate-600/50">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {filteredEvents.length}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">Total</div>
          </div>
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 text-center border border-slate-200/50 dark:border-slate-600/50">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {filteredEvents.filter(e => e.status === 'upcoming').length}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">Upcoming</div>
          </div>
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 text-center border border-slate-200/50 dark:border-slate-600/50">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {filteredEvents.filter(e => e.status === 'ongoing').length}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">Ongoing</div>
          </div>
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 text-center border border-slate-200/50 dark:border-slate-600/50">
            <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
              {filteredEvents.filter(e => e.status === 'completed').length}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">Completed</div>
          </div>
        </div>

        {/* Search & Filter - moved here */}
        <div className={`flex flex-col sm:flex-row gap-4 mb-8 transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <input
            type="text"
            placeholder="Search by event title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {filteredEvents.map((event, index) => {
            const statusConfig = getStatusBadge(event.status);
            
            return (
              <div
                key={event.id}
                className={`bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 dark:border-slate-600/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Event Info */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                        {event.title}
                      </h3>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color} w-fit`}>
                        {statusConfig.icon}
                        {statusConfig.label}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    <div className="mt-2 text-sm">
                      <span className="text-green-600 dark:text-green-400 font-medium">{event.club}</span>
                      <span className="text-slate-500 dark:text-slate-400"> • Registered: {formatDate(event.registeredAt)}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex-shrink-0">
                    {(event.status === 'upcoming' || event.status === 'ongoing') ? (
                      <button
                        onClick={() => handleUnregister(event)}
                        className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:shadow-lg flex items-center gap-2 transform hover:scale-105"
                      >
                        <Trash2 className="w-4 h-4" />
                        Unregister
                      </button>
                    ) : (
                      <div className="bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-4 py-2 rounded-xl font-medium cursor-not-allowed">
                        {event.status === 'completed' ? 'Completed' : 'Cancelled'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-20">
            <Calendar className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
              No Registered Events
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              No events match your search or filter criteria.
            </p>
          </div>
        )}

        {/* Unregister Modal */}
        {showUnregisterModal && selectedEvent && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md w-full">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                  Unregister from Event?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-2">
                  Are you sure you want to unregister from:
                </p>
                <p className="font-semibold text-slate-800 dark:text-slate-200 mb-6">
                  "{selectedEvent.title}"
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowUnregisterModal(false)}
                    className="flex-1 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 py-2 px-4 rounded-xl font-medium transition-colors hover:bg-slate-200 dark:hover:bg-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmUnregister}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-xl font-medium transition-colors"
                  >
                    Unregister
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterEvent;
