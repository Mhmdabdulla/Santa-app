import { useState } from 'react';
import { motion } from 'framer-motion';

export default function InputCard({ onSubmit }) {
    const [deed, setDeed] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (deed.trim()) {
            onSubmit(deed);
        }
    };

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md w-full mx-4"
        >
            <div className="glass p-8 rounded-2xl text-center relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-festive-gold to-transparent opacity-50"></div>

                <h2 className="text-4xl font-christmas text-festive-gold mb-6 drop-shadow-md">
                    Are you on Santa's Nice List?
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <label className="block text-left text-sm font-body text-blue-100 mb-2 ml-1">
                            Tell Santa one good thing you did this year...
                        </label>
                        <textarea
                            value={deed}
                            onChange={(e) => setDeed(e.target.value)}
                            className="w-full bg-midnight/30 border border-white/10 rounded-xl p-4 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-festive-gold/50 transition-all resize-none h-32 backdrop-blur-sm"
                            placeholder="I helped my neighbor with their groceries..."
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="group relative px-8 py-3 bg-gradient-to-r from-red-600 to-santa-red rounded-full font-bold text-white shadow-lg transform transition-all hover:scale-105 hover:shadow-red-500/30 overflow-hidden w-full sm:w-auto"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            Send to North Pole 🎁
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </button>
                </form>
            </div>
        </motion.div>
    );
}
