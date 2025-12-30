import { useRef } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { Download, RefreshCcw } from 'lucide-react';
import santaGift from '../assets/santa-gift.png';

export default function PolaroidReveal({ deed }) {
    const cardRef = useRef(null);

    const handleDownload = async () => {
        if (cardRef.current) {
            const canvas = await html2canvas(cardRef.current, {
                backgroundColor: null,
                scale: 2, // Higher quality
            });
            const link = document.createElement('a');
            link.download = 'santas-gift-of-kindness.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
    };

    return (
        <motion.div
            initial={{ rotate: -5, scale: 0.8, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5, duration: 1 }}
            className="flex flex-col items-center gap-8 max-w-lg w-full px-4"
        >
            <div className="relative group perspective-1000">
                {/* The Polaroid Card */}
                <div
                    ref={cardRef}
                    className="bg-white p-4 pb-16 shadow-2xl transform transition-transform duration-500 hover:rotate-1"
                    style={{ width: '320px', minHeight: '420px' }}
                >
                    <div className="relative bg-midnight w-full h-64 overflow-hidden mb-4 border border-gray-100">
                        <img
                            src={santaGift}
                            alt="Santa's Gift"
                            className="w-full h-full object-cover"
                        />

                        {/* Overlay Gift Tag */}
                        <div className="absolute bottom-4 right-4 bg-[#f8f5e6] text-black p-3 shadow-lg transform rotate-[-3deg] max-w-[180px] border border-gray-200"
                            style={{ fontFamily: 'Nothing You Could Do, cursive' }}> {/* Fallback to cursive if not loaded */}
                            <div className="w-3 h-3 bg-red-800 rounded-full border border-red-900 absolute -left-1.5 top-1/2 -translate-y-1/2"></div>
                            <p className="text-xs font-bold text-red-800 uppercase tracking-widest mb-1">For Good Deed:</p>
                            <p className="text-sm font-handwriting leading-tight overflow-hidden text-ellipsism line-clamp-3 italic">
                                "{deed}"
                            </p>
                        </div>
                    </div>

                    <div className="text-center">
                        <h3 className="text-3xl font-christmas text-gray-800 mb-1">Santa's Gift</h3>
                        <p className="text-sm font-body text-gray-500 uppercase tracking-widest">Official North Pole Certification</p>
                        <p className="text-xs text-gray-400 mt-2">2025 Edition</p>
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 bg-festive-gold text-midnight px-6 py-3 rounded-full font-bold hover:bg-yellow-400 transition-colors shadow-lg"
                >
                    <Download size={20} />
                    Download Reward
                </button>
                <button
                    onClick={() => window.location.reload()}
                    className="flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-full font-bold hover:bg-white/20 transition-colors border border-white/20 backdrop-blur-sm"
                >
                    <RefreshCcw size={20} />
                    Start Over
                </button>
            </div>
        </motion.div>
    );
}
