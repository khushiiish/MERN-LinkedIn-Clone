import { CheckCircle2, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";

const SkillsSection = ({ userData, isOwnProfile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAddInput, setShowAddInput] = useState(false);
  const [skills, setSkills] = useState(userData.skills || []);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
      setShowAddInput(false);
    }
  };

  const handleDeleteSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSave = () => {
    onSave({ skills });
    setIsEditing(false);
    setShowAddInput(false);
  };

  return (
    <div className="bg-white rounded-lg border border-[#e0dfdc] shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.05)] p-4 sm:p-6 mb-3 sm:mb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-[rgba(0,0,0,0.9)]">
            Skills
          </h2>
          <span className="text-xs text-[rgba(0,0,0,0.5)] font-semibold">
            ({skills.length})
          </span>
        </div>

        {isOwnProfile && (
          <div className="flex items-center gap-1">
            {!isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(true);
                  setShowAddInput(true);
                }}
                className="p-1.5 rounded-full hover:bg-[rgba(0,0,0,0.06)] text-[rgba(0,0,0,0.6)] hover:text-black transition-colors cursor-pointer"
                title="Add skill"
              >
                <Plus size={20} />
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setIsEditing(!isEditing);
                setShowAddInput(false);
              }}
              className="p-1.5 rounded-full hover:bg-[rgba(0,0,0,0.06)] text-[rgba(0,0,0,0.6)] hover:text-black transition-colors cursor-pointer"
              title="Edit skills"
            >
              <Pencil size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Skills Pills List */}
      {skills && skills.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className="px-3.5 py-1.5 rounded-full border border-[#e0dfdc] bg-[#f9fafb] hover:bg-[#edf3f8] text-xs sm:text-sm font-semibold text-[rgba(0,0,0,0.85)] transition-colors inline-flex items-center gap-1.5 shadow-xs"
            >
              <CheckCircle2 size={14} className="text-[#0a66c2]" />
              <span>{skill}</span>

              {isEditing && (
                <button
                  type="button"
                  onClick={() => handleDeleteSkill(skill)}
                  className="ml-1 text-[rgba(0,0,0,0.4)] hover:text-red-500 transition-colors"
                  title={`Remove ${skill}`}
                >
                  <X size={14} />
                </button>
              )}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-xs sm:text-sm text-[rgba(0,0,0,0.5)] italic py-1">
          {isOwnProfile
            ? "No skills highlighted yet. Add your core languages, frameworks, and methodologies."
            : "No skills listed."}
        </p>
      )}

      {/* Add Skill Input Form */}
      {isEditing && showAddInput && (
        <div className="mt-4 p-3.5 bg-[#edf3f8]/50 rounded-xl border border-[#e0dfdc] space-y-2">
          <label className="block text-xs font-semibold text-[rgba(0,0,0,0.7)] uppercase tracking-wider">
            Add Skill
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. React.js, Python, System Design"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
              className="flex-1 h-9 px-3 text-sm rounded-lg bg-white border border-[#e0dfdc] focus:border-[#0a66c2] focus:outline-none"
              autoFocus
            />
            <button
              type="button"
              onClick={handleAddSkill}
              disabled={!newSkill.trim()}
              className="px-4 py-1.5 rounded-lg bg-[#0a66c2] hover:bg-[#004182] text-white text-xs font-semibold disabled:opacity-40 transition-colors cursor-pointer"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setShowAddInput(false)}
              className="px-3 py-1.5 rounded-lg border border-[rgba(0,0,0,0.6)] text-[rgba(0,0,0,0.7)] text-xs font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Save Changes Bar when editing */}
      {isOwnProfile && isEditing && (
        <div className="mt-4 pt-3 border-t border-[#f0f0f0] flex items-center justify-between">
          {!showAddInput && (
            <button
              type="button"
              onClick={() => setShowAddInput(true)}
              className="text-xs font-semibold text-[#0a66c2] hover:underline flex items-center gap-1"
            >
              <Plus size={14} />
              <span>Add skill</span>
            </button>
          )}

          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-1.5 rounded-full bg-[#0a66c2] hover:bg-[#004182] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => {
                setSkills(userData.skills || []);
                setIsEditing(false);
                setShowAddInput(false);
              }}
              className="px-4 py-1.5 rounded-full border border-[rgba(0,0,0,0.6)] text-[rgba(0,0,0,0.75)] hover:bg-gray-100 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsSection;
