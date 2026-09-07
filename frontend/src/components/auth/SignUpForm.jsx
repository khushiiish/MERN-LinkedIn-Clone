import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios.js";
import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: signUpMutation, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/auth/signup", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Account created successfully! Welcome to LinkedIn.");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (err) => {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to create account. Please check your details.";
      toast.error(errorMessage);
    },
  });

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    signUpMutation({ name, username, email, password });
  };

  return (
    <form onSubmit={handleSignUp} className="w-full flex flex-col gap-3.5">
      {/* Full Name */}
      <div className="flex flex-col">
        <label className="text-xs font-semibold text-[rgba(0,0,0,0.7)] mb-1">
          Full name
        </label>
        <input
          type="text"
          placeholder="First and last name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full h-[48px] px-3.5 rounded border border-[rgba(0,0,0,0.6)] text-[15px] text-[rgba(0,0,0,0.9)] placeholder:text-[rgba(0,0,0,0.4)] focus:border-2 focus:border-[#0a66c2] focus:outline-none transition-all"
          required
        />
      </div>

      {/* Username */}
      <div className="flex flex-col">
        <label className="text-xs font-semibold text-[rgba(0,0,0,0.7)] mb-1">
          Username
        </label>
        <input
          type="text"
          placeholder="e.g. alex-johnson"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full h-[48px] px-3.5 rounded border border-[rgba(0,0,0,0.6)] text-[15px] text-[rgba(0,0,0,0.9)] placeholder:text-[rgba(0,0,0,0.4)] focus:border-2 focus:border-[#0a66c2] focus:outline-none transition-all"
          required
        />
      </div>

      {/* Email */}
      <div className="flex flex-col">
        <label className="text-xs font-semibold text-[rgba(0,0,0,0.7)] mb-1">
          Email address
        </label>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-[48px] px-3.5 rounded border border-[rgba(0,0,0,0.6)] text-[15px] text-[rgba(0,0,0,0.9)] placeholder:text-[rgba(0,0,0,0.4)] focus:border-2 focus:border-[#0a66c2] focus:outline-none transition-all"
          required
        />
      </div>

      {/* Password with inline Show/Hide */}
      <div className="flex flex-col">
        <label className="text-xs font-semibold text-[rgba(0,0,0,0.7)] mb-1">
          Password (6+ characters)
        </label>
        <div className="relative flex items-center">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password (6 or more characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-[48px] pl-3.5 pr-16 rounded border border-[rgba(0,0,0,0.6)] text-[15px] text-[rgba(0,0,0,0.9)] placeholder:text-[rgba(0,0,0,0.4)] focus:border-2 focus:border-[#0a66c2] focus:outline-none transition-all"
            required
            minLength={6}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 text-xs font-semibold text-[#0a66c2] hover:underline px-1 py-0.5"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      {/* User Agreement Disclaimer */}
      <p className="text-[12px] text-[rgba(0,0,0,0.6)] text-center mt-2 leading-relaxed">
        By clicking <span className="font-semibold text-[rgba(0,0,0,0.8)]">Agree & Join</span>, you agree to the LinkedIn{" "}
        <a href="#" onClick={(e) => e.preventDefault()} className="text-[#0a66c2] font-semibold hover:underline">User Agreement</a>,{" "}
        <a href="#" onClick={(e) => e.preventDefault()} className="text-[#0a66c2] font-semibold hover:underline">Privacy Policy</a>, and{" "}
        <a href="#" onClick={(e) => e.preventDefault()} className="text-[#0a66c2] font-semibold hover:underline">Cookie Policy</a>.
      </p>

      {/* Agree & Join Button */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full h-[48px] mt-1 rounded-full bg-[#0a66c2] hover:bg-[#004182] active:bg-[#09223b] text-white font-semibold text-[16px] flex items-center justify-center transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
      >
        {isPending ? <Loader className="size-5 animate-spin" /> : "Agree & Join"}
      </button>
    </form>
  );
};

export default SignUpForm;
