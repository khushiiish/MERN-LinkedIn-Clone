import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  Bookmark,
  Briefcase,
  ChevronDown,
  Code2,
  ExternalLink,
  Home,
  LayoutGrid,
  LogOut,
  MessageSquare,
  Search,
  Settings,
  Users,
  X,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

const Navbar = () => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  const authUser = queryClient.getQueryData(["authUser"]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMeOpen, setIsMeOpen] = useState(false);
  const [isBusinessOpen, setIsBusinessOpen] = useState(false);

  const searchRef = useRef(null);
  const searchMobileRef = useRef(null);
  const meRef = useRef(null);
  const businessRef = useRef(null);

  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => axiosInstance.get("/notifications"),
    enabled: !!authUser,
  });

  const { data: connectionRequests } = useQuery({
    queryKey: ["connectionRequests"],
    queryFn: async () => axiosInstance.get("/connections/requests"),
    enabled: !!authUser,
  });

  // Instant search suggestions as user types
  const { data: searchSuggestions, isLoading: isSearching } = useQuery({
    queryKey: ["navbarSearch", searchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) return [];
      const res = await axiosInstance.get(
        `/users/search?query=${encodeURIComponent(searchQuery.trim())}`
      );
      return res.data;
    },
    enabled: !!authUser && searchQuery.trim().length > 0,
  });

  const { mutate: logout } = useMutation({
    mutationFn: () => axiosInstance.post("/auth/logout"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Signed out successfully");
      navigate("/login");
    },
  });

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        (!searchMobileRef.current || !searchMobileRef.current.contains(event.target))
      ) {
        setIsSearchOpen(false);
      }
      if (
        !event.target.closest("#mobile-me-drawer") &&
        meRef.current &&
        !meRef.current.contains(event.target)
      ) {
        setIsMeOpen(false);
      }
      if (businessRef.current && !businessRef.current.contains(event.target)) {
        setIsBusinessOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadNotificationCount =
    notifications?.data?.filter((notif) => !notif.read).length || 0;
  const unreadConnectionRequestsCount =
    connectionRequests?.data?.length || 0;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const isActive = (path) => location.pathname === path;

  // Render search suggestions dropdown
  const renderSearchSuggestions = (isMobile = false) => {
    if (!isSearchOpen || !searchQuery.trim()) return null;
    return (
      <div
        className={
          isMobile
            ? "fixed left-2 right-2 top-[50px] bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-[#e0dfdc] z-50 py-2 overflow-hidden text-left"
            : "absolute left-0 top-[38px] w-[340px] bg-white rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.18)] border border-[#e0dfdc] z-50 py-2 overflow-hidden text-left"
        }
      >
        <div className="px-3 py-1 text-[11px] font-semibold text-[rgba(0,0,0,0.6)] border-b border-[#f0f0f0] uppercase tracking-wider flex items-center justify-between">
          <span>People</span>
          {isSearching && (
            <span className="text-[10px] text-[rgba(0,0,0,0.4)]">
              Searching...
            </span>
          )}
        </div>

        <div className="max-h-[260px] overflow-y-auto divide-y divide-[#f9f9f9]">
          {searchSuggestions && searchSuggestions.length > 0 ? (
            searchSuggestions.slice(0, 5).map((user) => (
              <Link
                key={user._id}
                to={`/profile/${user.username}`}
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery("");
                }}
                className="flex items-center gap-2.5 px-3 py-2 hover:bg-[#edf3f8] transition-colors"
              >
                <img
                  src={user.profilePicture || "/avatar.png"}
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover border border-[#e0dfdc] flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-semibold text-[rgba(0,0,0,0.9)] truncate">
                    {user.name}
                  </h4>
                  <p className="text-[11px] text-[rgba(0,0,0,0.6)] truncate">
                    {user.headline || "Software Engineer"}
                  </p>
                </div>
              </Link>
            ))
          ) : !isSearching ? (
            <div className="px-3 py-4 text-center text-xs text-[rgba(0,0,0,0.5)]">
              No members found matching &quot;{searchQuery}&quot;
            </div>
          ) : null}
        </div>

        {/* View All Results Link */}
        <button
          type="button"
          onClick={handleSearchSubmit}
          className="w-full text-left px-3 py-2 text-xs font-semibold text-[#0a66c2] hover:bg-[#edf3f8] border-t border-[#f0f0f0] transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Search size={13} />
          <span>See all results for &quot;{searchQuery}&quot;</span>
        </button>
      </div>
    );
  };

  return (
    <nav className="bg-white border-b border-[#e0dfdc] sticky top-0 z-40 h-[53px]">
      {/* ========================================================================= */}
      {/* MOBILE TOP BAR (< sm) - 100% Real LinkedIn Mobile Anatomy                 */}
      {/* Avatar on Left -> Full-Width Search in Center -> Direct Messages on Right */}
      {/* ========================================================================= */}
      <div className="flex sm:hidden items-center justify-between w-full h-full px-2 gap-2">
        {authUser ? (
          <>
            {/* Left: Avatar Thumbnail (Taps to open Profile & Account Drawer) */}
            <button
              type="button"
              onClick={() => setIsMeOpen(true)}
              className="flex-shrink-0 p-0.5 rounded-full hover:ring-2 hover:ring-[#0a66c2] transition-all cursor-pointer"
              title="Open profile menu"
            >
              <img
                src={authUser?.profilePicture || "/avatar.png"}
                alt={authUser?.name || "Me"}
                className="w-8 h-8 rounded-full object-cover border border-[#e0dfdc]"
              />
            </button>

            {/* Middle: Full-width search bar with instant autocomplete */}
            <div ref={searchMobileRef} className="relative flex-1 min-w-0">
              <form
                onSubmit={handleSearchSubmit}
                className="relative flex items-center w-full"
              >
                <button
                  type="submit"
                  className="absolute left-2.5 text-[rgba(0,0,0,0.6)] hover:text-black flex items-center justify-center p-0.5"
                  title="Search"
                >
                  <Search size={15} />
                </button>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onFocus={() => setIsSearchOpen(true)}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  className="w-full h-[34px] pl-8 pr-7 rounded bg-[#edf3f8] text-xs text-[rgba(0,0,0,0.9)] placeholder:text-[rgba(0,0,0,0.6)] border border-transparent focus:border-[rgba(0,0,0,0.9)] focus:bg-white focus:outline-none transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 text-[rgba(0,0,0,0.4)] hover:text-black p-0.5"
                  >
                    <X size={14} />
                  </button>
                )}
              </form>
              {renderSearchSuggestions(true)}
            </div>

            {/* Right: Direct Messaging button */}
            <Link
              to="/messaging"
              className={`p-1.5 rounded-full text-[rgba(0,0,0,0.6)] hover:text-black transition-colors ${
                isActive("/messaging") ? "text-[#0a66c2]" : ""
              }`}
              title="Messaging"
            >
              <MessageSquare size={22} />
            </Link>
          </>
        ) : (
          <>
            <Link to="/" className="flex-shrink-0" title="LinkedIn">
              <svg
                className="h-[30px] w-[30px] rounded"
                viewBox="0 0 34 34"
                fill="none"
              >
                <rect width="34" height="34" rx="4" fill="#0A66C2" />
                <path
                  d="M8.5 13.5H13V26.5H8.5V13.5ZM10.75 7.5C9.37 7.5 8.25 8.62 8.25 10C8.25 11.38 9.37 12.5 10.75 12.5C12.13 12.5 13.25 11.38 13.25 10C13.25 8.62 12.13 7.5 10.75 7.5ZM15 13.5H19.2V15.3H19.26C19.85 14.2 21.3 13.05 23.45 13.05C27.95 13.05 28.8 16 28.8 19.85V26.5H24.3V20.15C24.3 18.65 24.25 16.7 22.2 16.7C20.1 16.7 19.8 18.35 19.8 20.05V26.5H15.3L15 13.5Z"
                  fill="white"
                />
              </svg>
            </Link>
            <div className="flex items-center gap-2">
              <Link
                to="/signup"
                className="text-xs font-semibold text-[rgba(0,0,0,0.7)] px-2.5 py-1.5"
              >
                Join now
              </Link>
              <Link
                to="/login"
                className="text-xs font-semibold text-[#0a66c2] border border-[#0a66c2] rounded-full px-3 py-1"
              >
                Sign in
              </Link>
            </div>
          </>
        )}
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP TOP BAR (>= sm) - Standard Authentic LinkedIn Laptop Anatomy      */}
      {/* ========================================================================= */}
      <div className="hidden sm:flex items-center justify-between max-w-[1128px] mx-auto h-full px-4">
        {/* Left: Logo & Search */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-1 max-w-md">
          <Link to="/" className="flex-shrink-0" title="LinkedIn Home">
            <svg
              className="h-[34px] w-[34px] rounded"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="34" height="34" rx="4" fill="#0A66C2" />
              <path
                d="M8.5 13.5H13V26.5H8.5V13.5ZM10.75 7.5C9.37 7.5 8.25 8.62 8.25 10C8.25 11.38 9.37 12.5 10.75 12.5C12.13 12.5 13.25 11.38 13.25 10C13.25 8.62 12.13 7.5 10.75 7.5ZM15 13.5H19.2V15.3H19.26C19.85 14.2 21.3 13.05 23.45 13.05C27.95 13.05 28.8 16 28.8 19.85V26.5H24.3V20.15C24.3 18.65 24.25 16.7 22.2 16.7C20.1 16.7 19.8 18.35 19.8 20.05V26.5H15.3L15 13.5Z"
                fill="white"
              />
            </svg>
          </Link>

          {/* Search Container with Instant Dropdown */}
          <div ref={searchRef} className="relative flex-1 max-w-[280px]">
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex items-center w-full"
            >
              <button
                type="submit"
                className="absolute left-2.5 text-[rgba(0,0,0,0.6)] hover:text-black transition-colors cursor-pointer flex items-center justify-center p-0.5"
                title="Click to search"
              >
                <Search size={16} />
              </button>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onFocus={() => setIsSearchOpen(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                className="w-full h-[34px] pl-9 pr-7 rounded bg-[#edf3f8] text-sm text-[rgba(0,0,0,0.9)] placeholder:text-[rgba(0,0,0,0.6)] border border-transparent focus:border-[rgba(0,0,0,0.9)] focus:bg-white focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 text-[rgba(0,0,0,0.4)] hover:text-black p-0.5"
                >
                  <X size={14} />
                </button>
              )}
            </form>
            {renderSearchSuggestions(false)}
          </div>
        </div>

        {/* Right: Main Desktop Navigation Bar */}
        <div className="flex items-center h-full">
          {authUser ? (
            <div className="flex items-center h-full">
              {/* Home */}
              <Link
                to="/"
                className={`flex flex-col items-center justify-center h-full min-w-[68px] px-2 border-b-2 transition-colors ${
                  isActive("/")
                    ? "border-black text-black"
                    : "border-transparent text-[rgba(0,0,0,0.6)] hover:text-black"
                }`}
              >
                <Home size={20} />
                <span className="text-[11px] font-normal mt-0.5">Home</span>
              </Link>

              {/* My Network */}
              <Link
                to="/network"
                className={`flex flex-col items-center justify-center h-full min-w-[68px] px-2 border-b-2 relative transition-colors ${
                  isActive("/network")
                    ? "border-black text-black"
                    : "border-transparent text-[rgba(0,0,0,0.6)] hover:text-black"
                }`}
              >
                <div className="relative">
                  <Users size={20} />
                  {unreadConnectionRequestsCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-[#cc1016] text-white text-[10px] font-bold rounded-full min-w-[15px] h-[15px] flex items-center justify-center px-1">
                      {unreadConnectionRequestsCount}
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-normal mt-0.5">My Network</span>
              </Link>

              {/* Jobs */}
              <Link
                to="/jobs"
                className={`flex flex-col items-center justify-center h-full min-w-[68px] px-2 border-b-2 transition-colors ${
                  isActive("/jobs")
                    ? "border-black text-black"
                    : "border-transparent text-[rgba(0,0,0,0.6)] hover:text-black"
                }`}
              >
                <Briefcase size={20} />
                <span className="text-[11px] font-normal mt-0.5">Jobs</span>
              </Link>

              {/* Messaging */}
              <Link
                to="/messaging"
                className={`flex flex-col items-center justify-center h-full min-w-[68px] px-2 border-b-2 transition-colors ${
                  isActive("/messaging")
                    ? "border-black text-black"
                    : "border-transparent text-[rgba(0,0,0,0.6)] hover:text-black"
                }`}
              >
                <MessageSquare size={20} />
                <span className="text-[11px] font-normal mt-0.5">Messaging</span>
              </Link>

              {/* Notifications */}
              <Link
                to="/notifications"
                className={`flex flex-col items-center justify-center h-full min-w-[68px] px-2 border-b-2 relative transition-colors ${
                  isActive("/notifications")
                    ? "border-black text-black"
                    : "border-transparent text-[rgba(0,0,0,0.6)] hover:text-black"
                }`}
              >
                <div className="relative">
                  <Bell size={20} />
                  {unreadNotificationCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-[#cc1016] text-white text-[10px] font-bold rounded-full min-w-[15px] h-[15px] flex items-center justify-center px-1">
                      {unreadNotificationCount}
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-normal mt-0.5">
                  Notifications
                </span>
              </Link>

              {/* "Me" Profile Dropdown */}
              <div ref={meRef} className="relative h-full">
                <button
                  type="button"
                  onClick={() => setIsMeOpen(!isMeOpen)}
                  className="flex flex-col items-center justify-center h-full min-w-[60px] px-1 text-[rgba(0,0,0,0.6)] hover:text-black focus:outline-none cursor-pointer"
                >
                  <img
                    src={authUser?.profilePicture || "/avatar.png"}
                    alt={authUser?.name || "Me"}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <div className="flex items-center text-[11px] font-normal mt-0.5">
                    <span>Me</span>
                    <ChevronDown size={12} className="ml-0.5" />
                  </div>
                </button>

                {/* Desktop Me Dropdown Menu */}
                {isMeOpen && (
                  <div className="absolute right-0 top-[53px] w-[260px] bg-white rounded-b-lg rounded-tl-lg shadow-[0_4px_16px_rgba(0,0,0,0.18)] border border-[#e0dfdc] z-50 py-2 text-left">
                    {/* User Snippet */}
                    <div className="px-3 pb-3 border-b border-[#e0dfdc]">
                      <div className="flex items-center gap-2.5 mb-2">
                        <img
                          src={authUser?.profilePicture || "/avatar.png"}
                          alt={authUser?.name}
                          className="w-12 h-12 rounded-full object-cover border border-[#e0dfdc]"
                        />
                        <div className="min-w-0">
                          <h4 className="font-semibold text-sm text-[rgba(0,0,0,0.9)] truncate">
                            {authUser?.name}
                          </h4>
                          <p className="text-xs text-[rgba(0,0,0,0.6)] truncate">
                            {authUser?.headline || "Professional"}
                          </p>
                        </div>
                      </div>
                      <Link
                        to={`/profile/${authUser?.username}`}
                        onClick={() => setIsMeOpen(false)}
                        className="w-full py-1 text-center text-xs font-semibold text-[#0a66c2] border border-[#0a66c2] rounded-full hover:bg-[rgba(10,102,194,0.08)] block transition-colors"
                      >
                        View Profile
                      </Link>
                    </div>

                    {/* Account Links */}
                    <div className="py-2 px-3 border-b border-[#e0dfdc]">
                      <h5 className="text-xs font-semibold text-[rgba(0,0,0,0.9)] mb-1">
                        Account
                      </h5>
                      <div className="space-y-1">
                        <Link
                          to="/settings"
                          onClick={() => setIsMeOpen(false)}
                          className="flex items-center gap-2 py-1 text-xs text-[rgba(0,0,0,0.7)] hover:text-black hover:underline"
                        >
                          <Settings size={14} className="text-[rgba(0,0,0,0.6)]" />
                          <span>Settings & Privacy</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setIsMeOpen(false);
                            toast("LinkedIn Help Center is available 24/7.");
                          }}
                          className="w-full text-left py-1 text-xs text-[rgba(0,0,0,0.7)] hover:text-black hover:underline cursor-pointer"
                        >
                          Help
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsMeOpen(false);
                            toast("Language: English (US)");
                          }}
                          className="w-full text-left py-1 text-xs text-[rgba(0,0,0,0.7)] hover:text-black hover:underline cursor-pointer"
                        >
                          Language
                        </button>
                      </div>
                    </div>

                    {/* Manage Section */}
                    <div className="py-2 px-3 border-b border-[#e0dfdc]">
                      <h5 className="text-xs font-semibold text-[rgba(0,0,0,0.9)] mb-1">
                        Manage
                      </h5>
                      <div className="space-y-1">
                        <Link
                          to={`/profile/${authUser?.username}`}
                          onClick={() => setIsMeOpen(false)}
                          className="block py-1 text-xs text-[rgba(0,0,0,0.7)] hover:text-black hover:underline"
                        >
                          Posts & Activity
                        </Link>
                        <Link
                          to="/jobs"
                          onClick={() => setIsMeOpen(false)}
                          className="block py-1 text-xs text-[rgba(0,0,0,0.7)] hover:text-black hover:underline"
                        >
                          Job Posting Account
                        </Link>
                        <Link
                          to="/about"
                          onClick={() => setIsMeOpen(false)}
                          className="block py-1 text-xs text-[#0a66c2] font-semibold hover:underline"
                        >
                          About Developers
                        </Link>
                      </div>
                    </div>

                    {/* Sign Out */}
                    <div className="px-3 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsMeOpen(false);
                          logout();
                        }}
                        className="w-full text-left py-1 text-xs text-[rgba(0,0,0,0.7)] hover:text-[#cc1016] font-semibold flex items-center gap-2 cursor-pointer"
                      >
                        <LogOut size={14} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Vertical Divider */}
              <div className="h-8 w-[1px] bg-[#e0dfdc] mx-2 hidden lg:block" />

              {/* For Business */}
              <div ref={businessRef} className="relative h-full hidden lg:block">
                <button
                  type="button"
                  onClick={() => setIsBusinessOpen(!isBusinessOpen)}
                  className="flex flex-col items-center justify-center h-full min-w-[65px] px-1 text-[rgba(0,0,0,0.6)] hover:text-black cursor-pointer"
                >
                  <LayoutGrid size={20} />
                  <div className="flex items-center text-[11px] font-normal mt-0.5">
                    <span>For Business</span>
                    <ChevronDown size={12} className="ml-0.5" />
                  </div>
                </button>

                {isBusinessOpen && (
                  <div className="absolute right-0 top-[53px] w-[280px] bg-white rounded-b-lg rounded-tl-lg shadow-[0_4px_16px_rgba(0,0,0,0.18)] border border-[#e0dfdc] z-50 p-4 text-left">
                    <h5 className="text-xs font-semibold text-[rgba(0,0,0,0.9)] mb-2">
                      LinkedIn Business Solutions
                    </h5>
                    <p className="text-xs text-[rgba(0,0,0,0.6)] mb-3">
                      Hire talent, find leads, post jobs, and advertise to
                      professionals worldwide.
                    </p>
                    <div className="space-y-2 text-xs font-semibold text-[#0a66c2]">
                      <Link
                        to="/jobs"
                        onClick={() => setIsBusinessOpen(false)}
                        className="flex items-center justify-between hover:underline"
                      >
                        <span>Post a job for free</span>
                        <ExternalLink size={13} />
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setIsBusinessOpen(false);
                          toast("Advertising platform integration active.");
                        }}
                        className="w-full text-left flex items-center justify-between hover:underline cursor-pointer"
                      >
                        <span>Advertise on LinkedIn</span>
                        <ExternalLink size={13} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Try Premium for ₹0 */}
              <div className="hidden xl:flex items-center ml-2">
                <button
                  type="button"
                  onClick={() => toast.success("LinkedIn Premium unlocked")}
                  className="text-[11px] text-[#915907] hover:underline text-center max-w-[80px] leading-tight font-medium cursor-pointer"
                >
                  Try Premium for ₹0
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/signup"
                className="text-[rgba(0,0,0,0.75)] hover:text-black hover:bg-[rgba(0,0,0,0.04)] font-semibold text-sm px-4 py-2 rounded-full transition-colors"
              >
                Join now
              </Link>
              <Link
                to="/login"
                className="text-[#0a66c2] hover:bg-[rgba(10,102,194,0.08)] border border-[#0a66c2] font-semibold text-sm px-4 py-2 rounded-full transition-colors"
              >
                Sign in
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE SLIDE-OVER DRAWER (When avatar in top-left is tapped)              */}
      {/* ========================================================================= */}
      {isMeOpen && authUser && (
        <div id="mobile-me-drawer" className="fixed inset-0 z-50 sm:hidden">
          {/* Dark Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-[1px] transition-opacity"
            onClick={() => setIsMeOpen(false)}
          />

          {/* Slide-out drawer panel from left */}
          <div className="fixed top-0 bottom-0 left-0 w-[290px] max-w-[85vw] bg-white z-50 shadow-2xl flex flex-col overflow-y-auto animate-in slide-in-from-left duration-200">
            {/* Drawer Top Bar */}
            <div className="p-4 border-b border-[#e0dfdc] flex items-center justify-between">
              <span className="text-xs font-semibold text-[rgba(0,0,0,0.6)] uppercase tracking-wider">
                Profile & Settings
              </span>
              <button
                type="button"
                onClick={() => setIsMeOpen(false)}
                className="p-1.5 rounded-full hover:bg-[rgba(0,0,0,0.08)] text-[rgba(0,0,0,0.6)] hover:text-black transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* User Profile Card */}
            <div className="p-4 border-b border-[#e0dfdc]">
              <img
                src={authUser?.profilePicture || "/avatar.png"}
                alt={authUser?.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#0a66c2] shadow-sm mb-2.5"
              />
              <h3 className="font-bold text-base text-[rgba(0,0,0,0.9)]">
                {authUser?.name}
              </h3>
              <p className="text-xs text-[rgba(0,0,0,0.6)] mt-0.5 line-clamp-2 leading-relaxed">
                {authUser?.headline || "Software Engineer & Professional"}
              </p>
              <Link
                to={`/profile/${authUser?.username}`}
                onClick={() => setIsMeOpen(false)}
                className="mt-3 block w-full py-1.5 text-center text-xs font-semibold text-[#0a66c2] border border-[#0a66c2] rounded-full hover:bg-[rgba(10,102,194,0.08)] transition-colors"
              >
                View Profile
              </Link>
            </div>

            {/* Quick Links */}
            <div className="py-2 border-b border-[#e0dfdc] text-xs">
              <Link
                to="/network"
                onClick={() => setIsMeOpen(false)}
                className="flex items-center justify-between px-4 py-2.5 hover:bg-[#edf3f8] text-[rgba(0,0,0,0.8)] font-medium"
              >
                <div className="flex items-center gap-2.5">
                  <Users size={16} className="text-[#0a66c2]" />
                  <span>My Network</span>
                </div>
                <span className="text-[#0a66c2] font-bold">
                  {authUser?.connections?.length || 0}
                </span>
              </Link>

              <Link
                to={`/profile/${authUser?.username}`}
                onClick={() => setIsMeOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-[#edf3f8] text-[rgba(0,0,0,0.8)] font-medium"
              >
                <Bookmark size={16} className="text-[rgba(0,0,0,0.6)]" />
                <span>Saved items</span>
              </Link>

              <Link
                to="/about"
                onClick={() => setIsMeOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-[#edf3f8] text-[#0a66c2] font-semibold"
              >
                <Code2 size={16} className="text-[#0a66c2]" />
                <span>About Developers</span>
              </Link>
            </div>

            {/* Account Settings */}
            <div className="py-2 border-b border-[#e0dfdc] text-xs">
              <span className="px-4 py-1 block text-[11px] font-semibold text-[rgba(0,0,0,0.5)] uppercase tracking-wider">
                Account
              </span>
              <Link
                to="/settings"
                onClick={() => setIsMeOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#edf3f8] text-[rgba(0,0,0,0.8)]"
              >
                <Settings size={16} className="text-[rgba(0,0,0,0.6)]" />
                <span>Settings & Privacy</span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  setIsMeOpen(false);
                  toast("LinkedIn Help Center is available 24/7.");
                }}
                className="w-full text-left px-4 py-2 hover:bg-[#edf3f8] text-[rgba(0,0,0,0.8)] cursor-pointer"
              >
                Help & Support
              </button>
            </div>

            {/* Sign Out Button at Bottom */}
            <div className="p-4 mt-auto">
              <button
                type="button"
                onClick={() => {
                  setIsMeOpen(false);
                  logout();
                }}
                className="w-full py-2 px-3 border border-[#cc1016] text-[#cc1016] rounded-full text-xs font-semibold hover:bg-red-50 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
