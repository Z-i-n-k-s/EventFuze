import { motion } from "framer-motion";
import { Calendar, Edit, MapPin, Trash2, Users } from "lucide-react";
import React from "react";
const EventList = ({
  filteredEvents,
  getStatusIcon,
  getStatusColor,
  getCategoryColor,
  statusOptions,
  clubs,
  moment,
  handleEdit,
  handleDelete,
  handleStatusChange,
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
              key={event.id}
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
                        event.status
                      )}`}
                    >
                      {getStatusIcon(event.status)}
                      <span>
                        {
                          statusOptions.find((s) => s.value === event.status)
                            ?.label
                        }
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
                        {event.registered}/{event.capacity || "∞"} registered
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {event.price === 0 || event.price === ""
                          ? "Free"
                          : `$${event.price}`}
                      </span>
                    </div>
                  </div>

                  {event.clubId && (
                    <div className="mt-3 text-sm text-gray-500">
                      <span className="font-medium">Club:</span>{" "}
                      {clubs.find(club => club.value === event.clubId)?.label || event.clubId}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEdit(event)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit Event"
                  >
                    <Edit className="w-4 h-4" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(event.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Event"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>

                  <div className="relative">
                    <select
                      value={event.status}
                      onChange={(e) =>
                        handleStatusChange(event.id, e.target.value)
                      }
                      className="appearance-none bg-transparent border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {statusOptions.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>
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
