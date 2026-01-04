import React from 'react';
import { Search, Bell, ChevronDown, Play, Info } from 'lucide-react';

// --- MOCK DATA TYPES ---

interface Movie {
  id: number;
  title: string;
  image: string;
}

interface Category {
  title: string;
  movies: Movie[];
}

const mockMovies: Movie[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `Title ${i + 1}`,
  image: `https://picsum.photos/300/170?random=${i}`,
}));

const mockData: Category[] = [
  { title: "Trending Now", movies: mockMovies },
  { title: "Watch It Again", movies: mockMovies.slice(3, 8) },
  { title: "New Releases", movies: mockMovies.slice(0, 5) },
  { title: "Top Picks for You", movies: mockMovies.slice(5, 10) },
];

// --- COMPONENTS ---

const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => (
  <div className="group relative h-40 min-w-[280px] cursor-pointer transform transition duration-300 hover:scale-110 shadow-lg hover:shadow-2xl rounded overflow-hidden">
    <img
      src={movie.image}
      alt={movie.title}
      className="object-cover w-full h-full"
    />
  </div>
);

const ContentRow: React.FC<{ category: Category }> = ({ category }) => (
  <div className="mb-10 px-8">
    <h2 className="text-2xl font-semibold mb-3 text-white transition duration-200 hover:text-gray-300">
      {category.title}
    </h2>
    {/* Note: scrollbar-hide typically requires a custom Tailwind plugin (tailwind-scrollbar-hide) */}
    <div className="flex space-x-4 overflow-x-scroll scrollbar-hide p-1">
      {category.movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  </div>
);

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#141414] min-h-screen text-white font-sans overflow-x-hidden">
      
      {/* Header Navigation */}
      <header className={`fixed top-0 z-50 w-full p-4 transition duration-300 ${isScrolled ? 'bg-black/95 shadow-xl' : 'bg-transparent'}`}>
        <div className="flex items-center justify-between mx-auto max-w-[1900px]">
          <div className="flex items-center space-x-10">
            <span className="text-red-600 text-3xl font-bold cursor-pointer tracking-wider">NETFLIX</span>
            <nav className="hidden lg:flex space-x-6 text-sm">
              <a href="#" className="font-bold text-white transition hover:text-gray-300">Home</a>
              <a href="#" className="text-gray-300 transition hover:text-white">TV Shows</a>
              <a href="#" className="text-gray-300 transition hover:text-white">Movies</a>
              <a href="#" className="text-gray-300 transition hover:text-white">New & Popular</a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-6">
            <Search className="h-6 w-6 cursor-pointer hover:text-gray-300" />
            <Bell className="h-6 w-6 cursor-pointer hover:text-gray-300" />
            
            <div className="flex items-center space-x-2 cursor-pointer">
                <img 
                    src="https://picsum.photos/id/1005/30/30" 
                    alt="Profile" 
                    className="rounded h-8 w-8 object-cover" 
                />
                <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <div className="relative h-[65vh] md:h-[95vh] bg-cover bg-center flex items-end"
             style={{ backgroundImage: `url('https://picsum.photos/1920/1080?random=20')` }}>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-black/30 via-black/10"></div>
            
            <div className="relative z-10 p-8 md:p-16 max-w-xl md:max-w-3xl mb-12">
                <h1 className="text-5xl md:text-8xl font-extrabold mb-4 drop-shadow-2xl">
                    The Developer's Dilemma
                </h1>
                <p className="text-lg md:text-xl mb-8 line-clamp-3 drop-shadow-xl text-gray-200">
                    A senior developer faces the ultimate challenge: writing concise, professional code while adhering strictly to project requirements.
                </p>
                
                <div className="flex space-x-4">
                    <button className="flex items-center bg-white text-black py-3 px-8 rounded text-xl font-bold hover:bg-gray-300 transition">
                        <Play className="w-7 h-7 mr-2 fill-current" /> Play
                    </button>
                    <button className="flex items-center bg-gray-600 bg-opacity-70 text-white py-3 px-8 rounded text-xl font-bold hover:bg-opacity-90 transition">
                        <Info className="w-7 h-7 mr-2" /> More Info
                    </button>
                </div>
            </div>
        </div>

        {/* Content Rows */}
        <div className="relative -mt-20 z-40 pb-16"> 
            {mockData.map((category, index) => (
                <ContentRow key={index} category={category} />
            ))}
        </div>
      </main>

    </div>
  );
};

export default App;