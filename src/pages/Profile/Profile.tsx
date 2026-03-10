import React, { useState, useEffect } from 'react';
import { Search, Pencil, Upload } from 'lucide-react';
import PostDetailModal from './PostDetailModal';
import type { ProfileResponse, PostDetail } from '../../types/profile';
import { cn } from '../../lib/utils';
import { PROFILE_STYLES as styles } from '../../constants/styles';

const Profile: React.FC<{ userId: number }> = ({ userId }) => {
  const [profileData, setProfileData] = useState<ProfileResponse | null>(null);
  const [selectedPost, setSelectedPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // 구조 분해 할당으로 스타일 추출
  const {
    container, wrapper, loadingState,
    headerRoot, logo, searchWrapper, searchInput, btnGroup, uploadBtn, avatar,
    profileSection, nameWrapper, nameItem, infoWrapper, editBtn, descriptionText, locationText, emailText,
    gridContainer, gridItem, gridImage, gridOverlay
  } = styles;

  useEffect(() => {
    // API 연동 전 목업 데이터
    const mockData: ProfileResponse = {
      username: "최소영",
      description: "SEOUL-BASED GRAPHIC DESIGNER AND PHOTOGRAPHER. FOCUSING ON MINIMALISM AND ARCHITECTURAL STRUCTURES.",
      city: "SEOUL, KOREA",
      email: "soyoung@example.com",
      isMe: true,
      profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500",
      postList: Array.from({ length: 8 }).map((_, i) => ({
        postId: i + 1,
        imgUrl: `https://picsum.photos/seed/${i + 200}/800/1200`
      }))
    };
    setProfileData(mockData);
    setLoading(false);
  }, [userId]);

  if (loading || !profileData) return <div className={loadingState}>Loading...</div>;

  const { username, description, city, email, isMe, profileImage, postList } = profileData;

  return (
    <div className={cn(container, !!selectedPost && "overflow-hidden h-screen")}>
      <div className={wrapper}>
        
        <header className={headerRoot}>
          <div className="flex items-center gap-16">
            <h1 className={logo}>Pint.</h1>
            <div className={searchWrapper}>
              <Search size={14} className="text-gray-400" />
              <input type="text" placeholder="Search" className={searchInput} />
            </div>
          </div>
          <div className={btnGroup}>
            <button className={uploadBtn}>
              <Upload size={12} strokeWidth={3} /> Upload
            </button>
            <img src={profileImage} className={avatar} alt="me" />
          </div>
        </header>

        <main>
          <section className={profileSection}>
            <div className={nameWrapper}>
              {username.split(' ').map((name, i) => (
                <span key={i} className={nameItem}>{name}</span>
              ))}
            </div>
            
            <div className={infoWrapper}>
              {isMe && (
                <button className={editBtn}>
                  <Pencil size={10} strokeWidth={2.5} /> Edit Profile
                </button>
              )}
              <p className={descriptionText}>{description}</p>
              <div className={locationText}>FROM: {city}</div>
              <div className={emailText}>{email}</div>
            </div>
          </section>

          <div className={gridContainer}>
            {postList.map((post) => (
              <div 
                key={post.postId} 
                className={gridItem}
                onClick={() => setSelectedPost({
                  ...post,
                  location: city,
                  camera: "LEICA M11",
                  description: "Visual exploration.",
                  username,
                  profileImage,
                  isWriter: isMe
                })}
              >
                <img src={post.imgUrl} className={gridImage} alt="" />
                <div className={gridOverlay} />
              </div>
            ))}
          </div>
        </main>
      </div>

      {selectedPost && (
        <PostDetailModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
};

export default Profile;