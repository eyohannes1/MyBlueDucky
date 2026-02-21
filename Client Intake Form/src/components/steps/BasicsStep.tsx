
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function BasicsStep() {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Start Your Journey</h2>
                <p className="text-purple-200/70">Enter the core details to initiate the cloning process.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="websiteUrl" className="text-purple-300">Target Website URL <span className="text-red-400">*</span></Label>
                    <Input
                        id="websiteUrl"
                        {...register("websiteUrl")}
                        placeholder="https://example.com"
                        className="bg-purple-950/20 border-purple-500/30 focus:border-purple-400 text-lg py-6 shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all"
                    />
                    {errors.websiteUrl && <p className="text-sm text-red-400 animate-pulse">{errors.websiteUrl.message as string}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="brandName">Company Name <span className="text-red-400">*</span></Label>
                    <Input id="brandName" {...register("brandName")} placeholder="e.g. Orbit Tech" className="bg-white/5 border-white/10 focus:border-pink-500" />
                    {errors.brandName && <p className="text-sm text-red-400">{errors.brandName.message as string}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email Address (Optional)</Label>
                    <Input id="email" {...register("email")} placeholder="contact@orbit.com" className="bg-white/5 border-white/10 focus:border-pink-500" />
                </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/10">
                <h3 className="text-lg font-semibold text-pink-200">Branding Assets (Optional)</h3>

                <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                        <Label htmlFor="logoNavbarUrl" className="text-xs text-white/60">Navbar Logo</Label>
                        <Input id="logoNavbarUrl" {...register("logoNavbarUrl")} placeholder="https://..." className="bg-white/5 border-white/10 text-xs h-8" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="logoFooterUrl" className="text-xs text-white/60">Footer Logo</Label>
                        <Input id="logoFooterUrl" {...register("logoFooterUrl")} placeholder="https://..." className="bg-white/5 border-white/10 text-xs h-8" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="faviconUrl" className="text-xs text-white/60">Favicon</Label>
                        <Input id="faviconUrl" {...register("faviconUrl")} placeholder="https://..." className="bg-white/5 border-white/10 text-xs h-8" />
                    </div>
                </div>
            </div>
        </div>
    );
}
