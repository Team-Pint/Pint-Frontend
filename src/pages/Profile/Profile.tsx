import React, { useState } from 'react';
import ProfileFeed from './ProfileFeed';
import DetailModal from './DetailModal';
import { type Post } from '../../constants/dummyData';

const Profile: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  return (
    <>
      <ProfileFeed onPhotoClick={(post: Post) => setSelectedPost(post)} />
      {selectedPost && (
        <DetailModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </>
  );
};

export default Profile;