import React from "react";
import {
    FaEnvelope,
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaTwitter,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-secondary py-10">
      <div className="px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Website Logo and About */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-bold">FitFusion</h2>
            <p className="mt-2 text-sm text-center md:text-left">
              Your ultimate fitness companion. Join us to stay fit and achieve
              your health goals with expert trainers and engaging classes.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="flex flex-col gap-2">
              <NavLink
                to="/"
                className="hover:underline hover:text-white"
              >
                Home
              </NavLink>
              <NavLink
                to="/all-trainer"
                className="hover:underline hover:text-white"
              >
                All Trainers
              </NavLink>
              <NavLink
                to="/all-classes"
                className="hover:underline hover:text-white"
              >
                All Classes
              </NavLink>
              <NavLink
                to="/community"
                className="hover:underline hover:text-white"
              >
                Community
              </NavLink>
              <NavLink
                to="/dashboard"
                className="hover:underline hover:text-white"
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/profile"
                className="hover:underline hover:text-white"
              >
                Profile
              </NavLink>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
            <div className="flex items-center gap-2 mb-2">
              <FaPhoneAlt className="text-lg" />
              <span>+1 (123) 456-7890</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <FaEnvelope className="text-lg" />
              <span>info@fitfusion.com</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-lg" />
              <span>123 Fitness St, Wellness City, Fitland</span>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white text-primary rounded-full hover:bg-secondary hover:text-white"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white text-primary rounded-full hover:bg-secondary hover:text-white"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white text-primary rounded-full hover:bg-secondary hover:text-white"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white text-primary rounded-full hover:bg-secondary hover:text-white"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-secondary opacity-50"></div>

        {/* Bottom Section */}
        <div className="text-center text-sm">
          <p>© {new Date().getFullYear()} FitFusion. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
