import { GraduationCap, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";

const EducationSection = ({ userData, isOwnProfile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [educations, setEducations] = useState(userData.education || []);
  const [newEducation, setNewEducation] = useState({
    school: "",
    fieldOfStudy: "",
    startYear: "",
    endYear: "",
  });

  const handleAddEducation = () => {
    if (newEducation.school && newEducation.fieldOfStudy && newEducation.startYear) {
      setEducations([...educations, newEducation]);
      setNewEducation({
        school: "",
        fieldOfStudy: "",
        startYear: "",
        endYear: "",
      });
      setShowAddForm(false);
    }
  };

  const handleDeleteEducation = (id) => {
    setEducations(educations.filter((edu) => edu._id !== id));
  };

  const handleSave = () => {
    onSave({ education: educations });
    setIsEditing(false);
    setShowAddForm(false);
  };

  return (
    <div className="bg-white rounded-lg border border-[#e0dfdc] shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.05)] p-4 sm:p-6 mb-3 sm:mb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-[rgba(0,0,0,0.9)]">
          Education
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
                title="Add education"
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
              title="Edit education"
            >
              <Pencil size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Education List */}
      {educations && educations.length > 0 ? (
        <div className="divide-y divide-[#f0f0f0]">
          {educations.map((edu) => {
            const start = edu.startYear || edu.startDate || "";
            const end = edu.endYear || edu.endDate || "Present";
            return (
              <div
                key={edu._id || `${edu.school}-${edu.fieldOfStudy}`}
                className="py-3.5 first:pt-0 last:pb-0 flex items-start justify-between gap-3"
              >
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  {/* Academic Icon Badge */}
                  <div className="w-12 h-12 rounded-lg bg-[#edf3f8] border border-[#e0dfdc] flex items-center justify-center text-[#0a66c2] flex-shrink-0 mt-0.5">
                    <GraduationCap size={24} />
                  </div>

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm sm:text-base font-bold text-[rgba(0,0,0,0.9)] leading-snug">
                      {edu.school}
                    </h3>
                    <p className="text-xs sm:text-sm text-[rgba(0,0,0,0.85)] font-normal mt-0.5">
                      {edu.fieldOfStudy}
                    </p>
                    {start && (
                      <p className="text-xs text-[rgba(0,0,0,0.55)] mt-0.5">
                        {start} &ndash; {end}
                      </p>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <button
                    type="button"
                    onClick={() => handleDeleteEducation(edu._id)}
                    className="p-1.5 rounded-full hover:bg-red-50 text-red-500 transition-colors flex-shrink-0"
                    title="Delete education"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-xs sm:text-sm text-[rgba(0,0,0,0.5)] italic py-1">
          {isOwnProfile
            ? "No education listed yet. Add your university, college, or degree program."
            : "No education listed."}
        </p>
      )}

      {/* Add Education Form */}
      {isEditing && showAddForm && (
        <div className="mt-4 p-4 bg-[#edf3f8]/50 rounded-xl border border-[#e0dfdc] space-y-3">
          <h4 className="text-xs font-semibold text-[rgba(0,0,0,0.7)] uppercase tracking-wider">
            Add Education
          </h4>

          <div>
            <label className="block text-xs font-medium text-[rgba(0,0,0,0.7)] mb-1">
              School / University *
            </label>
            <input
              type="text"
              placeholder="e.g. Babu Banarasi Das University (BBDU)"
              value={newEducation.school}
              onChange={(e) =>
                setNewEducation({ ...newEducation, school: e.target.value })
              }
              className="w-full h-9 px-3 text-sm rounded bg-white border border-[#e0dfdc] focus:border-[#0a66c2] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[rgba(0,0,0,0.7)] mb-1">
              Degree &amp; Field of Study *
            </label>
            <input
              type="text"
              placeholder="e.g. Bachelor of Computer Applications (BCA) - AI & ML"
              value={newEducation.fieldOfStudy}
              onChange={(e) =>
                setNewEducation({
                  ...newEducation,
                  fieldOfStudy: e.target.value,
                })
              }
              className="w-full h-9 px-3 text-sm rounded bg-white border border-[#e0dfdc] focus:border-[#0a66c2] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[rgba(0,0,0,0.7)] mb-1">
                Start Year *
              </label>
              <input
                type="number"
                placeholder="2023"
                value={newEducation.startYear}
                onChange={(e) =>
                  setNewEducation({
                    ...newEducation,
                    startYear: e.target.value,
                  })
                }
                className="w-full h-9 px-3 text-sm rounded bg-white border border-[#e0dfdc] focus:border-[#0a66c2] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[rgba(0,0,0,0.7)] mb-1">
                End Year (or Expected)
              </label>
              <input
                type="number"
                placeholder="2026"
                value={newEducation.endYear}
                onChange={(e) =>
                  setNewEducation({ ...newEducation, endYear: e.target.value })
                }
                className="w-full h-9 px-3 text-sm rounded bg-white border border-[#e0dfdc] focus:border-[#0a66c2] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleAddEducation}
              disabled={
                !newEducation.school ||
                !newEducation.fieldOfStudy ||
                !newEducation.startYear
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
              <span>Add education</span>
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
                setEducations(userData.education || []);
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

export default EducationSection;
