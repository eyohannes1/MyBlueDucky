
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function ContactStep() {
    const { register } = useFormContext();

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">Contact Information</h2>
                <p className="text-muted-foreground">How customers can reach the business.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" {...register("email")} placeholder="contact@company.com" className="bg-white/5 border-white/10 focus:border-purple-500 transition-colors" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" {...register("phone")} placeholder="(555) 123-4567" className="bg-white/5 border-white/10 focus:border-purple-500 transition-colors" />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="address">Physical Address</Label>
                <Input id="address" {...register("address")} placeholder="123 Galaxy Way, Tech City" className="bg-white/5 border-white/10 focus:border-purple-500 transition-colors" />
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
                <h3 className="text-lg font-semibold text-purple-200">Social Media</h3>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="facebook">Facebook URL</Label>
                        <Input id="facebook" {...register("socialLinks.facebook")} placeholder="facebook.com/..." className="bg-white/5 border-white/10 focus:border-purple-500 transition-colors" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="instagram">Instagram URL</Label>
                        <Input id="instagram" {...register("socialLinks.instagram")} placeholder="instagram.com/..." className="bg-white/5 border-white/10 focus:border-purple-500 transition-colors" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn URL</Label>
                        <Input id="linkedin" {...register("socialLinks.linkedin")} placeholder="linkedin.com/in/..." className="bg-white/5 border-white/10 focus:border-purple-500 transition-colors" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="twitter">Twitter / X URL</Label>
                        <Input id="twitter" {...register("socialLinks.twitter")} placeholder="twitter.com/..." className="bg-white/5 border-white/10 focus:border-purple-500 transition-colors" />
                    </div>
                </div>
            </div>
        </div>
    );
}
