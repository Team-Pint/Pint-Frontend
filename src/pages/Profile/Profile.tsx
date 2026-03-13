import React, { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import PostDetailModal from './PostDetailModal';
import ProfileEditModal from './ProfileEditModal'; 
import type { ProfileResponse } from '../../types/ProfileData';
import { cn } from '../../lib/utils';
import { PROFILE_STYLES as styles } from '../../constants/styles';
import api from '../../api/axios'; // 인터셉터 설정된 axios 인스턴스

const Profile: React.FC<{ userId: number }> = ({ userId }) => {
  const [profileData, setProfileData] = useState<ProfileResponse | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [loading, setLoading] = useState(true);

  const {
    container, wrapper, loadingState,
    profileSection, nameWrapper, nameItem, infoWrapper, editBtn, 
    descriptionText, locationText, emailText,
    gridContainer, gridItem, gridImage, gridOverlay
  } = styles;

  // 💡 프로필 정보 조회 API 호출
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        // 실제 API 호출 (명세서 기반 경로가 없으면 백엔드와 상의 후 수정)
        const response = await api.get<{ data: ProfileResponse }>(`/api/profile/${userId}`);
        setProfileData(response.data.data);
      } catch (error) {
        console.warn("프로필 API 미완성: 명세서 기반 더미 데이터를 사용합니다.");
        // 명세서(image_e70701.png) 기반의 더미 데이터
        const mockData: ProfileResponse = {
          username: "최 소영",
          description: "안녕하세요, 사진과 기록을 좋아하는 최소영입니다.",
          city: "FROM: SEOUL, SOUTH KOREA",
          email: "soyoung@example.com",
          isMe: true,
          profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500",
          postList: [
            { postId: 1, imgUrl: "https://images.pexels.com/photos/14576628/pexels-photo-14576628.jpeg" },
            { postId: 2, imgUrl: "https://images.pexels.com/photos/34780944/pexels-photo-34780944.jpeg" },
            { postId: 3, imgUrl: "https://picsum.photos/seed/3/800/1200" },
            { postId: 4, imgUrl: "https://picsum.photos/seed/4/800/1200" }
          ]
        };
        setProfileData(mockData);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (loading || !profileData) return <div className={loadingState}>Loading...</div>;

  const handleSaveProfile = (updatedData: Partial<ProfileResponse>) => {
    setProfileData(prev => prev ? { ...prev, ...updatedData } : null);
    setIsEditModalOpen(false);
  };

  const { username, description, city, email, isMe, postList } = profileData;

  return (
    <div className={cn(container, (!!selectedPostId || isEditModalOpen) && "overflow-hidden h-screen")}>
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
                <button className={editBtn} onClick={() => setIsEditModalOpen(true)}>
                  <Pencil size={10} strokeWidth={2.5} /> Edit
                </button>
              )}
              <p className={descriptionText}>{description}</p>
              <div className={locationText}>{city}</div>
              <div className={emailText}>{email}</div>
            </div>
          </section>

          <div className={gridContainer}>
            {postList.map((post) => (
              <div 
                key={post.postId} 
                className={gridItem}
                onClick={() => setSelectedPostId(post.postId)} // 💡 이제 postId만 넘겨줍니다.
              >
                <img src={post.imgUrl} className={gridImage} alt="" />
                <div className={gridOverlay} />
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* 게시물 상세 모달 (데이터는 모달 안에서 직접 fetch) */}
      {selectedPostId && (
        <PostDetailModal postId={selectedPostId} onClose={() => setSelectedPostId(null)} />
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