// ========== SIGNUP.JS ==========
import { useState } from "react";
import { Eye, EyeOff, User, Lock, Mail, Facebook, Twitter, Chrome, Linkedin } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryApi from "../../common";
import imageTobase64 from "../../helpers/imageTobase64";
import loginIcons from "../../assest/hello.gif";
import signup from "../../assest/signLog/reg.svg";

const SignUP = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const imagePic = await imageTobase64(file);
      setData((prev) => ({ ...prev, profilePic: imagePic }));
    } catch (err) {
      console.error("Error converting image to base64:", err);
      toast.error("Failed to upload image. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error("Please check password and confirm password");
      return;
    }

    try {
      const response = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        navigate("/login");
      }

      if (result.error) {
        toast.error(result.message);
      }
    } catch (err) {
      console.error("Error submitting signup form:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Animated Background Circle - Changed to green gradient */}
      <div className="absolute w-[2000px] h-[2000px] rounded-full bg-gradient-to-r from-emerald-400 to-green-800 transition-all duration-[1800ms] ease-in-out z-10 top-[-10%] right-[52%] translate-x-full -translate-y-1/2" />

     {/* Forms Container */}
<div className="absolute w-full h-full top-0 left-0">
  <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-1/2 max-h-[90%] overflow-y-auto transition-all duration-1000 ease-in-out delay-700 grid grid-cols-1 z-20">
    
    {/* Sign Up Form */}
    <form 
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center px-12 py-6 transition-all duration-200 delay-700 overflow-hidden col-start-1 col-end-2 row-start-1 row-end-2 z-20"
    >
      <h2 className="text-4xl text-gray-700 dark:text-white mb-4">Sign up</h2>

      {/* Profile Picture */}
      <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full shadow-md border-2 border-white dark:border-slate-700 cursor-pointer mb-4">
        <label className="absolute inset-0 cursor-pointer">
          <img
            src={data.profilePic || loginIcons}
            alt="profile"
            className="w-full h-full object-cover hover:opacity-80 transition-opacity"
          />
          <input type="file" className="hidden" onChange={handleUploadPic} />
        </label>
      </div>

      {/* Name Input */}
      <div className="max-w-sm w-full bg-gray-100 dark:bg-slate-800 my-2 h-12 rounded-full grid grid-cols-[15%_85%] px-2 relative">
        <User className="text-gray-400 dark:text-gray-300 transition-all duration-500 text-lg self-center justify-self-center" />
        <input
          type="text"
          placeholder="Enter your name"
          name="name"
          value={data.name}
          onChange={handleOnChange}
          required
          className="bg-transparent outline-none border-none leading-tight font-semibold text-lg text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
        />
      </div>

      {/* Email Input */}
      <div className="max-w-sm w-full bg-gray-100 dark:bg-slate-800 my-2 h-12 rounded-full grid grid-cols-[15%_85%] px-2 relative">
        <Mail className="text-gray-400 dark:text-gray-300 transition-all duration-500 text-lg self-center justify-self-center" />
        <input
          type="email"
          placeholder="Enter email"
          name="email"
          value={data.email}
          onChange={handleOnChange}
          required
          className="bg-transparent outline-none border-none leading-tight font-semibold text-lg text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
        />
      </div>

      {/* Password */}
      <div className="max-w-sm w-full bg-gray-100 dark:bg-slate-800 my-2 h-12 rounded-full grid grid-cols-[15%_75%_10%] px-2 relative">
        <Lock className="text-gray-400 dark:text-gray-300 transition-all duration-500 text-lg self-center justify-self-center" />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          name="password"
          value={data.password}
          onChange={handleOnChange}
          required
          className="bg-transparent outline-none border-none leading-tight font-semibold text-lg text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white self-center justify-self-center"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Confirm Password */}
      <div className="max-w-sm w-full bg-gray-100 dark:bg-slate-800 my-2 h-12 rounded-full grid grid-cols-[15%_75%_10%] px-2 relative">
        <Lock className="text-gray-400 dark:text-gray-300 transition-all duration-500 text-lg self-center justify-self-center" />
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm password"
          name="confirmPassword"
          value={data.confirmPassword}
          onChange={handleOnChange}
          required
          className="bg-transparent outline-none border-none leading-tight font-semibold text-lg text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white self-center justify-self-center"
        >
          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <button
        type="submit"
        className="w-36 bg-green-500 border-none outline-none h-10 rounded-full text-black dark:text-white uppercase font-semibold my-2 cursor-pointer transition-all duration-500 hover:bg-green-600 dark:hover:bg-green-600"
      >
        Sign up
      </button>

      <p className="py-2 text-sm dark:text-gray-300">Or Sign up with social platforms</p>
      <div className="flex justify-center mb-2">
        {/* Social buttons unchanged */}
      </div>
    </form>
  </div>
</div>


      {/* Right Panel */}
      <div className="absolute h-full w-full top-0 left-0 grid grid-cols-2 z-10">
        <div></div>
        <div className="flex flex-col items-end justify-center text-center z-10 pointer-events-auto py-12 px-[12%] pr-[17%]">
          <div className="text-white transition-transform duration-900 ease-in-out delay-600 mb-8">
            <h3 className="font-semibold leading-tight text-2xl mb-4">One of us?</h3>
            <p className="text-base py-3 mb-4">
              Welcome back! Sign in to access your account and continue your journey.
            </p>
            <Link
              to="/login"
              className="inline-block m-0 bg-transparent border-2 border-white w-32 h-10 font-semibold text-sm text-white rounded-full transition-all duration-300 hover:bg-white hover:text-green-700 leading-10 text-center no-underline"
            >
              Sign in
            </Link>
          </div>
          <img
            src={signup}
            className="w-full max-w-md transition-transform duration-1100 ease-in-out delay-400"
            alt="Signup illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUP;