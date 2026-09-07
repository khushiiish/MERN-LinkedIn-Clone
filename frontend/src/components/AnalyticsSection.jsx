import { Eye, BarChart2, Search, Lock, ArrowRight } from "lucide-react";

const AnalyticsSection = ({ isOwnProfile }) => {
  if (!isOwnProfile) return null;

  return (
    <div className="bg-white rounded-lg border border-[#e0dfdc] shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.05)] p-4 sm:p-6 mb-3 sm:mb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[rgba(0,0,0,0.9)]">
            Analytics
          </h2>
          <div className="flex items-center gap-1 text-xs text-[rgba(0,0,0,0.6)] mt-0.5">
            <Lock size={12} />
            <span>Private to you</span>
          </div>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 pb-2">
        {/* Profile Views */}
        <div className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-[rgba(0,0,0,0.02)] transition-colors">
          <Eye size={20} className="text-[rgba(0,0,0,0.6)] flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-base font-bold text-[rgba(0,0,0,0.9)]">
              142 profile views
            </div>
            <p className="text-xs text-[rgba(0,0,0,0.6)] mt-0.5 leading-snug">
              Discover who&apos;s viewed your profile.
            </p>
          </div>
        </div>

        {/* Post Impressions */}
        <div className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-[rgba(0,0,0,0.02)] transition-colors">
          <BarChart2 size={20} className="text-[rgba(0,0,0,0.6)] flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-base font-bold text-[rgba(0,0,0,0.9)]">
              856 post impressions
            </div>
            <p className="text-xs text-[rgba(0,0,0,0.6)] mt-0.5 leading-snug">
              Check out who&apos;s engaging with your posts.
            </p>
          </div>
        </div>

        {/* Search Appearances */}
        <div className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-[rgba(0,0,0,0.02)] transition-colors">
          <Search size={20} className="text-[rgba(0,0,0,0.6)] flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-base font-bold text-[rgba(0,0,0,0.9)]">
              47 search appearances
            </div>
            <p className="text-xs text-[rgba(0,0,0,0.6)] mt-0.5 leading-snug">
              See how often you appear in search results.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Link */}
      <div className="border-t border-[#f0f0f0] pt-2.5 mt-2 flex justify-center sm:justify-start">
        <button
          type="button"
          className="text-xs sm:text-sm font-semibold text-[rgba(0,0,0,0.6)] hover:text-[#0a66c2] inline-flex items-center gap-1 transition-colors"
        >
          <span>Show all 3 analytics</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default AnalyticsSection;
