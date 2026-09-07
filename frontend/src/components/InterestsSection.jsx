import { Building2, Check, Plus, Users2 } from "lucide-react";
import { useState } from "react";

const InterestsSection = () => {
  const [activeTab, setActiveTab] = useState("companies");

  const companies = [
    {
      id: "comp-1",
      name: "Google",
      followers: "34,200,000+ followers",
      industry: "Information Technology & Services",
    },
    {
      id: "comp-2",
      name: "Microsoft",
      followers: "21,500,000+ followers",
      industry: "Software Development",
    },
    {
      id: "comp-3",
      name: "React Community",
      followers: "1,200,000+ members",
      industry: "Open Source UI Engineering",
    },
    {
      id: "comp-4",
      name: "MongoDB",
      followers: "980,000+ followers",
      industry: "Database & Cloud Infrastructure",
    },
  ];

  const topVoices = [
    {
      id: "voice-1",
      name: "Satya Nadella",
      headline: "Chairman and CEO at Microsoft",
      followers: "10M+ followers",
    },
    {
      id: "voice-2",
      name: "Andrew Ng",
      headline: "Founder DeepLearning.AI, Coursera, AI Pioneer",
      followers: "4.5M+ followers",
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-[#e0dfdc] shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.05)] p-4 sm:p-6 mb-3 sm:mb-4">
      {/* Header */}
      <h2 className="text-lg sm:text-xl font-bold text-[rgba(0,0,0,0.9)] mb-3">
        Interests
      </h2>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#f0f0f0] pb-2 mb-4">
        <button
          type="button"
          onClick={() => setActiveTab("companies")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
            activeTab === "companies"
              ? "bg-[#057642] text-white"
              : "border border-[#e0dfdc] text-[rgba(0,0,0,0.6)] hover:bg-gray-100"
          }`}
        >
          Companies
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("voices")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
            activeTab === "voices"
              ? "bg-[#057642] text-white"
              : "border border-[#e0dfdc] text-[rgba(0,0,0,0.6)] hover:bg-gray-100"
          }`}
        >
          Top Voices
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {activeTab === "companies"
          ? companies.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 p-2 rounded-lg hover:bg-[rgba(0,0,0,0.02)] transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-[#edf3f8] border border-[#e0dfdc] flex items-center justify-center text-[#0a66c2] flex-shrink-0">
                  <Building2 size={22} />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-[rgba(0,0,0,0.9)] truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[rgba(0,0,0,0.6)] truncate">
                    {item.industry}
                  </p>
                  <p className="text-[11px] text-[rgba(0,0,0,0.5)] mt-0.5">
                    {item.followers}
                  </p>
                  <button
                    type="button"
                    className="mt-1.5 inline-flex items-center gap-1 px-3 py-1 rounded-full border border-[rgba(0,0,0,0.6)] text-[rgba(0,0,0,0.75)] hover:bg-[rgba(0,0,0,0.05)] text-xs font-semibold transition-colors"
                  >
                    <Check size={12} />
                    <span>Following</span>
                  </button>
                </div>
              </div>
            ))
          : topVoices.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 p-2 rounded-lg hover:bg-[rgba(0,0,0,0.02)] transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-[#edf3f8] border border-[#e0dfdc] flex items-center justify-center text-[#0a66c2] flex-shrink-0">
                  <Users2 size={22} />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-[rgba(0,0,0,0.9)] truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[rgba(0,0,0,0.6)] truncate">
                    {item.headline}
                  </p>
                  <p className="text-[11px] text-[rgba(0,0,0,0.5)] mt-0.5">
                    {item.followers}
                  </p>
                  <button
                    type="button"
                    className="mt-1.5 inline-flex items-center gap-1 px-3 py-1 rounded-full border border-[rgba(0,0,0,0.6)] text-[rgba(0,0,0,0.75)] hover:bg-[rgba(0,0,0,0.05)] text-xs font-semibold transition-colors"
                  >
                    <Check size={12} />
                    <span>Following</span>
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default InterestsSection;
