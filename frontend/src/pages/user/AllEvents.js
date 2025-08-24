import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Calendar,
  Users,
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
  Eye,
  Loader2,
  AlertCircle,
  PartyPopper,
} from "lucide-react";
import ViewDetails from "../../components/user/ViewDetails";
import SummaryApi from "../../common";
import { motion } from "framer-motion";
import image1 from "../../assest/par.jpg";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClub, setSelectedClub] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [error, setError] = useState(null);
  const eventsPerPage = 8;

  // Fetch events
  const fetchAllEvent = useCallback(async () => {
    setShowLoader(true);
    setError(null);
    try {
      const res = await fetch(SummaryApi.getAllEvents.url, {
        method: SummaryApi.getAllEvents.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();

      if (data.success && Array.isArray(data.data)) {
        const mappedEvents = data.data.map((event) => ({
          id: event._id,
          title: event.title || "Untitled Event",
          description: event.description || "No description available",
          date: event.date,
          time: `${event.startTime || "TBD"} - ${event.endTime || "TBD"}`,
          location: event.location || "Location TBD",
          attendees: event.registeredStudents
            ? event.registeredStudents.length
            : 0,
          club:
            event.clubsId &&
            Array.isArray(event.clubsId) &&
            event.clubsId.length > 0
              ? event.clubsId[0]
              : "Unknown Club",
          image:
            event.images && event.images.length > 0
              ? event.images[0]
              : "/api/placeholder/400/300",
        }));
        setEvents(mappedEvents);
      } else {
        throw new Error(data.message || "Failed to fetch events");
      }
    } catch (err) {
      console.error("Failed to fetch all events.", err);
      setError(err.message || "Failed to fetch events");
      setEvents([]);
    } finally {
      setShowLoader(false);
    }
  }, []);

  // Fetch clubs
  const fetchAllClubs = useCallback(async () => {
    try {
      const res = await fetch(SummaryApi.getAllClubs.url, {
        method: SummaryApi.getAllClubs.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setClubs(data.data.map((club) => club.name || club));
      }
    } catch (err) {
      console.error("Error fetching clubs:", err);
    }
  }, []);

  useEffect(() => {
    fetchAllEvent();
    fetchAllClubs();
  }, [fetchAllEvent, fetchAllClubs]);

  // Filtering
  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.club.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesClub = selectedClub ? event.club === selectedClub : true;

    let matchesDate = true;
    const today = new Date();
    if (selectedDateRange === "today") {
      matchesDate = eventDate.toDateString() === today.toDateString();
    } else if (selectedDateRange === "week") {
      const weekFromNow = new Date();
      weekFromNow.setDate(today.getDate() + 7);
      matchesDate = eventDate >= today && eventDate <= weekFromNow;
    } else if (selectedDateRange === "month") {
      const monthFromNow = new Date();
      monthFromNow.setMonth(today.getMonth() + 1);
      matchesDate = eventDate >= today && eventDate <= monthFromNow;
    }

    return matchesSearch && matchesClub && matchesDate;
  });

  useEffect(
    () => setCurrentPage(1),
    [searchTerm, selectedClub, selectedDateRange]
  );

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const currentEvents = filteredEvents.slice(
    startIndex,
    startIndex + eventsPerPage
  );

  const formatDate = (dateString) => {
    if (!dateString) return "Date TBD";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid Date";
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Invalid Date";
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedClub("");
    setSelectedDateRange("");
  };

  if (showLoader)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <Loader2 className="animate-spin h-12 w-12 text-green-500" />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-slate-900">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Error Loading Events
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <button
            onClick={fetchAllEvent}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-green-100 text-white dark:bg-slate-900">
     

{/* ✅ Parallax Header with Animation */}
<div
  className="relative h-[50vh] flex items-center justify-center bg-fixed bg-center bg-cover"
  style={{ backgroundImage: `url(${image1})` }}
>
  {/* Darker overlay for better text contrast */}
  <div className="absolute inset-0 bg-black/80" />

  <motion.div
    className="relative z-10 text-center"
    initial={{ rotateX: -90, opacity: 0 }}
    animate={{ rotateX: 0, opacity: 1 }}
    transition={{ duration: 1, ease: "easeOut" }}
  >
    <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-2xl text-green-500">
      All Events
    </h1>
    <motion.p
      className="text-lg md:text-xl drop-shadow-lg"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
    >
      Discover amazing events happening around campus
    </motion.p>
  </motion.div>
</div>

      <div className="max-w-7xl mx-auto p-4">
        {/* Filters */}
        <div className="mt-8 mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300" />
            <input
              type="text"
              placeholder="Search events, clubs, locations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Club filter */}
          <div className="relative">
            <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300" />
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
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

          {/* Date filter */}
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300" />
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
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

        {/* Event Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {currentEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-all duration-300"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/400x300?text=Event+Image")
                }
              />
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-100">
                  {event.title}
                </h3>
                <div className="space-y-2 mb-4 text-gray-600 dark:text-gray-300 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-green-500" />
                    {formatDate(event.date)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-green-500" />
                    {event.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-green-500" />
                    {event.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-green-500" />
                    {event.club} • {event.attendees} attending
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {event.description}
                </p>
                <button
                  onClick={() => setSelectedEvent(event)}
                  className="w-full bg-green-500 text-black hover:text-white py-2 px-4 rounded-lg flex items-center justify-center"
                >
                  <Eye className="h-4 w-4 mr-2" /> View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mb-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white dark:bg-slate-800 rounded-lg shadow disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>
            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg ${
                      currentPage === page
                        ? "bg-green-500 text-white"
                        : "bg-white dark:bg-slate-800"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white dark:bg-slate-800 rounded-lg shadow disabled:opacity-50"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* No events */}
        {currentEvents.length === 0 && (
          <div className="text-center py-12">
            <PartyPopper className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              No events found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={clearFilters}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <ViewDetails event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
};

export default AllEvents;
