import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Award, Sparkles } from "lucide-react";
import MeetTeam from "../../components/user/MeetTeam";
import JoinClub from "../../components/user/JoinClub";

const ClubDetails = () => {
  const { clubId } = useParams();
  const location = useLocation();
  const clubFromState = location.state?.clubData; // ✅ get the club data from Header navigation
  const [isDarkMode, setIsDarkMode] = useState(false);

  if (!clubFromState) return <p className="text-center text-xl p-8">Club not found!</p>;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const club = clubFromState;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-emerald-50 to-green-100 dark:from-slate-600 dark:via-slate-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16 relative">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-200/20 dark:bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200/20 dark:bg-green-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-green-100/80 dark:bg-emerald-900/50 rounded-full backdrop-blur-sm border border-green-200/50 dark:border-emerald-700/50"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-emerald-700 dark:text-emerald-300 font-medium">Featured Club</span>
            </motion.div>
            
            <motion.h1
              className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-emerald-800 via-green-700 to-teal-700 dark:from-emerald-300 dark:via-green-400 dark:to-teal-400 bg-clip-text text-transparent leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {club.name}
            </motion.h1>
            
            <motion.p
              className="text-xl max-w-4xl mx-auto leading-relaxed text-gray-700 dark:text-gray-300 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {club.description}
            </motion.p>
          </motion.div>

          {/* Milestones */}
          {club.milestones?.length > 0 && (
            <motion.div
              className="mb-20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="text-center mb-12">
                <motion.div
                  className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-amber-100/80 dark:bg-amber-900/30 rounded-full backdrop-blur-sm border border-amber-200/50 dark:border-amber-700/50"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <span className="text-amber-700 dark:text-amber-300 font-medium">Achievements</span>
                </motion.div>
                <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Club Milestones</h2>
                <p className="text-gray-600 dark:text-gray-400">Celebrating our journey and accomplishments</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {club.milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone._id}
                    className="group relative"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8 }}
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-gray-300 dark:bg-slate-900 backdrop-blur-sm border border-white/20 dark:border-slate-900 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:border-emerald-200 dark:group-hover:border-emerald-700">
                      {/* Image Container */}
                      <div className="relative overflow-hidden h-56">
                        <motion.img
                          src={milestone.image}
                          alt={milestone.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          whileHover={{ scale: 1.05 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <motion.h4
                          className="font-bold text-xl mb-3 text-gray-800 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-300"
                          whileHover={{ x: 4 }}
                        >
                          {milestone.title}
                        </motion.h4>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed line-clamp-3">
                          {milestone.description}
                        </p>
                        
                        <div className="flex items-center text-gray-500 dark:text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span className="text-sm font-medium">{formatDate(milestone.date)}</span>
                        </div>
                      </div>

                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-400 dark:bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse"></div>
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-400 dark:bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 group-hover:animate-pulse"></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <MeetTeam team={club.members} isDarkMode={isDarkMode} />
          </motion.div>

          {/* Join Club */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <JoinClub clubId={club._id} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;