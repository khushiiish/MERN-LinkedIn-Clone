import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const queryClient = useQueryClient();

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: (userData) => axiosInstance.post("/auth/login", userData),
    onSuccess: () => {
      toast.success("Welcome back!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (err) => {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to log in. Please check your credentials.";
      toast.error(errorMessage);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation({ username, password });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      {/* Username / Email Input */}
      <div className="flex flex-col">
        <div className="relative">
          <input
            id="username-or-email"
            type="text"
            placeholder="Email or phone"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full h-[52px] px-3.5 pt-1 rounded border border-[rgba(0,0,0,0.6)] text-[16px] text-[rgba(0,0,0,0.9)] placeholder:text-[rgba(0,0,0,0.6)] focus:border-2 focus:border-[#0a66c2] focus:outline-none transition-all"
            required
            autoComplete="username"
          />
        </div>
      </div>

      {/* Password Input with Show/Hide button */}
      <div className="flex flex-col">
        <div className="relative flex items-center">
          <input
            id="login-password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-[52px] pl-3.5 pr-16 pt-1 rounded border border-[rgba(0,0,0,0.6)] text-[16px] text-[rgba(0,0,0,0.9)] placeholder:text-[rgba(0,0,0,0.6)] focus:border-2 focus:border-[#0a66c2] focus:outline-none transition-all"
            required
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 text-sm font-semibold text-[#0a66c2] hover:underline px-1 py-0.5"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      {/* Remember me & Forgot password */}
      <div className="flex items-center justify-between mt-1">
        <label className="flex items-center gap-2 cursor-pointer text-sm text-[rgba(0,0,0,0.7)] select-none">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="rounded border-[rgba(0,0,0,0.4)] text-[#0a66c2] focus:ring-[#0a66c2] size-4 accent-[#0a66c2]"
          />
          <span>Keep me logged in</span>
        </label>
        <button
          type="button"
          onClick={() => toast("Password reset is available via email support in this demo.")}
          className="text-sm font-semibold text-[#0a66c2] hover:underline"
        >
          Forgot password?
        </button>
      </div>

      {/* Sign in Button */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full h-[52px] mt-2 rounded-full bg-[#0a66c2] hover:bg-[#004182] active:bg-[#09223b] text-white font-semibold text-[16px] flex items-center justify-center transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
      >
        {isPending ? <Loader className="size-5 animate-spin" /> : "Sign in"}
      </button>
    </form>
  );
};

export default LoginForm;
