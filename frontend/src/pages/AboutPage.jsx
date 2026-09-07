import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Globe,
  Code2,
  Server,
  Layers,
  Users,
  Sparkles,
  CheckCircle2,
  Heart,
} from "lucide-react";

const LinkedInIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const GitHubIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const DEVELOPERS = [
  {
    name: "Khushi Sharma",
    role: "Full Stack Developer (Frontend + Backend)",
    bio: "Passionate software engineer specializing in modern React applications, scalable Node.js services, and clean responsive user interfaces. Co-developed the full-stack architecture, responsive mobile layouts, and backend APIs for this LinkedIn Clone.",
    avatar: "https://github.com/khushiiish.png",
    portfolio: "https://devkhushii.netlify.app/",
    linkedin: "https://www.linkedin.com/in/khushiiish/",
    github: "https://github.com/khushiiish",
    skills: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "REST APIs",
      "Frontend UI/UX",
    ],
    bannerGradient: "from-[#004182] to-[#0a66c2]",
  },
  {
    name: "Gaurav Kumar Yadav",
    role: "Full Stack Developer (Frontend + Backend)",
    bio: "Full-stack engineer experienced in architecting scalable web applications, RESTful microservices, state management, and real-time features. Co-developed the platform's backend services, database models, search indexing, and frontend components.",
    avatar: "https://github.com/ggauravky.png",
    portfolio: "https://ggauravky.vercel.app/",
    linkedin: "https://www.linkedin.com/in/gauravky/",
    github: "https://github.com/ggauravky",
    skills: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Authentication",
      "API Design",
      "System Architecture",
    ],
    bannerGradient: "from-[#0a66c2] to-[#0073b1]",
  },
];

