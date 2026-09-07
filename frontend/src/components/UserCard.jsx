import { Link } from "react-router-dom";
import { MessageSquare, UserCheck } from "lucide-react";

function UserCard({ user, isConnection }) {
  return (
    <div className="bg-white rounded-lg border border-[#e0dfdc] shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col items-center text-center transition-all hover:shadow-md">
      {/* Mini banner */}
      <div
        className="w-full h-14 bg-[#a0b4b7] bg-cover bg-center"
        style={{
          backgroundImage: user?.bannerImg ? `url("${user.bannerImg}")` : undefined,
        }}
      />

      <div className="p-4 pt-0 w-full flex flex-col items-center flex-1">
        <Link to={`/profile/${user.username}`} className="inline-block -mt-8">
          <img
            src={user.profilePicture || "/avatar.png"}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm hover:opacity-95"
          />
        </Link>

        <Link
          to={`/profile/${user.username}`}
          className="font-semibold text-sm text-[rgba(0,0,0,0.9)] hover:text-[#0a66c2] hover:underline mt-2 truncate max-w-full"
        >
          {user.name}
        </Link>

        <p className="text-xs text-[rgba(0,0,0,0.6)] line-clamp-2 mt-1 h-8 px-1">
          {user.headline || "Software Engineer"}
        </p>

        <p className="text-[11px] text-[rgba(0,0,0,0.5)] mt-2">
          {user.connections?.length ?? 0} connections
        </p>

        <div className="mt-auto pt-3 w-full">
          {isConnection ? (
            <Link
              to="/messaging"
              className="w-full py-1.5 px-3 rounded-full border border-[#0a66c2] text-[#0a66c2] hover:bg-[rgba(10,102,194,0.08)] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <MessageSquare size={13} />
              <span>Message</span>
            </Link>
          ) : (
            <button className="w-full py-1.5 px-3 rounded-full border border-[rgba(0,0,0,0.6)] hover:border-black text-[rgba(0,0,0,0.75)] hover:text-black hover:bg-[rgba(0,0,0,0.04)] text-xs font-semibold transition-colors">
              Connect
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserCard;
