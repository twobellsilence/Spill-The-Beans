# Question bank expansion and Little Ones validation

Validated on 11 October 2026 against main commit `181a0b02fd99fc652dadf35a8c685edeaecafa76`.

## Counts

| Mode | Category | Original | Final | Little Ones |
| --- | --- | ---: | ---: | ---: |
| Family Time | Laugh Out Loud | 20 | 60 | 20 |
| Family Time | Imagine That! | 20 | 60 | 20 |
| Family Time | Heart to Heart | 20 | 60 | 20 |
| Family Time | Family Stories | 20 | 60 | 20 |
| Family Time | Big Questions | 20 | 60 | 20 |
| Family Time | Faith & Values | 20 | 60 | 20 |
| Friends & Gatherings | Would You Rather? | 20 | 40 | — |
| Friends & Gatherings | Ridiculous Debates | 20 | 40 | — |
| Friends & Gatherings | What If? | 20 | 40 | — |
| Friends & Gatherings | Confessions & Surprises | 20 | 40 | — |
| Friends & Gatherings | Deep Conversations | 20 | 40 | — |
| Friends & Gatherings | Throwbacks & Memories | 20 | 40 | — |
| Work & Teams | Quick Icebreakers | 20 | 40 | — |
| Work & Teams | Laugh Together | 20 | 40 | — |
| Work & Teams | Get to Know You | 20 | 40 | — |
| Work & Teams | Team Connections | 20 | 40 | — |
| Work & Teams | Reflect & Grow | 20 | 40 | — |
| Work & Teams | Future Possibilities | 20 | 40 | — |
| **Total** | | **360** | **840** | **120** |

Every category has at least doubled. Family has 360 cards; Friends and Work have 240 each. The 120 dedicated preschool cards are additional to the 360 general additions. Little Ones All Categories offers 100 cards; explicitly selecting Faith & Values offers the remaining 20. Every Family category retains 24 All Ages cards, 28 Kids cards and 40 Adults cards. All Ages and home Surprise Me exclude dedicated preschool prompts.

## Content and editorial review

All 360 original cards, IDs and metadata were compared with the baseline and preserved unchanged. New general IDs end in 21–40; preschool IDs end in 41–60 within each Family category.

The additions were read alongside the original bank for suitability, clear wording, category fit and repeated ideas. Overlapping drafts were rewritten, including duplicate questions about changed working styles, team handovers, remembering people, dramatic sports commentary, family sayings, success, friendship and prayer. Exact text and normalized case/punctuation checks find no duplicates. A pairwise meaningful-word overlap screen was also inspected; its remaining high-overlap pairs concern different situations (a power cut versus an outing, and building versus learning). This screen assists editorial review; it is not a proof that all possible semantic similarities are absent.

Preschool prompts use familiar toys, animals, meals, places and feelings, with short sentences (at most 20 words). Actions, gestures, choosing, sound effects and adult read-aloud participation are welcome. They do not require reading, factual recall or abstract moral dilemmas. The category uses a dedicated `little` marker rather than relabelling the older-child bank.

There are **47 new** explicit year-end/New Year prompts and one existing coming-year prompt: **48 total**, approximately 5.7% of the bank. They are distributed across every existing category: Family 22, Friends 12, Work 14, including 10 preschool prompts. Themes include funny moments, shared memories, kindness, gratitude, gentle learning, outings, adventures and team cooperation. No seasonal UI or filter was added. Christian content remains in the optional Faith & Values category. Singapore and pop-culture references remain a minority.

## Tests actually run

- `npm test`: both test files passed. Direct runs of `node tests/core.test.js` and `node tests/expansion.test.js` passed all **17 individual tests**.
- Every mode/category/audience combination has eligible cards with matching metadata. Unique IDs, normalized text, seasonal distribution, preschool coverage and saved original IDs are checked.
- Repeat prevention, pool exhaustion, reshuffling, storage sanitation, favourites/history persistence, separate mode preferences and sharing fallbacks passed.
- `npm run build`: passed with **840 distinct cards**, relative asset paths, `.nojekyll` and a generated service-worker fingerprint. Build validation enforces the expanded counts, ID uniqueness and preschool minimums.
- `npm run test:browser`: **15 browser checks passed**, against the final production build at `/Spill-The-Beans/` and the domain root. No browser runtime errors occurred.
- Browser checks cover all 18 categories and 14 audience options, all six preschool categories through contextual Surprise Me, persisted Little Ones selection and original favourite/history entries.
- No horizontal overflow at **320, 375, 390, 414, 768 and 1440 pixels**, across home, selection, questions, favourites and history. Preschool cards were checked at 390 pixels.
- A 28-card Kids pool exhausted without repeats, stayed exhausted across reload and reshuffled explicitly.
- Service-worker cache contains the expansion module. Offline reload, next question and mode changes passed.

## Compatibility and limitations

The storage key and schema, core eligibility/rotation implementation, CSS, three modes, 18 categories, sharing, deployment workflow, manifest and icons remain intact. The home question count now derives from the bank. The new data module is both precached and included in the production fingerprint, so the existing service-worker activation mechanism receives a new cache version after deployment.

Mobile verification used Chromium viewport emulation, not a physical iPhone or Safari/WebKit. Native iOS installation/share behavior and a live old-to-new service-worker deployment were not exercised. Preschool suitability is an editorial assessment rather than a child usability study; adults can adapt delivery to their child.

The GitHub Pages workflow still tests/builds pull requests and publishes only after merging into main. The live deployment must be confirmed after merge by the green deploy job; this change does not modify the existing site settings.
