import React from 'react';
import { type Post } from '../../constants/dummyData';

interface DetailModalProps {
  post: Post;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ post, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white flex flex-col md:flex-row w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
        <div className="flex-1 p-8 md:p-16 flex flex-col justify-center order-2 md:order-1">
          <button onClick={onClose} className="mb-10 text-[11px] font-bold text-gray-400 hover:text-black tracking-widest uppercase hidden md:block w-fit">← CLOSE</button>
          <h2 className="text-xl font-bold mb-6 text-gray-800">{post.title}</h2>
          <p className="text-[12px] leading-loose text-gray-500 max-w-[280px]">{post.description}</p>
        </div>
        <div className="flex-1 bg-[#E5E5E5] p-8 md:p-16 flex items-center justify-center order-1 md:order-2">
          <div className="bg-white p-3 shadow-lg w-full max-w-[340px]">
            <div className="aspect-[3/4] overflow-hidden mb-3">
              <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex justify-between items-end text-[8px] font-bold tracking-tighter text-gray-400 uppercase">
              <div>
                <p>{post.location.split(',')[0]}</p>
                <p>{post.location.split(',')[1]}</p>
              </div>
              <p>{post.device}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;