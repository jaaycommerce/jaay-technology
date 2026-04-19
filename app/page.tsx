'use client';

import { useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  Plane, Wrench, Shield, Store,
  ArrowRight, Send, Check, ChevronDown, Sparkles,
  Globe, Zap, Users, BarChart3, Smartphone,
  Mail, MapPin, ExternalLink,
} from 'lucide-react';

// ─── Products Data ─────────────────────────────────────────
const PRODUCTS = [
  {
    id: 'jaay-app',
    name: 'Jaay App',
    tagline: 'Complete Business & Commerce Ecosystem',
    description: 'An all-in-one platform for modern businesses — e-commerce store builder, AI-powered tools, NFC digital cards, booking & appointments, email campaigns, loyalty programs, and 15+ standalone add-ons. Everything you need to run and grow your business, zero commission.',
    status: 'live' as const,
    color: 'from-orange-500 to-amber-500',
    bgGlow: 'bg-orange-500/20',
    icon: Smartphone,
    url: 'https://jaay.app',
    features: [
      'E-commerce Store Builder',
      'AI Chatbot & Landing Pages',
      'Booking & Appointments',
      'NFC Cards & Digital Profiles',
      'Email Campaigns & Loyalty',
      '15+ Standalone Add-ons',
    ],
  },
  {
    id: 'jaay-commerce',
    name: 'JaayCommerce',
    tagline: 'Our Official Online Store',
    description: 'The official Jaay Commerce store — shop NFC business cards, smart tags, digital accessories, and premium business tools. Built on the Jaay platform, powered by Razorpay payments and fast shipping across India.',
    status: 'live' as const,
    color: 'from-violet-500 to-purple-600',
    bgGlow: 'bg-violet-500/20',
    icon: Store,
    url: 'https://jaaycommerce.com',
    features: [
      'NFC Business Cards & Tags',
      'Smart Digital Accessories',
      'Secure Razorpay Payments',
      'Fast Pan-India Shipping',
      'Bulk & Corporate Orders',
      'Custom Branding Options',
    ],
  },
  {
    id: 'jaay-travel',
    name: 'JaayTravel',
    tagline: 'Your Country. Your Guide.',
    description: 'A comprehensive country-based travel guide for leisure travelers, working professionals, and students. Local insights, cultural tips, regulations, transportation, and hidden gems — everything you need before and during your trip.',
    status: 'upcoming' as const,
    color: 'from-cyan-500 to-blue-600',
    bgGlow: 'bg-cyan-500/20',
    icon: Plane,
    features: [
      'Country & City Deep Guides',
      'Visa & Immigration Details',
      'Local Transport & Maps',
      'Cultural Tips & Etiquette',
      'Student & Work Relocation Guides',
      'Offline Access & Trip Planner',
    ],
  },
  {
    id: 'jaay-service',
    name: 'JaayService',
    tagline: 'Automate Your Service Business.',
    description: 'Built for field service businesses — plumbers, electricians, cleaners, maintenance teams. Automate scheduling, know exactly what details you need per job, merge daily purchases, send reminders, and collect payments seamlessly.',
    status: 'upcoming' as const,
    color: 'from-emerald-500 to-green-600',
    bgGlow: 'bg-emerald-500/20',
    icon: Wrench,
    features: [
      'Job Scheduling & Assignment',
      'Service Checklists & Details',
      'Daily Purchase Merging',
      'Automated Client Reminders',
      'Payment Collection & Invoicing',
      'Performance Analytics',
    ],
  },
  {
    id: 'jaay-vault',
    name: 'JaayVault',
    tagline: 'Never Lose a Warranty Again.',
    description: 'Store every purchase invoice and warranty in one secure place. Get reminders before warranties expire, find bills instantly in emergencies, and let sellers upsell extended warranties and insurance — all digitally.',
    status: 'upcoming' as const,
    color: 'from-rose-500 to-pink-600',
    bgGlow: 'bg-rose-500/20',
    icon: Shield,
    features: [
      'Digital Invoice & Warranty Storage',
      'Expiry Reminders & Alerts',
      'Instant Search & Retrieval',
      'Extended Warranty Marketplace',
      'Insurance Upsell for Sellers',
      'Secure Cloud Backup',
    ],
  },
];

// ─── Animation Variants ─────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

