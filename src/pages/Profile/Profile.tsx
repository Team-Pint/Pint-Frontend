import React, { useState, useEffect } from 'react';
import { Search, Pencil, Upload } from 'lucide-react';
import DetailModal from '../Profile/DetailModal';
import type { ProfileResponse, PostDetail } from '../../types/profile';
import { cn } from '../../lib/utils';

const Profile: React.FC<{ userId: number }> = ({ userId }) => {
  const [profileData, setProfileData] = useState<ProfileResponse | null>(null);
  const [selectedPost, setSelectedPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const styles = {
    // Layout
    container: "min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white",
    wrapper: "max-w-[1800px] mx-auto px-10 py-2",
    loadingState: "p-20 font-serif text-center uppercase tracking-widest text-gray-200",

    // Header
    headerRoot: "flex justify-between items-center mb-10",
    logo: "text-[24px] font-black font-serif italic tracking-tighter",
    searchWrapper: "border-b border-black/10 pb-1 flex items-center gap-3 w-[300px] focus-within:border-black transition-all",
    searchInput: "outline-none text-xs placeholder:text-gray-300 w-full font-light bg-transparent",
    btnGroup: "flex items-center gap-6",
    uploadBtn: "bg-black text-white px-6 py-2 rounded-full text-[11px] font-bold hover:bg-gray-800 transition-all flex items-center gap-2",
    avatar: "w-9 h-9 rounded-full object-cover",

    // Profile Section
    profileSection: "flex justify-between items-end mb-8 px-2 relative",
    nameWrapper: "flex flex-col items-start text-[7vw] font-serif leading-[0.8] uppercase tracking-[-0.05em] font-medium",
    nameItem: "ml-[-0.3vw] block",
    infoWrapper: "max-w-lg text-right flex flex-col items-end pb-1",
    editBtn: "flex items-center gap-2 border border-black/20 px-3 py-1 rounded-full text-[9px] font-bold uppercase mb-6 hover:bg-black hover:text-white transition",
    descriptionText: "text-[11px] text-gray-400 mb-8 leading-relaxed text-right font-light max-w-[260px] uppercase tracking-tight",
    locationText: "font-serif text-[32px] mb-0 uppercase tracking-tighter leading-none",
    emailText: "text-[11px] text-gray-400 font-light mt-1",

    // Grid System
    gridContainer: "grid grid-cols-4 gap-4",
    gridItem: "aspect-[3/3.8] bg-gray-50 cursor-pointer overflow-hidden group relative",
    gridImage: "w-full h-full object-cover group-hover:scale-105 transition duration-[1.2s] ease-out grayscale-[0.2] group-hover:grayscale-0",
    gridOverlay: "absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
  };

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
      username: "CHOI SO YOUNG",
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
        <DetailModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
};

export default Profile;