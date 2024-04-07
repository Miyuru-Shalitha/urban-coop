import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between h-16 bg-transparent backdrop-blur-lg">
      <div className="flex items-center">
       
          <img src="company-logo-url" alt="Company Logo" className="w-10 h-10 rounded-full ml-4" />
          </div>
          <ul className="flex items-center">
            <li className="mr-6">
              <a href="#home" className="text-white hover:text-amber-500">
                Home
              </a>
            </li>
            <li className="mr-6">
              <a href="#feedback" className="text-white hover:text-amber-500">
                Feedback
              </a>
            </li>
            <li className="mr-6">
              <a href="#services" className="text-white hover:text-amber-500">
                Services
              </a>
            </li>
            <li>
              <a href="#about-us" className="text-white hover:text-amber-500">
                About Us
              </a>
            </li>
          </ul>
         
         <div className="flex items-center">
        <div className="flex flex-col mr-4  ">
          <span className="text-white font-semibold">User Name</span>
          <span className="text-white text-sm">User Email</span>
        </div>
     
      <img src="user-profile-image-url" alt="User Profile" className="w-10 h-10 rounded-full mr-4" />
        </div>
    </nav>
  );
};

export default Navbar;