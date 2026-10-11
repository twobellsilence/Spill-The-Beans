# Release validation

Validated on 11 October 2026. Tests were run against the production build at `/Spill-The-Beans/`, with additional checks at the domain root.

## Automated logic and content checks

`npm test` and `node tests/core.test.js` completed successfully: **12 checks passed**.

- Exactly **360 distinct questions**, **120 per mode**, **20 per category**, with stable unique IDs.
- Every combination of category and audience filter has eligible questions: **91 combinations**, including All Categories.
- Faith & Values appears only when explicitly selected. Home Surprise Me is broad and includes all three modes.
- Each family category offers 12 mixed-age prompts, 14 eligible for Kids and 20 eligible for Adults, with intermediate filters and age-specific prompts.
- Pools exhaust without repeats, respect overlap between filters, persist seen cards and support explicit resets.
- Favourites, history ordering and preferences persist. Invalid stored IDs, duplicates, corrupted JSON, unsupported versions and storage denial are handled safely.
- Native sharing, cancellation, clipboard fallback and manual text fallback are exercised through test doubles. Shared URLs retain the GitHub Pages subpath.
- Editorial checks found **6 local Singapore/hawker/MRT references**, **5 pop-culture or football references** and **14 directly interactive prompts**. These keyword counts overlap; they are review aids, not exclusive labels. The majority is universally relatable. No knowledge questions, scoring or leaderboard mechanics.
- Manifest, PNG icon sizes, relative URLs, service-worker assets and Pages workflow configuration are validated.

## Production build

`npm run build` completed successfully. It outputs the static app, all local questions, CSS, manifest, PNG and SVG icons, and a service worker with a content-based cache version. No dependency download or API key is needed.

## Browser QA

A real headless Chromium browser was used with Playwright. **14 browser checks passed**:

1. Production app loads under `/Spill-The-Beans/`.
2. No horizontal overflow at **320, 375, 390, 414, 768 and 1440 pixels** across home, selection, question, favourites and history screens.
3. All three modes, 18 categories and 13 audience options open working questions through the UI.
4. Home Surprise Me produces fresh broadly suitable cards and excludes faith prompts.
5. Favourites persist through reload, revisit with Back navigation, remove correctly and show a useful empty state.
6. Shared direct question links open correctly; history supports revisit, clear confirmation, cancellation and rotation reset.
7. A 14-card pool reaches exhaustion without duplicates, stays exhausted after reload and can explicitly reshuffle.
8. Manual sharing fallback displays the question and a correct selectable direct link.
9. Install instructions, native dialog Escape, skip navigation and keyboard focus work.
10. Corrupted local storage recovers to a usable app.
11. The service worker controls and caches the production app; offline reload, Next Question and switching modes continue to work.
12. No browser JavaScript runtime errors during the suite.
13. Unavailable browser storage preserves in-memory favourites for the current visit.
14. Relative assets and navigation also work at a domain root.

Desktop and mobile screenshots were visually reviewed. Visual fixes included preventing home illustration/text overlap on narrow screens and using SVGs for reliable share/shuffle icons. Controls provide visible focus; motion is disabled when reduced motion is requested. Mobile navigation includes iPhone safe-area padding.

### Reproduce browser checks

With the production preview server running in one terminal, run these commands in another terminal. Python, Playwright and Chromium are optional QA tooling, not app dependencies.

```sh
python -m pip install playwright
python -m playwright install chromium
npm run test:browser
```

The script uses an installed `chromium` if available, otherwise Playwright’s Chromium. Optional variables: `CHROMIUM_PATH`, `QA_BASE_URL`, and `QA_OUTPUT_DIR`. Results and screenshots are written to ignored `work/browser-qa/` by default.

## Verification limits

- Mobile checks used Chromium viewport emulation, not a physical iPhone or Safari/WebKit. Actual iPhone Home Screen installation and the native iOS share sheet were not tested.
- Accessibility checks covered semantic elements, labels, focus, keyboard operation, dialog behavior, reduced-motion CSS and overflow. No screen-reader session or formal accessibility audit was performed.
- GitHub Pages configuration was reviewed. The production website is not live until the pull request is merged and the repository owner enables GitHub Actions as the Pages source. A live deployment must be confirmed by its green deploy job and returned URL.
- Offline use needs a successful online visit. Browser storage and caches can be cleared or evicted by the device; collections do not sync between devices.
