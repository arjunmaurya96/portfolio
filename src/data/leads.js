import emailjs from "@emailjs/browser";
import { SHEET_URL } from "./portfolio";

async function saveToSheet(lead) {
  // A form-encoded body avoids the CORS preflight that Apps Script cannot answer.
  const response = await fetch(SHEET_URL, { method: "POST", body: new URLSearchParams(lead) });
  const result = await response.json();
  if (!result.ok) throw new Error(result.error || "Sheet rejected the lead");
}

function sendEmail(lead) {
  const message = [
    `WhatsApp: ${lead.whatsapp}`,
    `Service: ${lead.service}`,
    `Work type: ${lead.workType}`,
    `Timeline: ${lead.timeline || "Not given"}`,
    `Budget: ${lead.budget || "Not given"}`,
    `Source: ${lead.source || "Contact form"}`,
    "",
    lead.details,
  ].join("\n");
  return emailjs.send(
    "service_k41rw8n",
    "template_z8lzzm8",
    { name: lead.fullName, email: lead.email, subject: `${lead.service} (${lead.workType})`, message },
    "gEoYwkl8lrQ1Tekau"
  );
}

// The sheet script saves the lead and emails you. EmailJS is the backup if it fails.
export async function deliverLead(lead) {
  if (SHEET_URL) {
    try {
      await saveToSheet(lead);
      return;
    } catch (error) {
      console.warn("Sheet unavailable, sending by EmailJS:", error);
    }
  }
  await sendEmail(lead);
}
