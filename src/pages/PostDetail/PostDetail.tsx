import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Info, Pencil, Trash2 } from 'lucide-react';
import { deletePostApi, fetchPostDetailData } from '../../api/postApi';
import type { PostDetailApiResponse } from '../../types/ProfileData';
import { POST_DETAIL_STYLES as styles } from '../../styles/postDetailStyles';
import MoreInfoModal from '../../components/MoreInfoModal/MoreInfoModal';
import { postLikeApi } from '../../api/postLikeApi';
import PostEditModal from '../../components/PostEditModal/PostEditModal';

const PostDetail = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostDetailApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMoreInfoOpen, setIsMoreInfoOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const fetchPost = async () => {
    if (!postId) return;
    try {
      const data = await fetchPostDetailData(Number(postId));
      setPost(data);
    } catch (error) { console.error('로드 실패', error); } finally { setLoading(false); }
  };

  useEffect(() => { window.scrollTo(0, 0); fetchPost(); }, [postId]);

  const handleLikeClick = async () => {
    if (!postId || !post) return;
    try {
      const response = await postLikeApi(postId);
      if (response.code === 200 || response.message === "Success") {
        if (!post.isLiked) {
          setIsAnimating(true);
          setTimeout(() => setIsAnimating(false), 700);
        }
        setPost({ ...post, isLiked: response.data.isLiked, likeCount: response.data.likeCount });
      }
    } catch (error) { console.error("좋아요 처리 실패:", error); }
  };

  if (loading) return <div className={styles.loadingState}>Loading...</div>;
  if (!post) return <div className={styles.loadingState}>포스트를 찾을 수 없습니다.</div>;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <ArrowLeft size={16} strokeWidth={1.5} /> Back
        </button>

        <div className={styles.contentGrid}>
          <div className={styles.infoSection}>
            <div>
              <div className={styles.userBar}>
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate(`/profile/${post.userInfo.userId}`)}>
                  <img src={post.userInfo.profileImage || "/images/ic_default_profile.svg"} className={styles.userAvatar} alt="" />
                  <span className={styles.userName}>{post.userInfo.username}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="relative flex items-center justify-center p-2" onClick={handleLikeClick}>
                    {/* 링 컨테이너: absolute inset-0로 중앙 고정 */}
                    {isAnimating && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="heart-ring-effect" />
                      </div>
                    )}
                    <Heart
                      size={22}
                      strokeWidth={1.5}
                      fill={post.isLiked ? '#ef4444' : 'none'}
                      color={post.isLiked ? '#ef4444' : 'currentColor'}
                      className={`relative z-10 transition-transform ${isAnimating ? 'heart-active' : ''}`}
                    />
                  </button>
                  <span className={styles.likeCount}>{post.likeCount}</span>
                </div>
              </div>

              <div className={styles.infoGroup}>
                <div><h4 className={styles.label}>장소</h4><p className={styles.value}>{post.location || '정보 없음'}</p></div>
                <div><h4 className={styles.label}>카메라</h4><p className={styles.value}>{post.camera || '정보 없음'}</p></div>
                <div><h4 className={styles.label}>설명</h4><p className={styles.descText}>{post.description || '설명 없음'}</p></div>
              </div>
              <p className={styles.dateText}>{new Date(post.createdAt).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>

            <div className="flex items-end justify-between">
              <div className="flex items-center gap-3">
                {post.userInfo.isWriter && (
                  <>
                    <button className={styles.moreBtn} onClick={() => setIsEditModalOpen(true)}><Pencil size={14} /> Edit</button>
                    <button className={styles.moreBtnDanger} onClick={() => { if(window.confirm("삭제하시겠습니까?")) deletePostApi(Number(postId)).then(() => navigate(-1)); }}><Trash2 size={14} /> Delete</button>
                  </>
                )}
              </div>
              <button className={styles.moreBtn} onClick={() => setIsMoreInfoOpen(true)}><Info size={14} /> More Info</button>
            </div>
          </div>

          <div className={styles.imageSection}>
            <div className={styles.imageBorder}><img src={post.postImgUrl} className={styles.mainImg} alt="post" /></div>
          </div>
        </div>
      </div>
      {isEditModalOpen && <PostEditModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} postId={Number(postId)} initialData={{ description: post.description, location: post.location, camera: post.camera, previewImage: post.postImgUrl }} onUpdateSuccess={fetchPost} />}
      {isMoreInfoOpen && <MoreInfoModal imgUrl={post.postImgUrl} filter={post.filter} onClose={() => setIsMoreInfoOpen(false)} />}
    </div>
  );
};

export default PostDetail;