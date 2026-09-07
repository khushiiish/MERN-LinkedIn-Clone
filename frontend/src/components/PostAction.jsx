export default function PostAction({ icon, text, onClick, active, className = "" }) {
  return (
    <button
      type="button"
      className={`flex items-center justify-center gap-1 sm:gap-1.5 flex-1 py-2 px-1 sm:px-2 rounded hover:bg-[rgba(0,0,0,0.06)] font-semibold transition-colors select-none ${
        active ? "text-[#0a66c2]" : "text-[rgba(0,0,0,0.6)] hover:text-[rgba(0,0,0,0.9)]"
      } ${className}`}
      onClick={onClick}
    >
      <span className="flex items-center flex-shrink-0">{icon}</span>
      <span className="text-[11px] sm:text-xs">{text}</span>
    </button>
  );
}
