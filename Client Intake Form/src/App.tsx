
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Rocket,
  Palette,
  FileText,
  Building2,
  DollarSign,
  MessageSquare,
  Users,
  Image as ImageIcon,
  PenTool,
  CheckCircle,
  Megaphone
} from "lucide-react";

import { intakeSchema } from "./lib/schema";
import type { IntakeFormData } from "./lib/schema";
import { WizardLayout } from "./components/WizardLayout";

import { BasicsStep } from "./components/steps/BasicsStep";
import { CopyStep } from "./components/steps/CopyStep";
import { TrustedBrandsStep } from "./components/steps/TrustedBrandsStep";
import { PricingStep } from "./components/steps/PricingStep";
import { ReviewsStep } from "./components/steps/ReviewsStep";
import { ColorsStep } from "./components/steps/ColorsStep";
import { ContactStep } from "./components/steps/ContactStep";
import { BlogStep } from "./components/steps/BlogStep";
import { AboutStep } from "./components/steps/AboutStep";
import { ImagesStep } from "./components/steps/ImagesStep";
import { ReviewStep } from "./components/steps/ReviewStep";
import { Button } from "./components/ui/button";

const STEPS = [
  { id: "basics", title: "Basics", icon: Rocket, component: BasicsStep },
  { id: "colors", title: "Colors", icon: Palette, component: ColorsStep },
  { id: "images", title: "Images", icon: ImageIcon, component: ImagesStep },
  { id: "copy", title: "Copy", icon: FileText, component: CopyStep },
  { id: "brands", title: "Brands", icon: Building2, component: TrustedBrandsStep },
  { id: "pricing", title: "Pricing", icon: DollarSign, component: PricingStep },
  { id: "reviews", title: "Reviews", icon: MessageSquare, component: ReviewsStep },
  { id: "contact", title: "Contact", icon: Megaphone, component: ContactStep },
  { id: "blog", title: "Blog", icon: PenTool, component: BlogStep },
  { id: "about", title: "About", icon: Users, component: AboutStep },
  { id: "review", title: "Finish", icon: CheckCircle, component: ReviewStep },
];

function App() {
  const [currentStep, setCurrentStep] = useState(0);

  const methods = useForm<IntakeFormData>({
    resolver: zodResolver(intakeSchema) as any,
    defaultValues: {
      websiteUrl: "",
      brandName: "",
      trustedBrands: [],
      pricingTiers: [
        { name: "Starter", price: "$499", features: ["Basic Features"], isHighlighted: false },
        { name: "Growth", price: "$999", features: ["Advanced Features"], isHighlighted: true },
        { name: "Enterprise", price: "Custom", features: ["All Features"], isHighlighted: false }
      ],
      testimonials: [],
      primaryColor: "#BFF549",
      backgroundColor: "#02040a",
      mutedTextColor: "#99A1AF",
      blogPosts: [],
      teamMembers: [],
      featureImageUrls: []
    },
    mode: "onChange"
  });

  // Watch for validation errors to block next step if needed
  const { trigger, formState: { errors } } = methods;

  const nextStep = async () => {
    // Only block on first step (Basics) if required fields are missing
    if (currentStep === 0) {
      const isValid = await trigger(["websiteUrl", "brandName"]);
      if (!isValid) return;
    }

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const CurrentComponent = STEPS[currentStep].component;

  return (
    <div className="min-h-screen galaxy-bg text-white font-sans selection:bg-purple-500/30">
      <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-purple-900/20 to-black pointer-events-none" />

      <FormProvider {...methods}>
        <WizardLayout
          steps={STEPS}
          currentStepIndex={currentStep}
          onStepClick={setCurrentStep}
        >
          <div className="mb-8 flex justify-between items-end border-b border-white/10 pb-4">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                Client Intake Form
              </h1>
              <p className="text-sm text-indigo-300/60 mt-2 font-mono uppercase tracking-widest">
                Step {currentStep + 1} of {STEPS.length}
              </p>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-[0_0_50px_-12px_rgba(79,70,229,0.2)] min-h-[500px] relative overflow-hidden">
            {/* Subtle inner glow */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />

            <CurrentComponent />
          </div>

          <div className="mt-8 flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="border-white/10 bg-white/5 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all font-mono"
            >
              &lt; PREVIOUS STEP
            </Button>

            {currentStep < STEPS.length - 1 ? (
              <Button
                onClick={nextStep}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] transition-all font-bold tracking-wide"
              >
                NEXT PHASE &gt;
              </Button>
            ) : null}
          </div>

        </WizardLayout>
      </FormProvider>
    </div>
  );
}

export default App;
