import { ReactNode, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

type AuthLayoutProps = {
  children: ReactNode;
  isLoginPage?: boolean;
};

const AuthLayout = ({ children, isLoginPage = true }: AuthLayoutProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(isLoginPage ? 'login' : 'signup');

  const handleTabChange = (tab: 'login' | 'signup') => {
    setActiveTab(tab);
    navigate(tab === 'login' ? '/login' : '/signup');
  };

  return (
    <div className="auth-container w-full min-h-screen flex flex-col md:flex-row bg-white shadow-lg">
      {/* Mobile header with decorative background - only visible on small screens */}
      <div className="md:hidden w-full h-40 relative overflow-hidden bg-gradient-to-r from-pink-300 to-pink-400 flex items-center justify-center">
        <div className="z-10 text-center p-4">
          <div className="text-white font-bold text-3xl mb-1 animate-[float_6s_ease-in-out_infinite]">
            Welcome
          </div>
          <p className="text-white opacity-80">Your journey starts here</p>
        </div>
        
        {/* Mobile decorative elements */}
        <div className="absolute w-32 h-32 -top-10 -left-10 rounded-full bg-pink-200 opacity-30 animate-[float_6s_ease-in-out_infinite]"></div>
        <div className="absolute w-24 h-24 bottom-5 right-5 rounded-full bg-pink-200 opacity-20 animate-[float_6s_ease-in-out_infinite_1s]"></div>
      </div>
      
      {/* Left side - Decorative area - hidden on small screens */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-pink-300 to-pink-400 flex-col items-center justify-center">
        <div className="z-10 text-center p-6">
          <div className="text-white font-bold text-3xl mb-2 animate-[float_6s_ease-in-out_infinite]">
            Welcome
          </div>
          <p className="text-white opacity-80">Your journey starts here</p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute w-64 h-64 -top-20 -left-20 rounded-full bg-pink-200 opacity-30 animate-[float_6s_ease-in-out_infinite]"></div>
        <div className="absolute w-40 h-40 bottom-10 right-10 rounded-full bg-pink-200 opacity-20 animate-[float_6s_ease-in-out_infinite_1s]"></div>
        <div className="absolute w-72 h-72 bottom-40 -left-20 rounded-full bg-pink-200 opacity-20 animate-[float_6s_ease-in-out_infinite_2s]"></div>
        
        {/* Illustration */}
        <div className="absolute inset-0 flex items-center justify-center opacity-50">
          <svg className="w-3/4 h-3/4 text-white" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M50.8,-70.2C66.5,-62.9,80.3,-47.8,85.9,-30.2C91.5,-12.6,88.8,7.4,81.5,24.8C74.2,42.1,62.3,56.8,47.1,65.3C31.9,73.9,13.4,76.3,-3.7,81C-20.8,85.6,-36.4,92.6,-51.6,87.8C-66.7,83,-81.3,66.5,-87.1,48.1C-92.9,29.7,-89.9,9.6,-85.1,-9.9C-80.3,-29.3,-73.6,-48.1,-60.5,-56.7C-47.4,-65.3,-27.9,-63.8,-9.8,-65.8C8.3,-67.8,35.2,-77.5,50.8,-70.2Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>
      
      {/* Right side - Authentication forms */}
      <div className="w-full md:w-1/2 bg-white flex flex-col p-5 sm:p-6 md:p-12 lg:p-16 justify-center">
        <div className="w-full flex flex-col max-w-[450px] mx-auto">
          {/* Tabs for switching between login and signup */}
          <div className="mb-6 md:mb-10 flex space-x-4 md:space-x-6 border-b border-gray-200">
            <button 
              onClick={() => handleTabChange('login')}
              className={`py-2 md:py-3 font-medium text-base md:text-lg transition-colors ${
                activeTab === 'login' 
                  ? 'text-pink-600 border-b-2 border-pink-600' 
                  : 'text-gray-500'
              }`}
            >
              Login
            </button>
            <button 
              onClick={() => handleTabChange('signup')}
              className={`py-2 md:py-3 font-medium text-base md:text-lg transition-colors ${
                activeTab === 'signup' 
                  ? 'text-pink-600 border-b-2 border-pink-600' 
                  : 'text-gray-500'
              }`}
            >
              Sign Up
            </button>
          </div>
          
          {children}
          
          {/* Toggle between login and signup */}
          <div className="w-full flex items-center justify-center mt-6 md:mt-10">
            {activeTab === 'login' ? (
              <p className="text-sm font-normal text-gray-600">
                Don't have an account? <Link to="/signup"><span className="font-semibold text-pink-600 cursor-pointer hover:underline">Sign Up</span></Link>
              </p>
            ) : (
              <p className="text-sm font-normal text-gray-600">
                Already have an account? <Link to="/login"><span className="font-semibold text-pink-600 cursor-pointer hover:underline">Log In</span></Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;