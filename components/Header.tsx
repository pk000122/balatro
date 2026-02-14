
import React from 'react';
import { Layers } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="border-b border-gray-800 bg-gray-950/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-xl shadow-lg shadow-blue-900/30">
            <Layers className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold heading-font tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Nexus <span className="text-blue-500 font-light">Lab</span>
          </h1>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex gap-4">
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Discover</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Library</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">About</a>
          </nav>
          <div className="h-6 w-px bg-gray-800" />
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs font-semibold text-white">Elite Member</p>
              <p className="text-[10px] text-gray-500">Pro Hub Active</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center overflow-hidden">
              <img src="https://picsum.photos/seed/user/100" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
