"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.get("firstName"),
          email: form.get("email"),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      setStatus("success");
      setMessage(data.message ?? "You're on the list.");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-accent/40 bg-accent/5 p-5">
        <p className="label-mono">Welcome aboard</p>
        <p className="mt-2 text-sm text-bone/80">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className={compact ? "flex flex-col gap-3 sm:flex-row" : "grid gap-3 sm:grid-cols-2"}>
        <input
          name="firstName"
          type="text"
          placeholder="First name"
          autoComplete="given-name"
          className="w-full border border-line-strong bg-transparent px-4 py-3 font-mono text-sm text-bone placeholder:text-grey focus:border-accent focus:outline-none"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email address"
          autoComplete="email"
          className="w-full border border-line-strong bg-transparent px-4 py-3 font-mono text-sm text-bone placeholder:text-grey focus:border-accent focus:outline-none"
        />
      </div>
      <button type="submit" disabled={status === "loading"} className="btn btn-primary w-full justify-center disabled:opacity-60">
        {status === "loading" ? "Joining\u2026" : "Join the Journey"}
      </button>
      {status === "error" && <p className="font-mono text-xs text-rust">{message}</p>}
      <p className="font-mono text-[0.65rem] leading-relaxed text-grey">
        No spam. Unsubscribe anytime. We&apos;ll never share your details.
      </p>
    </form>
  );
}
