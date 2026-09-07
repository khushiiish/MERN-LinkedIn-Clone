import { useQuery } from "@tanstack/react-query";
import { useSearchParams, Link } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import LinkedInNews from "../components/LinkedInNews";
import RecommendedUser from "../components/RecommendedUser";
import { Search, Users, ArrowLeft } from "lucide-react";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || searchParams.get("q") || "";

  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    },
  });

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["searchUsers", query],
    queryFn: async () => {
      if (!query.trim()) return [];
      const res = await axiosInstance.get(
        `/users/search?query=${encodeURIComponent(query.trim())}`
      );
      return res.data;
    },
    enabled: !!query.trim(),
  });

  const results = searchResults || [];

  return (
    <div className="flex flex-col lg:flex-row gap-5 items-start justify-center">
      {/* Left Column (225px) */}
      <aside className="w-full lg:w-[225px] flex-shrink-0 hidden lg:block">
        <Sidebar user={authUser} />
      </aside>

      {/* Center Column: Search Results */}
      <main className="w-full lg:max-w-[555px] flex-1 space-y-3">
        {/* Top Header Card */}
        <div className="bg-white rounded-lg border border-[#e0dfdc] shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.05)] p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="p-1 rounded-full hover:bg-[rgba(0,0,0,0.06)] text-[rgba(0,0,0,0.6)] hover:text-black"
                title="Back to feed"
              >
                <ArrowLeft size={18} />
              </Link>
              <h1 className="text-base font-semibold text-[rgba(0,0,0,0.9)]">
                {query.trim() ? (
                  <>
                    Search results for{" "}
                    <span className="text-[#0a66c2] font-bold">
                      &quot;{query}&quot;
                    </span>
                  </>
                ) : (
                  "Search People on LinkedIn"
                )}
              </h1>
            </div>
            {query.trim() && !isLoading && (
              <span className="text-xs text-[rgba(0,0,0,0.6)] font-medium">
                {results.length} {results.length === 1 ? "result" : "results"}
              </span>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 pt-2 border-t border-[#f0f0f0] text-xs">
            <span className="px-3 py-1 rounded-full bg-[#057642] text-white font-semibold flex items-center gap-1">
              <Users size={12} />
              <span>People</span>
            </span>
          </div>
        </div>

        {/* Results List Card */}
        <div className="bg-white rounded-lg border border-[#e0dfdc] shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.05)] p-4">
          {isLoading ? (
            <div className="py-12 text-center text-xs text-[rgba(0,0,0,0.5)] animate-pulse">
              Searching for &quot;{query}&quot;...
            </div>
          ) : !query.trim() ? (
            <div className="py-12 text-center text-[rgba(0,0,0,0.6)]">
              <div className="w-12 h-12 rounded-full bg-[#edf3f8] text-[#0a66c2] flex items-center justify-center mx-auto mb-3">
                <Search size={24} />
              </div>
              <h3 className="text-sm font-semibold text-[rgba(0,0,0,0.8)] mb-1">
                Find anyone on LinkedIn
              </h3>
              <p className="text-xs text-[rgba(0,0,0,0.5)] max-w-xs mx-auto">
                Type a name, username, skill, or title in the top search bar to connect.
              </p>
            </div>
          ) : results.length > 0 ? (
            <div className="divide-y divide-[#f0f0f0]">
              {results.map((user) => (
                <div key={user._id} className="py-2.5 first:pt-0 last:pb-0">
                  <RecommendedUser user={user} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-[rgba(0,0,0,0.6)]">
              <div className="w-12 h-12 rounded-full bg-[#edf3f8] text-[rgba(0,0,0,0.4)] flex items-center justify-center mx-auto mb-3">
                <Users size={24} />
              </div>
              <h3 className="text-sm font-semibold text-[rgba(0,0,0,0.8)] mb-1">
                No results found for &quot;{query}&quot;
              </h3>
              <p className="text-xs text-[rgba(0,0,0,0.5)] max-w-xs mx-auto leading-relaxed">
                Check for typos or try searching with a different name, job title, or skill.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Right Column (300px) */}
      <aside className="w-full lg:w-[300px] flex-shrink-0 hidden lg:block">
        <LinkedInNews />
      </aside>
    </div>
  );
};

export default SearchPage;
