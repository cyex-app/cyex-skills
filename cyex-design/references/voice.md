# cyex voice and UI copy

Copy is written like a person wrote it, not a template. Plain, concrete, checked against the product. Say a thing once.

## Rules

- **Sentence case** for everything a person reads: buttons, titles, menu items, headings. Uppercase only through CSS for tiny labels.
- **Product names lowercase**, always: `cyex deck`, `cyex logs`.
- **Short.** Cut words that don't change the meaning. Don't explain in prose what the UI already shows.
- **Second person**, everyday words: "your stream", "PC", "picture" (not "image"), "Sign in".
- **No emoji, no exclamation marks, no hype words** (seamless, powerful, blazing, unleash), no marketing triads ("fast, simple, and secure"), no metaphors.
- **Concrete claims only.** Numbers state their source: "From the app's own performance test on Windows 11, release build 2026/10/12."
- **Honest caveats:** "The installer isn't signed yet, so Windows SmartScreen may warn you."
- One sentence per paragraph on marketing pages.

## Typography in copy

- Curly apostrophes and quotes: `’ “ ”`.
- The ellipsis character `…`, only for in-progress states ("Loading…", "Adding…") and placeholders ("Search…").
- True minus `−` (U+2212) in numbers and steppers.
- Middle dot ` · ` joins items: "For Windows 10 and 11 · Open source".
- `×` for counts ("×3"), `→` for settings paths ("Settings → Emotes") and travelling links ("Open the logs →").
- No ` - ` dash splices in sentences. Use a full stop or a semicolon.

## Numbers, dates, times

| What | Format | Example |
|---|---|---|
| Thousands | dot groups | `40.000`, `1.000.000` |
| Decimals | comma | `1,5 MB`, `0,4 s` |
| Short numbers (views, viewers, followers) | comma, at most one decimal, rounded down, no space before K/M/B | `1,4K`, `42,1K`, `2M` |
| Units | space before | `150 MB`, `<2 %`, `1,2 s` |
| Measured durations (latency, buffer) | number, space, unit | `1,2 s`, `350 ms` |
| Dates | `yyyy/mm/dd` | `2026/10/23` |
| Times | 24-hour | `18:05` |

Hover on a date may spell the month out ("23 October 2026"). Reply threads within the same year may omit the year.

## Patterns

**Headlines (web):** short, declarative, ending in a full stop. Often two parts, the second softer: "All of Twitch." / "One light app." Questions are fine: "Not logging your channel yet?" The hero title itself has no full stop.

**Buttons:** a verb first, 1-3 words: Save, Add channel, Download for Windows, Try again, Copy link. Busy state with `…`: "Adding…". Done state, past tense, no tick character: "Copied".

**Menus:** a verb first where there is one, sentence case, no full stop. Order: main action, other actions, going somewhere, copy, switches. Red only for what can't be undone, and last in its group. A hint is a shortcut or current value, never an explanation.

**Toasts:**
- Success: past tense, short, full stop. "Poll started." "Request sent."
- Error: "Couldn’t X. Try again." or plain guidance: "Use a hex color like #145aff." Bold lead plus a detail line when there's more to say.

**Empty states:** short and conversational, with the next step when there is one. "Nothing matches." "No clips in this time." "Sign in to see your subscriptions."

**Tooltips:** the label always; the hint is one plain sentence saying what it does, shortcut in parentheses. "Jump to a tab or open a channel (Ctrl+K)."

**FAQ answers** start with the answer: "Yes." "No." "Not yet."

**Validation:** say what to do. "Enter a channel first." "That date is in the future. Pick today or earlier."

## Words we use

Block, Hide, Open on Twitch, Search…, Favorite / Unfavorite, Sign in, Opt out (two words as a verb), Add channel. Pick one wording per action and use it everywhere.
