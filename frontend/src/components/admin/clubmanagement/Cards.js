import { motion } from "framer-motion";
import { Building2, Users, Calendar } from 'lucide-react';
import React from 'react';

const Cards = ({ totalClubs, totalMembers, clubs, totalEvents }) => {
  // Calculate average members per club
  const avgMembersPerClub = totalClubs > 0 ? Math.round(totalMembers / totalClubs) : 0;

 

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Main cards including Average Members
  const cards = [
    {
      title: "Total Clubs",
      value: totalClubs,
      icon: Building2,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Total Members",
      value: totalMembers.toLocaleString(),
      icon: Users,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
      gradient: "from-green-500 to-green-600"
    },
    {
      title: "Total Events",
      value: totalEvents,
      icon: Calendar,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      title: "Average Members",
      value: avgMembersPerClub,
      icon: Users,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
      gradient: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 relative overflow-hidden"
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${card.gradient}`} />
              
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${card.iconBg}`}>
                  <Icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{card.title}</h3>
                <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
