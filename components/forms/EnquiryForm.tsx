"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full border border-line-strong bg-transparent px-4 py-3 font-mono text-sm text-bone placeholder:text-grey focus:border-accent focus:outline-none";

export default function EnquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form.entries())),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      setStatus("success");
      setMessage(data.message);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-accent/40 bg-accent/5 p-6">
        <p className="label-mono">Enquiry received</p>
        <p className="mt-2 editorial">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Your name" className={inputClass} />
        <input name="company" placeholder="Company / brand" className={inputClass} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="email" type="email" required placeholder="Email" className={inputClass} />
        <input name="website" placeholder="Website" className={inputClass} />
      </div>
      <select name="type" className={inputClass} defaultValue="">
        <option value="" disabled>Partnership type</option>
        <option value="build">Build integration</option>
        <option value="video">Video feature</option>
        <option value="product">Product testing</option>
        <option value="affiliate">Affiliate arrangement</option>
        <option value="ambassador">Long-term ambassadorship</option>
        <option value="other">Other</option>
      </select>
      <textarea
        name="message"
        required
        rows={5}
        placeholder="Tell us about your product and what you have in mind…"
        className={inputClass}
      />
      <button type="submit" disabled={status === "loading"} className="btn btn-primary w-full justify-center disabled:opacity-60">
        {status === "loading" ? "Sending\u2026" : "Send Enquiry"}
      </button>
      {status === "error" && <p className="font-mono text-xs text-rust">{message}</p>}
    </form>
  );
}
