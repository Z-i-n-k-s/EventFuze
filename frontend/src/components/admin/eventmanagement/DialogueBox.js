import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Building,
  Calendar,
  Clock,
  DollarSign,
  Edit,
  Image as ImageIcon,
  Mail,
  MapPin,
  Phone,
  Plus,
  Users,
  X
} from "lucide-react";
import React, { useState, useEffect, useCallback, useMemo, useRef, useLayoutEffect } from "react";

const DialogueBox = ({
  showCreateForm,
  resetForm,
  statusOptions,
  editingEvent,
  addEvent,
  updateEvent,
  categories,
  clubs = [],
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    category: "",
    status: "",
    clubId: "",
    location: "",
    capacity: "",
    price: "",
    contactEmail: "",
    contactPhone: "",
    imageUrl: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Store cursor positions to restore after re-render
  const cursorPositions = useRef({});

  // Preload data if editing
  useEffect(() => {
    if (editingEvent) {
      setFormData(editingEvent);
    } else {
      setFormData({
        title: "",
        description: "",
        date: "",
        startTime: "",
        endTime: "",
        category: "",
        status: "",
        clubId: "",
        location: "",
        capacity: "",
        price: "",
        contactEmail: "",
        contactPhone: "",
        imageUrl: "",
      });
    }
  }, [editingEvent, showCreateForm]);

  // Restore cursor positions after form data changes
  useLayoutEffect(() => {
    Object.entries(cursorPositions.current).forEach(([fieldName, position]) => {
      const input = document.querySelector(`input[name="${fieldName}"], textarea[name="${fieldName}"], select[name="${fieldName}"]`);
      if (input && input.setSelectionRange && position !== undefined) {
        input.setSelectionRange(position, position);
      }
    });
  });

  // Memoized validation function to prevent unnecessary re-renders
  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.title?.trim()) newErrors.title = "Event title is required";
    if (!formData.date) newErrors.date = "Event date is required";
    if (!formData.startTime) newErrors.startTime = "Start time is required";
    if (!formData.endTime) newErrors.endTime = "End time is required";
    if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime)
      newErrors.endTime = "End time must be after start time";
    if (formData.contactEmail && !/\S+@\S+\.\S+/.test(formData.contactEmail))
      newErrors.contactEmail = "Please enter a valid email address";
    if (formData.capacity && formData.capacity < 1)
      newErrors.capacity = "Capacity must be at least 1";
    if (formData.price && formData.price < 0) newErrors.price = "Price cannot be negative";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Memoized input change handler with cursor position preservation
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    const cursorPosition = e.target.selectionStart;
    
    // Store cursor position before state update
    if (cursorPosition !== undefined) {
      cursorPositions.current[name] = cursorPosition;
    }
    
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  const handleFormSubmit = useCallback((e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      if (editingEvent) {
        updateEvent(formData);
      } else {
        addEvent(formData);
      }
      resetForm();
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [validateForm, editingEvent, updateEvent, addEvent, formData, resetForm]);

  // Memoized club options to prevent recreation on every render
  const clubOptions = useMemo(() => [
    { value: "", label: "Select a club" },
    ...clubs.map((c) => ({ value: c.value, label: c.label }))
  ], [clubs]);

  // Memoized InputField component to prevent recreation
  const InputField = React.memo(({
    label,
    name,
    type = "text",
    placeholder,
    required = false,
    icon: Icon,
    min,
    max,
    step,
    rows,
    options = []
  }) => {
    const fieldValue = formData[name] || "";
    const fieldError = errors[name];
    const baseInputClass = `w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`;
    const errorClass = fieldError ? "border-red-300 focus:ring-red-500" : "border-gray-300 hover:border-gray-400";
    const inputClass = `${baseInputClass} ${errorClass}`;

    return (
      <div className="space-y-2">
        <label className="flex items-center text-sm font-semibold text-gray-700">
          {Icon && <Icon className="w-4 h-4 mr-2 text-gray-500" />}
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>

        {type === "select" ? (
          <select
            name={name}
            value={fieldValue}
            onChange={handleInputChange}
            className={`${inputClass} bg-white`}
            required={required}
            autoComplete="off"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : type === "textarea" ? (
          <textarea
            name={name}
            value={fieldValue}
            onChange={handleInputChange}
            rows={rows || 4}
            className={`${inputClass} resize-none`}
            placeholder={placeholder}
            required={required}
            autoComplete="off"
          />
        ) : (
          <input
            type={type}
            name={name}
            value={fieldValue}
            onChange={handleInputChange}
            className={inputClass}
            placeholder={placeholder}
            required={required}
            min={min}
            max={max}
            step={step}
            autoComplete="off"
          />
        )}

        {fieldError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center text-red-600 text-sm"
          >
            <AlertCircle className="w-4 h-4 mr-1" />
            {fieldError}
          </motion.div>
        )}
      </div>
    );
  });

  // Don't render if form is not shown
  if (!showCreateForm) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) resetForm();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{editingEvent ? "Edit Event" : "Create New Event"}</h2>
              <p className="text-blue-100 mt-1">
                {editingEvent ? "Update event details" : "Fill in the information to create a new event"}
              </p>
            </div>
            <button
              onClick={resetForm}
              className="text-blue-100 hover:text-white hover:bg-white/20 transition-all duration-200 p-2 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto max-h-[calc(95vh-200px)]">
          <div className="p-6">
            <form onSubmit={handleFormSubmit} className="space-y-8">
              {/* Basic Info */}
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <InputField label="Event Title" name="title" placeholder="Enter a compelling event title" required icon={Calendar} />
                  </div>
                  <InputField label="Category" name="category" placeholder="Enter category" required icon={Building} />
                  <InputField
                    label="Club/Organization"
                    name="clubId"
                    type="select"
                    options={clubOptions}
                    icon={Building}
                  />
                </div>
              </div>

              {/* Date & Time */}
              <div className="space-y-6">
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Date & Time</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <InputField label="Event Date" name="date" type="date" required icon={Calendar} />
                  <InputField label="Start Time" name="startTime" type="time" required icon={Clock} />
                  <InputField label="End Time" name="endTime" type="time" required icon={Clock} />
                </div>
              </div>

              {/* Location & Capacity */}
              <div className="space-y-6">
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Location & Capacity</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Location" name="location" placeholder="Enter event venue or address" icon={MapPin} />
                  <InputField label="Maximum Capacity" name="capacity" type="number" placeholder="Enter max attendees" min="1" icon={Users} />
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-6">
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Ticket Price" name="price" type="number" placeholder="0 for free events" min="0" step="0.01" icon={DollarSign} />
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Contact Email" name="contactEmail" type="email" placeholder="organizer@example.com" icon={Mail} />
                  <InputField label="Contact Phone" name="contactPhone" type="tel" placeholder="+1 (555) 123-4567" icon={Phone} />
                </div>
              </div>

              {/* Additional Details */}
              <div className="space-y-6">
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Event Image URL" name="imageUrl" type="url" placeholder="https://example.com/image.jpg" icon={ImageIcon} />
                  <InputField label="Event Status" name="status" type="select" options={statusOptions} icon={Calendar} />
                </div>
                <InputField label="Event Description" name="description" type="textarea" placeholder="Event details..." rows={5} />
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600"><span className="text-red-500">*</span> Required fields</p>
            <div className="flex items-center gap-4">
              <button 
                type="button" 
                onClick={resetForm} 
                disabled={isSubmitting} 
                className="px-6 py-3 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-xl transition-all duration-200 font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <motion.button
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                onClick={handleFormSubmit}
                disabled={isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {editingEvent ? "Updating..." : "Creating..."}
                  </>
                ) : editingEvent ? (
                  <>
                    <Edit className="w-4 h-4" /> Update Event
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" /> Create Event
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DialogueBox;