import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Check, Clock, UserCheck, Plus, X } from "lucide-react";

const RecommendedUser = ({ user }) => {
  const queryClient = useQueryClient();

  const { data: connectionStatus, isLoading } = useQuery({
    queryKey: ["connectionStatus", user._id],
    queryFn: () => axiosInstance.get(`/connections/status/${user._id}`),
  });

  const { mutate: sendConnectionRequest, isPending: isSendingRequest } = useMutation({
    mutationFn: (userId) => axiosInstance.post(`/connections/request/${userId}`),
    onSuccess: () => {
      toast.success(`Connection request sent to ${user.name}`);
      queryClient.invalidateQueries({ queryKey: ["connectionStatus", user._id] });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "An error occurred"
      );
    },
  });

  const { mutate: acceptRequest } = useMutation({
    mutationFn: (requestId) => axiosInstance.put(`/connections/accept/${requestId}`),
    onSuccess: () => {
      toast.success("Connection request accepted");
      queryClient.invalidateQueries({ queryKey: ["connectionStatus", user._id] });
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "An error occurred"
      );
    },
  });

  const { mutate: rejectRequest } = useMutation({
    mutationFn: (requestId) => axiosInstance.put(`/connections/reject/${requestId}`),
    onSuccess: () => {
      toast.success("Connection request ignored");
      queryClient.invalidateQueries({ queryKey: ["connectionStatus", user._id] });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "An error occurred"
      );
    },
  });

  const renderButton = () => {
    if (isLoading) {
      return (
        <span className="text-[11px] text-[rgba(0,0,0,0.4)] px-2 py-1">
          ...
        </span>
      );
    }

    switch (connectionStatus?.data?.status) {
      case "pending":
        return (
          <span className="px-3 py-1 rounded-full text-xs bg-[rgba(0,0,0,0.08)] text-[rgba(0,0,0,0.6)] font-semibold flex items-center gap-1">
            <Clock size={12} />
            <span>Pending</span>
          </span>
        );
      case "received":
        return (
          <div className="flex gap-1.5 items-center">
            <button
              onClick={() => acceptRequest(connectionStatus.data.requestId)}
              title="Accept"
              className="rounded-full p-1.5 bg-[#057642] hover:bg-[#03522e] text-white transition-colors"
            >
              <Check size={14} />
            </button>
            <button
              onClick={() => rejectRequest(connectionStatus.data.requestId)}
              title="Ignore"
              className="rounded-full p-1.5 border border-[rgba(0,0,0,0.3)] text-[rgba(0,0,0,0.6)] hover:bg-[#0000000a] transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        );
      case "connected":
        return (
          <span className="px-3 py-1 rounded-full text-xs text-[#057642] border border-[#057642] font-semibold flex items-center gap-1">
            <UserCheck size={13} />
            <span>Connected</span>
          </span>
        );
      default:
        return (
          <button
            onClick={() => sendConnectionRequest(user._id)}
            disabled={isSendingRequest}
            className="px-3.5 py-1 rounded-full text-xs border border-[rgba(0,0,0,0.6)] hover:border-black hover:bg-[rgba(0,0,0,0.04)] font-semibold text-[rgba(0,0,0,0.75)] hover:text-black flex items-center gap-1 transition-all disabled:opacity-50 cursor-pointer flex-shrink-0"
          >
            <Plus size={14} />
            <span>{isSendingRequest ? "Sending..." : "Connect"}</span>
          </button>
        );
    }
  };

  return (
    <div className="flex items-start justify-between gap-2 py-2 border-b border-[#f0f0f0] last:border-b-0">
      <Link
        to={`/profile/${user.username}`}
        className="flex items-start gap-2.5 min-w-0 flex-1 group"
      >
        <img
          src={user.profilePicture || "/avatar.png"}
          alt={user.name}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-[#e0dfdc]"
        />
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-xs text-[rgba(0,0,0,0.9)] group-hover:text-[#0a66c2] group-hover:underline truncate">
            {user.name}
          </h4>
          <p className="text-[11px] text-[rgba(0,0,0,0.6)] line-clamp-2 leading-tight mt-0.5">
            {user.headline || "Software Professional"}
          </p>
        </div>
      </Link>
      <div className="pt-0.5">{renderButton()}</div>
    </div>
  );
};

export default RecommendedUser;
