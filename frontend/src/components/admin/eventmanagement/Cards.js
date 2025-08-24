import { motion } from "framer-motion";
import { Calendar, CheckCircle, Clock, TrendingUp, Users, XCircle } from 'lucide-react';
import React from 'react';
import { getEventStatus } from '../../../helpers/eventStatusHelper';

const Cards = ({ totalEvents, upcomingEvents, totalRegistrations, events }) => {
  // Calculate additional metrics from the events data
  const completedEvents = events?.filter(e => getEventStatus(e) === 'completed').length || 0;
  const cancelledEvents = events?.filter(e => getEventStatus(e) === 'cancelled').length || 0;
  const ongoingEvents = events?.filter(e => getEventStatus(e) === 'ongoing').length || 0;
  
  // Calculate average registration rate
  const totalCapacity = events?.reduce((sum, event) => sum + (event.maxParticipants || 0), 0) || 1;
  const registrationRate = totalCapacity > 0 ? Math.round((totalRegistrations / totalCapacity) * 100) : 0;
  
  // Calculate revenue from paid events
  const totalRevenue = events?.reduce((sum, event) => {
    const registeredCount = event.registeredStudents ? event.registeredStudents.length : 0;
    return sum + (registeredCount * (event.registrationFee || 0));
  }, 0) || 0;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const cards = [
    {
      title: "Total Events",
      value: totalEvents,
      change: `+${upcomingEvents} upcoming`,
      changeColor: "text-blue-600",
      icon: Calendar,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Active Registrations", 
      value: totalRegistrations.toLocaleString(),
      change: `${registrationRate}% fill rate`,
      changeColor: registrationRate >= 70 ? "text-green-600" : registrationRate >= 50 ? "text-yellow-600" : "text-red-600",
      icon: Users,
      iconBg: "bg-green-50",
      iconColor: "text-green-600", 
      gradient: "from-green-500 to-green-600"
    },
    {
      title: "Revenue Generated",
      value: `$${totalRevenue.toLocaleString()}`,
      change: `From ${events?.filter(e => (e.registrationFee || 0) > 0).length || 0} paid events`,
      changeColor: "text-purple-600",
      icon: TrendingUp,
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
              className="bg-green-100 rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 relative overflow-hidden"
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
          className="bg-pink-200 rounded-xl p-4 shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Completed</p>
              <p className="text-lg font-bold text-gray-900">{completedEvents}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible" 
          transition={{ delay: 0.5 }}
          className="bg-blue-100 rounded-xl p-4 shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Ongoing</p>
              <p className="text-lg font-bold text-gray-900">{ongoingEvents}</p>
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
              <p className="text-xs text-gray-600">Cancelled</p>
              <p className="text-lg font-bold text-gray-900">{cancelledEvents}</p>
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
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Users className="w-4 h-4 text-yellow-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Avg. Capacity</p>
              <p className="text-lg font-bold text-gray-900">
                {totalEvents > 0 ? Math.round(totalCapacity / totalEvents) : 0}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Cards;