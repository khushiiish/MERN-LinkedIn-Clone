import { Link } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f4f2ee]">
      {/* Top Header */}
      <header className="w-full max-w-[1128px] mx-auto px-6 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1">
          <img src="/logo.svg" alt="LinkedIn" className="h-7 sm:h-8 w-auto" />
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-sm text-[rgba(0,0,0,0.6)]">New to LinkedIn?</span>
          <Link
            to="/signup"
            className="text-[#0a66c2] hover:bg-[rgba(10,102,194,0.08)] font-semibold text-sm px-4 py-2 rounded-full border border-transparent transition-colors"
          >
            Join now
          </Link>
        </div>
      </header>

      {/* Main Login Card Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-4 sm:py-8">
        <div className="w-full max-w-[380px] bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-[#e0dfdc] p-6 sm:p-8">
          <div className="mb-6">
            <h1 className="text-[32px] font-semibold text-[rgba(0,0,0,0.9)] leading-tight tracking-tight">
              Sign in
            </h1>
            <p className="text-[14px] text-[rgba(0,0,0,0.6)] mt-1.5">
              Stay updated on your professional world
            </p>
          </div>

          <LoginForm />

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[rgba(0,0,0,0.15)]"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white text-[rgba(0,0,0,0.6)] font-medium">or</span>
            </div>
          </div>

          {/* Join Now Outline Pill Button */}
          <Link
            to="/signup"
            className="w-full h-[52px] rounded-full border border-[rgba(0,0,0,0.6)] hover:border-black hover:bg-[rgba(0,0,0,0.04)] text-[rgba(0,0,0,0.75)] hover:text-[rgba(0,0,0,0.9)] font-semibold text-[16px] flex items-center justify-center transition-colors text-center"
          >
            New to LinkedIn? Join now
          </Link>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="w-full bg-white border-t border-[#e0dfdc] py-4 mt-auto">
        <div className="max-w-[1128px] mx-auto px-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-1 font-semibold text-[rgba(0,0,0,0.9)] mr-2">
            <span>Linked</span>
            <span className="bg-[#0a66c2] text-white px-1 rounded text-[10px] font-bold">in</span>
            <span className="font-normal text-[rgba(0,0,0,0.6)] ml-1">© 2026</span>
          </div>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0a66c2] hover:underline">User Agreement</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0a66c2] hover:underline">Privacy Policy</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0a66c2] hover:underline">Community Guidelines</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0a66c2] hover:underline">Cookie Policy</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0a66c2] hover:underline">Copyright Policy</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0a66c2] hover:underline">Send Feedback</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0a66c2] hover:underline">Language ▾</a>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
