"use client";

import React, { useState } from "react";
import { Button } from "../ui/Button";
import { useIdeas } from "@/hooks/useIdeas";
import { Modal } from "../ui/Modal";

interface SupportPledgeFormProps {
  ideaId: string;
}

export const SupportPledgeForm: React.FC<SupportPledgeFormProps> = ({ ideaId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<"time" | "money" | "skills" | "materials">("skills");
  const [message, setMessage] = useState("");
  const { pledgeSupport } = useIdeas();

  const handleSubmit = async () => {
    const success = await pledgeSupport(ideaId, { pledge_type: type, message, amount: 0 });
    if (success) {
      setIsOpen(false);
      setMessage("");
    }
  };

  return (
    <>
      <Button variant="secondary" onClick={() => setIsOpen(true)}>Pledge Support</Button>
      
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Offer Your Support">
        <div className="space-y-4 relative z-50">
          <div>
            <label className="text-sm font-medium text-[#F8FAFC] mb-2 block">How can you help?</label>
            <div className="grid grid-cols-2 gap-2">
              {["skills", "time", "money", "materials"].map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t as any)}
                  className={`capitalize px-4 py-2 rounded-lg border text-sm transition-colors ${
                    type === t 
                      ? "bg-[#06B6D4]/20 border-[#06B6D4] text-[#06B6D4]" 
                      : "bg-[#05050F]/50 border-white/10 text-[#94A3B8] hover:border-white/30"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-[#F8FAFC] mb-2 block">Tell the creator how you will help</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-[#05050F]/50 border border-white/10 rounded-xl p-3 text-[#F8FAFC] min-h-[100px] focus:outline-none focus:border-[#06B6D4] resize-none"
              placeholder="I have experience in web dev and can help build the MVP..."
            />
          </div>
          
          <Button fullWidth onClick={handleSubmit} disabled={!message.trim()}>Submit Pledge</Button>
        </div>
      </Modal>
    </>
  );
};
