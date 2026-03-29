# Submerged Sanctuary

Production-ready Expo + TypeScript scaffold for a meditation and relaxation app across iOS and Android.

## Stack

- Expo + React Native
- TypeScript
- React Navigation
- Zustand + AsyncStorage persistence
- `expo-av` audio playback
- Clean custom style system inspired by the provided "Submerged Sanctuary" design specs

## Features

- Auth flow with sign in, sign up, forgot password, guest entry, and reusable success state
- React Hook Form + Zod validation for auth forms
- Persisted local auth session with Zustand + AsyncStorage
- Home, Explore, Player, Session, and Profile screens
- Featured tracks, categories, favorites, and continue listening
- Centralized audio service with:
  - play / pause
  - seek / scrub
  - volume control
  - loop toggle
  - sleep timer
  - last played persistence
  - single active track at a time
- Guided meditation session with pulsing breathing orb
- Zustand persistence for favorites, recents, player state, and settings
- Data layer isolated in `src/data` for future API replacement

## Setup

```bash
npm install
npm run start
```

Run native targets:

```bash
npm run ios
npm run android
```

## Project Structure

```text
src/
  schemas/      Zod form schemas
  components/   Reusable UI pieces
  data/         Local mock tracks and session data
  hooks/        App-facing hooks
  navigation/   Stack + tab navigation
  screens/      Screen-level UI
  services/     Centralized audio engine
  store/        Zustand global state and auth session
  theme/        Design tokens
  types/        Shared TypeScript types
  utils/        Formatting and helpers
```

## Notes

- Audio URLs and artwork are mock remote assets for development.
- `app.json` includes iOS background audio support.
- Auth is mocked today but isolated in `src/services/authService.ts` and `src/store/useAuthStore.ts` for backend replacement later.
- The current implementation defaults to the dark visual system from the supplied designs, with a persisted theme preference ready for further expansion if a broader light palette is required.

## Validation

Static verification was prepared through `npm run typecheck`, but dependencies were not installed in this workspace, so runtime verification was not executed here.
