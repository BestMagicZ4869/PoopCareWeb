'use client';

import React, { useState, useRef } from 'react';
import { ArrowLeft, Camera, Image as ImageIcon, Calendar, Clock, ShieldCheck, BarChart2, Check, CheckCircle2, Droplets, Activity, Info, Loader2, Palette, Waves, Eye } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { TimePicker } from '@/components/TimePicker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion, AnimatePresence } from 'framer-motion';

export default function CapturePage() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [selectedTime, setSelectedTime] = useState<string>("12:00");
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const handleAnalyze = () => {
        if (!image) {
            alert('กรุณาอัปโหลดรูปภาพเพื่อวิเคราะห์ก่อนครับ');
            return;
        }
        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            setShowResult(true);
        }, 2000);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const mockActivities = [
        { id: 4, type: 'poop', label: 'ขับถ่าย', value: 'สีดำ, Type 7, ลอย', time: '18:10', abnormalities: ['ถ่ายเป็นน้ำ', 'หน้ามืด'], status: 'bad' },
        { id: 2, type: 'poop', label: 'ขับถ่าย', value: 'สีแดง, Type 6, ลอย', time: '14:20', abnormalities: ['มีเลือดปน', 'มีมูก'], status: 'bad' },
        { id: 1, type: 'poop', label: 'ขับถ่าย', value: 'สีเหลือง, Type 5, ลอย', time: '11:15', abnormalities: ['มีเศษอาหาร'], status: 'warning' },
        { id: 3, type: 'poop', label: 'ขับถ่าย', value: 'สีน้ำตาล, Type 4, จม', time: '08:45', abnormalities: [], status: 'good' },
        { id: 5, type: 'poop', label: 'ขับถ่าย', value: 'สีน้ำตาลเข้ม, Type 3, จม', time: '06:30', abnormalities: [], status: 'good' },
    ].sort((a, b) => a.time.localeCompare(b.time));

    const renderActivitiesTable = () => (
        <div className="space-y-6 pt-4 px-2 mt-4 max-w-lg mx-auto w-full">
            <div className="flex items-end justify-between px-2">
                <div className="flex items-end gap-1.5">
                    <h3 className="text-[17px] font-black text-[#8D6E63]">ประวัติการขับถ่ายวันนี้</h3>
                    <span className="text-[13px] font-bold text-[#8D6E63] mb-[1px] opacity-70">({mockActivities.length} ครั้ง)</span>
                </div>
                <button
                    onClick={() => window.location.href = '/daily-log'}
                    className="text-[14px] font-black text-[#CB8D66] hover:text-[#D16B27] transition-colors pb-1 pr-2 underline underline-offset-4 decoration-[#CB8D66]/40"
                >
                    ดูทั้งหมด
                </button>
            </div>

            <div className="bg-[#FAF5F2] rounded-[2.5rem] p-8 px-6 shadow-sm border border-[#F3E5DC]">
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-[77px] top-[24px] bottom-[24px] w-0.5 bg-[#8D6E63] opacity-30 z-0" />

                    <div className="space-y-10 relative z-10">
                        {mockActivities.map((activity, index) => {
                            const isFirst = index === 0;
                            const dotColor = activity.status === 'bad' ? 'bg-red-500' : activity.status === 'warning' ? 'bg-amber-400' : 'bg-emerald-500';
                            const isBad = activity.status === 'bad';

                            return (
                                <div key={activity.id} className="flex items-center">
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
                                            <Droplets className="w-[22px] h-[22px] stroke-[1.5px]" />
                                        </div>
                                    </div>

                                    {/* Info Column */}
                                    <div className="flex-1 pt-0.5">
                                        <div className="text-[18px] font-black text-[#2D1B10] leading-none mb-1.5 flex items-center gap-2">
                                            {activity.label}
                                            <span className={`w-2 h-2 rounded-full ${dotColor} ${isBad ? 'animate-pulse' : ''}`} />
                                        </div>
                                        <div className="text-[13px] font-bold text-[#8D6E63] opacity-80 leading-none mt-2">
                                            {activity.value}
                                        </div>
                                        {activity.abnormalities && activity.abnormalities.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mt-3">
                                                {activity.abnormalities.map((item, i) => (
                                                    <span key={i} className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#FFF0F0] text-[#D65A5A] text-[10px] font-bold border border-[#D65A5A]/20">
                                                        <Activity className="w-2.5 h-2.5 opacity-70" />
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );


    if (showResult) {
        return (
            <div className="flex flex-col min-h-screen bg-[#F8F9FA] pb-24 font-sans px-5 pt-12">
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
                    <p className="text-[11px] font-extrabold text-[#E28340] tracking-[0.15em] mb-1 uppercase">Latest Report</p>
                    <h1 className="text-[28px] font-black text-[#2D1B10] mb-1 font-serif tracking-tight">Stool Health Summary</h1>
                    <p className="text-[#8B7C73] text-[12px] mb-8">
                        Analyzed on {selectedDate ? selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Oct 24, 2023'} • {selectedTime || '08:45 AM'}
                    </p>

                    {/* Color Analysis */}
                    <div className="flex items-center gap-2.5 mb-3 px-1">
                        <Palette className="w-5 h-5 text-[#D16B27]" strokeWidth={2.5} />
                        <h2 className="text-[15px] font-black text-[#2D1B10]">Color Analysis</h2>
                    </div>

                    <div className="bg-white rounded-2xl p-5 mb-4 border border-[#D16B27]/20 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] relative">
                        <div className="bg-[#FDECE3] text-[#D16B27] text-[9px] font-black uppercase tracking-wider px-2 py-1.5 rounded mb-3 inline-block">
                            Detected Result
                        </div>
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="text-xl font-bold text-[#2D1B10] font-serif">Brown (Normal)</h3>
                            <div className="w-10 h-10 rounded-full bg-[#6D4C41] shadow-inner"></div>
                        </div>
                        <p className="text-[#8B7C73] text-[13px] leading-relaxed">
                            Your stool color is within the healthy range. This typically indicates a balanced diet and normal bile processing.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-8">
                        <div className="bg-white rounded-2xl py-4 flex flex-col items-center justify-center border border-[#F0EBE6] shadow-[0_2px_8px_-4px_rgba(0,0,0,0.02)]">
                            <div className="w-7 h-7 rounded-full bg-[#2D3436] mb-2 shadow-inner"></div>
                            <span className="text-[11px] font-black text-[#2D1B10]">Black</span>
                            <span className="text-[9px] text-[#A0938C] mt-0.5">Upper GI</span>
                        </div>
                        <div className="bg-white rounded-2xl py-4 flex flex-col items-center justify-center border border-[#F0EBE6] shadow-[0_2px_8px_-4px_rgba(0,0,0,0.02)]">
                            <div className="w-7 h-7 rounded-full bg-[#D65A5A] mb-2 shadow-inner"></div>
                            <span className="text-[11px] font-black text-[#2D1B10]">Red</span>
                            <span className="text-[9px] text-[#A0938C] mt-0.5">Lower GI</span>
                        </div>
                        <div className="bg-white rounded-2xl py-4 flex flex-col items-center justify-center border border-[#F0EBE6] shadow-[0_2px_8px_-4px_rgba(0,0,0,0.02)]">
                            <div className="w-7 h-7 rounded-full bg-[#E8EAE6] mb-2 shadow-inner"></div>
                            <span className="text-[11px] font-black text-[#2D1B10]">Pale</span>
                            <span className="text-[9px] text-[#A0938C] mt-0.5">Bile Block</span>
                        </div>
                    </div>

                    {/* Bristol Stool Scale */}
                    <div className="flex items-center justify-between mb-3 px-1">
                        <div className="flex items-center gap-2.5">
                            <BarChart2 className="w-5 h-5 text-[#D16B27]" strokeWidth={2.5} />
                            <h2 className="text-[15px] font-black text-[#2D1B10]">Bristol Stool Scale</h2>
                        </div>
                        <div className="bg-[#D16B27] text-white text-[10px] font-black px-2 py-1 rounded">Type 4</div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 mb-8 border border-[#F0EBE6] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                        <div className="relative flex items-center justify-between mb-5 mt-3 px-2">
                            {/* Line */}
                            <div className="absolute left-2 right-2 h-0.5 bg-[#F0EBE6] rounded-full top-1/2 -translate-y-1/2 z-0"></div>

                            {/* Dots */}
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-2.5 h-2.5 rounded-full bg-[#D2CFC9] z-10 relative"></div>
                            ))}
                            <div className="w-5 h-5 rounded-full bg-[#D16B27] border-[3px] border-[#FDECE3] z-10 relative flex items-center justify-center shadow-sm">
                            </div>
                            {[5, 6, 7].map(i => (
                                <div key={i} className="w-2.5 h-2.5 rounded-full bg-[#D2CFC9] z-10 relative"></div>
                            ))}
                        </div>
                        <div className="flex justify-between text-[8px] font-black text-[#A0938C] uppercase tracking-widest mb-5">
                            <span>Constipation</span>
                            <span className="text-[#D16B27]">Normal</span>
                            <span>Diarrhea</span>
                        </div>
                        <div className="w-full h-px bg-[#F0EBE6]/60 mb-4"></div>
                        <h3 className="text-[13px] font-black text-[#2D1B10] mb-1">Type 4: Like a sausage or snake, smooth and soft</h3>
                        <p className="text-[11px] text-[#A0938C] italic font-serif">This is considered the ideal stool shape.</p>
                    </div>

                    {/* Bottom Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-8">
                        {/* Buoyancy */}
                        <div>
                            <div className="flex items-center gap-2 mb-3 px-1">
                                <Waves className="w-4 h-4 text-[#D16B27]" strokeWidth={2.5} />
                                <h2 className="text-[13px] font-black text-[#2D1B10]">Buoyancy</h2>
                            </div>
                            <div className="bg-white rounded-2xl p-5 border border-[#F0EBE6] shadow-[0_2px_8px_-4px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center min-h-[140px]">
                                <div className="text-[#D16B27] mb-2 flex flex-col items-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80"><path d="m7 15 5 5 5-5" /><path d="m7 9 5 5 5-5" /></svg>
                                </div>
                                <h3 className="font-black text-[#2D1B10] text-[14px] mb-1">Sinks</h3>
                                <p className="text-[10px] text-[#A0938C]">Normal fiber intake</p>
                            </div>
                        </div>

                        {/* Observations */}
                        <div>
                            <div className="flex items-center gap-2 mb-3 px-1">
                                <Eye className="w-4 h-4 text-[#D16B27]" strokeWidth={2.5} />
                                <h2 className="text-[13px] font-black text-[#2D1B10]">Observations</h2>
                            </div>
                            <div className="bg-white rounded-2xl p-4 border border-[#F0EBE6] shadow-[0_2px_8px_-4px_rgba(0,0,0,0.02)] min-h-[140px] flex flex-col justify-between">
                                <div className="grid grid-cols-2 gap-1.5">
                                    <div className="flex items-center justify-center gap-1.5 bg-[#F8F9FA] text-[#C0B9B4] py-1.5 rounded-md text-[9px] font-bold border border-gray-100">
                                        <Droplets className="w-2.5 h-2.5 opacity-60" /> Blood
                                    </div>
                                    <div className="flex items-center justify-center gap-1.5 bg-[#F8F9FA] text-[#C0B9B4] py-1.5 rounded-md text-[9px] font-bold border border-gray-100">
                                        <Droplets className="w-2.5 h-2.5 opacity-60" /> Mucus
                                    </div>
                                    <div className="flex items-center justify-center gap-1.5 bg-[#F8F9FA] text-[#C0B9B4] py-1.5 rounded-md text-[9px] font-bold border border-gray-100">
                                        <Camera className="w-2.5 h-2.5 opacity-60" /> Pus
                                    </div>
                                    <div className="flex items-center justify-center gap-1.5 bg-[#F8F9FA] text-[#C0B9B4] py-1.5 rounded-md text-[9px] font-bold border border-gray-100">
                                        <Activity className="w-2.5 h-2.5 opacity-60" /> Parasites
                                    </div>
                                </div>
                                <div className="text-center mt-3">
                                    <p className="text-[11px] font-bold text-[#D16B27] italic font-serif">None detected</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {renderActivitiesTable()}
                </div>

                <Navigation />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-white pb-24 font-sans">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />

            <div className="w-full bg-white relative">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-6 border-b border-[#F3E5DC]/50">
                    <button onClick={() => window.history.back()} className="text-[#2D1B10] hover:opacity-75 transition-opacity">
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-[19px] font-black text-[#2D1B10]">วิเคราะห์สุขภาพ</h1>
                    <div className="w-6 h-6" /> {/* Placeholder spacer */}
                </div>

                <div className="p-6 space-y-8">
                    {/* Upload Section */}
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full max-w-[330px] sm:max-w-[360px] aspect-square mx-auto border-[2px] border-dashed border-[#F3E5DC] rounded-[2rem] overflow-hidden flex flex-col items-center justify-center text-center bg-[#FAF5F2] cursor-pointer hover:bg-primary-50/40 transition-colors relative"
                    >
                        {!image ? (
                            <div className="flex flex-col h-full w-full justify-between items-center p-5">
                                <div className="flex-1 flex flex-col items-center justify-center w-full mt-1">
                                    <div className="flex items-center justify-center gap-3 mb-4">
                                        <div className="w-[48px] h-[48px] rounded-full bg-[#4D3A30] flex items-center justify-center text-white shadow-md shadow-[#4D3A30]/20">
                                            <Camera className="w-[22px] h-[22px]" />
                                        </div>
                                        <div className="w-[48px] h-[48px] rounded-full bg-white border border-[#F3E5DC] flex items-center justify-center text-[#8D6E63] shadow-sm">
                                            <ImageIcon className="w-[22px] h-[22px]" />
                                        </div>
                                    </div>
                                    <h3 className="text-[18px] font-black text-[#2D1B10] mb-1.5">อัปโหลดรูปภาพ</h3>
                                    <p className="text-[13px] text-[#8D6E63] font-medium leading-relaxed px-2">
                                        ถ่ายภาพหรืออัปโหลดจากอัลบั้ม
                                    </p>
                                </div>
                                <div
                                    className="w-full mt-2 py-3.5 px-6 bg-white border border-[#F3E5DC] rounded-[1rem] text-[#2D1B10] font-black text-[14px] shadow-sm flex items-center justify-center"
                                >
                                    เลือกรูปภาพ
                                </div>
                            </div>
                        ) : (
                            <img src={image} className="w-full h-full object-cover absolute inset-0" alt="รูปที่เลือก" />
                        )}
                    </div>

                    {/* Entry Details & Results */}
                    {!showResult && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="space-y-4">
                                <h3 className="text-[19px] font-black text-[#2D1B10] mb-5">ข้อมูลการบันทึก</h3>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <label className="text-sm font-black text-[#8D6E63] uppercase tracking-widest px-4 block opacity-60">วันที่</label>
                                        <div
                                            onClick={() => setIsCalendarOpen(true)}
                                            className="h-14 bg-white rounded-[1.2rem] flex items-center px-4 relative shadow-sm border border-[#F3E5DC] hover:border-[#8D6E63] transition-all cursor-pointer"
                                        >
                                            <div className="w-full bg-transparent text-[15px] font-bold text-[#2D1B10] outline-none">
                                                {selectedDate ? selectedDate.toLocaleDateString('th-TH', { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'วัน/เดือน/ปี'}
                                            </div>
                                            <Calendar className="w-5 h-5 text-[#8D6E63] absolute right-4 opacity-60 pointer-events-none z-10" />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-black text-[#8D6E63] uppercase tracking-widest px-4 block opacity-60">เวลา</label>
                                        <div className="h-14 bg-white rounded-[1.2rem] flex items-center px-1 shadow-sm border border-[#F3E5DC] hover:border-[#8D6E63] transition-all">
                                            <TimePicker
                                                value={selectedTime}
                                                onChange={setSelectedTime}
                                                hideLabel
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-3">
                                    <label className="text-sm font-black text-[#8D6E63] uppercase tracking-widest px-4 block opacity-60">รายละเอียดเพิ่มเติม (ตัวเลือก)</label>
                                    <textarea
                                        placeholder="อาการ, อาหารที่ทาน, ยาที่ทาน ฯลฯ..."
                                        className="w-full h-[130px] p-5 bg-white rounded-[1.2rem] text-[15px] font-bold text-[#2D1B10] resize-none shadow-sm border border-[#F3E5DC] outline-none focus:border-[#8D6E63] focus:ring-2 focus:ring-[#8D6E63]/20 placeholder:text-[#8D6E63]/40 transition-all leading-relaxed hover:border-[#8D6E63]"
                                    />
                                </div>
                            </div>

                            {/* Privacy Note */}
                            <div className="bg-[#FAF5F2] p-5 rounded-2xl flex items-start gap-4 mt-6">
                                <div className="w-[18px] h-[18px] rounded-full bg-[#4D3A30] flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <ShieldCheck className="w-3.5 h-3.5 text-white" />
                                </div>
                                <p className="text-[12px] leading-relaxed text-[#8D6E63] font-medium pr-2">
                                    ข้อมูลของคุณถูกเข้ารหัสและรักษาความปลอดภัยอย่างเข้มงวด การวิเคราะห์ดำเนินการตามมาตรฐานสากล
                                </p>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end mt-12 mb-4">
                                <button
                                    onClick={handleAnalyze}
                                    disabled={isAnalyzing}
                                    className="absolute -right-6 md:-right-8 bottom-8 pl-8 md:pl-12 pr-10 md:pr-14 h-14 md:h-16 rounded-l-full rounded-r-none font-black bg-[#4D3A30] text-white shadow-2xl shadow-[#4D3A30]/30 active:scale-95 transition-all z-30 text-base md:text-xl border-y border-l border-white/20 disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isAnalyzing ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            กำลังวิเคราะห์...
                                        </>
                                    ) : (
                                        <>
                                            <BarChart2 className="w-[18px] h-[18px]" />
                                            วิเคราะห์อึ
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {!showResult && renderActivitiesTable()}

                </div>
            </div>

            <Navigation />

            {/* Calendar Drawer Overlay */}
            <AnimatePresence>
                {isCalendarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm touch-none"
                            onClick={() => setIsCalendarOpen(false)}
                        />
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 28, stiffness: 300, mass: 0.8 }}
                            className="fixed inset-x-0 bottom-0 z-[101] bg-[#8B5E3C] pt-6 pb-8 px-6 rounded-t-[3rem] shadow-[0_-15px_40px_rgba(0,0,0,0.3)] flex flex-col items-center brown-datepicker-wrapper touch-none"
                        >
                            <div className="w-full flex justify-center mb-5 text-[10px] font-black opacity-50 tracking-[0.2em] uppercase text-white">
                                เลือกวันที่
                            </div>

                            <DatePicker
                                selected={selectedDate}
                                onChange={(date: Date | null) => setSelectedDate(date)}
                                inline
                                dateFormat="dd/MM/yyyy"
                            />

                            <button
                                onClick={() => setIsCalendarOpen(false)}
                                className="mt-8 w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center active:scale-90 transition-transform shadow-xl border border-white/30"
                            >
                                <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-[#8B5E3C] shadow-lg">
                                    <Check className="w-6 h-6 stroke-[4px]" />
                                </div>
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
