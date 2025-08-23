import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Plus,
  TrendingUp,
  XCircle,
} from "lucide-react";
import moment from "moment";
import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Cards from "../../components/admin/eventmanagement/Cards";
import DialogueBox from "../../components/admin/eventmanagement/DialogueBox";
import EventList from "../../components/admin/eventmanagement/EventList";
import EventSearch from "../../components/admin/eventmanagement/EventSearch";

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Sample data for demonstration
  useEffect(() => {
    const sampleEvents = [
      {
        id: 1,
        title: "Annual Tech Conference 2024",
        description:
          "Join us for the biggest tech event of the year featuring keynote speakers, workshops, and networking opportunities.",
        date: "2024-03-15",
        startTime: "09:00",
        endTime: "17:00",
        location: "Convention Center, Downtown",
        category: "Technology Conference",
        capacity: 500,
        registered: 342,
        price: 299,
        clubId: "tech-club",
        contactEmail: "info@techevents.com",
        contactPhone: "+1 (555) 123-4567",
        imageUrl:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
        status: "upcoming",
        createdAt: "2024-01-15",
      },
      {
        id: 2,
        title: "Startup Networking Mixer",
        description:
          "Connect with fellow entrepreneurs, investors, and industry experts in a relaxed networking environment.",
        date: "2024-02-28",
        startTime: "18:00",
        endTime: "21:00",
        location: "Innovation Hub, Tech District",
        category: "Networking Event",
        capacity: 100,
        registered: 87,
        price: 0,
        clubId: "business-club",
        contactEmail: "hello@startupcommunity.org",
        contactPhone: "+1 (555) 987-6543",
        imageUrl:
          "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400",
        status: "upcoming",
        createdAt: "2024-01-10",
      },
      {
        id: 3,
        title: "Marketing Workshop Series",
        description:
          "Learn the latest digital marketing strategies from industry experts. Hands-on workshops included.",
        date: "2024-01-20",
        startTime: "14:00",
        endTime: "18:00",
        location: "Business Center, Main Street",
        category: "Marketing Workshop",
        capacity: 50,
        registered: 50,
        price: 149,
        clubId: "business-club",
        contactEmail: "workshops@marketingpro.com",
        contactPhone: "+1 (555) 456-7890",
        imageUrl:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400",
        status: "completed",
        createdAt: "2024-01-05",
      },
      {
        id: 4,
        title: "Product Launch Event",
        description:
          "Be the first to see our revolutionary new product. Live demonstrations and Q&A session.",
        date: "2024-02-10",
        startTime: "19:00",
        endTime: "22:00",
        location: "Grand Hotel Ballroom",
        category: "Product Launch",
        capacity: 200,
        registered: 156,
        price: 0,
        clubId: "tech-club",
        contactEmail: "launch@innovationcorp.com",
        contactPhone: "+1 (555) 321-0987",
        imageUrl:
          "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400",
        status: "cancelled",
        createdAt: "2024-01-08",
      },
    ];
    setEvents(sampleEvents);
  }, []);

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

  const statusOptions = [
    {
      value: "",
      label: "Select status",
    },
    {
      value: "upcoming",
      label: "Upcoming",
      color: "bg-blue-100 text-blue-800",
    },
    {
      value: "ongoing",
      label: "Ongoing",
      color: "bg-green-100 text-green-800",
    },
    {
      value: "completed",
      label: "Completed",
      color: "bg-gray-100 text-gray-800",
    },
    {
      value: "cancelled",
      label: "Cancelled",
      color: "bg-red-100 text-red-800",
    },
  ];

  // Add new event function for DialogueBox
  const addEvent = useCallback((formData) => {
    const newEvent = {
      id: Date.now(),
      ...formData,
      registered: 0,
      createdAt: new Date().toISOString(),
    };
    setEvents(prev => [newEvent, ...prev]);
    toast.success("Event created successfully!");
  }, []);

  // Update event function for DialogueBox
  const updateEvent = useCallback((formData) => {
    setEvents(prev => 
      prev.map((event) =>
        event.id === editingEvent.id
          ? { ...event, ...formData, updatedAt: new Date().toISOString() }
          : event
      )
    );
    toast.success("Event updated successfully!");
  }, [editingEvent]);

  // Reset form function for DialogueBox
  const resetForm = useCallback(() => {
    setShowCreateForm(false);
    setEditingEvent(null);
  }, []);

  const handleEdit = useCallback((event) => {
    setEditingEvent(event);
    setShowCreateForm(true);
  }, []);

  const handleDelete = useCallback((eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(prev => prev.filter((event) => event.id !== eventId));
      toast.success("Event deleted successfully!");
    }
  }, []);

  const handleStatusChange = useCallback((eventId, newStatus) => {
    setEvents(prev =>
      prev.map((event) =>
        event.id === eventId ? { ...event, status: newStatus } : event
      )
    );
    toast.success("Event status updated!");
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || event.status === filterStatus;
    
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

  const getStatusIcon = (status) => {
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

  const getStatusColor = (status) => {
    const statusObj = statusOptions.find((s) => s.value === status);
    return statusObj ? statusObj.color : "bg-gray-100 text-gray-800";
  };

  const totalEvents = events.length;
  const upcomingEvents = events.filter((e) => e.status === "upcoming").length;
  const totalRegistrations = events.reduce(
    (sum, event) => sum + event.registered,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Event Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage and organize all your events
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateForm(true)}
            className="mt-4 sm:mt-0 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Event
          </motion.button>
        </div>

        {/* Stats Cards */}
        <Cards
          totalEvents={totalEvents}
          upcomingEvents={upcomingEvents}
          totalRegistrations={totalRegistrations}
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
          statusOptions={statusOptions.filter(option => option.value !== "")} // Remove empty option for search filter
        />

        {/* Create/Edit Event Dialog */}
        <DialogueBox
          showCreateForm={showCreateForm}
          resetForm={resetForm}
          statusOptions={statusOptions}
          editingEvent={editingEvent}
          addEvent={addEvent}
          updateEvent={updateEvent}
          clubs={clubs}
        />

        {/* Events List */}
        <EventList
          filteredEvents={filteredEvents}
          getStatusIcon={getStatusIcon}
          getStatusColor={getStatusColor}
          getCategoryColor={getCategoryColor}
          statusOptions={statusOptions.filter(option => option.value !== "")}
          clubs={clubs}
          moment={moment}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
};

export default EventManagement;