import React from "react";
import { Cloud, ArrowRightToLine } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  let { register, handleSubmit, onLoginSubmit, errors, navigate } = useAuth();

  return (
    <div className="min-h-screen bg-[#09070F] relative overflow-hidden flex items-center justify-center px-4">
      {/* Background Glow */}
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-purple-700/10 blur-3xl rounded-full" />

      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-purple-700/10 blur-3xl rounded-full" />

      {/* Small Decorative Card */}
      <div className="hidden lg:block absolute bottom-20 right-24 w-56 h-72 rounded-3xl overflow-hidden border border-white/10 bg-[#14111D]/60 backdrop-blur-xl">
        <img
          src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop"
          alt="ai"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#15121D]/90 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Cloud size={30} className="text-white" />
          </div>

          <h1 className="text-white text-4xl font-bold mt-6">team-sync</h1>

          <p className="text-gray-400 mt-2 text-lg">
            Sign in to your workspace
          </p>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-10">
          <button
            type="button"
            className="h-14 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition flex items-center justify-center gap-3 text-white font-medium"
          >
            <Cloud size={18} />
            GOOGLE
          </button>

          <button
            type="button"
            className="h-14 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition flex items-center justify-center gap-3 text-white font-medium"
          >
            {/* <Github size={18} /> */}
            GITHUB
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="h-px flex-1 bg-white/10"></div>

          <span className="text-gray-500 text-sm">or continue with email</span>

          <div className="h-px flex-1 bg-white/10"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onLoginSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold tracking-wide text-gray-300 uppercase">
                Email Address
              </label>
            </div>

            <input
              type="email"
              placeholder="name@company.com"
              className="w-full h-14 rounded-xl bg-[#09070F] border border-white/10 px-5 text-white outline-none focus:border-purple-500 placeholder:text-gray-500"
              {...register("email", {
                required: "Email is required",
              })}
            />

            {errors.email && (
              <p className="text-red-400 text-sm mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold tracking-wide text-gray-300 uppercase">
                Password
              </label>

              <button
                type="button"
                className="text-sm text-purple-300 hover:text-purple-200"
              >
                Forgot password?
              </button>
            </div>

            <input
              type="password"
              placeholder="••••••••"
              className="w-full h-14 rounded-xl bg-[#09070F] border border-white/10 px-5 text-white outline-none focus:border-purple-500 placeholder:text-gray-500"
              {...register("password", {
                required: "Password is required",
              })}
            />

            {errors.password && (
              <p className="text-red-400 text-sm mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Checkbox */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              className="w-4 h-4 accent-purple-600 rounded"
              {...register("remember")}
            />

            <p className="text-gray-400 text-sm">Stay signed in</p>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full h-14 rounded-xl bg-purple-600 hover:bg-purple-500 transition text-white font-semibold text-lg flex items-center justify-center gap-3"
          >
            Sign In
            <ArrowRightToLine size={20} />
          </button>
        </form>

        {/* Footer */}
        <div className="mt-10 border-t border-white/10 pt-8 text-center">
          <p className="text-gray-400">
            Don&apos;t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-purple-300 font-semibold cursor-pointer hover:text-purple-200"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="absolute bottom-10 text-center text-gray-500 text-sm">
        <p>© 2024 Synthetix AI. Enterprise Intelligence Platforms.</p>

        <div className="flex items-center justify-center gap-6 mt-3">
          <button className="hover:text-gray-300">Privacy Policy</button>

          <button className="hover:text-gray-300">Terms of Service</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
