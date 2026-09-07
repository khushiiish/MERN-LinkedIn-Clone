import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import {
  Bell,
  CheckCheck,
  ExternalLink,
  Eye,
  MessageSquare,
  ThumbsUp,
  Trash2,
  UserPlus,
} from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { formatDistanceToNow } from "date-fns";

const NotificationsPage = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const queryClient = useQueryClient();

  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => axiosInstance.get("/notifications"),
  });

  const { mutate: markAsReadMutation } = useMutation({
    mutationFn: (id) => axiosInstance.put(`/notifications/${id}/read`),
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });

  const { mutate: deleteNotificationMutation } = useMutation({
    mutationFn: (id) => axiosInstance.delete(`/notifications/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
      toast.success("Notification deleted");
    },
  });

  const renderNotificationIcon = (type) => {
    switch (type) {
      case "like":
        return (
          <div className="w-8 h-8 rounded-full bg-[#0a66c2] text-white flex items-center justify-center flex-shrink-0">
            <ThumbsUp size={14} className="fill-white" />
          </div>
        );
      case "comment":
        return (
          <div className="w-8 h-8 rounded-full bg-[#057642] text-white flex items-center justify-center flex-shrink-0">
            <MessageSquare size={14} className="fill-white" />
          </div>
        );
      case "connectionAccepted":
        return (
          <div className="w-8 h-8 rounded-full bg-[#0a66c2] text-white flex items-center justify-center flex-shrink-0">
            <UserPlus size={14} />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center flex-shrink-0">
            <Bell size={14} />
          </div>
        );
    }
  };

  const renderNotificationContent = (notification) => {
    switch (notification.type) {
      case "like":
        return (
          <span>
            <strong className="text-[rgba(0,0,0,0.9)]">
              {notification.relatedUser?.name || "Someone"}
            </strong>{" "}
            reacted to your post.
          </span>
        );
      case "comment":
        return (
          <span>
            <Link
              to={`/profile/${notification.relatedUser?.username}`}
              className="font-semibold text-[rgba(0,0,0,0.9)] hover:text-[#0a66c2] hover:underline"
            >
              {notification.relatedUser?.name || "Someone"}
            </Link>{" "}
            commented on your post.
          </span>
        );
      case "connectionAccepted":
        return (
          <span>
            <Link
              to={`/profile/${notification.relatedUser?.username}`}
              className="font-semibold text-[rgba(0,0,0,0.9)] hover:text-[#0a66c2] hover:underline"
            >
              {notification.relatedUser?.name || "Someone"}
            </Link>{" "}
            accepted your connection invitation.
          </span>
        );
      default:
        return null;
    }
  };

  const renderRelatedPost = (relatedPost) => {
    if (!relatedPost) return null;

    return (
      <Link
        to={`/post/${relatedPost._id}`}
        className="mt-1.5 p-2 bg-[#f4f2ee] rounded border border-[#e0dfdc] flex items-center gap-2 hover:bg-[#eae8e4] transition-colors max-w-md"
      >
        {relatedPost.image && (
          <img
            src={relatedPost.image}
            alt="Post preview"
            className="w-8 h-8 object-cover rounded flex-shrink-0"
          />
        )}
        <p className="text-xs text-[rgba(0,0,0,0.7)] truncate flex-1">
          {relatedPost.content}
        </p>
        <ExternalLink size={13} className="text-[rgba(0,0,0,0.4)] flex-shrink-0" />
      </Link>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5 items-start justify-center">
      <aside className="w-full lg:w-[225px] flex-shrink-0 hidden lg:block">
        <Sidebar user={authUser} />
      </aside>

      <main className="w-full lg:flex-1">
        <div className="bg-white rounded-lg border border-[#e0dfdc] shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="p-4 border-b border-[#e0dfdc] flex items-center justify-between">
            <h1 className="text-base font-semibold text-[rgba(0,0,0,0.9)]">
              Notifications
            </h1>
            <span className="text-xs text-[rgba(0,0,0,0.5)]">
              {notifications?.data?.length || 0} Total
            </span>
          </div>

          {isLoading ? (
            <div className="p-8 text-center text-xs text-[rgba(0,0,0,0.5)] animate-pulse">
              Loading updates...
            </div>
          ) : notifications && notifications.data.length > 0 ? (
            <ul className="divide-y divide-[#f0f0f0]">
              {notifications.data.map((notification) => (
                <li
                  key={notification._id}
                  className={`p-3.5 sm:p-4 flex items-start justify-between gap-3 transition-colors ${
                    !notification.read ? "bg-[#edf3f8]" : "hover:bg-[rgba(0,0,0,0.02)]"
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    {renderNotificationIcon(notification.type)}

                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm text-[rgba(0,0,0,0.85)] leading-snug">
                        {renderNotificationContent(notification)}
                      </p>
                      <p className="text-[11px] text-[rgba(0,0,0,0.5)] mt-1">
                        {notification.createdAt && !isNaN(new Date(notification.createdAt))
                          ? formatDistanceToNow(new Date(notification.createdAt), {
                              addSuffix: true,
                            })
                          : "Just now"}
                      </p>
                      {renderRelatedPost(notification.relatedPost)}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    {!notification.read && (
                      <button
                        onClick={() => markAsReadMutation(notification._id)}
                        className="p-1.5 text-[#0a66c2] hover:bg-[rgba(10,102,194,0.1)] rounded-full transition-colors"
                        title="Mark as read"
                      >
                        <CheckCheck size={16} />
                      </button>
                    )}

                    <button
                      onClick={() => deleteNotificationMutation(notification._id)}
                      className="p-1.5 text-[rgba(0,0,0,0.4)] hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      title="Delete notification"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-8 text-center text-xs text-[rgba(0,0,0,0.5)]">
              No notifications at the moment. You're all caught up!
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default NotificationsPage;
