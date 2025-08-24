import { AnimatePresence, motion } from "framer-motion";
import { Building2, Plus, Trash2, Upload, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import SummaryApi from "../../../common";
import uploadImage from "../../../helpers/uploadImage";

const DialogueBox = ({ 
  showCreateForm, 
  resetForm, 
  statusOptions, 
  categoryOptions,
  editingClub, 
  addClub, 
  updateClub 
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    images: [],
    milestones: [],
    adminName: "",
    adminId: "",
    members: []
  });

  const [errors, setErrors] = useState({});
  const [newMilestone, setNewMilestone] = useState({
    title: "",
    description: "",
    date: "",
    image: ""
  });
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploadingMilestoneImage, setUploadingMilestoneImage] = useState(false);
  const [addingMilestone, setAddingMilestone] = useState(false);

  // Fetch students for admin dropdown
  const fetchStudents = async () => {
    setLoadingStudents(true);
    try {
      const response = await fetch(SummaryApi.allUser.url, {
        method: SummaryApi.allUser.method,
        credentials: 'include',
      });
      
      const data = await response.json();
      
             if (data.success) {
         // Filter only students
         const studentUsers = data.data.filter(user => user.role === "STUDENT");
         console.log("Fetched students:", studentUsers); // Debug log
         console.log("First student ID:", studentUsers[0]?._id); // Debug log
         setStudents(studentUsers);
       } else {
        console.error("Failed to fetch students:", data.message);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoadingStudents(false);
    }
  };

  useEffect(() => {
    if (showCreateForm) {
      fetchStudents();
    }
  }, [showCreateForm]);

  useEffect(() => {
    if (editingClub) {
      setFormData({
        name: editingClub.name || "",
        description: editingClub.description || "",
        images: editingClub.images || [],
        milestones: editingClub.milestones || [],
        adminName: editingClub.adminName || "",
        adminId: editingClub.adminId || "",
        members: editingClub.members || []
      });
    } else {
      setFormData({
        name: "",
        description: "",
        images: [],
        milestones: [],
        adminName: "",
        adminId: "",
        members: []
      });
    }
    setErrors({});
  }, [editingClub, showCreateForm]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Club name is required";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    
    if (!formData.adminName.trim()) {
      newErrors.adminName = "Admin is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Ensure milestones have proper date format for backend
      const formattedMilestones = formData.milestones.map(milestone => ({
        ...milestone,
        date: milestone.date ? new Date(milestone.date).toISOString() : new Date().toISOString()
      }));

      const submitData = {
        ...formData,
        milestones: formattedMilestones,
        createdAt: editingClub ? editingClub.createdAt : new Date().toISOString(),
        updatedAt: editingClub ? new Date().toISOString() : null
      };

       console.log("Submitting club data:", submitData); // Debug log
       console.log("Admin ID being sent:", submitData.adminId); // Debug log
       console.log("Admin Name being sent:", submitData.adminName); // Debug log
       console.log("Admin ID type:", typeof submitData.adminId); // Debug log
       console.log("Admin ID length:", submitData.adminId?.length); // Debug log

      if (editingClub) {
        // Include clubId for updates
        submitData.clubId = editingClub._id || editingClub.id;
        updateClub(submitData);
      } else {
        addClub(submitData);
      }
      
      resetForm();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploadingImages(true);
    try {
      // Upload multiple images to Cloudinary
      const uploadedImages = await uploadImage(files, "mern_product");
      
      // Extract secure_urls from the response
      const imageUrls = uploadedImages.map(img => img.secure_url);
      
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...imageUrls]
      }));
      
      toast.success(`${files.length} image(s) uploaded successfully!`);
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload images. Please try again.");
    } finally {
      setUploadingImages(false);
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addMilestone = async () => {
    if (!newMilestone.title.trim() || !newMilestone.description.trim()) {
      toast.error("Title and description are required for milestones");
      return;
    }

    // If editing an existing club, use the API
    if (editingClub?._id) {
      setAddingMilestone(true);
      try {
        const milestoneData = {
          clubId: editingClub._id,
          title: newMilestone.title,
          description: newMilestone.description,
          date: newMilestone.date || new Date().toISOString(),
          image: newMilestone.image || ""
        };

        const response = await fetch(SummaryApi.addMilestone.url, {
          method: SummaryApi.addMilestone.method,
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(milestoneData),
        });

        const data = await response.json();

        if (data.success) {
          // Update the form data with the new milestone
          setFormData(prev => ({
            ...prev,
            milestones: data.data.milestones
          }));
          
          // Reset the milestone form
          setNewMilestone({
            title: "",
            description: "",
            date: "",
            image: ""
          });
          
          toast.success("Milestone added successfully!");
        } else {
          toast.error(data.message || "Failed to add milestone");
        }
      } catch (error) {
        console.error("Error adding milestone:", error);
        toast.error("Failed to add milestone");
      } finally {
        setAddingMilestone(false);
      }
    } else {
      // If creating a new club, add milestone locally
      const newMilestoneData = {
        title: newMilestone.title,
        description: newMilestone.description,
        date: newMilestone.date || new Date().toISOString(),
        image: newMilestone.image || ""
      };

      console.log("Adding milestone to form:", newMilestoneData); // Debug log

      setFormData(prev => {
        const updatedMilestones = [...prev.milestones, newMilestoneData];
        console.log("Updated milestones array:", updatedMilestones); // Debug log
        return {
          ...prev,
          milestones: updatedMilestones
        };
      });
      
      // Reset the milestone form
      setNewMilestone({
        title: "",
        description: "",
        date: "",
        image: ""
      });
      
      toast.success("Milestone added to form! It will be saved with the club.");
    }
  };

  const handleMilestoneImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingMilestoneImage(true);
    try {
      // Upload single image to Cloudinary
      const uploadedImage = await uploadImage(file, "mern_product");
      
      console.log("Milestone image uploaded:", uploadedImage); // Debug log
      
      setNewMilestone(prev => ({
        ...prev,
        image: uploadedImage.secure_url
      }));
      
      toast.success("Milestone image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading milestone image:", error);
      toast.error("Failed to upload milestone image. Please try again.");
    } finally {
      setUploadingMilestoneImage(false);
    }
  };

  const removeMilestone = (index) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index)
    }));
  };

  const handleMilestoneChange = (field, value) => {
    setNewMilestone(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <AnimatePresence>
      {showCreateForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={resetForm}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {editingClub ? "Edit Club" : "Create New Club"}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {editingClub ? "Update club information" : "Add a new club to the system"}
                  </p>
                </div>
              </div>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Club Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.name ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="Enter club name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin *
                  </label>
                  <select
                    name="adminName"
                    value={formData.adminName}
                                         onChange={(e) => {
                       const selectedStudent = students.find(student => student.name === e.target.value);
                       console.log("Selected student:", selectedStudent); // Debug log
                       console.log("Selected student ID:", selectedStudent?._id); // Debug log
                       
                       setFormData(prev => ({
                         ...prev,
                         adminName: e.target.value,
                         adminId: selectedStudent ? selectedStudent._id : ""
                       }));
                       
                       // Clear error when user selects
                       if (errors.adminName) {
                         setErrors(prev => ({
                           ...prev,
                           adminName: ""
                         }));
                       }
                     }}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.adminName ? 'border-red-300' : 'border-gray-200'
                    }`}
                  >
                    <option value="">Select an admin</option>
                    {loadingStudents ? (
                      <option value="">Loading students...</option>
                    ) : students.length === 0 ? (
                      <option value="">No students found</option>
                    ) : (
                      students.map(student => (
                        <option key={student._id} value={student.name}>
                          {student.name}
                        </option>
                      ))
                    )}
                  </select>
                  {errors.adminName && (
                    <p className="text-red-500 text-sm mt-1">{errors.adminName}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.description ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="Describe the club's purpose and activities"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
              </div>

              {/* Images Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Club Images
                </label>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <label className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer hover:bg-gray-50 flex items-center justify-center gap-2">
                      {uploadingImages ? (
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Upload className="w-4 h-4 text-gray-500" />
                      )}
                      <span className="text-gray-500">
                        {uploadingImages ? "Uploading..." : "Click to upload images"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploadingImages}
                      />
                    </label>
                  </div>
                  
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Club image ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/150x100?text=Image+Error";
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Milestones Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Club Milestones
                </label>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={newMilestone.title}
                      onChange={(e) => handleMilestoneChange('title', e.target.value)}
                      placeholder="Milestone title"
                      className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                    <input
                      type="date"
                      value={newMilestone.date}
                      onChange={(e) => handleMilestoneChange('date', e.target.value)}
                      className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                     <textarea
                       value={newMilestone.description}
                       onChange={(e) => handleMilestoneChange('description', e.target.value)}
                       placeholder="Milestone description"
                       rows={2}
                       className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                     />
                     <div className="space-y-2">
                       <label className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer hover:bg-gray-50 flex items-center justify-center gap-2">
                         {uploadingMilestoneImage ? (
                           <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                         ) : (
                           <Upload className="w-4 h-4 text-gray-500" />
                         )}
                         <span className="text-gray-500">
                           {uploadingMilestoneImage ? "Uploading..." : "Upload milestone image"}
                         </span>
                         <input
                           type="file"
                           accept="image/*"
                           onChange={handleMilestoneImageUpload}
                           className="hidden"
                           disabled={uploadingMilestoneImage}
                         />
                       </label>
                       
                       {/* Image Preview */}
                       {newMilestone.image && (
                         <div className="relative group">
                           <img
                             src={newMilestone.image}
                             alt="Milestone preview"
                             className="w-full h-24 object-cover rounded-lg border border-gray-200"
                             onError={(e) => {
                               e.target.src = "https://via.placeholder.com/150x100?text=Image+Error";
                             }}
                           />
                           <button
                             type="button"
                             onClick={() => setNewMilestone(prev => ({ ...prev, image: "" }))}
                             className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                           >
                             <Trash2 className="w-3 h-3" />
                           </button>
                         </div>
                       )}
                     </div>
                   </div>
                  <button
                    type="button"
                    onClick={addMilestone}
                    disabled={addingMilestone}
                    className="px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {addingMilestone ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                    {addingMilestone ? "Adding..." : "Add Milestone"}
                  </button>
                  
                  {!editingClub?._id && (
                    <p className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
                      💡 You can add milestones now! They will be saved with the club.
                    </p>
                  )}
                  
                  {formData.milestones.length > 0 && (
                    <div className="space-y-3">
                      {formData.milestones.map((milestone, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                            <button
                              type="button"
                              onClick={() => removeMilestone(index)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>{new Date(milestone.date).toLocaleDateString()}</span>
                            {milestone.image && (
                              <div className="flex items-center gap-2">
                                <span>Has image</span>
                                <img
                                  src={milestone.image}
                                  alt={milestone.title}
                                  className="w-8 h-8 object-cover rounded"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <motion.button
                  type="button"
                  onClick={resetForm}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
                >
                  {editingClub ? "Update Club" : "Create Club"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DialogueBox;
