import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import Post from "../components/Post";
import LinkedInNews from "../components/LinkedInNews";
import { ArrowLeft } from "lucide-react";

const PostPage = () => {
  const { postId } = useParams();
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const { data: post, isLoading } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => axiosInstance.get(`/posts/${postId}`),
  });

  return (
    <div className="flex flex-col lg:flex-row gap-5 items-start justify-center">
      {/* Left Column (225px) */}
      <aside className="w-full lg:w-[225px] flex-shrink-0 hidden lg:block">
        <Sidebar user={authUser} />
      </aside>

      {/* Main Column */}
      <main className="w-full lg:max-w-[555px] flex-1">
        <div className="mb-3">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[rgba(0,0,0,0.6)] hover:text-black"
          >
            <ArrowLeft size={16} />
            <span>Back to feed</span>
          </Link>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-lg border border-[#e0dfdc] p-6 text-center text-xs text-[rgba(0,0,0,0.5)] animate-pulse">
            Loading conversation...
          </div>
        ) : post?.data ? (
          <Post post={post.data} />
        ) : (
          <div className="bg-white rounded-lg border border-[#e0dfdc] p-8 text-center">
            <h2 className="text-base font-semibold text-[rgba(0,0,0,0.9)] mb-1">
              Post not found
            </h2>
            <p className="text-xs text-[rgba(0,0,0,0.6)] mb-4">
              This post may have been deleted or the link is expired.
            </p>
            <Link
              to="/"
              className="px-4 py-1.5 rounded-full bg-[#0a66c2] text-white text-xs font-semibold"
            >
              Return Home
            </Link>
          </div>
        )}
      </main>

      {/* Right Column (300px) */}
      <aside className="w-full lg:w-[300px] flex-shrink-0 hidden lg:block">
        <LinkedInNews />
      </aside>
    </div>
  );
};

export default PostPage;
