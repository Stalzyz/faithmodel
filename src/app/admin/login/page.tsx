"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fefcf3] p-4 absolute inset-0 z-50 cursor-auto">
      {/* Background decoration */}
      <div className="absolute inset-0 graph-paper opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#fefcf3] via-transparent to-[#fefcf3] pointer-events-none" />

      <div className="relative max-w-md w-full bg-white rounded-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden border border-[rgba(74,74,94,0.1)] z-10">
        <div className="bg-[#FB7F05] p-10 text-center relative overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#d4a017] rounded-full blur-[80px] opacity-20" />
          
          <h1 className="font-cormorant text-5xl font-semibold text-[#d4a017] mb-2 tracking-tight">Faith Model</h1>
          <p className="font-manrope text-[13px] tracking-widest text-[#fefcf3]/60 uppercase">Digital Campus</p>
        </div>
        
        <div className="p-8 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-4 rounded-lg border border-red-100 flex items-center gap-3">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {error}
              </div>
            )}
            
            <div className="space-y-1.5">
              <label className="block font-manrope text-xs font-bold text-gray-700 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#f39c12]/20 focus:border-[#f39c12] outline-none transition-all duration-200 text-gray-800 text-sm font-medium"
                placeholder="admin@faithmodelschool.com"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="block font-manrope text-xs font-bold text-gray-700 uppercase tracking-wider">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#f39c12]/20 focus:border-[#f39c12] outline-none transition-all duration-200 text-gray-800 text-sm font-medium"
                placeholder="••••••••"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FB7F05] hover:bg-[#d4a017] text-white py-3.5 rounded-lg font-manrope text-sm font-bold tracking-wide uppercase transition-colors duration-300 shadow-md flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Authenticating...
                </>
              ) : (
                "Sign In to Admin Panel"
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <span className="font-caveat text-gray-400 text-lg">Protected by Faith Model IT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
