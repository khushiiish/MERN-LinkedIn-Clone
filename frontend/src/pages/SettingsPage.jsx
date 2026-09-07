import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  CheckCircle2,
  ChevronRight,
  Eye,
  Lock,
  Shield,
  Sliders,
  User,
  ArrowLeft,
} from "lucide-react";
import toast from "react-hot-toast";

const SETTING_TABS = [
  { id: "account", label: "Account preferences", icon: User },
  { id: "security", label: "Sign in & security", icon: Lock },
  { id: "visibility", label: "Visibility", icon: Eye },
  { id: "privacy", label: "Data privacy", icon: Shield },
  { id: "advertising", label: "Advertising data", icon: Sliders },
  { id: "notifications", label: "Notifications", icon: Bell },
];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [publicProfile, setPublicProfile] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="max-w-[1000px] mx-auto py-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="p-1.5 rounded-full hover:bg-[rgba(0,0,0,0.06)] text-[rgba(0,0,0,0.7)] hover:text-black transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-[rgba(0,0,0,0.9)]">
              Settings & Privacy
            </h1>
            <p className="text-xs text-[rgba(0,0,0,0.6)]">
              Manage your LinkedIn experience and preferences
            </p>
          </div>
        </div>

        <Link
          to="/"
          className="text-xs font-semibold text-[#0a66c2] hover:underline"
        >
          Back to Feed
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Left Navigation Menu */}
        <div className="bg-white rounded-lg border border-[#e0dfdc] shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.05)] p-2 h-fit">
          <ul className="space-y-1">
            {SETTING_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                      isActive
                        ? "bg-[#edf3f8] text-[#0a66c2]"
                        : "text-[rgba(0,0,0,0.75)] hover:bg-[rgba(0,0,0,0.04)] hover:text-black"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon size={16} />
                      <span>{tab.label}</span>
                    </div>
                    <ChevronRight size={14} className="opacity-50" />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right Main Content */}
        <div className="md:col-span-2 space-y-4">
          {/* Simple Clean Card */}
          <div className="bg-white rounded-lg border border-[#e0dfdc] shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.05)] p-5 space-y-5">
            <div>
              <h2 className="text-base font-semibold text-[rgba(0,0,0,0.9)]">
                Preferences
              </h2>
              <p className="text-xs text-[rgba(0,0,0,0.6)] mt-0.5">
                Manage your notification and visibility settings.
              </p>
            </div>

            {/* Preference 1 */}
            <div className="flex items-center justify-between border-t border-[#f0f0f0] pt-4">
              <div>
                <h4 className="text-xs font-semibold text-[rgba(0,0,0,0.9)]">
                  Email Notifications
                </h4>
                <p className="text-[11px] text-[rgba(0,0,0,0.6)]">
                  Receive email notifications for connection requests and post comments
                </p>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={() => {
                  setEmailAlerts(!emailAlerts);
                  toast.success(
                    `Email alerts ${!emailAlerts ? "enabled" : "disabled"}`
                  );
                }}
                className="toggle toggle-primary toggle-sm"
              />
            </div>

            {/* Preference 2 */}
            <div className="flex items-center justify-between border-t border-[#f0f0f0] pt-4">
              <div>
                <h4 className="text-xs font-semibold text-[rgba(0,0,0,0.9)]">
                  Public Profile Visibility
                </h4>
                <p className="text-[11px] text-[rgba(0,0,0,0.6)]">
                  Allow other LinkedIn members to view your full profile and posts
                </p>
              </div>
              <input
                type="checkbox"
                checked={publicProfile}
                onChange={() => {
                  setPublicProfile(!publicProfile);
                  toast.success(
                    `Public visibility ${!publicProfile ? "active" : "private"}`
                  );
                }}
                className="toggle toggle-primary toggle-sm"
              />
            </div>

            {/* Preference 3 */}
            <div className="flex items-center justify-between border-t border-[#f0f0f0] pt-4">
              <div>
                <h4 className="text-xs font-semibold text-[rgba(0,0,0,0.9)]">
                  Two-Step Verification
                </h4>
                <p className="text-[11px] text-[rgba(0,0,0,0.6)]">
                  Add an extra layer of security when signing into your account
                </p>
              </div>
              <input
                type="checkbox"
                checked={twoFactor}
                onChange={() => {
                  setTwoFactor(!twoFactor);
                  toast.success(
                    `Two-step verification ${!twoFactor ? "enabled" : "disabled"}`
                  );
                }}
                className="toggle toggle-primary toggle-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
