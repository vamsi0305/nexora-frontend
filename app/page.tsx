"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ArrowRight, Lightbulb, Users, Rocket, Target, Globe, HeartPulse, BookOpen, Building, Palette, Briefcase, Users2 } from "lucide-react";

const DOMAINS = [
  { name: "Technology", icon: <Globe className="w-6 h-6" />, color: "text-[#06B6D4]", bg: "bg-[#06B6D4]/10" },
  { name: "Environment", icon: <Target className="w-6 h-6" />, color: "text-green-400", bg: "bg-green-400/10" },
  { name: "Health", icon: <HeartPulse className="w-6 h-6" />, color: "text-red-400", bg: "bg-red-400/10" },
  { name: "Education", icon: <BookOpen className="w-6 h-6" />, color: "text-yellow-400", bg: "bg-yellow-400/10" },
  { name: "Infrastructure", icon: <Building className="w-6 h-6" />, color: "text-orange-400", bg: "bg-orange-400/10" },
  { name: "Arts & Culture", icon: <Palette className="w-6 h-6" />, color: "text-pink-400", bg: "bg-pink-400/10" },
  { name: "Business", icon: <Briefcase className="w-6 h-6" />, color: "text-blue-400", bg: "bg-blue-400/10" },
  { name: "Social Impact", icon: <Users2 className="w-6 h-6" />, color: "text-[#7C3AED]", bg: "bg-[#7C3AED]/10" }
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 -mt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-8 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#06B6D4]/30 bg-[#06B6D4]/10 text-[#06B6D4] text-sm font-semibold mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#06B6D4] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#06B6D4]"></span>
            </span>
            Now live in Kakinada
          </div>
          
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-white leading-tight tracking-tight">
            Where Ideas Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#06B6D4]">Community.</span>
            <br />
            Where Dreams Become <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] to-[#7C3AED]">Reality.</span>
          </h1>
          
          <p className="text-xl text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            A hyper-local idea sharing and community networking platform for college students to build, validate, and fund their projects.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link href="/register" passHref>
              <Button size="lg" className="px-8 text-lg gap-2 shadow-[0_0_30px_rgba(124,58,237,0.3)]">
                Get Started <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/explore" passHref>
              <Button variant="outline" size="lg" className="px-8 text-lg bg-white/5 border-white/10 hover:border-white/20 text-white">
                Explore Ideas
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* City Stats Bar */}
      <section className="border-y border-white/10 bg-[#100B1E]/40 py-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-around gap-8 text-center">
          {[
            { label: "Active Ideas", value: "2,045" },
            { label: "Students", value: "15,000+" },
            { label: "Colleges", value: "12" },
            { label: "Pledges Total", value: "₹4.2L" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="px-6 border-l border-white/5 first:border-0"
            >
              <p className="text-4xl font-heading font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm font-medium text-[#94A3B8] uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 max-w-7xl mx-auto px-4 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">How Nexora Works</h2>
          <p className="text-[#94A3B8] max-w-2xl mx-auto text-lg">Turn your vision into reality in three simple steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Lightbulb className="w-8 h-8 text-yellow-400" />, title: "1. Share an Idea", desc: "Post your concept with problem and solution details. Get AI quality feedback immediately." },
            { icon: <Users className="w-8 h-8 text-[#06B6D4]" />, title: "2. Build Support", desc: "Gain upvotes, gather a team, and receive advice from students across different colleges." },
            { icon: <Rocket className="w-8 h-8 text-[#7C3AED]" />, title: "3. Make it Happen", desc: "Collect resource pledges (time, skills, funding) and transition from concept to launched project." }
          ].map((step, i) => (
            <Card key={i} className="p-8 text-center border-white/5 bg-gradient-to-b from-[#100B1E] to-[#05050F]/50 hover:border-[#7C3AED]/30 transition-colors">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#05050F] border border-white/10 flex items-center justify-center mb-6 shadow-xl">
                {step.icon}
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-3">{step.title}</h3>
              <p className="text-[#94A3B8] leading-relaxed">{step.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Domains Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 w-full border-t border-white/5 relative">
        <div className="absolute top-0 inset-x-0 h-px w-full bg-gradient-to-r from-transparent via-[#7C3AED]/50 to-transparent" />
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">Explore by Domain</h2>
          <p className="text-[#94A3B8] max-w-2xl mx-auto text-lg">Find projects and people that match your interests.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {DOMAINS.map((domain, i) => (
            <Link key={i} href="/explore">
              <Card className="p-6 text-center hover:bg-white/5 hover:border-white/20 transition-all cursor-pointer group h-full flex flex-col items-center justify-center gap-4">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${domain.bg} ${domain.color} group-hover:scale-110 transition-transform`}>
                  {domain.icon}
                </div>
                <h3 className="font-heading font-bold text-white">{domain.name}</h3>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 mt-12 bg-gradient-to-t from-[#7C3AED]/10 to-transparent relative overflow-hidden">
        <div className="absolute bottom-0 inset-x-0 h-[500px] w-full bg-[#7C3AED]/20 blur-[120px] rounded-full translate-y-1/2" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">Ready to shape the future?</h2>
          <p className="text-xl text-[#94A3B8] mb-10">
            Join thousands of Kakinada students collaborating to build the next big thing.
          </p>
          <Link href="/register" passHref>
            <Button size="lg" className="px-10 py-4 text-xl shadow-[0_0_40px_rgba(124,58,237,0.4)]">
              Create Your Free Account
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
