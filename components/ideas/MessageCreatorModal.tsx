"use client";

import React, { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { api } from "@/lib/api";
import { Message } from "@/types";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import toast from "react-hot-toast";

interface MessageCreatorModalProps {
  ideaId: string;
  creatorName?: string;
}

export const MessageCreatorModal: React.FC<MessageCreatorModalProps> = ({ ideaId, creatorName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    setLoading(true);
    api.get(`/messages/${ideaId}`)
      .then((res) => setMessages(res.data))
      .catch((error) => {
        toast.error(error.response?.data?.detail || "Unable to load messages");
      })
      .finally(() => setLoading(false));
  }, [isOpen, ideaId]);

  const handleSend = async () => {
    if (!draft.trim()) return;

    setSending(true);
    try {
      const res = await api.post(`/messages/${ideaId}`, { content: draft });
      setMessages((prev) => [...prev, res.data]);
      setDraft("");
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "Unable to send message");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Button variant="outline" className="gap-2" onClick={() => setIsOpen(true)}>
        <Send className="w-4 h-4" /> Message Creator
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={`Message ${creatorName || "Creator"}`}>
        <div className="space-y-4">
          <div className="max-h-72 overflow-y-auto space-y-3 rounded-xl border border-white/10 bg-[#05050F]/40 p-3">
            {loading ? (
              <p className="text-sm text-[#94A3B8]">Loading conversation...</p>
            ) : messages.length > 0 ? (
              messages.map((message) => (
                <div key={message.id} className="rounded-xl bg-white/5 p-3">
                  <p className="text-sm text-[#F8FAFC] whitespace-pre-wrap">{message.content}</p>
                  <p className="mt-1 text-xs text-[#94A3B8]">
                    {new Date(message.created_at).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-[#94A3B8]">No messages yet. Start the conversation.</p>
            )}
          </div>

          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="w-full min-h-[110px] rounded-xl border border-white/10 bg-[#05050F]/50 p-3 text-[#F8FAFC] focus:outline-none focus:border-[#06B6D4] resize-none"
            placeholder="Tell the creator how you can help or ask a clear question..."
          />

          <Button fullWidth onClick={handleSend} disabled={sending || !draft.trim()}>
            {sending ? "Sending..." : "Send Message"}
          </Button>
        </div>
      </Modal>
    </>
  );
};
