
import React from 'react';
import { Video, Gamepad2, Trash2, ExternalLink, Clock } from 'lucide-react';
import { MediaItem } from '../types';

interface MediaCardProps {
  item: MediaItem;
  onDelete: (id: string) => void;
}

const MediaCard: React.FC<MediaCardProps> = ({ item, onDelete }) => {
  const isVideo = item.type === 'video';

  return (
    <div className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-600 transition-all duration-300 hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-1">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={item.thumbnail || `https://picsum.photos/seed/${item.id}/800/450`} 
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-60" />
        
        {/* Badge */}
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg backdrop-blur-md ${isVideo ? 'bg-red-600/90 text-white' : 'bg-emerald-600/90 text-white'}`}>
          {isVideo ? <Video size={12} /> : <Gamepad2 size={12} />}
          {item.type}
        </div>

        {/* Action Buttons (Overlay) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
          <div className="flex gap-3">
             <a 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-white text-black rounded-full hover:bg-blue-500 hover:text-white transition-all transform hover:scale-110 shadow-xl"
            >
              <ExternalLink size={20} />
            </a>
            <button 
              onClick={() => onDelete(item.id)}
              className="p-3 bg-red-600 text-white rounded-full hover:bg-red-500 transition-all transform hover:scale-110 shadow-xl"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold heading-font mb-2 truncate group-hover:text-blue-400 transition-colors">
          {item.title}
        </h3>
        <p className="text-sm text-gray-400 line-clamp-2 mb-4 h-10 leading-relaxed">
          {item.description || "Explore this content in your hub."}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.map((tag, idx) => (
            <span key={idx} className="text-[10px] font-medium px-2 py-1 bg-gray-800 text-gray-400 rounded-full border border-gray-700">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <div className="flex items-center gap-2 text-[10px] text-gray-500">
            <Clock size={12} />
            {new Date(item.addedAt).toLocaleDateString()}
          </div>
          <span className="text-[10px] font-mono text-gray-700">ID: {item.id.slice(0, 4)}</span>
        </div>
      </div>
    </div>
  );
};

export default MediaCard;
