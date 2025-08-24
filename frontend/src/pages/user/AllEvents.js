import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Calendar,
  Users,
  MapPin,
  Clock,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";
import ViewDetails from "../../components/user/ViewDetails"; // Modal component
import SummaryApi from "../../common";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClub, setSelectedClub] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [error, setError] = useState(null);
  const eventsPerPage = 8;

  const clubs = [
    "Photography",
    "Cultural",
    "Innovation & Design",
    "Programming",
    "Islamic",
    "Robotics",
  ];

  const fetchAllEvent = async () => {
    setShowLoader(true);
    setError(null);
    try {
      const res = await fetch(SummaryApi.getAllEvents.url, {
        method: SummaryApi.getAllEvents.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      
      if (data.success && Array.isArray(data.data)) {
        // Map API data to the format used in the component
        const mappedEvents = data.data.map((event) => ({
          id: event._id,
          title: event.title || 'Untitled Event',
          description: event.description || 'No description available',
          category: event.category || 'General',
          date: event.date,
          time: `${event.startTime || 'TBD'} - ${event.endTime || 'TBD'}`,
          location: event.location || 'Location TBD',
          attendees: event.registeredStudents ? event.registeredStudents.length : 0,
          club: event.clubsId && Array.isArray(event.clubsId) && event.clubsId.length > 0
            ? clubs.find((club) => event.clubsId.includes(club)) || "Unknown Club"
            : "Unknown Club",
          image: (event.images && event.images.length > 0) ? event.images[0] : "/api/placeholder/400/300",
        }));
        setEvents(mappedEvents);
      } else {
        throw new Error(data.message || 'Failed to fetch events');
      }
    } catch (err) {
      console.error("Failed to fetch all events.", err);
      setError(err.message || 'Failed to fetch events');
      setEvents([]); // Set empty array on error to prevent infinite loops
    } finally {
      setShowLoader(false);
    }
  };

  useEffect(() => {
    fetchAllEvent();
  }, []); 

  // Dynamically get categories from events data
  const categories = useMemo(() => {
    if (!events || events.length === 0) return [];
    return [...new Set(events.map((event) => event.category).filter(Boolean))];
  }, [events]);

  const filteredEvents = useMemo(() => {
    if (!events || events.length === 0) return [];
    
    return events.filter((event) => {
      if (!event) return false;
      
      const matchesSearch = !searchTerm || 
        (event.title && event.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (event.club && event.club.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (event.location && event.location.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesClub = !selectedClub || event.club === selectedClub;
      const matchesCategory = !selectedCategory || event.category === selectedCategory;

      let matchesDate = true;
      if (selectedDateRange && event.date) {
        try {
          const eventDate = new Date(event.date);
          if (isNaN(eventDate.getTime())) return false;
          
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
          const nextMonth = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
          
          switch (selectedDateRange) {
            case "today":
              const todayEnd = new Date(today);
              todayEnd.setHours(23, 59, 59, 999);
              matchesDate = eventDate >= today && eventDate <= todayEnd;
              break;
            case "week":
              matchesDate = eventDate >= today && eventDate <= nextWeek;
              break;
            case "month":
              matchesDate = eventDate >= today && eventDate <= nextMonth;
              break;
            default:
              matchesDate = true;
          }
        } catch (error) {
          matchesDate = false;
        }
      }

      return matchesSearch && matchesClub && matchesCategory && matchesDate;
    });
  }, [events, searchTerm, selectedClub, selectedCategory, selectedDateRange]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedClub, selectedCategory, selectedDateRange]);

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const currentEvents = filteredEvents.slice(
    startIndex,
    startIndex + eventsPerPage
  );

  const formatDate = (dateString) => {
    if (!dateString) return 'Date TBD';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid Date';
      }
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedClub("");
    setSelectedCategory("");
    setSelectedDateRange("");
    setCurrentPage(1);
  };

  if (showLoader) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
            Error Loading Events
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={fetchAllEvent}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent mb-4">
            All Events
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Discover amazing events happening around campus
          </p>
        </div>

        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300" />
              <input
                type="text"
                placeholder="Search events, clubs, locations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Club Filter */}
            <div className="relative">
              <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300" />
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all appearance-none bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                value={selectedClub}
                onChange={(e) => setSelectedClub(e.target.value)}
              >
                <option value="">All Clubs</option>
                {clubs.map((club) => (
                  <option key={club} value={club}>
                    {club}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300" />
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all appearance-none bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range Filter */}
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300" />
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all appearance-none bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
              >
                <option value="">All Dates</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>

          {(searchTerm ||
            selectedClub ||
            selectedCategory ||
            selectedDateRange) && (
            <div className="mt-4 flex justify-between items-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Showing {filteredEvents.length} of {events.length} events
              </p>
              <button
                onClick={clearFilters}
                className="text-sm text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {currentEvents.map((event, index) => (
            <div
              key={event.id}
              className="bg-white dark:bg-slate-800 hover:bg-green-50 dark:hover:bg-slate-700 rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = "/api/placeholder/400/300";
                  }}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {event.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-100 line-clamp-2">
                  {event.title}
                </h3>

                <div className="space-y-2 mb-4 text-gray-600 dark:text-gray-300 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                    <span className="truncate">{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                    <span className="truncate">{event.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                    <span className="truncate">{event.club} • {event.attendees} attending</span>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>

                <button
                  onClick={() => setSelectedEvent(event)}
                  className="w-full bg-green-500 text-black hover:text-white py-2 px-4 rounded-lg hover:bg-green-900 transition-all duration-300 flex items-center justify-center group"
                >
                  <Eye className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mb-8">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center px-4 py-2 rounded-lg bg-white dark:bg-slate-800 shadow hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 dark:text-gray-200"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </button>
            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg transition-all ${
                      currentPage === page
                        ? "bg-green-500 text-white shadow-lg"
                        : "bg-white dark:bg-slate-800 hover:bg-green-50 dark:hover:bg-slate-700 shadow hover:shadow-md text-gray-800 dark:text-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="flex items-center px-4 py-2 rounded-lg bg-white dark:bg-slate-800 shadow hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 dark:text-gray-200"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        )}

        {/* No Events Found */}
        {currentEvents.length === 0 && !showLoader && !error && (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">
              🎉
            </div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              No events found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedEvent && (
        <ViewDetails
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default AllEvents;