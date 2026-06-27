# Chapter 8: Cursor Browser - Inspect & Edit

## Overview

Cursor has a built-in browser that allows you to visually inspect elements on your web application and directly reference them in the AI chat. This enables a powerful workflow where you can point at UI elements and ask the AI to modify them.

---

## Task 1: Browser Basics

### Sub Task 1.1: Open Cursor Browser
- **Ensure the frontend is running:** `cd frontend && npm run dev` (if not already)
- **Open Cursor Browser:** Press `Cmd+Shift+B` (or use Command Palette → "Cursor: Open Browser")
- **Navigate to:** `http://localhost:3001`
- **Verify:** The Task Manager frontend loads in Cursor's built-in browser

### Sub Task 1.2: Explore the Browser Interface
- **Notice the browser toolbar:**
  - URL bar for navigation
  - Refresh button
  - **Inspect tool** (crosshair/pointer icon) ← This is the key feature!
- **Verify:** Browser renders the page similar to Chrome/Safari

---

## Task 2: Inspect & Select Elements

### Sub Task 2.1: Activate Inspect Mode
- **Click the Inspect tool** (crosshair icon) in the browser toolbar
- **Hover over elements** on the page
- **Notice:** Elements highlight as you hover over them

### Sub Task 2.2: Select a Target Element
- **While in Inspect mode, click on a visible `<div>` element** (e.g., a card, container, or header section)
- **Verify:** The element gets selected
- **Notice:** Cursor's Agent panel now shows the selected element context
  - The corresponding code file may open automatically
  - The element reference is added to the chat context

### Sub Task 2.3: Understand the Context
- **Look at the Agent chat panel**
- **Verify:** The selected element's:
  - HTML structure is visible
  - File path is referenced (e.g., [`@frontend/src/app/page.tsx`](../../frontend/src/app/page.tsx))
  - CSS classes/styles are shown

---

## Task 3: Modify UI with AI

### Sub Task 3.1: Change Element Color
- **With the element still selected in context**
- **In the Agent chat, type:**
    ```text
    Change the background color of this element to a vibrant purple (#8B5CF6)
    ```
- **Verify:** AI identifies the correct file and CSS/Tailwind class
- **Accept the suggested changes**

### Sub Task 3.2: Verify in Browser
- **Look at the Cursor Browser**
- **Verify:** The element's color updates automatically (hot reload)
- **If not updated:** Click the Refresh button in the browser toolbar

### Sub Task 3.3: Try Another Modification
- **Select a different element** (e.g., a button or text heading)
- **Type in Agent chat:**
    ```text
    Make this element have rounded corners and add a subtle shadow
    ```
- **Verify:** AI modifies the correct styles
- **Accept and verify** the visual change in the browser

---

## Task 4: Advanced Browser Workflow

### Sub Task 4.1: Multi-Element Selection
- **Inspect and select one element**
- **Hold Shift and select another element** (if supported)
- **Ask AI:** "Make these two elements have consistent styling"
- **Verify:** AI understands the context of multiple elements

### Sub Task 4.2: Responsive Design Check
- **Resize the browser panel** to simulate mobile width
- **Select an element that looks broken on mobile**
- **Ask AI:** "Fix the responsive layout for this element on mobile"
- **Verify:** AI adds proper responsive Tailwind classes or media queries

---

## Summary

**Browser Feature Working If:**
- ✅ Can open built-in browser with `Cmd+Shift+B`
- ✅ Can navigate to localhost application
- ✅ Inspect tool highlights elements on hover
- ✅ Clicking an element adds it to Agent context
- ✅ AI can identify and modify the correct file/styles
- ✅ Changes reflect in browser after hot reload

---

## Tips

- **Keyboard Shortcut:** `Cmd+Shift+B` toggles the browser panel
- **Quick Inspect:** You can also right-click elements → "Inspect with Cursor"
- **File Jumping:** After selecting an element, the source file often auto-opens
- **Context is Key:** The more specific your element selection, the better AI can target the exact code
