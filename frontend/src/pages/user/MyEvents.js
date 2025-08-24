import React, { useState, useEffect, useRef } from "react";
import { Calendar, Download, MapPin } from "lucide-react";
import { useSelector } from "react-redux";
import SummaryApi from "../../common";
import CertificateDownload from "../../components/user/CirtificateDownload";

const MyEvents = () => {
  const [myEvents, setMyEvents] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const sectionRef = useRef(null);
  const user = useSelector((state) => state?.user?.user);

  // Fetch registered events
  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      if (!user?._id) return;
      try {
        const res = await fetch(SummaryApi.getRegistrationsByStudent.url, {
          method: SummaryApi.getRegistrationsByStudent.method,
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studentId: user._id }),
        });

        const result = await res.json();
        if (!res.ok || !result.success)
          throw new Error(result.message || "Failed to get registered events");

        const events = result.data
          .map((registration) => ({
            id: registration.event._id,
            title: registration.event.title,
            eventStatus: registration.event.status,
            date: registration.event.date,
            location: registration.event.location,
            club: registration.event.club,
            certificateDownloaded: false,
          }))
          .filter((event) => event.eventStatus === "completed");

        setMyEvents(events);
      } catch (error) {
        console.error("Error fetching registered events:", error);
        alert("Failed to get registered events.");
      }
    };

    fetchRegisteredEvents();
  }, [user]);

  // Intersection observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const filteredEvents = myEvents.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 py-20 px-4">
      <div className="max-w-5xl mx-auto" ref={sectionRef}>
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-700 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
            My Completed Events
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            View all events you registered for and completed.
          </p>
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 transition-all duration-1000 transform">
          <input
            type="text"
            placeholder="Search by event title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <div
                key={event.id}
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 dark:border-slate-600/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Event Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">
                      {event.title}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> {event.location}
                      </div>
                    </div>

                    <div className="mt-2 text-sm">
                      <span className="text-green-600 dark:text-green-400 font-medium">
                        {event.club}
                      </span>
                    </div>
                  </div>

                  {/* Certificate Action */}
                  <div className="flex-shrink-0">
                    <button
                      onClick={() =>
                        setSelectedEvent({
                          userName: user.name,
                          eventTitle: event.title,
                        })
                      }
                      className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:shadow-lg flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" /> Download Certificate
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20">
              <Calendar className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                No Completed Events
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                You have not attended any completed events yet.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Certificate Preview Popup */}
      {selectedEvent && (
        <CertificateDownload
          userName={selectedEvent.userName}
          eventTitle={selectedEvent.eventTitle}
          onClose={() => {
            setSelectedEvent(null);
            setMyEvents((prev) =>
              prev.map((e) =>
                e.title === selectedEvent.eventTitle
                  ? { ...e, certificateDownloaded: true }
                  : e
              )
            );
          }}
        />
      )}
    </div>
  );
};

export default MyEvents;
