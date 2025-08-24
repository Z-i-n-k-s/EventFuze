import React, { useState, useEffect } from "react";
import { FaWindowClose } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";

const DisplayUserDetails = ({ name, email, role, onClose, profilePic }) => {
  const [imgError, setImgError] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    // Save the current scroll position
    const scrollY = window.scrollY;
    
    // Add styles to prevent scrolling
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    
    // Cleanup function to restore scrolling when modal closes
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
      <div className="relative bg-white dark:bg-slate-800 shadow-xl p-6 w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-700 max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200 z-10"
          onClick={onClose}
        >
          <FaWindowClose size={24} />
        </button>
        
        <h1 className="pb-4 text-2xl font-semibold text-center text-slate-800 dark:text-slate-200">
          User Details
        </h1>
        
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg mb-6">
            {imgError || !profilePic ? (
              <FaUserLarge className="w-12 h-12 text-white" />
            ) : (
              <img
                src={profilePic}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
                onError={() => setImgError(true)}
              />
            )}
          </div>
          
          <div className="w-full space-y-4">
            <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-xl">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Name</p>
              <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">{name}</p>
            </div>
            
            <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-xl">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Email</p>
              <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">{email}</p>
            </div>
            
            <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-xl">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Role</p>
              <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">{role}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="mt-8 w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisplayUserDetails;