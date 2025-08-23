import React, { useState } from 'react';
import EditMember from '../../components/subAdmin/EditMember';


const ClubMembers = () => {
  // Sample data based on your schema
  const [members, setMembers] = useState([
    {
      _id: '1',
      userId: 'std101',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'President',
      joinedAt: '2023-01-15',
      status: 'Active',
      lastActive: '2023-10-20'
    },
    {
      _id: '2',
      userId: 'std102',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'VicePresident',
      joinedAt: '2023-02-10',
      status: 'Active',
      lastActive: '2023-10-18'
    },
    {
      _id: '3',
      userId: 'std103',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      role: 'Moderator',
      joinedAt: '2023-03-22',
      status: 'Active',
      lastActive: '2023-10-19'
    },
    {
      _id: '4',
      userId: 'std104',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      role: 'Member',
      joinedAt: '2023-04-05',
      status: 'Active',
      lastActive: '2023-10-15'
    },
    {
      _id: '5',
      userId: 'std105',
      name: 'David Brown',
      email: 'david.brown@example.com',
      role: 'Member',
      joinedAt: '2023-05-18',
      status: 'Banned',
      lastActive: '2023-09-30'
    },
    {
      _id: '6',
      userId: 'std106',
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      role: 'Moderator',
      joinedAt: '2023-06-12',
      status: 'Active',
      lastActive: '2023-10-21'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [editingMember, setEditingMember] = useState(null);
  const [banConfirm, setBanConfirm] = useState(null);

  // Filter members based on search term
  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.userId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle role and status change
  const handleMemberUpdate = (updatedMember) => {
    setMembers(members.map(member => 
      member._id === updatedMember._id ? updatedMember : member
    ));
    setEditingMember(null);
  };

  // Function to handle status change (ban/unban)
  const handleStatusChange = (id, newStatus) => {
    setMembers(members.map(member => 
      member._id === id ? { ...member, status: newStatus } : member
    ));
    setBanConfirm(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-4 md:p-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 md:p-6 mb-6">
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Club Members
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Total Members: {members.length}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search members by name, email, role, or ID..."
                className="pl-4 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-12">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Joined Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member, index) => (
                  <tr key={member._id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {member.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {member.email}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            ID: {member.userId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {member.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        member.status === 'Active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                          : member.status === 'Banned'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                      }`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {member.joinedAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {member.lastActive}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingMember(member)}
                          className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setBanConfirm(member)}
                          className={`px-3 py-1 rounded-md text-sm ${
                            member.status === 'Active' 
                              ? 'bg-red-500 text-white hover:bg-red-600' 
                              : 'bg-green-500 text-white hover:bg-green-600'
                          } transition-colors`}
                        >
                          {member.status === 'Active' ? 'Ban' : 'Unban'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    No members found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ban/Unban Confirmation Modal */}
      {banConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              {banConfirm.status === 'Active' ? 'Ban Member' : 'Unban Member'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to {banConfirm.status === 'Active' ? 'ban' : 'unban'} {banConfirm.name}?
              {banConfirm.status === 'Active' ? ' They will no longer be able to access club features.' : ' They will regain access to club features.'}
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 dark:bg-slate-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-slate-500 transition-colors"
                onClick={() => setBanConfirm(null)}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 text-white rounded-lg transition-colors ${
                  banConfirm.status === 'Active' 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-green-500 hover:bg-green-600'
                }`}
                onClick={() => {
                  const newStatus = banConfirm.status === 'Active' ? 'Banned' : 'Active';
                  handleStatusChange(banConfirm._id, newStatus);
                }}
              >
                {banConfirm.status === 'Active' ? 'Ban Member' : 'Unban Member'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {editingMember && (
        <EditMember
          member={editingMember}
          onClose={() => setEditingMember(null)}
          onSave={handleMemberUpdate}
        />
      )}
    </div>
  );
};

export default ClubMembers;