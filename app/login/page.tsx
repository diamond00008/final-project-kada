"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowLeft, LogIn, UserPlus } from "lucide-react";
import { supabase } from "../lib/supabase"; // 👈 นำเข้า Supabase

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(""); 

    try {
      if (isLogin) {
        // 🟢 โหมด: เข้าสู่ระบบ (Login) ของจริง
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        alert("🎉 เข้าสู่ระบบสำเร็จ!");
        router.push("/"); // ล็อกอินเสร็จ เด้งกลับไปหน้าแรก
        
      } else {
        // 🔵 โหมด: สมัครสมาชิก (Register) ของจริง
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        alert("🎉 สมัครสมาชิกสำเร็จ! คุณสามารถเข้าสู่ระบบได้เลย");
        setIsLogin(true); // สมัครเสร็จ สลับหน้าต่างกลับมาหน้า Login
        setPassword(""); // เคลียร์รหัสผ่านทิ้ง
      }
    } catch (error: any) {
      console.error("Auth Error:", error.message);
      if (error.message.includes("Invalid login credentials")) {
        setErrorMessage("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      } else if (error.message.includes("User already registered")) {
        setErrorMessage("อีเมลนี้มีผู้ใช้งานแล้ว");
      } else if (error.message.includes("Password should be at least")) {
        setErrorMessage("รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร");
      } else {
        setErrorMessage(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-[2.5rem] p-8 sm:p-12 max-w-md w-full shadow-2xl relative z-10">
        
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition mb-8 group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">กลับหน้าหลัก</span>
        </Link>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black text-white mb-3">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-slate-400 text-sm">
            {isLogin ? "เข้าสู่ระบบเพื่อดำเนินการต่อ" : "สมัครสมาชิกเพื่อประสบการณ์ที่ดีกว่า"}
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm text-center font-medium animate-pulse">
            ⚠️ {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail size={20} className="text-slate-500" />
              </div>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com" 
                className="w-full bg-slate-950/50 border border-slate-700 text-white rounded-2xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-medium text-slate-300">Password</label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={20} className="text-slate-500" />
              </div>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-slate-950/50 border border-slate-700 text-white rounded-2xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full font-bold text-lg py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2 mt-4 
              ${isLoading ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 hover:scale-[1.02] active:scale-[0.98]'}`
            }
          >
            {isLoading ? (
              <span className="animate-pulse">กำลังประมวลผล...</span>
            ) : (
              <>
                {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
                {isLogin ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-400">
          {isLogin ? "ยังไม่มีบัญชีใช่ไหม? " : "มีบัญชีอยู่แล้วใช่ไหม? "}
          <button 
            onClick={() => {
              setIsLogin(!isLogin);
              setErrorMessage("");
            }} 
            className="text-cyan-400 font-bold hover:underline transition"
          >
            {isLogin ? "สมัครสมาชิกที่นี่" : "เข้าสู่ระบบเลย"}
          </button>
        </div>

      </div>
    </div>
  );
}