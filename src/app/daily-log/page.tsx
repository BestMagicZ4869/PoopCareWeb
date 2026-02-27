'use client';

import React, { useState, Suspense } from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/Button';
import { ChevronLeft, Clock, Utensils, Droplets, Activity, Moon, Calendar, XCircle, RefreshCcw, Check, X, Pill, Thermometer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { TimePicker } from '@/components/TimePicker';
import { useSearchParams } from 'next/navigation';

function DailyLogContent() {
    const searchParams = useSearchParams();
    const dateParam = searchParams.get('date');

    const displayDate = dateParam || new Date().toLocaleDateString('th-TH', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const [logs, setLogs] = useState([
        { id: 1, time: '08:00', type: 'sleep', label: 'ตื่นนอน', value: '7.5 ชม.' },
        { id: 2, time: '08:30', type: 'food', label: 'ทานมื้อเช้า', value: 'โจ๊กหมูสับ, 350 kcal' },
        { id: 21, time: '08:35', type: 'pill', label: 'ทานยา', value: 'วิตามินซี, 1 เม็ด' },
        { id: 3, time: '09:00', type: 'water', label: 'น้ำเปล่า', value: '500 ml' },
        { id: 4, time: '11:00', type: 'symptom', label: 'อาการปวดหัว', value: 'ปวดตึบๆ นอนพัก' },
        { id: 5, time: '12:15', type: 'food', label: 'ทานมื้อเที่ยง', value: 'ข้าวราดกะเพราอกไก่, 450 kcal' },
        { id: 6, time: '13:00', type: 'water', label: 'น้ำเปล่า', value: '300 ml' },
        { id: 7, time: '17:30', type: 'exercise', label: 'วิ่งจ็อกกิ้ง', value: '45 นาที' },
        { id: 8, time: '19:00', type: 'food', label: 'สลัดทูน่า', value: '250 kcal' },
        { id: 9, time: '22:30', type: 'sleep', label: 'เข้านอน', value: '-' },
    ].sort((a, b) => a.time.localeCompare(b.time)));

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editData, setEditData] = useState<{ label: string, value: string, type: string, time: string } | null>(null);

    const deleteLog = (id: number) => {
        setLogs(prev => prev.filter(log => log.id !== id));
    };

    const startEdit = (item: any) => {
        setEditingId(item.id);
        setEditData({ label: item.label, value: item.value, type: item.type, time: item.time });
    };

    const saveEdit = () => {
        if (!editingId || !editData) return;
        setLogs(prev => prev.map(log =>
            log.id === editingId ? { ...log, ...editData } : log
        ).sort((a, b) => a.time.localeCompare(b.time)));
        setEditingId(null);
        setEditData(null);
    };

    const activityTypes = [
        { type: 'food' as const, label: 'อาหาร', icon: Utensils },
        { type: 'pill' as const, label: 'ยา', icon: Pill },
        { type: 'water' as const, label: 'น้ำ', icon: Droplets },
        { type: 'symptom' as const, label: 'อาการ', icon: Thermometer },
        { type: 'exercise' as const, label: 'ออกกำลัง', icon: Activity },
        { type: 'sleep' as const, label: 'นอน', icon: Moon },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-primary-50/20 pb-40">
            {/* Header */}
            <div className="p-6 bg-white sticky top-0 z-40 border-b border-primary-50 flex items-center gap-4">
                <button
                    onClick={() => window.history.back()}
                    className="p-2 rounded-xl bg-primary-50 text-primary-600 active:scale-90 transition-transform"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <div>
                    <h1 className="text-2xl font-black text-primary-950 leading-tight">บันทึกกิจวัตร</h1>
                    <p className="text-[17px] text-primary-400 flex items-center gap-1 font-bold">
                        <Calendar className="w-3.5 h-3.5" />
                        {displayDate}
                    </p>
                </div>
            </div>

            <div className="px-6 py-8 mx-auto w-full max-w-lg">
                <div className="flex items-end justify-between gap-1.5 px-2 mb-6">
                    <h3 className="text-xl font-black text-[#4D3A30]">กิจกรรมทั้งหมด</h3>
                    <span className="text-sm font-bold text-[#8D6E63] mb-[2px]">({logs.length} รายการ)</span>
                </div>

                <div className="bg-[#FAF5F2] rounded-[2.5rem] p-8 px-6 shadow-sm border border-[#F3E5DC]">
                    <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-[77px] top-[24px] bottom-[24px] w-0.5 bg-[#8D6E63] opacity-30 z-0" />

                        <div className="space-y-10 relative z-10">
                            <AnimatePresence mode="popLayout">
                                {logs.map((activity, index) => {
                                    const activityInfo = activityTypes.find(t => t.type === activity.type);
                                    const Icon = activityInfo?.icon || Clock;
                                    const isFirst = index === 0;
                                    const isEditing = editingId === activity.id;

                                    return (
                                        <motion.div
                                            key={activity.id}
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="flex items-start"
                                        >
                                            {/* Time Column */}
                                            <div className="w-[70px] shrink-0 text-right pr-4 pt-4">
                                                <span className="text-[16px] font-black text-[#5C453A]">
                                                    {activity.time}
                                                </span>
                                            </div>

                                            {/* Dot Column */}
                                            <div className="w-[16px] flex flex-col items-center shrink-0 justify-start pt-[20px] z-10">
                                                {isFirst ? (
                                                    <div className="w-[14px] h-[14px] rounded-full bg-[#8D6E63]" />
                                                ) : (
                                                    <div className="w-[14px] h-[14px] rounded-full bg-[#FAF5F2] border-[2px] border-[#8D6E63]" />
                                                )}
                                            </div>

                                            {/* Info Column */}
                                            <div className="flex-1 pl-4">
                                                <AnimatePresence mode="wait">
                                                    {isEditing && editData ? (
                                                        <motion.div
                                                            key="edit-form"
                                                            initial={{ opacity: 0, y: -10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: 10 }}
                                                            transition={{ duration: 0.15 }}
                                                            className="bg-white rounded-2xl p-4 border border-[#F3E5DC] shadow-sm mt-0 relative z-20"
                                                        >
                                                            <div className="space-y-4">
                                                                <div className="flex justify-between items-center bg-[#FAF5F2] p-2 rounded-full border border-[#F3E5DC]">
                                                                    {activityTypes.map((cat) => {
                                                                        const CatIcon = cat.icon;
                                                                        return (
                                                                            <button
                                                                                key={cat.type}
                                                                                onClick={() => setEditData({ ...editData, type: cat.type })}
                                                                                className={cn(
                                                                                    "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                                                                                    editData.type === cat.type ? "bg-white shadow-sm scale-110 text-[#4D3A30] border border-[#F3E5DC]" : "opacity-40 text-[#8D6E63]"
                                                                                )}
                                                                            >
                                                                                <CatIcon className="w-4 h-4" />
                                                                            </button>
                                                                        );
                                                                    })}
                                                                </div>

                                                                <div className="space-y-4">
                                                                    <div className="w-full">
                                                                        <TimePicker
                                                                            value={editData.time}
                                                                            onChange={(t) => setEditData({ ...editData, time: t })}
                                                                            hideLabel
                                                                        />
                                                                    </div>
                                                                    <div className="space-y-1">
                                                                        <input
                                                                            type="text"
                                                                            value={editData.label}
                                                                            onChange={(e) => setEditData({ ...editData, label: e.target.value })}
                                                                            placeholder="รายการ"
                                                                            className="w-full text-md font-bold p-3 rounded-xl bg-[#FAF5F2] border border-transparent outline-none focus:ring-2 focus:ring-[#8D6E63]/20 text-[#2D1B10] placeholder:text-[#8D6E63]/40"
                                                                        />
                                                                    </div>
                                                                    <div className="space-y-1">
                                                                        <input
                                                                            type="text"
                                                                            value={editData.value}
                                                                            onChange={(e) => setEditData({ ...editData, value: e.target.value })}
                                                                            placeholder="ปริมาณ / รายละเอียด"
                                                                            className="w-full text-sm font-bold p-3 rounded-xl bg-[#FAF5F2] border border-transparent outline-none focus:ring-2 focus:ring-[#8D6E63]/20 text-[#8D6E63] placeholder:text-[#8D6E63]/40"
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="flex gap-2">
                                                                    <button
                                                                        onClick={saveEdit}
                                                                        className="flex-1 h-12 bg-[#4D3A30] text-white font-black rounded-xl text-md flex items-center justify-center gap-2 active:scale-95 transition-transform"
                                                                    >
                                                                        <Check className="w-5 h-5" /> บันทึก
                                                                    </button>
                                                                    <button
                                                                        onClick={() => { setEditingId(null); setEditData(null); }}
                                                                        className="flex-1 h-12 bg-white text-[#8D6E63] font-black rounded-xl border border-[#F3E5DC] text-md flex items-center justify-center gap-2 active:scale-95 transition-transform"
                                                                    >
                                                                        <X className="w-5 h-5" /> ยกเลิก
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    ) : (
                                                        <motion.div
                                                            key="view-content"
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -10 }}
                                                            transition={{ duration: 0.15 }}
                                                            className="group flex items-start gap-4 p-2 -ml-2 rounded-2xl transition-colors hover:bg-white/50 border border-transparent hover:border-white/80 pr-2"
                                                        >
                                                            <div className="w-[48px] h-[48px] rounded-full border-[1.5px] border-[#8D6E63] flex items-center justify-center text-[#5C453A] bg-[#FAF5F2] shrink-0">
                                                                <Icon className="w-[22px] h-[22px] stroke-[1.5px]" />
                                                            </div>

                                                            <div className="flex-1 pt-1 flex justify-between items-start">
                                                                <div>
                                                                    <div className="text-[18px] font-black text-[#2D1B10] leading-none mb-1.5 line-clamp-1 break-all">
                                                                        {activity.label}
                                                                    </div>
                                                                    <div className="text-[13px] font-bold text-[#8D6E63] opacity-80 leading-snug break-all pb-1 min-h-[16px]">
                                                                        {activity.value !== '-' && activity.value}
                                                                    </div>
                                                                </div>

                                                                <div className="flex gap-1 shrink-0 ml-2 transition-opacity">
                                                                    <button
                                                                        onClick={() => startEdit(activity)}
                                                                        className="p-1.5 hover:bg-[#F3E5DC] rounded-full text-[#8D6E63] hover:text-[#4D3A30] active:scale-95 transition-all"
                                                                    >
                                                                        <RefreshCcw className="w-4 h-4" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => deleteLog(activity.id)}
                                                                        className="p-1.5 hover:bg-red-50 rounded-full text-[#8D6E63] hover:text-red-500 active:scale-95 transition-all"
                                                                    >
                                                                        <XCircle className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                <div className="mt-8 px-2">
                    <Button size="full" variant="outline" className="h-16 rounded-full border-2 font-black text-lg" onClick={() => window.location.href = '/capture'}>
                        + เพิ่มบันทึกใหม่
                    </Button>
                </div>
            </div>

            <Navigation />
        </div>
    );
}

export default function DailyLogPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-primary-50/20 text-primary-950 font-black">Loading...</div>}>
            <DailyLogContent />
        </Suspense>
    );
}
