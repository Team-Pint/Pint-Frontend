import React, { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react'; // Search, Upload는 헤더로 갔으니 삭제
import PostDetailModal from './PostDetailModal';
import type { ProfileResponse, PostDetail } from '../../types/ProfileData';
import { cn } from '../../lib/utils';
import { PROFILE_STYLES as styles } from '../../constants/styles';

const Profile: React.FC<{ userId: number }> = ({ userId }) => {
  const [profileData, setProfileData] = useState<ProfileResponse | null>(null);
  const [selectedPost, setSelectedPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // 헤더 관련 스타일 변수들은 여기서 제거
  const {
    container, wrapper, loadingState,
    profileSection, nameWrapper, nameItem, infoWrapper, editBtn, 
    descriptionText, locationText, emailText,
    gridContainer, gridItem, gridImage, gridOverlay
  } = styles;

  useEffect(() => {
    const mockData: ProfileResponse = {
      username: "최 소영",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to ",
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

        <main className="mt-4"> {/* 헤더와의 적절한 간격을 위해 마진 추가 */}
          <section className={profileSection}>
            <div className={nameWrapper}>
              {/* 이름 사이 공백이 있으면 줄바꿈 처리 */}
              {username.split(' ').map((name, i) => (
                <span key={i} className={nameItem}>{name}</span>
              ))}
            </div>
            
            <div className={infoWrapper}>
              {isMe && (
                <button className={editBtn}>
                  <Pencil size={10} strokeWidth={2.5} /> Edit
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
                  description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release",
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