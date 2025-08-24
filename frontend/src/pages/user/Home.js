import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Users, Calendar, Award, ArrowRight } from "lucide-react";
import ImagesEvent from "../../components/user/ImagesEvent";
import LandingScroll from "../../components/user/LandingScroll";
import UpcomingEvent from "../../components/user/UpcomingEvent";
import { useNavigate } from "react-router-dom";
import JoinClub from "../../components/user/JoinClub";

const Home = () => {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const navigate = useNavigate();

  // Intersection Observer to detect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          setIsInView(false);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.querySelector(`#${sectionId}`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 text-gray-800 transition-all duration-500 dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-800 dark:text-white">
      {/* Hero Section */}
      <section
        ref={sectionRef}
        className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20 pb-10 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView ? { opacity: 0.5, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 1.5, delay: 0.2 }}
            className="absolute top-10 left-10 w-72 h-72 bg-green-200 rounded-full blur-3xl dark:bg-green-900/20"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView ? { opacity: 0.5, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 1.5, delay: 0.5 }}
            className="absolute bottom-10 right-10 w-96 h-96 bg-amber-200 rounded-full blur-3xl dark:bg-blue-900/20"
          ></motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={
            isInView
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 40, scale: 0.95 }
          }
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30, rotateX: -90 }}
            animate={
              isInView
                ? { opacity: 1, y: 0, rotateX: 0 }
                : { opacity: 0, y: 30, rotateX: -90 }
            }
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Discover Your{" "}
            <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
              Passion
            </span>{" "}
            With Us
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="text-xl md:text-2xl mb-10 text-gray-600 max-w-3xl mx-auto dark:text-gray-300"
          >
            Join our vibrant community of student clubs and organizations.
            Explore your interests, develop skills, and make lasting
            connections.
          </motion.p>







          

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -10px rgba(16, 185, 129, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/joinform")} // navigate to route for JoinClub
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-4 px-8 rounded-full text-lg flex items-center shadow-lg"
            >
              Join Clubs <ArrowRight className="ml-2" size={20} />
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -10px rgba(16, 185, 129, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/all-events")} 
              className="border-2 border-green-500 text-green-600 font-semibold py-4 px-8 rounded-full text-lg flex items-center bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 dark:text-green-400 dark:border-green-400"
            >
              View Events <Calendar className="ml-2" size={20} />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.5, duration: 0.7 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto w-full"
        >
          {[
            { icon: <Users size={32} />, number: "25+", label: "Active Clubs" },
            { icon: <Award size={32} />, number: "1500+", label: "Members" },
            {
              icon: <Calendar size={32} />,
              number: "50+",
              label: "Events Yearly",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 30, scale: 0.9 }
              }
              transition={{
                duration: 0.6,
                delay: 1.7 + index * 0.2,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-green-100 backdrop-blur-md p-6 rounded-2xl shadow-lg text-center border border-white/20 dark:bg-slate-600/90 dark:border-slate-700/30"
            >
              <div className="text-green-500 mb-4 flex justify-center dark:text-green-400">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold mb-2 dark:text-white">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <LandingScroll></LandingScroll>
      <UpcomingEvent />
      <ImagesEvent></ImagesEvent>
      <JoinClub />
    </div>
  );
};

export default Home;
