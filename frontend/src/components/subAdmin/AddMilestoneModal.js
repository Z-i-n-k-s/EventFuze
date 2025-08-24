import React, { useState, useEffect } from "react";

const AddMilestoneModal = ({ onClose, onSave, milestone }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(""); // can be File or URL
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (milestone) {
      setTitle(milestone.title || "");
      setDescription(milestone.description || "");
      setDate(milestone.date ? milestone.date.slice(0, 10) : "");
      setImage(milestone.image || "");
      setPreview(milestone.image || "");
    } else {
      setTitle("");
      setDescription("");
      setDate("");
      setImage("");
      setPreview("");
    }
  }, [milestone]);

  // Handle image selection
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file); // File object
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImage("");
    setPreview("");
  };

  const handleSubmit = () => {
    if (!title || !date) {
      return alert("Title and Date are required");
    }
    onSave({ title, description, date, image });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md relative shadow-lg dark:shadow-slate-700 transition-colors duration-300">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {milestone ? "Edit Milestone" : "Add Milestone"}
        </h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg mb-3 outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-400"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg mb-3 outline-none resize-none bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-400"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg mb-3 outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-200"
        />

        <div className="mb-3">
          {preview && (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-48 object-cover rounded mb-2 shadow-sm dark:shadow-slate-700"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 hover:bg-red-600 transition"
              >
                X
              </button>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="text-gray-700 dark:text-gray-300"
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-slate-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-slate-500 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-500 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMilestoneModal;
