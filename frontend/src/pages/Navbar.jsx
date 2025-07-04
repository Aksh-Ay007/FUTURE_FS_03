import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import { removeCaptain } from '../utils/captainSlice';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  
  const user = useSelector((state) => state.user);
  const captain = useSelector((state) => state.captain);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Determine current user (either user or captain)
  const currentUser = user || captain;
  const isCaptain = Boolean(captain);

  // Handle display name properly for both user and captain
  const getDisplayName = () => {
    if (!currentUser) return '';
    
    if (currentUser.firstName && currentUser.lastName) {
      return `${currentUser.firstName} ${currentUser.lastName}`;
    }
    if (currentUser.firstName) {
      return currentUser.firstName;
    }
    if (currentUser.name) {
      return currentUser.name;
    }
    return isCaptain ? 'Captain' : 'User';
  };

  // Get avatar initial
  const getAvatarInitial = () => {
    if (!currentUser) return isCaptain ? 'C' : 'U';
    
    if (currentUser.firstName) {
      return currentUser.firstName.charAt(0).toUpperCase();
    }
    if (currentUser.name) {
      return currentUser.name.charAt(0).toUpperCase();
    }
    return isCaptain ? 'C' : 'U';
  };

  const displayName = getDisplayName();
  const avatarInitial = getAvatarInitial();

  const handleLogout = async () => {
    try {
      const logoutEndpoint = isCaptain ? '/captain/logout' : '/logout';
      await axios.post(
        BASE_URL + logoutEndpoint,
        null,
        { withCredentials: true }
      );
      
      if (isCaptain) {
        dispatch(removeCaptain());
        navigate('/captain/login');
      } else {
        dispatch(removeUser());
        navigate('/login');
      }
      
      setIsProfileDropdownOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <>
      <nav className="bg-black text-white px-4 py-3 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold">
              <span className="text-white">Uber</span>
            </Link>
          </div>

          {/* Center - Services Button */}
          <div className="hidden md:flex items-center">
            <button 
              onClick={toggleModal}
              className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2"
            >
              <span>Services</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Right side - User Profile or Login/Signup */}
          <div className="flex items-center space-x-4">
            {currentUser ? (
              /* User/Captain is logged in */
              <div className="relative">
                <button 
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-3 text-white hover:text-gray-300 transition-colors duration-200"
                >
                  <div className={`w-8 h-8 ${isCaptain ? 'bg-yellow-600' : 'bg-gray-600'} rounded-full flex items-center justify-center`}>
                    <span className="text-sm font-medium">
                      {avatarInitial}
                    </span>
                  </div>
                  <div className="hidden sm:block">
                    <span className="block text-sm">{displayName}</span>
                    {isCaptain && (
                      <span className="block text-xs text-yellow-400">Captain</span>
                    )}
                  </div>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{displayName}</p>
                      <p className="text-sm text-gray-500">{currentUser.email}</p>
                      {isCaptain && (
                        <span className="inline-block mt-1 px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                          Captain
                        </span>
                      )}
                    </div>
                    
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      Profile Settings
                    </Link>
                    
                    {isCaptain ? (
                      <>
                        <Link 
                          to="/captain-feed" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <Link 
                          to="/captain/earnings" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          Earnings
                        </Link>
                        <Link 
                          to="/captain/trips" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          Trip History
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link 
                          to="/rides" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          Your Rides
                        </Link>
                      </>
                    )}
                    
                    <Link 
                      to="/help" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      Help
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* User is not logged in */
              <>
                <Link 
                  to="/login" 
                  className="text-white hover:text-gray-300 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-gray-800"
                >
                  Login
                </Link>
                
                <Link 
                  to="/signup" 
                  className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
                >
                  Sign up
                </Link>
              </>
            )}

            {/* Mobile menu button */}
            <button 
              onClick={toggleModal}
              className="md:hidden text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Services Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Services</h2>
              <button 
                onClick={toggleModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-3">
              <Link 
                to="/" 
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                onClick={toggleModal}
              >
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Rider</h3>
                  <p className="text-sm text-gray-500">Book a ride</p>
                </div>
              </Link>

              <Link 
                to="/captain/login" 
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                onClick={toggleModal}
              >
                <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Captain</h3>
                  <p className="text-sm text-gray-500">Drive and earn</p>
                </div>
              </Link>

              <Link 
                to="/help" 
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                onClick={toggleModal}
              >
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Help</h3>
                  <p className="text-sm text-gray-500">Get support</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close dropdowns */}
      {(isProfileDropdownOpen || isModalOpen) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setIsProfileDropdownOpen(false);
            setIsModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default Navbar;