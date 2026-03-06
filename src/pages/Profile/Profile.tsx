import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DetailModal from './DetailModal';
import { DUMMY_POSTS, type Post } from '../../constants/dummyData';

const Profile: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* 1. 헤더 섹션 (ProfileFeed에서 가져옴) */}
      <header className="flex flex-col md:flex-row justify-between mb-20 gap-8">
        <div className="flex-1">
          <h1 className="text-7xl md:text-8xl font-serif font-bold tracking-tighter leading-[0.9] uppercase">
            JUNSUNG<br />KIM
          </h1>
          <p className="mt-6 text-[11px] font-bold tracking-[0.2em] text-gray-800 uppercase">
            FROM: SEOUL, SOUTH KOREA
          </p>
        </div>
        <div className="flex-1 md:max-w-sm pt-2">
          <Link to="/upload" className="block w-fit">
            <span className="text-3xl font-light text-gray-300 block mb-4 cursor-pointer hover:text-gray-500 transition-colors">+</span>
          </Link>
          <p className="text-[12px] leading-relaxed text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
        </div>
      </header>

      {/* 2. 피드 그리드 섹션 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {DUMMY_POSTS.map((post: Post) => (
          <div
            key={post.id}
            className="aspect-square bg-gray-100 overflow-hidden cursor-pointer transition-opacity hover:opacity-80 group"
            onClick={() => setSelectedPost(post)}
          >
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            />
          </div>
        ))}
      </div>

      {/* 3. 모달 섹션 (조건부 렌더링) */}
      {selectedPost && (
        <DetailModal 
          post={selectedPost} 
          onClose={() => setSelectedPost(null)} 
        />
      )}
    </div>
  );
};

export default Profile;