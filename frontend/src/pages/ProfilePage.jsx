import { useParams, Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Copy,
  Users,
} from "lucide-react";

import ProfileHeader from "../components/ProfileHeader";
import AnalyticsSection from "../components/AnalyticsSection";
import ActivitySection from "../components/ActivitySection";
import AboutSection from "../components/AboutSection";
import ExperienceSection from "../components/ExperienceSection";
import EducationSection from "../components/EducationSection";
import CertificationsSection from "../components/CertificationsSection";
import SkillsSection from "../components/SkillsSection";
import InterestsSection from "../components/InterestsSection";
import RecommendedUser from "../components/RecommendedUser";
import LinkedInNews from "../components/LinkedInNews";

const ProfilePage = () => {
  const { username } = useParams();
  const queryClient = useQueryClient();

  const { data: authUser, isLoading: isAuthLoading } = useQuery({
    queryKey: ["authUser"],
  });

  const {
    data: userProfile,
    isLoading: isUserProfileLoading,
    isError,
  } = useQuery({
    queryKey: ["userProfile", username],
    queryFn: () => axiosInstance.get(`/users/${username}`),
    retry: 1,
  });

  const { data: recommendedUsers } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/suggestions");
      return res.data;
    },
    enabled: !!authUser,
  });

  const { mutate: updateProfile } = useMutation({
    mutationFn: async (updatedData) => {
      await axiosInstance.put("/users/profile", updatedData);
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["userProfile", username] });
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to update profile");
    },
  });

  // Loading skeleton
  if (isAuthLoading || isUserProfileLoading) {
    return (
      <div className="max-w-[1128px] mx-auto py-4 px-2 flex justify-center">
        <div className="w-full max-w-[780px] bg-white rounded-lg border border-[#e0dfdc] p-6 animate-pulse space-y-4">
          <div className="h-44 bg-gray-200 rounded-md" />
          <div className="w-28 h-28 -mt-16 rounded-full bg-gray-300 border-4 border-white" />
          <div className="w-48 h-5 bg-gray-200 rounded" />
          <div className="w-72 h-4 bg-gray-200 rounded" />
          <div className="w-36 h-3 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  // Not found
  if (isError || !userProfile?.data) {
    return (
      <div className="max-w-[600px] mx-auto py-12 px-4 text-center">
        <div className="bg-white rounded-lg border border-[#e0dfdc] p-8 shadow-xs">
          <h2 className="text-xl font-bold text-[rgba(0,0,0,0.9)] mb-2">
            Member not found
          </h2>
          <p className="text-xs sm:text-sm text-[rgba(0,0,0,0.6)] mb-5">
            The profile for &quot;{username}&quot; does not exist or may have been updated.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0a66c2] text-white text-xs sm:text-sm font-semibold hover:bg-[#004182] transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Return to feed</span>
          </Link>
        </div>
      </div>
    );
  }

  const isOwnProfile = authUser?.username === userProfile.data.username;
  const rawData = isOwnProfile ? authUser : userProfile.data;

  // Universal profile data for every user
  const userData = {
    ...rawData,
    skills: rawData.skills || [],
    experience: rawData.experience || [],
    education: rawData.education || [],
    certifications: rawData.certifications || [],
  };

  const handleSave = (updatedData) => {
    updateProfile(updatedData);
  };

  const handleCopyProfileLink = () => {
    const url = `${window.location.origin}/profile/${userData.username}`;
    navigator.clipboard.writeText(url);
    toast.success("Public profile link copied to clipboard!");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5 items-start justify-center max-w-[1128px] mx-auto py-1 sm:py-3 px-1 sm:px-3">
      {/* Main Profile Feed Column (780px max) */}
      <main className="w-full lg:max-w-[780px] flex-1">
        {/* 1. Header Card with Banner, Avatar, Details & Actions */}
        <ProfileHeader
          userData={userData}
          isOwnProfile={isOwnProfile}
          onSave={handleSave}
        />

        {/* 2. Analytics (Private to profile owner) */}
        <AnalyticsSection isOwnProfile={isOwnProfile} />

        {/* 3. Activity Section (Real posts authored by this user) */}
        <ActivitySection userData={userData} isOwnProfile={isOwnProfile} />

        {/* 4. About Section */}
        <AboutSection
          userData={userData}
          isOwnProfile={isOwnProfile}
          onSave={handleSave}
        />

        {/* 5. Experience Timeline */}
        <ExperienceSection
          userData={userData}
          isOwnProfile={isOwnProfile}
          onSave={handleSave}
        />

        {/* 6. Education History */}
        <EducationSection
          userData={userData}
          isOwnProfile={isOwnProfile}
          onSave={handleSave}
        />

        {/* 7. Licenses & Certifications (0 by default, fully interactive) */}
        <CertificationsSection
          userData={userData}
          isOwnProfile={isOwnProfile}
          onSave={handleSave}
        />

        {/* 8. Skills & Endorsements */}
        <SkillsSection
          userData={userData}
          isOwnProfile={isOwnProfile}
          onSave={handleSave}
        />

        {/* 9. Interests */}
        <InterestsSection />
      </main>

      {/* Right Column: Profile Language, Public URL, People you may know (300px) */}
      <aside className="w-full lg:w-[300px] flex-shrink-0 hidden lg:block space-y-3">
        {/* Card 1: Profile Language & Public URL */}
        <div className="bg-white rounded-lg border border-[#e0dfdc] shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.05)] p-4 text-xs space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-sm text-[rgba(0,0,0,0.9)]">
                Profile language
              </h3>
            </div>
            <p className="text-[rgba(0,0,0,0.6)]">English (US)</p>
          </div>

          <div className="border-t border-[#f0f0f0] pt-3">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-sm text-[rgba(0,0,0,0.9)]">
                Public profile &amp; URL
              </h3>
              <button
                type="button"
                onClick={handleCopyProfileLink}
                className="text-[rgba(0,0,0,0.6)] hover:text-black p-1 cursor-pointer"
                title="Copy public link"
              >
                <Copy size={14} />
              </button>
            </div>
            <p className="text-[rgba(0,0,0,0.6)] truncate select-all font-mono">
              www.linkedin.com/in/{userData.username}
            </p>
          </div>
        </div>

        {/* Card 2: People also viewed / Suggested Connections */}
        {recommendedUsers && recommendedUsers.length > 0 && (
          <div className="bg-white rounded-lg border border-[#e0dfdc] shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.05)] p-3.5">
            <div className="flex items-center gap-1.5 mb-3">
              <Users size={16} className="text-[#0a66c2]" />
              <h3 className="font-bold text-sm text-[rgba(0,0,0,0.9)]">
                People you may know
              </h3>
            </div>
            <div className="space-y-1">
              {recommendedUsers
                .filter((u) => u.username !== userData.username)
                .slice(0, 5)
                .map((user) => (
                  <RecommendedUser key={user._id} user={user} />
                ))}
            </div>
          </div>
        )}

        {/* Card 3: Mini Footer & News */}
        <LinkedInNews />
      </aside>
    </div>
  );
};

export default ProfilePage;
