import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { ArrowRight, MessageSquare, ThumbsUp, Plus } from "lucide-react";
import { formatDate } from "../utils/dateUtils";

const ActivitySection = ({ userData, isOwnProfile }) => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/posts");
      return res.data;
    },
  });

  // Filter posts authored by this user
  const userPosts =
    posts?.filter(
      (post) =>
        post.author?.username === userData?.username ||
        post.author?._id === userData?._id
    ) || [];

  return (
    <div className="bg-white rounded-lg border border-[#e0dfdc] shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.05)] p-4 sm:p-6 mb-3 sm:mb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[rgba(0,0,0,0.9)]">
            Activity
          </h2>
          <span className="text-xs font-semibold text-[#0a66c2]">
            {Math.max(userData?.connections?.length || 0, 1)} followers
          </span>
        </div>

        {isOwnProfile && (
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#0a66c2] text-[#0a66c2] hover:bg-[rgba(10,102,194,0.08)] text-xs sm:text-sm font-semibold transition-colors"
          >
            <Plus size={16} />
            <span>Create a post</span>
          </Link>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#f0f0f0] pb-2 mb-3">
        <button
          type="button"
          className="px-3 py-1 rounded-full bg-[#057642] text-white text-xs font-semibold shadow-xs"
        >
          Posts
        </button>
        <button
          type="button"
          className="px-3 py-1 rounded-full border border-[#e0dfdc] text-[rgba(0,0,0,0.6)] hover:bg-gray-100 text-xs font-semibold"
        >
          Comments
        </button>
        <button
          type="button"
          className="px-3 py-1 rounded-full border border-[#e0dfdc] text-[rgba(0,0,0,0.6)] hover:bg-gray-100 text-xs font-semibold"
        >
          Images
        </button>
      </div>

      {/* Posts List */}
      {userPosts.length > 0 ? (
        <div className="divide-y divide-[#f0f0f0]">
          {userPosts.slice(0, 3).map((post) => (
            <div key={post._id} className="py-3 first:pt-0 last:pb-0">
              <p className="text-xs text-[rgba(0,0,0,0.55)] mb-1">
                {userData.name} posted this &bull; {formatDate(post.createdAt)}
              </p>
              <div className="flex items-start gap-3">
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post media"
                    className="w-16 h-16 rounded object-cover border border-[#e0dfdc] flex-shrink-0"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-[rgba(0,0,0,0.85)] line-clamp-2 leading-relaxed">
                    {post.content}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-[rgba(0,0,0,0.55)]">
                    <span className="inline-flex items-center gap-1">
                      <ThumbsUp size={13} className="text-[#0a66c2]" />
                      <span>{post.likes?.length || 0}</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MessageSquare size={13} />
                      <span>{post.comments?.length || 0} comments</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-4 text-center sm:text-left">
          <p className="text-xs sm:text-sm text-[rgba(0,0,0,0.6)] italic mb-2">
            {isOwnProfile
              ? "You haven't posted yet. Posts you share with your network will appear here."
              : `${userData.name} hasn't shared any posts recently.`}
          </p>
        </div>
      )}

      {/* Footer Link */}
      <div className="border-t border-[#f0f0f0] pt-2.5 mt-3 text-center">
        <Link
          to="/"
          className="text-xs sm:text-sm font-semibold text-[rgba(0,0,0,0.6)] hover:text-[#0a66c2] inline-flex items-center gap-1 transition-colors"
        >
          <span>Show all activity</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default ActivitySection;
