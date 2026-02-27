'use client';

import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/Button';
import { Brain, Info, Droplets, Utensils, AlertTriangle, ArrowRight, Lightbulb } from 'lucide-react';

export default function RecommendationPage() {
    const recommendations = [
        {
            type: 'success',
            title: 'ขับถ่ายปกติ (Optimal)',
            description: 'ลักษณะอุจจาระ Type 4 เป็นลักษณะที่สุขภาพดีที่สุด ควรคงพฤติกรรมการทานอาหารที่มีกากใยสูงต่อไป',
            icon: Lightbulb,
            color: 'text-accent-green',
            bg: 'bg-accent-green/10'
        },
        {
            type: 'warning',
            title: 'ควรดื่มน้ำเพิ่มขึ้น',
            description: 'ข้อมูลระบุว่าคุณดื่มน้ำเพียง 1.2L วันนี้ ซึ่งน้อยกว่าเกณฑ์ที่ควรจะเป็น อาจส่งผลให้ท้องผูกในอนาคต',
            icon: Droplets,
            color: 'text-blue-500',
            bg: 'bg-blue-50'
        },
        {
            type: 'info',
            title: 'เพิ่มกากใยอีกสักนิด',
            description: 'ลองเพิ่มการทานผักใบเขียวในมื้อเย็น เพื่อช่วยปรับสมดุลจุลินทรีย์ในลำไส้ให้ดียิ่งขึ้น',
            icon: Utensils,
            color: 'text-accent-gold',
            bg: 'bg-accent-gold/10'
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-primary-50/50 pb-32">
            <div className="p-6">
                <div className="flex items-center gap-2 mb-1">
                    <Brain className="w-5 h-5 text-primary-600" />
                    <h2 className="text-sm font-bold text-primary-600 uppercase tracking-widest">AI วิเคราะห์ผล</h2>
                </div>
                <h1 className="text-2xl font-bold text-primary-950">คำแนะนำเฉพาะบุคคล</h1>
            </div>

            <div className="px-6 space-y-6">
                <div className="p-6 bg-white rounded-3xl border border-primary-100 soft-shadow">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white">
                            <Info className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-primary-400 uppercase">เหตุผลเชิงตรรกะ</p>
                            <h3 className="font-bold text-primary-950">ที่มาของคำแนะนำ</h3>
                        </div>
                    </div>
                    <p className="text-sm text-primary-800 leading-relaxed">
                        ระบบตรวจสอบพบความสัมพันธ์ระหว่าง <span className="font-bold text-primary-600">Bristol Type 4</span> และ <span className="font-bold text-primary-600">พฤติกรรมการออกกำลังกาย</span> ในช่วง 3 วันที่ผ่านมา ส่งผลให้สุขภาพลำไส้อยู่ในเกณฑ์ดีเลิศ
                    </p>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold text-primary-950 px-2 uppercase text-xs tracking-widest text-primary-400">รายการแนะนำ</h3>
                    {recommendations.map((rec, i) => {
                        const Icon = rec.icon;
                        return (
                            <div key={i} className="bg-white rounded-3xl p-6 soft-shadow border border-primary-100 flex gap-4 transition-all active:scale-[0.98]">
                                <div className={`w-12 h-12 rounded-2xl ${rec.bg} flex-shrink-0 flex items-center justify-center`}>
                                    <Icon className={`w-6 h-6 ${rec.color}`} />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <h4 className="font-bold text-primary-950">{rec.title}</h4>
                                    <p className="text-sm text-primary-600 leading-snug">{rec.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="p-6 bg-red-50 rounded-3xl border border-red-100 flex items-center gap-4">
                    <div className="p-3 bg-red-100 rounded-full text-red-500">
                        <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <p className="text-xs font-bold text-red-600 uppercase">ระดับความเสี่ยง: ต่ำ</p>
                        <p className="text-sm text-red-800 font-medium">ยังไม่พบความผิดปกติที่ต้องพบแพทย์</p>
                    </div>
                </div>
            </div>

            <Navigation />
        </div>
    );
}
