import { motion } from "framer-motion";

export const Preloader = () => {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
        >
            <div className="flex flex-col items-center gap-4">
                {/* Minimal spinner */}
                <div className="h-5 w-5 relative">
                    {[...Array(8)].map((_, i) => (
                        <span
                            key={i}
                            className="absolute w-[2px] h-[5px] bg-foreground rounded-full left-1/2 top-0 -ml-[1px] opacity-20 animate-spinner"
                            style={{
                                transformOrigin: "50% 10px", // Center pivot reduced
                                transform: `rotate(${i * 45}deg)`,
                                animationDelay: `${-0.8 + (i * 0.1)}s`
                            }}
                        />
                    ))}
                    <style>{`
            @keyframes spinner {
              0% { opacity: 0.8; }
              100% { opacity: 0.1; }
            }
            .animate-spinner {
              animation: spinner 0.8s linear infinite;
            }
          `}</style>
                </div>

                {/* Loading text */}
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 font-medium">
                    Loading
                </span>
            </div>
        </motion.div>
    );
};
