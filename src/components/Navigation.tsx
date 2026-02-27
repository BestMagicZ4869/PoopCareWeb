'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Camera, BookOpen, Clock, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Navigation = () => {
    const pathname = usePathname();

    const navItems = [
        { icon: Home, label: 'หน้าหลัก', path: '/dashboard' },
        { icon: Clock, label: 'ประวัติ', path: '/history' },
        { icon: Camera, label: 'บันทึกภาพ', path: '/capture', primary: true },
        { icon: BookOpen, label: 'กิจกรรม', path: '/activities' },
        { icon: User, label: 'โปรไฟล์', path: '/profile' },
    ];

    return (
        <nav className="fixed bottom-0 inset-x-0 bg-white/80 backdrop-blur-lg border-t border-primary-100 flex justify-center items-center z-50">
            <div className="w-full md:max-w-none px-6 py-4 pb-8 flex justify-between items-center">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.path;

                    if (item.primary) {
                        return (
                            <Link key={item.path} href={item.path} className="relative -top-8">
                                <div className="w-16 h-16 brown-gradient rounded-full flex items-center justify-center shadow-lg border-4 border-white active:scale-90 transition-transform">
                                    <Icon className="w-8 h-8 text-white" />
                                </div>
                            </Link>
                        );
                    }

                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={cn(
                                "flex flex-col items-center gap-1 transition-colors",
                                isActive ? "text-primary-600" : "text-primary-300"
                            )}
                        >
                            <Icon className="w-6 h-6" />
                            <span className="text-xs font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};
