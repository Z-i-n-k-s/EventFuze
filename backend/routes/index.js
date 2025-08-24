const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/User/userSignUp")
const userSignInController = require("../controller/User/userSignIn")
const userDetailsController = require('../controller/User/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/User/userLogout')
const allUsers = require('../controller/User/allUsers')
const updateUser = require('../controller/User/updateUser')
const userSearchController = require('../controller/User/userSearch')
const userDeleteController = require('../controller/User/userDelete')

const updateProfile = require('../controller/User/updateProfile')
const userForgotPass = require('../controller/User/userForgotPass')
const userResetPass = require('../controller/User/userResetPass')
const verifyResetToken = require('../controller/User/verifyResetToken')
const getClubs = require('../controller/Club/getClubs')
const getClubById = require('../controller/Club/getClubById')
const createClub = require('../controller/Club/createClub')
const updateClub = require('../controller/Club/updateClub')
const deleteClub = require('../controller/Club/deleteClub')
const addMilestone = require('../controller/Club/addMilestone')
const updateMilestone = require('../controller/Club/updateMilestone')
const deleteMilestone = require('../controller/Club/deleteMilestone')
const addMember = require('../controller/Club/addMember')
const removeMember = require('../controller/Club/removeMember')
const updateMemberRole = require('../controller/Club/updateMemberRole')
const joinClub = require('../controller/Club/joinClub')
const getClubMembers = require('../controller/Club/getClubMembers')
const createEvent = require('../controller/Event/createEvent')
const getAllEvents = require('../controller/Event/getAllEvents')
const updateEvent = require('../controller/Event/updateEvent')
const deleteEvent = require('../controller/Event/deleteEvent')
const getEventsByClub = require('../controller/Event/getEventsByClub')
const registerForEvent = require('../controller/Register/registerForEvent')
const cancelRegistration = require('../controller/Register/cancelRegistration')
const getRegistrationsByEvent = require('../controller/Register/getRegistrationsByEvent')
const getRegistrationsByStudent = require('../controller/Register/getRegistrationsByStudent')
const uploadCertificate = require('../controller/Register/uploadCertificate')
const leaveClub = require('../controller/Club/leaveClub')


router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)


// Forgot password (send email)
router.post("/forgot-password", userForgotPass);

// Reset password (use token + new password)
router.post("/reset-password", userResetPass);

router.get("/verify-reset-token/:token", verifyResetToken);


//admin panel
router.get("/all-user",authToken,allUsers)
router.post("/user-search",userSearchController)
router.post("/update-user",authToken,updateUser)
router.post("/update-profile",authToken,updateProfile)
router.post("/delete-user",authToken,userDeleteController)

// Club routes
router.get("/all-club",  getClubs);                        // fetch all clubs
router.post("/club-details", authToken, getClubById);     // get single club by clubId in body
router.post("/create-club", authToken, createClub);       // create new club
router.post("/update-club", authToken, updateClub);       // update club by clubId in body
router.post("/delete-club", authToken, deleteClub);       // delete club by clubId in body

router.post("/add-milestone", authToken, addMilestone);
router.post("/update-milestone", authToken, updateMilestone);
router.post("/delete-milestone", authToken, deleteMilestone);

router.post("/add-member", authToken, addMember);
router.post("/club-members", authToken, getClubMembers);
router.post("/remove-member", authToken, removeMember);
router.post("/update-member-role", authToken, updateMemberRole);

router.post("/join-club", authToken, joinClub);
router.post("/leave-club", authToken, leaveClub);

//Events
router.post("/create-event",authToken,   createEvent);
router.get("/all-events", getAllEvents);
router.post("/update-event",authToken,  updateEvent);
router.delete("/delete-event", authToken, deleteEvent);
router.post("/events/club", getEventsByClub);

// Registration routes
router.post("/register-event", registerForEvent);
router.post("/cancel-registration", authToken, cancelRegistration);
router.post("/registrations-by-event", authToken, getRegistrationsByEvent);
router.post("/registrations-by-student", authToken, getRegistrationsByStudent);

// Admin-only certificate upload
router.post("/upload-certificate", authToken, uploadCertificate);


module.exports = router