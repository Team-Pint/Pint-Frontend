import React, { useState, useEffect, useCallback } from "react";
import { Pencil } from "lucide-react";
import ProfileEditModal from "../../components/ProfileEditModal/ProfileEditModal";
import type {
  ProfileResponse,
  ProfileUpdatePayload,
  PostSummary,
} from "../../types/ProfileData";
import { cn } from "../../lib/utils";
import { PROFILE_STYLES as styles } from "../../styles/profileStyles";
import { fetchUserProfileData, updateProfileData } from "../../api/profileApi";
import { useUserStore } from "../../store/useUserStore";
import { useNavigate } from "react-router-dom";

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

type ProfileUpdateInput = Partial<Omit<ProfileResponse, "profileImage">> & {
  profileImage?: File;
};

const buildProfileUpdatePayload = (
  updatedData: ProfileUpdateInput,
): ProfileUpdatePayload => {
  const payload: ProfileUpdatePayload = {};

  if ("username" in updatedData) {
    payload.username = (updatedData.username ?? "").trim();
  }
  if ("city" in updatedData) {
    payload.city = (updatedData.city ?? "").trim();
  }
  if ("introduction" in updatedData) {
    payload.introduction = (updatedData.introduction ?? "").trim();
  }
  if ("profileImage" in updatedData) {
    if (updatedData.profileImage instanceof File) {
      payload.profileImage = updatedData.profileImage;
    }
  }

  return payload;
};

type ProfileTab = "feed" | "likes";

const Profile: React.FC<{ userId: number }> = ({ userId }) => {
  const [profileData, setProfileData] = useState<ProfileResponse | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ProfileTab>("feed");
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const setGlobalProfileImage = useUserStore((state) => state.setProfileImageUrl);

  // API 요청 상태
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

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

  const fetchProfile = useCallback(async (silent = false) => {
    if (!Number.isInteger(userId) || userId <= 0) {
      setError("잘못된 사용자 ID입니다.");
      setLoading(false);
      return;
    }

    if (!silent) setLoading(true);
    setError(null);

    try {
      const data = await fetchUserProfileData(userId);

      const postListData: PostSummary[] = (data.postList ?? []).map((post) => ({
        postId: post.postId,
        imageUrl: post.imageUrl,
        location: post.location,
        camera: post.camera,
        description: post.description,
      }));

      const likedPostListData: PostSummary[] = (data.likedPostList ?? []).map((post) => ({
        postId: post.postId,
        imageUrl: post.imageUrl,
        location: post.location,
        camera: post.camera,
        description: post.description,
      }));

      setProfileData({
        ...data,
        postList: postListData,
        likedPostList: likedPostListData,
      });
    } catch (err) {
      console.error("프로필 조회 실패:", err);
      setError("프로필 정보를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchProfile();

    const handleRefresh = () => fetchProfile(true);

    window.addEventListener("post-uploaded", handleRefresh);

    return () => {
      window.removeEventListener("post-uploaded", handleRefresh);
    }
  }, [fetchProfile]);


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
  const usernameLines = formatUsernameLines(displayUsername);
  const isFeedTab = activeTab === "feed";
  const visiblePostList = isMe && !isFeedTab ? likedPostList : postList;
  const modalProfileData: Omit<ProfileResponse, "profileImage"> = {
    ...profileData,
    city: normalizeTextForForm(city, CITY_PLACEHOLDER),
    introduction: normalizeTextForForm(introduction, INTRODUCTION_PLACEHOLDER),
  };

  const handleSaveProfile = async (updatedData: ProfileUpdateInput) => {
    if (!profileData) return;
    const payload = buildProfileUpdatePayload(updatedData);

    if (Object.keys(payload).length === 0) {
      setIsEditModalOpen(false);
      return;
    }

    try {
      setIsSavingProfile(true);
      const updatedProfile = await updateProfileData(userId, payload);
      const serializedPayload = { ...payload };

      const {
        profileImage: _ignoredProfileImage,
        ...profileTextPayload
      } = serializedPayload;
      void _ignoredProfileImage;

      const mergedProfile: ProfileResponse = {
        ...profileData,
        ...updatedProfile,
        ...profileTextPayload,
      };

      setProfileData(mergedProfile);

      if (mergedProfile.profileImageUrl) {
        setGlobalProfileImage(mergedProfile.profileImageUrl);
      }

      setIsEditModalOpen(false);
    } catch (err) {
      console.error("프로필 수정 실패:", err);
      alert("프로필 수정에 실패했습니다.");
    } finally {
      setIsSavingProfile(false);
    }
  };

  // 게시글 상세 페이지 이동
  const handleItemClick = (postId: number) => {
    navigate(`/posts/${String(postId)}`);
  };

  return (
    <div
      className={cn(
        container,
        isEditModalOpen ? "overflow-hidden h-screen" : "",
      )}
    >
      <div className={wrapper}>
        <main className="mt-4">
          <section className={profileSection}>
            <div className={nameWrapper}>
              {usernameLines.map((name, i) => (
                <span key={i} className={cn(nameItem, "text-[130px]")}>
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
                    onClick={() => handleItemClick(post.postId)}
                  >
                    <img src={post.imageUrl} className={gridImage} alt="" loading="lazy" />
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

      {/* 프로필 편집 모달 */}
      {isEditModalOpen && (
        <ProfileEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          data={modalProfileData}
          onSave={handleSaveProfile}
          isSaving={isSavingProfile}
        />
      )}
    </div>
  );
};

export default Profile;
