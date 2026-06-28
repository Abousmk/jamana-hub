"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE, fadeUp, staticFade } from "@/lib/motion";
import { useLang } from "@/lib/i18n";

const inputClass =
  "w-full rounded-lg border border-green-line bg-green-abyss px-4 py-3 font-body text-sm text-cream placeholder:text-cream/35 transition-[border-color,opacity] duration-300 focus-visible:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-green-deep";

const labelClass =
  "mb-1.5 block font-util text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-gold/80";

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function MediaContactForm() {
  const { t } = useLang();
  const reducedMotion = useReducedMotion();
  const c = t.mediaPage.contact;

  const [form, setForm] = useState({
    name: "",
    email: "",
    type: c.types[0].value,
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (status !== "idle") setStatus("idle");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!form.name.trim()) {
      setStatus("error");
      setErrorMsg(c.errors.name);
      return;
    }
    if (!isValidEmail(form.email.trim())) {
      setStatus("error");
      setErrorMsg(c.errors.email);
      return;
    }
    if (!form.message.trim()) {
      setStatus("error");
      setErrorMsg(c.errors.message);
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          type: form.type,
          message: form.message.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || c.errors.generic);
      }

      setStatus("success");
      setForm({ name: "", email: "", type: c.types[0].value, message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || c.errors.generic);
    }
  };

  return (
    <motion.div
      variants={reducedMotion ? staticFade : fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={reducedMotion ? undefined : { duration: 0.7, ease: EASE }}
      className="mt-14 w-full rounded-xl border border-gold/20 bg-green-deep p-6 text-left md:mt-16 md:p-8"
    >
      <h2 className="font-display text-xl text-cream md:text-2xl">{c.title}</h2>
      <p className="mt-3 font-body text-sm leading-relaxed text-cream/70 md:text-base">
        {c.intro}
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className={labelClass}>
              {c.fields.name}
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={update("name")}
              className={inputClass}
              disabled={status === "loading"}
            />
          </div>
          <div>
            <label htmlFor="contact-email" className={labelClass}>
              {c.fields.email}
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={update("email")}
              className={inputClass}
              disabled={status === "loading"}
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact-type" className={labelClass}>
            {c.fields.type}
          </label>
          <select
            id="contact-type"
            name="type"
            value={form.type}
            onChange={update("type")}
            className={inputClass}
            disabled={status === "loading"}
          >
            {c.types.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="contact-message" className={labelClass}>
            {c.fields.message}
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={form.message}
            onChange={update("message")}
            className={`${inputClass} resize-y min-h-[120px]`}
            disabled={status === "loading"}
          />
        </div>

        {status === "success" ? (
          <p className="font-body text-sm text-gold-light" role="status">
            {c.success}
          </p>
        ) : null}

        {status === "error" && errorMsg ? (
          <p className="font-body text-sm text-red-400/90" role="alert">
            {errorMsg}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3.5 font-util text-xs font-semibold uppercase tracking-[0.14em] text-green-abyss transition-[transform,opacity] duration-300 hover:scale-[1.02] hover:shadow-[0_0_28px_rgba(200,169,81,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-green-deep active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? c.sending : c.submit}
        </button>
      </form>
    </motion.div>
  );
}
