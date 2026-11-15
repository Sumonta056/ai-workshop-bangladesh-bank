# Chapter 13: Agent Browser Automation

In this chapter, we will explore **agent-browser** — a CLI tool that gives Claude Code the ability to control a real web browser. We will use it to automate browser interactions against our Doctor-Patient Management System.

### We will cover

1. Installing and configuring agent-browser as a Claude Code skill
2. Automating login, navigation, form submission, and visual QA
3. Responsive design testing across multiple viewports

---

## Setup

### Step 1: Install agent-browser globally

```bash
# Global install
pnpm add -g agent-browser

# Or local to current repo only
pnpm add -D agent-browser
```

### Step 2: Download browser (if needed)

```bash
agent-browser install
```

> This downloads Chromium. If you already have Chrome/Brave installed, it auto-detects them.

### Step 3: Install the Claude Code skill

```bash
Install skills

npx skills add https://github.com/vercel-labs/agent-browser --skill agent-browser
```

### Step 4: Verify installation

```bash
agent-browser open http://localhost:3000 && agent-browser snapshot
```

---

## How It Works

agent-browser assigns **element references** (`@e1`, `@e2`, `@e3`...) to interactive elements on the page. You use these refs to click, type, and interact. After any navigation, take a new `snapshot` to get fresh refs.

```
open URL → snapshot → interact with @refs → snapshot again → verify
```

### Running in Headed Mode (Visible Browser)

By default, agent-browser runs **headless** (no visible window). To **see the automation happen in real-time**, use the `--headed` flag:

```bash
# Run login automation with visible browser
agent-browser --headed open http://localhost:3000/login
agent-browser --headed snapshot -i
agent-browser --headed fill @e8 "admin@clinic.com"
agent-browser --headed fill @e9 "password123"
agent-browser --headed click @e7
agent-browser --headed wait --load networkidle
agent-browser --headed screenshot ./screenshots/login-success.png
```

> **Note:** Once the daemon starts, subsequent `--headed` flags are ignored (the browser persists). To restart with a different mode, run `agent-browser close --all` first.

---

## Prompts for Doctor-Patient App

> Make sure your app is running first: `cd doctor-patient-app && pnpm dev`

### Prompt 1: Login Flow Automation

**Headless Mode (default):**
```bash
agent-browser open http://localhost:3000/login && \
agent-browser snapshot -i && \
agent-browser fill @e8 "admin@clinic.com" && \
agent-browser fill @e9 "password123" && \
agent-browser click @e7 && \
agent-browser wait --load networkidle && \
agent-browser snapshot -i && \
agent-browser screenshot ./screenshots/login-success.png
```

**Headed Mode (watch it happen):**
```bash
# Close any existing session first
agent-browser close --all

# Run in headed mode with visible browser
agent-browser --headed open http://localhost:3000/login && \
agent-browser --headed snapshot -i && \
agent-browser --headed fill @e8 "admin@clinic.com" && \
agent-browser --headed wait 1000 && \
agent-browser --headed fill @e9 "password123" && \
agent-browser --headed wait 1000 && \
agent-browser --headed click @e7 && \
agent-browser --headed wait --load networkidle && \
agent-browser --headed screenshot ./screenshots/login-success.png
```

**Steps:**
1. Open http://localhost:3000/login
2. Take a snapshot to identify the form fields
3. Fill in the email field with "admin@clinic.com"
4. Fill in the password field with "password123"
5. Click the login/submit button
6. Wait for navigation to complete
7. Take a snapshot of the dashboard to confirm successful login
8. Take a screenshot and save it to ./screenshots/login-success.png

### Prompt 2: Dashboard Visual QA

```
Using agent-browser, verify the dashboard page of our doctor-patient app:

1. Open http://localhost:3000/login and log in with admin@clinic.com / password123
2. Navigate to http://localhost:3000/dashboard
3. Take a full-page screenshot and save to ./screenshots/dashboard-full.png
4. Take a snapshot and extract:
   - Number of cards/widgets visible
   - Any chart or graph components
   - Sidebar menu items
5. Report what you see on the dashboard
```

### Prompt 3: Doctors List — CRUD Walkthrough

