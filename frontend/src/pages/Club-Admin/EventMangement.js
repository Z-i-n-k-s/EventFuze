import React, { useCallback, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import CreateEvent from "../../components/subAdmin/CreateEvent";
import EditDetails from "../../components/subAdmin/EditDetails";
import {
  getEventStatus,
  getStatusBadgeConfig,
} from "../../helpers/eventStatusHelper";

import SummaryApi from "../../common";
import { useSelector } from "react-redux";

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const user = useSelector((state) => state?.user?.user);
  const ClubId = user?.clubs?.find((c) => c.role === "President")?.clubId;

  // Fetch events from backend
  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(SummaryApi.getEventsByClub.url, {
        method: SummaryApi.getEventsByClub.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clubId: ClubId }),
      });

      const data = await response.json();

      if (response.ok) {
        setEvents(data.data);
      } else {
        toast.error(data.message || "Failed to fetch events");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to fetch events from server");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [creatingEvent, setCreatingEvent] = useState(false);

  // Filter events based on status and search term
  const filteredEvents = events.filter((event) => {
    const autoStatus = getEventStatus(event);
    const matchesFilter = filter === "all" || autoStatus === filter;
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDeleteEvent = async (id) => {
    try {
      const response = await fetch(SummaryApi.deleteEvent.url, {
        method: SummaryApi.deleteEvent.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" }, // <-- important
        body: JSON.stringify({ eventId: id }),
      });

      const data = await response.json(); // parse the JSON

      if (response.ok) {
        setEvents(events.filter((event) => event._id !== id));
        setDeleteConfirm(null);
        toast.success("Event deleted successfully!");
      } else {
        toast.error(data.message || "Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event");
    }
  };

  // Function to toggle certificate provision
  const toggleCertificate = (id) => {
    setEvents(
      events.map((event) =>
        event._id === id
          ? { ...event, provideCertificate: !event.provideCertificate }
          : event
      )
    );
  };

  // Function to get status badge color
  const getStatusColor = (event) => {
    const status = getEventStatus(event);
    const config = getStatusBadgeConfig(status);
    return config.color;
  };

  //Handle saving create event
  const handleCreateEvent = (newEvent) => {
    setEvents((prevEvents) => [
      ...prevEvents,
      { ...newEvent, id: prevEvents.length + 1 }, // auto-generate id
    ]);
    setCreatingEvent(false);
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
      {/* Filter buttons + Create button */}
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between mb-6 gap-2">
        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2">
          {["all", "upcoming", "ongoing", "completed"].map((status) => (
            <button
              key={status}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === status
                  ? "bg-green-700 text-white"
                  : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
              }`}
              onClick={() => setFilter(status)}
            >
              {status === "all"
                ? "All Events"
                : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Create New Event Button */}
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center"
          onClick={() => setCreatingEvent(true)} // ✅ open modal
        >
          <FaPlus className="mr-2" /> Create New Event
        </button>
      </div>

      {/* Events Grid */}
      {loading ? (
        <div className="col-span-full text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading events...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div
                key={event._id}
                className="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-slate-700 transition-transform hover:-translate-y-1"
              >
                <div className="p-4 bg-gray-50 dark:bg-slate-700 flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {event.title}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      event
                    )}`}
                  >
                    {getEventStatus(event)}
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
                    <div className="text-gray-500 dark:text-gray-400">
                      No Image Available
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {event.description}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex">
                      <span className="font-medium text-gray-700 dark:text-gray-300 w-32">
                        Category:
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {event.category}
                      </span>
                    </div>

                    <div className="flex">
                      <span className="font-medium text-gray-700 dark:text-gray-300 w-32">
                        Date & Time:
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {event.date} | {event.startTime} - {event.endTime}
                      </span>
                    </div>

                    <div className="flex">
                      <span className="font-medium text-gray-700 dark:text-gray-300 w-32">
                        Location:
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {event.location}
                      </span>
                    </div>

                    <div className="flex">
                      <span className="font-medium text-gray-700 dark:text-gray-300 w-32">
                        Participants:
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {event.registeredStudents.length} /{" "}
                        {event.maxParticipants}
                      </span>
                    </div>

                    <div className="flex">
                      <span className="font-medium text-gray-700 dark:text-gray-300 w-32">
                        Fee:
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {event.isFree
                          ? "Free"
                          : `${event.registrationFee} ${event.currency}`}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <span className="font-medium text-gray-700 dark:text-gray-300 w-32">
                        Certificate:
                      </span>
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
                      <span className="font-medium text-gray-700 dark:text-gray-300 w-32">
                        Clubs:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {event.clubsId.map((clubId) => (
                          <span
                            key={clubId}
                            className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs rounded"
                          >
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
              <p className="text-gray-500 dark:text-gray-400">
                No events found matching your criteria.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete the event "{deleteConfirm.title}"?
              This action cannot be undone.
            </p>
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
          onSave={fetchEvents}
        />
      )}
      {creatingEvent && (
        <CreateEvent
          onSave={handleCreateEvent}
          onClose={() => setCreatingEvent(false)}
        />
      )}
    </div>
  );
};

export default EventManagement;
