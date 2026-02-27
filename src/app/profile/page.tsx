'use client';

import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/Button';
import { User, Settings, Bell, ShieldCheck, LogOut, ChevronRight, Edit2, Heart } from 'lucide-react';

export default function ProfilePage() {
    const user = {
        name: "สมชาย รักสุขภาพ",
        email: "somchai@example.com",
        stats: {
            age: 32,
            weight: 70,
            goal: "ปรับสมดุลลำไส้"
        }
    };

    const menuItems = [
        { icon: User, label: 'ข้อมูลส่วนตัว', value: 'แก้ไขข้อมูล' },
        { icon: Heart, label: 'เป้าหมายสุขภาพ', value: user.stats.goal },
        { icon: Bell, label: 'การแจ้งเตือน', value: 'เปิดใช้งาน' },
        { icon: ShieldCheck, label: 'ความเป็นส่วนตัว', value: '' },
        { icon: Settings, label: 'ตั้งค่าการใช้งาน', value: '' },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-primary-50/50 pb-32">
            {/* Header Profile */}
            <div className="p-8 pt-12 text-center space-y-4">
                <div className="relative inline-block">
                    <div className="w-24 h-24 rounded-3xl brown-gradient flex items-center justify-center text-white text-3xl font-bold shadow-xl mx-auto">
                        {user.name.charAt(0)}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-xl shadow-md flex items-center justify-center border border-primary-100 cursor-pointer">
                        <Edit2 className="w-4 h-4 text-primary-600" />
                    </div>
                </div>
                <div>
                    <h1 className="text-2xl font-black text-primary-950">{user.name}</h1>
                    <p className="text-primary-500 font-medium">{user.email}</p>
                </div>
            </div>

            <div className="px-6 space-y-6">
                {/* Quick Stats Grid */}
                <div className="grid grid-cols-3 gap-3">
                    {Object.entries(user.stats).map(([k, v]) => (
                        <div key={k} className="bg-white p-4 rounded-2xl border border-primary-100 text-center soft-shadow">
                            <p className="text-[10px] font-bold text-primary-400 uppercase tracking-widest">{k === 'age' ? 'อายุ' : k === 'weight' ? 'น้ำหนัก' : 'เป้าหมาย'}</p>
                            <p className="text-sm font-black text-primary-950 truncate">{v}</p>
                        </div>
                    ))}
                </div>

                {/* Menu Items */}
                <div className="bg-white rounded-3xl overflow-hidden border border-primary-100 soft-shadow">
                    {menuItems.map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={i}
                                className="flex items-center justify-between p-5 border-b border-primary-50 active:bg-primary-50 transition-colors cursor-pointer group last:border-0"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center border border-primary-100">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-primary-900">{item.label}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-primary-400 font-medium">{item.value}</span>
                                    <ChevronRight className="w-5 h-5 text-primary-200 group-hover:text-primary-400 transition-colors" />
                                </div>
                            </div>
                        );
                    })}
                </div>

                <Button variant="ghost" size="full" className="text-red-500 hover:bg-red-50 hover:text-red-600 border border-transparent active:border-red-100">
                    <LogOut className="w-5 h-5 mr-2" />
                    ออกจากระบบ
                </Button>
            </div>

            <Navigation />
        </div>
    );
}
