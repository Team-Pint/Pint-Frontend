import React from 'react';
import { DUMMY_POSTS, type Post } from '../../constants/dummyData';

interface ProfileFeedProps {
  onPhotoClick: (post: Post) => void;
}

const ProfileFeed: React.FC<ProfileFeedProps> = ({ onPhotoClick }) => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <header className="flex flex-col md:flex-row justify-between mb-20 gap-8">
        <div className="flex-1">
          <h1 className="text-7xl md:text-8xl font-serif font-bold tracking-tighter leading-[0.9] uppercase">
            JUNSUNG<br />KIM
          </h1>
          <p className="mt-6 text-[11px] font-bold tracking-[0.2em] text-gray-800">FROM: SEOUL, SOUTH KOREA</p>
        </div>
        <div className="flex-1 md:max-w-sm pt-2">
          <span className="text-3xl font-light text-gray-300 block mb-4">+</span>
          <p className="text-[12px] leading-relaxed text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {DUMMY_POSTS.map((post: Post) => (
          <div 
            key={post.id} 
            className="aspect-square bg-gray-100 overflow-hidden cursor-pointer transition-opacity hover:opacity-80 group"
            onClick={() => onPhotoClick(post)}
          >
            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileFeed;