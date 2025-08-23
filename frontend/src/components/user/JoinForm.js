import React, { useState } from "react";
import { X } from "lucide-react";

const JoinForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentId: "",
    semester: "",
    department: "",
    suggestions: "",
  });

  const [modal, setModal] = useState({ type: "", message: "", open: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.studentId ||
      !formData.semester ||
      !formData.department
    ) {
      setModal({
        type: "error",
        message: "Please fill all required fields.",
        open: true,
      });
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Success
      setModal({
        type: "success",
        message: "Registration successful!",
        open: true,
      });
      setFormData({
        name: "",
        email: "",
        studentId: "",
        semester: "",
        department: "",
        suggestions: "",
      });
    } catch (err) {
      setModal({
        type: "error",
        message: "Something went wrong. Try again.",
        open: true,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-xl bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">
          Join Our Club
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {["name", "email", "studentId", "semester", "department"].map(
            (field) => (
              <input
                key={field}
                type={field === "email" ? "email" : "text"}
                name={field}
                placeholder={field
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            )
          )}

          <textarea
            name="suggestions"
            placeholder="Any suggestions or comments"
            value={formData.suggestions}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={4}
          ></textarea>

          <button
            type="submit"
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all duration-300"
          >
            Join Club
          </button>
        </form>
      </div>

      {/* Modal */}
      {modal.open && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setModal({ ...modal, open: false })}
        >
          <div
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-sm w-full p-6 relative"
            onClick={(e) => e.stopPropagation()} // prevent closing modal when clicking inside
          >
            <button
              onClick={() => setModal({ ...modal, open: false })}
              className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-green-500"
            >
              <X className="h-6 w-6" />
            </button>
            <h3
              className={`text-lg font-semibold mb-2 ${
                modal.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {modal.type === "success" ? "Success!" : "Error!"}
            </h3>
            <p className="text-gray-700 dark:text-gray-200">{modal.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinForm;
