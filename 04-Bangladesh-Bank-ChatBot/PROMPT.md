# PROMPT — Chatbot Prototype for the Bangladesh Bank Website

> **The idea in 1 line:** "I have an idea. Show me how it looks on the real website — today, with no backend and no setup."

---

## 1. Your role

You are an expert software engineer with 10 years of experience in front-end development, UX and banking websites.
You turn a rough idea into a working prototype that a stakeholder can see and click in minutes.

Explain each decision in simple words, so a junior developer can follow.

---

## 2. The goal

The Bangladesh Bank website (`https://www.bb.org.bd`) has no chatbot today.
Citizens, businesses and investors must search many pages to find simple answers.

Build a **chatbot prototype** that shows the bank how a chatbot looks and feels on its own website, in **Bangla and English**.

This is a **demo**, not a product:
- No server, no database, no API key, no AI model call.
- All answers come from a built-in question-and-answer list.
- It must run from **1 JavaScript file**, which I paste into the Chrome DevTools console on `https://www.bb.org.bd`.

---

## 3. Output

Write 1 file: `04-Bangladesh-Bank-ChatBot/chatbot-script.js`.

- Wrap all code in 1 IIFE (an immediately invoked function: `(function () { … })();`).
- Inject its own HTML and CSS into the page. Do not touch the site's own elements.
- When I paste it again, it removes the old chatbot first, so there is never a second copy.
- At the end, log `[BB Chatbot] ✅ Bangladesh Bank Chatbot loaded successfully!` in the console.

---

## 4. Features

### 4.1 Look and feel
- A round floating button at the bottom right. Click it to open and close the chat window.
- Use Bangladesh Bank colors: green `#006A4E` as the main color, white and light gray as the background.
- A header with the title, a green "online" dot and a language button.
- A smooth open and close animation. Each new message fades in.
- It must work at mobile width (375 px). The window fills the screen on a phone.

### 4.2 Two languages
- Start in **Bangla** (`bn`). A button changes the language to **English** (`en`) and back.
- Every text changes: title, placeholder, welcome message, buttons, categories and answers.
- Keep all UI text in 1 object: `UI = { bn: {…}, en: {…} }`.

### 4.3 Welcome and quick actions
- Show a welcome message when the window opens.
- Show 4 quick-action buttons that open real pages on `bb.org.bd` in a new tab:
  - Exchange rate
  - File a complaint
  - Licensed banks
  - Contact Bangladesh Bank

### 4.4 Categories and suggested questions
- Show category tabs: **All**, **Customer**, **Business**, **Investor**.
- Under the tabs, show 3 suggested questions as clickable chips. They change with the category.
- After each answer, show new suggestions that do not repeat the last question.

### 4.5 Questions and answers
- Keep the data in 1 object: `QA = { bn: [ … ], en: [ … ] }`.
- Each item has: `q` (question), `tags` (keywords), `category` and `a` (answer as simple HTML).
- Write at least 25 items in each language. Cover these topics:
  - What Bangladesh Bank is and what it does
  - Exchange rate and foreign exchange reserves
  - Monetary policy, interest rate and inflation
  - Sanchayapatra (savings certificates), NRB bonds, Wage Earner bond, US Dollar bond
  - How to open a bank account and a mobile banking account
  - How to file a complaint about a bank
  - Remittance from abroad
  - Bank and NBFI licences, the list of licensed banks
  - New notes, coins and fake note detection
  - Contact details and the hotline `16236`
- Use short answers with emoji bullets, bold key words and 1 link to the real page.

### 4.6 Answer search
- Match the user's text against `q` and `tags`. Give a score for each item. Return the best match.
- It must work with Bangla and English text, and with mixed text such as "NRB bond কী?".
- When no item matches, show a polite fallback with the hotline `16236` and a link to the website.

### 4.7 "Thinking" effect
- Before each answer, show a typing indicator for about 1.5 seconds.
- Rotate short status lines, for example "🔍 Searching for information…" and "🧠 Preparing the answer…".
- This makes the demo feel like a real assistant.

### 4.8 Input
- Press **Enter** or click **Send** to send. Ignore empty text.
- Show the time on each message.
- Focus the input box when the window opens.

---

## 5. Rules

1. Plain JavaScript only. No framework, no library, no external file, no CDN.
2. Put all CSS in 1 `<style>` tag. Prefix every id and class with `bb-` so it never clashes with the site.
3. Use a high `z-index` so the chatbot stays above the site's menus.
4. Do not send any data anywhere. The prototype makes no network request.
5. Text must be readable: contrast 4.5 : 1 or more, and every button has a label for screen readers.

---

## 6. How I show the demo

1. Open `https://www.bb.org.bd` in Chrome.
2. Open DevTools (`Cmd + Option + J` on Mac, `Ctrl + Shift + J` on Windows).
3. Paste all of `chatbot-script.js` into the console. Press Enter.
4. Click the green button at the bottom right.
5. Ask "বাংলাদেশ ব্যাংক কী?". Then change to English and ask "What is NRB Bond?".

---

## 7. Check it before you finish

Use Chrome DevTools MCP to test the script on the real site:

- [ ] The script loads with no console error, and the success log shows.
- [ ] The button opens and closes the window.
- [ ] The language button changes all text between Bangla and English.
- [ ] Each category shows its own suggestions.
- [ ] 5 Bangla and 5 English questions give the correct answer.
- [ ] An unknown question shows the fallback with `16236`.
- [ ] The 4 quick-action links open the correct pages.
- [ ] A second paste does not make a second chatbot.
- [ ] The chat looks correct at 1280 px and at 375 px width. Take a screenshot of each.

---

## 8. What to say after the demo

"This took minutes, not weeks. It is a prototype to agree on the idea.
The next step is to connect it to a real AI model and the bank's official content, with security review and approval."
