import React, { useState, useEffect } from "react";
import PostDetailModal from "./PostDetailModal";
import { Pencil } from "lucide-react";
import ProfileEditModal from "./ProfileEditModal";
import type { ProfileResponse, PostSummary } from "../../types/ProfileData";
import type { PostDetail } from "../../types/ProfileData";
import { cn } from "../../lib/utils";
import { PROFILE_STYLES as styles } from "../../styles/profileStyles";
import { fetchUserProfileData } from "../../api/profileApi";

const formatUsernameLines = (rawName: string): string[] => {
  // 이름을 화면 폭에 맞게 1~2줄로 나눠 표시합니다.
  const name = rawName.trim().replace(/\s+/g, " ");
  if (!name) return ["이름을 추가해주세요."];

  const words = name.split(" ");
  if (words.length >= 2) {
    return [words[0], words.slice(1).join(" ")];
  }

  const isKorean = /^[가-힣]+$/.test(name);
  if (isKorean) {
    if (name.length <= 2) return [name];
    if (name.length <= 4) return [name.slice(0, 1), name.slice(1)];
    const mid = Math.ceil(name.length / 2);
    return [name.slice(0, mid), name.slice(mid)];
  }

  if (name.length <= 6) return [name];
  const mid = Math.ceil(name.length / 2);
  return [name.slice(0, mid), name.slice(mid)];
};

const INTRODUCTION_PLACEHOLDER = "소개글을 작성해주세요.";
const CITY_PLACEHOLDER = "거주 지역을 추가해주세요.";

const normalizeTextForForm = (
  value: string | null | undefined,
  fallback: string,
) => {
  const raw = (value ?? "").trim();
  return raw === fallback || !raw ? "" : raw;
};

type ProfileTab = "feed" | "likes";

