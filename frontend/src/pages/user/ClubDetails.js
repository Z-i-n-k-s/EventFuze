import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Award } from "lucide-react";
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
    <div className="min-h-screen bg-green-100 dark:bg-slate-800">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black dark:text-white">
            {club.name}
          </h1>
          <motion.p
            className="text-xl max-w-4xl mx-auto leading-relaxed text-black dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {club.description}
          </motion.p>
        </motion.div>

        {/* Milestones */}
        {club.milestones?.length > 0 && (
          <motion.div
            className="rounded-2xl p-8 mb-16 shadow-lg bg-white dark:bg-slate-800"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 text-black dark:text-white">Club Milestones</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {club.milestones.map((milestone) => (
                <motion.div
                  key={milestone._id}
                  className="rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 bg-white dark:bg-slate-800"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <img
                    src={milestone.image}
                    alt={milestone.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-bold text-xl mb-2 text-black dark:text-white">
                      {milestone.title}
                    </h4>
                    <p className="text-black dark:text-white mb-2">{milestone.description}</p>
                    <div className="flex items-center text-black dark:text-white">
                      <Calendar className="mr-2 h-4 w-4" />
                      {formatDate(milestone.date)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Team Section */}
        <MeetTeam team={club.members} isDarkMode={isDarkMode} />

        {/* Join Club */}
        <JoinClub clubId={club._id} />
      </div>
    </div>
  );
};

export default ClubDetails;
