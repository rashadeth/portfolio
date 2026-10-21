const enquiryTypes = ["An AI film or ad", "A design project", "Content strategy", "A collaboration"];

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) {
    return Response.json({ success: false }, { status: 403 });
  }
  try {
    if (Number(request.headers.get("content-length") ?? 0) > 12000) {
      return Response.json({ success: false }, { status: 413 });
    }
    const raw = await request.text();
    if (raw.length > 12000) return Response.json({ success: false }, { status: 413 });
    const data = JSON.parse(raw);
    const email = typeof data.email === "string" ? data.email.trim() : "";
    const message = typeof data.message === "string" ? data.message.trim() : "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || !message || message.length > 5000 || !enquiryTypes.includes(data.enquiry) || data.website) {
      return Response.json({ success: false }, { status: 400 });
    }
    const upstream = await fetch("https://formsubmit.co/ajax/yohananokpoko@gmail.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json", Referer: `${origin}/contact` },
      body: JSON.stringify({ email, message, enquiry: data.enquiry, _subject: `Portfolio enquiry — ${data.enquiry}`, _template: "table" }),
      signal: AbortSignal.timeout(45000),
    });
    const result = await upstream.json();
    const accepted = result.success === true || result.success === "true";
    if (!upstream.ok || !accepted || /activat|confirm.*email/i.test(String(result.message ?? ""))) {
      return Response.json({ success: false }, { status: 502 });
    }
    return Response.json({ success: true });
  } catch {
    return Response.json({ success: false }, { status: 503 });
  }
}
