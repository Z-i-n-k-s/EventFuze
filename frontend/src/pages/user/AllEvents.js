import React, { useState, useMemo } from 'react';
import { Search, Calendar, Users, MapPin, Clock, Filter, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import ViewDetails from '../../components/user/ViewDetails'; // Modal component

const AllEvents = () => {
    const [events] = useState([
        {
            id: 1,
            title: "Photography Workshop",
            date: "2025-09-10",
            time: "10:00 AM",
            club: "Photography",
            location: "Art Studio",
            category: "Arts",
            image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=250&fit=crop",
            description: "Learn photography techniques and tips from experts.",
            attendees: 120
        },
        {
            id: 2,
            title: "Cultural Night",
            date: "2025-09-15",
            time: "07:00 PM",
            club: "Cultural",
            location: "University Hall",
            category: "Cultural",
            image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop",
            description: "Experience cultural performances and music from diverse traditions.",
            attendees: 500
        },
        {
            id: 3,
            title: "Innovation & Design Expo",
            date: "2025-09-20",
            time: "09:00 AM",
            club: "Innovation & Design",
            location: "Exhibition Center",
            category: "Technology",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop",
            description: "Showcase your innovative designs and ideas with the community.",
            attendees: 200
        },
        {
            id: 4,
            title: "Programming Hackathon",
            date: "2025-09-25",
            time: "08:00 AM",
            club: "Programming",
            location: "Computer Lab",
            category: "Technology",
            image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=250&fit=crop",
            description: "Compete in a 24-hour coding challenge and win exciting prizes.",
            attendees: 180
        },
        {
            id: 5,
            title: "Islamic Awareness Seminar",
            date: "2025-09-30",
            time: "02:00 PM",
            club: "Islamic",
            location: "Lecture Hall 1",
            category: "Religion",
            image: "https://images.unsplash.com/photo-1521208918306-33f8b4b0223c?w=400&h=250&fit=crop",
            description: "Enhance your knowledge about Islamic teachings and practices.",
            attendees: 150
        },
        {
            id: 6,
            title: "Robotics Competition",
            date: "2025-10-05",
            time: "09:00 AM",
            club: "Robotics",
            location: "Innovation Lab",
            category: "Technology",
            image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=250&fit=crop",
            description: "Participate in exciting robotics challenges with other tech enthusiasts.",
            attendees: 220
        },
        {
            id: 7,
            title: "Photography Exhibition",
            date: "2025-10-10",
            time: "11:00 AM",
            club: "Photography",
            location: "Art Gallery",
            category: "Arts",
            image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=250&fit=crop",
            description: "A collection of beautiful photographs by students.",
            attendees: 180
        },
        {
            id: 8,
            title: "Cultural Dance Show",
            date: "2025-10-15",
            time: "06:30 PM",
            club: "Cultural",
            location: "University Stage",
            category: "Cultural",
            image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop",
            description: "Enjoy spectacular dance performances by talented students.",
            attendees: 450
        },
        {
            id: 9,
            title: "Innovation & Design Meetup",
            date: "2025-10-20",
            time: "10:00 AM",
            club: "Innovation & Design",
            location: "Innovation Center",
            category: "Technology",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop",
            description: "Connect with designers and innovators for networking and knowledge sharing.",
            attendees: 300
        },
        {
            id: 10,
            title: "Programming Workshop",
            date: "2025-10-25",
            time: "09:00 AM",
            club: "Programming",
            location: "Computer Lab",
            category: "Technology",
            image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=250&fit=crop",
            description: "Hands-on programming session for beginners and advanced coders.",
            attendees: 200
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClub, setSelectedClub] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedDateRange, setSelectedDateRange] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const eventsPerPage = 8;

    const clubs = ["Photography", "Cultural", "Innovation & Design", "Programming", "Islamic", "Robotics"];
    const categories = [...new Set(events.map(event => event.category))];

    const filteredEvents = useMemo(() => {
        return events.filter(event => {
            const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  event.club.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  event.location.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesClub = !selectedClub || event.club === selectedClub;
            const matchesCategory = !selectedCategory || event.category === selectedCategory;
            
            let matchesDate = true;
            if (selectedDateRange) {
                const eventDate = new Date(event.date);
                const today = new Date();
                const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
                const nextMonth = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
                switch (selectedDateRange) {
                    case 'today': matchesDate = eventDate.toDateString() === today.toDateString(); break;
                    case 'week': matchesDate = eventDate >= today && eventDate <= nextWeek; break;
                    case 'month': matchesDate = eventDate >= today && eventDate <= nextMonth; break;
                    default: matchesDate = true;
                }
            }
            
            return matchesSearch && matchesClub && matchesCategory && matchesDate;
        });
    }, [events, searchTerm, selectedClub, selectedCategory, selectedDateRange]);

    const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
    const startIndex = (currentPage - 1) * eventsPerPage;
    const currentEvents = filteredEvents.slice(startIndex, startIndex + eventsPerPage);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedClub('');
        setSelectedCategory('');
        setSelectedDateRange('');
        setCurrentPage(1);
    };

    return (
      <div className="min-h-screen p-4 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 animate-fade-in">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent mb-4">
                        All Events
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">Discover amazing events happening around campus</p>
                </div>

                {/* Search and Filters */}
                <div className="m-10">
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
                                {clubs.map(club => <option key={club} value={club}>{club}</option>)}
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
                                {categories.map(category => <option key={category} value={category}>{category}</option>)}
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

                    {(searchTerm || selectedClub || selectedCategory || selectedDateRange) && (
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
                            className="bg-white dark:bg-slate-800 hover:bg-green-100 dark:hover:bg-slate-600 rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-fade-in-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="relative">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-48 object-cover"
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
                                        <Calendar className="h-4 w-4 mr-2 text-green-500" /> {formatDate(event.date)}
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="h-4 w-4 mr-2 text-green-500" /> {event.time}
                                    </div>
                                    <div className="flex items-center">
                                        <MapPin className="h-4 w-4 mr-2 text-green-500" /> {event.location}
                                    </div>
                                    <div className="flex items-center">
                                        <Users className="h-4 w-4 mr-2 text-green-500" /> {event.club} • {event.attendees} attending
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
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="flex items-center px-4 py-2 rounded-lg bg-white dark:bg-slate-800 shadow hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Previous
                        </button>
                        
                        <div className="flex space-x-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-2 rounded-lg transition-all ${
                                        currentPage === page
                                            ? 'bg-green-500 text-white shadow-lg'
                                            : 'bg-white dark:bg-slate-800 hover:bg-green-50 dark:hover:bg-slate-700 shadow hover:shadow-md'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                        
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="flex items-center px-4 py-2 rounded-lg bg-white dark:bg-slate-800 shadow hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </button>
                    </div>
                )}

                {/* No Events Found */}
                {currentEvents.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">🎉</div>
                        <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">No events found</h3>
                        <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            {selectedEvent && <ViewDetails event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
        </div>
    );
};

export default AllEvents;
