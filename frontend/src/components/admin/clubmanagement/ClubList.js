import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  Building2,
  Calendar,
  Edit,
  Image,
  MoreVertical,
  Trash2
} from 'lucide-react';
import React, { useState } from 'react';

const ClubList = ({ 
  filteredClubs, 
  getStatusIcon, 
  getStatusColor, 
  getCategoryColor, 
  statusOptions, 
  categoryOptions,
  moment, 
  handleEdit, 
  handleDelete, 
  handleStatusChange 
}) => {
  const [expandedClub, setExpandedClub] = useState(null);

  const toggleExpanded = (clubId) => {
    setExpandedClub(expandedClub === clubId ? null : clubId);
  };

  if (filteredClubs.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100"
      >
        <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No clubs found</h3>
        <p className="text-gray-600">
          Try adjusting your search criteria or create a new club.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Club
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Admin
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Members
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Images
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Milestones
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredClubs.map((club, index) => (
              <motion.tr
                key={club._id || club.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12">
                      <img
                        className="h-12 w-12 rounded-xl object-cover"
                        src={club.images && club.images.length > 0 ? club.images[0] : `https://ui-avatars.com/api/?name=${encodeURIComponent(club.name)}&background=6366f1&color=fff&size=48`}
                        alt={club.name}
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(club.name)}&background=6366f1&color=fff&size=48`;
                        }}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {club.name}
                      </div>
                      <div className="text-sm text-gray-500 max-w-xs truncate">
                        {club.description}
                      </div>
                      <div className="flex items-center text-xs text-gray-400 mt-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        {club.createdAt ? moment(club.createdAt).format('MMM YYYY') : 'N/A'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {club.adminName || "No admin assigned"}
                  </div>
                  <div className="text-xs text-gray-500">
                    Club Admin
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {club.members ? club.members.length : 0} members
                  </div>
                  <div className="text-xs text-gray-500">
                    {club.members ? club.members.filter(m => m.role === 'President').length : 0} President
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <Image className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-900">
                      {club.images ? club.images.length : 0}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <Award className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-900">
                      {club.milestones ? club.milestones.length : 0}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {club.createdAt ? moment(club.createdAt).format('MMM DD, YYYY') : 'N/A'}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEdit(club)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                      title="Edit club"
                    >
                      <Edit className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleExpanded(club._id)}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                      title="View details"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(club._id || club.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      title="Delete club"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {expandedClub && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-200 bg-gray-50"
          >
            {filteredClubs.find(club => club._id === expandedClub) && (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Club Information */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-900">Club Information</h4>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="text-gray-600">Name:</span>
                        <span className="ml-2 font-medium">{filteredClubs.find(club => club._id === expandedClub)?.name}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Description:</span>
                        <p className="mt-1 text-gray-900">{filteredClubs.find(club => club._id === expandedClub)?.description}</p>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Admin:</span>
                        <span className="ml-2 font-medium">{filteredClubs.find(club => club._id === expandedClub)?.adminName || "No admin assigned"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Members */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-900">Members ({filteredClubs.find(club => club._id === expandedClub)?.members?.length || 0})</h4>
                    <div className="space-y-2">
                      {filteredClubs.find(club => club._id === expandedClub)?.members?.map((member, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">{member.userId}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            member.role === 'President' ? 'bg-purple-100 text-purple-800' :
                            member.role === 'Vice President' ? 'bg-blue-100 text-blue-800' :
                            member.role === 'Moderator' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {member.role}
                          </span>
                        </div>
                      )) || <p className="text-sm text-gray-500">No members yet</p>}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-900">Quick Actions</h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleEdit(filteredClubs.find(club => club._id === expandedClub))}
                        className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        Edit Club
                      </button>
                      <button
                        onClick={() => handleDelete(expandedClub)}
                        className="w-full px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors duration-200"
                      >
                        Delete Club
                      </button>
                    </div>
                  </div>
                </div>

                {/* Images Section */}
                {filteredClubs.find(club => club._id === expandedClub)?.images?.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Club Images</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {filteredClubs.find(club => club._id === expandedClub)?.images?.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt={`Club image ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/150x100?text=Image+Error";
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Milestones Section */}
                {filteredClubs.find(club => club._id === expandedClub)?.milestones?.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Milestones</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredClubs.find(club => club._id === expandedClub)?.milestones?.map((milestone, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-medium text-gray-900">{milestone.title}</h5>
                            <span className="text-xs text-gray-500">
                              {new Date(milestone.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{milestone.description}</p>
                          {milestone.image && (
                            <img
                              src={milestone.image}
                              alt={milestone.title}
                              className="w-full h-20 object-cover rounded"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ClubList;
