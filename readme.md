# Spill the Beans 🫘

Good conversations start here.

A conversation starter app for families, friends and workplace teams.

## Your first release

360 original questions, written for conversations rather than quizzes. Choose Family Time, Friends & Gatherings or Work & Teams, pick a category and audience, then start talking. There are 120 questions per mode and 20 per category.

- Family ages: Kids (5–9), Tweens (10–12), Teens (13–17), Adults and All Ages. All Ages uses prompts suitable for a mixed-age group; specific age filters also include those shared prompts.
- Friends: Just for Laughs, A Little of Both (all depths), or Let’s Go Deep.
- Work: New Teams, Established Teams, Team Retreats, Leadership Groups and All Work Settings. Universal work prompts are available in each specific setting.
- Optional Christian Faith & Values cards appear **only when that category is explicitly chosen**. All Categories and home Surprise Me never include them.
- Favourites, recent history and choices stay in browser storage on the current device. No account, database, advertising, tracking or external AI is needed.
- Random rotation remembers seen cards across visits and overlapping filters. When a pool is exhausted, reshuffle it explicitly. Clearing history resets rotation while keeping favourites.
- Native device sharing falls back to copying the question and a direct link. If clipboard access is unavailable, a selectable-text dialog makes manual copying possible.
- An installable, offline-ready web app with local icons and a service worker.

Everyone can pass on a question. Work prompts never require confidential details, public criticism or sensitive disclosures.

## Review and save the changes — no coding needed

1. Open the pull request linked in the delivery message.
2. Click **Files changed** to see everything that was added. The original README introduction is preserved above.
3. Check the **Test and publish GitHub Pages** checks on the pull request. They must finish successfully.
4. Click **Merge pull request**, then **Confirm merge**. This saves the application to the existing `main` branch. No new repository is needed.
5. You can delete the feature branch after merging if GitHub offers that button.

A pull request runs tests and builds the app but does not publish it. The merge into `main` triggers publishing, once Pages is enabled below.

## Publish your website with GitHub Pages

1. Open https://github.com/twobellsilence/Spill-The-Beans.
2. Click **Settings**, then **Pages** in the left menu.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**. You do not need to select a branch or folder.
4. Merge the app pull request if you have not already.
5. Open **Actions** and select **Test and publish GitHub Pages**. Wait for both **build** and **deploy** to turn green.
6. If you enabled Pages after merging, select the workflow, click **Run workflow**, choose `main`, then run it.
7. Open **https://twobellsilence.github.io/Spill-The-Beans/**. The Pages screen and deployment job will also show the exact live link.

If deployment says Pages is not enabled, repeat steps 2–3 and run the workflow again. Some repository or organisation policies may need the owner to enable Pages or approve the `github-pages` environment. Nothing in this app requires a paid service; GitHub Pages availability depends on your repository visibility and GitHub plan.

## Open and install on your iPhone

1. Open the live address above in **Safari**.
2. Browse a question while online so Safari can save the app for offline use.
3. Tap Safari’s **Share** icon (the square with an upward arrow).
4. Scroll down and choose **Add to Home Screen**.
5. Leave the name as **Spill the Beans**, turn on **Open as Web App** if offered, and tap **Add**.
6. Open the new icon from your Home Screen. You can now start conversations without an account.

The installed app and Safari may keep separate browser storage, depending on your iOS version. Save favourites in the place you intend to use. There is no cloud sync; clearing website data, switching browsers or using a new device will not preserve the collection. Offline availability requires a successful first online load and browser caching support.

## Run or maintain the code

This is a small static application using native JavaScript modules and CSS. Node.js 22 or later is needed for local tooling; there are **no npm dependencies to install**.

```sh
npm test
npm run build
npm run preview
```

Open http://localhost:4173/Spill-The-Beans/ to preview the production build. `npm run dev` serves the source with the same URL. Stop the server with Ctrl+C. Opening `index.html` by double-clicking is not supported because browsers restrict JavaScript modules on file URLs.

- `src/questions.js`: locally stored question bank, mode/category descriptions and audience metadata. Keep IDs stable to preserve favourites.
- `src/core.js`: eligibility, rotation, storage validation and sharing logic.
- `src/app.js`: screen rendering and accessible interactions.
- `src/styles.css`: mobile-first styling, visible focus and reduced-motion support.
- `public/`: app manifest and original locally generated icons.
- `sw.js`: offline app-shell caching, scoped to this site.
- `scripts/build.mjs`: validates question counts and writes the production files to `dist/`. The service worker receives a content fingerprint on every build so changes refresh its cache.
- `.github/workflows/deploy.yml`: tests pull requests; tests, builds and deploys `main` to Pages.
- `tests/core.test.js`: automated bank, filter, rotation, persistence, sharing and deployment checks.
- `QA.md`: the validation performed for this release, including limits.

All asset links, the manifest and service worker use relative URLs. This supports the requested `/Spill-The-Beans/` GitHub Pages path without a framework base-path setting. Hash navigation and shared question links need no server-side routing rules.

## Privacy and limits

Your history, preferences and favourites are saved only in this browser. If storage is denied, corrupted or full, the app keeps working in memory and explains that saving may be unavailable. No data leaves the app unless you choose to share a question. Device sharing may show other apps, depending on your browser. This release has no account, export/import or cross-device syncing.
