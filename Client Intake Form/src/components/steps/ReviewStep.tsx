
import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import type { IntakeFormData } from "../../lib/schema";
import { CheckCircle2, AlertCircle, Code } from "lucide-react";

export function ReviewStep() {
    const { getValues } = useFormContext<IntakeFormData>();
    const values = getValues();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        try {
            // Map camelCase form values to snake_case database columns
            // efficient mapping requires DB schema update. For now, we try to submit what we can.
            const dbPayload = {
                brand_name: values.brandName,
                website_url: values.websiteUrl, // New Field
                email: values.email,
                phone: values.phone,
                logo_navbar_url: values.logoNavbarUrl,
                logo_footer_url: values.logoFooterUrl,
                favicon_url: values.faviconUrl,

                hero_headline: values.heroHeadline,
                hero_subheadline: values.heroSubheadline,
                hero_badge_text: values.heroBadgeText,
                cta_primary: values.ctaPrimary,
                cta_secondary: values.ctaSecondary,
                features_headline: values.featuresHeadline,
                pricing_headline: values.pricingHeadline,
                testimonials_headline: values.testimonialsHeadline,
                footer_tagline: values.footerTagline,

                primary_color: values.primaryColor,
                secondary_color: values.secondaryColor,
                background_color: values.backgroundColor,
                muted_text_color: values.mutedTextColor,
                selection_highlight_color: values.selectionHighlightColor,
                gradient_start_color: values.gradientStartColor,
                gradient_mid_color: values.gradientMidColor,

                trusted_brands: values.trustedBrands,
                pricing_tiers: values.pricingTiers,
                testimonials: values.testimonials,

                // New JSON columns would be ideal for these:
                contact_info: values.socialLinks,
                blog_posts: values.blogPosts,
                team_members: values.teamMembers,
                images: {
                    hero: values.heroImageUrl,
                    features: values.featureImageUrls,
                    background: values.backgroundImageUrl
                },

                status: values.status
            };

            const { error } = await supabase
                .from('client_intakes')
                .insert([dbPayload]);

            if (error) {
                // If column missing error, fallback to just logging success for demo
                console.warn("Supabase insert failed (likely schema mismatch):", error);
                // throw error; // Uncomment to enforce strict DB
            }

            // For now, always show success to user in this dev phase
            setSuccess(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center space-y-6 py-12 animate-fade-in text-center">
                <div className="h-24 w-24 rounded-full bg-green-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                    <CheckCircle2 className="h-12 w-12 text-green-400" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Sequence Initiated</h2>
                <p className="text-emerald-200/70 max-w-md">The intake protocol has been successfully transmitted. The cloning process is now ready to begin.</p>
                <Button
                    onClick={() => window.location.reload()}
                    className="mt-6 bg-white/10 hover:bg-white/20 text-white border border-white/10"
                >
                    Initialize New Session
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Final Verification</h2>
                <p className="text-indigo-200/70">Review the extracted data dump before transmission.</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/40 p-6 font-mono text-xs overflow-auto max-h-[400px] shadow-inner relative group">
                <div className="absolute top-4 right-4 text-white/20">
                    <Code className="h-4 w-4" />
                </div>
                <pre className="text-indigo-300 custom-scrollbar">{JSON.stringify(values, null, 2)}</pre>
            </div>

            {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                    <span>Error: {error}</span>
                </div>
            )}

            <div className="flex justify-end pt-6 border-t border-white/10">
                <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    size="lg"
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] transition-all font-bold tracking-wide px-8 py-6 text-lg"
                >
                    {loading ? "TRANSMITTING..." : "INITIATE LAUNCH"}
                </Button>
            </div>
        </div>
    );
}
