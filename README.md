# Arjun Maurya portfolio

Personal portfolio built with React, Vite and Tailwind CSS. The site is laid out like a SaaS app: sidebar navigation, a product window with live project previews, a project table with a detail drawer, and a search palette on Ctrl K (Cmd K on Mac).

## Run it

```bash
npm install
npm run dev
```

The dev server opens at http://localhost:3000.

## Build it

```bash
npm run build
```

The output goes to `dist`. Vercel picks this up automatically when you push to `main`.

## Update your content

All text lives in `src/data/portfolio.js`:

- `PROFILE`: name, email, location, resume path, hire status
- `PROJECTS`: add a project and it appears in the preview window, the table and the search palette. Put the image in `src/assets/img`. Set `github` to show a code button.
- `MORE_PROJECTS`: live links without a screenshot, shown under "Also live"
- `CHATBOTS`, `WORK_MODES`: chatbot services and the ways you work
- `SERVICES`, `SKILLS`, `EXPERIENCES`, `EDUCATION`, `ABOUT`, `SOCIALS`
- `TESTIMONIALS`: add real quotes and the section appears on its own

## Change the colors

Edit the variables at the top of `src/index.css`. The first block is the light theme and the second is the dark theme.

## Change your photo

Replace `src/assets/img/arjun-portrait.webp` (a transparent cut-out, 720 x 960) and `src/assets/img/arjun-avatar.webp` (a square, 160 x 160).

## Welcome gate

The flower gate lives in `src/components/IntroGate.jsx`. Edit the welcome text near the bottom of that file. `AUTO_OPEN_MS` sets how long it waits before opening (5 seconds now). It shows once per browser tab, so open a new tab to see it again.

## Money trail

The falling notes and coins behind the mouse live in `src/components/MoneyTrail.jsx`. To turn them off, remove `<MoneyTrail />` from `src/App.jsx`.

## Lead form and Google Sheet

The Apps Script saves each lead in your Google Sheet and emails you the details. EmailJS is the backup if the sheet is unavailable. Follow the steps below once.

1. Create a Google Sheet and open Extensions > Apps Script.
2. Paste `google-apps-script/Code.gs`, save, run `setupSheet`, then run `testEmail`. Lead emails go to `NOTIFY_EMAIL` at the top of that file.
3. Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone.
4. Paste the Web app URL into `SHEET_URL` in `src/data/portfolio.js`.

Form dropdown options live in `LEAD_FORM` in the same file.

## Chatbot

The chat button lives in `src/components/ChatBot.jsx`. Edit its text, menu, common questions, service keywords and WhatsApp number in `src/data/chatbot.js`. Leads reach the same Google Sheet with `Chatbot` in the Source column. To turn it off, remove `<ChatBot />` from `src/App.jsx`.
