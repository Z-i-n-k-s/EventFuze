import { AlertCircle, Calendar, Clock, DollarSign, Image, MapPin, Save, Users, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SummaryApi from "../../common";

const CreateEvent = ({ onSave, onClose }) => {
  const user = useSelector((state) => state?.user?.user);
  const [clubs, setClubs] = useState([]);
  const [userClub, setUserClub] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    maxParticipants: 100,
    clubsId: [],
    images: [],
    registrationFee: 0,
    registrationStart: "",
    registrationDeadline: "",
  });
  
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  // Fetch clubs and find the user's club
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch(SummaryApi.getAllClubs.url, {
          method: SummaryApi.getAllClubs.method,
          credentials: "include",
        });
        const data = await response.json();
        if (data.success) {
          setClubs(data.data || []);
          
          // Find the club where the current user is a club admin
          // Check if user has clubs array and find the club where they are admin
          let userClubData = null;
          
          if (user.clubs && user.clubs.length > 0) {
            // User has clubs array, find the club where they are admin
            const userClubInfo = user.clubs.find(userClub => 
              userClub.role === 'President' || userClub.role === 'CLUB_ADMIN'
            );
            
            if (userClubInfo) {
              // Find the actual club data using clubId
              userClubData = data.data.find(club => club._id === userClubInfo.clubId);
            }
          } else {
            // Fallback: check if user is admin in any club's members array
            userClubData = data.data.find(club => 
              club.members && club.members.some(member => 
                member.userId === user._id && (member.role === 'CLUB_ADMIN' || member.role === 'President')
              )
            );
          }
          
          if (userClubData) {
            setUserClub(userClubData);
            setNewEvent(prev => ({
              ...prev,
              clubsId: [userClubData._id]
            }));
          } else {
            toast.error("You are not authorized to create events for any club");
            onClose();
          }
        } else {
          toast.error(data.message || "Failed to fetch clubs");
        }
      } catch (err) {
        toast.error("Error fetching clubs");
      }
    };

    if (user?._id) {
      fetchClubs();
    }
  }, [user, onClose]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          images: "Image size should be less than 5MB"
        }));
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          images: "Please select a valid image file"
        }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setNewEvent((prev) => ({
          ...prev,
          images: [reader.result]
        }));
        setErrors(prev => ({
          ...prev,
          images: ""
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!newEvent.title.trim()) {
      newErrors.title = "Event title is required";
    }
    
    if (!newEvent.description.trim()) {
      newErrors.description = "Event description is required";
    }
    
    if (!newEvent.category.trim()) {
      newErrors.category = "Event category is required";
    }
    
    if (!newEvent.date) {
      newErrors.date = "Event date is required";
    }
    
    if (!newEvent.startTime) {
      newErrors.startTime = "Start time is required";
    }
    
    if (!newEvent.endTime) {
      newErrors.endTime = "End time is required";
    }
    
    if (!newEvent.location.trim()) {
      newErrors.location = "Event location is required";
    }
    
    if (newEvent.maxParticipants <= 0) {
      newErrors.maxParticipants = "Maximum participants must be greater than 0";
    }
    
    if (!newEvent.clubsId.length) {
      newErrors.clubsId = "Club is required";
    }
    
    if (newEvent.registrationFee < 0) {
      newErrors.registrationFee = "Registration fee cannot be negative";
    }
    
    if (!newEvent.registrationStart) {
      newErrors.registrationStart = "Registration start date is required";
    }
    
    if (!newEvent.registrationDeadline) {
      newErrors.registrationDeadline = "Registration deadline is required";
    }
    
    // Validate registration dates
    if (newEvent.registrationStart && newEvent.registrationDeadline) {
      if (new Date(newEvent.registrationDeadline) < new Date(newEvent.registrationStart)) {
        newErrors.registrationDeadline = "Registration deadline cannot be before registration start date";
      }
    }
    
    // Validate event date is not in the past
    if (newEvent.date) {
      const eventDate = new Date(newEvent.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (eventDate < today) {
        newErrors.date = "Event date cannot be in the past";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Prepare event data for backend
      const eventData = {
        ...newEvent,
        createdBy: user._id, // Add the club admin ID
        maxParticipants: parseInt(newEvent.maxParticipants),
        registrationFee: parseFloat(newEvent.registrationFee),
      };

      const response = await fetch(SummaryApi.createEvent.url, {
        method: SummaryApi.createEvent.method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(eventData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Event created successfully!");
        if (onSave) {
          onSave(data.data);
        }
        
        // Reset form
    setNewEvent({
      title: "",
          description: "",
      category: "",
      date: "",
          startTime: "",
          endTime: "",
      location: "",
          maxParticipants: 100,
          clubsId: userClub ? [userClub._id] : [],
          images: [],
          registrationFee: 0,
          registrationStart: "",
          registrationDeadline: "",
    });
    setImagePreview(null);
        setErrors({});
        onClose();
      } else {
        toast.error(data.message || "Failed to create event");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Failed to create event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // If user is not a club admin or no club found, show error
  if (!userClub) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 max-w-md w-full">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Access Denied
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              You are not authorized to create events. Only club admins can create events.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-[9999] p-4 pt-20">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[calc(100vh-5rem)] overflow-y-auto relative my-4">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-6 py-4 rounded-t-2xl z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Create New Event
      </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Creating event for: <span className="font-semibold text-blue-600">{userClub.name}</span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Section */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Event Title *
            </label>
            <input
              type="text"
              name="title"
              value={newEvent.title}
              onChange={handleInputChange}
                placeholder="Enter event title"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                          dark:bg-slate-700 dark:text-white transition-colors ${
                            errors.title 
                              ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                              : 'border-gray-300 dark:border-slate-600'
                          }`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.title}
                </p>
              )}
          </div>

            {/* Description */}
          <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Event Description *
            </label>
              <textarea
                name="description"
                value={newEvent.description}
              onChange={handleInputChange}
                rows="4"
                placeholder="Describe your event in detail..."
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                          dark:bg-slate-700 dark:text-white transition-colors resize-none ${
                            errors.description 
                              ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                              : 'border-gray-300 dark:border-slate-600'
                          }`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.description}
                </p>
              )}
          </div>

            {/* Category and Club Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Category *
            </label>
                <input
                  type="text"
              name="category"
              value={newEvent.category}
              onChange={handleInputChange}
                  placeholder="Enter event category"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                            dark:bg-slate-700 dark:text-white transition-colors ${
                              errors.category 
                                ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                                : 'border-gray-300 dark:border-slate-600'
                            }`}
                />
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.category}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Club *
                </label>
                <input
                  type="text"
                  value={userClub.name}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg 
                           bg-gray-100 dark:bg-slate-600 text-gray-700 dark:text-gray-300 cursor-not-allowed"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Automatically selected based on your club admin role
                </p>
              </div>
          </div>

            {/* Event Date and Time Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <Calendar className="inline h-4 w-4 mr-1" />
                  Event Date *
            </label>
            <input
              type="date"
              name="date"
              value={newEvent.date}
              onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                            dark:bg-slate-700 dark:text-white transition-colors ${
                              errors.date 
                                ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                                : 'border-gray-300 dark:border-slate-600'
                            }`}
                />
                {errors.date && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.date}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <Clock className="inline h-4 w-4 mr-1" />
                  Start Time *
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={newEvent.startTime}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                            dark:bg-slate-700 dark:text-white transition-colors ${
                              errors.startTime 
                                ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                                : 'border-gray-300 dark:border-slate-600'
                            }`}
                />
                {errors.startTime && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.startTime}
                  </p>
                )}
          </div>

          <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <Clock className="inline h-4 w-4 mr-1" />
                  End Time *
            </label>
            <input
                  type="time"
                  name="endTime"
                  value={newEvent.endTime}
              onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                            dark:bg-slate-700 dark:text-white transition-colors ${
                              errors.endTime 
                                ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                                : 'border-gray-300 dark:border-slate-600'
                            }`}
                />
                {errors.endTime && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.endTime}
                  </p>
                )}
              </div>
          </div>

            {/* Location and Max Participants Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <MapPin className="inline h-4 w-4 mr-1" />
                  Event Location *
            </label>
            <input
              type="text"
              name="location"
              value={newEvent.location}
              onChange={handleInputChange}
                  placeholder="Enter event location"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                            dark:bg-slate-700 dark:text-white transition-colors ${
                              errors.location 
                                ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                                : 'border-gray-300 dark:border-slate-600'
                            }`}
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.location}
                  </p>
                )}
          </div>

          <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <Users className="inline h-4 w-4 mr-1" />
                  Maximum Participants *
                </label>
                <input
                  type="number"
                  name="maxParticipants"
                  value={newEvent.maxParticipants}
                  onChange={handleInputChange}
                  min="1"
                  placeholder="Enter maximum number of participants"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                            dark:bg-slate-700 dark:text-white transition-colors ${
                              errors.maxParticipants 
                                ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                                : 'border-gray-300 dark:border-slate-600'
                            }`}
                />
                {errors.maxParticipants && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.maxParticipants}
                  </p>
                )}
              </div>
            </div>

            {/* Registration Fee */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <DollarSign className="inline h-4 w-4 mr-1" />
                Registration Fee
            </label>
            <input
              type="number"
                name="registrationFee"
                value={newEvent.registrationFee}
              onChange={handleInputChange}
              min="0"
                step="0.01"
                placeholder="Enter registration fee (0 for free)"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                          dark:bg-slate-700 dark:text-white transition-colors ${
                            errors.registrationFee 
                              ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                              : 'border-gray-300 dark:border-slate-600'
                          }`}
              />
              {errors.registrationFee && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.registrationFee}
                </p>
              )}
            </div>

            {/* Registration Start and End Dates Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Registration Start Date *
                </label>
                <input
                  type="date"
                  name="registrationStart"
                  value={newEvent.registrationStart}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                            dark:bg-slate-700 dark:text-white transition-colors ${
                              errors.registrationStart 
                                ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                                : 'border-gray-300 dark:border-slate-600'
                            }`}
                />
                {errors.registrationStart && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.registrationStart}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Registration Deadline *
                </label>
                <input
                  type="date"
                  name="registrationDeadline"
                  value={newEvent.registrationDeadline}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                            dark:bg-slate-700 dark:text-white transition-colors ${
                              errors.registrationDeadline 
                                ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                                : 'border-gray-300 dark:border-slate-600'
                            }`}
                />
                {errors.registrationDeadline && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.registrationDeadline}
                  </p>
                )}
              </div>
          </div>

          {/* Image Upload */}
          <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <Image className="inline h-4 w-4 mr-1" />
              Event Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                          dark:bg-slate-700 dark:text-white transition-colors text-sm ${
                            errors.images 
                              ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                              : 'border-gray-300 dark:border-slate-600'
                          }`}
              />
              {errors.images && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.images}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Max file size: 5MB. Supported formats: JPG, PNG, GIF
              </p>
          </div>

          {/* Image Preview */}
          {imagePreview && (
              <div className="flex justify-center">
                <div className="relative">
              <img
                src={imagePreview}
                alt="Event preview"
                    className="h-48 w-auto object-cover rounded-lg border border-gray-300 dark:border-slate-600 shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setNewEvent(prev => ({ ...prev, images: [] }));
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
            </div>
          )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-4 border-t border-gray-200 dark:border-slate-700">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-6 py-3 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg 
                         hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors font-medium disabled:opacity-50"
              >
                Cancel
              </button>
          <button
            type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                         transition-colors font-medium flex items-center shadow-sm disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating...
                  </>
                ) : (
                  <>
            <Save className="h-4 w-4 mr-2" />
            Create Event
                  </>
                )}
          </button>
        </div>
      </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;