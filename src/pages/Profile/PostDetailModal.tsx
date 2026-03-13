import React, { useState, useEffect } from 'react';
import { X, Pencil, Trash2, Info } from 'lucide-react';
import { cn } from '../../lib/utils';
import { DETAIL_MODAL_STYLES as styles } from '../../constants/styles';
import MoreInfoModal from '../../components/MoreInfoModal/MoreInfoModal';
import api from '../../api/axios';
import type { PostDetail } from '../../types/ProfileData'; // 💡 정의한 타입 임포트

interface PostDetailModalProps {
  postId: number;
  onClose: () => void;
}

const PostDetailModal: React.FC<PostDetailModalProps> = ({ postId, onClose }) => {
  const [isPresetOpen, setIsPresetOpen] = useState(false);
  const [postData, setPostData] = useState<PostDetail | null>(null); // 💡 any 대신 타입 적용
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        setLoading(true);
        // 1. 실제 API 호출 시도
        const response = await api.get(`/api/posts/${postId}`);
        setPostData(response.data.data);
      } catch (error) {
        console.warn("API 미완성으로 명세서 기반 더미 데이터를 로드합니다.");
        // 2. 백엔드 미완성 시 보여줄 '명세서 일치' 데이터
        setPostData({
          postId: postId,
          postImgUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
          description: "오늘 날씨가 너무 좋아서 한 컷 찍어봤습니다.",
          camera: "IPHONE X",
          location: "SEOUL",
          isLiked: false,
          userInfo: {
            nickname: "junsungkim",
            profileImage: "https://github.com/identicons/junsung.png",
            isWriter: true
          },
          filter: {
            basicAdjustments: { "Exposure2012": "+0.15", "Contrast2012": "+33", "Highlights2012": "-51" },
            colorAdjustments: { "HueAdjustmentYellow": "+5", "SaturationAdjustmentGreen": "-60" },
            detailAdjustments: { "Sharpness": "18", "LuminanceSmoothing": "14" }
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [postId]);

  // 로딩 중이거나 데이터가 없을 때의 예외 처리
  if (loading || !postData) return null;

  // 3. postData에서 변수 추출 (명세서 키값 기준)
  const { postImgUrl, description, camera, location, userInfo, filter } = postData;
  const { nickname, profileImage, isWriter } = userInfo;

  return (
    <div className={cn(styles.overlayBase)}>
      {/* 배경 클릭 시 닫기 */}
      <div className={styles.backdrop} onClick={onClose} />

      <div className={cn(styles.contentBase)}>
        {/* Left Section: Information */}
        <div className={styles.sideInfo}>
          <div>
            <div className={styles.userBar}>
              <img src={profileImage} className={styles.userAvatar} alt={nickname} />
              <span className={styles.userName}>{nickname}</span>
            </div>

            <div className={styles.infoGroup}>
              <div>
                <h4 className={styles.label}>장소</h4>
                <p className={styles.value}>{location}</p>
              </div>
              <div>
                <h4 className={styles.label}>카메라</h4>
                <p className={styles.value}>{camera}</p>
              </div>
              <div>
                <h4 className={styles.label}>설명</h4>
                <p className={styles.descText}>{description}</p>
              </div>
            </div>
          </div>

          <button className={styles.moreBtn} onClick={() => setIsPresetOpen(true)}>
            <Info size={14} strokeWidth={1.5} /> More Info
          </button>
        </div>

        {/* Right Section: Visual Content */}
        <div className={styles.imageStage}>
          {/* 닫기 버튼 */}
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={28} strokeWidth={1.5} />
          </button>

          {/* 메인 이미지 */}
          <div className={styles.imageBorder}>
            <img src={postImgUrl} className={styles.mainImg} alt="focused view" />
          </div>
          
          {/* 작성자일 경우만 수정/삭제 버튼 노출 */}
          {isWriter && (
            <div className={styles.adminBar}>
              <button className={styles.editBtn}>
                <Pencil size={12} strokeWidth={2.5} /> Edit
              </button>
              <button className={styles.deleteBtn}>
                <Trash2 size={12} strokeWidth={2.5} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 보정치 정보 모달 (추가 데이터 전달) */}
      {isPresetOpen && (
        <MoreInfoModal
          imgUrl={postImgUrl}
          filterData={filter} 
          onClose={() => setIsPresetOpen(false)}
        />
      )}
    </div>
  );
};

export default PostDetailModal;