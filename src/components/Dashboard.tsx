import React from 'react';
import { Search, Bell, User, Play, Info, Menu } from 'lucide-react';

// --- Mock Data ---

interface ContentCardProps {
  id: number;
  title: string;
  imageUrl: string;
}

const mockRows = [
  { 
    title: "Trending Now", 
    items: Array.from({ length: 10 }, (_, i) => ({ 
      id: i, 
      title: `Trending Movie ${i + 1}`, 
      imageUrl: `https://picsum.photos/300/170?random=${i}` 
    })) 
  },
  { 
    title: "New Releases", 
    items: Array.from({ length: 10 }, (_, i) => ({ 
      id: i + 10, 
      title: `New Show ${i + 1}`, 
      imageUrl: `https://picsum.photos/300/170?random=${i + 10}` 
    })) 
  },
  { 
    title: "Documentaries", 
    items: Array.from({ length: 10 }, (_, i) => ({ 
      id: i + 20, 
      title: `Doc Series ${i + 1}`, 
      imageUrl: `https://picsum.photos/300/170?random=${i + 20}` 
    })) 
  },
];

// --- Sub-Components ---

const Navbar: React.FC = () => (
  <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 transition duration-300 bg-black bg-opacity-80 md:px-12">
    {/* Left Section: Logo & Nav Links */}
    <div className="flex items-center space-x-8">
      {/* Netflix Logo 'N' */}
      <div className="text-4xl font-bold text-red-600">N</div>
      
      {/* Main Links */}
      <nav className="hidden text-sm md:flex md:space-x-4 lg:space-x-6">
        {['Home', 'TV Shows', 'Movies', 'My List'].map(link => (
          <a key={link} href="#" className={`text-white transition duration-300 ${link === 'Home' ? 'font-bold' : 'text-gray-300 hover:text-gray-100'}`}>
            {link}
          </a>
        ))}
      </nav>
      {/* Mobile Menu Icon */}
       <Menu className="w-6 h-6 text-white md:hidden" />
    </div>

    {/* Right Section: Icons & Profile */}
    <div className="flex items-center space-x-4 text-white">
      <Search className="w-5 h-5 cursor-pointer" />
      <Bell className="w-5 h-5 cursor-pointer" />
      <User className="w-5 h-5 cursor-pointer" />
    </div>
  </header>
);

const HeroSection: React.FC = () => (
  <div className="relative h-[65vh] md:h-[90vh]">
    <div 
      className="absolute inset-0 bg-cover bg-center" 
      style={{ backgroundImage: 'url(https://picsum.photos/1600/900?random=1)' }}
    />
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

    <div className="absolute bottom-0 left-0 p-4 md:p-12 lg:p-24 w-full md:w-1/2 text-white">
      <h1 className="text-5xl font-extrabold md:text-6xl lg:text-7xl drop-shadow-lg">
        Featured Title
      </h1>
      <p className="mt-4 mb-8 text-sm md:text-lg drop-shadow-md line-clamp-3">
        Experience the thrill of the ultimate cinematic event. A story of revenge, redemption, and epic battles against impossible odds.
      </p>

      <div className="flex space-x-4">
        <button className="flex items-center px-4 py-2 font-bold transition duration-300 bg-white rounded text-black hover:bg-gray-300 md:px-6 md:py-3">
          <Play className="w-5 h-5 mr-2 fill-current" />
          Play
        </button>
        <button className="flex items-center px-4 py-2 font-bold text-white transition duration-300 bg-gray-600 bg-opacity-70 rounded hover:bg-opacity-90 md:px-6 md:py-3">
          <Info className="w-5 h-5 mr-2" />
          More Info
        </button>
      </div>
    </div>
  </div>
);

const ContentCard: React.FC<ContentCardProps> = ({ title, imageUrl }) => (
  <div className="relative w-[150px] md:w-[250px] flex-shrink-0 transition duration-300 transform rounded overflow-hidden cursor-pointer group hover:scale-110 hover:z-20 shadow-lg">
    <img 
      src={imageUrl} 
      alt={title} 
      className="object-cover w-full h-full" 
      loading="lazy"
    />
  </div>
);

interface ContentRowProps {
    title: string;
    items: ContentCardProps[];
}

const ContentRow: React.FC<ContentRowProps> = ({ title, items }) => (
    <div className="mt-8 px-4 md:px-12">
        <h2 className="mb-3 text-xl font-semibold text-white md:text-2xl hover:text-gray-300 cursor-pointer">{title}</h2>
        
        {/* Horizontal Scroll Container */}
        <div className="flex space-x-3 overflow-x-scroll pb-4 hide-scrollbar"> 
            {items.map(item => (
                <ContentCard key={item.id} {...item} />
            ))}
        </div>
    </div>
);

// --- Main Component ---

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-black font-sans">
      <Navbar />
      
      <main>
        <HeroSection />
        
        {/* Content Rows pulled up over the hero section */}
        <div className="relative -mt-24 md:-mt-40 pb-10"> 
          {mockRows.map(row => (
            <ContentRow key={row.title} title={row.title} items={row.items} />
          ))}
          
          {/* Filler for bottom padding */}
          <div className="h-20" />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;