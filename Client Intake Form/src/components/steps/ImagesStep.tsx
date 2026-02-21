
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileImage, UploadCloud } from "lucide-react";

export function ImagesStep() {
    const { register, watch } = useFormContext();
    const heroImage = watch("heroImageUrl");
    const backgroundImage = watch("backgroundImageUrl");

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Visual Assets</h2>
                <p className="text-emerald-200/70">Define the key imagery for the site.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label>Hero Image URL</Label>
                        <span className="text-xs text-white/40">1920x1080px Recommended</span>
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative aspect-video rounded-xl border border-white/10 bg-black/40 overflow-hidden flex items-center justify-center">
                            {heroImage ? (
                                <img src={heroImage} alt="Hero Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-center text-white/30">
                                    <FileImage className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                    <p className="text-sm">No image</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="relative">
                        <UploadCloud className="absolute left-3 top-3 h-4 w-4 text-emerald-400" />
                        <Input {...register("heroImageUrl")} placeholder="https://..." className="pl-10 bg-white/5 border-white/10 focus:border-emerald-500 transition-colors" />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label>Background Texture URL</Label>
                        <span className="text-xs text-white/40">Optional, subtle pattern</span>
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative aspect-video rounded-xl border border-white/10 bg-black/40 overflow-hidden flex items-center justify-center">
                            {backgroundImage ? (
                                <img src={backgroundImage} alt="Background Preview" className="w-full h-full object-cover opacity-50" />
                            ) : (
                                <div className="text-center text-white/30">
                                    <FileImage className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                    <p className="text-sm">No image</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="relative">
                        <UploadCloud className="absolute left-3 top-3 h-4 w-4 text-purple-400" />
                        <Input {...register("backgroundImageUrl")} placeholder="https://..." className="pl-10 bg-white/5 border-white/10 focus:border-purple-500 transition-colors" />
                    </div>
                </div>
            </div>

            <div className="space-y-4 border-t border-white/10 pt-6">
                <Label>Feature Image URLs (Optional)</Label>
                <p className="text-xs text-white/50 mb-2">Add URLs separated by commas.</p>
                <Input {...register("featureImageUrls")} placeholder="https://..., https://..." className="bg-white/5 border-white/10 focus:border-cyan-500" />
            </div>
        </div>
    );
}
