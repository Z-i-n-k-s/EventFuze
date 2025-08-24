
const backendDomain  = process.env.REACT_APP_BACKEND_URL; //"http://localhost:8080"

const SummaryApi = {
  signUP: {
    url: `${backendDomain }/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomain }/api/signin`,
    method: "post",
  },
  current_user: {
    url: `${backendDomain }/api/user-details`,
    method: "get",
  },
  forgotPassword: {
    url: `${backendDomain }/api/forgot-password`,
    method: "post",
  },
  verifyResetToken: {
    url: `${backendDomain }/api/verify-reset-token`,
    method: "get",
  },
  resetPassword: {
    url: `${backendDomain }/api/reset-password`,
    method: "post",
  },
  logout_user: {
    url: `${backendDomain }/api/userLogout`,
    method: "get",
  },
  allUser: {
    url: `${backendDomain }/api/all-user`,
    method: "get",
  },
  userSearch: {
    url: `${backendDomain }/api/user-search`,
    method: "post",
  },
  updateUser: {
    url: `${backendDomain }/api/update-user`,
    method: "post",
  },
  updateProfile: {
    url: `${backendDomain }/api/update-profile`,
    method: "post",
  },
  deleteUser: {
    url: `${backendDomain }/api/delete-user`,
    method: "post",
  },
   // Club CRUD
  getAllClubs: {
    url: `${backendDomain}/api/all-club`,
    method: "get",
  },
  getClubDetails: {
    url: `${backendDomain}/api/club-details`,
    method: "post",
  },
  createClub: {
    url: `${backendDomain}/api/create-club`,
    method: "post",
  },
  updateClub: {
    url: `${backendDomain}/api/update-club`,
    method: "post",
  },
  deleteClub: {
    url: `${backendDomain}/api/delete-club`,
    method: "post",
  },

  // Milestones
  addMilestone: {
    url: `${backendDomain}/api/add-milestone`,
    method: "post",
  },
  updateMilestone: {
    url: `${backendDomain}/api/update-milestone`,
    method: "post",
  },
  deleteMilestone: {
    url: `${backendDomain}/api/delete-milestone`,
    method: "post",
  },
  getAllMilestones: {
    url: `${backendDomain}/api/all-milestones`,
    method: "post",
  },

  // Member Management
  addMember: {
    url: `${backendDomain}/api/add-member`,
    method: "post",
  },
  removeMember: {
    url: `${backendDomain}/api/remove-member`,
    method: "post",
  },
  updateMemberRole: {
    url: `${backendDomain}/api/update-member-role`,
    method: "post",
  },
   getClubMembers: {
    url: `${backendDomain}/api/club-members`,
    method: "post",
  },

  // Student Club Actions
  joinClub: {
    url: `${backendDomain}/api/join-club`,
    method: "post",
  },
  leaveClub: {
    url: `${backendDomain}/api/leave-club`,
    method: "post",
  },

    // Events
  createEvent: {
    url: `${backendDomain}/api/create-event`,
    method: "post",
  },
  getAllEvents: {
    url: `${backendDomain}/api/all-events`,
    method: "get",
  },
  updateEvent: {
    url: `${backendDomain}/api/update-event`,
    method: "post",
  },
  deleteEvent: {
    url: `${backendDomain}/api/delete-event`,
    method: "delete",
  },
  getEventsByClub: {
    url: `${backendDomain}/api/events/club`,
    method: "post",
  },

  // Registration
  registerForEvent: {
    url: `${backendDomain}/api/register-event`,
    method: "post",
  },
  cancelRegistration: {
    url: `${backendDomain}/api/cancel-registration`,
    method: "post",
  },
  getRegistrationsByEvent: {
    url: `${backendDomain}/api/registrations-by-event`,
    method: "post",
  },
  getRegistrationsByStudent: {
    url: `${backendDomain}/api/registrations-by-student`,
    method: "post",
  },

  // certificate upload
  uploadCertificate: {
    url: `${backendDomain}/api/upload-certificate`,
    method: "post",
  },

  
};

export default SummaryApi;
