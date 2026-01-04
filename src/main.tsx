import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Assuming Tailwind base imports are here
import { Search, Bell, ChevronDown, Play, Info } from 'lucide-react';

// --- Mock Data ---
const mockMovies = [
  { id: 1, title: 'The Witcher', thumbnail: 'bg-red-500/50' },
  { id: 2, title: 'Stranger Things', thumbnail: 'bg-blue-500/50' },
  { id: 3, title: 'Squid Game', thumbnail: 'bg-green-500/50' },
  { id: 4, title: 'Money Heist', thumbnail: 'bg-yellow-500/50' },
  { id: 5, title: 'Bridgerton', thumbnail: 'bg-purple-500/50' },
  { id: 6, title: 'Ozark', thumbnail: 'bg-pink-500/50' },
];

const mockRows = [
  { title: 'Trending Now', data: mockMovies },
  { title: 'Watch It Again', data: mockMovies.slice(2, 6) },
  { title: 'New Releases', data: mockMovies.slice(0, 4) },
];

// --- Components ---

/**
 * Movie Card Component
 */
const MovieCard: React.FC<{ movie: typeof mockMovies[0] }> = ({ movie }) => (
  <div
    className={`w-64 h-36 ${movie.thumbnail} rounded-md shadow-lg transform transition duration-300 hover:scale-105 hover:z-10 cursor-pointer flex items-center justify-center text-white text-lg font-bold flex-shrink-0`}
    style={{ minWidth: '16rem' }}
  >
    {movie.title}
  </div>
);

/**
 * Movie Row Component
 */
const MovieRow: React.FC<{ title: string; movies: typeof mockMovies }> = ({ title, movies }) => (
  <section className="mt-8 px-8 lg:px-12">
    <h2 className="text-xl md:text-2xl font-semibold mb-4 text-white hover:text-gray-300 transition duration-200 cursor-pointer">
      {title}
    </h2>
    <div className="flex space-x-4 overflow-x-scroll scrollbar-hide pb-4">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  </section>
);

/**
 * Hero Banner Component (Jumbotron)
 */
const HeroBanner: React.FC = () => (
  <div className="relative h-[80vh] bg-cover bg-center flex items-center p-8 lg:p-16" style={{ backgroundImage: 'url(https://source.unsplash.com/random/1600x900?cinema,dark)' }}>
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
    <div className="relative max-w-lg text-white">
      <h1 className="text-4xl md:text-7xl font-extrabold mb-4 drop-shadow-lg">
        THE TITLE
      </h1>
      <p className="text-lg mb-8 drop-shadow-md hidden md:block">
        A thrilling, epic saga spanning centuries, involving destiny, magic, and monstrous creatures. The world is balanced on a knife's edge.
      </p>
      <div className="flex space-x-4">
        <button className="flex items-center px-6 py-2 bg-white text-black font-bold text-lg rounded-md hover:bg-opacity-80 transition duration-300">
          <Play className="mr-2 fill-black" size={24} /> Play
        </button>
        <button className="flex items-center px-6 py-2 bg-gray-600 bg-opacity-70 text-white font-bold text-lg rounded-md hover:bg-opacity-50 transition duration-300">
          <Info className="mr-2" size={24} /> More Info
        </button>
      </div>
    </div>
  </div>
);

/**
 * Header/Navigation Bar Component
 */
const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'TV Shows', 'Movies', 'New & Popular', 'My List'];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition duration-300 ${isScrolled ? 'bg-black shadow-lg' : 'bg-transparent'}`}>
      <div className="flex justify-between items-center h-16 px-8 lg:px-12">
        {/* Left Side: Logo and Navigation */}
        <div className="flex items-center space-x-8">
          {/* Netflix Logo Placeholder (use text and bold red color) */}
          <span className="text-red-600 text-3xl font-bold tracking-tighter">
            NETFLIX
          </span>
          {/* Primary Navigation Links (Desktop) */}
          <nav className="hidden lg:flex space-x-6 text-sm text-gray-300">
            {navItems.map(item => (
              <a 
                key={item} 
                href="#" 
                className={`hover:text-white transition duration-200 ${item === 'Home' ? 'text-white font-semibold' : ''}`}
              >
                {item}
              </a>
            ))}
          </nav>
          {/* Primary Navigation Dropdown (Mobile/Tablet) */}
          <div className="lg:hidden text-white flex items-center cursor-pointer">
            Browse
            <ChevronDown size={18} className="ml-1" />
          </div>
        </div>

        {/* Right Side: Icons and Profile */}
        <div className="flex items-center space-x-6 text-white">
          <Search size={24} className="cursor-pointer hover:text-gray-300" />
          <span className="hidden lg:block text-sm cursor-pointer hover:text-gray-300">
            Children
          </span>
          <Bell size={24} className="cursor-pointer hover:text-gray-300" />
          {/* Profile Dropdown */}
          <div className="flex items-center cursor-pointer">
            <img 
              src="https://via.placeholder.com/32/FF0000/FFFFFF?text=P" 
              alt="Profile" 
              className="w-8 h-8 rounded"
            />
            <ChevronDown size={18} className="ml-1 hidden sm:block" />
          </div>
        </div>
      </div>
    </header>
  );
};

/**
 * Main Application Component
 */
const App: React.FC = () => {
  // Utility class for hiding scrollbars but allowing scroll functionality
  // This would typically be defined in index.css:
  // .scrollbar-hide::-webkit-scrollbar { display: none; }
  // .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

  return (
    <div className="min-h-screen bg-black text-white antialiased">
      <Header />
      <main>
        <HeroBanner />
        
        {/* Movie Rows container adjusted to overlap the Hero section slightly */}
        <div className="-mt-[100px] relative z-20 pb-12">
          {mockRows.map((row, index) => (
            <MovieRow key={index} title={row.title} movies={row.data} />
          ))}
        </div>
      </main>
      
      {/* Simple Footer Placeholder */}
      <footer className="py-12 text-center text-gray-500 text-sm">
        <p>
          &copy; {new Date().getFullYear()} Netflix Clone by Senior Developer.
        </p>
      </footer>
    </div>
  );
};

// --- React DOM Rendering ---
const container = document.getElementById('root');
if (container) {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element.");
}