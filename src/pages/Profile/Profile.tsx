import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

// 1. 타입 정의
interface PostSummary {
  postId: number;
  imgUrl: string;
}

interface ProfileResponse {
  username: string;
  description: string;
  city: string;
  email: string;
  isMe: boolean;
  postList: PostSummary[];
  profileImage: string;
}

interface PostDetail {
  postId: number;
  location: string;
  camera: string;
  description: string;
  filter: any;
  createdAt: string;
  profileImage: string;
  username: string;
  isWriter: boolean;
  userId: number;
  imgUrl: string;
}

const Profile: React.FC<{ userId: number }> = ({ userId }) => {
  const [profileData, setProfileData] = useState<ProfileResponse | null>(null);
  const [selectedPost, setSelectedPost] = useState<PostDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // 2. Tailwind 스타일 변수화
  const styles = {

    // 레이아웃 및 배경
    container: "min-h-screen bg-white", // 전체 페이지 최소 높이 및 흰색 배경
    innerWrapper: (isOpen: boolean) => `p-8 ${isOpen ? 'overflow-hidden' : ''}`, // 전체 패딩 8 모달 열릴 때 스크롤 방지

    // 헤더 영역
    header: "flex justify-between items-center mb-12", // 양 끝 정렬, 하단 여백 12
    logo: "text-2xl font-bold font-serif italic", // 로고: 폰트 크기, 굵게, 세리프체, 이탤릭
    //searchBox: "border-b border-black pb-1 flex items-center gap-2", // 하단 테두리만 있는 검색창 라인
    //searchInput: "outline-none text-sm w-32", // 입력창: 포커스 테두리 제거, 작은 글씨, 너비 고정
    searchBox: "border-b border-black pb-1 flex items-center gap-3 w-80", // 너비 80, 아이콘 gap 3
    searchInput: "outline-none text-base placeholder:text-gray-400 flex-1", // 글씨 크기 base
    searchIcon: "text-lg text-black", // 검은색 돋보기 아이콘
    uploadBtn: "bg-black text-white px-5 py-1.5 rounded-full text-xs font-medium hover:opacity-80 transition", // 업로드 버튼: 검정 배경, 둥근 모양, 호버 효과
    
    // 메인 프로필 상단 영역
    mainContent: "max-w-6xl mx-auto", // 메인 영역 최대 너비 제한 및 가운데 정렬
    profileSection: "flex justify-between items-start mb-20", // 이름과 설명글 양 끝 정렬
    userName: "text-[100px] font-serif leading-[0.9] uppercase tracking-tighter", // 대형 타이포그래피: 100px, 좁은 행간, 자간 좁게
    infoCard: "max-w-xs text-right mt-4", // 오른쪽 정보 카드: 너비 제한, 우측 정렬
    editBtn: "border border-black px-4 py-1 rounded text-[10px] uppercase mb-6 hover:bg-black hover:text-white transition", // 수정 버튼: 테두리 버튼, 호버 시 색상 반전
    description: "text-[13px] text-gray-600 mb-10 leading-relaxed text-left", // 자기소개: 작은 글씨, 회색, 가독성 좋은 행간
    city: "font-serif text-xl mb-1 uppercase tracking-widest", // 도시 이름: 세리프체, 자간 넓게
    email: "text-xs text-gray-500", // 이메일: 아주 작은 회색 글씨

    // 포스트 그리드 영역
    grid: "grid grid-cols-4 gap-6", // 4열 격자 레이아웃, 간격 6
    postItem: "aspect-[3/4] bg-gray-100 cursor-pointer overflow-hidden group relative", // 카드: 3:4 비율, 넘치는 이미지 숨김, 그룹 지정(호버용)
    postImg: "w-full h-full object-cover group-hover:scale-105 transition duration-500", // 이미지: 꽉 채우기, 호버 시 살짝 확대되는 애니메이션

    // 상세 모달창 영역
    modalOverlay: "fixed inset-0 z-50 flex items-center justify-center", // 화면 전체를 덮은 레이아, 중앙 정렬
    backdrop: "absolute inset-0 bg-black/60 backdrop-blur-sm", // 배경 어둡게 처리 및 블러 효과
    modalBox: "relative bg-white w-[90%] max-w-5xl h-[600px] flex rounded-sm shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300", // 모달 본체: 흰색 배경, 그림자, 나타날 때 애니메이션
    modalLeft: "w-[45%] p-12 flex flex-col justify-between bg-white", // 모달 왼쪽(텍스트): 너비 45%, 내부 패딩 12
    modalRight: "flex-1 bg-black flex flex-col items-center justify-center p-12 relative", // 모달 오른쪽(이미지): 검정 배경, 중앙 정렬
    
    // 모달 내부 텍스트 스타일
    label: "text-[10px] font-bold uppercase text-gray-900 mb-2", // "장소", "카메라" 등 소제목 스타일
    value: "text-xs text-gray-600 uppercase tracking-tight", // 실제 주소나 카메라 모델명 스타일
    descValue: "text-xs text-gray-500 leading-normal", // 상세 설명글 스타일
    closeBtn: "absolute top-6 right-6 text-white text-xl hover:scale-110 transition", // 우측 상단 닫기 버튼
    actionBtn: "text-[11px] hover:opacity-70 transition uppercase tracking-widest" // 수정/삭제 버튼: 아주 작은 대문자, 자간 넓게
  };

  // 3. 비즈니스 로직
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null); 
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        // 백엔드 명세에 맞춰 /users/{id} 호출
       // const response = await api.get<ProfileResponse>(`/users/${userId}`);
       // setProfileData(response.data);

       // 2. 서버 응답 대신 가짜 데이터를 변수에 담습니다.
      const mockResponse: ProfileResponse = {
        username: "CHOI SO YOUNG",
        description: "SEOUL-BASED GRAPHIC DESIGNER AND PHOTOGRAPHER. FOCUSING ON MINIMALISM AND ARCHITECTURAL STRUCTURES.",
        city: "SEOUL, KOREA",
        email: "SOYOUNG@PINT.COM",
        isMe: true,
        profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500", // 샘플 이미지
        postList: [
          { postId: 1, imgUrl: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=500" },
          { postId: 2, imgUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500" },
          { postId: 3, imgUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=500" },
          { postId: 4, imgUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500" },
        ]
    };

    // 3. 데이터를 상태에 저장합니다.
      setProfileData(mockResponse);
      } catch (error) {
        console.error("Profile Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  const handlePostClick = async (postId: number) => {
    try {
      // 명세의 /posts/{id} 호출
      const response = await api.get<PostDetail>(`/posts/${postId}`);
      setSelectedPost(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Post Detail Error:", error);
    }
  };

  if (loading || !profileData) {
    return <div className="p-10 font-serif text-center uppercase tracking-widest">Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.innerWrapper(isModalOpen)}>
        <header className={styles.header}>
          <h1 className={styles.logo}>Pint.</h1>
          <div className="flex items-center gap-6">
            <div className={styles.searchBox}>
              <input type="text" placeholder="Search" className={styles.searchInput} />
              <span className={styles.searchIcon}>🔍</span> {/* 피그마 스타일 아이콘 */}
            </div>
            <button className={styles.uploadBtn}>Upload</button>
            <img 
              src={profileData.profileImage || 'https://via.placeholder.com/150'} 
              className="w-8 h-8 rounded-full object-cover border border-gray-100" 
              alt="me" 
            />
          </div>
        </header>

        <main className={styles.mainContent}>
          <div className={styles.profileSection}>
            <div className={styles.userName}>
              {profileData.username?.split(' ').map((name, i) => (
                <div key={i}>{name}</div>
              )) || <div>USER</div>}
            </div>
            
            <div className={styles.infoCard}>
              {profileData.isMe && (
                <button className={styles.editBtn}>Edit</button>
              )}
              <p className={styles.description}>{profileData.description}</p>
              <div className={styles.city}>{profileData.city}</div>
              <div className={styles.email}>{profileData.email}</div>
            </div>
          </div>

          <div className={styles.grid}>
            {profileData.postList?.map((post) => (
              <div key={post.postId} className={styles.postItem} onClick={() => handlePostClick(post.postId)}>
                <img src={post.imgUrl} className={styles.postImg} alt="" />
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* 모달 영역 */}
      {isModalOpen && selectedPost && (
        <div className={styles.modalOverlay}>
          <div className={styles.backdrop} onClick={closeModal} />
          <div className={styles.modalBox}>
            {/* 상세 정보 (좌측) */}
            <div className={styles.modalLeft}>
              <div>
                <div className="flex items-center gap-3 mb-12">
                  <img src={selectedPost.profileImage} className="w-9 h-9 rounded-full" alt="" />
                  <span className="font-bold text-sm">{selectedPost.username}</span>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <h4 className={styles.label}>장소</h4>
                    <p className={styles.value}>{selectedPost.location}</p>
                  </div>
                  <div>
                    <h4 className={styles.label}>카메라</h4>
                    <p className={styles.value}>{selectedPost.camera}</p>
                  </div>
                  <div>
                    <h4 className={styles.label}>설명</h4>
                    <p className={styles.descValue}>{selectedPost.description}</p>
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-2 text-[10px] text-gray-400 border border-gray-200 rounded-full px-4 py-2 w-fit hover:bg-gray-50 transition">
                <span>ⓘ</span> More info
              </button>
            </div>

            {/* 이미지 (우측) */}
            <div className={styles.modalRight}>
              <button className={styles.closeBtn} onClick={closeModal}>✕</button>
              <img src={selectedPost.imgUrl} className="max-w-full max-h-[85%] object-contain" alt="post" />
              
              {selectedPost.isWriter && (
                <div className="mt-8 flex gap-10">
                  <button className={`text-white ${styles.actionBtn}`}>✎ Edit</button>
                  <button className={`text-red-500 ${styles.actionBtn}`}>🗑 Delete</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;