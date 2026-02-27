'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/Button';
import { Droplets, Utensils, Moon, Activity, Wine } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LifestylePage() {
    const [inputs, setInputs] = useState({
        water: 1.5,
        fiber: 20,
        sleep: 7,
        exercise: 30,
        alcohol: 0
    });

    const habitItems = [
        { key: 'water', label: 'ปริมาณน้ำดื่ม (ลิตร)', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-50', unit: 'L', max: 5, step: 0.1 },
        { key: 'fiber', label: 'ปริมาณไฟเบอร์ (กรัม)', icon: Utensils, color: 'text-green-500', bg: 'bg-green-50', unit: 'g', max: 50, step: 1 },
        { key: 'sleep', label: 'ชั่วโมงการนอน', icon: Moon, color: 'text-purple-500', bg: 'bg-purple-50', unit: 'ชม.', max: 12, step: 0.5 },
        { key: 'exercise', label: 'การออกกำลังกาย (นาที)', icon: Activity, color: 'text-orange-500', bg: 'bg-orange-50', unit: 'นาที', max: 120, step: 5 },
        { key: 'alcohol', label: 'เครื่องดื่มแอลกอฮอล์ (แก้ว)', icon: Wine, color: 'text-red-500', bg: 'bg-red-50', unit: 'แก้ว', max: 10, step: 1 },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-primary-50/50 pb-32">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-primary-950">บันทึกพฤติกรรม</h1>
                <p className="text-primary-500 text-sm">ข้อมูลเหล่านี้ช่วยให้ AI วิเคราะห์สุขภาพได้แม่นยำขึ้น</p>
            </div>

            <div className="px-6 space-y-4">
                {habitItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div key={item.key} className="bg-white rounded-3xl p-6 soft-shadow border border-primary-100 flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center border", item.bg, item.color.replace('text', 'border'))}>
                                    <Icon className={cn("w-6 h-6", item.color)} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-primary-950">{item.label}</h3>
                                    <p className="text-2xl font-black text-primary-600">
                                        {inputs[item.key as keyof typeof inputs]} <span className="text-xs font-bold text-primary-400 uppercase tracking-widest">{item.unit}</span>
                                    </p>
                                </div>
                            </div>

                            <input
                                type="range"
                                min="0"
                                max={item.max}
                                step={item.step}
                                value={inputs[item.key as keyof typeof inputs]}
                                onChange={(e) => setInputs({ ...inputs, [item.key]: parseFloat(e.target.value) })}
                                className="w-full h-2 bg-primary-100 rounded-lg appearance-none cursor-pointer accent-primary-600"
                            />
                        </div>
                    );
                })}

                <div className="pt-4">
                    <Button size="full" onClick={() => window.location.href = '/activities'}>บันทึกข้อมูลวันนี้</Button>
                </div>
            </div>

            <Navigation />
        </div>
    );
}
