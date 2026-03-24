"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { CheckCircle2, AlertOctagon } from "lucide-react";

export default function GuidelinesPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold text-white mb-4">Community Guidelines</h1>
        <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto">
          Nexora is built on trust, respect, and a shared vision to improve Kakinada. Please follow these guidelines to keep our community thriving.
        </p>
      </div>

      <div className="grid gap-8">
        <Card className="p-8 border-l-4 border-l-[#06B6D4]">
          <div className="flex items-center gap-4 mb-4">
            <CheckCircle2 className="w-8 h-8 text-[#06B6D4]" />
            <h2 className="text-2xl font-heading font-bold text-white">What We Encourage</h2>
          </div>
          <ul className="space-y-4 text-[#94A3B8]">
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] mt-2 shrink-0" /> Share hyper-local, actionable ideas that address real problems in Kakinada.</li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] mt-2 shrink-0" /> Provide constructive, respectful feedback on others' ideas.</li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] mt-2 shrink-0" /> Verify your claims and base your proposals on facts whenever possible.</li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] mt-2 shrink-0" /> Collaborate transparently with members offering support (time, skills, materials).</li>
          </ul>
        </Card>

        <Card className="p-8 border-l-4 border-l-red-500">
          <div className="flex items-center gap-4 mb-4">
            <AlertOctagon className="w-8 h-8 text-red-500" />
            <h2 className="text-2xl font-heading font-bold text-white">What Is Prohibited</h2>
          </div>
          <ul className="space-y-4 text-[#94A3B8]">
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" /> Hate speech, harassment, or bullying of any kind will result in an immediate ban.</li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" /> Spam, overly self-promotional content, or ideas unrelated to the community.</li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" /> Creating fake accounts or attempting to manipulate the voting system.</li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" /> Sharing sensitive or private information about other individuals.</li>
          </ul>
        </Card>
      </div>

      <div className="mt-12 text-center text-sm text-[#94A3B8]">
        <p>By using Nexora, you agree to abide by these guidelines. Repeated violations may result in moderation action or account termination.</p>
      </div>
    </div>
  );
}
