import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Info, Pencil, Trash2 } from 'lucide-react';
import { deletePostApi, fetchPostDetailData } from '../../api/postApi';
import type { PostDetailApiResponse } from '../../types/ProfileData';
import { POST_DETAIL_STYLES as styles } from '../../styles/postDetailStyles';
import MoreInfoModal from '../../components/MoreInfoModal/MoreInfoModal';
import { postLikeApi } from '../../api/postLikeApi';
import PostEditModal from '../../components/PostEditModal/PostEditModal';
import confetti from 'canvas-confetti'; // [추가] 라이브러리 임포트

const PostDetail = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostDetailApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMoreInfoOpen, setIsMoreInfoOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // 포스트 정보 API
  const fetchPost = async () => {
    if (!postId) return;

    try {
      const data = await fetchPostDetailData(Number(postId));
      setPost(data);
    } catch (error) {
      console.error('포스트 로드 실패', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  // [추가] 화려한 폭죽 애니메이션 함수
  const fireLikeBurst = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    
    // 화면 크기 대비 클릭 위치의 비율 계산
    const x = clientX / window.innerWidth;
    const y = clientY / window.innerHeight;

    confetti({
      particleCount: 15,    // 파티클 개수
      spread: 60,          // 퍼지는 각도
      origin: { x, y },     // 터지는 시작점 (클릭한 위치)
      colors: ['#ef4444', '#fca5a5', '#fb7185'], // 하트와 어울리는 레드/핑크 톤
      ticks: 200,          // 지속 시간
      gravity: 1.2,        // 중력
      scalar: 0.7,         // 크기 배율
    });
  };

  // 좋아요 클릭 API
  const handleLikeClick = async (e: React.MouseEvent) => {
    if (!postId || !post) return;

    try {
      const response = await postLikeApi(postId);

      if (response.code === 200 || response.message === "Success") {
        // [추가] 좋아요가 눌리는 시점(false -> true)에만 폭죽 이펙트 실행
        if (!post.isLiked) {
          fireLikeBurst(e);
        }

        setPost({
          ...post,
          isLiked: response.data.isLiked,
          likeCount: response.data.likeCount,
        });
      }
    } catch (error) {
      console.error("좋아요 처리 실패:", error);
    }
  };

  // 게시글 수정
  const handleUpdateSuccess = () => {
    fetchPost();
  };

  // 게시글 삭제
  const handleDeleteClick = async () => {
    if (!postId) return;

    if (!window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      return;
    }

    try {
      const response = await deletePostApi(Number(postId));

      if (response.code === 200) {
        alert("게시글이 삭제되었습니다.");
        navigate(-1);
      }
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
    }
  };

  if (loading) {
    return <div className={styles.loadingState}>Loading...</div>;
  }

  if (!post) {
    return <div className={styles.loadingState}>포스트를 찾을 수 없습니다.</div>;
  }

  const { userInfo, description, location, camera, postImgUrl, isLiked, likeCount, filter, createdAt } = post;

  const formattedDate = new Date(createdAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <ArrowLeft size={16} strokeWidth={1.5} />
          Back
        </button>

        <div className={styles.contentGrid}>
          {/* Left: Info */}
          <div className={styles.infoSection}>
            <div>
              <div className={styles.userBar}>
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => navigate(`/profile/${userInfo.userId}`)}
                >
                  {userInfo.profileImage ? (
                    <img
                      src={userInfo.profileImage}
                      className={styles.userAvatar}
                      alt={userInfo.username}
                    />
                  ) : (
                    <img src="/images/ic_default_profile.svg" className={styles.userAvatar} alt="프로필 이미지" />
                  )}
                  <span className={styles.userName}>{userInfo.username}</span>
                </div>
                <div className="flex items-center gap-2">
                  {/* [수정] onClick에 이벤트 객체(e) 전달 */}
                  <button className={styles.likeBtn} onClick={(e) => handleLikeClick(e)}>
                    <Heart
                      size={20}
                      strokeWidth={1.5}
                      fill={isLiked ? '#ef4444' : 'none'}
                      color={isLiked ? '#ef4444' : 'currentColor'}
                    />
                  </button>
                  <span className={styles.likeCount}>{likeCount}</span>
                </div>
              </div>

              <div className={styles.infoGroup}>
                <div>
                  <h4 className={styles.label}>장소</h4>
                  <p className={styles.value}>{location || '정보 없음'}</p>
                </div>
                <div>
                  <h4 className={styles.label}>카메라</h4>
                  <p className={styles.value}>{camera || '정보 없음'}</p>
                </div>
                <div>
                  <h4 className={styles.label}>설명</h4>
                  <p className={styles.descText}>{description || '설명 없음'}</p>
                </div>
              </div>

              <p className={styles.dateText}>{formattedDate}</p>
            </div>

            <div className="flex items-end justify-between">
              <div className="flex items-center gap-3">
                {userInfo.isWriter && (
                  <>
                    <button className={styles.moreBtn} onClick={() => setIsEditModalOpen(true)}>
                      <Pencil size={14} strokeWidth={1.5} /> Edit
                    </button>
                    <button className={styles.moreBtnDanger} onClick={handleDeleteClick}>
                      <Trash2 size={14} strokeWidth={1.5} /> Delete
                    </button>
                  </>
                )}
              </div>
              <button className={styles.moreBtn} onClick={() => setIsMoreInfoOpen(true)}>
                <Info size={14} strokeWidth={1.5} /> More Info
              </button>
            </div>
          </div>

          {/* Right: Image */}
          <div className={styles.imageSection}>
            <div className={styles.imageBorder}>
              <img src={postImgUrl} className={styles.mainImg} alt="post" />
            </div>
          </div>
        </div>
      </div>

      {post && (
        <PostEditModal 
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          postId={Number(postId)}
          initialData={{
            description: post.description,
            location: post.location,
            camera: post.camera,
            previewImage: post.postImgUrl
          }}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}

      {isMoreInfoOpen && (
        <MoreInfoModal
          imgUrl={postImgUrl}
          filter={filter}
          onClose={() => setIsMoreInfoOpen(false)}
        />
      )}
    </div>
  );
};

export default PostDetail;