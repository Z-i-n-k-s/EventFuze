import React, { useState, useEffect } from "react";
import { X, Mail } from "lucide-react";
import { useSelector } from "react-redux"; // ✅ import here
import SummaryApi from "../../common";
import { toast } from "react-toastify";

const JoinForm = () => {
  const user = useSelector((state) => state?.user?.user); // ✅ get user
  const [selectedClubId, setSelectedClubId] = useState("");
  const [email, setEmail] = useState(user?.email || ""); // ✅ pre-fill email
  const [clubs, setClubs] = useState([]);
  const [modal, setModal] = useState({ type: "", message: "", open: false });
  const [loading, setLoading] = useState(false);

  // Keep email updated if user changes (in case of re-login or state refresh)
  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);

  // Fetch clubs from backend
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
        } else {
          toast.error(data.message || "Failed to fetch clubs");
        }
      } catch (err) {
        toast.error("Error fetching clubs");
      }
    };

    fetchClubs();
  }, []);

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  if (!selectedClubId || !email) {
    setModal({
      type: "error",
      message: "Please select a club and provide your email address.",
      open: true,
    });
    setLoading(false);
    return;
  }

  // ✅ Check if user already joined this club
  const alreadyJoined = user?.clubs?.some(
    (c) => c.clubId === selectedClubId
  );
  if (alreadyJoined) {
    setModal({
      type: "info", // can be "error" if you prefer red style
      message: "You are already a member of this club.",
      open: true,
    });
    setLoading(false);
    return;
  }

  try {
    const selectedClub = clubs.find((club) => club._id === selectedClubId);

    const response = await fetch(SummaryApi.joinClub.url, {
      method: SummaryApi.joinClub.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clubId: selectedClubId,
        email: email,
      }),
    });

    const data = await response.json();

    if (data.success) {
      setModal({
        type: "success",
        message: `You have successfully joined ${selectedClub.name}! We'll contact you at ${email} with more details.`,
        open: true,
      });
      setSelectedClubId("");
    } else {
      setModal({
        type: "error",
        message: data.message || "Failed to join club. Please try again.",
        open: true,
      });
    }
  } catch (err) {
    setModal({
      type: "error",
      message: "Something went wrong. Please try again.",
      open: true,
    });
  } finally {
    setLoading(false);
  }
};


  const selectedClub = clubs.find((club) => club._id === selectedClubId);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">
          Join Our Club
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Club Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Which club would you like to join?
            </label>
            <select
              value={selectedClubId}
              onChange={(e) => setSelectedClubId(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              disabled={loading}
            >
              <option value="">Select a club</option>
              {clubs.map((club) => (
                <option key={club._id} value={club._id}>
                  {club.name}
                </option>
              ))}
            </select>
          </div>

          {/* Email (pre-filled from Redux user) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                readOnly // ✅ make it uneditable
                className="w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-gray-400 cursor-not-allowed focus:outline-none"
              />
            </div>
          </div>

          {/* Club Preview */}
          {selectedClub && (
            <div className="p-4 bg-gray-100 dark:bg-slate-700 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">{selectedClub.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                {selectedClub.description}
              </p>
              {selectedClub.images && selectedClub.images.length > 0 && (
                <img
                  src={selectedClub.images[0]}
                  alt={selectedClub.name}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Admin: {selectedClub.adminName}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !selectedClubId}
            className={`w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all duration-300 ${
              loading || !selectedClubId ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Joining..." : "Join Club"}
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
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModal({ ...modal, open: false })}
              className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-green-500"
              disabled={loading}
            >
              <X className="h-6 w-6" />
            </button>
            <div className="text-center">
             <h3
  className={`text-xl font-semibold mb-3 ${
    modal.type === "success"
      ? "text-green-600"
      : modal.type === "info"
      ? "text-yellow-600"
      : "text-red-600"
  }`}
>
  {modal.type === "success"
    ? "Success!"
    : modal.type === "info"
    ? "Notice"
    : "Oops!"}
</h3>

              <p className="text-gray-700 dark:text-gray-200 mb-4">
                {modal.message}
              </p>
              {modal.type === "success" && (
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Welcome to our community! Club meetings and events information will be sent to you shortly.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinForm;
