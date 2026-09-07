import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import PostCreation from "../components/PostCreation";
import Post from "../components/Post.jsx";
import { ChevronDown, Sparkles, Users } from "lucide-react";
import RecommendedUser from "../components/RecommendedUser";
import LinkedInNews from "../components/LinkedInNews";
import toast from "react-hot-toast";

const HomePage = () => {
  const [sortBy, setSortBy] = useState("recent"); // "recent" | "top"

  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    },
  });

  const { data: recommendedUsers } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/suggestions");
      return res.data;
    },
  });

  const { data: posts, isLoading: isPostsLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/posts");
      return res.data;
    },
  });

  // Filter valid posts
  const validPosts = posts?.filter((post) => post && post.author) || [];

  // Sort posts
  const sortedPosts = [...validPosts].sort((a, b) => {
    if (sortBy === "top") {
      const aLikes = a.likes?.length || 0;
      const bLikes = b.likes?.length || 0;
      return bLikes - aLikes;
    }
    // Default: recent
    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
  });

  return (
    <div className="flex flex-col lg:flex-row gap-5 items-start justify-center">
      {/* Left Column: Profile Card & Quick Links (225px) */}
      <aside className="w-full lg:w-[225px] flex-shrink-0 hidden lg:block">
        <Sidebar user={authUser} />
      </aside>

      {/* Center Column: Feed (555px) */}
      <main className="w-full lg:max-w-[555px] flex-1">
        {/* Post Creation */}
        <PostCreation user={authUser} />

        {/* Sort Bar */}
        <div className="flex items-center my-3">
          <div className="flex-1 border-t border-[rgba(0,0,0,0.15)]" />
          <div className="px-2 flex items-center gap-1 text-xs text-[rgba(0,0,0,0.6)]">
            <span>Sort by:</span>
            <button
              onClick={() => {
                const nextSort = sortBy === "recent" ? "top" : "recent";
                setSortBy(nextSort);
                toast(`Feed sorted by: ${nextSort.toUpperCase()}`);
              }}
              className="font-semibold text-[rgba(0,0,0,0.9)] hover:text-[#0a66c2] flex items-center gap-0.5 cursor-pointer"
            >
              <span>{sortBy === "recent" ? "Recent" : "Top"}</span>
              <ChevronDown size={14} />
            </button>
          </div>
        </div>

        {/* Posts List */}
        {sortedPosts.map((post) => (
          <Post key={post._id} post={post} />
        ))}

        {/* Loading skeleton */}
        {isPostsLoading && (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg border border-[#e0dfdc] p-4 animate-pulse space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200" />
                  <div className="space-y-1.5 flex-1">
                    <div className="w-32 h-3.5 bg-gray-200 rounded" />
                    <div className="w-48 h-2.5 bg-gray-200 rounded" />
                  </div>
                </div>
                <div className="w-full h-16 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Empty Feed */}
        {!isPostsLoading && sortedPosts.length === 0 && (
          <div className="bg-white rounded-lg border border-[#e0dfdc] shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.05)] p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[rgba(10,102,194,0.1)] text-[#0a66c2] flex items-center justify-center mx-auto mb-4">
              <Sparkles size={32} />
            </div>
            <h2 className="text-lg font-semibold text-[rgba(0,0,0,0.9)] mb-1">
              Your feed is ready for fresh ideas
            </h2>
            <p className="text-xs text-[rgba(0,0,0,0.6)] max-w-sm mx-auto mb-4 leading-relaxed">
              Connect with fellow developers and share your latest projects, tutorials, or engineering thoughts!
            </p>
          </div>
        )}
      </main>

      {/* Right Column: LinkedIn News & People You May Know (300px) */}
      <aside className="w-full lg:w-[300px] flex-shrink-0 space-y-3 hidden lg:block">
        {/* Recommended Users / Add to your feed */}
        {recommendedUsers?.length > 0 && (
          <div className="bg-white rounded-lg border border-[#e0dfdc] shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.05)] p-3.5">
            <h3 className="font-semibold text-sm text-[rgba(0,0,0,0.9)] mb-3">
              Add to your feed
            </h3>
            <div className="space-y-1">
              {recommendedUsers.slice(0, 4).map((user) => (
                <RecommendedUser key={user._id} user={user} />
              ))}
            </div>
          </div>
        )}

        {/* LinkedIn News & Mini Footer */}
        <LinkedInNews />
      </aside>
    </div>
  );
};

export default HomePage;
