import React from "react";
import Navbar from "../components/Navbar";

const services = [
  { name: "Cleaning", icon: "✨", color: "text-purple-500" },
  { name: "Repair", icon: "🔧", color: "text-yellow-500" },
  { name: "Painting", icon: "🖌️", color: "text-green-500" },
  { name: "Shifting", icon: "🚚", color: "text-red-500" },
  { name: "Plumbing", icon: "🔧", color: "text-orange-500" },
  { name: "Electric", icon: "⚡", color: "text-blue-500" },
];

const businesses = [
  {
    category: "Cleaning",
    title: "House Cleaning",
    name: "Jenny Wilson",
    address: "255 Grand Park Ave, New York",
    image: "https://via.placeholder.com/300",
  },
  {
    category: "Cleaning",
    title: "Washing Cloths",
    name: "Emma Potter",
    address: "525 N Tyron Street, New York",
    image: "https://via.placeholder.com/300",
  },
  {
    category: "Repair",
    title: "House Repairing",
    name: "Ronaldo Epric",
    address: "412 N Tyron Street, New York",
    image: "https://via.placeholder.com/300",
  },
  {
    category: "Cleaning",
    title: "Bathroom Cleaning",
    name: "Henny Wilson",
    address: "525 N Tyron Street, NC",
    image: "https://via.placeholder.com/300",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="text-center py-8 md:py-16 lg:py-20 px-4 animate-fadeIn">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          Find Home <span className="text-pink-600">Service/Repair</span>
          <br className="hidden sm:block" /> Near You
        </h2>
        <p className="text-gray-500 mt-4 text-sm md:text-base">
          Explore Best Home Service & Repair near you
        </p>
        
        {/* Search Bar */}
        <div className="flex justify-center mt-6 px-4 md:px-0">
          <div className="relative w-full max-w-md md:max-w-lg lg:max-w-xl">
            <input
              type="text"
              placeholder="Search for services..."
              className="w-full p-3 md:p-4 border rounded-l-lg outline-none transition-all focus:ring-2 focus:ring-pink-500 text-sm md:text-base pr-12"
            />
            <button className="absolute right-0 top-0 h-full bg-pink-600 text-white px-4 md:px-6 rounded-r-lg hover:bg-pink-700 transition-all text-lg justify-center">
              🔍
            </button>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="px-4 md:px-8 lg:px-16 mt-8 md:mt-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
          {services.map((service) => (
            <div
              key={service.name}
              className="flex flex-col items-center p-4 md:p-6 border rounded-lg shadow-sm hover:shadow-lg transform hover:scale-105 transition-all bg-white cursor-pointer"
              onClick={() => alert(`You clicked on ${service.name}`)}
            >
              <span className={`text-3xl md:text-4xl ${service.color} flex items-center justify-center w-12 h-12`}>
                {service.icon}
              </span>
              <p className="mt-2 font-medium text-sm md:text-base text-center">
                {service.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Business Section */}
      <div className="px-4 md:px-8 lg:px-16 mt-12 pb-16">
        <h3 className="text-xl md:text-2xl font-bold mb-6">Popular Business</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {businesses.map((business, index) => (
            <div 
              key={index}
              className="border rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:shadow-lg hover:-translate-y-2 bg-white"
            >
              <img
                src={business.image}
                alt={business.title}
                className="w-full h-48 md:h-52 object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <span className="text-xs md:text-sm bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
                  {business.category}
                </span>
                <h4 className="text-base md:text-lg font-semibold mt-2">
                  {business.title}
                </h4>
                <p className="text-pink-600 text-sm md:text-base">
                  {business.name}
                </p>
                <p className="text-gray-500 text-xs md:text-sm mt-1">
                  {business.address}
                </p>
                <button
                  className="mt-3 bg-pink-600 text-white px-4 py-2 rounded-lg w-full hover:bg-pink-700 transition-all text-sm md:text-base"
                  onClick={() => alert(`You tried to book service ${business.title}`)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
