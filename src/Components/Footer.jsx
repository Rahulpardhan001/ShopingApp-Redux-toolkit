import React from 'react';
import { BiLogoPlayStore } from "react-icons/bi";
import { RiAppStoreFill } from "react-icons/ri";
function Footer() {
  return (
    <>
      <footer className="bg-black  text-white pb-10">
        <div className="container p-1">
          {/* Responsive grid: 1 column on small screens, 4 columns on large screens */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 mb-12 border"> */}
          <div className="flex flex-col justify-evenly sm:flex-col md:flex-row gap-5 p-5">
            
            {/* Column 1: App Download Section */}
            <div className="fot-col1  p-2 ">
              <h3 className="pb-2 text-lg font-semibold">Download Our App</h3>
              <p className="pb-2">Download our app for Android or iOS mobile phones.</p>
              <div className="app-logo flex gap-5">
                <BiLogoPlayStore className='text-2xl' />
                <RiAppStoreFill className='text-2xl' />
              </div>
            </div>

            {/* Column 2: Logo and Info Section */}
            <div className="fot-col2 p-2  ">
              <img className="w-32 mb-4" src="../src/assets/im/logo-white.png" alt="Red store" />
              <p className="text-sm">
                Our purpose is to sustainably make the pleasure and benefits of sports accessible to the many.
              </p>
            </div>

            {/* Column 3: Useful Links Section */}
            <div className="fot-col3 p-2 ">
              <h3 className="text-lg font-semibold pb-2">Useful Links</h3>
              <ul className="space-y-2">
                <li className="hover:text-gray-400 transition">Coupons</li>
                <li className="hover:text-gray-400 transition">Blog Post</li>
                <li className="hover:text-gray-400 transition">Return Policy</li>
                <li className="hover:text-gray-400 transition">Join Affiliate</li>
              </ul>
            </div>

            {/* Column 4: Follow Us Section */}
            <div className="fot-col4 p-2  ">
              <h3 className="text-lg font-semibold pb-2">Follow Us</h3>
              <ul className="space-y-2">
                <li className="flex items-center hover:text-gray-400 transition">
                  <i className="fa-brands fa-facebook-f pe-2" />
                  Facebook
                </li>
                <li className="flex items-center hover:text-gray-400 transition">
                  <i className="fa-brands fa-instagram pe-2" />
                  Instagram
                </li>
                <li className="flex items-center hover:text-gray-400 transition">
                  <i className="fa-brands fa-youtube pe-2" />
                  YouTube
                </li>
                <li className="flex items-center hover:text-gray-400 transition">
                  <i className="fa-brands fa-twitter pe-2" />
                  Twitter
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-700" />
          
          {/* Copyright Section */}
          <p className="text-center mt-4">
            &copy; {new Date().getFullYear()}- www.Redstore.com
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
