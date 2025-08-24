import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
  Trash2,
  XCircle,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getEventStatus, getStatusBadgeConfig } from "../../helpers/eventStatusHelper";
import SummaryApi from "../../common"; // Your API helper

const RegisterEvent = () => {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [showUnregisterModal, setShowUnregisterModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(false);

  const sectionRef = useRef(null);
  const user = useSelector((state) => state?.user?.user);

  // Intersection Observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => sectionRef.current && observer.unobserve(sectionRef.current);
  }, []);

  // Fetch registered events
  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      if (!user?._id) return;
      setLoading(true);
      try {
        const res = await fetch(SummaryApi.getRegistrationsByStudent.url, {
          method: SummaryApi.getRegistrationsByStudent.method,
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studentId: user._id }),
        });

        const result = await res.json();
        if (!res.ok || !result.success) throw new Error(result.message || "Failed to get registered events");

        const events = result.data.map((registration) => ({
          id: registration.event._id,
          title: registration.event.title,
          description: registration.event.description,
          date: registration.event.date,
          time: registration.event.startTime,
          location: registration.event.location,
          club: registration.event.clubsId?.[0] || "",
          registeredAt: registration.registeredAt,
          registrationStatus: registration.status, // use registration status
          eventStatus: registration.event.status,  // optional
        }));

        setRegisteredEvents(events);
      } catch (error) {
        console.error("Error fetching registered events:", error);
        alert("Failed to get registered events.");
      } finally {
        setLoading(false);
      }
    };

    fetchRegisteredEvents();
  }, [user]);

  // Helper for status badge
  const getStatusBadge = (event) => {
    const status = event.registrationStatus || getEventStatus(event); // use registrationStatus if exists
    const config = getStatusBadgeConfig(status);
    const iconMap = {
      Clock: <Clock className="w-3 h-3" />,
      TrendingUp: <CheckCircle className="w-3 h-3" />,
      CheckCircle: <CheckCircle className="w-3 h-3" />,
      XCircle: <XCircle className="w-3 h-3" />,
    };
    return {
      color: config.color,
      icon: iconMap[config.icon] || <AlertCircle className="w-3 h-3" />,
      label: config.label,
      status,
    };
  };

  const handleUnregister = (event) => {
    setSelectedEvent(event);
    setShowUnregisterModal(true);
  };

  // Unregister API call
  const confirmUnregister = async () => {
    if (!selectedEvent) return;
    setLoading(true);
    try {
      const res = await fetch(SummaryApi.cancelRegistration.url, {
        method: SummaryApi.cancelRegistration.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: user._id, eventId: selectedEvent.id }),
      });

      const result = await res.json();
      if (!res.ok || !result.success) throw new Error(result.message || "Failed to unregister event");

      setRegisteredEvents((prev) => prev.filter((e) => e.id !== selectedEvent.id));
      setShowUnregisterModal(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error("Error unregistering event:", error);
      alert("Failed to unregister event.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    if (dateString === "Every Friday") return dateString;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  const filteredEvents = registeredEvents.filter((event) => {
    const status = event.registrationStatus || getEventStatus(event);
    return event.title.toLowerCase().includes(searchQuery.toLowerCase()) && (filterStatus === "all" || status === filterStatus);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 py-20 px-4">
      <div className="max-w-4xl mx-auto" ref={sectionRef}>
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-700 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
            My Registered Events
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Manage your registered events and stay updated on your activities
          </p>
        </div>

        {/* Search & Filter */}
        <div className={`flex flex-col sm:flex-row gap-4 mb-8 transition-all duration-1000 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
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
            <option value="registered">Registered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Events List */}
        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-20">
            <Calendar className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
              No Registered Events
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              No events match your search or filter criteria.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEvents.map((event, index) => {
              const statusConfig = getStatusBadge(event);
              return (
                <div
                  key={event.id}
                  className={`bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 dark:border-slate-600/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{event.title}</h3>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color} w-fit`}>
                          {statusConfig.icon} {statusConfig.label}
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
                        <span className="text-slate-500 dark:text-slate-400"> • Registered: {formatDate(event.registeredAt)}</span>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      {statusConfig.status === "registered" ? (
                        <button
                          onClick={() => handleUnregister(event)}
                          className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:shadow-lg flex items-center gap-2 transform hover:scale-105"
                        >
                          <Trash2 className="w-4 h-4" /> Unregister
                        </button>
                      ) : (
                        <div className="bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-4 py-2 rounded-xl font-medium cursor-not-allowed">
                          {statusConfig.status === "cancelled"
                            ? "Cancelled"
                            : statusConfig.status === "completed"
                            ? "Completed"
                            : "Unavailable"}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
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
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Unregister from Event?</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-2">Are you sure you want to unregister from:</p>
                <p className="font-semibold text-slate-800 dark:text-slate-200 mb-6">"{selectedEvent.title}"</p>
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
