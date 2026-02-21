
import { z } from 'zod';

export const intakeSchema = z.object({
    // Phase 0: Discovery (Required)
    websiteUrl: z.string().url("Please enter a valid URL").min(1, "Website URL is required"),
    brandName: z.string().min(1, "Company Name is required"),

    // Phase 1: Logo & Branding (Optional)
    logoNavbarUrl: z.string().optional(),
    logoFooterUrl: z.string().optional(),
    faviconUrl: z.string().optional(),

    // Phase 2: Copy (Optional)
    heroHeadline: z.string().optional(),
    heroSubheadline: z.string().optional(),
    heroBadgeText: z.string().optional(),
    ctaPrimary: z.string().optional(),
    ctaSecondary: z.string().optional(),
    featuresHeadline: z.string().optional(),
    pricingHeadline: z.string().optional(),
    testimonialsHeadline: z.string().optional(),
    footerTagline: z.string().optional(),

    // Phase 3: Trusted Brands (Optional)
    trustedBrands: z.array(z.object({
        name: z.string(),
        logoUrl: z.string().optional()
    })).default([]).optional(),

    // Phase 4: Pricing (Optional)
    pricingTiers: z.array(z.object({
        name: z.string(),
        subtitle: z.string().optional(),
        price: z.string(),
        features: z.array(z.string()),
        isHighlighted: z.boolean().default(false)
    })).default([]).optional(),

    // Phase 5: Reviews (Optional)
    testimonials: z.array(z.object({
        name: z.string(),
        role: z.string().optional(),
        quote: z.string(),
        rating: z.number().min(1).max(5).default(5),
        avatarUrl: z.string().optional()
    })).default([]).optional(),

    // Phase 6: Colors (Optional)
    primaryColor: z.string().optional(), // e.g. #BFF549
    secondaryColor: z.string().optional(),
    backgroundColor: z.string().optional(), // e.g. #02040a
    mutedTextColor: z.string().optional(), // e.g. #99A1AF
    selectionHighlightColor: z.string().optional(),
    gradientStartColor: z.string().optional(),
    gradientMidColor: z.string().optional(),

    // Phase 7: Contact (New - Optional)
    email: z.string().email("Invalid email").optional().or(z.literal('')),
    phone: z.string().optional(),
    address: z.string().optional(),
    socialLinks: z.object({
        facebook: z.string().optional(),
        instagram: z.string().optional(),
        linkedin: z.string().optional(),
        twitter: z.string().optional(),
    }).optional(),

    // Phase 8: Blog (New - Optional)
    blogPosts: z.array(z.object({
        title: z.string(),
        excerpt: z.string().optional(),
        thumbnailUrl: z.string().optional()
    })).default([]).optional(),

    // Phase 9: About (New - Optional)
    companyStory: z.string().optional(),
    teamMembers: z.array(z.object({
        name: z.string(),
        role: z.string().optional(),
        bio: z.string().optional(),
        photoUrl: z.string().optional()
    })).default([]).optional(),

    // Phase 10: Images (New - Optional)
    heroImageUrl: z.string().optional(),
    featureImageUrls: z.array(z.string()).default([]).optional(),
    backgroundImageUrl: z.string().optional(),

    status: z.string().default("pending")
});

export type IntakeFormData = z.infer<typeof intakeSchema>;
