import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy } from 'lucide-react';

const SleighGame = ({ onComplete }) => {
    const [score, setScore] = useState(0);
    const [sackPos, setSackPos] = useState(50);
    const [gifts, setGifts] = useState([]);

    // Refs for Game Engine (to avoid closure staleness)
    const requestRef = useRef();
    const lastSpawnRef = useRef(0);
    const scoreRef = useRef(0);
    const sackPosRef = useRef(50);

    const WIN_SCORE = 10; // Slightly lower for better UX

    // 1. Optimized Input Handling
    useEffect(() => {
        const handleMove = (e) => {
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const x = (clientX / window.innerWidth) * 100;
            const clampedX = Math.min(Math.max(x, 10), 90);
            setSackPos(clampedX);
            sackPosRef.current = clampedX;
        };

        window.addEventListener('mousemove', handleMove);
        window.addEventListener('touchmove', handleMove);
        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('touchmove', handleMove);
        };
    }, []);

    // 2. Optimized Game Loop
    const animate = useCallback((time) => {
        // Spawn Logic (Every 800ms)
        if (time - lastSpawnRef.current > 800) {
            const newGift = {
                id: Math.random(),
                x: Math.random() * 80 + 10,
                y: -10,
                speed: 0.4 + Math.random() * 0.4,
            };
            setGifts(prev => [...prev, newGift]);
            lastSpawnRef.current = time;
        }

        // Update Positions & Collision
        setGifts(prev => {
            const next = [];
            for (const gift of prev) {
                const nextY = gift.y + gift.speed;

                // Collision Detection
                const dist = Math.abs(gift.x - sackPosRef.current);
                const isHit = nextY > 82 && nextY < 92 && dist < 12;

                if (isHit) {
                    scoreRef.current += 1;
                    setScore(scoreRef.current);
                    // Skip adding to 'next' array (effectively destroying it)
                    continue;
                }

                if (nextY < 110) {
                    next.push({ ...gift, y: nextY });
                }
            }
            return next;
        });

        if (scoreRef.current < WIN_SCORE) {
            requestRef.current = requestAnimationFrame(animate);
        } else {
            setTimeout(onComplete, 500); // Small delay for the win feeling
        }
    }, [onComplete]);

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [animate]);

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center bg-slate-950/80 backdrop-blur-md overflow-hidden"
        >
            {/* HUD */}
            <div className="relative z-10 mt-10 text-center select-none">
                <div className="flex items-center justify-center gap-3 mb-2">
                    <Trophy className="text-yellow-400 animate-bounce" />
                    <h2 className="text-4xl font-black text-white tracking-widest">GIFT CATCH!</h2>
                </div>
                <div className="bg-white/10 px-6 py-2 rounded-full border border-white/20 inline-block">
                    <p className="text-2xl text-white font-mono">
                        Progress: <span className="text-green-400">{score}</span> / {WIN_SCORE}
                    </p>
                </div>
            </div>

            {/* Falling Items */}
            <div className="absolute inset-0 pointer-events-none">
                <AnimatePresence>
                    {gifts.map(gift => (
                        <div
                            key={gift.id}
                            className="absolute text-5xl transition-transform"
                            style={{ left: `${gift.x}%`, top: `${gift.y}%`, transform: 'translate(-50%, -50%)' }}
                        >
                            🎁
                        </div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Player */}
            <div
                className="absolute bottom-12 text-7xl select-none pointer-events-none transition-all duration-75 ease-out"
                style={{ left: `${sackPos}%`, transform: 'translateX(-50%)' }}
            >
                <div className="relative">
                    🎅
                    <div className="absolute -top-4 -right-2 text-2xl">🧺</div>
                </div>
            </div>

            {/* Skip Option */}
            <button
                onClick={onComplete}
                className="absolute bottom-6 right-6 text-white/30 hover:text-white flex items-center gap-1 text-xs transition-colors"
            >
                SKIP TO REWARD <X size={14} />
            </button>
        </motion.div>
    );
};

export default SleighGame;