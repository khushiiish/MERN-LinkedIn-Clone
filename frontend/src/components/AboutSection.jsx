import { useState, useEffect } from "react";
import { Pencil, Sparkles } from "lucide-react";

const AboutSection = ({ userData, isOwnProfile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [about, setAbout] = useState(userData?.about || "");

  useEffect(() => {
    setAbout(userData?.about || "");
  }, [userData?.about]);

  const handleSave = () => {
    setIsEditing(false);
    onSave({ about });
  };

  return (
    <div className="bg-white rounded-lg border border-[#e0dfdc] shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.05)] p-4 sm:p-6 mb-3 sm:mb-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg sm:text-xl font-bold text-[rgba(0,0,0,0.9)]">
          About
        </h2>

        {isOwnProfile && !isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-full hover:bg-[rgba(0,0,0,0.06)] text-[rgba(0,0,0,0.6)] hover:text-black transition-colors cursor-pointer"
            title="Edit about section"
          >
            <Pencil size={18} />
          </button>
        )}
      </div>

      {isOwnProfile && isEditing ? (
        <div className="space-y-3">
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full p-3.5 text-sm rounded-lg bg-white border border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2] focus:outline-none leading-relaxed min-h-[140px] resize-y text-[rgba(0,0,0,0.9)] placeholder:text-[rgba(0,0,0,0.5)]"
            rows="5"
            placeholder="You can write about your years of experience, industry, skills, and proudest accomplishments..."
            autoFocus
          />

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-1.5 rounded-full bg-[#0a66c2] hover:bg-[#004182] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setAbout(userData?.about || "");
                setIsEditing(false);
              }}
              className="px-4 py-1.5 rounded-full border border-[rgba(0,0,0,0.6)] text-[rgba(0,0,0,0.75)] hover:bg-gray-100 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          {userData?.about ? (
            <p className="text-sm sm:text-[15px] text-[rgba(0,0,0,0.85)] whitespace-pre-line leading-relaxed">
              {userData.about}
            </p>
          ) : isOwnProfile ? (
            <div className="py-3 text-center sm:text-left">
              <p className="text-xs sm:text-sm text-[rgba(0,0,0,0.55)] italic mb-2">
                You haven&apos;t added an about summary yet. Introduce yourself to visitors and highlight your passions.
              </p>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="text-xs sm:text-sm text-[#0a66c2] font-semibold hover:underline cursor-pointer"
              >
                + Add an About summary
              </button>
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-[rgba(0,0,0,0.5)] italic">
              No summary provided yet.
            </p>
          )}

          {/* Top skills highlight pills */}
          {userData?.skills && userData.skills.length > 0 && (
            <div className="mt-4 pt-3.5 border-t border-[#f0f0f0]">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[rgba(0,0,0,0.85)] mb-2.5">
                <Sparkles size={14} className="text-[#0a66c2]" />
                <span>Top skills</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {userData.skills.slice(0, 5).map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1 rounded-full bg-[#edf3f8] text-[#0a66c2] font-semibold border border-[#d0e2ec]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AboutSection;
