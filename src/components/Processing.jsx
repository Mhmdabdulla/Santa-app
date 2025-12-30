import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function Processing() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
        >
            <div className="relative inline-block">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="text-festive-gold"
                >
                    <Sparkles size={64} />
                </motion.div>
            </div>
            <h2 className="text-3xl font-christmas text-white mt-8 animate-pulse">
                Santa is checking his list twice...
            </h2>
        </motion.div>
    );
}
