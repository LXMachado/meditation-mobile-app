# AGENT.md

This document is a working guide for coding agents contributing to **Submerged Sanctuary** (`/workspace/meditation-mobile-app`).

## 1) Project Snapshot

- **App type:** Expo + React Native meditation app for iOS/Android (with web support available through Expo).
- **Language/runtime:** TypeScript + React 19 + React Native 0.79.
- **Navigation:** Native stack + bottom tabs via React Navigation.
- **State management:** Zustand stores with AsyncStorage persistence.
- **Audio:** `expo-av` service layer with app-level playback state.
- **Validation/forms:** React Hook Form + Zod.

Start from `README.md` and `package.json` if you need a fast orientation.

## 2) Repository Map

Top-level directories/files to know first:

- `App.tsx`: root app shell.
- `src/navigation/`: root stack, auth stack, tab navigator, route types.
- `src/screens/`: screen-level UI and orchestration.
- `src/components/`: reusable UI primitives and composed pieces.
- `src/store/`: Zustand stores (`useAppStore`, `useAuthStore`) and persistence behavior.
- `src/services/`: side-effectful integration layers (auth, audio).
- `src/hooks/`: glue hooks that bridge services/stores/UI (`useAudioPlayer`, `useAuthSession`).
- `src/data/`: local mock content (tracks, categories) used by screens/services.
- `src/schemas/`: Zod schemas used by auth and form validation.
- `src/theme/`: color/spacing/typography tokens.
- `src/types/`: shared TS domain types and auth types.
- `src/utils/`: pure utility helpers and formatting.
- `design/`: static design references/spec artifacts.

## 3) Architecture and Data Flow

Use this mental model before changing code:

1. **Screen** handles user interaction.
2. Screen calls **hook** or **store action**.
3. Hook may call **service** for side effects.
4. Result updates **Zustand store**.
5. Persisted store slices survive restarts via AsyncStorage.

### Important stores

- `useAuthStore`
  - Owns auth status (`anonymous`/`guest`/`authenticated`), user info, hydration marker.
  - Persists only status + user.
- `useAppStore`
  - Owns player/UI preferences (favorites, recent tracks, volume, loop, sleep timer, theme, etc.).
  - Persists non-ephemeral app state slices.

### Navigation behavior

- App boots and waits for auth hydration.
- Anonymous users go through Auth stack.
- Non-anonymous users land in Tabs stack with access to Session screen.

## 4) Local Development Workflow

### Setup

```bash
npm install
npm run start
```

### Useful scripts

- `npm run start` – Expo dev server.
- `npm run ios` – run native iOS target.
- `npm run android` – run native Android target.
- `npm run web` – run Expo web target.
- `npm run typecheck` – TypeScript checks (`tsc --noEmit`).
- `npm run test` – Jest tests.
- `npm run test:watch` – Jest watch mode.

### Expected contribution routine

1. Read related screen/store/service/types before coding.
2. Implement smallest safe change.
3. Run at minimum:
   - `npm run typecheck`
   - `npm run test` (or targeted jest tests if scope is narrow)
4. Verify no accidental regressions in navigation/auth/audio flows.
5. Keep commits focused and descriptive.

## 5) Coding Conventions

Follow existing style in nearby files.

- Prefer **typed, explicit interfaces/types** in `src/types` when a concept is shared.
- Keep **business logic out of components** when possible (move to hooks/services/store actions).
- Use **theme tokens** (`src/theme/theme.ts`) rather than hardcoding design values unless truly one-off.
- Avoid introducing extra dependencies unless needed and justified.
- Favor **pure utilities** in `src/utils` for deterministic logic (easy to unit-test).
- For form changes:
  - Add/adjust Zod schema in `src/schemas`.
  - Keep input field behavior and schema validation consistent.
- For persistent store changes:
  - Update `partialize` shape deliberately.
  - Consider migration implications for existing AsyncStorage keys.

## 6) Testing Guidance

### Current test layout

Tests already exist for:

- stores (`src/store/__tests__`)
- schemas (`src/schemas/__tests__`)
- services (`src/services/__tests__`)
- data (`src/data/__tests__`)
- utils (`src/utils/__tests__`)

### When adding/changing logic

- Add unit tests for:
  - new utility logic,
  - store action behavior,
  - schema constraints,
  - service edge cases.
- Prefer deterministic tests; mock network/time/audio dependencies as needed.
- If changing navigation/auth gating behavior, include tests near affected hooks/stores and smoke-test manually.

## 7) High-Risk Areas (Be Careful)

- **Persistence keys and store shapes:** changing them can break existing sessions/favorites.
- **Audio lifecycle:** ensure one active track and stable play/pause/seek semantics.
- **Auth hydration gating:** avoid introducing flicker or wrong initial route.
- **Theme mode behavior:** dark/light branching currently exists in navigation and screen styles.

## 8) UI/UX Implementation Notes

- Use `design/` artifacts as visual references.
- Keep spacing/radius/typography aligned with `theme` tokens.
- Preserve accessibility basics:
  - touch target size,
  - readable contrast,
  - sensible labels for controls.

## 9) Agent Checklist Before Opening a PR

- [ ] Scope understood and reflected in changed files only.
- [ ] TypeScript passes (`npm run typecheck`).
- [ ] Jest passes (`npm run test`) or clearly documented why not.
- [ ] New logic has tests when appropriate.
- [ ] No dead code, unused imports, or debug logs.
- [ ] Commit message clearly summarizes intent.
- [ ] PR body includes summary, testing, and risk notes.

## 10) Suggested Commit/PR Format

### Commit message template

```text
<area>: <concise change summary>
```

Examples:

- `auth: tighten sign-up validation messaging`
- `player: persist sleep timer toggle behavior`
- `explore: add category card empty-state handling`

### PR body template

1. **What changed** (bullets)
2. **Why** (user/developer impact)
3. **Testing performed** (commands + outcome)
4. **Risks / follow-ups**

## 11) If You Are Unsure

- Read the nearest existing implementation and follow its pattern.
- Prefer small, reversible changes.
- Document assumptions in the PR body.
- Do not refactor unrelated files opportunistically.

---

Maintainers can evolve this guide as architecture and tooling change.
