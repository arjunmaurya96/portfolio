/**
 * Portfolio lead form -> Google Sheet
 * Saves every lead in the sheet and emails you all the details.
 * Paste this whole file into Extensions > Apps Script, then deploy as a Web app.
 */
const NOTIFY_EMAIL = "dev.arjunmaurya@gmail.com"; // Lead emails go here.
const SHEET_NAME = "Leads";
const TIME_ZONE = "Asia/Kolkata";
const MAX_LENGTH = 3000;

const HEADERS = [
  "Date & Time",
  "Full Name",
  "WhatsApp Number",
  "Email",
  "Service Needed",
  "Work Type",
  "Project Details",
  "Timeline",
  "Budget",
  "Source",
  "Lead Status",
];

const REQUIRED = ["fullName", "whatsapp", "email", "service", "workType", "details"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const data = (e && e.parameter) || {};

    // Bots fill the hidden "website" field. Pretend it worked and save nothing.
    if (data.website) return reply({ ok: true });

    const missing = REQUIRED.filter((key) => !String(data[key] || "").trim());
    if (missing.length) return reply({ ok: false, error: "Missing: " + missing.join(", ") });

    getSheet().appendRow([
      Utilities.formatDate(new Date(), TIME_ZONE, "dd-MMM-yyyy hh:mm a"),
      clean(data.fullName),
      clean(data.whatsapp),
      clean(data.email),
      clean(data.service),
      clean(data.workType),
      clean(data.details),
      clean(data.timeline),
      clean(data.budget),
      clean(data.source),
      "New",
    ]);

    // The lead is already safe in the sheet, so a mail problem must not fail the form.
    try {
      sendLeadEmail(data);
      return reply({ ok: true, emailed: true });
    } catch (mailError) {
      console.error(mailError);
      return reply({ ok: true, emailed: false });
    }
  } catch (error) {
    return reply({ ok: false, error: String(error) });
  } finally {
    lock.releaseLock();
  }
}

// Open the Web app URL in a browser to check that it is live.
function doGet() {
  return reply({ ok: true, message: "Lead form is live" });
}

// Run this once from the editor to create the Leads tab and allow permissions.
function setupSheet() {
  getSheet();
}

function getSheet() {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
    const status = SpreadsheetApp.newDataValidation()
      .requireValueInList(["New", "Contacted", "Proposal sent", "Won", "Lost"], true)
      .build();
    sheet.getRange(2, HEADERS.length, 999, 1).setDataValidation(status);
  }
  return sheet;
}

// Run this once from the editor to check that lead emails reach you.
function testEmail() {
  sendLeadEmail({
    fullName: "Test Lead",
    whatsapp: "+91 98765 43210",
    email: NOTIFY_EMAIL,
    service: "Web app",
    workType: "Freelance",
    details: "This is a test lead.",
    timeline: "Flexible",
    budget: "Not sure yet",
    source: "Test",
  });
}

function sendLeadEmail(data) {
  const fields = [
    ["Full name", data.fullName],
    ["WhatsApp", data.whatsapp],
    ["Email", data.email],
    ["Service needed", data.service],
    ["Work type", data.workType],
    ["Project details", data.details],
    ["Timeline", data.timeline || "Not given"],
    ["Budget", data.budget || "Not given"],
    ["Source", data.source || "Contact form"],
    ["Received", Utilities.formatDate(new Date(), TIME_ZONE, "dd-MMM-yyyy hh:mm a")],
  ].map(([label, value]) => [label, String(value || "").trim()]);

  const rows = fields
    .map(([label, value]) =>
      '<tr><td style="padding:8px 12px;border:1px solid #d6dfd9;background:#f0f4f0;font-weight:600;white-space:nowrap;vertical-align:top">' +
      label +
      '</td><td style="padding:8px 12px;border:1px solid #d6dfd9;white-space:pre-wrap">' +
      escapeHtml(value) +
      "</td></tr>"
    )
    .join("");

  const whatsappLink = "https://wa.me/" + whatsappDigits(data.whatsapp);
  const sheetLink = SpreadsheetApp.getActiveSpreadsheet().getUrl();
  const options = {
    name: "Portfolio Leads",
    htmlBody:
      '<div style="font-family:Arial,sans-serif;color:#10231e;max-width:640px">' +
      '<h2 style="margin:0 0 12px">New lead from your portfolio</h2>' +
      '<table style="border-collapse:collapse;width:100%;font-size:14px">' + rows + "</table>" +
      '<p style="margin-top:16px"><a href="' + whatsappLink + '">Reply on WhatsApp</a> &nbsp;|&nbsp; ' +
      '<a href="' + sheetLink + '">Open Google Sheet</a></p></div>',
  };
  // Pressing Reply in Gmail answers the lead directly.
  if (/^\S+@\S+\.\S+$/.test(String(data.email).trim())) options.replyTo = String(data.email).trim();

  const subject = oneLine("New lead: " + data.service + " from " + data.fullName);
  const textBody = fields.map(([label, value]) => label + ": " + value).join("\n");
  MailApp.sendEmail(NOTIFY_EMAIL, subject, textBody, options);
}

// A 10-digit number is treated as Indian, so wa.me gets the 91 country code.
function whatsappDigits(number) {
  const digits = String(number || "").replace(/\D/g, "");
  return digits.length === 10 ? "91" + digits : digits;
}

function oneLine(text) {
  return String(text).replace(/\s+/g, " ").trim().slice(0, 150);
}

function escapeHtml(text) {
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// Text starting with = + - @ would run as a formula, so store it as plain text.
function clean(value) {
  const text = String(value || "").trim().slice(0, MAX_LENGTH);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function reply(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