const Profile: React.FC<{ userId: number }> = ({ userId }) => {
  const [profileData, setProfileData] = useState<ProfileResponse | null>(null);
  const [selectedPost, setSelectedPost] = useState<PostDetail | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ProfileTab>("feed");

  // API 요청 상태
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    container,
    wrapper,
    loadingState,
    profileSection,
    nameWrapper,
    nameItem,
    infoWrapper,
    descriptionText,
    editBtn,
    locationText,
    emailText,
    feedLikesSection,
    feedLikesHeader,
    feedLikesTab,
    feedLikesTabActive,
    feedLikesTabIdle,
    gridContainer,
    gridItem,
    gridImage,
    gridOverlay,
    emptyState,
  } = styles;

  useEffect(() => {
    let isMounted = true;
    if (!Number.isInteger(userId) || userId <= 0) {
      setError("잘못된 사용자 ID입니다.");
      setProfileData(null);
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      setProfileData(null); // 새 userId 조회 전에 기존 데이터 즉시 초기화
      try {
        const data = await fetchUserProfileData(userId);
        const postListData: PostSummary[] = (data.postList ?? []).map(
          (post) => ({
            postId: post.postId,
            imageUrl: post.imageUrl,
            location: post.location,
            camera: post.camera,
            description: post.description,
          }),
        );
        const likedPostListData: PostSummary[] = (data.likedPostList ?? []).map(
          (post) => ({
            postId: post.postId,
            imageUrl: post.imageUrl,
            location: post.location,
            camera: post.camera,
            description: post.description,
          }),
        );

        if (!isMounted) return;
        setProfileData({
          ...data,
          postList: postListData,
          likedPostList: likedPostListData,
        });
        setActiveTab("feed");
      } catch (err) {
        console.error("프로필 조회 실패:", err);
        if (!isMounted) return;
        setProfileData(null);
        // 실패 시 남은 이전 데이터를 지우고 에러 상태로 전환
        setError("프로필 정보를 불러오지 못했습니다.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  if (loading) return <div className={loadingState}>Loading...</div>;
  if (!profileData)
    return <div className={loadingState}>프로필 정보가 없습니다.</div>;
  if (error)
    return (
      <div className={loadingState}>{error ?? "프로필 정보가 없습니다."}</div>
    );

  const { username, introduction, city, email, isMe, postList, likedPostList } =
    profileData;
  const cityPlaceholder = "거주 지역을 추가해주세요.";
  const displayUsername = username?.trim() || "";
  const displayIntroduction = introduction?.trim() || "소개글을 작성해주세요.";
  const trimmedCity = city?.trim() || "";
  const hasCity = trimmedCity.length > 0 && trimmedCity !== cityPlaceholder;
  const displayCity = hasCity ? trimmedCity : cityPlaceholder;
  const locationTextValue = hasCity ? `FROM: ${displayCity}` : displayCity;
  const displayEmail = email?.trim();
  const profileImageUrl = profileData.profileImageUrl ?? "";
  const usernameLines = formatUsernameLines(displayUsername);
  const isFeedTab = activeTab === "feed";
  const visiblePostList = isMe && !isFeedTab ? likedPostList : postList;
  const modalProfileData: ProfileResponse = {
    ...profileData,
    city: normalizeTextForForm(city, CITY_PLACEHOLDER),
    introduction: normalizeTextForForm(introduction, INTRODUCTION_PLACEHOLDER),
  };

  const handleSaveProfile = (updatedData: Partial<ProfileResponse>) => {
    if (!profileData) return;

    // 현재 데이터에 수정된 데이터로 덮어쓰기
    setProfileData({ ...profileData, ...updatedData });
    setIsEditModalOpen(false);
  };

  const handleOpenPostDetail = (post: PostSummary, fromLikes: boolean) => {
    setSelectedPost({
      postId: post.postId,
      imgUrl: post.imageUrl,
      location: post.location ?? "",
      camera: post.camera ?? "",
      description: post.description ?? "",
      username: displayUsername,
      profileImage: profileImageUrl,
      isWriter: fromLikes ? false : isMe,
    });
  };

  return (
    <div
      className={cn(
        container,
        !!selectedPost || isEditModalOpen ? "overflow-hidden h-screen" : "",
      )}
    >
      <div className={wrapper}>
        <main className="mt-4">
          <section className={profileSection}>
            <div className={nameWrapper}>
              {usernameLines.map((name, i) => (
                <span key={i} className={nameItem}>
                  {name}
                </span>
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
              <p className={descriptionText}>{displayIntroduction}</p>
              <div className={locationText}>{locationTextValue}</div>
              <div className={emailText}>{displayEmail}</div>
            </div>
          </section>

          <div className={feedLikesSection}>
            {isMe && (
              <div className={feedLikesHeader}>
                <button
                  type="button"
                  className={cn(
                    feedLikesTab,
                    isFeedTab ? feedLikesTabActive : feedLikesTabIdle,
                  )}
                  onClick={() => setActiveTab("feed")}
                >
                  Feed
                </button>
                <button
                  type="button"
                  className={cn(
                    feedLikesTab,
                    !isFeedTab ? feedLikesTabActive : feedLikesTabIdle,
                  )}
                  onClick={() => setActiveTab("likes")}
                >
                  Likes
                </button>
              </div>
            )}

            <div className={gridContainer}>
              {visiblePostList.length > 0 ? (
                visiblePostList.map((post) => (
                  <div
                    key={`${activeTab}-${post.postId}`}
                    className={gridItem}
                    onClick={() => handleOpenPostDetail(post, isMe && !isFeedTab)}
                  >
                    <img src={post.imageUrl} className={gridImage} alt="" />
                    <div className={gridOverlay} />
                  </div>
                ))
              ) : (
                <div className={emptyState}>
                  {isMe && !isFeedTab
                    ? "아직 좋아요한 게시글이 없어요."
                    : "아직 업로드한 게시글이 없어요."}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* 게시물 상세 모달 */}
      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}

      {/* 프로필 편집 모달 */}
      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        data={modalProfileData}
        onSave={handleSaveProfile}
      />
    </div>
  );
};

export default Profile;
