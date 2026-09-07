import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  Building2,
  Camera,
  Check,
  Clock,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  MessageSquare,
  MoreHorizontal,
  Pencil,
  Plus,
  ShieldCheck,
  Sparkles,
  UserCheck,
  UserPlus,
  X,
} from "lucide-react";

const ProfileHeader = ({ userData, onSave, isOwnProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [showContactModal, setShowContactModal] = useState(false);
  const queryClient = useQueryClient();

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const { data: connectionStatus, refetch: refetchConnectionStatus } = useQuery({
    queryKey: ["connectionStatus", userData._id],
    queryFn: () => axiosInstance.get(`/connections/status/${userData._id}`),
    enabled: !isOwnProfile && !!userData?._id,
  });

  const isConnected = userData?.connections?.some(
    (connection) =>
      (connection?._id || connection)?.toString() === authUser?._id?.toString()
  );

  const { mutate: sendConnectionRequest, isPending: isSendingRequest } =
    useMutation({
      mutationFn: (userId) => axiosInstance.post(`/connections/request/${userId}`),
      onSuccess: () => {
        toast.success("Connection request sent");
        refetchConnectionStatus();
        queryClient.invalidateQueries({
          queryKey: ["connectionStatus", userData?._id],
        });
        queryClient.invalidateQueries({ queryKey: ["connectionRequests"] });
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "An error occurred");
      },
    });

  const { mutate: acceptRequest, isPending: isAcceptingRequest } = useMutation({
    mutationFn: (requestId) =>
      axiosInstance.put(`/connections/accept/${requestId}`),
    onSuccess: () => {
      toast.success("Connection request accepted");
      refetchConnectionStatus();
      queryClient.invalidateQueries({
        queryKey: ["connectionStatus", userData?._id],
      });
      queryClient.invalidateQueries({ queryKey: ["connectionRequests"] });
      queryClient.invalidateQueries({ queryKey: ["connections"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "An error occurred");
    },
  });

  const { mutate: rejectRequest, isPending: isRejectingRequest } = useMutation({
    mutationFn: (requestId) =>
      axiosInstance.put(`/connections/reject/${requestId}`),
    onSuccess: () => {
      toast.success("Connection request rejected");
      refetchConnectionStatus();
      queryClient.invalidateQueries({
        queryKey: ["connectionStatus", userData?._id],
      });
      queryClient.invalidateQueries({ queryKey: ["connectionRequests"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "An error occurred");
    },
  });

  const { mutate: removeConnection, isPending: isRemovingConnection } =
    useMutation({
      mutationFn: (userId) => axiosInstance.delete(`/connections/${userId}`),
      onSuccess: () => {
        toast.success("Connection updated");
        refetchConnectionStatus();
        queryClient.invalidateQueries({
          queryKey: ["connectionStatus", userData?._id],
        });
        queryClient.invalidateQueries({ queryKey: ["connectionRequests"] });
        queryClient.invalidateQueries({ queryKey: ["connections"] });
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "An error occurred");
      },
    });

  const getConnectionStatus = useMemo(() => {
    if (isConnected || connectionStatus?.data?.status === "connected")
      return "connected";
    return connectionStatus?.data?.status || "not_connected";
  }, [isConnected, connectionStatus]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedData((prev) => ({
          ...prev,
          [event.target.name]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(editedData);
    setIsEditing(false);
  };

  // Render connection action buttons with authentic LinkedIn styling
  const renderConnectionButton = () => {
    switch (getConnectionStatus) {
      case "connected":
        return (
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#057642] text-[#057642] bg-[rgba(5,118,66,0.06)] font-semibold text-xs sm:text-sm">
              <Check size={16} />
              <span>Connected</span>
            </span>

            <Link
              to="/messaging"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#0a66c2] hover:bg-[#004182] text-white font-semibold text-xs sm:text-sm transition-colors shadow-xs"
            >
              <MessageSquare size={15} />
              <span>Message</span>
            </Link>

            <button
              type="button"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-[rgba(0,0,0,0.3)] text-[rgba(0,0,0,0.6)] hover:text-[#cc1016] hover:border-red-300 font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50"
              onClick={() => removeConnection(userData._id)}
              disabled={isRemovingConnection}
              title="Remove connection"
            >
              <X size={14} />
              <span>{isRemovingConnection ? "Removing..." : "Remove"}</span>
            </button>
          </div>
        );

      case "pending":
        return (
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#c37d16] text-[#c37d16] bg-amber-50 font-semibold text-xs sm:text-sm">
              <Clock size={15} />
              <span>Pending</span>
            </span>

            <button
              type="button"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-[rgba(0,0,0,0.3)] text-[rgba(0,0,0,0.6)] hover:text-[#cc1016] font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50"
              onClick={() => removeConnection(userData._id)}
              disabled={isRemovingConnection}
              title="Withdraw connection invitation"
            >
              <X size={14} />
              <span>{isRemovingConnection ? "Withdrawing..." : "Withdraw"}</span>
            </button>
          </div>
        );

      case "received":
        return (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => acceptRequest(connectionStatus.data.requestId)}
              disabled={isAcceptingRequest}
              className="inline-flex items-center gap-1.5 px-5 py-1.5 rounded-full bg-[#0a66c2] hover:bg-[#004182] text-white font-semibold text-xs sm:text-sm transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
            >
              <Check size={16} />
              <span>{isAcceptingRequest ? "Accepting..." : "Accept"}</span>
            </button>

            <button
              type="button"
              onClick={() => rejectRequest(connectionStatus.data.requestId)}
              disabled={isRejectingRequest}
              className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full border border-[rgba(0,0,0,0.6)] text-[rgba(0,0,0,0.75)] hover:bg-[rgba(0,0,0,0.05)] font-semibold text-xs sm:text-sm transition-colors disabled:opacity-50 cursor-pointer"
            >
              <X size={15} />
              <span>{isRejectingRequest ? "Declining..." : "Decline"}</span>
            </button>
          </div>
        );

      default:
        return (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => sendConnectionRequest(userData._id)}
              disabled={isSendingRequest}
              className="inline-flex items-center gap-1.5 px-5 py-1.5 rounded-full bg-[#0a66c2] hover:bg-[#004182] text-white font-semibold text-xs sm:text-sm transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
            >
              <UserPlus size={16} />
              <span>{isSendingRequest ? "Sending..." : "Connect"}</span>
            </button>

            <Link
              to="/messaging"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#0a66c2] text-[#0a66c2] hover:bg-[rgba(10,102,194,0.08)] font-semibold text-xs sm:text-sm transition-colors"
            >
              <MessageSquare size={15} />
              <span>Message</span>
            </Link>

            <button
              type="button"
              onClick={() => {
                const profileUrl = window.location.href;
                navigator.clipboard.writeText(profileUrl);
                toast.success("Profile link copied to clipboard!");
              }}
              className="p-1.5 rounded-full border border-[rgba(0,0,0,0.6)] text-[rgba(0,0,0,0.6)] hover:bg-[rgba(0,0,0,0.05)] transition-colors cursor-pointer"
              title="More options"
            >
              <MoreHorizontal size={18} />
            </button>
          </div>
        );
    }
  };

  const connectionsCount = userData?.connections?.length || 0;

  return (
    <div className="bg-white rounded-lg border border-[#e0dfdc] shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.05)] overflow-hidden mb-3 sm:mb-4">
      {/* Profile Banner */}
      <div
        className="relative h-44 sm:h-56 bg-gradient-to-r from-[#004182] via-[#0a66c2] to-[#0073b1] bg-cover bg-center"
        style={{
          backgroundImage:
            editedData.bannerImg || userData.bannerImg
              ? `url('${editedData.bannerImg || userData.bannerImg}')`
              : undefined,
        }}
      >
        {isOwnProfile && isEditing && (
          <label
            className="absolute top-3 right-3 bg-white/90 hover:bg-white text-[rgba(0,0,0,0.8)] p-2 rounded-full shadow-md cursor-pointer transition-transform hover:scale-105"
            title="Change banner background image"
          >
            <Camera size={18} />
            <input
              type="file"
              className="hidden"
              name="bannerImg"
              onChange={handleImageChange}
              accept="image/*"
            />
          </label>
        )}
      </div>

      {/* Main Details Section (Authentic LinkedIn Left-Aligned Layout) */}
      <div className="px-4 sm:px-6 pb-6 relative">
        {/* Profile Avatar Container overlapping Banner */}
        <div className="flex items-end justify-between -mt-16 sm:-mt-24 mb-3">
          <div className="relative">
            <img
              className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-white shadow-md bg-white flex-shrink-0"
              src={
                editedData.profilePicture ||
                userData.profilePicture ||
                "/avatar.png"
              }
              alt={userData.name}
            />

            {isOwnProfile && isEditing && (
              <label
                className="absolute bottom-1 right-1 bg-white hover:bg-gray-100 text-[rgba(0,0,0,0.8)] p-2 rounded-full shadow-md cursor-pointer border border-[#e0dfdc] transition-transform hover:scale-105"
                title="Update profile picture"
              >
                <Camera size={16} />
                <input
                  type="file"
                  className="hidden"
                  name="profilePicture"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </label>
            )}
          </div>

          {/* Quick Edit Icon on top-right for profile owner */}
          {isOwnProfile && !isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="p-2 rounded-full hover:bg-[rgba(0,0,0,0.06)] text-[rgba(0,0,0,0.6)] hover:text-black transition-colors cursor-pointer"
              title="Edit intro"
            >
              <Pencil size={18} />
            </button>
          )}
        </div>

        {/* User Identity Details */}
        {isEditing ? (
          <div className="space-y-3 mt-3 p-4 bg-[#edf3f8]/40 rounded-xl border border-[#e0dfdc]">
            <h3 className="text-xs font-semibold text-[rgba(0,0,0,0.6)] uppercase tracking-wider">
              Edit Intro
            </h3>

            <div>
              <label className="block text-xs font-medium text-[rgba(0,0,0,0.7)] mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={editedData.name ?? userData.name}
                onChange={(e) =>
                  setEditedData({ ...editedData, name: e.target.value })
                }
                className="w-full h-9 px-3 text-sm rounded bg-white border border-[#e0dfdc] focus:border-[#0a66c2] focus:outline-none"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[rgba(0,0,0,0.7)] mb-1">
                Headline *
              </label>
              <input
                type="text"
                value={editedData.headline ?? userData.headline}
                onChange={(e) =>
                  setEditedData({ ...editedData, headline: e.target.value })
                }
                className="w-full h-9 px-3 text-sm rounded bg-white border border-[#e0dfdc] focus:border-[#0a66c2] focus:outline-none"
                placeholder="Headline (e.g. Full Stack Developer | React, Node.js)"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[rgba(0,0,0,0.7)] mb-1">
                Location *
              </label>
              <input
                type="text"
                value={editedData.location ?? userData.location}
                onChange={(e) =>
                  setEditedData({ ...editedData, location: e.target.value })
                }
                className="w-full h-9 px-3 text-sm rounded bg-white border border-[#e0dfdc] focus:border-[#0a66c2] focus:outline-none"
                placeholder="City, State, Country"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                className="px-5 py-1.5 rounded-full bg-[#0a66c2] hover:bg-[#004182] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type="button"
                className="px-4 py-1.5 rounded-full border border-[rgba(0,0,0,0.6)] text-[rgba(0,0,0,0.75)] hover:bg-gray-100 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                onClick={() => {
                  setEditedData({});
                  setIsEditing(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-1.5 flex-1 min-w-0">
                {/* Name + Degree Badge + Verified Shield */}
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-bold text-[rgba(0,0,0,0.9)]">
                    {userData.name}
                  </h1>
                  <ShieldCheck size={19} className="text-[#0a66c2]" title="Verified Member" />
                  <span className="text-xs font-normal text-[rgba(0,0,0,0.6)]">
                    • 1st
                  </span>
                  <span className="text-xs text-[rgba(0,0,0,0.5)]">
                    (He/Him)
                  </span>
                </div>

                {/* Headline */}
                <p className="text-sm sm:text-base text-[rgba(0,0,0,0.9)] font-normal leading-snug max-w-2xl">
                  {userData.headline || "Professional at LinkedIn Community"}
                </p>

                {/* Talks about topics */}
                <p className="text-xs text-[#0a66c2] font-medium">
                  Talks about #fullstack, #reactjs, #ai, #webdevelopment, #nodejs
                </p>

                {/* Location & Contact Info */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-[rgba(0,0,0,0.6)] pt-0.5">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} className="text-[rgba(0,0,0,0.5)]" />
                    <span>{userData.location || "Earth"}</span>
                  </div>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => setShowContactModal(true)}
                    className="text-[#0a66c2] font-semibold hover:underline cursor-pointer"
                  >
                    Contact info
                  </button>
                </div>

                {/* Connections Count */}
                <div className="pt-0.5">
                  <Link
                    to="/network"
                    className="text-xs sm:text-sm text-[#0a66c2] font-semibold hover:underline inline-block"
                  >
                    {connectionsCount} {connectionsCount === 1 ? "connection" : "connections"}
                  </Link>
                </div>
              </div>

              {/* Desktop Right Side: Primary Company & Primary Education */}
              {(userData?.experience?.[0]?.company || userData?.education?.[0]?.school) && (
                <div className="hidden md:flex flex-col gap-2.5 pt-1 text-xs font-semibold text-[rgba(0,0,0,0.85)] flex-shrink-0 max-w-[220px]">
                  {userData?.experience?.[0]?.company && (
                    <div className="flex items-center gap-2 hover:text-[#0a66c2] transition-colors cursor-pointer">
                      <div className="w-8 h-8 rounded bg-[#edf3f8] border border-[#e0dfdc] flex items-center justify-center text-[#0a66c2] flex-shrink-0">
                        <Building2 size={16} />
                      </div>
                      <span className="leading-snug line-clamp-2">
                        {userData.experience[0].company}
                      </span>
                    </div>
                  )}

                  {userData?.education?.[0]?.school && (
                    <div className="flex items-center gap-2 hover:text-[#0a66c2] transition-colors cursor-pointer">
                      <div className="w-8 h-8 rounded bg-[#edf3f8] border border-[#e0dfdc] flex items-center justify-center text-[#0a66c2] flex-shrink-0">
                        <GraduationCap size={16} />
                      </div>
                      <span className="leading-snug line-clamp-2">
                        {userData.education[0].school}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons Row */}
            <div className="pt-3 flex flex-wrap items-center gap-2">
              {isOwnProfile ? (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      toast("You are currently open to new software development roles.")
                    }
                    className="px-4 py-1.5 rounded-full bg-[#0a66c2] hover:bg-[#004182] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs"
                  >
                    Open to
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-1.5 rounded-full border border-[#0a66c2] text-[#0a66c2] hover:bg-[rgba(10,102,194,0.08)] text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Add profile section
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-1.5 rounded-full border border-[rgba(0,0,0,0.6)] text-[rgba(0,0,0,0.75)] hover:bg-[rgba(0,0,0,0.05)] text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Pencil size={13} />
                    <span>Edit Profile</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      toast.success("Profile URL copied to clipboard!");
                    }}
                    className="px-3 py-1.5 rounded-full border border-[rgba(0,0,0,0.6)] text-[rgba(0,0,0,0.75)] hover:bg-[rgba(0,0,0,0.05)] text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                  >
                    More
                  </button>
                </>
              ) : (
                renderConnectionButton()
              )}
            </div>

            {/* Open to Work Highlight Card */}
            <div className="mt-4 p-3.5 rounded-lg bg-[#edf3f8]/70 border border-[#d0e2ec] flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs sm:text-sm text-[rgba(0,0,0,0.9)]">
                    Open to work
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#057642]/10 text-[#057642] font-semibold">
                    Active
                  </span>
                </div>
                <p className="text-xs text-[rgba(0,0,0,0.8)] font-medium">
                  Full-Stack Developer, Software Engineer, and Frontend Developer roles
                </p>
                <p className="text-[11px] text-[rgba(0,0,0,0.55)]">
                  Remote &bull; Full-time, Contract &bull; Open to opportunities
                </p>
              </div>
              {isOwnProfile && (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="p-1 rounded-full hover:bg-white/80 text-[rgba(0,0,0,0.6)] hover:text-black transition-colors cursor-pointer"
                  title="Edit job preferences"
                >
                  <Pencil size={15} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Contact Info Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[1px] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-[#e0dfdc] max-w-md w-full p-5 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#f0f0f0] pb-3">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[rgba(0,0,0,0.9)]">
                  {userData.name}
                </h3>
                <ShieldCheck size={16} className="text-[#0a66c2]" />
              </div>
              <button
                type="button"
                onClick={() => setShowContactModal(false)}
                className="p-1.5 rounded-full hover:bg-[rgba(0,0,0,0.06)] text-[rgba(0,0,0,0.6)] hover:text-black"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-[rgba(0,0,0,0.6)] mt-0.5" />
                <div>
                  <span className="font-semibold block text-[rgba(0,0,0,0.9)]">
                    Email
                  </span>
                  <a
                    href={`mailto:${userData.email}`}
                    className="text-[#0a66c2] hover:underline"
                  >
                    {userData.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ExternalLink size={18} className="text-[rgba(0,0,0,0.6)] mt-0.5" />
                <div>
                  <span className="font-semibold block text-[rgba(0,0,0,0.9)]">
                    Profile URL
                  </span>
                  <span className="text-[rgba(0,0,0,0.7)] break-all">
                    {window.location.origin}/profile/{userData.username}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#f0f0f0] text-right">
              <button
                type="button"
                onClick={() => setShowContactModal(false)}
                className="px-4 py-1.5 rounded-full bg-[#0a66c2] text-white text-xs font-semibold hover:bg-[#004182]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
