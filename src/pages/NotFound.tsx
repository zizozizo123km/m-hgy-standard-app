import React from 'react';
import { AlertTriangle, Home } from 'lucide-react';

/**
 * A professional 404 Not Found page component styled to resemble the minimalist, dark aesthetic of Netflix.
 */
const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-xl text-center space-y-8">
        
        {/* Lucide Icon - Centerpiece */}
        <AlertTriangle className="w-20 h-20 mx-auto text-red-600" aria-hidden="true" />
        
        {/* Main Title */}
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-white">
          404
        </h1>

        {/* Subtitle/Message */}
        <p className="text-2xl md:text-3xl font-medium text-gray-100">
          Lost your signal?
        </p>
        
        <p className="text-lg text-gray-400">
          We can't seem to find the page you're looking for. It might have been removed or the URL was entered incorrectly.
        </p>

        {/* Call to Action Button (Netflix Red) */}
        <a 
          href="/" 
          className="inline-flex items-center space-x-2 
                     bg-red-600 hover:bg-red-700 
                     text-white font-bold py-3 px-8 
                     rounded transition duration-300 shadow-lg 
                     focus:outline-none focus:ring-4 focus:ring-red-600 focus:ring-opacity-50"
        >
          <Home className="w-5 h-5" />
          <span>Back to Home</span>
        </a>
        
      </div>
    </div>
  );
};

export default NotFound;