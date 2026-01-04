import React, { FC } from 'react';
import { Play, Info, Bell, User, Search, ChevronDown, MoveRight } from 'lucide-react';

// --- MOCK DATA ---
interface ContentItem {
  id: number;
  title: string;
  posterUrl: string;
}

const generateMockItems = (category: string): ContentItem[] =>
  Array(15)
    .fill(0)
    .map((_, i) => ({
      id: i,
      title: `${category} Title ${i + 1}`,
      posterUrl: `https://picsum.photos/200/300?random=${category}-${i}`,
    }));

const mockContentRows = [
  { title: 'Trending Now', items: generateMockItems('Trending') },
  { title: 'New Releases', items: generateMockItems('New') },
  { title: 'Sci-Fi Thrillers', items: generateMockItems('SciFi') },
  { title: 'Recently Added', items: generateMockItems('Recent') },
];

const featuredMovie = {
  title: "The Shadow Protocol",
  description: "A former operative must confront his past when a global conspiracy threatens to expose a decade-old secret that could dismantle the world's power structures.",
  tags: ["Tense", "Action", "Espionage"],
};

// --- COMPONENTS ---

// Content Row Component
const ContentRow: FC<{ title: string; items: ContentItem[] }> = ({ title, items }) => (
  <div className="mb-8 pl-16 group/row">
    <h2 className="text-2xl font-semibold mb-4 text-white hover:text-gray-300 transition duration-300 cursor-pointer inline-flex items-center">
      {title}
      <MoveRight className="w-5 h-5 ml-2 opacity-0 group-hover/row:opacity-100 transition-opacity duration-300" />
    </h2>
    <div className="flex overflow-x-scroll no-scrollbar space-x-4 pb-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="relative flex-shrink-0 w-60 h-36 rounded-md overflow-hidden cursor-pointer transform hover:scale-[1.05] transition-transform duration-300 shadow-xl"
        >
          {/* Placeholder for actual poster image */}
          <div
            className="w-full h-full bg-cover bg-center bg-gray-800/80 hover:bg-gray-700/80 transition"
            style={{ backgroundImage: `url(${item.posterUrl})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-3">
              <span className="text-xs text-white truncate">{item.title}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Header Component
const Header: FC = () => (
  <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-16 bg-black/90 transition duration-300">
    {/* Left Nav (Logo and Links) */}
    <div className="flex items-center space-x-10">
      {/* Netflix Logo Placeholder (use text for simplicity) */}
      <h1 className="text-4xl font-extrabold text-red-600 tracking-tighter">NETFLIX</h1>
      <nav className="hidden lg:flex space-x-6 text-sm text-gray-300">
        <a href="#" className="text-white font-bold hover:text-gray-100">Home</a>
        <a href="#" className="hover:text-gray-100">Series</a>
        <a href="#" className="hover:text-gray-100">Films</a>
        <a href="#" className="hover:text-gray-100">New & Popular</a>
        <a href="#" className="hover:text-gray-100">My List</a>
      </nav>
    </div>

    {/* Right Nav (Icons and Profile) */}
    <div className="flex items-center space-x-6">
      <Search className="w-6 h-6 text-white cursor-pointer" />
      <span className="text-sm hidden lg:block text-white">Children</span>
      <Bell className="w-6 h-6 text-white cursor-pointer" />
      <div className="flex items-center space-x-2 cursor-pointer">
        <User className="w-8 h-8 p-1 rounded bg-gray-600 text-white" />
        <ChevronDown className="w-4 h-4 text-white" />
      </div>
    </div>
  </header>
);

// Hero Banner Component
const HeroBanner: FC = () => (
  <div className="relative h-[85vh] w-full bg-cover bg-center" style={{ backgroundImage: "url(https://source.unsplash.com/random/1920x1080?dark_cyberpunk)" }}>
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

    <div className="absolute bottom-0 left-0 p-16 pb-32 max-w-3xl">
      <h2 className="text-6xl md:text-8xl font-black text-white mb-6 drop-shadow-lg">
        {featuredMovie.title}
      </h2>
      <p className="text-xl text-white mb-8 drop-shadow-md">
        {featuredMovie.description}
      </p>

      {/* Buttons */}
      <div className="flex space-x-4">
        <button className="flex items-center px-8 py-3 text-xl font-bold rounded bg-white text-black hover:bg-white/80 transition duration-300 shadow-md">
          <Play fill="black" className="w-7 h-7 mr-2" />
          Play
        </button>
        <button className="flex items-center px-8 py-3 text-xl font-bold rounded bg-gray-600/70 text-white hover:bg-gray-600/50 transition duration-300 shadow-md">
          <Info className="w-7 h-7 mr-2" />
          More Info
        </button>
      </div>
    </div>
  </div>
);

// Main Page Component
const Index: FC = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Header />
      <main>
        <HeroBanner />
        
        {/* Content Rows */}
        <div className="relative z-10 -mt-24">
          {mockContentRows.map((row, index) => (
            <ContentRow key={index} title={row.title} items={row.items} />
          ))}
        </div>
        
        {/* Footer Placeholder */}
        <footer className="py-10 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} NTLX Clone. Built with React and Tailwind CSS.</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;