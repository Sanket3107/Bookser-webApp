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
    image: "https://via.placeholder.com/300", // Replace with actual image URL
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
      {/* Navbar */}
      <Navbar/>
      {/* Hero Section */}
      <div className="text-center py-20 animate-fadeIn">
        <h2 className="text-4xl font-bold">
          Find Home <span className="text-pink-600">Service/Repair</span>
          <br /> Near You
        </h2>
        <p className="text-gray-500 mt-4">
          Explore Best Home Service & Repair near you
        </p>
        <div className="flex justify-center mt-6">
          <input
            type="text"
            placeholder="Search"
            className="w-96 p-4 border rounded-l-lg outline-none transition-all focus:ring-2 focus:ring-pink-500"
          />
          <button className="bg-pink-600 text-white px-4 rounded-r-lg hover:bg-pink-700 transition-all">
            🔍
          </button>
        </div>
      </div>

      {/* Services */}
      <div className="flex justify-center space-x-6 mt-10">
        {services.map((service) => (
          <div
            key={service.name}
            className="flex flex-col items-center p-6 border rounded-lg shadow-sm hover:shadow-lg transform hover:scale-105 transition-all bg-white cursor-pointer w-32 h-32"
            onClick={() => alert(`You clicked on ${service.name}`)}
          >
            <span className={`text-4xl ${service.color} flex items-center justify-center w-12 h-12`}>{service.icon}</span>
            <p className="mt-2 font-medium text-lg">{service.name}</p>
          </div>
        ))}
      </div>

      {/* Popular Business Section */}
      <div className="px-10 mt-12">
        <h3 className="text-2xl font-bold">Popular Business</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {businesses.map((business, index) => (
            <div key={index} className="border rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:shadow-lg hover:-translate-y-2">
              <img src={business.image} alt={business.title} className="w-full h-52 object-cover" />
              <div className="p-4">
                <span className="text-sm bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
                  {business.category}
                </span>
                <h4 className="text-lg font-semibold mt-2">{business.title}</h4>
                <p className="text-pink-600">{business.name}</p>
                <p className="text-gray-500 text-sm">{business.address}</p>
                <button className="mt-3 bg-pink-600 text-white px-4 py-2 rounded-lg w-full hover:bg-pink-700 transition-all" onClick={() => alert(`You tried to book service ${business.title}`)}>
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
