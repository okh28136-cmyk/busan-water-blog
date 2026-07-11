"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/dashboard");
    } catch (error) {
      alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/30">
        <div className="text-center mb-8">
          <h1 className="font-headline-lg text-headline-lg text-primary mb-2">관리자 로그인</h1>
          <p className="text-on-surface-variant font-body-md text-sm">부산생수 게시물 관리를 위해 로그인해주세요.</p>
        </div>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2">이메일</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              placeholder="admin@busanwater.com"
              required
            />
          </div>
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2">비밀번호</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              placeholder="••••••••"
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-primary text-on-primary py-3 rounded-lg font-bold hover:bg-primary-container transition-colors mt-2"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
