"use client";

import { useRef, useState, type CSSProperties, type FormEvent } from "react";
import PortfolioIcon from "./PortfolioIcon";
import { contactAccessKey } from "@/lib/contact-config";

const templates = [
  { label: "An AI film or ad", icon: "film", message: "Hi Ian, I’d love to create an AI film or ad for my brand. Could you share your availability and how we can get started?" },
  { label: "A design project", icon: "design", message: "Hi Ian, I have a digital design project in mind. I’d love to hear about your process, availability and next steps." },
  { label: "Content strategy", icon: "home", message: "Hi Ian, I’m interested in building a content strategy for my brand. Can we talk about ideas and how we could work together?" },
  { label: "A collaboration", icon: "mail", message: "Hi Ian, I have a collaboration in mind and think we could make something great together. Are you open to a conversation?" },
] as const;

function RibbonBurst() {
  const colors = ["#f8ebd8", "#bbbd91", "#a4992e", "#c53d10"];
  return <div className="ribbon-burst" aria-hidden="true">{Array.from({ length: 36 }, (_, i) => {
    const angle = i * 2.399;
    const radius = 130 + (i % 5) * 45;
    return <i key={i} style={{ "--ribbon-x": `${Math.cos(angle) * radius}px`, "--ribbon-y": `${Math.sin(angle) * radius + 160}px`, "--ribbon-spin": `${(i % 2 ? 1 : -1) * (180 + i * 23)}deg`, "--ribbon-color": colors[i % 4] } as CSSProperties} />;
  })}</div>;
}

export default function ContactComposer() {
  const [choice, setChoice] = useState(0);
  const [message, setMessage] = useState<string>(templates[0].message);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  const inFlight = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    setError("");
    const data = new FormData(event.currentTarget);
    const replyEmail = String(data.get("email") ?? "").trim();
    const submittedMessage = String(data.get("message") ?? "").trim();
    if (!submittedMessage) { setError("Choose a message or write a little about your idea."); return; }
    if (!replyEmail) { setError("Enter your email so I can reply."); return; }
    if (!contactAccessKey) { setError("Message delivery is being set up. Please use the email link below for now."); return; }
    if (data.get("website")) { setError("Please try again."); return; }
    inFlight.current = true;
    setStatus("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: contactAccessKey, email: replyEmail, message: submittedMessage, enquiry: templates[choice].label, subject: `Portfolio enquiry — ${templates[choice].label}`, from_name: "Ian O Portfolio", botcheck: false }),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) {
        setStatus("idle");
        setError(response.status === 429
          ? "Too many attempts. Please wait a moment before trying again."
          : "The delivery service couldn’t send your message. Your details are still here; try again or use the email link below.");
        return;
      }
      setStatus("sent");
    } catch {
      setStatus("idle");
      setError("The delivery service isn’t responding. Your message is still here. Please try again shortly, or use the email link below.");
    } finally { inFlight.current = false; }
  }

  if (status === "sent") return <div className="contact-success" role="status" aria-live="polite">
    <RibbonBurst />
    <h2>Sent!</h2>
    <p>Your idea is on its way to me. I’ll reply to the email you shared.</p>
    <button type="button" onClick={() => { setStatus("idle"); setError(""); }}>Send another message</button>
  </div>;

  return <form className="contact-form" onSubmit={submit} aria-busy={status === "sending"}>
    <fieldset disabled={status === "sending"}>
      <legend>What do you have in mind?</legend>
      <div className="message-choices">{templates.map((template, index) => <button className="message-choice" key={template.label} type="button" aria-pressed={choice === index} onClick={() => { setChoice(index); setMessage(template.message); setError(""); }}>
        <PortfolioIcon name={template.icon} size={20} active={choice === index} />{template.label}
      </button>)}</div>
    </fieldset>
    <label htmlFor="contact-message">Your message — ready to send, or make it yours</label>
    <textarea id="contact-message" name="message" value={message} onChange={(event) => setMessage(event.target.value)} required maxLength={5000} disabled={status === "sending"} />
    <label htmlFor="contact-email">Where can I reply?</label>
    <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required maxLength={254} disabled={status === "sending"} />
    <div className="contact-honey" aria-hidden="true"><label htmlFor="contact-website">Leave this empty</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></div>
    {error && <p className="contact-error" role="alert">{error}</p>}
    <button type="submit" className="contact-send" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send message"}<PortfolioIcon name="mail" active size={22} /></button>
    <p className="contact-note">I’ll reply to this email. You can also <a href="mailto:yohananokpoko@gmail.com">email me directly</a>.</p>
  </form>;
}
