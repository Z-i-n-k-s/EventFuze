import React from "react";
import Logo from "./Logo";
import { Users, Calendar, Trophy, BookOpen, ArrowRight, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  // Mock data for university club stats
  const totalMembers = 1247;
  const activeClubs = 15;
  const upcomingEvents = 8;
  const achievements = 23;

  return (
    <footer className="bg-gray-300 dark:bg-slate-800">

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* University & Logo Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Logo w={120} h={40} />
            </div>
            <h3 className="text-lg font-bold text-black dark:text-white mb-2">
              University Club Management
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Connecting students, fostering growth, and building communities through diverse club activities and meaningful experiences.
            </p>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <Mail size={14} className="text-gray-500 dark:text-gray-400" />
                clubs@university.edu
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <Phone size={14} className="text-gray-500 dark:text-gray-400" />
                +1 (555) 123-4567
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <MapPin size={14} className="text-gray-500 dark:text-gray-400" />
                Student Center, Room 201
              </div>
            </div>
          </div>

          {/* Club Statistics */}
          <div className="lg:col-span-3">
            <h4 className="text-lg font-semibold text-black dark:text-white mb-6">Club Overview</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">

              {/* Total Members */}
              <div className="bg-blue-50 dark:bg-slate-600 border border-blue-200 dark:border-slate-500 rounded-xl p-4 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 dark:bg-slate-500 rounded-lg group-hover:scale-110 transition-transform">
                    <Users size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-200 text-sm font-medium">Total Members</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{totalMembers.toLocaleString()}</p>
                <p className="text-blue-600 dark:text-blue-400 text-xs">Active students</p>
              </div>

              {/* Active Clubs */}
              <div className="bg-emerald-50 dark:bg-slate-600 border border-emerald-200 dark:border-slate-500 rounded-xl p-4 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-emerald-100 dark:bg-slate-500 rounded-lg group-hover:scale-110 transition-transform">
                    <BookOpen size={20} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-200 text-sm font-medium">Active Clubs</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{activeClubs}</p>
                <p className="text-emerald-600 dark:text-emerald-400 text-xs">Running this semester</p>
              </div>

              {/* Upcoming Events */}
              <div className="bg-purple-50 dark:bg-slate-600 border border-purple-200 dark:border-slate-500 rounded-xl p-4 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-100 dark:bg-slate-500 rounded-lg group-hover:scale-110 transition-transform">
                    <Calendar size={20} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-200 text-sm font-medium">Upcoming Events</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{upcomingEvents}</p>
                <p className="text-purple-600 dark:text-purple-400 text-xs">Next 30 days</p>
              </div>

              {/* Achievements */}
              <div className="bg-orange-50 dark:bg-slate-600 border border-orange-200 dark:border-slate-500 rounded-xl p-4 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 dark:bg-slate-500 rounded-lg group-hover:scale-110 transition-transform">
                      <Trophy size={20} className="text-orange-600 dark:text-orange-400" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-200 text-sm font-medium">Achievements</span>
                  </div>
                  <ArrowRight size={16} className="text-orange-500 dark:text-orange-400 opacity-60 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{achievements}</p>
                <p className="text-orange-600 dark:text-orange-400 text-xs">This academic year</p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {["Clubs","Events","Resources","Support"].map((section) => (
                <div key={section}>
                  <h5 className="font-semibold text-black dark:text-white mb-3">{section}</h5>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Link 1</a></li>
                    <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Link 2</a></li>
                    <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Link 3</a></li>
                    <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Link 4</a></li>
                  </ul>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className=" dark:border-slate-600 bg-gray-20 dark:bg-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            &copy; {new Date().getFullYear()} University Club Management System. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Student Code</a>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-gray-500 dark:text-gray-400">System Status: Online</span>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
