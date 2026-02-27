'use client';

import React from 'react';
import { Navigation } from '@/components/Navigation';
import { motion } from 'framer-motion';
import { TrendingUp, CheckCircle2, Droplets, Utensils, Activity, Brain, Info, Lightbulb, Moon, Pill, Search, XCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Dashboard() {
    const gutScore = 85;
    const riskStatus = "ปกติ";

    const detailedRecommendations = [
        {
            category: 'อาหารและการดื่มน้ำ',
            icon: Utensils,
            color: 'text-green-600',
            bg: 'bg-green-50',
            shouldDo: 'ควรทานอาหารที่มีกากใยสูง เช่น ผักใบเขียว ธัญพืชไม่ขัดสี และดื่มน้ำอุ่นทันทีหลังตื่นนอนให้ได้อย่างน้อย 1-2 แก้ว เพื่อกระตุ้นระบบขับถ่าย',
            shouldAvoid: 'ควรเลี่ยงอาหารที่มีไขมันสูง อาหารแปรรูป และเครื่องดื่มที่มีน้ำตาลสูง ซึ่งจะทำให้ระบบย่อยอาหารทำงานหนักและอุจจาระแข็งตัว'
        },
        {
            category: 'การออกกำลังกาย',
            icon: Activity,
            color: 'text-orange-600',
            bg: 'bg-orange-50',
            shouldDo: 'ควรเน้นการเดินเร็ว (Brisk Walking) หรือโยคะท่าที่ช่วยนวดลำไส้ เช่น ท่า Twist เพื่อช่วยให้ลำไส้มีการเคลื่อนไหว (Peristalsis) ได้ดีขึ้น',
            shouldAvoid: 'ไม่ควรออกกำลังกายหนักเกินไปทันทีหลังมื้ออาหาร และเลี่ยงกีฬาที่มีความหนักหน่วงสูงหากคุณรู้สึกอึดอัดท้องหรือมีลมในท้องมาก'
        },
        {
            category: 'อาหารเสริมที่แนะนำ',
            icon: Pill,
            color: 'text-purple-600',
            bg: 'bg-purple-50',
            shouldDo: 'สามารถทาน Probiotics กลุ่ม Lactobacillus หรือ Bifidobacterium เพื่อเพิ่มสมดุลจุลินทรีย์ และ Prebiotics เพื่อเป็นอาหารให้จุลินทรีย์ตัวดี',
            shouldAvoid: 'ไม่ควรทานยาถ่ายแบบเฉียบพลันต่อเนื่องเป็นเวลานานเกินไป เพราะจะทำให้ลำไส้ "ขี้เกียจ" และไม่ควรสุ่มทานอาหารเสริมที่ไม่มีเครื่องหมายรับรอง'
        },
        {
            category: 'คำแนะนำเกี่ยวกับอุจจาระ',
            icon: Search,
            color: 'text-primary-600',
            bg: 'bg-primary-50',
            shouldDo: 'ควรอั้นอุจจาระในระดับที่พอดีและขับถ่ายทันทีเมื่อรู้สึกปวดในช่วงเช้า (Golden time) สังเกตลักษณะให้อยู่ในกลุ่ม Bristol Type 4 (นิ่มและเรียวยาว)',
            shouldAvoid: 'ไม่ควรเบ่งอุจจาระแรงเกินไปหรือนั่งเล่นมือถือนานเกิน 5-10 นาที เพราะอาจเสี่ยงต่อการเกิดริดสีดวงและเลือดคั่งในส่วนปลาย'
        },
        {
            category: 'การพักผ่อนและสภาวะจิตใจ',
            icon: Moon,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            shouldDo: 'ควรนอนหลับให้ครบ 7-8 ชม. และรักษาระดับความเครียดให้ต่ำ เพราะลำไส้และสมอง (Gut-Brain Axis) มีความสัมพันธ์กันอย่างใกล้ชิด',
            shouldAvoid: 'ไม่ควรทำงานหรือเล่นมือถือที่มีแสงสีฟ้าก่อนนอน 1 ชม. และไม่ควรรับประทานอาหารมื้อดึกก่อนเวลานอนอย่างน้อย 3 ชม.'
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-primary-50/50 pb-32">
            {/* Header */}
            <div className="p-6 flex justify-between items-center bg-white/50 backdrop-blur-md sticky top-0 z-30 border-b border-primary-50">
                <div>
                    <h1 className="text-base font-medium text-primary-500 uppercase tracking-widest">สวัสดีตอนเช้า</h1>
                    <p className="text-2xl font-bold text-primary-950">คุณ สมชาย</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white soft-shadow flex items-center justify-center border border-primary-100">
                    <Activity className="w-6 h-6 text-primary-600" />
                </div>
            </div>

            <div className="px-6 space-y-8 pt-6">
                {/* Gut Score Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative bg-white rounded-[2.5rem] p-8 soft-shadow border border-primary-100 overflow-hidden text-center"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Brain className="w-16 h-16 text-primary-600" />
                    </div>

                    <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 192 192">
                            <circle cx="96" cy="96" r="85" stroke="currentColor" strokeWidth="14" fill="transparent" className="text-primary-50" />
                            <circle cx="96" cy="96" r="85" stroke="currentColor" strokeWidth="14" fill="transparent" strokeDasharray={534} strokeDashoffset={534 - (534 * gutScore) / 100} strokeLinecap="round" className="text-primary-600 transition-all duration-1000 ease-out" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative">
                                <span className="text-8xl drop-shadow-sm select-none">
                                    {gutScore >= 80 ? '😊' : gutScore >= 60 ? '😐' : '😫'}
                                </span>
                                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center border-4 border-white shadow-xl transform translate-x-2 translate-y-2">
                                    <span className="text-white text-xs font-black tracking-tighter">{gutScore}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 space-y-2">
                        <div className="inline-flex items-center gap-2 px-6 py-2 bg-accent-green/10 text-accent-green rounded-full border border-accent-green/20">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="text-base font-black uppercase tracking-widest">สถานะ: {riskStatus}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Recommendations Header */}
                <div className="flex items-center gap-2 px-2">
                    <Brain className="w-5 h-5 text-primary-600" />
                    <h3 className="font-bold text-primary-950 text-base uppercase tracking-widest">คำแนะนำตามหลักการแพทย์</h3>
                </div>

                {/* New Structured Recommendations */}
                <div className="space-y-6 pb-12">
                    {detailedRecommendations.map((rec, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-[2.5rem] overflow-hidden soft-shadow border border-primary-100"
                        >
                            {/* Category Header */}
                            <div className={cn("px-6 py-4 flex items-center gap-3 border-b border-primary-50", rec.bg)}>
                                <div className={cn("p-2 rounded-xl bg-white shadow-sm")}>
                                    <rec.icon className={cn("w-5 h-5", rec.color)} />
                                </div>
                                <h4 className="font-bold text-primary-950 text-xl">{rec.category}</h4>
                            </div>

                            {/* Do & Don't Section */}
                            <div className="p-6 space-y-5">
                                <div className="flex gap-4">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                    <div className="space-y-1">
                                        <p className="text-xs font-black text-green-600 uppercase tracking-widest leading-none">ควรกระทำ (Do)</p>
                                        <p className="text-base text-primary-800 leading-relaxed">{rec.shouldDo}</p>
                                    </div>
                                </div>

                                <div className="w-full h-px bg-primary-50" />

                                <div className="flex gap-4">
                                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                                    <div className="space-y-1">
                                        <p className="text-xs font-black text-red-600 uppercase tracking-widest leading-none">ไม่ควรทำ (Don't)</p>
                                        <p className="text-base text-primary-800 leading-relaxed">{rec.shouldAvoid}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Footer Insight */}
                    <div className="bg-primary-950 rounded-[2rem] p-6 text-white text-center relative overflow-hidden">
                        <p className="text-xs opacity-70 mb-2 uppercase tracking-widest font-bold relative z-10">AI Analysis Period</p>
                        <p className="text-base font-medium relative z-10">ข้อมูลนี้ วิเคราะห์จาก 72ชม. ล่าสุด</p>

                        {/* Subtle decorative background pattern */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <svg width="100%" height="100%">
                                <pattern id="dots-footer" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                    <circle cx="2" cy="2" r="1" fill="white" />
                                </pattern>
                                <rect width="100%" height="100%" fill="url(#dots-footer)" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <Navigation />
        </div>
    );
}
