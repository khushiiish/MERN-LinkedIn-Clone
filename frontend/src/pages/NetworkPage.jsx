import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import { UserPlus, Users } from "lucide-react";
import FriendRequest from "../components/FriendRequest";
import UserCard from "../components/UserCard";

const NetworkPage = () => {
  const { data: user } = useQuery({ queryKey: ["authUser"] });

  const { data: connectionRequests } = useQuery({
    queryKey: ["connectionRequests"],
    queryFn: () => axiosInstance.get("/connections/requests"),
  });

  const { data: connections } = useQuery({
    queryKey: ["connections"],
    queryFn: () => axiosInstance.get("/connections"),
  });

  return (
    <div className="flex flex-col lg:flex-row gap-5 items-start justify-center">
      {/* Left Column: Sidebar (225px) */}
      <aside className="w-full lg:w-[225px] flex-shrink-0 hidden lg:block">
        <Sidebar user={user} />
      </aside>

      {/* Main Column */}
      <main className="w-full lg:flex-1 space-y-4">
        {/* Manage Network Header Card */}
        <div className="bg-white rounded-lg border border-[#e0dfdc] shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.05)] p-4 sm:p-5">
          <div className="flex items-center justify-between border-b border-[#e0dfdc] pb-3 mb-4">
            <h1 className="text-base sm:text-lg font-semibold text-[rgba(0,0,0,0.9)] flex items-center gap-2">
              <Users size={20} className="text-[#0a66c2]" />
              <span>Manage my network</span>
            </h1>
            <span className="text-xs font-semibold text-[rgba(0,0,0,0.6)]">
              {connections?.data?.length || 0} Connections
            </span>
          </div>

          {/* Pending Invitations */}
          {connectionRequests?.data?.length > 0 ? (
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-[rgba(0,0,0,0.9)] mb-3 flex items-center justify-between">
                <span>Invitations</span>
                <span className="text-xs text-[#0a66c2] font-normal">
                  {connectionRequests.data.length} Pending
                </span>
              </h2>
              <div className="space-y-2.5">
                {connectionRequests.data.map((request) => (
                  <FriendRequest key={request._id || request.id} request={request} />
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-[#fcfcfc] rounded-lg border border-[#f0f0f0] p-6 text-center mb-6">
              <UserPlus size={36} className="mx-auto text-[rgba(0,0,0,0.3)] mb-2" />
              <h3 className="text-sm font-semibold text-[rgba(0,0,0,0.8)] mb-1">
                No pending invitations
              </h3>
              <p className="text-xs text-[rgba(0,0,0,0.5)]">
                When people invite you to connect, you&apos;ll see their requests right here.
              </p>
            </div>
          )}

          {/* Connected Network */}
          {connections?.data?.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-[rgba(0,0,0,0.9)] mb-3">
                People you are connected with ({connections.data.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {connections.data.map((connection) => (
                  <UserCard
                    key={connection._id}
                    user={connection}
                    isConnection={true}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default NetworkPage;
