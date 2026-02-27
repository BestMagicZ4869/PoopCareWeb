'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { motion } from 'framer-motion';
import { Eye, EyeOff, X, MapPin } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#FDF2E9]">
      {/* Top Section - Brand Logo */}
      <div className="flex-[0.35] flex flex-col items-center justify-center p-6 relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-6"
        >
          {/* Pixel Art Logo (No Frame) */}
          <div className="relative w-32 h-32 shrink-0">
            <Image
              src="/PixelPoop3.png"
              alt="Ucci Pixel Art"
              fill
              className="object-contain [image-rendering:pixelated]"
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-6xl font-[1000] text-[#2D1B10] font-sans leading-none tracking-tighter">POOPCARE</h1>
            <p className="text-lg font-black text-[#8D6E63] mt-2 whitespace-nowrap">อั๋นอึ เพื่อนรักนักดูแลอุจจาระของคุณ</p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Section - Login Form (Bottom Sheet Design) */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="flex-[0.65] bg-[#2D1B10] rounded-t-[40px] px-8 py-8 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] relative flex flex-col"
      >
        {/* Handlebar */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#4D3A30] rounded-full" />

        <div className="mt-4 flex flex-col h-full max-w-sm mx-auto w-full">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-1">เข้าสู่ระบบ</h2>
            <p className="text-[#BCAAA4] text-sm font-medium">ยินดีต้อนรับกลับมา!</p>
          </div>

          <div className="space-y-3 flex-1">
            {/* Username Input */}
            <div className="relative group">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ชื่อผู้ใช้"
                className="w-full h-12 pl-6 pr-12 bg-[#FDF2E9] rounded-2xl text-[#2D1B10] placeholder-[#8D6E63]/60 focus:outline-none focus:ring-2 focus:ring-[#E67E22] transition-all text-sm"
              />
              {username && (
                <button
                  onClick={() => setUsername('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8D6E63]"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Password Input */}
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="รหัสผ่าน"
                className="w-full h-12 pl-6 pr-12 bg-[#FDF2E9] rounded-2xl text-[#2D1B10] placeholder-[#8D6E63]/60 focus:outline-none focus:ring-2 focus:ring-[#E67E22] transition-all text-sm"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8D6E63]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="text-right">
              <button className="text-xs text-[#BCAAA4] hover:text-white transition-colors font-medium">
                ลืมรหัสผ่าน?
              </button>
            </div>

            {/* Login Button */}
            <Button
              size="full"
              className="bg-[#E67E22] hover:bg-[#D35400] text-white rounded-2xl h-12 font-bold shadow-lg shadow-[#E67E22]/20 mt-2 active:scale-95 transition-all text-base"
              onClick={() => window.location.href = '/dashboard'}
            >
              เข้าสู่ระบบ
            </Button>

            {/* Separator */}
            <div className="flex items-center gap-4 py-4">
              <div className="flex-1 h-[1px] bg-[#4D3A30]" />
              <span className="text-[#BCAAA4] text-sm font-bold uppercase tracking-[0.1em] whitespace-nowrap">หรือเข้าสู่ระบบด้วย</span>
              <div className="flex-1 h-[1px] bg-[#4D3A30]" />
            </div>

            {/* Social Login Buttons */}
            <div className="flex justify-center gap-6">
              <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-md">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-md">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-md">
                <svg viewBox="0 0 384 512" width="18" height="18" className="fill-black">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                </svg>
              </button>
            </div>

            <div className="text-center mt-auto pb-6">
              <p className="text-[#BCAAA4] text-sm">
                ยังไม่มีบัญชี? <button className="text-white font-black hover:underline transition-all underline-offset-4">สมัครสมาชิก!</button>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
