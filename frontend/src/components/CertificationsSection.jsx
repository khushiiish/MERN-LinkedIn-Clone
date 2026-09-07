import { Award, ExternalLink, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState, useEffect } from "react";

const CertificationsSection = ({ userData, isOwnProfile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [certifications, setCertifications] = useState(
    userData?.certifications || []
  );

  useEffect(() => {
    setCertifications(userData?.certifications || []);
  }, [userData?.certifications]);

  const [newCert, setNewCert] = useState({
    title: "",
    issuer: "",
    issueDate: "",
    credentialId: "",
    link: "",
  });

  const handleAddCertification = () => {
    if (newCert.title.trim() && newCert.issuer.trim()) {
      const updated = [
        ...certifications,
        {
          ...newCert,
          _id: `cert-${Date.now()}`,
        },
      ];
      setCertifications(updated);
      setNewCert({
        title: "",
        issuer: "",
        issueDate: "",
        credentialId: "",
        link: "",
      });
      setShowAddForm(false);
    }
  };

  const handleDeleteCertification = (id) => {
    setCertifications(
      certifications.filter((cert) => (cert._id || cert.title) !== id)
    );
  };

  const handleSave = () => {
    if (onSave) {
      onSave({ certifications });
    }
    setIsEditing(false);
    setShowAddForm(false);
  };

  return (
    <div className="bg-white rounded-lg border border-[#e0dfdc] shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.05)] p-4 sm:p-6 mb-3 sm:mb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-[rgba(0,0,0,0.9)]">
            Licenses &amp; Certifications
          </h2>
          {certifications.length > 0 && (
            <span className="text-xs text-[rgba(0,0,0,0.5)] font-semibold">
              ({certifications.length})
            </span>
          )}
        </div>

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
                title="Add certification"
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
              title="Edit certifications"
            >
              <Pencil size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Certifications List */}
      {certifications && certifications.length > 0 ? (
        <div className="divide-y divide-[#f0f0f0]">
          {certifications.map((cert) => (
            <div
              key={cert._id || `${cert.title}-${cert.issuer}`}
              className="py-3.5 first:pt-0 last:pb-0 flex items-start justify-between gap-3"
            >
              <div className="flex items-start gap-3 min-w-0 flex-1">
                {/* Badge Icon */}
                <div className="w-12 h-12 rounded-lg bg-[#edf3f8] border border-[#e0dfdc] flex items-center justify-center text-[#0a66c2] flex-shrink-0 mt-0.5">
                  <Award size={24} />
                </div>

                {/* Details */}
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm sm:text-base font-bold text-[rgba(0,0,0,0.9)] leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[rgba(0,0,0,0.85)] font-normal mt-0.5">
                    {cert.issuer}
                  </p>
                  {cert.issueDate && (
                    <p className="text-xs text-[rgba(0,0,0,0.55)] mt-0.5">
                      Issued {cert.issueDate}
                    </p>
                  )}
                  {cert.credentialId && (
                    <p className="text-xs text-[rgba(0,0,0,0.6)] mt-1 font-mono">
                      Credential ID: {cert.credentialId}
                    </p>
                  )}

                  {cert.link && (
                    <div className="mt-2">
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[rgba(0,0,0,0.6)] text-[rgba(0,0,0,0.75)] hover:bg-[rgba(0,0,0,0.04)] text-xs font-semibold transition-colors"
                      >
                        <span>Show credential</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {isEditing && (
                <button
                  type="button"
                  onClick={() =>
                    handleDeleteCertification(cert._id || cert.title)
                  }
                  className="p-1.5 rounded-full hover:bg-red-50 text-red-500 transition-colors flex-shrink-0 cursor-pointer"
                  title="Delete certification"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="py-2">
          <p className="text-xs sm:text-sm text-[rgba(0,0,0,0.5)] italic">
            {isOwnProfile
              ? "No certifications added yet. Highlight your licenses, badges, and credentials to stand out to recruiters."
              : "No certifications listed."}
          </p>
          {isOwnProfile && !isEditing && (
            <button
              type="button"
              onClick={() => {
                setIsEditing(true);
                setShowAddForm(true);
              }}
              className="mt-2 text-xs sm:text-sm text-[#0a66c2] font-semibold hover:underline cursor-pointer inline-flex items-center gap-1"
            >
              <Plus size={14} />
              <span>Add certification</span>
            </button>
          )}
        </div>
      )}

      {/* Add Certification Form */}
      {isEditing && showAddForm && (
        <div className="mt-4 p-4 bg-[#edf3f8]/50 rounded-xl border border-[#e0dfdc] space-y-3">
          <h4 className="text-xs font-semibold text-[rgba(0,0,0,0.7)] uppercase tracking-wider">
            Add License or Certification
          </h4>

          <div>
            <label className="block text-xs font-medium text-[rgba(0,0,0,0.7)] mb-1">
              Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Full Stack Web Development Certification"
              value={newCert.title}
              onChange={(e) =>
                setNewCert({ ...newCert, title: e.target.value })
              }
              className="w-full h-9 px-3 text-sm rounded bg-white border border-[#e0dfdc] focus:border-[#0a66c2] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[rgba(0,0,0,0.7)] mb-1">
              Issuing Organization *
            </label>
            <input
              type="text"
              placeholder="e.g. freeCodeCamp, Meta, Coursera"
              value={newCert.issuer}
              onChange={(e) =>
                setNewCert({ ...newCert, issuer: e.target.value })
              }
              className="w-full h-9 px-3 text-sm rounded bg-white border border-[#e0dfdc] focus:border-[#0a66c2] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[rgba(0,0,0,0.7)] mb-1">
                Issue Date
              </label>
              <input
                type="text"
                placeholder="e.g. Jan 2024"
                value={newCert.issueDate}
                onChange={(e) =>
                  setNewCert({ ...newCert, issueDate: e.target.value })
                }
                className="w-full h-9 px-3 text-sm rounded bg-white border border-[#e0dfdc] focus:border-[#0a66c2] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[rgba(0,0,0,0.7)] mb-1">
                Credential ID
              </label>
              <input
                type="text"
                placeholder="e.g. FCC-FSWD-89210"
                value={newCert.credentialId}
                onChange={(e) =>
                  setNewCert({ ...newCert, credentialId: e.target.value })
                }
                className="w-full h-9 px-3 text-sm rounded bg-white border border-[#e0dfdc] focus:border-[#0a66c2] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[rgba(0,0,0,0.7)] mb-1">
              Credential URL
            </label>
            <input
              type="url"
              placeholder="https://example.com/certificate/123"
              value={newCert.link}
              onChange={(e) =>
                setNewCert({ ...newCert, link: e.target.value })
              }
              className="w-full h-9 px-3 text-sm rounded bg-white border border-[#e0dfdc] focus:border-[#0a66c2] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleAddCertification}
              className="px-4 py-1.5 rounded-full bg-[#0a66c2] hover:bg-[#004182] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs"
            >
              Add to list
            </button>
            <button
              type="button"
              onClick={() => {
                setShowAddForm(false);
                setNewCert({
                  title: "",
                  issuer: "",
                  issueDate: "",
                  credentialId: "",
                  link: "",
                });
              }}
              className="px-3 py-1.5 rounded-full border border-[rgba(0,0,0,0.6)] text-[rgba(0,0,0,0.75)] hover:bg-gray-100 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Save / Cancel action bar when in edit mode */}
      {isEditing && (
        <div className="flex items-center gap-2 pt-4 mt-2 border-t border-[#f0f0f0]">
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
              setCertifications(userData?.certifications || []);
              setIsEditing(false);
              setShowAddForm(false);
            }}
            className="px-4 py-1.5 rounded-full border border-[rgba(0,0,0,0.6)] text-[rgba(0,0,0,0.75)] hover:bg-gray-100 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default CertificationsSection;
