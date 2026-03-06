import React, { useState } from 'react';
import ProfileFeed from './pages/Profile/ProfileFeed';
import DetailModal from './pages/Profile/DetailModal';
import { type Post } from './constants/dummyData';

const App: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  return (
    <div className="relative min-h-screen bg-white text-gray-900 font-sans p-6 md:p-12">
      <ProfileFeed onPhotoClick={(post: Post) => setSelectedPost(post)} />
      
      {selectedPost && (
        <DetailModal 
          post={selectedPost} 
          onClose={() => setSelectedPost(null)} 
        />
      )}
    </div>
  );
};

export default App;