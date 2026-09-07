import { Link } from "react-router-dom";
import { Bookmark, Users, Plus, Compass } from "lucide-react";
import toast from "react-hot-toast";

export default function Sidebar({ user }) {
  return (
    <div className="space-y-2">
      {/* Top Profile Card */}
      <div className="bg-white rounded-lg border border-[#e0dfdc] shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.05)] overflow-hidden">
        {/* Banner */}
        <div
          className="h-16 bg-[#a0b4b7] bg-cover bg-center"
          style={{
            backgroundImage: user?.bannerImg ? `url("${user.bannerImg}")` : undefined,
          }}
        />

        {/* Profile Details */}
        <div className="px-3 pb-4 text-center border-b border-[#e0dfdc]">
          <Link to={`/profile/${user?.username || ""}`} className="inline-block">
            <img
              src={user?.profilePicture || "/avatar.png"}
              alt={user?.name || "User"}
              className="w-16 h-16 rounded-full mx-auto -mt-8 object-cover border-2 border-white shadow-sm hover:opacity-90 transition-opacity"
            />
            <h2 className="text-base font-semibold text-[rgba(0,0,0,0.9)] hover:underline mt-2">
              {user?.name || "Member"}
            </h2>
          </Link>
          <p className="text-xs text-[rgba(0,0,0,0.6)] mt-0.5 line-clamp-2 px-1">
            {user?.headline || "Software Engineer & Professional"}
          </p>
        </div>

        {/* Analytics & Connections */}
        <div className="py-2 border-b border-[#e0dfdc] text-xs">
          <Link
            to="/network"
            className="flex items-center justify-between px-3 py-1.5 hover:bg-[#0000000a] transition-colors"
          >
            <div className="flex flex-col text-left">
              <span className="text-[rgba(0,0,0,0.6)] font-medium">Connections</span>
              <span className="font-semibold text-[rgba(0,0,0,0.9)]">Grow your network</span>
            </div>
            <span className="text-[#0a66c2] font-semibold text-xs">
              {user?.connections?.length ?? 0}
            </span>
          </Link>

          <button
            onClick={() => toast("Profile analytics: 48 members viewed your profile this week")}
            className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#0000000a] transition-colors text-left"
          >
            <span className="text-[rgba(0,0,0,0.6)] font-medium">Profile viewers</span>
            <span className="text-[#0a66c2] font-semibold text-xs">48</span>
          </button>
        </div>

        {/* Premium Teaser */}
        <div className="p-3 border-b border-[#e0dfdc] text-xs">
          <p className="text-[rgba(0,0,0,0.6)]">Access exclusive tools & insights</p>
          <button
            onClick={() => toast.success("LinkedIn Premium unlocked")}
            className="flex items-center gap-1.5 font-semibold text-[rgba(0,0,0,0.9)] hover:text-[#0a66c2] hover:underline mt-1 text-left"
          >
            <span className="w-3 h-3 bg-[#f8c77e] rounded-sm inline-block flex-shrink-0" />
            <span>Try Premium for ₹0</span>
          </button>
        </div>

        {/* My Items / Saved Items */}
        <div className="p-3">
          <Link
            to={`/profile/${user?.username || ""}`}
            className="flex items-center gap-2 text-xs font-semibold text-[rgba(0,0,0,0.9)] hover:text-[#0a66c2] transition-colors"
          >
            <Bookmark size={14} className="text-[rgba(0,0,0,0.6)]" />
            <span>Saved items</span>
          </Link>
        </div>
      </div>

      {/* Bottom Sticky Card: Recent, Groups, Events */}
      <div className="bg-white rounded-lg border border-[#e0dfdc] shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.05)] p-3 text-xs sticky top-[70px]">
        <div className="space-y-3">
          <div>
            <span className="text-[rgba(0,0,0,0.6)] font-medium block mb-2">Recent</span>
            <div className="space-y-1 text-[rgba(0,0,0,0.8)] font-medium">
              <div className="flex items-center gap-1.5 text-[rgba(0,0,0,0.7)] hover:text-black cursor-pointer truncate">
                <Users size={12} />
                <span>React & Node.js Developers</span>
              </div>
              <div className="flex items-center gap-1.5 text-[rgba(0,0,0,0.7)] hover:text-black cursor-pointer truncate">
                <Users size={12} />
                <span>Full Stack JavaScript Community</span>
              </div>
            </div>
          </div>

          <div className="border-t border-[#e0dfdc] pt-2">
            <div className="flex items-center justify-between text-[#0a66c2] font-semibold hover:underline cursor-pointer mb-1.5">
              <span>Groups</span>
              <Plus size={14} />
            </div>
            <div className="flex items-center justify-between text-[#0a66c2] font-semibold hover:underline cursor-pointer mb-1.5">
              <span>Events</span>
              <Plus size={14} />
            </div>
            <div className="text-[#0a66c2] font-semibold hover:underline cursor-pointer">
              <span>Followed Hashtags</span>
            </div>
          </div>

          <div className="border-t border-[#e0dfdc] pt-2 text-center">
            <button
              onClick={() => toast("Exploring community groups and topics...")}
              className="text-[rgba(0,0,0,0.6)] hover:text-black hover:bg-[#0000000a] w-full py-1.5 rounded font-semibold transition-colors flex items-center justify-center gap-1"
            >
              <Compass size={13} />
              <span>Discover more</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
