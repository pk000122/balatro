
import React, { useState } from 'react';
import { 
  Sparkles, 
  Loader2, 
  Plus, 
  Link as LinkIcon, 
  Type as TypeIcon,
  Video,
  Gamepad2
} from 'lucide-react';
import { MediaItem, MediaType } from '../types';
import { enrichContent } from '../services/geminiService';

interface AddMediaFormProps {
  onAdd: (item: MediaItem) => void;
}

const AddMediaForm: React.FC<AddMediaFormProps> = ({ onAdd }) => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<MediaType>('video');
  const [tags, setTags] = useState('');
  const [isEnriching, setIsEnriching] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !title) return;

    const newItem: MediaItem = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      title,
      url,
      description,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      addedAt: Date.now(),
      thumbnail: `https://picsum.photos/seed/${Math.random()}/800/450`
    };

    onAdd(newItem);
  };

  const handleEnrich = async () => {
    if (!url) return;
    setIsEnriching(true);
    const result = await enrichContent(url, type, title || 'New Content');
    if (result) {
      setTitle(result.title);
      setDescription(result.description);
      setTags(result.tags.join(', '));
    }
    setIsEnriching(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-3 mb-2">
        <button
          type="button"
          onClick={() => setType('video')}
          className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition-all ${type === 'video' ? 'bg-red-900/20 border-red-600 text-red-400' : 'bg-gray-800 border-gray-700 text-gray-400'}`}
        >
          <Video size={18} />
          Video
        </button>
        <button
          type="button"
          onClick={() => setType('game')}
          className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition-all ${type === 'game' ? 'bg-emerald-900/20 border-emerald-600 text-emerald-400' : 'bg-gray-800 border-gray-700 text-gray-400'}`}
        >
          <Gamepad2 size={18} />
          Game
        </button>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-gray-400 uppercase ml-1">Content URL</label>
        <div className="relative">
          <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="url" 
            required
            placeholder="Paste YouTube, Twitch, or Itch.io link..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex-1 space-y-1">
          <label className="text-xs font-semibold text-gray-400 uppercase ml-1">Title</label>
          <div className="relative">
            <TypeIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              required
              placeholder="e.g. My Favorite Gameplay"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            />
          </div>
        </div>
        <button 
          type="button"
          onClick={handleEnrich}
          disabled={!url || isEnriching}
          className="mt-6 px-4 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-800 disabled:text-gray-600 rounded-xl transition-all flex items-center justify-center text-white gap-2 shadow-lg shadow-purple-900/20"
          title="Enrich with Gemini AI"
        >
          {isEnriching ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
          <span className="hidden sm:inline font-medium text-sm">AI Enrich</span>
        </button>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-gray-400 uppercase ml-1">Description (Optional)</label>
        <textarea 
          placeholder="What is this about?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all min-h-[80px]"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-gray-400 uppercase ml-1">Tags (Comma separated)</label>
        <input 
          type="text" 
          placeholder="Action, Sci-fi, Tutorial..."
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
        />
      </div>

      <button 
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-900/40 hover:-translate-y-0.5"
      >
        <Plus size={20} />
        Add to Laboratory
      </button>
    </form>
  );
};

export default AddMediaForm;
