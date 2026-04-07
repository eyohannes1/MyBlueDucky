import React, { useState, useEffect } from 'react';
import { Menu, X, Star, ShieldCheck, Award, ArrowRight, Droplets, Wrench, Hammer, Phone, Moon, Sun, CheckCircle2, AlertCircle, ChevronRight, ChevronDown, Building2, ExternalLink } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import ReactMarkdown from 'react-markdown';
import { blogPosts, BlogPost } from './blogPosts';
import { faqData } from './faqData';

// --- Reusable UI Components ---

const RevealText = ({ children, className = "", delay = 0, key }: { children?: React.ReactNode, className?: string, delay?: number, key?: React.Key }) => {
  return (
    <div key={key} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const FadeIn = ({ children, className = "", delay = 0, key }: { children?: React.ReactNode, className?: string, delay?: number, key?: React.Key }) => {
  return (
    <motion.div
      key={key}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
};

const ScrollRevealImage = ({ src, alt, className = "" }: { src: string, alt: string, className?: string }) => {
  return (
    <div className={`overflow-hidden relative bg-secondary-light dark:bg-secondary-dark ${className}`}>
      <motion.img
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.08 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{
          scale: { duration: 1.2, ease: [0.19, 1, 0.22, 1] },
          opacity: { duration: 0.8, ease: "linear" },
          default: { duration: 0.6, ease: "easeOut" }
        }}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out"
      />
      <div className="absolute inset-0 bg-primary/5 mix-blend-multiply opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};

const Logo = ({ className = "" }: { className?: string }) => (
  <img src="/assets/images/logo.png" alt="My Blue Ducky Logo" className={`${className} object-contain`} />
);

// --- Page Sections ---

const Header = ({ isDark, setIsDark, currentPage, setCurrentPage, setTargetServiceId }: { isDark: boolean, setIsDark: (v: boolean) => void, currentPage: string, setCurrentPage: (p: string) => void, setTargetServiceId: (id: string | null) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (page: string) => {
    setCurrentPage(page);
    setTargetServiceId(null);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 dark:bg-black/95 backdrop-blur-md py-2 border-b border-gray-100 dark:border-gray-900 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" onClick={(e) => { e.preventDefault(); handleNav('home'); }} className="z-50 relative group">
            <Logo className={`h-16 w-auto transition-colors duration-300 ${scrolled || isOpen ? 'text-primary' : 'text-white'}`} />
          </a>

          <div className="flex items-center gap-4 md:gap-8">
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-full transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${scrolled || isOpen ? 'text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800' : 'text-white hover:bg-white/10'}`}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              aria-pressed={isDark}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`z-50 relative flex items-center gap-2 font-montserrat font-medium text-sm tracking-widest uppercase cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${scrolled || isOpen ? 'text-black dark:text-white' : 'text-white'}`}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
            >
              <span className="hidden sm:inline">{isOpen ? 'Close' : 'Menu'}</span>
              <div className="relative w-6 h-6">
                <AnimatePresence mode='wait'>
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      className="absolute inset-0"
                    >
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                      className="absolute inset-0"
                    >
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 bg-white dark:bg-black z-40 flex flex-col justify-center items-center"
          >
            <nav className="flex flex-col gap-8 text-center">
              {['Home', 'Services', 'About', 'Blog', 'FAQ', 'Contact'].map((item, i) => (
                <motion.button
                  key={item}
                  onClick={() => {
                    if (item === 'Contact' || item === 'FAQ') {
                      setIsOpen(false);
                      if (currentPage !== 'home') {
                        setCurrentPage('home');
                        setTimeout(() => {
                          const section = document.getElementById(item.toLowerCase());
                          if (section) section.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      } else {
                        const section = document.getElementById(item.toLowerCase());
                        if (section) section.scrollIntoView({ behavior: 'smooth' });
                      }
                    } else {
                      handleNav(item.toLowerCase());
                    }
                  }}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  className={`font-playfair text-5xl md:text-7xl hover:text-primary transition-colors duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${currentPage === item.toLowerCase() ? 'text-primary' : 'text-black dark:text-white'}`}
                  aria-label={`Navigate to ${item} page`}
                  aria-current={currentPage === item.toLowerCase() ? 'page' : undefined}
                >
                  {item}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const HomeHero = ({ setCurrentPage }: { setCurrentPage: (p: string) => void }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <img
          src="/assets/images/hero_pool_deck.webp"
          alt="Luxury pool deck at sunset"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover brightness-[0.5]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 text-center text-white pt-16">
        <RevealText className="mb-6">
          <span className="font-cormorant text-xl md:text-2xl italic tracking-wider text-white/90">
            Licensed • Bonded • Insured
          </span>
        </RevealText>

        <RevealText delay={0.1}>
          <h1 className="font-playfair text-4xl md:text-6xl lg:text-8xl mb-8 leading-none">
            Designed. Built.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
              Maintained. Perfected.
            </span>
          </h1>
        </RevealText>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
          className="w-24 h-2 bg-primary mx-auto mt-4 mb-6"
        />

        <FadeIn delay={0.5} className="max-w-xl mx-auto flex justify-center flex-col items-center">
          <p className="font-montserrat font-light text-lg md:text-xl leading-relaxed mb-6 text-white/80">
            Premium care for the modern aquatic lifestyle. We bring clarity and architectural sophistication to your backyard sanctuary.
          </p>
          <button
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-block bg-primary text-white border border-primary px-10 py-5 font-montserrat text-sm tracking-widest uppercase hover:bg-transparent hover:text-white transition-all duration-300 shadow-2xl shadow-primary/20 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            aria-label="Get your free pool service quote"
          >
            GET YOUR FREE QUOTE
          </button>
        </FadeIn>
      </div>

      <motion.div
        className="absolute bottom-10 left-0 w-full flex justify-center pointer-events-none"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="font-cormorant italic text-lg text-white/40">Scroll to explore</span>
      </motion.div>
    </section>
  );
};

const PageHero = ({ title, subtitle, src }: { title: string, subtitle: string, src: string }) => {
  return (
    <section className="relative h-[50vh] w-full overflow-hidden flex items-center justify-center bg-black">
      <div className="absolute inset-0 z-0">
        <img
          src={src}
          alt={title}
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover opacity-80"
          style={{ imageRendering: 'auto' }} // auto uses default smooth scaling
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        {/* Subtle noise/pattern overlay to mask potential pixelation */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay pointer-events-none" />
      </div>
      <div className="relative z-10 text-center text-white px-6 mt-10">
        <RevealText>
          <h1 className="font-playfair text-5xl md:text-7xl mb-6 drop-shadow-lg">{title}</h1>
        </RevealText>
        <FadeIn delay={0.2}>
          <p className="font-montserrat text-lg md:text-xl font-light text-white/90 max-w-2xl mx-auto drop-shadow-md">{subtitle}</p>
        </FadeIn>
      </div>
    </section>
  );
};

const HomeFeatures = ({ setCurrentPage, setTargetServiceId }: { setCurrentPage: (p: string) => void, setTargetServiceId: (id: string | null) => void }) => {
  const features = [
    {
      title: "Pool Construction",
      desc: "Custom pool construction tailored to your vision. From design to completion, we build your dream backyard oasis.",
      icon: <Building2 className="w-8 h-8 text-primary" />,
      img: "/assets/images/pool-construction-image.webp",
      targetId: "pool-construction"
    },
    {
      title: "Pool Remodeling",
      desc: "Transform your existing pool with modern upgrades, new finishes, and enhanced features.",
      icon: <Hammer className="w-8 h-8 text-primary" />,
      img: "/assets/images/luxury_backyard_pool_1771469141679.webp",
      targetId: "pool-remodel"
    },
    {
      title: "Weekly Pool Service",
      desc: "Starting at $119/mo. Professional weekly pool service with uniformed and trained technicians.",
      icon: <Droplets className="w-8 h-8 text-primary" />,
      img: "/assets/images/technician_skimming_pool_1771469105393.webp",
      targetId: "weekly-service"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-white dark:bg-black transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 border-b border-gray-100 dark:border-gray-900 pb-8">
          <div className="max-w-2xl">
            <RevealText>
              <h2 className="font-playfair text-5xl md:text-6xl mb-4 dark:text-white">Professional Services</h2>
            </RevealText>
            <FadeIn delay={0.2}>
              <p className="font-montserrat font-light text-gray-500 dark:text-gray-400 text-lg">
                Delivering excellence through meticulous craftsmanship and deep technical expertise.
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.3} className="hidden md:block">
            <span className="font-cormorant text-2xl italic text-primary">Precision Care Since 2020</span>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((item, idx) => (
            <div key={idx} onClick={() => { setTargetServiceId(item.targetId); setCurrentPage('services'); window.scrollTo(0, 0); }} className="group cursor-pointer">
              <div className="mb-8 aspect-[4/5] w-full">
                <ScrollRevealImage src={item.img} alt={item.title} className="w-full h-full rounded-sm" />
              </div>
              <div className="flex items-start justify-between border-t border-gray-100 dark:border-gray-900 pt-6 group-hover:border-primary transition-colors duration-500">
                <div>
                  <h3 className="font-playfair text-2xl md:text-3xl mb-3 dark:text-white group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="font-montserrat text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">{item.desc}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                  <ArrowRight className="text-primary" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  return (
    <section className="py-20 bg-secondary-light dark:bg-secondary-dark border-y border-gray-100 dark:border-gray-900 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-10 md:gap-12 opacity-40 dark:opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
          <div className="flex items-center gap-3">
            <ShieldCheck size={40} className="text-primary" />
            <div className="flex flex-col">
              <span className="font-playfair text-xl dark:text-white">Licensed & Insured</span>
              <span className="text-[10px] font-montserrat uppercase tracking-[0.2em] dark:text-gray-400">Security & Peace of Mind</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} className="fill-primary text-primary" />)}
            </div>
            <div className="flex flex-col">
              <span className="font-playfair text-xl dark:text-white">4.5 Google Rating</span>
              <span className="text-[10px] font-montserrat uppercase tracking-[0.2em] dark:text-gray-400">Based on 120+ Verifications</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Award size={40} className="text-primary" />
            <div className="flex flex-col">
              <span className="font-playfair text-xl dark:text-white">Master Technicians</span>
              <span className="text-[10px] font-montserrat uppercase tracking-[0.2em] dark:text-gray-400">NSPF Certified Professionals</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 size={40} className="text-primary" />
            <div className="flex flex-col">
              <span className="font-playfair text-xl dark:text-white">CPO Certified</span>
              <span className="text-[10px] font-montserrat uppercase tracking-[0.2em] dark:text-gray-400">Certified Pool Operator</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Building2 size={40} className="text-primary" />
            <div className="flex flex-col">
              <span className="font-playfair text-xl dark:text-white">Better Business Bureau®</span>
              <span className="text-[10px] font-montserrat uppercase tracking-[0.2em] dark:text-gray-400">Accredited Business</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const EditorialHighlight = () => {
  return (
    <section className="py-24 md:py-32 bg-white dark:bg-black transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="order-2 lg:order-1">
            <RevealText>
              <span className="font-cormorant text-2xl text-primary italic block mb-4">Built on Trust & Expertise</span>
            </RevealText>
            <RevealText delay={0.1}>
              <h2 className="font-playfair text-4xl md:text-5xl lg:text-7xl mb-8 leading-[1.1] dark:text-white">
                We don't just clean pools. <br /> We protect your <span className="text-primary italic">oasis.</span>
              </h2>
            </RevealText>
            <FadeIn delay={0.3}>
              <div className="font-montserrat font-light text-gray-600 dark:text-gray-400 text-lg space-y-6 leading-relaxed">
                <p>
                  Dave Gabhart is no stranger to the pool industry, having begun his journey the day after graduating high school in 2005. From grunt labor to mastering remodels and new builds, he has dedicated his career to aquatic excellence.
                </p>
                <p>
                  My Blue Ducky was born from a need for reliable weekly pool care. Today, Dave leads a trustworthy team providing resources for all aspects of pool care, building, remodeling, and maintenance throughout the Valley.
                </p>
              </div>
              <div className="mt-10">
                <a href="#about" className="group inline-flex items-center gap-2 text-primary font-montserrat font-bold text-sm tracking-widest uppercase pb-1 border-b-2 border-primary/20 hover:border-primary transition-all">
                  Explore Our Process <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </FadeIn>
          </div>
          <div className="order-1 lg:order-2 relative group">
            <div className="aspect-[4/5] relative z-10 shadow-2xl">
              <ScrollRevealImage src="https://images.unsplash.com/photo-1473116763249-2faaef81ccda?q=80&w=2072&auto=format&fit=crop" alt="Sparkling backyard pool in Surprise, AZ maintained by My Blue Ducky technicians" className="rounded-sm" />
            </div>
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1 }}
              className="absolute -bottom-10 -left-10 w-2/3 aspect-[4/3] z-20 hidden md:block border-[12px] border-white dark:border-gray-900 shadow-2xl overflow-hidden"
            >
              <ScrollRevealImage src="https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=2070&auto=format&fit=crop" alt="Crystal-clear pool water after professional chemical balancing service in Phoenix Valley" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    {
      text: "Love the visual technology used so that I can see what was put in my pool every visit. Very professional and timely! Would recommend.",
      author: "Michelle and Tremayne Peckham",
      loc: "The Meadows, AZ"
    },
    {
      text: "Dave and his crew are informative, professional, polite and, best of all, keep our pool in top form...a great company to deal with!",
      author: "Susan and Craig Boyce",
      loc: "Vistancia, AZ"
    },
    {
      text: "It was our lucky day when we met Dave. He offered to come out and show us how all the equipment worked. He spent a few hours with us.",
      author: "Margie Roth",
      loc: "Sun City Festival, AZ"
    }
  ];

  return (
    <section className="py-24 bg-primary text-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
          <div className="md:col-span-2 lg:col-span-3 text-center mb-10">
            <span className="font-cormorant text-3xl italic opacity-80 mb-6 block">Refinement in Every Drop</span>
            <h2 className="font-playfair text-5xl md:text-6xl lg:text-7xl mb-8 leading-tight">Elite service for elite properties.</h2>
          </div>
          <div className="contents">
            {reviews.map((r, i) => (
              <FadeIn key={i} delay={i * 0.2} className="border-l-2 border-white/20 pl-6 h-full flex flex-col justify-between">
                <p className="font-playfair text-xl md:text-2xl leading-relaxed mb-6 font-light italic">"{r.text}"</p>
                <div>
                  <div className="font-montserrat font-bold uppercase tracking-[0.2em] text-xs mb-1">{r.author}</div>
                  <div className="font-cormorant italic text-lg opacity-70">{r.loc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
      {/* Dynamic Background Element */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-1/2 -right-1/4 w-full h-full bg-white/5 rounded-full blur-[120px] pointer-events-none"
      />
    </section>
  );
};

const galleryItems = [
  { id: 1, title: "Crystal Clear", desc: "Pristine water, every time.", url: "/gallery/IMG_0193.webp", span: "md:col-span-2 md:row-span-2" },
  { id: 2, title: "Tile & Stone", desc: "Detail-oriented care.", url: "/gallery/IMG_0181.webp", span: "md:row-span-1" },
  { id: 3, title: "Equipment Check", desc: "Keeping systems running.", url: "/gallery/IMG_0187.webp", span: "md:row-span-1" },
  { id: 4, title: "Surface Finish", desc: "Polished to perfection.", url: "/gallery/IMG_0277.webp", span: "md:row-span-2" },
  { id: 5, title: "Water Chemistry", desc: "Balanced for safety.", url: "/gallery/IMG_4128.webp", span: "md:row-span-1" },
  { id: 6, title: "Full Service", desc: "End-to-end pool care.", url: "/gallery/IMG_4150.webp", span: "md:col-span-2 md:row-span-1" },
  { id: 7, title: "Filter Maintenance", desc: "Clean filters, clean water.", url: "/gallery/IMG_7339.webp", span: "md:row-span-1" },
  { id: 8, title: "Evening Glow", desc: "Beautiful at any hour.", url: "/gallery/IMG_7568.webp", span: "md:row-span-2" },
  { id: 9, title: "Deck & Surround", desc: "The full picture.", url: "/gallery/IMG_0565.webp", span: "md:col-span-2 md:row-span-1" },
  { id: 10, title: "Sparkling Blue", desc: "Inviting and refreshing.", url: "/gallery/IMG_0244.webp", span: "md:row-span-1" },
  { id: 11, title: "Pool Perfection", desc: "Ready for a swim.", url: "/gallery/IMG_0288.webp", span: "md:row-span-2" },
  { id: 12, title: "Desert Oasis", desc: "Your backyard retreat.", url: "/gallery/IMG_4228.webp", span: "md:row-span-1" },
  { id: 13, title: "Weekly Service", desc: "Consistent quality care.", url: "/gallery/IMG_0399.webp", span: "md:col-span-2 md:row-span-1" },
  { id: 14, title: "Skimmer Detail", desc: "No debris left behind.", url: "/gallery/IMG_7693.webp", span: "md:row-span-1" },
  { id: 15, title: "Pristine Finish", desc: "Spotless every visit.", url: "/gallery/IMG_7481.webp", span: "md:row-span-2" },
  { id: 16, title: "Before & After", desc: "Transformations that speak.", url: "/gallery/IMG_0160.webp", span: "md:row-span-1" },
  { id: 17, title: "Poolside Living", desc: "Arizona living at its best.", url: "/gallery/IMG_6361.webp", span: "md:col-span-2 md:row-span-1" },
  { id: 18, title: "Deep Clean", desc: "Thorough and reliable.", url: "/gallery/IMG_3468.webp", span: "md:row-span-1" },
  { id: 19, title: "Water Feature", desc: "Every detail matters.", url: "/gallery/IMG_0292.webp", span: "md:row-span-2" },
  { id: 20, title: "Morning Calm", desc: "Peace of mind, guaranteed.", url: "/gallery/IMG_0176.webp", span: "md:row-span-1" },
  { id: 21, title: "Equipment Room", desc: "Professional-grade systems.", url: "/gallery/IMG_4109.webp", span: "md:col-span-2 md:row-span-1" },
  { id: 22, title: "Happy Client", desc: "Another pool, another smile.", url: "/gallery/IMG_0425.webp", span: "md:row-span-1" },
];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);
  const [dragConstraint, setDragConstraint] = useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const gridRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calc = () => {
      if (gridRef.current && containerRef.current) {
        const cw = containerRef.current.offsetWidth;
        const gw = gridRef.current.scrollWidth;
        setDragConstraint(Math.min(0, cw - gw - 32));
      }
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return (
    <section className="py-24 bg-white dark:bg-gray-950 transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-6 text-center mb-12">
        <RevealText>
          <span className="font-cormorant text-2xl text-primary italic block mb-4">Gallery</span>
        </RevealText>
        <RevealText delay={0.1}>
          <h2 className="font-playfair text-4xl md:text-5xl dark:text-white">Our Work</h2>
        </RevealText>
        <FadeIn delay={0.2}>
          <p className="font-montserrat text-sm text-gray-500 dark:text-gray-400 mt-4 max-w-2xl mx-auto leading-relaxed">
            Real results from real pools across the Valley. Drag to explore, click to expand.
          </p>
        </FadeIn>
      </div>

      <div ref={containerRef} className="relative w-full cursor-grab active:cursor-grabbing">
        <motion.div
          className="w-max"
          drag="x"
          dragConstraints={{ left: dragConstraint, right: 0 }}
          dragElastic={0.05}
        >
          <motion.div
            ref={gridRef}
            className="grid auto-cols-[minmax(15rem,1fr)] grid-flow-col gap-4 px-4 md:px-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {galleryItems.map((item) => (
              <motion.div
                key={item.id}
                variants={{ hidden: { opacity: 0, y: 20, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } } }}
                className={`group relative flex h-full min-h-[15rem] w-full min-w-[15rem] cursor-pointer items-end overflow-hidden rounded-xl p-4 shadow-sm transition-shadow duration-300 hover:shadow-lg ${item.span}`}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => setSelectedImage(item)}
                onKeyDown={(e) => e.key === "Enter" && setSelectedImage(item)}
                tabIndex={0}
                aria-label={`View ${item.title}`}
              >
                <img src={item.url} alt={item.title} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <h3 className="font-playfair text-lg font-bold text-white">{item.title}</h3>
                  <p className="font-montserrat mt-1 text-sm text-white/80">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedImage.url} alt={selectedImage.title} decoding="async" className="h-auto max-h-[90vh] w-full rounded-lg object-contain" />
            </motion.div>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 text-white/80 transition-colors hover:text-white"
              aria-label="Close image view"
            >
              <X size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const BlogSection = ({ setCurrentPage, setSelectedPostId }: { setCurrentPage: (p: string) => void, setSelectedPostId: (id: string) => void }) => {
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-24 bg-gray-50 dark:bg-black/50 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-2">
          <div className="max-w-2xl">
            <RevealText>
              <span className="font-cormorant text-2xl text-primary italic block mb-4">Expert Insights</span>
            </RevealText>
            <RevealText delay={0.1}>
              <h2 className="font-playfair text-4xl md:text-5xl mb-4 dark:text-white">Pool Tips & Trends</h2>
            </RevealText>
          </div>
          <FadeIn delay={0.2} className="hidden md:block">
            <button
              onClick={() => { setCurrentPage('blog'); window.scrollTo(0, 0); }}
              className="group flex items-center gap-2 font-montserrat font-bold text-xs tracking-widest uppercase text-primary hover:text-primary/80 transition-colors"
            >
              View All Articles <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {recentPosts.map((post, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <div
                onClick={() => { setSelectedPostId(post.id); setCurrentPage('blog-post'); window.scrollTo(0, 0); }}
                className="cursor-pointer group block h-full bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl transition-all duration-300 rounded-sm overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={post.image} alt={post.title} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="font-montserrat text-xs font-bold uppercase tracking-widest text-primary mb-4">{post.date}</div>
                  <h3 className="font-playfair text-xl mb-4 dark:text-white group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h3>
                  <p className="font-montserrat text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3 mb-6 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 font-montserrat text-xs font-bold uppercase tracking-widest text-black dark:text-white group-hover:text-primary transition-colors">
                    Read Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <button
            onClick={() => { setCurrentPage('blog'); window.scrollTo(0, 0); }}
            className="inline-flex items-center gap-2 font-montserrat font-bold text-xs tracking-widest uppercase text-primary hover:text-primary/80 transition-colors"
          >
            View All Articles <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Refs for address input fields
  const addressInputRef = React.useRef<HTMLInputElement>(null);
  const cityInputRef = React.useRef<HTMLInputElement>(null);
  const stateInputRef = React.useRef<HTMLInputElement>(null);
  const zipInputRef = React.useRef<HTMLInputElement>(null);

  // State for address fields
  const [addressFields, setAddressFields] = useState({
    street: '',
    city: '',
    state: '',
    zip: ''
  });

  // Initialize Google Maps Autocomplete
  useEffect(() => {
    const initAutocomplete = () => {
      if (!addressInputRef.current || !window.google?.maps?.places) return;

      try {
        const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current, {
          types: ['address'],
          componentRestrictions: { country: 'us' }
        });

        // Listen for place selection
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();

          if (!place.address_components) return;

          // Extract address components
          let street = '';
          let city = '';
          let state = '';
          let zip = '';

          place.address_components.forEach((component) => {
            const types = component.types;

            if (types.includes('street_number')) {
              street = component.long_name + ' ';
            }
            if (types.includes('route')) {
              street += component.long_name;
            }
            if (types.includes('locality')) {
              city = component.long_name;
            }
            if (types.includes('administrative_area_level_1')) {
              state = component.short_name;
            }
            if (types.includes('postal_code')) {
              zip = component.long_name;
            }
          });

          // Update state and input fields
          setAddressFields({ street, city, state, zip });

          if (addressInputRef.current) addressInputRef.current.value = street;
          if (cityInputRef.current) cityInputRef.current.value = city;
          if (stateInputRef.current) stateInputRef.current.value = state;
          if (zipInputRef.current) zipInputRef.current.value = zip;
        });
      } catch (error) {
        console.error("Error initializing Google Maps Autocomplete:", error);
      }
    };

    // Dynamically load Google Maps script if not present
    const loadGoogleMapsScript = () => {
      if (window.google?.maps?.places) {
        initAutocomplete();
        return;
      }

      const existingScript = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');
      if (existingScript) {
        existingScript.addEventListener('load', initAutocomplete);
        return;
      }

      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      if (!apiKey) {
        console.warn('Google Maps API key not found in environment variables');
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initAutocomplete;
      document.head.appendChild(script);
    };

    loadGoogleMapsScript();
  }, []);

  return (
    <section id="contact" className="py-24 md:py-32 bg-secondary-light dark:bg-black transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto bg-white dark:bg-secondary-dark shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] dark:shadow-none p-8 md:p-20 border border-gray-100 dark:border-gray-900 relative rounded-sm">
          <div className="absolute top-0 left-0 w-full h-2 bg-primary" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            <div className="lg:col-span-2">
              <RevealText>
                <h2 className="font-playfair text-4xl md:text-5xl mb-6 dark:text-white leading-tight break-words hyphens-auto">Get Started Today</h2>
              </RevealText>
              <FadeIn>
                <p className="font-montserrat font-light text-gray-500 dark:text-gray-400 mb-10 text-lg leading-relaxed">
                  Experience the luxury of professional water management. Our consultants are ready to design a plan that matches your lifestyle.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <Phone size={20} className="text-primary group-hover:text-white" />
                    </div>
                    <div className="dark:text-white font-montserrat font-semibold">(623)-707-5938</div>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <Droplets size={20} className="text-primary group-hover:text-white" />
                    </div>
                    <div className="dark:text-white font-montserrat font-semibold">info@myblueducky.com</div>
                  </div>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-3">
              <form className="space-y-10" onSubmit={(e) => { e.preventDefault(); setFormStatus('success'); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-2 md:col-span-2">
                    <label className="font-montserrat text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Full Name</label>
                    <input required type="text" className="w-full border-b-2 border-gray-200 dark:border-gray-800 py-4 focus:outline-none focus:border-primary transition-colors bg-transparent font-playfair text-xl dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-700" placeholder="Johnathan Sterling" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-montserrat text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Phone</label>
                    <input required type="tel" className="w-full border-b-2 border-gray-200 dark:border-gray-800 py-4 focus:outline-none focus:border-primary transition-colors bg-transparent font-playfair text-xl dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-700" placeholder="(555) 000-0000" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-montserrat text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Email</label>
                    <input required type="email" className="w-full border-b-2 border-gray-200 dark:border-gray-800 py-4 focus:outline-none focus:border-primary transition-colors bg-transparent font-playfair text-xl dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-700" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="font-montserrat text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Street Address</label>
                    <input
                      ref={addressInputRef}
                      required
                      type="text"
                      className="w-full border-b-2 border-gray-200 dark:border-gray-800 py-4 focus:outline-none focus:border-primary transition-colors bg-transparent font-playfair text-xl dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-700"
                      placeholder="Start typing your address..."
                      autoComplete="off"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2 grid grid-cols-2 gap-6">
                    <div className="space-y-2 col-span-2 md:col-span-1">
                      <label className="font-montserrat text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">City</label>
                      <input
                        ref={cityInputRef}
                        required
                        type="text"
                        className="w-full border-b-2 border-gray-200 dark:border-gray-800 py-4 focus:outline-none focus:border-primary transition-colors bg-transparent font-playfair text-xl dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-700"
                        placeholder="Los Angeles"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6 col-span-2 md:col-span-1">
                      <div className="space-y-2">
                        <label className="font-montserrat text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">State</label>
                        <input
                          ref={stateInputRef}
                          required
                          type="text"
                          className="w-full border-b-2 border-gray-200 dark:border-gray-800 py-4 focus:outline-none focus:border-primary transition-colors bg-transparent font-playfair text-xl dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-700"
                          placeholder="CA"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-montserrat text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Zip</label>
                        <input
                          ref={zipInputRef}
                          required
                          type="text"
                          className="w-full border-b-2 border-gray-200 dark:border-gray-800 py-4 focus:outline-none focus:border-primary transition-colors bg-transparent font-playfair text-xl dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-700"
                          placeholder="90210"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-montserrat text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Service Frequency</label>
                  <select className="w-full border-b-2 border-gray-200 dark:border-gray-800 py-4 focus:outline-none focus:border-primary transition-colors bg-transparent font-playfair text-xl dark:text-white">
                    <option className="dark:bg-black">Weekly Concierge Maintenance</option>
                    <option className="dark:bg-black">Critical Systems Repair</option>
                    <option className="dark:bg-black">Bespoke Renovation Consultation</option>
                    <option className="dark:bg-black">Energy Efficiency Audit</option>
                  </select>
                </div>

                <div className="pt-6">
                  <button type="submit" className="group relative bg-primary text-white px-12 py-5 font-montserrat text-xs font-bold uppercase tracking-[0.2em] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30 w-full md:w-auto rounded-sm">
                    <span className="relative z-10">GET YOUR FREE QUOTE</span>
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </button>
                </div>

                {formStatus === 'success' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 text-success font-montserrat font-semibold">
                    <CheckCircle2 size={20} /> Request received. We will contact you shortly.
                  </motion.div>
                )}
                {formStatus === 'error' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 text-error font-montserrat font-semibold">
                    <AlertCircle size={20} /> There was an error. Please call us directly.
                  </motion.div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ = ({ setCurrentPage, setSelectedFaqSlug }: { setCurrentPage: (p: string) => void, setSelectedFaqSlug: (slug: string) => void }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const showMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, faqData.length));
  };

  const showLess = () => {
    setVisibleCount(3);
    const section = document.getElementById('faq');
    if (section) {
      const yOffset = -100; // Offset for header
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="faq" className="py-24 md:py-32 bg-white dark:bg-black transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <RevealText>
            <h2 className="font-playfair text-4xl md:text-5xl mb-6 dark:text-white leading-tight">
              Common Questions
            </h2>
          </RevealText>
          <FadeIn>
            <p className="font-montserrat font-light text-gray-600 dark:text-gray-400 text-lg">
              Answers to frequently asked questions about pool service in Surprise, AZ and the greater Phoenix Valley.
            </p>
          </FadeIn>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-gray-200 dark:divide-gray-800">
          {faqData.slice(0, visibleCount).map((item, index) => (
            <FadeIn key={item.id} delay={index * 0.05}>
              <div className="py-6">
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center text-left group cursor-pointer"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-playfair text-xl md:text-2xl dark:text-white group-hover:text-primary transition-colors pr-8">
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="text-primary" size={24} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="font-montserrat font-light text-gray-600 dark:text-gray-400 pt-4 text-base leading-relaxed">
                        {item.briefAnswer}{' '}
                        <a
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedFaqSlug(item.linkSlug);
                            setCurrentPage('faq-article');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="text-primary font-semibold hover:underline cursor-pointer inline-flex items-center gap-1"
                        >
                          {item.linkText} <ArrowRight size={14} />
                        </a>
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>

        {faqData.length > 3 && (
          <div className="mt-12 text-center">
            {visibleCount < faqData.length ? (
              <button
                onClick={showMore}
                className="group inline-flex items-center gap-2 bg-transparent text-primary border border-primary/20 px-8 py-4 font-montserrat text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300 rounded-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                See More <ChevronDown size={16} className="group-hover:translate-y-1 transition-transform" />
              </button>
            ) : (
              <button
                onClick={showLess}
                className="group inline-flex items-center gap-2 bg-transparent text-primary border border-primary/20 px-8 py-4 font-montserrat text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300 rounded-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                See Less <ChevronDown size={16} className="rotate-180 group-hover:-translate-y-1 transition-transform" />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

const FAQArticlePlaceholder = ({ slug, setCurrentPage }: { slug: string, setCurrentPage: (p: string) => void }) => {
  const item = faqData.find(f => f.linkSlug === slug);

  return (
    <section className="py-24 md:py-32 bg-white dark:bg-black transition-colors duration-500 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <button
              onClick={() => {
                setCurrentPage('home');
                setTimeout(() => {
                  document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="font-montserrat text-primary hover:underline mb-8 inline-flex items-center gap-2 cursor-pointer"
            >
              <ArrowRight size={16} className="rotate-180" /> Back to FAQ
            </button>
          </FadeIn>
          {item && (
            <FadeIn delay={0.1}>
              <h1 className="font-playfair text-3xl md:text-5xl mb-8 dark:text-white leading-tight">
                {item.question}
              </h1>
              <div className="font-montserrat text-gray-600 dark:text-gray-400 text-lg leading-relaxed space-y-6">
                <p>{item.schemaAnswer}</p>
                <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-sm p-6 mt-8">
                  <p className="text-sm text-gray-500 dark:text-gray-500 uppercase tracking-widest font-bold mb-2">Source</p>
                  <a
                    href={item.externalLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-semibold hover:underline inline-flex items-center gap-2"
                  >
                    {item.externalLink.text} <ExternalLink size={14} />
                  </a>
                  <p className="text-sm text-gray-400 dark:text-gray-600 mt-1">{item.externalLink.source}</p>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-8">
                  <p className="text-base">
                    Have more questions?{' '}
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage('home');
                        setTimeout(() => {
                          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      className="text-primary font-semibold hover:underline cursor-pointer"
                    >
                      Contact us for a free consultation
                    </a>{' '}
                    or call <a href="tel:6237075938" className="text-primary font-semibold hover:underline">(623)-707-5938</a>.
                  </p>
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  );
};

const Footer = ({ setCurrentPage, setTargetServiceId }: { setCurrentPage: (p: string) => void, setTargetServiceId: (id: string | null) => void }) => {
  return (
    <footer className="bg-black text-white pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20 border-b border-white/10 pb-20">
          <div className="col-span-1 md:col-span-1">
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); window.scrollTo(0, 0); }} className="block mb-8">
              <Logo className="h-16 w-auto text-white" />
            </a>
            <p className="font-montserrat font-light text-sm text-gray-500 leading-relaxed max-w-xs">
              Redefining aquatic maintenance through high-precision standards and exceptional client relations.
            </p>
          </div>

          <div>
            <h4 className="font-montserrat font-bold text-[10px] uppercase tracking-[0.3em] mb-8 text-primary">Capabilities</h4>
            <ul className="space-y-5 font-montserrat text-sm text-gray-400">
              <li><button onClick={() => { setTargetServiceId(null); setCurrentPage('services'); }} className="hover:text-primary transition-colors">Residential Maintenance</button></li>
              <li><button onClick={() => { setTargetServiceId(null); setCurrentPage('services'); }} className="hover:text-primary transition-colors">Commercial Repair</button></li>
              <li><button onClick={() => { setTargetServiceId(null); setCurrentPage('services'); }} className="hover:text-primary transition-colors">Eco-Retrofits</button></li>
              <li><button onClick={() => { setTargetServiceId(null); setCurrentPage('services'); }} className="hover:text-primary transition-colors">Equipment Design</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-montserrat font-bold text-[10px] uppercase tracking-[0.3em] mb-8 text-primary">Identity</h4>
            <ul className="space-y-5 font-montserrat text-sm text-gray-400">
              <li><button onClick={() => setCurrentPage('about')} className="hover:text-primary transition-colors">Our History</button></li>
              <li><button onClick={() => setCurrentPage('home')} className="hover:text-primary transition-colors">Master Portfolio</button></li>
              <li><button onClick={() => setCurrentPage('about')} className="hover:text-primary transition-colors">Team Credentials</button></li>
              <li><button onClick={() => setCurrentPage('about')} className="hover:text-primary transition-colors">Philanthropy</button></li>
              <li><button onClick={() => setCurrentPage('blog')} className="hover:text-primary transition-colors">Expert Insights</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-montserrat font-bold text-[10px] uppercase tracking-[0.3em] mb-8 text-primary">Headquarters</h4>
            <ul className="space-y-5 font-montserrat text-sm text-gray-400">
              <li className="flex items-center gap-3"><Phone size={14} className="text-primary" /> (623)-707-5938</li>
              <li className="hover:text-white transition-colors cursor-pointer">mypool@myblueducky.com</li>
              <li>Serving Scottsdale, Paradise Valley,<br />Fountain Hills, Cave Creek & North Phoenix</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] font-montserrat text-gray-600 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} My Blue Ducky. Technical Excellence in Aquatics.</p>
          <div className="flex gap-10 mt-6 md:mt-0">
            <a href="#" className="hover:text-white transition-colors underline decoration-primary/30 underline-offset-4">Privacy Standards</a>
            <a href="#" className="hover:text-white transition-colors underline decoration-primary/30 underline-offset-4">Terms of Engagement</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- New Pages ---

const ServicesPage = ({ targetServiceId, setTargetServiceId }: { targetServiceId: string | null, setTargetServiceId: (id: string | null) => void }) => {
  useEffect(() => {
    if (targetServiceId) {
      const element = document.getElementById(targetServiceId);
      if (element) {
        // Add a small delay to ensure rendering is complete
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [targetServiceId]);

  const serviceCategories = [
    {
      id: "pool-construction",
      title: "Pool Construction",
      description: "Custom pool construction from concept to completion. We design and build pools that perfectly complement your home and lifestyle.",
      items: ["Custom Design", "Gunite & Plaster", "Tile & Coping", "Decking & Hardscape", "Equipment Installation"],
      image: "/assets/images/pool-construction-image.webp",
      link: { href: "https://www.npcpool.com/", text: "Learn more about gunite & plaster standards" }
    },
    {
      id: "pool-remodel",
      title: "Pool Remodeling",
      description: "Breathe new life into your existing pool with modern finishes, upgraded equipment, and enhanced features.",
      items: ["Replastering", "Tile Replacement", "Equipment Upgrades", "Water Feature Additions", "LED Lighting"],
      image: "/assets/images/luxury_backyard_pool_1771469141679.webp",
      link: { href: "https://www.phta.org/", text: "Pool renovation best practices" }
    },
    {
      id: "weekly-service",
      title: "Weekly Pool Service",
      description: "Starting at $119/mo. Our primary service package ensuring consistent, professional care for your pool.",
      items: ["Weekly Service", "Chemical Balancing", "Equipment Check", "Surface Skimming", "Basket Emptying"],
      image: "/assets/images/weekly_pool_service_action_1771468201115.webp",
      link: { href: "https://www.cdc.gov/healthy-swimming/", text: "CDC pool maintenance guidelines" }
    },
    {
      id: "deluxe-service",
      title: "Deluxe Pool Service",
      description: "$199/mo. The ultimate peace of mind package with priority support and advanced maintenance.",
      items: ["All Weekly Features", "Filter Cleaning Included", "Priority Dispatch", "Detailed Digital Reports", "Salt Cell Inspection"],
      image: "/assets/images/deluxe_pool_luxury_1771468970085.webp",
      link: { href: "https://www.nspf.org/", text: "About CPO certification standards" }
    },
    {
      id: "repairs-installs",
      title: "Repairs & Installs",
      description: "Factory trained technicians providing prompt and reliable solutions for all major brands.",
      items: ["Pump Repairs", "Filter Cleans", "Heater Troubleshooting", "Automation Systems", "Plumbing Leaks"],
      image: "/assets/images/weekly_service_tech_1771468929887.webp",
      link: { href: "https://www.energy.gov/energysaver/swimming-pool-energy-efficiency", text: "DOE pool equipment efficiency guide" }
    }
  ];

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <PageHero
        title="Aquatic Mastery"
        subtitle="A comprehensive suite of services tailored to the most demanding aquatic environments."
        src="/assets/images/luxury_backyard_pool_1771469141679.webp"
      />
      <div className="container mx-auto px-6 py-24">
        <div className="space-y-32">
          {serviceCategories.map((category, idx) => (
            <div id={category.id} key={idx} className={`flex flex-col gap-12 lg:gap-20 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center scroll-mt-32`}>
              <div className="flex-1">
                <RevealText>
                  <h2 className="font-playfair text-4xl md:text-5xl mb-6 dark:text-white">{category.title}</h2>
                </RevealText>
                <FadeIn delay={0.2}>
                  <p className="font-montserrat text-gray-500 dark:text-gray-400 text-lg mb-10 leading-relaxed border-l-2 border-primary pl-6">
                    {category.description}
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 font-montserrat text-sm md:text-base dark:text-gray-300">
                        <CheckCircle2 size={18} className="text-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {category.link && (
                    <a href={category.link.href} target="_blank" rel="noopener noreferrer"
                       className="inline-flex items-center gap-2 mt-6 font-montserrat text-sm text-primary hover:underline">
                      {category.link.text}
                      <ExternalLink size={14} />
                    </a>
                  )}
                </FadeIn>
              </div>
              <div className="flex-1 w-full">
                <div className="aspect-[4/3] shadow-2xl relative group">
                  <div className="absolute top-4 left-4 w-full h-full border-2 border-gray-100 dark:border-gray-800 -z-10 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4" />
                  <ScrollRevealImage src={category.image} alt={category.title} className="w-full h-full rounded-sm" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <PageHero
        title="Our Philosophy"
        subtitle="Precision pool care driven by over 18 years of hands-on experience."
        src="/assets/images/deluxe_pool_service_1771467861412.webp"
      />
      <div className="container mx-auto px-6 py-24">

        {/* Mission Section */}
        <div className="max-w-4xl mx-auto text-center mb-32">
          <RevealText>
            <h2 className="font-playfair text-4xl md:text-5xl mb-8 dark:text-white leading-tight">
              A solution for every pool need.
            </h2>
          </RevealText>
          <FadeIn delay={0.2}>
            <p className="font-montserrat text-xl text-gray-500 dark:text-gray-400 leading-relaxed font-light">
              MyBlueDucky.com, Llc began as a solution to fill the need for weekly pool care for new pool buyers. We have grown into a premier provider for all pool and backyard needs, led by a team of reliable, kind, and hardworking Pool Masters.
            </p>
          </FadeIn>
        </div>

        {/* History Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <div className="relative h-[600px]">
            <ScrollRevealImage src="/assets/images/resort_pool_about.webp" alt="Technical expertise" className="h-full object-cover" />
            <div className="absolute bottom-8 right-8 bg-white dark:bg-gray-900 p-6 shadow-xl max-w-xs">
              <p className="font-cormorant italic text-xl dark:text-white">"We treat every pool as if it were our own private resort."</p>
            </div>
          </div>
          <div className="space-y-8">
            <FadeIn delay={0.1}>
              <h3 className="font-playfair text-3xl dark:text-white">A Journey of Expertise</h3>
              <p className="font-montserrat text-gray-500 dark:text-gray-400 leading-relaxed mt-4">
                Dave Gabhart began his career in the pool industry the day after graduating high school in 2005. Starting from grunt labor for Arizona's top remodeling company, he transitioned to new pool design and sales, gaining a comprehensive understanding of the entire process from build to maintenance.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <h3 className="font-playfair text-3xl dark:text-white">Licensed & Certified</h3>
              <p className="font-montserrat text-gray-500 dark:text-gray-400 leading-relaxed mt-4">
                We are fully licensed, bonded, and insured (ROC 340026-KA Dual Residential and Commercial Swimming Pool Contractor). Dave holds the internationally recognized CPO® Certification (CPO-636009) issued by the National Swimming Pool Foundation.
              </p>
            </FadeIn>
            <div className="pt-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="border border-gray-200 dark:border-gray-800 p-6 text-center hover:border-primary transition-colors">
                  <div className="font-playfair text-4xl text-primary mb-2">18+</div>
                  <div className="font-montserrat text-xs uppercase tracking-widest dark:text-white">Years Experience</div>
                </div>
                <div className="border border-gray-200 dark:border-gray-800 p-6 text-center hover:border-primary transition-colors">
                  <div className="font-playfair text-4xl text-primary mb-2">100%</div>
                  <div className="font-montserrat text-xs uppercase tracking-widest dark:text-white">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-secondary-light dark:bg-secondary-dark p-12 md:p-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <Award size={48} className="text-primary mx-auto mb-6" />
              <h3 className="font-playfair text-2xl mb-4 dark:text-white">Excellence</h3>
              <p className="font-montserrat text-sm text-gray-500 dark:text-gray-400">Uncompromising quality in every service visit and repair.</p>
            </div>
            <div>
              <ShieldCheck size={48} className="text-primary mx-auto mb-6" />
              <h3 className="font-playfair text-2xl mb-4 dark:text-white">Integrity</h3>
              <p className="font-montserrat text-sm text-gray-500 dark:text-gray-400">Transparent pricing and honest recommendations, always.</p>
            </div>
            <div>
              <Star size={48} className="text-primary mx-auto mb-6" />
              <h3 className="font-playfair text-2xl mb-4 dark:text-white">Reliability</h3>
              <p className="font-montserrat text-sm text-gray-500 dark:text-gray-400">We show up when we say we will. Consistency is our hallmark.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Logic ---

const BlogPostPage = ({ post, setCurrentPage }: { post: BlogPost, setCurrentPage: (p: string) => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <article className="pt-32 pb-24 bg-white dark:bg-black min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <button
          onClick={() => setCurrentPage('blog')}
          className="mb-8 flex items-center gap-2 text-primary font-montserrat font-bold text-sm uppercase tracking-widest hover:translate-x-[-4px] transition-transform"
        >
          <ArrowRight className="rotate-180" size={16} /> Back to Blog
        </button>

        <header className="mb-12 text-center">
          <span className="font-montserrat text-xs font-bold uppercase tracking-widest text-primary mb-4 block">{post.date}</span>
          <h1 className="font-playfair text-4xl md:text-6xl mb-6 dark:text-white leading-tight">{post.title}</h1>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none font-montserrat font-light text-gray-600 dark:text-gray-300">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </div>
    </article>
  );
};

const BlogListPage = ({ setCurrentPage, setSelectedPostId }: { setCurrentPage: (p: string) => void, setSelectedPostId: (id: string) => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white dark:bg-black min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <RevealText>
            <h1 className="font-playfair text-5xl md:text-7xl mb-6 dark:text-white">Our Blog</h1>
          </RevealText>
          <FadeIn delay={0.2}>
            <p className="font-montserrat font-light text-gray-500 dark:text-gray-400 text-lg">
              Insights, tips, and inspiration for your backyard oasis.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map((post, idx) => (
            <FadeIn key={post.id} delay={idx * 0.1}>
              <div
                onClick={() => { setSelectedPostId(post.id); setCurrentPage('blog-post'); }}
                className="group cursor-pointer block h-full bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl transition-all duration-300 rounded-sm overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={post.image} alt={post.title} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="font-montserrat text-xs font-bold uppercase tracking-widest text-primary mb-4">{post.date}</div>
                  <h3 className="font-playfair text-xl mb-4 dark:text-white group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h3>
                  <p className="font-montserrat text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3 mb-6 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 font-montserrat text-xs font-bold uppercase tracking-widest text-black dark:text-white group-hover:text-primary transition-colors">
                    Read Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [targetServiceId, setTargetServiceId] = useState<string | null>(null);
  const [selectedFaqSlug, setSelectedFaqSlug] = useState<string | null>(null);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="antialiased selection:bg-primary selection:text-white">
      <Header isDark={isDark} setIsDark={setIsDark} currentPage={currentPage} setCurrentPage={setCurrentPage} setTargetServiceId={setTargetServiceId} />

      <main id="main-content">
        {currentPage === 'home' && (
          <>
            <HomeHero setCurrentPage={setCurrentPage} />
            <HomeFeatures setCurrentPage={setCurrentPage} setTargetServiceId={setTargetServiceId} />
            <Testimonials />
            <SocialProof />
            {/* EditorialHighlight removed */}
            <GallerySection />
            <BlogSection setCurrentPage={setCurrentPage} setSelectedPostId={setSelectedPostId} />
          </>
        )}
        {currentPage === 'services' && <ServicesPage targetServiceId={targetServiceId} setTargetServiceId={setTargetServiceId} />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'blog' && <BlogListPage setCurrentPage={setCurrentPage} setSelectedPostId={setSelectedPostId} />}
        {currentPage === 'blog-post' && selectedPostId && (
          <BlogPostPage
            post={blogPosts.find(p => p.id === selectedPostId) || blogPosts[0]}
            setCurrentPage={setCurrentPage}
          />
        )}
        {currentPage === 'faq-article' && selectedFaqSlug && (
          <FAQArticlePlaceholder slug={selectedFaqSlug} setCurrentPage={setCurrentPage} />
        )}

        {/* FAQ section above Contact section for better flow */}
        <FAQ setCurrentPage={setCurrentPage} setSelectedFaqSlug={setSelectedFaqSlug} />
        {/* Contact section is always visible at the bottom of all pages for conversion */}
        <Contact />
      </main>

      <Footer setCurrentPage={setCurrentPage} setTargetServiceId={setTargetServiceId} />
      <Analytics />
    </div>
  );
};

export default App;