// ─── Section Component ──────────────────────────────────────
function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Product Card ───────────────────────────────────────────
function ProductCard({ product, index }: { product: typeof PRODUCTS[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = product.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: 5 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: 'easeOut' as const }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/5">
        <div className={`absolute -top-24 -right-24 w-48 h-48 ${product.bgGlow} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

        <div className="relative p-8 pb-0">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center shadow-lg`}>
              <Icon className="w-7 h-7 text-white" />
            </div>
            {product.status === 'upcoming' ? (
              <span className="px-3 py-1 text-xs font-semibold bg-zinc-800 text-zinc-400 rounded-full border border-zinc-700">Coming Soon</span>
            ) : (
              <a href={product.url} target="_blank" rel="noopener noreferrer" className="px-3 py-1 text-xs font-semibold bg-orange-500/10 text-orange-400 rounded-full border border-orange-500/20 hover:bg-orange-500/20 transition-colors flex items-center gap-1">
                Live <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
          <h3 className={`text-2xl font-bold bg-gradient-to-r ${product.color} bg-clip-text text-transparent`}>{product.name}</h3>
          <p className="text-lg text-zinc-300 mt-1 font-medium">{product.tagline}</p>
          <p className="text-sm text-zinc-500 mt-3 leading-relaxed">{product.description}</p>
        </div>

        <div className="p-8 pt-6">
          <div className="grid grid-cols-2 gap-2">
            {product.features.map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + i * 0.05 }} className="flex items-start gap-2 text-xs text-zinc-400">
                <Check className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="px-8 pb-8">
          {product.status === 'live' ? (
            <a href={product.url} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r ${product.color} text-white font-semibold text-sm hover:opacity-90 transition-opacity`}>
              Explore {product.name} <ArrowRight className="w-4 h-4" />
            </a>
          ) : (
            <div className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-zinc-800 text-zinc-500 font-medium text-sm cursor-default">
              <Sparkles className="w-4 h-4" /> Launching Soon
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page ──────────────────────────────────────────────
export default function JaayTechnologyPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      setSent(true);
      setFormData({ name: '', email: '', message: '' });
    } catch {
      alert('Failed to send. Please email jaaytechnology@gmail.com directly.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#09090b]/80 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">J</span>
            </div>
            <span className="text-lg font-bold">Jaay Technology</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
            <a href="#products" className="hover:text-white transition-colors">Products</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
          <a href="#contact" className="px-4 py-2 text-sm font-medium bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors">Get in Touch</a>
        </div>
      </nav>

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: '3s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-orange-500/5 to-purple-500/5 rounded-full blur-[150px] glow-pulse" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative max-w-5xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-zinc-800/50 border border-zinc-700/50 rounded-full text-sm text-zinc-400 mb-8">
              <Sparkles className="w-4 h-4 text-orange-400" />
              Building intelligent platforms for India
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }} className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-[0.9]">
            <span className="block">We Build</span>
            <span className="block mt-2 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent animate-gradient">What&apos;s Next</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="mt-8 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Jaay Technology creates platforms that empower businesses, simplify travel, automate services, and protect your purchases. Five products. One mission.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45 }} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#products" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-orange-500/25 transition-all">
              Explore Our Products <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-800/50 border border-zinc-700 text-zinc-300 rounded-xl font-medium text-lg hover:bg-zinc-800 transition-colors">
              Contact Us
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <ChevronDown className="w-6 h-6 text-zinc-600" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* STATS */}
      <AnimatedSection className="py-16 border-y border-zinc-800/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '5', label: 'Products', icon: Globe },
              { value: '10K+', label: 'Businesses', icon: Users },
              { value: '0%', label: 'Commission', icon: Zap },
              { value: '99.9%', label: 'Uptime', icon: BarChart3 },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeInUp} className="text-center">
                <stat.icon className="w-6 h-6 text-orange-500 mx-auto mb-3" />
                <div className="text-3xl sm:text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-zinc-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* PRODUCTS */}
      <section id="products" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <motion.div variants={fadeInUp}>
              <span className="text-sm font-semibold text-orange-400 uppercase tracking-widest">Our Products</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold mt-4">A Platform for Every Need</motion.h2>
            <motion.p variants={fadeInUp} className="text-zinc-400 mt-4 max-w-2xl mx-auto text-lg">
              From selling products online to managing field services — we&apos;re building the tools that Indian businesses deserve.
            </motion.p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 bg-zinc-900/30">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <span className="text-sm font-semibold text-orange-400 uppercase tracking-widest">About Us</span>
              <h2 className="text-4xl sm:text-5xl font-bold mt-4">Built in India.<br />For the World.</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div variants={fadeInUp} className="space-y-6">
                <p className="text-zinc-400 leading-relaxed text-lg">Jaay Technology is on a mission to build intelligent, affordable platforms that solve real problems for real businesses.</p>
                <p className="text-zinc-400 leading-relaxed">We believe every business — from a corner grocery store to a real estate brokerage — deserves professional digital tools without enterprise pricing or technical complexity.</p>
                <p className="text-zinc-400 leading-relaxed">Our platforms are designed for India first — supporting UPI, GST, regional languages, and local business workflows — then scaled for the world.</p>
              </motion.div>

              <motion.div variants={scaleIn} className="grid grid-cols-2 gap-4">
                {[
                  { title: 'India First', desc: 'UPI, GST, regional languages built-in', icon: '🇮🇳' },
                  { title: 'AI Powered', desc: 'Gemini AI across all products', icon: '🤖' },
                  { title: 'Zero Commission', desc: 'Your revenue stays yours', icon: '💰' },
                  { title: 'Open Ecosystem', desc: 'API-first, integrate anything', icon: '🔗' },
                ].map((item, i) => (
                  <div key={i} className="p-5 bg-zinc-800/50 rounded-2xl border border-zinc-700/50">
                    <span className="text-2xl">{item.icon}</span>
                    <h4 className="font-semibold text-white mt-3 text-sm">{item.title}</h4>
                    <p className="text-xs text-zinc-500 mt-1">{item.desc}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <span className="text-sm font-semibold text-orange-400 uppercase tracking-widest">Contact</span>
              <h2 className="text-4xl sm:text-5xl font-bold mt-4">Let&apos;s Build Together</h2>
              <p className="text-zinc-400 mt-4 max-w-lg mx-auto">Have a question, partnership idea, or just want to say hello?</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid md:grid-cols-5 gap-8">
              <div className="md:col-span-2 space-y-6">
                {[
                  { icon: Mail, label: 'Email', value: 'jaaytechnology@gmail.com', href: 'mailto:jaaytechnology@gmail.com' },
                  { icon: Globe, label: 'Website', value: 'jaaytechnology.com', href: 'https://jaaytechnology.com' },
                  { icon: MapPin, label: 'Location', value: 'India', href: undefined },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white text-sm">{item.label}</h4>
                      {item.href ? (
                        <a href={item.href} className="text-zinc-400 text-sm hover:text-orange-400 transition-colors">{item.value}</a>
                      ) : (
                        <p className="text-zinc-400 text-sm">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleContact} className="md:col-span-3 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="Your name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 text-sm" />
                  <input type="email" placeholder="Your email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 text-sm" />
                </div>
                <textarea placeholder="Your message" required rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 resize-none text-sm" />
                <button type="submit" disabled={sending || sent} className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all disabled:opacity-50 text-sm">
                  {sent ? (<><Check className="w-4 h-4" /> Message Sent!</>) : sending ? 'Sending...' : (<>Send Message <Send className="w-4 h-4" /></>)}
                </button>
              </form>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800/50 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">J</span>
                </div>
                <span className="font-bold text-white">Jaay Technology</span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">Building intelligent platforms for the modern world.</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Products</h4>
              <div className="space-y-2 text-sm text-zinc-500">
                <a href="https://jaay.app" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">Jaay App</a>
                <a href="https://jaaycommerce.com" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">JaayCommerce</a>
                <span className="block text-zinc-600">JaayTravel (Soon)</span>
                <span className="block text-zinc-600">JaayService (Soon)</span>
                <span className="block text-zinc-600">JaayVault (Soon)</span>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Company</h4>
              <div className="space-y-2 text-sm text-zinc-500">
                <a href="#about" className="block hover:text-white transition-colors">About</a>
                <a href="#contact" className="block hover:text-white transition-colors">Contact</a>
                <a href="mailto:jaaytechnology@gmail.com" className="block hover:text-white transition-colors">Email Us</a>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Legal</h4>
              <div className="space-y-2 text-sm text-zinc-500">
                <a href="/privacy" className="block hover:text-white transition-colors">Privacy Policy</a>
                <a href="/terms" className="block hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-800/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-zinc-600">&copy; {new Date().getFullYear()} Jaay Technology. All rights reserved.</p>
            <p className="text-xs text-zinc-600">Made in India</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
