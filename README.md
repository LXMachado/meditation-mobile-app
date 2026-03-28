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
  components/   Reusable UI pieces
  data/         Local mock tracks and session data
  hooks/        App-facing hooks
  navigation/   Stack + tab navigation
  screens/      Screen-level UI
  services/     Centralized audio engine
  store/        Zustand global state
  theme/        Design tokens
  types/        Shared TypeScript types
  utils/        Formatting and helpers
```

## Notes

- Audio URLs and artwork are mock remote assets for development.
- `app.json` includes iOS background audio support.
- The current implementation defaults to the dark visual system from the supplied designs, with a persisted theme preference ready for further expansion if a broader light palette is required.

## Validation

Static verification was prepared through `npm run typecheck`, but dependencies were not installed in this workspace, so runtime verification was not executed here.
