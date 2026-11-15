# PROMPT — Deploy Phase: Claude Runs Operations

Act as a senior DevOps engineer. The website is the Nuxt static site in `Bangladesh Bank New Website/`.
Hosting: GitHub Pages. CI/CD: GitHub Actions. Use the `gh` CLI and Chrome DevTools MCP.

---

## Prompt 1 — Deploy

Deploy the Bangladesh Bank website to GitHub Pages.

1. Check that it is ready: the build passes, `npm audit` has no high or critical issue, no secrets are in the code.
2. Create a GitHub Actions workflow that builds the site and deploys it on every push to `main`.
3. After the deploy, open the live URL and check all 5 pages load with no console errors.
4. Add a monitor bot that checks every page each hour.
5. Give me a rollback plan.

---

## Prompt 2 — Statistics

Give me a statistics report for the live website.

- Performance: Lighthouse scores for Performance, Accessibility, Best Practices and SEO.
- Speed: response time and time to first byte for each page.
- Weight: page size and number of requests.
- Traffic: visitors and page views from GitHub.
- Delivery: number of deploys, success rate and average build time.

---

## Prompt 3 — Logs

Check the logs of the website and tell me if anything is wrong.

- Build and deploy logs from the last runs.
- The monitor bot results: any page that was down or slow.
- The browser console on the live site.

Group the findings by severity: error, warning, info. For each problem, give the cause and the fix.

---

**Output for all 3 prompts:** one HTML page, `ops-console.html`, with a tab for Deploy, Statistics and Logs. Use only real data. Write the time of each measurement.
