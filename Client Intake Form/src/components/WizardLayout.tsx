
import { CheckCircle2, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";

interface Step {
    id: string;
    title: string;
    icon: LucideIcon;
}

interface WizardLayoutProps {
    steps: Step[];
    currentStepIndex: number;
    children: ReactNode;
    onStepClick: (index: number) => void;
}

export function WizardLayout({
    steps,
    currentStepIndex,
    children,
    onStepClick,
}: WizardLayoutProps) {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="hidden w-72 flex-col border-r border-white/10 bg-black/40 backdrop-blur-md p-6 lg:flex shadow-2xl z-20">
                <div className="mb-10 flex items-center gap-3 px-2">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-[0_0_15px_rgba(139,92,246,0.3)] flex items-center justify-center text-white font-bold text-xl">
                        C
                    </div>
                    <div>
                        <h1 className="text-lg font-bold tracking-tight text-white">Client Intake Form</h1>
                        <p className="text-xs text-indigo-300">v2.0</p>
                    </div>
                </div>

                <nav className="flex flex-1 flex-col gap-1 overflow-y-auto pr-2 custom-scrollbar">
                    {steps.map((step, index) => {
                        const isCompleted = index < currentStepIndex;
                        const isCurrent = index === currentStepIndex;
                        const Icon = step.icon;

                        return (
                            <button
                                key={step.id}
                                onClick={() => onStepClick(index)}
                                className={`group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 overflow-hidden ${isCurrent
                                    ? "bg-gradient-to-r from-purple-600/20 to-indigo-600/20 text-white border border-purple-500/30 shadow-[0_0_20px_rgba(139,92,246,0.1)]"
                                    : isCompleted
                                        ? "text-indigo-200 hover:bg-white/5 hover:text-white"
                                        : "text-white/30 hover:bg-white/5 hover:text-white/60"
                                    }`}
                            >
                                {isCurrent && (
                                    <motion.div
                                        layoutId="active-step"
                                        className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500 rounded-full"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}

                                <span className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors ${isCurrent ? "bg-purple-500 text-white shadow-lg" :
                                    isCompleted ? "bg-emerald-500/20 text-emerald-400" :
                                        "bg-white/5 text-white/30"
                                    }`}>
                                    {isCompleted ? (
                                        <CheckCircle2 className="h-4 w-4" />
                                    ) : (
                                        <Icon className="h-3.5 w-3.5" />
                                    )}
                                </span>

                                <span className="flex-1 text-left">{step.title}</span>

                                {isCurrent && <ChevronRight className="h-4 w-4 opacity-50 animate-pulse" />}
                            </button>
                        );
                    })}
                </nav>

                <div className="mt-auto pt-6 border-t border-white/10 text-xs text-white/20 text-center">
                    &copy; 2026 AI Automation
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8 lg:p-12 relative z-10">
                <div className="mx-auto max-w-5xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStepIndex}
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.98 }}
                            transition={{ duration: 0.4, ease: "circOut" }}
                            className="w-full"
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
