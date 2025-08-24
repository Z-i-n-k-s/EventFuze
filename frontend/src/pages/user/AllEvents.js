import React, { useState, useEffect, useCallback, useMemo } from "react";
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
  Filter,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import ViewDetails from "../../components/user/ViewDetails";
import SummaryApi from "../../common";
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
  const [showFilters, setShowFilters] = useState(false);

  const eventsPerPage = 12;
  const placeholderImage =
    "https://via.placeholder.com/400x300?text=Event+Image";

  /** Utility to format event data */
  const formatEvents = (data, clubsData = []) =>
    data.map((event) => {
      // Find the club name by matching clubsId with club _id
      const getClubName = () => {
        if (Array.isArray(event.clubsId) && event.clubsId.length > 0) {
          const clubId = event.clubsId[0];
          const foundClub = clubsData.find((club) => club._id === clubId);
          return foundClub?.name || "Unknown Club";
        }
        return "Unknown Club";
      };

      return {
        id: event._id,
        title: event.title || "Untitled Event",
        description: event.description || "No description available",
        category: event.category || "Uncategorized",
        date: event.date,
        startTime: event.startTime || "TBD",
        endTime: event.endTime || "TBD",
        location: event.location || "Location TBD",
        maxParticipants: event.maxParticipants || 0,
        attendees: event.registeredStudents?.length || 0,
        club: getClubName(),
        clubId:
          Array.isArray(event.clubsId) && event.clubsId.length > 0
            ? event.clubsId[0]
            : null,
        image: event.images?.[0] || placeholderImage,
        status: event.status || "unknown",
        isFree: event.isFree ?? true,
        registrationFee: event.registrationFee || 0,
        currency: event.currency || "N/A",
        registrationStart: event.registrationStart || null,
        registrationDeadline: event.registrationDeadline || null,
      };
    });

  /** Fetch events */
  const fetchAllEvent = useCallback(async (clubsData = []) => {
    try {
      setShowLoader(true);
      setError(null);
      const res = await fetch(SummaryApi.getAllEvents.url, {
        method: SummaryApi.getAllEvents.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setEvents(formatEvents(data.data, clubsData));
      } else throw new Error(data.message || "Failed to fetch events");
    } catch (err) {
      console.error("Failed to fetch all events:", err);
      setError(err.message);
      setEvents([]);
    } finally {
      setShowLoader(false);
    }
  }, []);

  /** Fetch clubs */
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
        // Store both the full club data and just names for the select dropdown
        const clubsData = data.data;
        setClubs(clubsData.map((club) => club.name || club));
        return clubsData; // Return the full club data for use in formatEvents
      }
      return [];
    } catch (err) {
      console.error("Error fetching clubs:", err);
      return [];
    }
  }, []);

  /** Initial data fetch */
  useEffect(() => {
    const fetchData = async () => {
      try {
        // First fetch clubs to get the full club data
        const clubsData = await fetchAllClubs();
        // Then fetch events and pass the clubs data for proper mapping
        await fetchAllEvent(clubsData);
      } catch (error) {
        console.error("Error during initial data fetch:", error);
      }
    };

    fetchData();
  }, [fetchAllEvent, fetchAllClubs]);

  /** Format date utility */
  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Invalid Date"
      : date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        });
  };

  /** Filtered and paginated events */
  const filteredEvents = useMemo(() => {
    const today = new Date();
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.club.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesClub = selectedClub ? event.club === selectedClub : true;
      let matchesDate = true;

      if (selectedDateRange === "today") {
        matchesDate = eventDate.toDateString() === today.toDateString();
      } else if (selectedDateRange === "week") {
        const weekFromNow = new Date(today);
        weekFromNow.setDate(today.getDate() + 7);
        matchesDate = eventDate >= today && eventDate <= weekFromNow;
      } else if (selectedDateRange === "month") {
        const monthFromNow = new Date(today);
        monthFromNow.setMonth(today.getMonth() + 1);
        matchesDate = eventDate >= today && eventDate <= monthFromNow;
      }

      return matchesSearch && matchesClub && matchesDate;
    });
  }, [events, searchTerm, selectedClub, selectedDateRange]);

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const currentEvents = useMemo(() => {
    const start = (currentPage - 1) * eventsPerPage;
    return filteredEvents.slice(start, start + eventsPerPage);
  }, [filteredEvents, currentPage, eventsPerPage]);

  /** Reset filters and pagination */
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedClub("");
    setSelectedDateRange("");
    setCurrentPage(1);
  };

  /** Reset to page 1 when filters change */
  useEffect(
    () => setCurrentPage(1),
    [searchTerm, selectedClub, selectedDateRange]
  );

  /** Get status color */
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "upcoming":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "ongoing":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "completed":
        return "bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-400";
    }
  };

  /** Loader */
  if (showLoader) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-green-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading events...</p>
        </div>
      </div>
    );
  }

  /** Error state */
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-50 to-orange-50 dark:from-slate-900 dark:to-red-900/10">
        <div className="text-center max-w-md">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Something went wrong
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            {error}
          </p>
          <button
            onClick={async () => {
              const clubsData = await fetchAllClubs();
              await fetchAllEvent(clubsData);
            }}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transform transition-all hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Parallax Header */}
      <div
        className="relative h-[60vh] flex items-center justify-center bg-fixed bg-center bg-cover"
        style={{ backgroundImage: `url(${image1})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        <motion.div
          className="relative z-10 text-center max-w-4xl mx-auto px-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            All Events
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
            Discover amazing events happening around campus and join the
            community
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl p-6 mb-8 shadow-xl border border-white/20">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events, clubs, or locations..."
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 dark:text-gray-200 placeholder-gray-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Toggle for Mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-semibold shadow-lg"
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>

            {/* Desktop Filters */}
            <div className="hidden lg:flex gap-4">
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  className="pl-10 pr-8 py-3 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-800 dark:text-gray-200 min-w-[140px]"
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

              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  className="pl-10 pr-8 py-3 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-800 dark:text-gray-200 min-w-[140px]"
                  value={selectedDateRange}
                  onChange={(e) => setSelectedDateRange(e.target.value)}
                >
                  <option value="">All Dates</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>

              {(searchTerm || selectedClub || selectedDateRange) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-slate-600 dark:hover:bg-slate-500 text-gray-700 dark:text-gray-300 rounded-xl flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden mt-4 pt-4 border-t border-gray-200 dark:border-slate-600 flex flex-col gap-4">
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-800 dark:text-gray-200"
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

              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-800 dark:text-gray-200"
                  value={selectedDateRange}
                  onChange={(e) => setSelectedDateRange(e.target.value)}
                >
                  <option value="">All Dates</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>

              {(searchTerm || selectedClub || selectedDateRange) && (
                <button
                  onClick={clearFilters}
                  className="w-full py-3 bg-gray-100 hover:bg-gray-200 dark:bg-slate-600 dark:hover:bg-slate-500 text-gray-700 dark:text-gray-300 rounded-xl flex items-center justify-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Clear All Filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Found{" "}
            <span className="font-semibold text-green-600">
              {filteredEvents.length}
            </span>{" "}
            events
          </p>
        </div>

        {/* Event Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {currentEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-slate-700"
            >
              <div className="relative overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => (e.target.src = placeholderImage)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      event.status
                    )}`}
                  >
                    {event.status}
                  </span>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      event.isFree
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}
                  >
                    {event.isFree
                      ? "Free"
                      : `${event.registrationFee} ${event.currency}`}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-bold text-xl mb-3 text-gray-800 dark:text-gray-100 line-clamp-2 group-hover:text-green-600 transition-colors">
                  {event.title}
                </h3>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                    <Calendar className="h-4 w-4 mr-3 text-green-500 flex-shrink-0" />
                    <span className="font-medium">
                      {formatDate(event.date)}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                    <Clock className="h-4 w-4 mr-3 text-green-500 flex-shrink-0" />
                    <span>
                      {event.startTime} - {event.endTime}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                    <MapPin className="h-4 w-4 mr-3 text-green-500 flex-shrink-0" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>

                  <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                    <Users className="h-4 w-4 mr-3 text-green-500 flex-shrink-0" />
                    <span className="line-clamp-1">{event.club}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {event.attendees}/{event.maxParticipants} attending
                  </span>
                  <span className="text-xs bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
                    {event.category}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 line-clamp-2">
                  {event.description}
                </p>

                <button
                  onClick={() => setSelectedEvent(event)}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-semibold shadow-lg transform transition-all hover:scale-105"
                >
                  <Eye className="h-4 w-4" />
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mb-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>

            <div className="flex gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-xl font-semibold transition-all ${
                      currentPage === pageNum
                        ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                        : "bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 shadow"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* No events found */}
        {currentEvents.length === 0 && !showLoader && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-3xl p-12 max-w-md mx-auto">
              <PartyPopper className="h-20 w-20 text-yellow-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">
                No events found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                We couldn't find any events matching your criteria. Try
                adjusting your filters or check back later.
              </p>
              <button
                onClick={clearFilters}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transform transition-all hover:scale-105"
              >
                Clear All Filters
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <ViewDetails
          event={selectedEvent}
          
          onClose={() => {
            setSelectedEvent(null); // close modal
            fetchAllEvent(); // refresh events
          }}
        />
      )}
    </div>
  );
};

export default AllEvents;
