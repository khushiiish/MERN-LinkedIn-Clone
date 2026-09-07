import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, useRef } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import {
  Globe,
  Loader,
  MessageSquare,
  MoreHorizontal,
  Repeat2,
  Send,
  Share2,
  ThumbsUp,
  Trash2,
  Bookmark,
  Copy,
  Heart,
  Sparkles,
  Lightbulb,
  Smile,
  Handshake,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import PostAction from "./PostAction";

const REACTION_TYPES = [
  { name: "Like", icon: ThumbsUp, color: "#0a66c2" },
  { name: "Celebrate", icon: Sparkles, color: "#057642" },
  { name: "Love", icon: Heart, color: "#cc1016" },
  { name: "Insightful", icon: Lightbulb, color: "#c37d16" },
  { name: "Funny", icon: Smile, color: "#378fe9" },
  { name: "Support", icon: Handshake, color: "#915907" },
];

const Post = ({ post }) => {
  const { postId } = useParams();
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(post?.comments || []);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showReactionsBar, setShowReactionsBar] = useState(false);
  const [chosenReaction, setChosenReaction] = useState(null);

  const menuRef = useRef(null);
  const queryClient = useQueryClient();

  const isOwner = authUser?._id === post?.author?._id;
  const isLiked = Boolean(post?.likes?.includes(authUser?._id)) || Boolean(chosenReaction);

  useEffect(() => {
    setComments(post?.comments || []);
  }, [post?.comments]);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!post || !post.author) return null;

  const { mutate: deletePost, isPending: isDeletingPost } = useMutation({
    mutationFn: async () => {
      await axiosInstance.delete(`/posts/delete/${post._id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: createComment, isPending: isAddingComment } = useMutation({
    mutationFn: async (commentText) => {
      await axiosInstance.post(`/posts/${post._id}/comments`, {
        content: commentText,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", post._id] });
      toast.success("Comment posted");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || err.message || "Failed to add comment");
    },
  });

  const { mutate: likePost, isPending: isLikingPost } = useMutation({
    mutationFn: async () => {
      await axiosInstance.post(`/posts/${post._id}/like`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
  });

  const handleDeletePost = () => {
    setShowMenu(false);
    if (window.confirm("Are you sure you want to permanently delete this post?")) {
      deletePost();
    }
  };

  const handleLikePost = () => {
    if (isLikingPost) return;
    likePost();
  };

  const handleSelectReaction = (rx) => {
    setChosenReaction(rx);
    setShowReactionsBar(false);
    if (!post?.likes?.includes(authUser?._id)) {
      handleLikePost();
    }
    toast.success(`${rx.name} added`);
  };

  const handleCopyLink = () => {
    const postUrl = `${window.location.origin}/post/${post._id}`;
    navigator.clipboard.writeText(postUrl);
    setShowMenu(false);
    toast.success("Post link copied to clipboard!");
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const commentText = newComment;
      setNewComment("");
      setComments((prev) => [
        ...prev,
        {
          _id: `temp-${Date.now()}`,
          content: commentText,
          user: {
            _id: authUser?._id,
            name: authUser?.name,
            profilePicture: authUser?.profilePicture,
            headline: authUser?.headline,
          },
          createdAt: new Date(),
        },
      ]);
      createComment(commentText);
    }
  };

  const isLongContent = (post.content || "").length > 200;
  const totalLikes = (post.likes?.length || 0) + (chosenReaction && !post?.likes?.includes(authUser?._id) ? 1 : 0);

  return (
    <div className="bg-white rounded-lg border border-[#e0dfdc] shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.05)] mb-2.5">
      {/* Post Header */}
      <div className="p-3 sm:p-4 pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Link to={`/profile/${post.author?.username || ""}`}>
              <img
                src={post.author?.profilePicture || "/avatar.png"}
                alt={post.author?.name || "User"}
                className="w-12 h-12 rounded-full object-cover border border-[#e0dfdc] hover:opacity-90 transition-opacity"
              />
            </Link>

            <div className="min-w-0">
              <Link
                to={`/profile/${post.author?.username || ""}`}
                className="font-semibold text-sm text-[rgba(0,0,0,0.9)] hover:text-[#0a66c2] hover:underline flex items-center gap-1"
              >
                <span>{post.author?.name || "User"}</span>
                {post.author?.headline && (
                  <span className="text-xs font-normal text-[rgba(0,0,0,0.6)] hidden sm:inline">
                    • 1st
                  </span>
                )}
              </Link>
              <p className="text-xs text-[rgba(0,0,0,0.6)] line-clamp-1">
                {post.author?.headline || "Software Engineer"}
              </p>
              <div className="flex items-center gap-1 text-[11px] text-[rgba(0,0,0,0.5)] mt-0.5">
                <span>
                  {post.createdAt && !isNaN(new Date(post.createdAt))
                    ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: false })
                    : "Just now"}
                </span>
                <span>•</span>
                <Globe size={12} title="Public post" />
              </div>
            </div>
          </div>

          {/* 3-Dots Menu */}
          <div ref={menuRef} className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 rounded-full hover:bg-[rgba(0,0,0,0.06)] text-[rgba(0,0,0,0.6)] hover:text-black transition-colors"
              title="More options"
            >
              <MoreHorizontal size={18} />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.18)] border border-[#e0dfdc] z-30 py-1.5 text-xs text-[rgba(0,0,0,0.8)]">
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-[rgba(0,0,0,0.05)] text-left"
                >
                  <Copy size={15} />
                  <span>Copy link to post</span>
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    toast.success("Post saved to your saved items");
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-[rgba(0,0,0,0.05)] text-left"
                >
                  <Bookmark size={15} />
                  <span>Save post</span>
                </button>
                {isOwner && (
                  <button
                    onClick={handleDeletePost}
                    disabled={isDeletingPost}
                    className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-red-50 text-red-600 text-left font-semibold"
                  >
                    {isDeletingPost ? (
                      <Loader size={15} className="animate-spin" />
                    ) : (
                      <Trash2 size={15} />
                    )}
                    <span>Delete post</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="mt-3 text-sm text-[rgba(0,0,0,0.9)] leading-relaxed whitespace-pre-line">
          <p>
            {isLongContent && !isExpanded
              ? `${post.content.slice(0, 200)}...`
              : post.content}
          </p>
          {isLongContent && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-semibold text-[rgba(0,0,0,0.6)] hover:text-[#0a66c2] hover:underline mt-1"
            >
              {isExpanded ? "see less" : "...see more"}
            </button>
          )}
        </div>
      </div>

      {/* Media Image */}
      {post.image && (
        <div className="mt-1 bg-black/5 border-y border-[#e0dfdc] flex items-center justify-center max-h-[520px] overflow-hidden">
          <img
            src={post.image}
            alt="Post media"
            className="w-full h-auto max-h-[520px] object-contain mx-auto"
          />
        </div>
      )}

      {/* Reaction Summary Counts */}
      <div className="px-4 py-2 flex items-center justify-between text-xs text-[rgba(0,0,0,0.6)] border-b border-[#f0f0f0]">
        <div className="flex items-center gap-1.5">
          {totalLikes > 0 && (
            <div className="flex items-center -space-x-1">
              <span className="w-4 h-4 rounded-full bg-[#0a66c2] text-white flex items-center justify-center shadow-xs">
                <ThumbsUp size={9} className="fill-white" />
              </span>
              <span className="w-4 h-4 rounded-full bg-[#cc1016] text-white flex items-center justify-center shadow-xs">
                <Heart size={9} className="fill-white" />
              </span>
              <span className="w-4 h-4 rounded-full bg-[#057642] text-white flex items-center justify-center shadow-xs">
                <Sparkles size={9} className="fill-white" />
              </span>
            </div>
          )}
          <span>{totalLikes > 0 ? totalLikes : ""}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowComments(!showComments)}
            className="hover:text-[#0a66c2] hover:underline"
          >
            {comments.length} {comments.length === 1 ? "comment" : "comments"}
          </button>
        </div>
      </div>

      {/* Action Bar */}
      <div className="px-2 py-1 flex items-center justify-between relative">
        {/* Hover Reaction Bar */}
        {showReactionsBar && (
          <div
            onMouseEnter={() => setShowReactionsBar(true)}
            onMouseLeave={() => setShowReactionsBar(false)}
            className="absolute left-2 -top-12 bg-white rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.2)] border border-[#e0dfdc] px-2 py-1 flex items-center gap-2 z-30 animate-in fade-in zoom-in-95 duration-100"
          >
            {REACTION_TYPES.map((rx) => {
              const Icon = rx.icon;
              return (
                <button
                  key={rx.name}
                  type="button"
                  onClick={() => handleSelectReaction(rx)}
                  title={rx.name}
                  className="hover:scale-125 transition-transform p-1.5 rounded-full hover:bg-[rgba(0,0,0,0.05)] cursor-pointer flex items-center justify-center"
                >
                  <Icon size={18} style={{ color: rx.color }} />
                </button>
              );
            })}
          </div>
        )}

        {/* Like Button */}
        <div
          className="flex-1"
          onMouseEnter={() => setShowReactionsBar(true)}
          onMouseLeave={() => setShowReactionsBar(false)}
        >
          <PostAction
            active={isLiked}
            icon={
              <ThumbsUp
                size={18}
                className={isLiked ? "fill-[#0a66c2] text-[#0a66c2]" : ""}
              />
            }
            text={chosenReaction ? chosenReaction.name : isLiked ? "Liked" : "Like"}
            onClick={handleLikePost}
          />
        </div>

        {/* Comment Button */}
        <PostAction
          icon={<MessageSquare size={18} />}
          text="Comment"
          onClick={() => setShowComments(!showComments)}
        />

        {/* Repost Button */}
        <PostAction
          icon={<Repeat2 size={18} />}
          text="Repost"
          onClick={handleCopyLink}
        />

        {/* Send Button */}
        <PostAction
          icon={<Send size={18} />}
          text="Send"
          onClick={handleCopyLink}
        />
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="p-3 sm:p-4 bg-[#fcfcfc] border-t border-[#e0dfdc] space-y-3">
          {/* Add Comment Input */}
          <form onSubmit={handleAddComment} className="flex items-start gap-2.5">
            <img
              src={authUser?.profilePicture || "/avatar.png"}
              alt={authUser?.name}
              className="w-8 h-8 rounded-full object-cover mt-0.5 border border-[#e0dfdc]"
            />
            <div className="flex-1 flex items-center border border-[rgba(0,0,0,0.3)] rounded-full bg-white px-3 py-1 focus-within:border-[#0a66c2] focus-within:ring-1 focus-within:ring-[#0a66c2] transition-all">
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full text-xs sm:text-sm bg-transparent focus:outline-none py-1.5"
              />
              <button
                type="submit"
                disabled={isAddingComment || !newComment.trim()}
                className="text-[#0a66c2] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[rgba(10,102,194,0.1)] p-1 rounded-full transition-colors ml-1"
              >
                {isAddingComment ? (
                  <Loader size={16} className="animate-spin" />
                ) : (
                  <Send size={16} />
                )}
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-3 pt-2">
            {comments.map((comment, index) => (
              <div
                key={comment._id || `comment-${index}`}
                className="flex items-start gap-2 text-xs"
              >
                <img
                  src={comment.user?.profilePicture || "/avatar.png"}
                  alt={comment.user?.name}
                  className="w-8 h-8 rounded-full object-cover border border-[#e0dfdc] mt-0.5"
                />
                <div className="flex-1 bg-[#f4f2ee] rounded-xl p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-[rgba(0,0,0,0.9)] hover:underline cursor-pointer">
                      {comment.user?.name || "Member"}
                    </span>
                    <span className="text-[11px] text-[rgba(0,0,0,0.5)]">
                      {comment.createdAt && !isNaN(new Date(comment.createdAt))
                        ? formatDistanceToNow(new Date(comment.createdAt))
                        : "Just now"}
                    </span>
                  </div>
                  <p className="text-[11px] text-[rgba(0,0,0,0.6)] line-clamp-1 mb-1.5">
                    {comment.user?.headline || "Professional"}
                  </p>
                  <p className="text-xs text-[rgba(0,0,0,0.9)] leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
