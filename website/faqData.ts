export interface FAQItem {
  id: string;
  question: string;
  briefAnswer: string;
  linkText: string;
  linkSlug: string;
  schemaAnswer: string;
  externalLink: {
    url: string;
    text: string;
    source: string;
  };
}

export const faqData: FAQItem[] = [
  {
    id: 'weekly-service-includes',
    question: 'What does a typical weekly pool cleaning visit include?',
    briefAnswer: 'Each visit covers chemical testing, surface skimming, equipment checks, and basket clearing by a trained, uniformed technician.',
    linkText: 'See the full breakdown of our weekly service',
    linkSlug: 'weekly-pool-cleaning-checklist-surprise-az',
    schemaAnswer: 'A typical weekly pool cleaning visit from My Blue Ducky includes chemical testing and balancing, surface skimming, brushing walls and floor, equipment inspection, and basket emptying. Our trained, uniformed technicians follow a consistent checklist every visit to keep your pool safe and swim-ready. The Deluxe package adds filter cleaning, salt cell inspection, priority dispatch, and a detailed digital service report after every visit.',
    externalLink: {
      url: 'https://www.cdc.gov/healthy-swimming/prevention/index.html',
      text: 'CDC Healthy Swimming guidelines',
      source: 'Centers for Disease Control and Prevention'
    }
  },
  {
    id: 'pool-maintenance-cost',
    question: 'How much should I expect to pay for pool maintenance in Surprise?',
    briefAnswer: 'Professional weekly service in the Surprise area starts at $119 per month for standard care.',
    linkText: 'Compare our pricing tiers',
    linkSlug: 'pool-maintenance-cost-surprise-az',
    schemaAnswer: 'Professional weekly pool maintenance in Surprise, AZ typically starts at $119 per month for standard service. My Blue Ducky offers two tiers: the Weekly plan at $119/month includes chemical balancing, equipment checks, surface skimming, and basket emptying. The Deluxe plan at $199/month adds filter cleaning, salt cell inspection, priority dispatch, and detailed digital reports. Pricing may vary based on pool size and condition.',
    externalLink: {
      url: 'https://www.bbb.org/us/az/surprise/profile/swimming-pool-service/my-blue-ducky-pool-service-1126-1000098498',
      text: 'My Blue Ducky BBB Business Profile',
      source: 'Better Business Bureau'
    }
  },
  {
    id: 'weekly-vs-biweekly',
    question: 'Do I really need weekly pool service in Arizona, or is biweekly enough?',
    briefAnswer: "Arizona's extreme heat accelerates algae growth and chemical burn-off, making weekly visits essential for safe water.",
    linkText: 'Learn why weekly service matters in desert climates',
    linkSlug: 'weekly-vs-biweekly-pool-service-arizona',
    schemaAnswer: "In Arizona's desert climate, weekly pool service is strongly recommended over biweekly. Summer temperatures regularly exceed 110°F, which accelerates chlorine burn-off and algae growth dramatically. Skipping even one week can allow algae to take hold, turning clear water green and requiring costly corrective treatments. Weekly visits ensure chemicals stay balanced, equipment runs properly, and small issues are caught before they become expensive repairs.",
    externalLink: {
      url: 'https://www.epa.gov/climate-indicators/climate-change-indicators-high-and-low-temperatures',
      text: 'EPA Climate Change Indicators for temperature trends',
      source: 'U.S. Environmental Protection Agency'
    }
  },
  {
    id: 'certifications-required',
    question: 'What certifications should a pool service company in Arizona have?',
    briefAnswer: 'Look for a valid ROC contractor license, CPO certification, and proof of liability insurance at minimum.',
    linkText: 'View our full credentials and licenses',
    linkSlug: 'pool-service-certifications-arizona',
    schemaAnswer: 'A reputable pool service company in Arizona should hold a valid ROC (Registrar of Contractors) license for swimming pool work, a CPO (Certified Pool Operator) certification from the National Swimming Pool Foundation, and carry liability insurance and bonding. My Blue Ducky holds ROC license 340026-KA (Dual Residential and Commercial Swimming Pool Contractor), CPO certification CPO-636009, and is fully bonded, insured, and BBB Accredited.',
    externalLink: {
      url: 'https://roc.az.gov/',
      text: 'Arizona Registrar of Contractors license lookup',
      source: 'Arizona Registrar of Contractors'
    }
  },
  {
    id: 'equipment-repairs',
    question: 'Can pool equipment repairs be done during a regular service visit?',
    briefAnswer: 'Minor repairs like O-ring replacements can happen same-visit; larger jobs are scheduled separately with priority for existing clients.',
    linkText: 'Explore our repair and installation services',
    linkSlug: 'pool-equipment-repair-surprise-az',
    schemaAnswer: 'Minor pool equipment repairs such as O-ring replacements, gasket swaps, and small adjustments can often be completed during a regular weekly service visit. Larger repairs — including pump replacement, filter overhauls, heater troubleshooting, and plumbing leak repairs — are scheduled separately to ensure proper parts and time are allocated. Existing My Blue Ducky service clients receive priority scheduling and preferred rates on all repair work.',
    externalLink: {
      url: 'https://www.energy.gov/energysaver/swimming-pool-heating',
      text: 'U.S. Department of Energy pool equipment efficiency guide',
      source: 'U.S. Department of Energy'
    }
  },
  {
    id: 'monsoon-season',
    question: 'What happens to my pool if I skip service during monsoon season?',
    briefAnswer: 'Monsoon debris, dust storms, and rain dilution can turn a clean pool green within days without proper chemical correction.',
    linkText: 'Read our monsoon pool care guide',
    linkSlug: 'monsoon-season-pool-care-arizona',
    schemaAnswer: "Arizona's monsoon season (June through September) brings dust storms, heavy rain, and windblown debris that rapidly impact pool water quality. A single haboob can dump pounds of fine dust into your pool, overwhelming the filtration system and disrupting chemical balance. Rain dilutes sanitizer levels while introducing phosphates and contaminants. Without prompt chemical correction and debris removal, algae can bloom within 24-48 hours, potentially requiring a costly drain-and-clean to restore.",
    externalLink: {
      url: 'https://www.weather.gov/psr/monsoon',
      text: 'National Weather Service Arizona monsoon overview',
      source: 'National Weather Service'
    }
  },
  {
    id: 'service-area',
    question: 'Does My Blue Ducky service pools in Sun City West and Peoria?',
    briefAnswer: 'Yes — we serve the entire West Valley including Surprise, Peoria, Sun City West, and surrounding communities.',
    linkText: 'See our full service area map',
    linkSlug: 'pool-service-area-west-valley-az',
    schemaAnswer: 'Yes, My Blue Ducky provides pool service throughout the greater Phoenix West Valley. Our service area includes Surprise, Peoria, Sun City West, Scottsdale, Paradise Valley, Fountain Hills, Cave Creek, and North Phoenix. We offer weekly maintenance, deluxe service packages, pool construction, remodeling, and equipment repair across all of these communities.',
    externalLink: {
      url: 'https://www.surpriseaz.gov/',
      text: 'City of Surprise, Arizona official website',
      source: 'City of Surprise'
    }
  },
  {
    id: 'switching-providers',
    question: 'How do I switch from my current pool service to a new provider?',
    briefAnswer: 'Switching is simple — contact us for a free quote and we handle the transition with zero downtime on your pool care.',
    linkText: 'Start your switch with a free consultation',
    linkSlug: 'switch-pool-service-provider-surprise-az',
    schemaAnswer: "Switching pool service providers is straightforward. Contact My Blue Ducky for a free, no-obligation quote — we'll assess your pool's current condition and recommend the right service plan. Once you decide to switch, simply notify your current provider and we coordinate the timing so there's no gap in service. We perform a thorough initial inspection and chemical rebalancing on our first visit to establish a clean baseline. Call (623)-707-5938 or fill out our online contact form to get started.",
    externalLink: {
      url: 'https://www.ftc.gov/business-guidance/resources/consumer-review-fairness-act-what-businesses-need-know',
      text: 'FTC guide on choosing service providers and reading reviews',
      source: 'Federal Trade Commission'
    }
  }
];
