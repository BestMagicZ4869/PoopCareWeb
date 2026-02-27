'use client';

import React, { useState, useMemo } from 'react';
import { Navigation } from '@/components/Navigation';
import {
    Calendar as CalendarIcon,
    ChevronRight,
    ChevronLeft,
    CircleDot,
    X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

type ViewMode = 'week' | 'month';

export default function HistoryPage() {
    const router = useRouter();
    const [viewMode, setViewMode] = useState<ViewMode>('week');
    const [currentPeriodLabel, setCurrentPeriodLabel] = useState("สัปดาห์นี้, 16 - 22 ก.พ.");
    const [selectedDate, setSelectedDate] = useState<number | null>(null);

    const days = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];
    const weekDates = [16, 17, 18, 19, 20, 21, 22];

    // Mock scores for calendar coloring (0-100)
    const calendarData: { [key: number]: number } = {
        1: 85, 2: 90, 3: 65, 4: 40, 5: 88, 6: 92, 7: 70,
        8: 82, 9: 60, 10: 45, 11: 89, 12: 91, 13: 84, 14: 78,
        15: 86, 16: 70, 17: 72, 18: 71, 19: 78, 20: 82, 21: 80, 22: 92
    };

    const allDailyGroups = [
        {
            date: "วันนี้, 22 ก.พ.",
            dayNum: 22,
            items: [
                { id: 1, score: 92, status: "ยอดเยี่ยม", time: "09:41 น.", type: 4, typeLabel: "แบบที่ 4", color: "น้ำตาล", colorHex: "#8B4513" },
                { id: 2, score: 65, status: "ท้องผูก", time: "07:15 น.", type: 2, typeLabel: "แบบที่ 2", color: "เข้ม", colorHex: "#5C4033" },
            ]
        },
        {
            date: "เมื่อวาน, 21 ก.พ.",
            dayNum: 21,
            items: [
                { id: 3, score: 88, status: "ดี", time: "20:30 น.", type: 3, typeLabel: "แบบที่ 3", color: "น้ำตาล", colorHex: "#8B4513" },
            ]
        },
        {
            date: "20 ก.พ.",
            dayNum: 20,
            items: [
                { id: 4, score: 82, status: "ดี", time: "08:15 น.", type: 4, typeLabel: "แบบที่ 4", color: "น้ำตาล", colorHex: "#8B4513" },
            ]
        }
    ];

    const filteredGroups = useMemo(() => {
        if (selectedDate === null) return allDailyGroups;
        return allDailyGroups.filter(g => g.dayNum === selectedDate);
    }, [selectedDate, allDailyGroups]);

    const handleModeChange = (mode: ViewMode) => {
        setViewMode(mode);
        setSelectedDate(null);
        if (mode === 'week') setCurrentPeriodLabel("สัปดาห์นี้, 16 - 22 ก.พ.");
        else setCurrentPeriodLabel("กุมภาพันธ์ 2569");
    };

    const getStatusDotColor = (score: number | undefined) => {
        if (!score) return null;
        if (score >= 85) return 'bg-[#15803D]'; // เขียวเข้ม
        if (score >= 70) return 'bg-[#4ADE80]'; // เขียวอ่อน
        if (score >= 50) return 'bg-[#FACC15]'; // เหลือง
        return 'bg-[#EF4444]'; // แดง
    };

    const handleDateClick = (date: number) => {
        setSelectedDate(date === selectedDate ? null : date);
    };

    return (
        <div className="flex flex-col min-h-screen bg-primary-50/20 pb-32">
            {/* Header */}
            <div className="p-6 bg-white sticky top-0 z-30 flex items-center justify-between border-b border-primary-50">
                <button onClick={() => window.history.back()} className="p-2 rounded-xl text-primary-950 active:bg-primary-50 transition-colors">
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-black text-primary-950">ประวัติสุขภาพ</h1>
                <button className="p-2 rounded-xl text-primary-950 active:bg-primary-50 transition-colors">
                    <CalendarIcon className="w-6 h-6" />
                </button>
            </div>

            {/* Navigation & Mode Toggle */}
            <div className="px-6 py-4 bg-white border-b border-primary-50 space-y-4">
                <div className="flex bg-primary-50 rounded-[1.25rem] p-1 shadow-inner">
                    {(['week', 'month'] as ViewMode[]).map((mode) => (
                        <button
                            key={mode}
                            onClick={() => handleModeChange(mode)}
                            className={cn(
                                "flex-1 py-2 text-xs font-black uppercase tracking-widest rounded-[1rem] transition-all",
                                viewMode === mode ? "bg-white text-primary-950 shadow-sm" : "text-primary-300"
                            )}
                        >
                            {mode === 'week' ? 'สัปดาห์' : 'รายเดือน'}
                        </button>
                    ))}
                </div>

                <div className="flex items-center justify-between">
                    <button className="p-2 bg-primary-50 rounded-xl text-primary-600 active:scale-95 transition-transform">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-sm font-black text-primary-950 uppercase tracking-tight">{currentPeriodLabel}</span>
                    <button className="p-2 bg-primary-50 rounded-xl text-primary-300">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Conditional UI: Week Scroller or Month Calendar */}
                <AnimatePresence mode="wait">
                    {viewMode === 'month' ? (
                        <motion.div
                            key="month"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pt-2 overflow-hidden"
                        >
                            <div className="grid grid-cols-7 gap-x-1 gap-y-0">
                                {days.map(d => (
                                    <div key={d} className="text-xs font-bold text-primary-300 text-center py-1 uppercase tracking-tighter">{d}</div>
                                ))}
                                <div className="p-1" /><div className="p-1" /><div className="p-1" /><div className="p-1" /><div className="p-1" /><div className="p-1" />
                                {Array.from({ length: 28 }, (_, i) => i + 1).map(date => {
                                    const dotColor = getStatusDotColor(calendarData[date]);
                                    const isSelected = selectedDate === date;
                                    const isToday = date === 22;
                                    const isFuture = date > 22;

                                    return (
                                        <button
                                            key={date}
                                            onClick={() => handleDateClick(date)}
                                            className="flex flex-col items-center justify-center relative py-1.5 active:scale-95 transition-all"
                                        >
                                            <div className={cn(
                                                "aspect-square w-10 md:w-14 rounded-xl flex items-center justify-center text-sm font-black transition-all relative",
                                                isSelected
                                                    ? "bg-primary-950 text-white shadow-lg z-10 scale-110"
                                                    : "bg-[#FDF2E9] text-primary-950",
                                                isToday && !isSelected && "border-2 border-primary-950",
                                                isFuture && "opacity-30"
                                            )}>
                                                {date}

                                                {/* Status Dot */}
                                                {!isFuture && dotColor && (
                                                    <div className={cn(
                                                        "absolute top-1.5 right-1.5 w-3 h-3 rounded-full border-2 border-white shadow-sm",
                                                        dotColor
                                                    )} />
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="flex flex-wrap justify-center gap-y-2 gap-x-4 mt-4 pt-2 border-t border-primary-50">
                                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#15803D]" /><span className="text-[11px] font-bold text-primary-400">ดีเยี่ยม</span></div>
                                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#4ADE80]" /><span className="text-[11px] font-bold text-primary-400">ดี</span></div>
                                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#FACC15]" /><span className="text-[11px] font-bold text-primary-400">ปกติ</span></div>
                                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" /><span className="text-[11px] font-bold text-primary-400">ต้องดูแล</span></div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="week"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex justify-between pt-2"
                        >
                            {days.map((day, i) => {
                                const date = weekDates[i];
                                const isSelected = selectedDate === date;
                                const isToday = !selectedDate && date === 22;
                                const isFuture = date > 22;
                                const dotColor = getStatusDotColor(calendarData[date]);

                                return (
                                    <button
                                        key={i}
                                        onClick={() => handleDateClick(date)}
                                        className={cn(
                                            "flex flex-col items-center gap-2 p-2 rounded-2xl transition-all min-w-[44px] border-2 border-transparent relative",
                                            isSelected ? "bg-primary-950 text-white shadow-lg border-primary-950" :
                                                "bg-[#FDF2E9] text-primary-950",
                                            isToday && "border-primary-950",
                                            isFuture && "opacity-30"
                                        )}
                                    >
                                        <span className={cn(
                                            "text-[10px] font-bold uppercase tracking-tighter opacity-50",
                                            isSelected && "text-white opacity-60"
                                        )}>{day}</span>
                                        <span className="text-sm font-black">{date}</span>

                                        {/* Status Dot for Week View */}
                                        {!isFuture && dotColor && !isSelected && (
                                            <div className={cn(
                                                "absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-white shadow-sm",
                                                dotColor
                                            )} />
                                        )}
                                    </button>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* List Content */}
            <div className="px-6 space-y-8 pt-8">
                <div className="space-y-10 pb-10">
                    {selectedDate && (
                        <div className="flex items-center justify-between bg-primary-950 text-white px-6 py-3 rounded-full shadow-lg">
                            <span className="text-xs font-bold uppercase tracking-widest">กำลังแสดงข้อมูลวันที่ {selectedDate} ก.พ.</span>
                            <button onClick={() => setSelectedDate(null)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    {filteredGroups.length > 0 ? (
                        filteredGroups.map((group, groupIndex) => (
                            <div key={groupIndex} className="space-y-6">
                                <div className="flex items-center gap-3 px-2">
                                    <div className="h-4 w-1 bg-accent-gold rounded-full" />
                                    <h3 className="text-sm font-black text-primary-950 uppercase tracking-tighter">{group.date}</h3>
                                </div>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: groupIndex * 0.1 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="bg-white rounded-[2.5rem] soft-shadow border border-primary-50 overflow-hidden cursor-pointer group flex items-center active:bg-primary-50/50 transition-colors"
                                    onClick={() => router.push(`/daily-log?date=${group.dayNum} ก.พ.`)}
                                >
                                    <div className="flex-1 divide-y divide-primary-50/50">
                                        {group.items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex items-center gap-4 p-4 transition-colors"
                                            >
                                                <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center border-4 border-white shadow-sm flex-shrink-0 group-active:scale-95 transition-transform">
                                                    <span className={cn("text-lg font-black", item.score >= 80 ? "text-primary-950" : "text-accent-gold")}>{item.score}</span>
                                                </div>
                                                <div className="flex-1 space-y-1.5">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-black text-primary-950 text-base">{item.status}</h4>
                                                        <span className="text-xs font-bold text-primary-300">• {item.time}</span>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <div className="flex items-center gap-1.5 bg-primary-50/50 px-3 py-1 rounded-full border border-primary-50">
                                                            <CircleDot className="w-3 h-3 text-primary-400" />
                                                            <span className="text-xs font-bold text-primary-600">{item.typeLabel}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 bg-primary-50/50 px-3 py-1 rounded-full border border-primary-50">
                                                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.colorHex }} />
                                                            <span className="text-xs font-bold text-primary-600">{item.color}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pr-6">
                                        <ChevronRight className="w-6 h-6 text-primary-200 group-hover:text-primary-950 transition-colors" />
                                    </div>
                                </motion.div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                            <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center">
                                <CalendarIcon className="w-10 h-10 text-primary-200" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-primary-950 font-black">ไม่มีบันทึกในวันนี้</p>
                                <p className="text-primary-300 text-xs font-bold uppercase tracking-widest">เริ่มบันทึกสุขภาพของคุณเพื่อติดตามผล</p>
                            </div>
                            <button
                                onClick={() => setSelectedDate(null)}
                                className="text-xs font-black text-primary-600 uppercase border-b border-primary-600 pb-0.5 pt-4"
                            >
                                ดูประวัติทั้งหมด
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <Navigation />
        </div>
    );
}
