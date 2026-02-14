
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Video, 
  Gamepad2, 
  LayoutDashboard, 
  Trash2, 
  ExternalLink, 
  Sparkles,
  Loader2,
  X
} from 'lucide-react';
import { MediaItem, MediaType } from './types';
import Header from './components/Header';
import MediaCard from './components/MediaCard';
import AddMediaForm from './components/AddMediaForm';

const App: React.FC = () => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'video' | 'game'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load items from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('nexus-media-items');
    if (saved) {
      setItems(JSON.parse(saved));
    } else {
      // Seed initial data
      const initialItems: MediaItem[] = [
        {
          id: '1',
          type: 'video',
          title: 'Cinematic Nature Showcase',
          url: 'https://www.youtube.com/watch?v=6v2L2UGZJAM',
          thumbnail: 'https://picsum.photos/seed/nature/800/450',
          description: 'A beautiful exploration of earth landscapes.',
          tags: ['Relaxation', '4K', 'Nature'],
          addedAt: Date.now()
        },
        {
          id: '2',
          type: 'game',
          title: 'Cyberpunk Runner',
          url: 'https://itch.io/embed-upload/12345',
          thumbnail: 'https://picsum.photos/seed/cyber/800/450',
          description: 'A high-octane neon-drenched arcade experience.',
          tags: ['Action', 'Retro', 'Sci-fi'],
          addedAt: Date.now()
        }
      ];
      setItems(initialItems);
      localStorage.setItem('nexus-media-items', JSON.stringify(initialItems));
    }
  }, []);

  const saveItems = (newItems: MediaItem[]) => {
    setItems(newItems);
    localStorage.setItem('nexus-media-items', JSON.stringify(newItems));
  };

  const addItem = (item: MediaItem) => {
    saveItems([item, ...items]);
    setIsModalOpen(false);
  };

  const removeItem = (id: string) => {
    saveItems(items.filter(i => i.id !== id));
  };

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesTab = activeTab === 'all' || item.type === activeTab;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesTab && matchesSearch;
    });
  }, [items, activeTab, searchQuery]);

  return (
    <div className="min-h-screen pb-20">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-900/50 backdrop-blur-md p-4 rounded-2xl border border-gray-800 mb-8 sticky top-4 z-40">
          <div className="flex bg-gray-800 p-1 rounded-lg self-start">
            <button 
              onClick={() => setActiveTab('all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${activeTab === 'all' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              <LayoutDashboard size={18} />
              <span className="text-sm font-medium">All</span>
            </button>
            <button 
              onClick={() => setActiveTab('video')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${activeTab === 'video' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              <Video size={18} />
              <span className="text-sm font-medium">Videos</span>
            </button>
            <button 
              onClick={() => setActiveTab('game')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${activeTab === 'game' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              <Gamepad2 size={18} />
              <span className="text-sm font-medium">Games</span>
            </button>
          </div>

          <div className="flex flex-1 max-w-md gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text"
                placeholder="Search titles or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors font-medium text-sm whitespace-nowrap shadow-lg shadow-blue-900/20"
            >
              <Plus size={18} />
              Add Media
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <MediaCard 
                key={item.id} 
                item={item} 
                onDelete={removeItem} 
              />
            ))
          ) : (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-gray-500">
              <div className="bg-gray-900 p-6 rounded-full mb-4">
                <LayoutDashboard size={48} className="opacity-20" />
              </div>
              <p className="text-lg font-medium">No media found</p>
              <p className="text-sm">Try adjusting your filters or add something new!</p>
            </div>
          )}
        </div>
      </main>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h2 className="text-xl font-semibold heading-font">Add New Content</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <AddMediaForm onAdd={addItem} />
            </div>
          </div>
        </div>
      )}

      {/* Footer Branding */}
      <footer className="fixed bottom-0 left-0 right-0 bg-gray-950/80 backdrop-blur-md border-t border-gray-900 py-3 text-center">
        <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Nexus Entertainment Lab &copy; 2024</p>
      </footer>
    </div>
  );
};

export default App;
