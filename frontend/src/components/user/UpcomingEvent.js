import React, { useEffect, useRef, useState } from 'react';
import { Calendar, Camera, Lightbulb, Cpu, Music, Eye, UserPlus } from 'lucide-react';
import ViewDetails from './ViewDetails'; // Use your modal component
import { Link } from "react-router-dom";


const UpcomingEvent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [descVisible, setDescVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === sectionRef.current) setIsVisible(true);
            if (entry.target === titleRef.current) setTitleVisible(true);
            if (entry.target === descRef.current) setDescVisible(true);
          } else {
            if (entry.target === sectionRef.current) setIsVisible(false);
            if (entry.target === titleRef.current) setTitleVisible(false);
            if (entry.target === descRef.current) setDescVisible(false);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-50px 0px -50px 0px' }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    if (titleRef.current) observer.observe(titleRef.current);
    if (descRef.current) observer.observe(descRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (descRef.current) observer.unobserve(descRef.current);
    };
  }, []);

  const events = [
    {
      id: 1,
      title: "Photography Workshop",
      description: "Learn advanced photography techniques with professional photographers and capture stunning moments.",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=250&fit=crop",
      club: "Photography Club",
      badge: "Featured",
      badgeColor: "bg-gradient-to-r from-purple-500 to-pink-500",
      icon: <Camera className="w-5 h-5" />,
      date: "Dec 15, 2024",
      category: "Workshop",
      location: "Main Campus Auditorium",
      time: "2:00 PM - 5:00 PM",
      details: "Join us for an immersive photography workshop where you'll learn advanced techniques from professional photographers. Bring your camera and get ready to capture stunning moments! All skill levels are welcome."
    },
    {
      id: 2,
      title: "Innovation Challenge",
      description: "Showcase your creative solutions and compete with fellow innovators in this exciting design challenge.",
      image: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=250&fit=crop",
      club: "Innovation & Design",
      badge: "Upcoming",
      badgeColor: "bg-gradient-to-r from-blue-500 to-cyan-500",
      icon: <Lightbulb className="w-5 h-5" />,
      date: "Dec 20, 2024",
      category: "Competition",
      location: "Innovation Hub",
      time: "10:00 AM - 4:00 PM",
      details: "Put your creative problem-solving skills to the test in our annual Innovation Challenge. Work individually or in teams to design solutions for real-world problems. Prizes will be awarded to the top innovations!"
    },
    {
      id: 3,
      title: "Robotics Championship",
      description: "Build, program, and compete with your robots in the ultimate robotics showdown.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
      club: "Robotics Club",
      badge: "Featured",
      badgeColor: "bg-gradient-to-r from-green-500 to-emerald-500",
      icon: <Cpu className="w-5 h-5" />,
      date: "Dec 25, 2024",
      category: "Championship",
      location: "Engineering Building",
      time: "9:00 AM - 6:00 PM",
      details: "The annual Robotics Championship is here! Show off your engineering skills as you build, program, and compete with your robots. Categories include line following, sumo wrestling, and maze solving."
    },
    {
      id: 4,
      title: "Cultural Festival",
      description: "Celebrate diversity through music, dance, and art in our annual cultural extravaganza.",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop",
      club: "Cultural Club",
      badge: "Upcoming",
      badgeColor: "bg-gradient-to-r from-orange-500 to-red-500",
      icon: <Music className="w-5 h-5" />,
      date: "Jan 5, 2025",
      category: "Festival",
      location: "University Quad",
      time: "12:00 PM - 8:00 PM",
      details: "Experience the rich diversity of our campus community at the annual Cultural Festival. Enjoy performances, food, and art from around the world. This is a celebration of our global community!"
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 py-20 px-4 relative overflow-hidden">
      
      {/* Background Animations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 dark:from-blue-500/10 dark:to-purple-800/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-400/20 to-blue-600/20 dark:from-green-500/10 dark:to-blue-800/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 
            ref={titleRef}
            className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-6 transition-transform duration-1000 ${
              titleVisible 
                ? 'rotate-0 translate-z-0 opacity-100 scale-100' 
                : 'rotateY-180 translate-z-[-200px] opacity-0 scale-90'
            }`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <span 
              className="block bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent filter drop-shadow-lg"
              style={{
                transition: 'all 1s cubic-bezier(0.4,0,0.2,1)',
                transform: titleVisible ? 'rotateY(0deg) translateZ(50px)' : 'rotateY(180deg) translateZ(-50px)',
              }}
            >
              Upcoming
            </span>
            <span 
              className="block bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent filter drop-shadow-lg"
              style={{
                transition: 'all 1s cubic-bezier(0.4,0,0.2,1) 200ms',
                transform: titleVisible ? 'rotateY(0deg) translateZ(60px)' : 'rotateY(180deg) translateZ(-60px)',
              }}
            >
              Events
            </span>
          </h1>

          <p 
            ref={descRef}
            className={`text-xl md:text-2xl max-w-4xl mx-auto transition-all duration-1000 ease-out transform ${
              descVisible 
                ? 'translate-y-0 opacity-100 scale-100' 
                : 'translate-y-12 opacity-0 scale-95'
            }`}
            style={{
              transitionDelay: '400ms',
              backgroundImage: 'linear-gradient(135deg, #10b981 0%, #22c55e 50%, #16a34a 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}
          >
            Discover amazing opportunities to learn, grow, and connect with fellow students through our diverse club events and activities.
          </p>
        </div>

        {/* Event Cards */}
        <div 
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16"
        >
          {events.map((event, index) => (
            <div
              key={event.id}
              className={`group bg-white/80 dark:bg-slate-800/90 rounded-3xl shadow-lg hover:shadow-2xl dark:hover:bg-slate-700/80 transform transition-all duration-500 hover:-translate-y-4 hover:scale-105 overflow-hidden border border-slate-200/50 dark:border-slate-600/50 hover:border-green-400/50 ${
                isVisible 
                  ? 'translate-y-0 opacity-100 scale-100' 
                  : 'translate-y-20 opacity-0 scale-95'
              }`}
              style={{ transitionDelay: `${index * 150}ms`, transformStyle: 'preserve-3d' }}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className={`absolute top-4 right-4 ${event.badgeColor} text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg`}>
                  {event.icon}
                  {event.badge}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-green-600 dark:text-green-400 font-semibold">{event.club}</span>
                  <span className="text-sm text-slate-500 dark:text-slate-300">{event.date}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-green-400 transition-colors duration-300">{event.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-3">{event.description}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => { 
                      setSelectedEvent(event); 
                      setIsRegistered(false); 
                    }}
                    className="flex-1 bg-green-700 hover:bg-green-900 text-white py-2 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                  >
                    <Eye className="w-4 h-4" /> View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      <div
  className={`text-center transition-all duration-1000 transform ${
    isVisible
      ? "translate-y-0 opacity-100 scale-100"
      : "translate-y-10 opacity-0 scale-95"
  }`}
  style={{ transitionDelay: "600ms" }}
>
  <Link to="/all-events">
    <button className="group relative bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 dark:from-green-500 dark:via-blue-500 dark:to-purple-500 hover:from-green-700 hover:via-blue-700 hover:to-purple-700 dark:hover:from-green-400 dark:hover:via-blue-400 dark:hover:to-purple-400 text-white font-bold py-4 px-12 rounded-2xl text-lg transition-all duration-500 transform hover:scale-110 hover:shadow-2xl dark:hover:shadow-blue-400/20 overflow-hidden">
      <span className="relative z-10 flex items-center justify-center gap-3">
        <Calendar className="w-6 h-6" />
        View All Events
      </span>
    </button>
  </Link>
</div>
      </div>

      {/* Modal */}
      {selectedEvent && (
        <ViewDetails event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </section>
  );
};

export default UpcomingEvent;
