import React, { useEffect, useRef, useState } from 'react';
import { Calendar, Camera, Lightbulb, Cpu, Music, Star, Eye, UserPlus } from 'lucide-react';

const UpcomingEvent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [descVisible, setDescVisible] = useState(false);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === sectionRef.current && entry.isIntersecting) {
            setIsVisible(true);
          }
          if (entry.target === titleRef.current && entry.isIntersecting) {
            setTitleVisible(true);
          }
          if (entry.target === descRef.current && entry.isIntersecting) {
            setDescVisible(true);
          }
        });
      },
      { 
        threshold: 0.3,
        rootMargin: '-50px 0px -50px 0px'
      }
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
      category: "Workshop"
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
      category: "Competition"
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
      category: "Championship"
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
      category: "Festival"
    },
    {
      id: 5,
      title: "Islamic Study Circle",
      description: "Join our weekly study circle for spiritual growth and Islamic knowledge sharing.",
      image: "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=400&h=250&fit=crop",
      club: "Islamic Society",
      badge: "Weekly",
      badgeColor: "bg-gradient-to-r from-teal-500 to-green-500",
      icon: <Star className="w-5 h-5" />,
      date: "Every Friday",
      category: "Study Circle"
    },
    {
      id: 6,
      title: "Tech Talk Series",
      description: "Industry experts share insights on latest technology trends and career opportunities.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop",
      club: "Tech Club",
      badge: "Featured",
      badgeColor: "bg-gradient-to-r from-indigo-500 to-purple-500",
      icon: <Cpu className="w-5 h-5" />,
      date: "Dec 18, 2024",
      category: "Seminar"
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 py-20 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 dark:from-blue-500/10 dark:to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-400/20 to-blue-600/20 dark:from-green-500/10 dark:to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 
            ref={titleRef}
            className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-6 transition-all duration-1000 ease-out transform ${
              titleVisible 
                ? 'translate-y-0 translate-z-0 opacity-100 scale-100 rotate-0' 
                : 'translate-y-16 translate-z-[-50px] opacity-0 scale-95 rotate-1'
            }`}
            style={{ 
              perspective: '1000px',
              transformStyle: 'preserve-3d'
            }}
          >
            <span 
              className="block bg-gradient-to-r from-slate-700 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent filter drop-shadow-lg"
              style={{ 
                transformStyle: 'preserve-3d',
                transition: 'all 800ms cubic-bezier(0.4, 0, 0.2, 1)',
                transform: titleVisible 
                  ? 'translateZ(20px) rotateX(0deg)' 
                  : 'translateZ(-30px) rotateX(15deg)',
                textShadow: titleVisible 
                  ? '0 0 30px rgba(59, 130, 246, 0.3)' 
                  : 'none'
              }}
            >
              Upcoming
            </span>
            <span 
              className="block bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 dark:from-purple-400 dark:via-pink-400 dark:to-red-400 bg-clip-text text-transparent filter drop-shadow-lg"
              style={{ 
                transformStyle: 'preserve-3d',
                transition: 'all 800ms cubic-bezier(0.4, 0, 0.2, 1) 200ms',
                transform: titleVisible 
                  ? 'translateZ(30px) rotateX(0deg)' 
                  : 'translateZ(-40px) rotateX(15deg)',
                textShadow: titleVisible 
                  ? '0 0 30px rgba(236, 72, 153, 0.3)' 
                  : 'none'
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
              color: 'transparent',
              backgroundImage: 'linear-gradient(135deg, #1f2937 0%, #374151 50%, #4b5563 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text'
            }}
          >
            <span className="dark:bg-gradient-to-r dark:from-slate-200 dark:via-slate-300 dark:to-slate-100 dark:bg-clip-text dark:text-transparent">
              Discover amazing opportunities to learn, grow, and connect with fellow students through our diverse club events and activities.
            </span>
          </p>
        </div>

        {/* Events Grid */}
        <div 
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16"
        >
          {events.slice(0, 4).map((event, index) => (
            <div
              key={event.id}
              className={`group bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl dark:shadow-slate-700/20 dark:hover:shadow-slate-600/30 transform transition-all duration-700 hover:-translate-y-6 hover:rotate-2 overflow-hidden border border-slate-200/50 dark:border-slate-600/50 hover:border-blue-300/50 dark:hover:border-blue-400/50 ${
                isVisible 
                  ? 'translate-y-0 opacity-100 scale-100' 
                  : 'translate-y-20 opacity-0 scale-95'
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent dark:from-black/50 dark:to-transparent group-hover:from-black/50 dark:group-hover:from-black/70 transition-all duration-500"></div>
                <div className={`absolute top-4 right-4 ${event.badgeColor} text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg backdrop-blur-sm`}>
                  {event.icon}
                  {event.badge}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-green-600 dark:text-green-400 font-semibold">
                    {event.club}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {event.date}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {event.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-3">
                  {event.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block bg-slate-100/80 dark:bg-slate-700/80 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                    {event.category}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-gradient-to-r from-slate-600 to-slate-700 dark:from-slate-600 dark:to-slate-500 hover:from-slate-700 hover:to-slate-800 dark:hover:from-slate-500 dark:hover:to-slate-400 text-white py-2 px-4 rounded-xl font-medium transition-all duration-300 hover:shadow-lg dark:hover:shadow-slate-400/20 flex items-center justify-center gap-2 text-sm transform hover:scale-105">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-green-600 to-green-700 dark:from-green-500 dark:to-green-600 hover:from-green-700 hover:to-green-800 dark:hover:from-green-400 dark:hover:to-green-500 text-white py-2 px-4 rounded-xl font-medium transition-all duration-300 hover:shadow-lg dark:hover:shadow-green-400/20 flex items-center justify-center gap-2 text-sm transform hover:scale-105">
                    <UserPlus className="w-4 h-4" />
                    Register
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Events Button */}
        <div className={`text-center transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
        }`}
        style={{ transitionDelay: '600ms' }}
        >
          <button className="group relative bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 dark:from-green-500 dark:via-blue-500 dark:to-purple-500 hover:from-green-700 hover:via-blue-700 hover:to-purple-700 dark:hover:from-green-400 dark:hover:via-blue-400 dark:hover:to-purple-400 text-white font-bold py-4 px-12 rounded-2xl text-lg transition-all duration-500 transform hover:scale-110 hover:shadow-2xl dark:hover:shadow-blue-400/20 overflow-hidden backdrop-blur-sm">
            <span className="relative z-10 flex items-center justify-center gap-3">
              <Calendar className="w-6 h-6" />
              View All Events
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 dark:from-purple-400 dark:via-blue-400 dark:to-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </button>
        </div>

        {/* Floating Animation Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-green-400/30 to-blue-500/30 dark:from-green-400/20 dark:to-blue-500/20 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-r from-purple-400/30 to-pink-500/30 dark:from-purple-400/20 dark:to-pink-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/2 right-20 w-12 h-12 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 dark:from-yellow-400/20 dark:to-orange-500/20 rounded-full blur-xl animate-ping"></div>
      </div>
    </section>
  );
};

export default UpcomingEvent;