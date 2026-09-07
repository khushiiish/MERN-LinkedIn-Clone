import { Briefcase, Building2, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { formatDate } from "../utils/dateUtils";

const ExperienceSection = ({ userData, isOwnProfile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [experiences, setExperiences] = useState(userData.experience || []);
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
    currentlyWorking: false,
  });

  const handleAddExperience = () => {
    if (newExperience.title && newExperience.company && newExperience.startDate) {
      const updated = [...experiences, newExperience];
      setExperiences(updated);

      setNewExperience({
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
        currentlyWorking: false,
      });
      setShowAddForm(false);
    }
  };

  const handleDeleteExperience = (id) => {
    setExperiences(experiences.filter((exp) => exp._id !== id));
  };

  const handleSave = () => {
    onSave({ experience: experiences });
    setIsEditing(false);
    setShowAddForm(false);
  };

  const handleCurrentlyWorkingChange = (e) => {
    setNewExperience({
      ...newExperience,
      currentlyWorking: e.target.checked,
      endDate: e.target.checked ? "" : newExperience.endDate,
    });
  };

  return (
    <div className="bg-white rounded-lg border border-[#e0dfdc] shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.05)] p-4 sm:p-6 mb-3 sm:mb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-[rgba(0,0,0,0.9)]">
          Experience
        </h2>

        {isOwnProfile && (
          <div className="flex items-center gap-1">
            {!isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(true);
                  setShowAddForm(true);
                }}
                className="p-1.5 rounded-full hover:bg-[rgba(0,0,0,0.06)] text-[rgba(0,0,0,0.6)] hover:text-black transition-colors cursor-pointer"
                title="Add experience"
              >
                <Plus size={20} />
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setIsEditing(!isEditing);
                setShowAddForm(false);
              }}
              className="p-1.5 rounded-full hover:bg-[rgba(0,0,0,0.06)] text-[rgba(0,0,0,0.6)] hover:text-black transition-colors cursor-pointer"
              title="Edit experiences"
            >
              <Pencil size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Experience List */}
      {experiences && experiences.length > 0 ? (
        <div className="divide-y divide-[#f0f0f0]">
          {experiences.map((exp) => (
            <div
              key={exp._id || `${exp.title}-${exp.company}`}
              className="py-3.5 first:pt-0 last:pb-0 flex items-start justify-between gap-3"
            >
              <div className="flex items-start gap-3 min-w-0 flex-1">
                {/* Company Logo Badge */}
                <div className="w-12 h-12 rounded-lg bg-[#edf3f8] border border-[#e0dfdc] flex items-center justify-center text-[#0a66c2] flex-shrink-0 mt-0.5">
                  <Building2 size={22} />
                </div>

                {/* Details */}
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm sm:text-base font-bold text-[rgba(0,0,0,0.9)] leading-snug">
                    {exp.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[rgba(0,0,0,0.85)] font-normal mt-0.5">
                    {exp.company}
                  </p>
                  <p className="text-xs text-[rgba(0,0,0,0.55)] mt-0.5">
                    {formatDate(exp.startDate)} &ndash;{" "}
                    {exp.endDate ? formatDate(exp.endDate) : "Present"}
                  </p>
                  {exp.description && (
                    <p className="text-xs sm:text-sm text-[rgba(0,0,0,0.8)] mt-2 leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              </div>

              {isEditing && (
                <button
                  type="button"
                  onClick={() => handleDeleteExperience(exp._id)}
                  className="p-1.5 rounded-full hover:bg-red-50 text-red-500 transition-colors flex-shrink-0"
                  title="Delete experience"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs sm:text-sm text-[rgba(0,0,0,0.5)] italic py-1">
          {isOwnProfile
            ? "No experience added yet. Add your work or project history."
            : "No experience listed."}
        </p>
      )}

      {/* Add Experience Form */}
      {isEditing && showAddForm && (
        <div className="mt-4 p-4 bg-[#edf3f8]/50 rounded-xl border border-[#e0dfdc] space-y-3">
          <h4 className="text-xs font-semibold text-[rgba(0,0,0,0.7)] uppercase tracking-wider">
            Add New Position
          </h4>

          <div>
            <label className="block text-xs font-medium text-[rgba(0,0,0,0.7)] mb-1">
              Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Full Stack Developer"
              value={newExperience.title}
              onChange={(e) =>
                setNewExperience({ ...newExperience, title: e.target.value })
              }
              className="w-full h-9 px-3 text-sm rounded bg-white border border-[#e0dfdc] focus:border-[#0a66c2] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[rgba(0,0,0,0.7)] mb-1">
              Company Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Open Source Collaboration / Company"
              value={newExperience.company}
              onChange={(e) =>
                setNewExperience({ ...newExperience, company: e.target.value })
              }
              className="w-full h-9 px-3 text-sm rounded bg-white border border-[#e0dfdc] focus:border-[#0a66c2] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[rgba(0,0,0,0.7)] mb-1">
                Start Date *
              </label>
              <input
                type="date"
                value={newExperience.startDate}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    startDate: e.target.value,
                  })
                }
                className="w-full h-9 px-3 text-sm rounded bg-white border border-[#e0dfdc] focus:border-[#0a66c2] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[rgba(0,0,0,0.7)] mb-1">
                End Date
              </label>
              <input
                type="date"
                disabled={newExperience.currentlyWorking}
                value={newExperience.endDate}
                onChange={(e) =>
                  setNewExperience({ ...newExperience, endDate: e.target.value })
                }
                className="w-full h-9 px-3 text-sm rounded bg-white border border-[#e0dfdc] focus:border-[#0a66c2] focus:outline-none disabled:bg-gray-100 disabled:opacity-60"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="currentlyWorking"
              checked={newExperience.currentlyWorking}
              onChange={handleCurrentlyWorkingChange}
              className="checkbox checkbox-xs rounded border-gray-400"
            />
            <label
              htmlFor="currentlyWorking"
              className="text-xs text-[rgba(0,0,0,0.7)] cursor-pointer select-none"
            >
              I am currently working in this role
            </label>
          </div>

          <div>
            <label className="block text-xs font-medium text-[rgba(0,0,0,0.7)] mb-1">
              Description
            </label>
            <textarea
              placeholder="What were your key accomplishments, technologies used, and responsibilities?"
              value={newExperience.description}
              onChange={(e) =>
                setNewExperience({
                  ...newExperience,
                  description: e.target.value,
                })
              }
              rows="3"
              className="w-full p-2.5 text-sm rounded bg-white border border-[#e0dfdc] focus:border-[#0a66c2] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleAddExperience}
              disabled={
                !newExperience.title ||
                !newExperience.company ||
                !newExperience.startDate
              }
              className="px-4 py-1.5 rounded-full bg-[#0a66c2] hover:bg-[#004182] text-white text-xs font-semibold disabled:opacity-40 transition-colors cursor-pointer"
            >
              Add to list
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 rounded-full border border-[rgba(0,0,0,0.6)] text-[rgba(0,0,0,0.7)] text-xs font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Save Changes bar when editing */}
      {isOwnProfile && isEditing && (
        <div className="mt-4 pt-3 border-t border-[#f0f0f0] flex items-center justify-between">
          {!showAddForm && (
            <button
              type="button"
              onClick={() => setShowAddForm(true)}
              className="text-xs font-semibold text-[#0a66c2] hover:underline flex items-center gap-1"
            >
              <Plus size={14} />
              <span>Add another position</span>
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
                setExperiences(userData.experience || []);
                setIsEditing(false);
                setShowAddForm(false);
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

export default ExperienceSection;
