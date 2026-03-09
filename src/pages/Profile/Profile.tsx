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
    layout: {
      container: "min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white",
      wrapper: "max-w-[1800px] mx-auto px-10 py-2", // 상단 여백 최소화
      loading: "p-20 font-serif text-center uppercase tracking-widest text-gray-200",
    },
    header: {
      root: "flex justify-between items-center mb-10", // 헤더 간격 압축
      logo: "text-[24px] font-black font-serif italic tracking-tighter",
      searchWrapper: "border-b border-black/10 pb-1 flex items-center gap-3 w-[300px] focus-within:border-black transition-all",
      searchInput: "outline-none text-xs placeholder:text-gray-300 w-full font-light bg-transparent",
      btnGroup: "flex items-center gap-6",
      uploadBtn: "bg-black text-white px-6 py-2 rounded-full text-[11px] font-bold hover:bg-gray-800 transition-all flex items-center gap-2",
      avatar: "w-9 h-9 rounded-full object-cover",
    },
    profile: {
      // 그리드와 이름 사이의 여백을 mb-8로 줄여 사진을 위로 바짝 올립니다.
      section: "flex justify-between items-end mb-8 px-2 relative", 
      
      // 이름 크기를 7vw로 줄여 사진 노출 면적을 확보합니다.
      nameWrapper: "flex flex-col items-start text-[7vw] font-serif leading-[0.8] uppercase tracking-[-0.05em] font-medium",
      nameItem: "ml-[-0.3vw] block",
      
      infoWrapper: "max-w-lg text-right flex flex-col items-end pb-1",
      editBtn: "flex items-center gap-2 border border-black/20 px-3 py-1 rounded-full text-[9px] font-bold uppercase mb-6 hover:bg-black hover:text-white transition",
      
      description: "text-[11px] text-gray-400 mb-8 leading-relaxed text-right font-light max-w-[260px] uppercase tracking-tight",
      location: "font-serif text-[32px] mb-0 uppercase tracking-tighter leading-none",
      email: "text-[11px] text-gray-400 font-light mt-1",
    },
    grid: {
      container: "grid grid-cols-4 gap-4", 
      // 사진 비율을 3/3.8로 조정하여 피그마의 느낌을 유지하면서도 화면을 덜 차지하게 했습니다.
      item: "aspect-[3/3.8] bg-gray-50 cursor-pointer overflow-hidden group relative",
      image: "w-full h-full object-cover group-hover:scale-105 transition duration-[1.2s] ease-out grayscale-[0.2] group-hover:grayscale-0",
      overlay: "absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
    },
  };

  const { layout, header, profile, grid } = styles;

  useEffect(() => {
    //
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

  if (loading || !profileData) return <div className={layout.loading}>Loading...</div>;

  const { username, description, city, email, isMe, profileImage, postList } = profileData;

  return (
    <div className={cn(layout.container, !!selectedPost && "overflow-hidden h-screen")}>
      <div className={layout.wrapper}>
        
        <header className={header.root}>
          <div className="flex items-center gap-16">
            <h1 className={header.logo}>Pint.</h1>
            <div className={header.searchWrapper}>
              <Search size={14} className="text-gray-400" />
              <input type="text" placeholder="Search" className={header.searchInput} />
            </div>
          </div>
          <div className={header.btnGroup}>
            <button className={header.uploadBtn}>
              <Upload size={12} strokeWidth={3} /> Upload
            </button>
            <img src={profileImage} className={header.avatar} alt="me" />
          </div>
        </header>

        <main>
          <section className={profile.section}>
            <div className={profile.nameWrapper}>
              {username.split(' ').map((name, i) => (
                <span key={i} className={profile.nameItem}>{name}</span>
              ))}
            </div>
            
            <div className={profile.infoWrapper}>
              {isMe && (
                <button className={profile.editBtn}>
                  <Pencil size={10} strokeWidth={2.5} /> Edit Profile
                </button>
              )}
              <p className={profile.description}>{description}</p>
              <div className={profile.location}>FROM: {city}</div>
              <div className={profile.email}>{email}</div>
            </div>
          </section>

          <div className={grid.container}>
            {postList.map((post) => (
              <div 
                key={post.postId} 
                className={grid.item}
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
                <img src={post.imgUrl} className={grid.image} alt="" />
                <div className={grid.overlay} />
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