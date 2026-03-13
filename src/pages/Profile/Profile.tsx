import React, { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import PostDetailModal from './PostDetailModal';
import ProfileEditModal from './ProfileEditModal'; 
import type { ProfileResponse, PostDetail } from '../../types/ProfileData';
import { cn } from '../../lib/utils';
import { PROFILE_STYLES as styles } from '../../styles/profileStyles';

const Profile: React.FC<{ userId: number }> = ({ userId }) => {
  const [profileData, setProfileData] = useState<ProfileResponse | null>(null);
  const [selectedPost, setSelectedPost] = useState<PostDetail | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [loading, setLoading] = useState(true);

  const {
    container, wrapper, loadingState,
    profileSection, nameWrapper, nameItem, infoWrapper, editBtn, 
    descriptionText, locationText, emailText,
    gridContainer, gridItem, gridImage, gridOverlay
  } = styles;

  // 1. 프로필 정보 조회 (초기 로드)
  useEffect(() => {
    // 실제 환경에서는 여기서 API 호출을 수행합니다.
    const mockData: ProfileResponse = {
      username: "최 소영",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
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

  // 저장 버튼 클릭 시 실행될 핸들러
  const handleSaveProfile = (updatedData: Partial<ProfileResponse>) => {
    setProfileData(prev => prev ? { ...prev, ...updatedData } : null);
    setIsEditModalOpen(false);
  };

  // 구조 분해 할당으로 변수 추출
  const { username, description, city, email, isMe, profileImage, postList } = profileData;

  return (
    <div className={cn(container, (!!selectedPost || isEditModalOpen) && "overflow-hidden h-screen")}>
      <div className={wrapper}>
        <main className="mt-4">
          <section className={profileSection}>
            <div className={nameWrapper}>
              {username.split(' ').map((name, i) => (
                <span key={i} className={nameItem}>{name}</span>
              ))}
            </div>
            
            <div className={infoWrapper}>
              {isMe && (
                <button 
                  className={editBtn} 
                  onClick={() => setIsEditModalOpen(true)}
                >
                  <Pencil size={10} strokeWidth={2.5} /> Edit
                </button>
              )}
              {/* 💡 Profile. 문구를 제거하여 에러 해결 */}
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
                  description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries, but also the leap into electronic typesetting.",
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

      {/* 게시물 상세 모달 */}
      {selectedPost && (
        <PostDetailModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}

      {/* 프로필 편집 모달 */}
      <ProfileEditModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        data={profileData}
        onSave={handleSaveProfile}
      />
    </div>
  );
};

export default Profile;