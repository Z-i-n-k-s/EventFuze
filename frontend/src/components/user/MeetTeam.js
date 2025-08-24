import React from "react";
import { motion } from "framer-motion";

const MeetTeam = ({ team = [], isDarkMode = false }) => {
  // Theme classes
  const themeClasses = {
    cardBg: isDarkMode ? "bg-slate-800" : "bg-white",
    text: isDarkMode ? "text-white" : "text-slate-800",
    textSecondary: isDarkMode ? "text-slate-300" : "text-slate-600",
  };

  return (
    <motion.div
      className="mb-16 relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      <h2 className={`text-3xl font-bold mb-8 text-center text-green-800 dark:text-white`}>
        Meet Our Team
      </h2>

      {team.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              className={`rounded-2xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105 ${themeClasses.cardBg}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-1 ${themeClasses.text}`}>
                  {member.name}
                </h3>
                <p className="text-emerald-500 font-medium mb-4">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className={`${themeClasses.text} text-center text-lg`}>
          No team members available yet.
        </p>
      )}
    </motion.div>
  );
};

export default MeetTeam;
