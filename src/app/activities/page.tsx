'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/Button';
import {
    Utensils,
    Droplets,
    Activity,
    Moon,
    Clock,
    ChevronLeft,
    ChevronRight,
    Calendar,
    Pill,
    Thermometer
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TimePicker } from '@/components/TimePicker';
import Link from 'next/link';

export default function ActivitiesPage() {
    const [logType, setLogType] = useState<'food' | 'pill' | 'symptom' | 'water' | 'exercise' | 'sleep'>('food');
    const [activityStartIndex, setActivityStartIndex] = useState(0);
    const [activityTime, setActivityTime] = useState("03:31");
    const [label, setLabel] = useState("");
    const [value, setValue] = useState("");

    const activityTypes = [
        { type: 'food' as const, label: 'อาหาร', icon: Utensils },
        { type: 'pill' as const, label: 'ยา', icon: Pill },
        { type: 'water' as const, label: 'น้ำ', icon: Droplets },
        { type: 'symptom' as const, label: 'อาการ', icon: Thermometer },
        { type: 'exercise' as const, label: 'ออกกำลัง', icon: Activity },
        { type: 'sleep' as const, label: 'นอน', icon: Moon },
    ];

    const placeholders: Record<string, { label: string; value: string }> = {
        food: { label: 'วันนี้ทานอะไรครับ?', value: 'เช่น 1 จาน, 350 kcal' },
        pill: { label: 'ทานยาอะไรบ้าง?', value: 'เช่น วิตามินซี, 1 เม็ด' },
        symptom: { label: 'มีอาการอย่างไร?', value: 'เช่น ปวดหัว, ท้องอืด' },
        water: { label: 'ดื่มน้ำจากที่ไหน?', value: 'เช่น 250 ml, 1 แก้ว' },
        exercise: { label: 'ออกกำลังกายแบบไหน?', value: 'เช่น วิ่ง, 30 นาที' },
        sleep: { label: 'นอนหลับเป็นอย่างไร?', value: 'เช่น หลับลึก, 7 ชม.' },
    };

    const mockActivities = [
        { id: 1, type: 'food', label: 'ทานมื้อเช้า', value: 'โจ๊กหมูสับ, 350 kcal', time: '08:30' },
        { id: 2, type: 'food', label: 'ทานมื้อเที่ยง', value: 'กะเพราไก่, 450 kcal', time: '12:00' },
        { id: 3, type: 'water', label: 'ดื่มน้ำ', value: '500 ml', time: '09:15' },
        { id: 4, type: 'exercise', label: 'วิ่งจ๊อกกิ้ง', value: '30 นาที', time: '17:30' },
        { id: 5, type: 'sleep', label: 'ตื่นนอน', value: 'สดชื่น, 7 ชม.', time: '07:00' },
    ].sort((a, b) => a.time.localeCompare(b.time));

    const getDotColor = () => {
        return 'bg-[#4D3A30]';
    };

    return (
        <div className="flex flex-col min-h-screen bg-primary-50/20 pb-32">
            {/* Page Header */}
            <div className="p-6 flex items-center gap-4">
                <button
                    onClick={() => window.history.back()}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#4D3A30] shadow-sm active:scale-95 transition-transform"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <div>
                    <h1 className="text-xl font-black text-[#2D1B10]">บันทึกสุขภาพ</h1>
                    <p className="text-[#8D6E63] text-sm font-black uppercase tracking-widest mt-0.5">วันนี้, 26 กุมภาพันธ์</p>
                </div>
            </div>

            <main className="flex-1 px-6 pt-2">
                <div className="max-w-lg mx-auto flex flex-col gap-10">

                    {/* Main Form Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full bg-white p-8 rounded-[3rem] border border-primary-50 soft-shadow space-y-8 relative"
                    >
                        <div className="space-y-1">
                            <h3 className="font-black text-[#2D1B10] text-[22px] leading-tight">บันทึกกิจกรรม</h3>
                            <p className="text-sm font-black text-[#A08E83] uppercase tracking-[0.1em] opacity-80">เพิ่มข้อมูลเพื่อการวิเคราะห์ที่แม่นยำ</p>
                        </div>

                        <div className="space-y-8 text-left">
                            <div className="space-y-8">
                                <div className="relative flex items-center justify-between w-full py-2">
                                    {/* Left Arrow */}
                                    {activityStartIndex > 0 && (
                                        <button
                                            onClick={() => setActivityStartIndex(Math.max(0, activityStartIndex - 4))}
                                            className="absolute -left-5 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-[#F3E5DC] flex items-center justify-center text-[#4D3A30] active:scale-95 transition-all hover:bg-[#FAF5F2]"
                                        >
                                            <ChevronLeft className="w-6 h-6 pr-0.5" />
                                        </button>
                                    )}

                                    <div className="flex justify-start items-start w-full relative">
                                        <AnimatePresence mode="popLayout" initial={false}>
                                            {activityTypes.slice(activityStartIndex, activityStartIndex + 4).map((item) => {
                                                const Icon = item.icon;
                                                const isActive = logType === item.type;
                                                return (
                                                    <motion.button
                                                        layout
                                                        initial={{ opacity: 0, scale: 0.8, x: 20 }}
                                                        animate={{ opacity: 1, scale: 1, x: 0 }}
                                                        exit={{ opacity: 0, scale: 0.8, x: -20 }}
                                                        transition={{ duration: 0.3 }}
                                                        key={item.type}
                                                        onClick={() => setLogType(item.type)}
                                                        className="flex flex-col items-center gap-3 active:scale-95 transition-all w-1/4 flex-shrink-0"
                                                    >
                                                        <div className={cn(
                                                            "w-[84px] h-[84px] rounded-full flex items-center justify-center transition-all border-[2px]",
                                                            isActive
                                                                ? "bg-[#4D3A30] border-[#4D3A30] text-white shadow-lg shadow-[#4D3A30]/30"
                                                                : "bg-white border-[#F3E5DC] text-[#4D3A30]"
                                                        )}>
                                                            <Icon className={cn("w-6 h-6", isActive ? "stroke-[2.5px]" : "stroke-2")} />
                                                        </div>
                                                        <span className={cn(
                                                            "text-[16px] sm:text-[18px] font-black uppercase tracking-wider text-center leading-tight whitespace-nowrap",
                                                            isActive ? "text-[#4D3A30]" : "text-[#D7C9BF]"
                                                        )}>
                                                            {item.label}
                                                        </span>
                                                    </motion.button>
                                                );
                                            })}
                                        </AnimatePresence>
                                    </div>

                                    {/* Right Arrow */}
                                    {activityStartIndex + 4 < activityTypes.length && (
                                        <button
                                            onClick={() => setActivityStartIndex(activityStartIndex + 4)}
                                            className="absolute -right-5 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-[#F3E5DC] flex items-center justify-center text-[#4D3A30] active:scale-95 transition-all hover:bg-[#FAF5F2]"
                                        >
                                            <ChevronRight className="w-6 h-6 pl-0.5" />
                                        </button>
                                    )}
                                </div>

                                <div className="space-y-10">
                                    {/* Time and Main Input Row */}
                                    <div className="flex flex-col md:flex-row gap-8 items-start">
                                        <div className="w-full md:w-1/3 space-y-3">
                                            <label className="text-sm font-black text-[#8D6E63] uppercase tracking-widest px-4 block opacity-60">เวลา</label>
                                            <div className="h-14 bg-white rounded-[1.2rem] flex items-center px-1 shadow-sm border border-[#F3E5DC] hover:border-[#8D6E63] transition-all">
                                                <TimePicker
                                                    value={activityTime}
                                                    onChange={setActivityTime}
                                                    hideLabel
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-1 w-full space-y-3">
                                            <label className="text-sm font-black text-[#8D6E63] uppercase tracking-widest px-4 block opacity-60">รายการ</label>
                                            <input
                                                type="text"
                                                value={label}
                                                onChange={(e) => setLabel(e.target.value)}
                                                placeholder={placeholders[logType].label}
                                                className="w-full h-14 px-6 bg-white rounded-[1.2rem] text-[15px] font-bold text-[#2D1B10] shadow-sm border border-[#F3E5DC] outline-none focus:border-[#8D6E63] focus:ring-2 focus:ring-[#8D6E63]/20 placeholder:text-[#8D6E63]/40 transition-all hover:border-[#8D6E63]"
                                            />
                                        </div>
                                    </div>

                                    {/* Sub Input Field */}
                                    <div className="space-y-3 pb-4">
                                        <label className="text-sm font-black text-[#8D6E63] uppercase tracking-widest px-4 block opacity-60">ปริมาณ / รายละเอียด</label>
                                        <input
                                            type="text"
                                            value={value}
                                            onChange={(e) => setValue(e.target.value)}
                                            placeholder={placeholders[logType].value}
                                            className="w-full h-14 px-6 bg-white rounded-[1.2rem] text-[15px] font-bold text-[#2D1B10] shadow-sm border border-[#F3E5DC] outline-none focus:border-[#8D6E63] focus:ring-2 focus:ring-[#8D6E63]/20 placeholder:text-[#8D6E63]/40 transition-all hover:border-[#8D6E63]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end mt-4">
                            <Button
                                className="absolute -right-6 md:-right-8 bottom-8 pl-8 md:pl-12 pr-10 md:pr-14 h-12 md:h-16 rounded-l-full rounded-r-none font-black bg-[#4D3A30] text-white shadow-2xl shadow-[#4D3A30]/30 active:scale-95 transition-transform z-30 text-base md:text-xl border-y border-l border-white/20"
                                onClick={() => window.location.href = '/dashboard'}
                            >
                                บันทึกกิจกรรม
                            </Button>
                        </div>
                    </motion.div>

                    {/* Today's Activities List Section */}
                    <div className="space-y-6 pt-4 px-2">
                        <div className="flex items-end justify-between px-2">
                            <div className="flex items-end gap-1.5">
                                <h3 className="text-xl font-black text-[#4D3A30]">ตารางกิจกรรมของวันนี้</h3>
                                <span className="text-sm font-bold text-[#8D6E63] mb-[2px]">({mockActivities.length} รายการ)</span>
                            </div>
                            <Link
                                href="/daily-log?date=26 ก.พ."
                                className="text-base font-black text-[#8D6E63] underline decoration-[2px] decoration-[#8D6E63] underline-offset-[5px] hover:text-[#4D3A30] hover:decoration-[#4D3A30] transition-colors pb-1 pr-2"
                            >
                                ดูทั้งหมด
                            </Link>
                        </div>

                        {/* Activity Table Card */}
                        <div className="bg-[#FAF5F2] rounded-[2.5rem] p-8 px-6 shadow-sm border border-[#F3E5DC]">
                            <div className="relative">
                                {/* Vertical line */}
                                <div className="absolute left-[77px] top-[24px] bottom-[24px] w-0.5 bg-[#8D6E63] opacity-30 z-0" />

                                <div className="space-y-10 relative z-10">
                                    {mockActivities.map((activity, index) => {
                                        const activityInfo = activityTypes.find(t => t.type === activity.type);
                                        const Icon = activityInfo?.icon || Clock;
                                        const isFirst = index === 0;

                                        return (
                                            <motion.div
                                                key={activity.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="flex items-center"
                                            >
                                                {/* Time Column */}
                                                <div className="w-[70px] shrink-0 text-right pr-4">
                                                    <span className="text-[16px] font-black text-[#5C453A]">
                                                        {activity.time}
                                                    </span>
                                                </div>

                                                {/* Dot Column */}
                                                <div className="w-[16px] flex flex-col items-center shrink-0 justify-center z-10">
                                                    {isFirst ? (
                                                        <div className="w-[14px] h-[14px] rounded-full bg-[#8D6E63]" />
                                                    ) : (
                                                        <div className="w-[14px] h-[14px] rounded-full bg-[#FAF5F2] border-[2px] border-[#8D6E63]" />
                                                    )}
                                                </div>

                                                {/* Icon Column */}
                                                <div className="pl-5 pr-5 shrink-0">
                                                    <div className="w-[48px] h-[48px] rounded-full border-[1.5px] border-[#8D6E63] flex items-center justify-center text-[#5C453A] bg-[#FAF5F2]">
                                                        <Icon className="w-[22px] h-[22px] stroke-[1.5px]" />
                                                    </div>
                                                </div>

                                                {/* Info Column */}
                                                <div className="flex-1 pt-0.5">
                                                    <div className="text-[18px] font-black text-[#2D1B10] leading-none mb-1.5">
                                                        {activity.label}
                                                    </div>
                                                    <div className="text-[13px] font-bold text-[#8D6E63] opacity-80 leading-none">
                                                        {activity.value}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Navigation />
        </div>
    );
}
