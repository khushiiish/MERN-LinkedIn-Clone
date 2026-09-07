import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const FriendRequest = ({ request }) => {
  const queryClient = useQueryClient();

  const { mutate: acceptConnectionRequest, isPending: isAccepting } = useMutation({
    mutationFn: (requestId) =>
      axiosInstance.put(`/connections/accept/${requestId}`),
    onSuccess: () => {
      toast.success("Connection request accepted");
      queryClient.invalidateQueries({ queryKey: ["connectionRequests"] });
      queryClient.invalidateQueries({ queryKey: ["connections"] });
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "An error occurred"
      );
    },
  });

  const { mutate: rejectConnectionRequest, isPending: isRejecting } = useMutation({
    mutationFn: (requestId) =>
      axiosInstance.put(`/connections/reject/${requestId}`),
    onSuccess: () => {
      toast.success("Connection request ignored");
      queryClient.invalidateQueries({ queryKey: ["connectionRequests"] });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "An error occurred"
      );
    },
  });

  return (
    <div className="bg-white rounded-lg border border-[#e0dfdc] shadow-xs p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-colors hover:bg-[rgba(0,0,0,0.01)]">
      <div className="flex items-center gap-3">
        <Link to={`/profile/${request.sender?.username}`}>
          <img
            src={request.sender?.profilePicture || "/avatar.png"}
            alt={request.sender?.name || "User"}
            className="w-14 h-14 rounded-full object-cover border border-[#e0dfdc]"
          />
        </Link>

        <div>
          <Link
            to={`/profile/${request.sender?.username}`}
            className="font-semibold text-sm text-[rgba(0,0,0,0.9)] hover:text-[#0a66c2] hover:underline"
          >
            {request.sender?.name}
          </Link>
          <p className="text-xs text-[rgba(0,0,0,0.6)] line-clamp-1">
            {request.sender?.headline || "Software Engineer"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        <button
          disabled={isRejecting || isAccepting}
          className="border border-[rgba(0,0,0,0.6)] text-[rgba(0,0,0,0.75)] hover:text-black hover:border-black hover:bg-[rgba(0,0,0,0.04)] px-4 py-1.5 rounded-full text-xs font-semibold transition-colors disabled:opacity-50"
          onClick={() => rejectConnectionRequest(request._id)}
        >
          Ignore
        </button>
        <button
          disabled={isRejecting || isAccepting}
          className="bg-[#0a66c2] hover:bg-[#004182] text-white px-4 py-1.5 rounded-full text-xs font-semibold transition-colors disabled:opacity-50"
          onClick={() => acceptConnectionRequest(request._id)}
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default FriendRequest;
