import React from "react";
import Logo from "./Logo";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-300 dark:bg-slate-800 transition-colors duration-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Logo & About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Logo w={120} h={40} />
            </div>
            <h3 className="text-lg font-bold text-black dark:text-white mb-2">
              University Club Management
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              Connecting students, fostering growth, and building communities 
              through diverse club activities and meaningful experiences.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-black dark:text-white mb-3">
              Contact Us
            </h4>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-gray-500 dark:text-gray-400" />
                clubs@university.edu
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-gray-500 dark:text-gray-400" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-500 dark:text-gray-400" />
                Student Center, Room 201
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-black dark:text-white mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li><a href="#" className="hover:text-black dark:hover:text-white">Clubs</a></li>
              <li><a href="#" className="hover:text-black dark:hover:text-white">Events</a></li>
              <li><a href="#" className="hover:text-black dark:hover:text-white">Resources</a></li>
              <li><a href="#" className="hover:text-black dark:hover:text-white">Support</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-400 dark:border-slate-600">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-sm text-gray-600 dark:text-gray-300 text-center md:text-left">
            &copy; {new Date().getFullYear()} All rights reserved | Powered by{" "}
            <span className="font-semibold text-black dark:text-white">@Astrox</span>
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-black dark:hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-black dark:hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
