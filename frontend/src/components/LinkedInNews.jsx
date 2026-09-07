import { useState } from "react";
import { Link } from "react-router-dom";
import { Info, ChevronDown, ChevronUp } from "lucide-react";
import toast from "react-hot-toast";

const initialNewsItems = [
  {
    id: 1,
    title: "Tech hiring rebounds across global markets",
    timeAgo: "2h ago",
    readers: "24,812 readers",
  },
  {
    id: 2,
    title: "AI pair programming adopted by 85% of teams",
    timeAgo: "4h ago",
    readers: "18,430 readers",
  },
  {
    id: 3,
    title: "Full-stack frameworks update: What's next for 2026",
    timeAgo: "6h ago",
    readers: "12,190 readers",
  },
  {
    id: 4,
    title: "Remote & hybrid work policies find stability",
    timeAgo: "1d ago",
    readers: "9,645 readers",
  },
  {
    id: 5,
    title: "Cloud architecture trends: Serverless edge computing",
    timeAgo: "1d ago",
    readers: "8,211 readers",
  },
  {
    id: 6,
    title: "Venture capital funding picks up in Q3",
    timeAgo: "2d ago",
    readers: "6,920 readers",
  },
  {
    id: 7,
    title: "Cybersecurity investments reach new high",
    timeAgo: "3d ago",
    readers: "5,410 readers",
  },
];

const LinkedInNews = () => {
  const [expanded, setExpanded] = useState(false);

  const displayedNews = expanded ? initialNewsItems : initialNewsItems.slice(0, 5);

  return (
    <div className="space-y-3">
      {/* News Card */}
      <div className="bg-white rounded-lg border border-[#e0dfdc] shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.05)] p-3.5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-[rgba(0,0,0,0.9)]">
            LinkedIn News
          </h2>
          <button
            onClick={() =>
              toast("Stories curated from verified industry publications & tech trends.")
            }
            className="text-[rgba(0,0,0,0.6)] hover:text-black"
            title="About LinkedIn News"
          >
            <Info size={14} />
          </button>
        </div>

        <p className="text-xs text-[rgba(0,0,0,0.6)] font-semibold mb-2">
          Top stories
        </p>

        <ul className="space-y-3">
          {displayedNews.map((item) => (
            <li key={item.id} className="group cursor-pointer">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toast(`Opening: "${item.title}"`);
                }}
                className="block"
              >
                <div className="flex items-start gap-2">
                  <span className="text-[rgba(0,0,0,0.9)] text-sm leading-none mt-1 select-none">
                    •
                  </span>
                  <div className="flex-1">
                    <h3 className="text-xs font-semibold text-[rgba(0,0,0,0.85)] group-hover:text-[#0a66c2] group-hover:underline leading-snug line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-[rgba(0,0,0,0.6)] mt-0.5">
                      {item.timeAgo} • {item.readers}
                    </p>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 flex items-center gap-1 text-xs font-semibold text-[rgba(0,0,0,0.6)] hover:text-black hover:bg-[#0000000a] px-2 py-1 rounded transition-colors"
        >
          {expanded ? (
            <>
              <span>Show less</span>
              <ChevronUp size={14} />
            </>
          ) : (
            <>
              <span>Show more</span>
              <ChevronDown size={14} />
            </>
          )}
        </button>
      </div>

      {/* Sticky Mini Footer */}
      <div className="sticky top-[70px] text-[11px] text-[rgba(0,0,0,0.6)] px-2 pt-1 text-center leading-relaxed">
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mb-2">
          <Link to="/about" className="hover:text-[#0a66c2] hover:underline font-medium">About Developers</Link>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0a66c2] hover:underline">Accessibility</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0a66c2] hover:underline">Help Center</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0a66c2] hover:underline">Privacy & Terms ▾</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0a66c2] hover:underline">Ad Choices</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0a66c2] hover:underline">Advertising</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0a66c2] hover:underline">Business Services ▾</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0a66c2] hover:underline">Get the LinkedIn app</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0a66c2] hover:underline">More</a>
        </div>

        <div className="flex items-center justify-center gap-1 text-[rgba(0,0,0,0.9)] font-semibold mt-3">
          <span>Linked</span>
          <span className="bg-[#0a66c2] text-white px-1 rounded text-[9px] font-bold">in</span>
          <span className="font-normal text-[rgba(0,0,0,0.6)] ml-1">LinkedIn Corporation © 2026</span>
        </div>
      </div>
    </div>
  );
};

export default LinkedInNews;
