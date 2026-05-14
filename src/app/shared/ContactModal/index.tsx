"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { SEND_EMAIL_API } from "@/app/api/contact/api";
import Button from "../Button";
import { useScrollLock } from "@/lib/hooks/useScrollLock";
import { getContactMethods } from "@/constants/contactMethods";
import Link from "next/link";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: Props) {
  const t = useTranslations("ContactModal");
  const CONTACT_METHODS = getContactMethods(t);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    honeypot: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  useScrollLock(isOpen);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(SEND_EMAIL_API, {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success) {
        setShowSuccess(true);
        setForm({ name: "", email: "", phone: "", message: "", honeypot: "" });
        setTimeout(() => { setShowSuccess(false); onClose(); }, 3000);
      }
    } catch (error) {
      console.error("Failed to send message", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-transparent backdrop-blur-md"
          />

          <div className="relative z-10 flex min-h-full items-start sm:items-center justify-center p-4 py-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-4xl bg-[#0F1115] border border-gray-800 rounded-[32px] flex flex-col sm:flex-row"
            >
              <div className="flex items-start justify-between sm:hidden px-8 pt-8">
                <h2 className="text-[20px] font-bold text-white pr-4 pb-4">
                  {t("ContactUs")}
                </h2>
                <Button
                  onClick={onClose}
                  styles="text-gray-500 hover:text-white cursor-pointer flex-shrink-0 mt-1"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              <div className="w-full sm:w-2/5 bg-[#161920] border-b sm:border-b-0 sm:border-r border-gray-800 rounded-t-none sm:rounded-tl-[32px] sm:rounded-bl-[32px] sm:rounded-tr-none">
                <h2 className="hidden sm:block text-[20px] font-bold text-white mb-6 px-8 pt-8">
                  {t("ContactUs")}
                </h2>
                <div className="px-2 md:px-8 py-4 space-y-4 sm:space-y-5">
                  {CONTACT_METHODS.map((method) => (
                    <ContactLink key={method.id} {...method} />
                  ))}
                </div>
              </div>

              <div className="relative w-full sm:w-3/5 p-8 sm:p-12">
                <Button
                  onClick={onClose}
                  styles="hidden sm:flex absolute top-6 right-6 text-gray-500 hover:text-white z-10 cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </Button>

                {showSuccess ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-10">
                    <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                    <h3 className="text-xl font-bold text-white">
                      {t("MessageSent")}
                    </h3>
                  </div>
                ) : (
                  <form onSubmit={submitForm} className="space-y-6">
                    <input
                      type="text"
                      name="honeypot"
                      value={form?.honeypot}
                      onChange={handleChange}
                      className="hidden"
                      aria-hidden="true"
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <InputGroup label={t("YourName")}>
                      <input
                        name="name"
                        value={form?.name}
                        onChange={handleChange}
                        type="text"
                        placeholder="Александр"
                        required
                        className={inputStyles}
                      />
                    </InputGroup>

                    <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-4">
                      <InputGroup label="Email">
                        <input
                          name="email"
                          value={form?.email}
                          onChange={handleChange}
                          type="email"
                          placeholder="mail@example.com"
                          required
                          className={inputStyles}
                        />
                      </InputGroup>
                      <InputGroup label={t("Phone")}>
                        <input
                          name="phone"
                          value={form?.phone}
                          onChange={handleChange}
                          type="text"
                          placeholder="+33 X XX XX XX"
                          required
                          className={inputStyles}
                        />
                      </InputGroup>
                    </div>

                    <InputGroup label={t("YourQuestion")}>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder={t("WhatWouldYouLike")}
                        required
                        className={inputStyles}
                      />
                    </InputGroup>

                    <Button
                      disabled={loading}
                      type="submit"
                      styles="w-full py-4 bg-accent hover:bg-yellow-500 disabled:opacity-50 text-primary font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-lg shadow-yellow-600/10 flex items-center justify-center gap-3 cursor-pointer"
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      {loading ? t("Sending") : t("SendAMessage")}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

const inputStyles =
  "w-full bg-[#161920] border border-gray-800 rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:border-accent outline-none transition-all";

function InputGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] uppercase tracking-[2px] font-bold text-gray-500 ml-1">
        {label}
      </label>
      {children}
    </div>
  );
}

function ContactLink({ href, icon, label, sub }: {
  href: string;
  icon: React.ReactNode;
  label: string;
  sub: string;
}) {
  return (
    <Link href={href} target="_blank" rel="noreferrer" className="flex items-center gap-4 group cursor-pointer px-[10px]">
      <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center border border-gray-800 group-hover:border-accent transition-colors">
        {icon}
      </div>
      <div>
        <div className="text-white font-bold group-hover:text-accent transition-colors">{label}</div>
        <div className="text-gray-500 text-xs">{sub}</div>
      </div>
    </Link>
  );
}