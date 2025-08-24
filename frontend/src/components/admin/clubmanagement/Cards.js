import { motion } from "framer-motion";
import { Award, Building2, Calendar, CheckCircle, UserPlus, Users, XCircle } from 'lucide-react';
import React from 'react';

const Cards = ({ totalClubs, activeClubs, totalMembers, clubs }) => {
  // Calculate additional metrics from the clubs data
  const inactiveClubs = clubs?.filter(c => c.status === 'inactive').length || 0;
  const pendingClubs = clubs?.filter(c => c.status === 'pending').length || 0;
  const verifiedClubs = clubs?.filter(c => c.status === 'verified').length || 0;
  
  // Calculate average members per club
  const avgMembersPerClub = totalClubs > 0 ? Math.round(totalMembers / totalClubs) : 0;
  
  // Calculate total events across all clubs
  const totalEvents = clubs?.reduce((sum, club) => sum + (club.totalEvents || 0), 0) || 0;
  
  // Calculate engagement rate (clubs with recent activity)
  const activeClubsCount = clubs?.filter(c => c.lastActivity && new Date(c.lastActivity) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length || 0;
  const engagementRate = totalClubs > 0 ? Math.round((activeClubsCount / totalClubs) * 100) : 0;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const cards = [
    {
      title: "Total Clubs",
      value: totalClubs,
      change: `${activeClubs} active`,
      changeColor: "text-blue-600",
      icon: Building2,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Total Members", 
      value: totalMembers.toLocaleString(),
      change: `${avgMembersPerClub} avg per club`,
      changeColor: "text-green-600",
      icon: Users,
      iconBg: "bg-green-50",
      iconColor: "text-green-600", 
      gradient: "from-green-500 to-green-600"
    },
    {
      title: "Total Events",
      value: totalEvents,
      change: `${engagementRate}% engagement`,
      changeColor: engagementRate >= 70 ? "text-green-600" : engagementRate >= 50 ? "text-yellow-600" : "text-red-600",
      icon: Calendar,
      iconBg: "bg-purple-50", 
      iconColor: "text-purple-600",
      gradient: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className=" rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 relative overflow-hidden"
            >
              {/* Gradient accent */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${card.gradient}`} />
              
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${card.iconBg}`}>
                  <Icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
                <div className="text-right">
                  <div className={`text-xs font-medium ${card.changeColor} bg-gray-50 px-2 py-1 rounded-full`}>
                    {card.change}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">
                  {card.title}
                </h3>
                <p className="text-3xl font-bold text-gray-900">
                  {card.value}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Secondary Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          variants={cardVariants}
          initial="hidden" 
          animate="visible"
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Verified</p>
              <p className="text-lg font-bold text-gray-900">{verifiedClubs}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible" 
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Award className="w-4 h-4 text-yellow-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Pending</p>
              <p className="text-lg font-bold text-gray-900">{pendingClubs}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 rounded-lg">
              <XCircle className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Inactive</p>
              <p className="text-lg font-bold text-gray-900">{inactiveClubs}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <UserPlus className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Avg Members</p>
              <p className="text-lg font-bold text-gray-900">{avgMembersPerClub}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Cards;
