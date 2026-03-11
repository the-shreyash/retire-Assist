import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, FileText, Bot, Bell, ArrowRight, CheckCircle, Users, Clock, Phone, Mail, MapPin, ChevronRight, Sparkles, Lock, Zap, HeartHandshake, Building2, Landmark } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
                <Link to="/" className="flex items-center gap-2.5 no-underline">
                    <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                        <Shield size={20} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-text-dark leading-tight">RetireAssist</h1>
                        <p className="text-[10px] text-text-muted leading-tight">Secure Digital Pension Management</p>
                    </div>
                </Link>
                <div className="hidden md:flex items-center gap-6">
                    <a href="#features" className="text-sm text-text-light hover:text-primary transition-colors no-underline font-medium">Features</a>
                    <a href="#services" className="text-sm text-text-light hover:text-primary transition-colors no-underline font-medium">Services</a>
                    <a href="#why" className="text-sm text-text-light hover:text-primary transition-colors no-underline font-medium">Why Us</a>
                </div>
                <div className="flex items-center gap-3">
                    <span className="trust-badge hidden sm:inline-flex"><Shield size={12} /> Secure Platform</span>
                    <Link to="/login" className="btn-outline text-sm !py-2 !px-4 !min-h-[36px]">Sign In</Link>
                    <Link to="/signup" className="btn-primary text-sm !py-2 !px-4 !min-h-[36px]">Get Started</Link>
                </div>
            </div>
        </nav>
    );
}

function Hero() {
    return (
        <section className="gradient-hero pt-32 pb-20 px-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-400 rounded-full blur-3xl" />
            </div>
            <motion.div className="max-w-4xl mx-auto text-center relative z-10" initial="hidden" animate="visible" variants={stagger}>
                <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm text-white/80 mb-6 border border-white/20">
                    <Sparkles size={14} /> AI-Powered Retirement Management
                </motion.div>
                <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                    RetireAssist — Your Personal<br /><span className="text-cyan-300">Retirement Manager</span>
                </motion.h1>
                <motion.p variants={fadeUp} className="text-lg text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed">
                    Helping retirees manage pensions, insurance claims, income tax filing, and government paperwork through AI guidance, document automation, and personal assistance.
                </motion.p>
                <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
                    <Link to="/signup" className="btn-secondary !text-base !px-8 !py-3">
                        Get Assistance <ArrowRight size={18} />
                    </Link>
                    <a href="#features" className="btn-outline !bg-white/10 !border-white/20 !text-white hover:!bg-white/20 !text-base !px-8 !py-3">
                        See How It Works
                    </a>
                </motion.div>
                <motion.div variants={fadeUp} className="flex items-center justify-center gap-6 mt-10 text-sm text-blue-200">
                    <span className="flex items-center gap-1.5"><Lock size={14} /> Bank-Grade Security</span>
                    <span className="flex items-center gap-1.5"><CheckCircle size={14} /> Govt. Verified</span>
                    <span className="flex items-center gap-1.5"><Users size={14} /> 10,000+ Retirees</span>
                </motion.div>
            </motion.div>
        </section>
    );
}

