import {
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  XCircle
} from "lucide-react";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cards from "../../components/admin/eventmanagement/Cards";
import EventList from "../../components/admin/eventmanagement/EventList";
import EventSearch from "../../components/admin/eventmanagement/EventSearch";
import { getEventStatus, getStatusBadgeConfig } from "../../helpers/eventStatusHelper";
import SummaryApi from "../../common";

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch events from backend
  const fetchEvents = useCallback(async () => {
  try {
    setLoading(true);
    
    const response = await fetch(SummaryApi.getAllEvents.url, {
      method: SummaryApi.getAllEvents.method,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }, // r
    });

    const data = await response.json(); // 

    if (response.ok) {
      setEvents(data.data);
    } else {
      toast.error(data.message || 'Failed to fetch events');
    }
  } catch (error) {
    console.error('Error fetching events:', error);
    toast.error('Failed to fetch events from server');
  } finally {
    setLoading(false);
  }
}, []);


  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const clubs = [
    { value: "tech-club", label: "Tech Club", color: "bg-blue-500" },
    { value: "business-club", label: "Business Club", color: "bg-green-500" },
    { value: "arts-club", label: "Arts & Culture Club", color: "bg-purple-500" },
    { value: "sports-club", label: "Sports Club", color: "bg-orange-500" },
    { value: "science-club", label: "Science Club", color: "bg-red-500" },
    { value: "literature-club", label: "Literature Club", color: "bg-indigo-500" },
    { value: "music-club", label: "Music Club", color: "bg-pink-500" },
    { value: "photography-club", label: "Photography Club", color: "bg-teal-500" },
    { value: "debate-club", label: "Debate Club", color: "bg-yellow-500" },
    { value: "environmental-club", label: "Environmental Club", color: "bg-emerald-500" }
  ];






 

  const handleEdit = useCallback((event) => {
    setEditingEvent(event);
    setShowCreateForm(true);
  }, []);

  const handleDelete = useCallback(async (eventId) => {
  if (window.confirm("Are you sure you want to delete this event?")) {
    try {
      const response = await fetch(SummaryApi.deleteEvent.url, {
        method: SummaryApi.deleteEvent.method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ eventId }), 
      });

      const data = await response.json(); 

      if (response.ok) {
        setEvents(prev => prev.filter((event) => event._id !== eventId));
        toast.success("Event deleted successfully!");
      } else {
        toast.error(data.message || 'Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
    }
  }
}, []);




  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filtering using automatic status
    const autoStatus = getEventStatus(event);
    const matchesStatus = filterStatus === "all" || autoStatus === filterStatus;
    
    // Date filtering
    let matchesDate = true;
    if (startDate && endDate) {
      const eventDate = new Date(event.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      matchesDate = eventDate >= start && eventDate <= end;
    } else if (startDate) {
      const eventDate = new Date(event.date);
      const start = new Date(startDate);
      matchesDate = eventDate >= start;
    } else if (endDate) {
      const eventDate = new Date(event.date);
      const end = new Date(endDate);
      matchesDate = eventDate <= end;
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusIcon = (event) => {
    const status = getEventStatus(event);
    switch (status) {
      case "upcoming":
        return <Clock className="w-4 h-4" />;
      case "ongoing":
        return <TrendingUp className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category) => {
    // Generate a consistent color based on category string
    const colors = [
      "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500", 
      "bg-red-500", "bg-indigo-500", "bg-pink-500", "bg-teal-500", 
      "bg-yellow-500", "bg-emerald-500"
    ];
    const index = category ? category.length % colors.length : 0;
    return colors[index];
  };

  const getStatusColor = (event) => {
    const status = getEventStatus(event);
    const config = getStatusBadgeConfig(status);
    return config.color;
  };

  const totalEvents = events.length;
  const upcomingEvents = events.filter((e) => getEventStatus(e) === "upcoming").length;
  const totalRegistrations = events.reduce(
    (sum, event) => sum + (event.registeredStudents ? event.registeredStudents.length : 0),
    0
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-green-700">
              Event Management
            </h1>
            <p className=" mt-1">
              Manage and organize all your events
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <Cards
          totalEvents={totalEvents}
          upcomingEvents={upcomingEvents}
          totalRegistrations={totalRegistrations}
          events={events}
        />

        {/* Search and Filters */}
        <EventSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          statusOptions={[
            { value: "upcoming", label: "Upcoming" },
            { value: "ongoing", label: "Ongoing" },
            { value: "completed", label: "Completed" },
            { value: "cancelled", label: "Cancelled" }
          ]}
        />

        

        {/* Events List */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm border p-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading events...</p>
            </div>
          </div>
        ) : (
          <EventList
            filteredEvents={filteredEvents}
            getStatusIcon={getStatusIcon}
            getStatusColor={getStatusColor}
            getCategoryColor={getCategoryColor}
            clubs={clubs}
            moment={moment}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default EventManagement;