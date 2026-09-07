import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import {
  Calendar,
  FileText,
  Globe,
  Image as ImageIcon,
  Loader,
  Smile,
  X,
} from "lucide-react";

const PostCreation = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    const handleOpenModal = () => setIsOpen(true);
    window.addEventListener("open-post-modal", handleOpenModal);
    return () => window.removeEventListener("open-post-modal", handleOpenModal);
  }, []);

  const { mutate: createPostMutation, isPending } = useMutation({
    mutationFn: async (postData) => {
      const res = await axiosInstance.post("/posts/create", postData, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    },
    onSuccess: () => {
      resetForm();
      setIsOpen(false);
      toast.success("Post published to your network!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message || err.message || "Failed to create post"
      );
    },
  });

  const handlePostCreation = async () => {
    if (!content.trim() && !image) {
      toast.error("Please add text or an image to share");
      return;
    }
    try {
      const postData = { content };
      if (image) postData.image = await readFileAsDataURL(image);
      createPostMutation(postData);
    } catch (error) {
      console.error("Error in handlePostCreation:", error);
    }
  };

  const resetForm = () => {
    setContent("");
    setImage(null);
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      readFileAsDataURL(file).then(setImagePreview);
    }
  };

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      {/* Feed Trigger Card */}
      <div className="bg-white rounded-lg border border-[#e0dfdc] shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.05)] p-2.5 sm:p-3 mb-2.5">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <img
            src={user?.profilePicture || "/avatar.png"}
            alt={user?.name || "User"}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0 border border-[#e0dfdc]"
          />
          <button
            onClick={() => setIsOpen(true)}
            className="flex-1 h-[40px] sm:h-[46px] rounded-full border border-[rgba(0,0,0,0.3)] hover:bg-[rgba(0,0,0,0.05)] px-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-[rgba(0,0,0,0.6)] transition-colors flex items-center cursor-pointer min-w-0"
          >
            <span className="truncate">Start a post, share insights or an update...</span>
          </button>
        </div>

        {/* Media Action Row */}
        <div className="flex items-center justify-around mt-2 sm:mt-2.5 pt-1 border-t border-[#f0f0f0] text-xs font-semibold text-[rgba(0,0,0,0.6)]">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-1.5 sm:gap-2 py-1.5 sm:py-2 px-2 sm:px-3 rounded hover:bg-[rgba(0,0,0,0.05)] transition-colors text-[rgba(0,0,0,0.7)]"
          >
            <ImageIcon size={18} className="text-[#378fe9]" />
            <span className="text-xs sm:text-sm">Media</span>
          </button>

          <button
            onClick={() => {
              setIsOpen(true);
              setContent((prev) => prev || "Celebrating a new team milestone!");
            }}
            className="flex items-center gap-1.5 sm:gap-2 py-1.5 sm:py-2 px-2 sm:px-3 rounded hover:bg-[rgba(0,0,0,0.05)] transition-colors text-[rgba(0,0,0,0.7)]"
          >
            <Calendar size={18} className="text-[#c37d16]" />
            <span className="text-xs sm:text-sm">Event</span>
          </button>

          <button
            onClick={() => {
              setIsOpen(true);
              setContent((prev) => prev || "Sharing insights on full-stack architecture:");
            }}
            className="flex items-center gap-1.5 sm:gap-2 py-1.5 sm:py-2 px-2 sm:px-3 rounded hover:bg-[rgba(0,0,0,0.05)] transition-colors text-[rgba(0,0,0,0.7)]"
          >
            <FileText size={18} className="text-[#e06847]" />
            <span className="text-xs sm:text-sm">Write article</span>
          </button>
        </div>
      </div>

      {/* Authentic LinkedIn Post Creation Modal (Responsive Bottom Sheet on Mobile) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[1px] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-150">
          <div className="w-full max-h-[92vh] sm:max-h-[85vh] sm:max-w-[552px] bg-white rounded-t-2xl sm:rounded-xl shadow-2xl border-t sm:border border-[#e0dfdc] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 sm:zoom-in-95 duration-150">
            {/* Mobile Sheet Handle */}
            <div className="sm:hidden w-10 h-1 bg-gray-300 rounded-full mx-auto mt-2.5 -mb-1 flex-shrink-0" />

            {/* Modal Header */}
            <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-[#e0dfdc] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={user?.profilePicture || "/avatar.png"}
                  alt={user?.name || "User"}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-[#e0dfdc]"
                />
                <div>
                  <h3 className="font-semibold text-sm sm:text-base text-[rgba(0,0,0,0.9)]">
                    {user?.name}
                  </h3>
                  {/* Visibility pill */}
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 mt-0.5 rounded-full border border-[rgba(0,0,0,0.6)] text-[11px] sm:text-xs text-[rgba(0,0,0,0.7)] font-semibold w-max bg-white">
                    <Globe size={12} />
                    <span>Post to Anyone</span>
                    <span className="text-[10px]">▾</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  if (content.trim() || image) {
                    if (window.confirm("Discard unsaved post draft?")) {
                      resetForm();
                      setIsOpen(false);
                    }
                  } else {
                    setIsOpen(false);
                  }
                }}
                className="p-1.5 rounded-full hover:bg-[rgba(0,0,0,0.08)] text-[rgba(0,0,0,0.6)] hover:text-black transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-4">
              <textarea
                placeholder="What do you want to talk about?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full text-sm sm:text-base text-[rgba(0,0,0,0.9)] placeholder:text-[rgba(0,0,0,0.5)] resize-none focus:outline-none min-h-[120px] sm:min-h-[160px]"
                autoFocus
              />

              {/* Image Preview */}
              {imagePreview && (
                <div className="relative rounded-lg overflow-hidden border border-[#e0dfdc] bg-black/5 flex items-center justify-center max-h-[280px] sm:max-h-[340px]">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-auto max-h-[280px] sm:max-h-[340px] object-contain rounded"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-2 right-2 bg-black/70 hover:bg-black/90 text-white p-1.5 rounded-full transition-colors"
                    title="Remove attachment"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-4 sm:px-5 py-3 border-t border-[#e0dfdc] flex items-center justify-between bg-white pb-[max(12px,env(safe-area-inset-bottom))]">
              {/* Media Attach Tools */}
              <div className="flex items-center gap-2 text-[rgba(0,0,0,0.6)]">
                <label className="p-2 rounded-full hover:bg-[rgba(0,0,0,0.08)] cursor-pointer hover:text-black transition-colors" title="Add photo">
                  <ImageIcon size={20} className="text-[#378fe9]" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>

                <button
                  type="button"
                  onClick={() => toast("Emoji picker will open your system keyboard.")}
                  className="p-2 rounded-full hover:bg-[rgba(0,0,0,0.08)] hover:text-black transition-colors"
                  title="Add emoji"
                >
                  <Smile size={20} className="text-[#057642]" />
                </button>
              </div>

              {/* Publish Button */}
              <button
                onClick={handlePostCreation}
                disabled={isPending || (!content.trim() && !image)}
                className="px-5 py-1.5 rounded-full bg-[#0a66c2] hover:bg-[#004182] active:bg-[#09223b] text-white font-semibold text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                {isPending ? (
                  <>
                    <Loader size={16} className="animate-spin" />
                    <span>Posting...</span>
                  </>
                ) : (
                  <span>Post</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostCreation;
