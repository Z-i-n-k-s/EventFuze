import { motion } from "framer-motion";
import { Calendar, Edit, MapPin, Trash2, Users } from "lucide-react";
import React from "react";
import { getEventStatus } from "../../../helpers/eventStatusHelper";
const EventList = ({
  filteredEvents,
  getStatusIcon,
  getStatusColor,
  getCategoryColor,
  clubs,
  moment,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">
          All Events ({filteredEvents.length})
        </h2>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="p-12 text-center">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">
            No events found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {event.title}
                    </h3>
                    <span
                      className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        event
                      )}`}
                    >
                      {getStatusIcon(event)}
                      <span>
                        {getEventStatus(event)}
                      </span>
                    </span>

                    <span
                      className={`px-2 py-1 text-xs font-medium text-white rounded-full ${getCategoryColor(
                        event.category
                      )}`}
                    >
                      {event.category}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{moment(event.date).format("MMM DD, YYYY")}</span>
                      {event.startTime && event.endTime && (
                        <span>at {event.startTime} - {event.endTime}</span>
                      )}
                    </div>

                    {event.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    )}

                                         <div className="flex items-center gap-2">
                       <Users className="w-4 h-4" />
                       <span>
                         {event.registeredStudents ? event.registeredStudents.length : 0}/{event.maxParticipants || "∞"} registered
                       </span>
                     </div>

                                         <div className="flex items-center gap-2">
                       <span className="font-medium">
                         {event.isFree || event.registrationFee === 0
                           ? "Free"
                           : `$${event.registrationFee}`}
                       </span>
                     </div>
                  </div>

                                     {event.clubsId && event.clubsId.length > 0 && (
                     <div className="mt-3 text-sm text-gray-500">
                       <span className="font-medium">Clubs:</span>{" "}
                       {event.clubsId.map((clubId, index) => (
                         <span key={clubId}>
                           {clubs.find(club => club.value === clubId)?.label || clubId}
                           {index < event.clubsId.length - 1 ? ", " : ""}
                         </span>
                       ))}
                     </div>
                   )}
                </div>

                
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;
