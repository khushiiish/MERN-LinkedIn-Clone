import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import {
  Bell,
  Briefcase,
  Home,
  PlusSquare,
  Users,
} from "lucide-react";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => axiosInstance.get("/notifications"),
  });

  const { data: connectionRequests } = useQuery({
    queryKey: ["connectionRequests"],
    queryFn: async () => axiosInstance.get("/connections/requests"),
  });

  const unreadNotificationCount =
    notifications?.data?.filter((n) => !n.read).length || 0;
  const unreadConnectionRequestsCount =
    connectionRequests?.data?.length || 0;

  const isActive = (path) => location.pathname === path;

  const handlePostClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("open-post-modal"));
      }, 150);
    } else {
      window.dispatchEvent(new CustomEvent("open-post-modal"));
    }
  };

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 h-[52px] bg-white border-t border-[#e0dfdc] z-40 flex items-center justify-around px-2 shadow-[0_-2px_6px_rgba(0,0,0,0.05)]">
      {/* Home */}
      <Link
        to="/"
        className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-colors ${
          isActive("/")
            ? "text-black font-semibold"
            : "text-[rgba(0,0,0,0.6)] hover:text-black"
        }`}
      >
        <Home size={22} />
        <span className="text-[10px] mt-0.5 leading-none">Home</span>
      </Link>

      {/* My Network */}
      <Link
        to="/network"
        className={`flex flex-col items-center justify-center flex-1 h-full py-1 relative transition-colors ${
          isActive("/network")
            ? "text-black font-semibold"
            : "text-[rgba(0,0,0,0.6)] hover:text-black"
        }`}
      >
        <div className="relative">
          <Users size={22} />
          {unreadConnectionRequestsCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-[#cc1016] text-white text-[9px] font-bold rounded-full min-w-[14px] h-[14px] flex items-center justify-center px-0.5">
              {unreadConnectionRequestsCount}
            </span>
          )}
        </div>
        <span className="text-[10px] mt-0.5 leading-none">My Network</span>
      </Link>

      {/* Post Action */}
      <button
        type="button"
        onClick={handlePostClick}
        className="flex flex-col items-center justify-center flex-1 h-full py-1 text-[rgba(0,0,0,0.6)] hover:text-black transition-colors cursor-pointer"
      >
        <PlusSquare size={22} />
        <span className="text-[10px] mt-0.5 leading-none">Post</span>
      </button>

      {/* Notifications */}
      <Link
        to="/notifications"
        className={`flex flex-col items-center justify-center flex-1 h-full py-1 relative transition-colors ${
          isActive("/notifications")
            ? "text-black font-semibold"
            : "text-[rgba(0,0,0,0.6)] hover:text-black"
        }`}
      >
        <div className="relative">
          <Bell size={22} />
          {unreadNotificationCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-[#cc1016] text-white text-[9px] font-bold rounded-full min-w-[14px] h-[14px] flex items-center justify-center px-0.5">
              {unreadNotificationCount}
            </span>
          )}
        </div>
        <span className="text-[10px] mt-0.5 leading-none">Notifications</span>
      </Link>

      {/* Jobs */}
      <Link
        to="/jobs"
        className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-colors ${
          isActive("/jobs")
            ? "text-black font-semibold"
            : "text-[rgba(0,0,0,0.6)] hover:text-black"
        }`}
      >
        <Briefcase size={22} />
        <span className="text-[10px] mt-0.5 leading-none">Jobs</span>
      </Link>
    </nav>
  );
};

export default BottomNav;
