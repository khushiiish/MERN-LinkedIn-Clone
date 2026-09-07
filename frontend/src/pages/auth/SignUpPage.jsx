import { Link } from "react-router-dom";
import SignUpForm from "../../components/auth/SignUpForm.jsx";

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f4f2ee]">
      {/* Top Header */}
      <header className="w-full max-w-[1128px] mx-auto px-6 pt-6 pb-2 flex items-center justify-center">
        <Link to="/" className="flex items-center gap-1">
          <img src="/logo.svg" alt="LinkedIn" className="h-8 sm:h-9 w-auto" />
        </Link>
      </header>

      {/* Main Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-4">
        <h1 className="text-2xl sm:text-[30px] font-normal text-[rgba(0,0,0,0.9)] text-center mb-6 tracking-tight">
          Make the most of your professional life
        </h1>

        <div className="w-full max-w-[400px] bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-[#e0dfdc] p-6 sm:p-7">
          <SignUpForm />

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[rgba(0,0,0,0.15)]"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white text-[rgba(0,0,0,0.6)] font-medium">or</span>
            </div>
          </div>

          <div className="text-center text-sm text-[rgba(0,0,0,0.7)]">
            Already on LinkedIn?{" "}
            <Link
              to="/login"
              className="text-[#0a66c2] hover:underline font-semibold"
            >
              Sign in
            </Link>
          </div>
        </div>

        <p className="text-xs text-[rgba(0,0,0,0.6)] text-center mt-6">
          Looking to create a page for a business?{" "}
          <a href="#" onClick={(e) => e.preventDefault()} className="text-[#0a66c2] font-semibold hover:underline">
            Get help
          </a>
        </p>
      </main>

      {/* Footer Navigation */}
      <footer className="w-full bg-white border-t border-[#e0dfdc] py-4 mt-auto">
        <div className="max-w-[1128px] mx-auto px-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-1 font-semibold text-[rgba(0,0,0,0.9)] mr-2">
            <span>Linked</span>
            <span className="bg-[#0a66c2] text-white px-1 rounded text-[10px] font-bold">in</span>
            <span className="font-normal text-[rgba(0,0,0,0.6)] ml-1">© 2026</span>
          </div>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0a66c2] hover:underline">About</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0a66c2] hover:underline">Accessibility</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0a66c2] hover:underline">User Agreement</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0a66c2] hover:underline">Privacy Policy</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0a66c2] hover:underline">Cookie Policy</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0a66c2] hover:underline">Copyright Policy</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0a66c2] hover:underline">Brand Policy</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0a66c2] hover:underline">Guest Controls</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#0a66c2] hover:underline">Language ▾</a>
        </div>
      </footer>
    </div>
  );
};

export default SignUpPage;
