
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function CopyStep() {
    const { register } = useFormContext();

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Transmission Content</h2>
                <p className="text-blue-200/70">Define the key messaging signals for the landing page.</p>
            </div>

            <div className="space-y-6 border-t border-white/10 pt-6">
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Hero Section</h3>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="heroHeadline" className="text-blue-300">Hero Headline</Label>
                            <Input
                                id="heroHeadline"
                                {...register("heroHeadline")}
                                placeholder="WE BUILD GORGEOUS WEBSITES"
                                className="text-lg md:text-xl font-bold bg-white/5 border-white/10 focus:border-blue-500 min-h-[50px]"
                            />
                            <p className="text-xs text-white/40">Use [brackets] for gradient text.</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="heroSubheadline">Sub-headline</Label>
                            <Input id="heroSubheadline" {...register("heroSubheadline")} placeholder="Elevating digital presence..." />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="ctaPrimary">Primary CTA</Label>
                                <Input id="ctaPrimary" {...register("ctaPrimary")} defaultValue="Start Your Project" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="ctaSecondary">Secondary CTA</Label>
                                <Input id="ctaSecondary" {...register("ctaSecondary")} defaultValue="View Our Work" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-2">Section Headlines (Optional)</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label>Features Headline</Label>
                            <Input {...register("featuresHeadline")} placeholder="Scientific Precision" />
                        </div>
                        <div className="space-y-2">
                            <Label>Pricing Headline</Label>
                            <Input {...register("pricingHeadline")} placeholder="Invest in ROI" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