const AboutPage = () => {
  return (
    <div className="max-w-[960px] mx-auto py-3 sm:py-5 px-1 sm:px-3 space-y-5">
      {/* Top Header Card */}
      <div className="bg-white rounded-lg border border-[#e0dfdc] shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.05)] p-4 sm:p-6">
        <div className="flex items-center justify-between mb-3 border-b border-[#f0f0f0] pb-3">
          <div className="flex items-center gap-2.5">
            <Link
              to="/"
              className="p-1.5 rounded-full hover:bg-[rgba(0,0,0,0.06)] text-[rgba(0,0,0,0.6)] hover:text-black transition-colors"
              title="Back to feed"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-[rgba(0,0,0,0.9)] flex items-center gap-2">
                <Users size={22} className="text-[#0a66c2]" />
                <span>About the Developers</span>
              </h1>
              <p className="text-xs text-[rgba(0,0,0,0.6)] mt-0.5">
                Collaborative Engineering & Project Showcase
              </p>
            </div>
          </div>

          <Link
            to="/"
            className="text-xs font-semibold text-[#0a66c2] hover:underline flex items-center gap-1"
          >
            <span>Back to feed</span>
          </Link>
        </div>

        <p className="text-xs sm:text-sm text-[rgba(0,0,0,0.7)] leading-relaxed max-w-3xl">
          This full-featured LinkedIn clone was built collaboratively from the ground up.
          Both developers worked closely across the entire stack - developing the React
          frontend user experience, RESTful backend APIs, MongoDB data architecture, responsive
          mobile interfaces, and automated notification workflows.
        </p>
      </div>

      {/* Developer Profile Cards (2 Columns on Desktop, 1 on Mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {DEVELOPERS.map((dev) => (
          <div
            key={dev.name}
            className="bg-white rounded-lg border border-[#e0dfdc] shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col justify-between transition-shadow hover:shadow-md"
          >
            <div>
              {/* Profile Card Banner */}
              <div
                className={`h-24 sm:h-28 bg-gradient-to-r ${dev.bannerGradient} relative`}
              >
                <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles size={12} />
                  <span>Co-Creator</span>
                </div>
              </div>

              {/* Avatar & Header Section */}
              <div className="px-4 sm:px-6 pb-4">
                <div className="relative -mt-12 sm:-mt-14 mb-3">
                  <img
                    src={dev.avatar}
                    alt={dev.name}
                    onError={(e) => {
                      e.target.src = "/avatar.png";
                    }}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white shadow-md bg-white"
                  />
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-[rgba(0,0,0,0.9)]">
                  {dev.name}
                </h2>

                <p className="text-xs font-semibold text-[#0a66c2] mt-0.5">
                  {dev.role}
                </p>

                <p className="text-xs text-[rgba(0,0,0,0.65)] mt-3 leading-relaxed">
                  {dev.bio}
                </p>

                {/* Skills Tags */}
                <div className="mt-4 pt-3 border-t border-[#f0f0f0]">
                  <h4 className="text-[11px] font-semibold text-[rgba(0,0,0,0.5)] uppercase tracking-wider mb-2">
                    Core Technical Focus
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {dev.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md bg-[#edf3f8] text-[rgba(0,0,0,0.75)] text-[11px] font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Social & Contact Actions */}
            <div className="px-4 sm:px-6 py-3.5 bg-[#fafafa] border-t border-[#e0dfdc] flex flex-wrap items-center gap-2">
              {/* Portfolio */}
              <a
                href={dev.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0a66c2] hover:bg-[#004182] text-white text-xs font-semibold transition-colors shadow-xs"
              >
                <Globe size={14} />
                <span>Portfolio</span>
                <ExternalLink size={11} className="opacity-80" />
              </a>

              {/* LinkedIn */}
              <a
                href={dev.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full border border-[#0a66c2] text-[#0a66c2] hover:bg-[rgba(10,102,194,0.08)] text-xs font-semibold transition-colors"
                title={`${dev.name} on LinkedIn`}
              >
                <LinkedInIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>

              {/* GitHub */}
              <a
                href={dev.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full border border-[rgba(0,0,0,0.6)] text-[rgba(0,0,0,0.75)] hover:bg-[rgba(0,0,0,0.05)] text-xs font-semibold transition-colors"
                title={`${dev.name} on GitHub`}
              >
                <GitHubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Collaboration Story & Architecture Card */}
      <div className="bg-white rounded-lg border border-[#e0dfdc] shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.05)] p-5 sm:p-6 space-y-4">
        <h3 className="text-base font-bold text-[rgba(0,0,0,0.9)] flex items-center gap-2">
          <Layers size={18} className="text-[#0a66c2]" />
          <span>About This Project Collaboration</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div className="p-3.5 rounded-lg bg-[#edf3f8]/50 border border-[#e0dfdc]/60 space-y-1.5">
            <div className="w-8 h-8 rounded-full bg-[#0a66c2] text-white flex items-center justify-center">
              <Code2 size={16} />
            </div>
            <h4 className="text-xs font-semibold text-[rgba(0,0,0,0.9)]">
              Full-Stack Engineering
            </h4>
            <p className="text-[11px] text-[rgba(0,0,0,0.6)] leading-relaxed">
              Complete end-to-end MERN architecture connecting React client states with secure Express REST APIs and MongoDB storage.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-[#edf3f8]/50 border border-[#e0dfdc]/60 space-y-1.5">
            <div className="w-8 h-8 rounded-full bg-[#057642] text-white flex items-center justify-center">
              <Users size={16} />
            </div>
            <h4 className="text-xs font-semibold text-[rgba(0,0,0,0.9)]">
              Real Collaboration
            </h4>
            <p className="text-[11px] text-[rgba(0,0,0,0.6)] leading-relaxed">
              Co-developed with modular codebases, shared git branches, pair debugging, and structured component boundaries.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-[#edf3f8]/50 border border-[#e0dfdc]/60 space-y-1.5">
            <div className="w-8 h-8 rounded-full bg-[#915907] text-white flex items-center justify-center">
              <Server size={16} />
            </div>
            <h4 className="text-xs font-semibold text-[rgba(0,0,0,0.9)]">
              Authentic Experience
            </h4>
            <p className="text-[11px] text-[rgba(0,0,0,0.6)] leading-relaxed">
              Accurate LinkedIn design system, responsive mobile app view with bottom tabs and drawer, and live search autocomplete.
            </p>
          </div>
        </div>

        {/* Footer note */}
        <div className="pt-3 border-t border-[#f0f0f0] flex items-center justify-between text-xs text-[rgba(0,0,0,0.6)]">
          <span className="flex items-center gap-1.5">
            <Heart size={14} className="text-red-500 fill-red-500" />
            <span>Crafted by Khushi Sharma &amp; Gaurav Kumar Yadav</span>
          </span>
          <Link
            to="/"
            className="font-semibold text-[#0a66c2] hover:underline"
          >
            Explore LinkedIn Feed
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
