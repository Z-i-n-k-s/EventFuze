// ========== LOGIN.JS ==========
import { useContext, useState } from 'react';
import { Eye, EyeOff, User, Lock, Facebook, Twitter, Chrome, Linkedin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SummaryApi from '../../common';
import Context from '../../context';
import loginIcons from '../../assest/signin.gif';
import logImg from "../../assest/signLog/log.svg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: 'include',
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    });
    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate('/');
      fetchUserDetails();
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Animated Background Circle - Changed to green gradient */}
      <div className="absolute w-[2000px] h-[2000px] rounded-full bg-gradient-to-r from-green-900 to-emerald-400 transition-all duration-[1800ms] ease-in-out z-10 top-[-10%] right-[48%] -translate-y-1/2" />

      {/* Forms Container */}
      <div className="absolute w-full h-full top-0 left-0">
        <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-1/2 transition-all duration-1000 ease-in-out delay-700 grid grid-cols-1 z-20">
          
          {/* Sign In Form */}
          <form 
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center px-20 py-8 transition-all duration-200 delay-700 overflow-hidden col-start-1 col-end-2 row-start-1 row-end-2 z-20"
          >
            <h2 className="text-4xl text-gray-700 dark:text-white mb-6">Sign in</h2>
            
            <div className="max-w-sm w-full bg-gray-100 dark:bg-slate-800 my-3 h-14 rounded-full grid grid-cols-[15%_85%] px-2 relative">
              <User className="text-gray-400 dark:text-gray-300 transition-all duration-500 text-lg self-center justify-self-center" />
              <input
                type="email"
                placeholder="Enter email"
                name="email"
                value={data.email}
                onChange={handleOnChange}
                className="bg-transparent outline-none border-none leading-tight font-semibold text-lg text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
              />
            </div>

            <div className="max-w-sm w-full bg-gray-100 dark:bg-slate-800 my-3 h-14 rounded-full grid grid-cols-[15%_75%_10%] px-2 relative">
              <Lock className="text-gray-400 dark:text-gray-300 transition-all duration-500 text-lg self-center justify-self-center" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                name="password"
                value={data.password}
                onChange={handleOnChange}
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

            <button
              type="submit"
              className="w-36 bg-green-500 border-none outline-none h-12 rounded-full text-black dark:text-white uppercase font-semibold my-3 cursor-pointer transition-all duration-500 hover:bg-green-600 dark:hover:bg-green-600"
            >
              Login
            </button>

            <p className="py-3 text-base dark:text-gray-300">Or Sign in with social platforms</p>
            <div className="flex justify-center mb-4">
              <a href="#" className="h-12 w-12 flex justify-center items-center mx-2 text-gray-800 dark:text-gray-300 rounded-full border border-gray-800 dark:border-gray-300 no-underline text-lg transition-all duration-300 hover:text-blue-500 hover:border-blue-500 dark:hover:text-blue-400 dark:hover:border-blue-400">
                <Facebook size={18} />
              </a>
              <a href="#" className="h-12 w-12 flex justify-center items-center mx-2 text-gray-800 dark:text-gray-300 rounded-full border border-gray-800 dark:border-gray-300 no-underline text-lg transition-all duration-300 hover:text-blue-500 hover:border-blue-500 dark:hover:text-blue-400 dark:hover:border-blue-400">
                <Twitter size={18} />
              </a>
              <a href="#" className="h-12 w-12 flex justify-center items-center mx-2 text-gray-800 dark:text-gray-300 rounded-full border border-gray-800 dark:border-gray-300 no-underline text-lg transition-all duration-300 hover:text-blue-500 hover:border-blue-500 dark:hover:text-blue-400 dark:hover:border-blue-400">
                <Chrome size={18} />
              </a>
              <a href="#" className="h-12 w-12 flex justify-center items-center mx-2 text-gray-800 dark:text-gray-300 rounded-full border border-gray-800 dark:border-gray-300 no-underline text-lg transition-all duration-300 hover:text-blue-500 hover:border-blue-500 dark:hover:text-blue-400 dark:hover:border-blue-400">
                <Linkedin size={18} />
              </a>
            </div>

            <div className="text-center text-gray-600 dark:text-gray-300">
              <Link to="/forgot-password" className="text-blue-600 dark:text-blue-400 hover:underline">
                Forgot password?
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Left Panel - Green background */}
      <div className="absolute h-full w-full top-0 left-0 grid grid-cols-2 z-10">
        <div className="flex flex-col items-end justify-center text-center z-10 pointer-events-auto py-12 px-[17%] pr-[12%]">
          <div className="text-white transition-transform duration-900 ease-in-out delay-600 mb-8">
            <h3 className="font-semibold leading-tight text-2xl mb-4">New here?</h3>
            <p className="text-base py-3 mb-4">
              Join our community and discover amazing features waiting for you!
            </p>
            <Link
              to="/sign-up"
              className="inline-block m-0 bg-transparent border-2 border-white w-32 h-10 font-semibold text-sm text-white rounded-full transition-all duration-300 hover:bg-white hover:text-green-700 leading-10 text-center no-underline"
            >
              Sign up
            </Link>
          </div>
          <img
            src={logImg}
            className="w-full max-w-md transition-transform duration-1100 ease-in-out delay-400"
            alt="Login illustration"
          />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Login;