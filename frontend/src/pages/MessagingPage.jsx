import { Link } from "react-router-dom";
import { MessageSquare, ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import LinkedInNews from "../components/LinkedInNews";

const MessagingPage = () => {
  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    },
  });

  return (
    <div className="flex flex-col lg:flex-row gap-5 items-start justify-center">
      {/* Left Column (225px) */}
      <aside className="w-full lg:w-[225px] flex-shrink-0 hidden lg:block">
        <Sidebar user={authUser} />
      </aside>

      {/* Main Content */}
      <main className="w-full lg:max-w-[555px] flex-1">
        <div className="bg-white rounded-lg border border-[#e0dfdc] shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.05)] p-8 sm:p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-[#edf3f8] text-[#0a66c2] flex items-center justify-center mx-auto mb-4">
            <MessageSquare size={30} />
          </div>

          <h1 className="text-xl font-semibold text-[rgba(0,0,0,0.9)] mb-2">
            Messaging is currently being built
          </h1>
          <p className="text-xs sm:text-sm text-[rgba(0,0,0,0.6)] max-w-sm mx-auto mb-6 leading-relaxed">
            We are working on this page. Check back soon for direct messages and conversations with your network.
          </p>

          <div className="flex items-center justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0a66c2] hover:bg-[#004182] text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Back to feed</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Right Column (300px) */}
      <aside className="w-full lg:w-[300px] flex-shrink-0 hidden lg:block">
        <LinkedInNews />
      </aside>
    </div>
  );
};

export default MessagingPage;