```
Using agent-browser, test the Doctors List page (make sure to run this in headed mode to see the interactions):

0. Always clear the Email and Password field before filling the new credential. As we might have auto fill enabled.
1. Log in to http://localhost:3000/login (admin@clinic.com / password123)
2. Navigate to http://localhost:3000/doctors
3. Take a snapshot — list all doctors currently shown
4. If there's an "Add Doctor" button, click it
5. Fill in the form with test data:
   - Name: "Dr. Test Browser"
   - Specialization: "Automation"
   - Email: "dr.test@clinic.com"
6. Submit the form
7. Take a snapshot to confirm the new doctor appears in the list
8. Take a screenshot and save to ./screenshots/doctors-crud.png
```

### Prompt 4: Patient List Navigation & Data Extraction

```
Using agent-browser, extract patient data from the app:

1. Log in and navigate to http://localhost:3000/patients
2. Take a snapshot of the patients list
3. Extract the text content of the patient table/list
4. Count total patients displayed
5. If pagination exists, navigate to page 2 and extract that data too
6. Save a screenshot to ./screenshots/patients-list.png
7. Summarize the patient data you found
```

### Prompt 5: Sidebar Navigation Test

```
Using agent-browser, verify all sidebar navigation links work:

1. Log in to the app at http://localhost:3000
2. Take a snapshot to identify all sidebar menu items
3. Click each sidebar link one by one:
   - Dashboard
   - Doctors
   - Patients
   - Appointments
   - Prescriptions
   - Settings
4. After clicking each link, take a snapshot to confirm the page loaded
5. Report which pages loaded successfully and which had errors
6. Save a final screenshot to ./screenshots/sidebar-nav-complete.png
```

### Prompt 6: Settings — Dark Mode Toggle

```
Using agent-browser, test the dark mode toggle in settings:

1. Log in and navigate to http://localhost:3000/settings
2. Take a screenshot as ./screenshots/settings-light.png
3. Find and click the dark mode toggle
4. Take a screenshot as ./screenshots/settings-dark.png
5. Use the visual diff feature to compare the two screenshots
6. Report what changed between light and dark mode
```

### Prompt 7: Responsive Design Check

```
Using agent-browser, test responsive layouts of our doctor-patient app:

1. Log in to the app
2. Navigate to the dashboard
3. Set viewport to desktop (1920x1080) and screenshot as ./screenshots/responsive-desktop.png
4. Set viewport to tablet (768x1024) and screenshot as ./screenshots/responsive-tablet.png
5. Set viewport to mobile (375x812) and screenshot as ./screenshots/responsive-mobile.png
6. For each viewport, take a snapshot and note:
   - Is the sidebar collapsed or visible?
   - Are charts/cards stacking properly?
   - Any overflow or layout issues?
7. Summarize responsive behavior across all breakpoints
```

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `agent-browser --headed open <url>` | **Open browser window (visible)** |
| `agent-browser open <url>` | Navigate to a URL (headless) |
| `agent-browser close --all` | Close all sessions and restart fresh |
| `agent-browser snapshot` | Get text snapshot with element refs |
| `agent-browser snapshot -i` | Interactive elements only |
| `agent-browser screenshot [path]` | Capture screenshot |
| `agent-browser click @e1` | Click an element |
| `agent-browser fill @e2 "text"` | Clear and fill input |
| `agent-browser select @e3 "option"` | Select dropdown value |
| `agent-browser scroll down` | Scroll the page |
| `agent-browser text @e4` | Extract text from element |
| `agent-browser wait 2000` | Wait N milliseconds |
| `agent-browser wait --load networkidle` | Wait for page load |
| `agent-browser url` | Get current page URL |
| `agent-browser viewport 375 812` | Set viewport size |
| `agent-browser screenshot --full` | Full page screenshot |
| `agent-browser save-state login` | Save auth session |
| `agent-browser load-state login` | Restore auth session |

---

## Tips

- **Always snapshot after navigation** — element refs invalidate after page changes
- **Save auth state** once, then `load-state` to skip login in future runs
- **Create screenshots directory** first: `mkdir -p screenshots`
- **Chain commands** with `&&` for faster execution
- **Use `--headed` flag to see automation** — runs browser with visible window for debugging and demos
- **Close existing session** before restarting in different mode: `agent-browser close --all`
- **Add wait pauses** between interactions in headed mode for easier visual tracking: `agent-browser wait 1000` (1 second)

---

References:

https://skills.sh/vercel-labs/agent-browser/agent-browser
https://github.com/vercel-labs/agent-browser