function Problems() {
    const problems = [
        { icon: Building2, title: 'Multiple Office Visits', desc: 'Retirees must visit different offices repeatedly for pension, tax, and insurance work.' },
        { icon: FileText, title: 'Complex Paperwork', desc: 'Filling complicated government forms and managing multiple documents is stressful.' },
        { icon: Clock, title: 'Time Consuming', desc: 'Simple tasks take weeks due to bureaucratic processes and lack of digital tools.' },
        { icon: Lock, title: 'Fraud Risk', desc: 'Depending on agents or middlemen leads to overcharging, lack of transparency, and fraud.' },
    ];
    return (
        <section className="py-20 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
                    <motion.p variants={fadeUp} className="text-sm font-semibold text-danger mb-2 uppercase tracking-wide">The Problem</motion.p>
                    <motion.h2 variants={fadeUp} className="text-3xl font-bold text-text-dark mb-3">Why Retirement Is Harder Than It Should Be</motion.h2>
                    <motion.p variants={fadeUp} className="text-text-light max-w-xl mx-auto">After retirement, people face difficulties managing pensions, ITR, insurance, and government documents.</motion.p>
                </motion.div>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {problems.map((p, i) => (
                        <motion.div key={i} variants={fadeUp} className="card text-center group hover:border-danger/20">
                            <div className="w-12 h-12 bg-red-50 text-danger rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <p.icon size={24} />
                            </div>
                            <h3 className="font-bold text-text-dark mb-2">{p.title}</h3>
                            <p className="text-sm text-text-light">{p.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function Features() {
    const features = [
        { icon: Bot, title: 'AI Assistant', desc: 'Get instant answers about pension, tax filing, and insurance claims from our AI.', gradient: 'from-blue-500 to-cyan-500' },
        { icon: FileText, title: 'Smart Document Automation', desc: 'Upload documents with OCR scanning that auto-extracts and fills data for you.', gradient: 'from-purple-500 to-pink-500' },
        { icon: Bell, title: 'Smart Reminders', desc: 'Never miss a deadline with automated reminders for life certificates, ITR, and more.', gradient: 'from-orange-500 to-red-400' },
        { icon: Shield, title: 'Secure Document Vault', desc: 'Bank-grade 256-bit encrypted storage for all your pension and financial documents.', gradient: 'from-emerald-500 to-teal-500' },
        { icon: Zap, title: 'One-Click Services', desc: 'Apply for pension corrections, bank updates, and life certificates with a single click.', gradient: 'from-blue-600 to-violet-500' },
        { icon: HeartHandshake, title: 'Personal Assistance', desc: 'Get assigned a personal assistant for complex cases requiring human intervention.', gradient: 'from-pink-500 to-rose-400' },
    ];
    return (
        <section id="features" className="py-20 px-6 gradient-bg">
            <div className="max-w-6xl mx-auto">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
                    <motion.p variants={fadeUp} className="text-sm font-semibold text-primary mb-2 uppercase tracking-wide">Platform Features</motion.p>
                    <motion.h2 variants={fadeUp} className="text-3xl font-bold text-text-dark mb-3">Everything You Need in One Place</motion.h2>
                    <motion.p variants={fadeUp} className="text-text-light max-w-xl mx-auto">A complete platform designed to make retirement stress-free.</motion.p>
                </motion.div>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {features.map((f, i) => (
                        <motion.div key={i} variants={fadeUp} className="card group cursor-pointer hover:border-primary/20">
                            <div className={`w-12 h-12 bg-gradient-to-br ${f.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <f.icon size={24} className="text-white" />
                            </div>
                            <h3 className="font-bold text-text-dark mb-2">{f.title}</h3>
                            <p className="text-sm text-text-light leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function ServicesSection() {
    const services = [
        { icon: Landmark, title: 'Pension Application', desc: 'Apply and track your pension application seamlessly.' },
        { icon: FileText, title: 'Life Certificate', desc: 'Submit Jeevan Pramaan digitally without visiting offices.' },
        { icon: Building2, title: 'Income Tax Filing', desc: 'Simplified ITR filing with AI-powered tax assistance.' },
        { icon: Shield, title: 'Insurance Claims', desc: 'File and track medical and life insurance claims easily.' },
    ];
    return (
        <section id="services" className="py-20 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
                    <motion.p variants={fadeUp} className="text-sm font-semibold text-accent uppercase tracking-wide mb-2">Our Core Services</motion.p>
                    <motion.h2 variants={fadeUp} className="text-3xl font-bold text-text-dark mb-3">Everything to Navigate Retirement with Confidence</motion.h2>
                </motion.div>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {services.map((s, i) => (
                        <motion.div key={i} variants={fadeUp} className="card text-center group hover:border-primary/20 hover:shadow-md">
                            <div className="w-14 h-14 bg-blue-50 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                                <s.icon size={28} />
                            </div>
                            <h3 className="font-bold text-text-dark mb-2">{s.title}</h3>
                            <p className="text-sm text-text-light">{s.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function WhyUs() {
    const reasons = [
        { num: '01', title: 'Government Verified', desc: 'All services are compliant with government regulations and verified processes.' },
        { num: '02', title: 'Bank-Grade Security', desc: 'Your documents and data are protected with 256-bit AES encryption.' },
        { num: '03', title: 'AI-Powered Accuracy', desc: 'Our AI reduces errors in form filling and document processing by 95%.' },
        { num: '04', title: 'Senior-Friendly Design', desc: 'Large fonts, simple navigation, and accessible design for all ages.' },
    ];
    return (
        <section id="why" className="py-20 px-6 gradient-bg">
            <div className="max-w-6xl mx-auto">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
                    <motion.p variants={fadeUp} className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">Why RetireAssist</motion.p>
                    <motion.h2 variants={fadeUp} className="text-3xl font-bold text-text-dark mb-3">Built for Trust, Designed for Simplicity</motion.h2>
                </motion.div>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {reasons.map((r, i) => (
                        <motion.div key={i} variants={fadeUp} className="card flex items-start gap-4 hover:border-primary/20">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">{r.num}</div>
                            <div>
                                <h3 className="font-bold text-text-dark mb-1">{r.title}</h3>
                                <p className="text-sm text-text-light">{r.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function CTA() {
    return (
        <section className="py-20 px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-4xl mx-auto gradient-cta rounded-2xl p-12 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
                </div>
                <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Start Your Stress-Free Retirement Journey Today!</h2>
                    <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">Let us handle the details, so you can enjoy the moments that matter.</p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link to="/signup" className="bg-white text-primary font-bold px-8 py-3 rounded-lg hover:bg-gray-50 transition-all no-underline inline-flex items-center gap-2">
                            Make an Enquiry <ChevronRight size={18} />
                        </Link>
                        <a href="tel:1800111960" className="border-2 border-white text-white font-bold px-8 py-3 rounded-lg hover:bg-white/10 transition-all no-underline inline-flex items-center gap-2">
                            <Phone size={18} /> Call Us
                        </a>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="bg-bg-dark text-white py-16 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
                <div>
                    <div className="flex items-center gap-2.5 mb-4">
                        <div className="w-9 h-9 bg-gradient-to-br from-primary-light to-accent rounded-lg flex items-center justify-center">
                            <Shield size={20} className="text-white" />
                        </div>
                        <span className="text-lg font-bold">RetireAssist</span>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">Your trusted digital companion for managing pension, insurance, and government paperwork with ease and security.</p>
                </div>
                <div>
                    <h4 className="font-semibold mb-4">Services</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li>Pension Application</li><li>Life Certificate</li><li>Income Tax Filing</li><li>Insurance Claims</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-4">Platform</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li>AI Assistant</li><li>Document Vault</li><li>Smart Reminders</li><li>Service Tracking</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-4">Contact</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li className="flex items-center gap-2"><Phone size={14} /> 1800-11-1960</li>
                        <li className="flex items-center gap-2"><Mail size={14} /> help@retireassist.in</li>
                        <li className="flex items-center gap-2"><MapPin size={14} /> New Delhi, India</li>
                    </ul>
                </div>
            </div>
            <div className="max-w-6xl mx-auto mt-10 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
                © 2026 RetireAssist. All rights reserved. | Made for Smart India Hackathon
            </div>
        </footer>
    );
}

export default function LandingPage() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <Hero />
            <Problems />
            <Features />
            <ServicesSection />
            <WhyUs />
            <CTA />
            <Footer />
        </div>
    );
}
