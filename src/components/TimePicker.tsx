'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Clock, Check } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TimePickerProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    inline?: boolean;
    hideLabel?: boolean;
}

// Helper component for each ruler item to handle its own hooks correctly
function RulerItem({ val, x, itemWidth }: { val: number, x: any, itemWidth: number }) {
    const opacity = useTransform(x, (v: number) => {
        const dist = Math.abs(v + (val * itemWidth));
        return 1 - Math.min(dist / (itemWidth * 1.5), 0.75);
    });
    const scale = useTransform(x, (v: number) => {
        const dist = Math.abs(v + (val * itemWidth));
        return 1.15 - Math.min(dist / (itemWidth * 3), 0.35);
    });

    return (
        <div style={{ width: itemWidth }} className="flex items-center justify-center text-2xl font-black flex-shrink-0">
            <motion.span style={{ opacity, scale }}>
                {val.toString().padStart(2, '0')}
            </motion.span>
        </div>
    );
}

export function TimePicker({ value, onChange, label, inline, hideLabel }: TimePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Constant for item width
    const itemWidth = 60;

    // Use motion values to track position without triggering re-renders
    const initialH = parseInt(value.split(':')[0]);
    const initialM = parseInt(value.split(':')[1]);
    const hX = useMotionValue(-initialH * itemWidth);
    const mX = useMotionValue(-initialM * itemWidth);

    // Derived transforms for smooth display in the header
    const displayHour = useTransform(hX, (v) => {
        const index = Math.abs(Math.round(v / itemWidth));
        return (index % 24).toString().padStart(2, '0');
    });
    const displayMin = useTransform(mX, (v) => {
        const index = Math.abs(Math.round(v / itemWidth));
        return (index % 60).toString().padStart(2, '0');
    });

    // Sync motion values when external value prop changes
    useEffect(() => {
        const [h, m] = value.split(':').map(Number);
        hX.set(-h * itemWidth);
        mX.set(-m * itemWidth);
    }, [value, hX, mX]);

    const handleSave = () => {
        const h = Math.abs(Math.round(hX.get() / itemWidth)) % 24;
        const m = Math.abs(Math.round(mX.get() / itemWidth)) % 60;
        const formattedTime = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
        onChange(formattedTime);
        setIsOpen(false);
    };

    const RulerInterface = () => {
        const hours = Array.from({ length: 24 }, (_, i) => i);
        const minutes = Array.from({ length: 60 }, (_, i) => i);

        return (
            <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 300, mass: 0.8 }}
                className="fixed inset-x-0 bottom-0 z-[100] bg-[#8B5E3C] pt-6 pb-8 px-6 rounded-t-[3rem] shadow-[0_-15px_40px_rgba(0,0,0,0.3)] text-white select-none overflow-hidden touch-none cursor-default"
            >
                {/* Header with Time Display */}
                <div className="flex flex-col items-center gap-0.5 mb-6">
                    <span className="text-[9px] font-black opacity-50 tracking-[0.2em] uppercase">GMT +7</span>
                    <div className="text-5xl font-black tracking-tight flex items-center">
                        <motion.span>{displayHour}</motion.span>
                        <span className="opacity-30 mx-2 animate-pulse">:</span>
                        <motion.span>{displayMin}</motion.span>
                    </div>
                </div>

                <div className="relative w-full h-44 flex flex-col justify-center items-center">
                    {/* Visual Center Indicators */}
                    <div className="absolute inset-y-0 w-20 bg-white/10 rounded-full pointer-events-none z-0 border border-white/5" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[50%] w-[2px] bg-white/80 z-30 pointer-events-none opacity-50" />

                    {/* Hours Ruler */}
                    <div className="w-full relative h-12 overflow-visible mb-1 cursor-grab active:cursor-grabbing" style={{ maskImage: 'linear-gradient(to right, transparent, black 35%, black 65%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 35%, black 65%, transparent)' }}>
                        <motion.div
                            className="flex items-center absolute left-1/2"
                            drag="x"
                            dragConstraints={{ left: -((hours.length - 1) * itemWidth), right: 0 }}
                            dragElastic={0.1}
                            dragMomentum={true}
                            style={{ x: hX, marginLeft: -itemWidth / 2 }}
                            onDragEnd={() => {
                                const target = Math.round(hX.get() / itemWidth) * itemWidth;
                                hX.set(target);
                            }}
                        >
                            {hours.map((h) => (
                                <RulerItem key={h} val={h} x={hX} itemWidth={itemWidth} />
                            ))}
                        </motion.div>
                    </div>

                    {/* Visual Ticks (Static Decoration) */}
                    <div className="w-full relative h-10 overflow-hidden mb-1 opacity-20 select-none pointer-events-none">
                        <div className="flex items-center absolute left-1/2 -translate-x-1/2 gap-[12px]">
                            {Array.from({ length: 15 }).map((_, i) => (
                                <div key={i} className={cn("w-[1.5px] bg-white flex-shrink-0", i === 7 ? "h-8 opacity-100" : "h-4 opacity-40")} />
                            ))}
                        </div>
                    </div>

                    {/* Minutes Ruler */}
                    <div className="w-full relative h-12 overflow-visible cursor-grab active:cursor-grabbing" style={{ maskImage: 'linear-gradient(to right, transparent, black 35%, black 65%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 35%, black 65%, transparent)' }}>
                        <motion.div
                            className="flex items-center absolute left-1/2"
                            drag="x"
                            dragConstraints={{ left: -((minutes.length - 1) * itemWidth), right: 0 }}
                            dragElastic={0.1}
                            dragMomentum={true}
                            style={{ x: mX, marginLeft: -itemWidth / 2 }}
                            onDragEnd={() => {
                                const target = Math.round(mX.get() / itemWidth) * itemWidth;
                                mX.set(target);
                            }}
                        >
                            {minutes.map((m) => (
                                <RulerItem key={m} val={m} x={mX} itemWidth={itemWidth} />
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Confirm Button */}
                <div className="flex justify-center mt-6">
                    <button
                        onClick={handleSave}
                        className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center active:scale-90 transition-transform shadow-xl border border-white/30"
                    >
                        <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-[#8B5E3C] shadow-lg">
                            <Check className="w-6 h-6 stroke-[4px]" />
                        </div>
                    </button>
                </div>
            </motion.div>
        );
    };

    if (inline) {
        return <div className="w-full"><RulerInterface /></div>;
    }

    return (
        <div className="relative w-full" ref={containerRef}>
            {label && (
                <label className="text-[17px] font-black text-primary-400 uppercase tracking-widest px-2 block mb-2">
                    {label}
                </label>
            )}

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full flex items-center gap-4 bg-transparent rounded-full transition-all active:scale-[0.98] h-full",
                    isOpen && "ring-2 ring-primary-100/50"
                )}
            >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm border border-primary-50/50 ml-1">
                    <Clock className="w-5 h-5 text-primary-400" />
                </div>
                <span className="text-[15px] font-bold text-[#2D1B10] tracking-tight">{value}</span>
            </button>

            {/* Label handled above button or externally via hideLabel */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />
                        <RulerInterface />
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
