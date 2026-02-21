
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function ColorsStep() {
    const { register, watch, setValue } = useFormContext();
    const primary = watch("primaryColor") || "#BFF549";
    const bg = watch("backgroundColor") || "#02040a";
    const text = watch("mutedTextColor") || "#99A1AF";

    const handleColorChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(name, e.target.value, { shouldValidate: true, shouldDirty: true });
    };

    return (
        <div className="space-y-8 animate-fade-in relative z-10">
            <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">Color Palette</h2>
                <p className="text-green-200/70">Define the visual spectrum and ambient lighting.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                {/* Primary Color */}
                <div className="space-y-3 relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: primary, opacity: 0.15 }} />
                    <Label htmlFor="primaryColor" className="text-white font-medium">Primary Accent</Label>
                    <div className="flex gap-3 items-center p-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                        <div className="relative">
                            <input
                                id="primaryColorPicker"
                                type="color"
                                className="w-12 h-12 p-0 border-0 rounded-full overflow-hidden cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.2)] opacity-0 absolute inset-0 z-10"
                                value={primary}
                                onChange={handleColorChange("primaryColor")}
                            />
                            <div className="w-12 h-12 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-colors duration-200" style={{ backgroundColor: primary }} />
                            <div className="absolute inset-0 rounded-full ring-1 ring-white/20 pointer-events-none" />
                        </div>
                        <Input
                            type="text"
                            {...register("primaryColor")}
                            placeholder="#BFF549"
                            className="font-mono text-sm uppercase tracking-wider bg-transparent border-0 focus:ring-0 active:ring-0"
                        />
                    </div>
                </div>

                {/* Background Color */}
                <div className="space-y-3 relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: bg, opacity: 0.15 }} />
                    <Label htmlFor="backgroundColor" className="text-white font-medium">Background Base</Label>
                    <div className="flex gap-3 items-center p-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                        <div className="relative">
                            <input
                                id="backgroundColorPicker"
                                type="color"
                                className="w-12 h-12 p-0 border-0 rounded-full overflow-hidden cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)] opacity-0 absolute inset-0 z-10"
                                value={bg}
                                onChange={handleColorChange("backgroundColor")}
                            />
                            <div className="w-12 h-12 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-colors duration-200" style={{ backgroundColor: bg }} />
                            <div className="absolute inset-0 rounded-full ring-1 ring-white/20 pointer-events-none" />
                        </div>
                        <Input
                            type="text"
                            {...register("backgroundColor")}
                            placeholder="#02040a"
                            className="font-mono text-sm uppercase tracking-wider bg-transparent border-0 focus:ring-0 active:ring-0"
                        />
                    </div>
                </div>

                {/* Muted Text Color */}
                <div className="space-y-3 relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: text, opacity: 0.15 }} />
                    <Label htmlFor="mutedTextColor" className="text-white font-medium">Muted Text</Label>
                    <div className="flex gap-3 items-center p-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                        <div className="relative">
                            <input
                                id="mutedTextColorPicker"
                                type="color"
                                className="w-12 h-12 p-0 border-0 rounded-full overflow-hidden cursor-pointer shadow-lg opacity-0 absolute inset-0 z-10"
                                value={text}
                                onChange={handleColorChange("mutedTextColor")}
                            />
                            <div className="w-12 h-12 rounded-full shadow-lg transition-colors duration-200" style={{ backgroundColor: text }} />
                            <div className="absolute inset-0 rounded-full ring-1 ring-white/20 pointer-events-none" />
                        </div>
                        <Input
                            type="text"
                            {...register("mutedTextColor")}
                            placeholder="#99A1AF"
                            className="font-mono text-sm uppercase tracking-wider bg-transparent border-0 focus:ring-0 active:ring-0"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-8 p-6 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md">
                <h3 className="text-white font-medium mb-4">Preview</h3>
                <div className="flex gap-4 items-center p-4 rounded-lg border border-white/5 transition-colors duration-200" style={{ backgroundColor: bg }}>
                    <div className="h-10 px-4 rounded-md flex items-center justify-center font-bold text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-colors duration-200" style={{ backgroundColor: primary }}>
                        Primary CTA
                    </div>
                    <div>
                        <h4 className="font-bold text-white">Headline Text</h4>
                        <p className="text-sm transition-colors duration-200" style={{ color: text }}>This is how your muted text will look against the background.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
