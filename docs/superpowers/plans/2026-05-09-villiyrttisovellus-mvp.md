# Villiyrttisovellus MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Finnish wild herb mobile app (Android-priority, iOS-compatible) with 12 carefully reviewed plants, offline-first, calm/natural visual identity.

**Architecture:** Expo + React Native + TypeScript with Expo Router file-based routing. NativeWind v4 for styling with system dark mode. Zustand for filter/search state. Zod-derived `Plant` type with safety-critical invariants validated at test-time. Local plant data + bundled WebP images, no network dependencies, no build-time image automation in MVP.

**Tech Stack:** Expo SDK (latest stable, locked at Task 1), TypeScript strict, Expo Router, NativeWind v4, Zustand, Zod, expo-image, react-native-reanimated v3, lucide-react-native, @expo-google-fonts/inter + Lora, Jest with `jest-expo` preset.

**Spec reference:** `docs/superpowers/specs/2026-05-09-villiyrttisovellus-design.md`
**Plant content reference:** `docs/plant-content-review.md`

---

## Conventions

- **Working directory:** `C:/Users/riku_/villiyrtit-app/` (already exists with `docs/`).
- **Package manager:** `pnpm`. `.npmrc` includes `node-linker=hoisted` for Expo compatibility.
- **Shell:** Bash (cross-platform; works in Git Bash on Windows).
- **Commits:** After each task. Conventional commits (`feat:`, `chore:`, `test:`, `fix:`, `docs:`).
- **TDD:** Strict for data/logic tasks. UI components skip snapshot tests per spec §11; manual verification on Android emulator.
- **Plan structure:** Sections 1–11 follow Riku's defined order: Setup → Schema → Invariants → Lib/state → UI components → Screens → Search/filter integration → Dark mode polish → Plants conversion → Android preview build → QA.
- **No image automation in MVP:** Wikimedia fetch script is v2. MVP uses manually placed webp files in `assets/plants/`.

---

# Section 1 — Project setup

## Task 1: Initialize git + Expo project

**Files:**
- Create: `package.json`, `tsconfig.json`, `app.json`, `babel.config.js`, `.gitignore`, `App.tsx` (replaced in Task 3)

- [ ] **Step 1.1: Initialize git in the existing project root**

```bash
cd C:/Users/riku_/villiyrtit-app
git init
git add docs/
git commit -m "chore: import design and plant content review docs"
```

- [ ] **Step 1.2: Initialize Expo project files into existing dir**

```bash
cd C:/Users/riku_
npx create-expo-app@latest villiyrtit-app-init --template blank-typescript --yes
shopt -s dotglob
mv villiyrtit-app-init/* villiyrtit-app/
shopt -u dotglob
rmdir villiyrtit-app-init
cd villiyrtit-app
```

Expected: `package.json`, `App.tsx`, `tsconfig.json`, `app.json`, `babel.config.js`, `assets/`, `node_modules/` exist alongside `docs/`.

- [ ] **Step 1.3: Record locked Expo SDK version in spec**

Open `package.json`, find the exact `expo` version (e.g., `^53.0.0`), and replace "uusin vakaa" in `docs/superpowers/specs/2026-05-09-villiyrttisovellus-design.md` §2 first row (Runtime) with the actual SDK number for traceability.

- [ ] **Step 1.4: Configure pnpm**

```bash
echo "node-linker=hoisted" > .npmrc
rm -rf node_modules package-lock.json
pnpm install
```

Expected: `pnpm-lock.yaml` created, no errors.

- [ ] **Step 1.5: Verify Expo doctor passes**

```bash
pnpm exec expo doctor
```

Expected: no critical errors. (Skip emulator boot check at this stage.)

- [ ] **Step 1.6: Commit**

```bash
git add .gitignore .npmrc package.json pnpm-lock.yaml tsconfig.json app.json babel.config.js App.tsx assets/
git commit -m "chore: bootstrap Expo TypeScript project"
```

---

## Task 2: Strict TypeScript + path alias

**Files:**
- Modify: `tsconfig.json`

- [ ] **Step 2.1: Update `tsconfig.json`**

Replace contents with:

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx", ".expo/types/**/*.ts", "expo-env.d.ts"]
}
```

- [ ] **Step 2.2: Verify typecheck**

```bash
pnpm exec tsc --noEmit
```

Expected: no errors.

- [ ] **Step 2.3: Commit**

```bash
git add tsconfig.json
git commit -m "chore: enable strict TypeScript with @/ path alias"
```

---

## Task 3: Expo Router minimal shell

**Files:**
- Modify: `package.json` (entry), `app.json` (scheme + plugin)
- Create: `app/_layout.tsx`, `app/index.tsx`, `app/+not-found.tsx`
- Delete: `App.tsx`

- [ ] **Step 3.1: Install Expo Router peer deps**

```bash
pnpm exec expo install expo-router react-native-screens react-native-safe-area-context expo-linking expo-constants expo-status-bar
```

- [ ] **Step 3.2: Update `package.json` entry**

Change `"main"` to `"main": "expo-router/entry"`.

- [ ] **Step 3.3: Update `app.json`**

Add under `expo` block:

```json
"scheme": "villiyrtit",
"plugins": ["expo-router"]
```

- [ ] **Step 3.4: Create `app/_layout.tsx`**

```tsx
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: 'transparent' },
          headerTitleStyle: { fontWeight: '500' },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="plants/index" options={{ title: 'Kasvit' }} />
        <Stack.Screen name="plants/[id]" options={{ title: '' }} />
      </Stack>
    </>
  )
}
```

- [ ] **Step 3.5: Create `app/index.tsx`**

```tsx
import { Text, View } from 'react-native'

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Villiyrtit</Text>
    </View>
  )
}
```

- [ ] **Step 3.6: Create `app/+not-found.tsx`**

```tsx
import { Link, Stack } from 'expo-router'
import { Text, View } from 'react-native'

export default function NotFound() {
  return (
    <>
      <Stack.Screen options={{ title: 'Ei löydy' }} />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <Text>Sivua ei löytynyt.</Text>
        <Link href="/" style={{ marginTop: 12 }}>
          <Text style={{ color: '#4A6741' }}>Takaisin etusivulle</Text>
        </Link>
      </View>
    </>
  )
}
```

- [ ] **Step 3.7: Delete legacy entry**

```bash
rm App.tsx
```

- [ ] **Step 3.8: Commit**

```bash
git add app/ package.json app.json
git rm App.tsx
git commit -m "feat: add Expo Router with minimal home and not-found screens"
```

---

## Task 4: NativeWind v4 + dark mode + theme tokens

**Files:**
- Create: `tailwind.config.js`, `metro.config.js`, `global.css`, `nativewind-env.d.ts`
- Modify: `babel.config.js`, `app/_layout.tsx`, `app/index.tsx`

- [ ] **Step 4.1: Install NativeWind + Tailwind**

```bash
pnpm add nativewind react-native-css-interop
pnpm add -D tailwindcss@^3.4.0 prettier-plugin-tailwindcss
```

- [ ] **Step 4.2: Create `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: { DEFAULT: '#FAF8F5', dark: '#0F1410' },
        surface: { DEFAULT: '#FFFFFF', dark: '#1A1F1A' },
        primary: { DEFAULT: '#4A6741', dark: '#9CB89A' },
        accent: { DEFAULT: '#A87344', dark: '#C49870' },
        ink: { DEFAULT: '#1F2419', dark: '#E8E5DD' },
        muted: { DEFAULT: '#5A6151', dark: '#9CA092' },
        danger: '#C8341B',
        warn: '#D4A012',
      },
      fontFamily: {
        sans: ['Inter_400Regular'],
        sansSemibold: ['Inter_600SemiBold'],
        sansBold: ['Inter_700Bold'],
        serif: ['Lora_400Regular'],
        serifBold: ['Lora_700Bold'],
      },
      borderRadius: {
        card: '16px',
        btn: '12px',
      },
      spacing: {
        touch: '48px',
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 4.3: Create `metro.config.js`**

```js
const { getDefaultConfig } = require('expo/metro-config')
const { withNativeWind } = require('nativewind/metro')

const config = getDefaultConfig(__dirname)

module.exports = withNativeWind(config, { input: './global.css' })
```

- [ ] **Step 4.4: Create `global.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 4.5: Update `babel.config.js`**

```js
module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
  }
}
```

- [ ] **Step 4.6: Create `nativewind-env.d.ts`**

```ts
/// <reference types="nativewind/types" />
```

- [ ] **Step 4.7: Wire into root layout**

Replace `app/_layout.tsx`:

```tsx
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'react-native'
import '../global.css'

export default function RootLayout() {
  const scheme = useColorScheme()
  return (
    <>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: 'transparent' },
          headerTitleStyle: { fontWeight: '500' },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="plants/index" options={{ title: 'Kasvit' }} />
        <Stack.Screen name="plants/[id]" options={{ title: '' }} />
      </Stack>
    </>
  )
}
```

- [ ] **Step 4.8: Update `app/index.tsx` to test NativeWind**

```tsx
import { Text, View } from 'react-native'

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center bg-canvas dark:bg-canvas-dark">
      <Text className="text-2xl text-ink dark:text-ink-dark">Villiyrtit</Text>
    </View>
  )
}
```

- [ ] **Step 4.9: Verify on emulator**

```bash
pnpm exec expo start --android --clear &
```

Confirm "Villiyrtit" renders. Toggle OS theme — colors should adapt. Stop server.

- [ ] **Step 4.10: Commit**

```bash
git add tailwind.config.js metro.config.js global.css babel.config.js nativewind-env.d.ts app/_layout.tsx app/index.tsx package.json pnpm-lock.yaml
git commit -m "feat: configure NativeWind v4 with theme tokens and dark mode"
```

---

## Task 5: Runtime deps + Jest

**Files:**
- Modify: `babel.config.js`, `package.json`
- Create: `jest.config.js`, `jest.setup.ts`, `tests/sanity.test.ts`

- [ ] **Step 5.1: Install runtime deps**

```bash
pnpm add zustand zod react-native-reanimated lucide-react-native
pnpm exec expo install expo-image @expo-google-fonts/inter @expo-google-fonts/lora expo-font expo-splash-screen
```

- [ ] **Step 5.2: Add Reanimated babel plugin**

Update `babel.config.js`:

```js
module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: ['react-native-reanimated/plugin'], // MUST be last
  }
}
```

- [ ] **Step 5.3: Install Jest deps**

```bash
pnpm add -D jest jest-expo @types/jest @testing-library/react-native @testing-library/jest-native ts-jest
```

- [ ] **Step 5.4: Create `jest.config.js`**

```js
module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEach: ['<rootDir>/jest.setup.ts'],
  testMatch: ['<rootDir>/tests/**/*.test.ts', '<rootDir>/tests/**/*.test.tsx'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-clone-referenced-element|@react-native-community|expo-modules-core|nativewind))',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}
```

- [ ] **Step 5.5: Create `jest.setup.ts`**

```ts
import '@testing-library/jest-native/extend-expect'
```

- [ ] **Step 5.6: Add scripts to `package.json`**

In `"scripts"`:

```json
"test": "jest",
"test:watch": "jest --watch",
"typecheck": "tsc --noEmit"
```

- [ ] **Step 5.7: Sanity test**

Create `tests/sanity.test.ts`:

```ts
describe('jest setup', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2)
  })
})
```

```bash
pnpm test
```

Expected: 1 passing.

- [ ] **Step 5.8: Commit**

```bash
git add jest.config.js jest.setup.ts babel.config.js package.json pnpm-lock.yaml tests/
git commit -m "chore: install runtime deps and configure Jest"
```

---

# Section 2 — Datamalli + Zod-schema

## Task 6: Plant Zod schema (TDD)

**Files:**
- Create: `src/data/plant.schema.ts`, `tests/plant.schema.test.ts`, `tests/fixtures/plant.ts`

- [ ] **Step 6.1: Fixture helper for valid plants**

Create `tests/fixtures/plant.ts`:

```ts
import type { Plant } from '@/data/plant.schema'

export const validPlantInput: Plant = {
  id: 'test-plant',
  finnishName: 'Testikasvi',
  latinName: 'Testus testus',
  shortDescription: 'Testikuvaus',
  description: 'Pidempi testikuvaus.',
  months: ['kesäkuu', 'heinäkuu'],
  habitats: ['niityt'],
  edibleParts: ['lehdet'],
  uses: ['salaatti'],
  tags: ['syötävä', 'lehti'],
  difficulty: 'easy',
  beginnerFriendly: true,
  safetyNote: 'Älä syö ennen varmaa tunnistusta.',
  warnings: [],
  lookalikes: [],
  image: 'plants/test-plant.webp',
  imageCredit: 'Testaaja',
  imageLicense: 'CC BY-SA 4.0',
  imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:test.jpg',
  sources: [
    { title: 'Pinkka', url: 'https://pinkka.helsinki.fi/virtuaalikasvio/', publisher: 'Helsingin yliopisto' },
  ],
}
```

- [ ] **Step 6.2: Failing tests**

Create `tests/plant.schema.test.ts`:

```ts
import { PlantSchema } from '@/data/plant.schema'
import { validPlantInput } from './fixtures/plant'

describe('PlantSchema', () => {
  it('parses a valid plant', () => {
    expect(() => PlantSchema.parse(validPlantInput)).not.toThrow()
  })

  it('rejects empty safetyNote', () => {
    expect(() => PlantSchema.parse({ ...validPlantInput, safetyNote: '' })).toThrow()
  })

  it('rejects invalid id format', () => {
    expect(() => PlantSchema.parse({ ...validPlantInput, id: 'Invalid Id' })).toThrow()
  })

  it('rejects empty months', () => {
    expect(() => PlantSchema.parse({ ...validPlantInput, months: [] })).toThrow()
  })

  it('rejects invalid imageSourceUrl', () => {
    expect(() => PlantSchema.parse({ ...validPlantInput, imageSourceUrl: 'not-a-url' })).toThrow()
  })

  it('rejects empty sources', () => {
    expect(() => PlantSchema.parse({ ...validPlantInput, sources: [] })).toThrow()
  })

  it('rejects shortDescription longer than 120 chars', () => {
    expect(() => PlantSchema.parse({ ...validPlantInput, shortDescription: 'x'.repeat(121) })).toThrow()
  })
})
```

- [ ] **Step 6.3: Run, verify failure**

```bash
pnpm test tests/plant.schema.test.ts
```

Expected: fails with "Cannot find module '@/data/plant.schema'".

- [ ] **Step 6.4: Implement schema**

Create `src/data/plant.schema.ts`:

```ts
import { z } from 'zod'

export const Month = z.enum([
  'tammikuu','helmikuu','maaliskuu','huhtikuu','toukokuu','kesäkuu',
  'heinäkuu','elokuu','syyskuu','lokakuu','marraskuu','joulukuu',
])

export const Tag = z.enum([
  'syötävä','teekasvi','mauste','marja','lehti','kukka','juuri','versopuoli',
])

export const DangerLevel = z.enum(['matala','keskitaso','korkea','kuolettava'])
export const Difficulty = z.enum(['easy','medium','hard'])

export const Lookalike = z.object({
  name: z.string().min(1),
  dangerLevel: DangerLevel,
  howToDifferentiate: z.string().min(1),
})

export const Source = z.object({
  title: z.string().min(1),
  url: z.string().url(),
  publisher: z.string().optional(),
})

export const PlantSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  finnishName: z.string().min(1),
  latinName: z.string().min(1),
  shortDescription: z.string().min(1).max(120),
  description: z.string().min(1),

  months: z.array(Month).min(1),
  habitats: z.array(z.string().min(1)).min(1),
  edibleParts: z.array(z.string().min(1)),
  uses: z.array(z.string().min(1)),
  tags: z.array(Tag),

  difficulty: Difficulty,
  beginnerFriendly: z.boolean(),

  safetyNote: z.string().min(1),
  warnings: z.array(z.string().min(1)),
  lookalikes: z.array(Lookalike),

  image: z.string().min(1),
  blurhash: z.string().optional(),
  imageCredit: z.string().min(1),
  imageLicense: z.string().min(1),
  imageSourceUrl: z.string().url(),

  sources: z.array(Source).min(1),
}).superRefine((plant, ctx) => {
  if (plant.beginnerFriendly) {
    if (plant.difficulty !== 'easy') {
      ctx.addIssue({
        code: 'custom',
        message: `beginnerFriendly=true vaatii difficulty=easy (saatu: ${plant.difficulty})`,
      })
    }
    const dangerous = plant.lookalikes.find(
      (l) => l.dangerLevel === 'korkea' || l.dangerLevel === 'kuolettava'
    )
    if (dangerous) {
      ctx.addIssue({
        code: 'custom',
        message: `beginnerFriendly=true ei sallittu kun lookalike "${dangerous.name}" on tasoa ${dangerous.dangerLevel}`,
      })
    }
  }
  for (const l of plant.lookalikes) {
    if (l.dangerLevel === 'korkea' || l.dangerLevel === 'kuolettava') {
      if (!l.howToDifferentiate.trim()) {
        ctx.addIssue({
          code: 'custom',
          message: `Lookalike "${l.name}" tasoa ${l.dangerLevel}: howToDifferentiate vaaditaan`,
        })
      }
      if (plant.beginnerFriendly) {
        ctx.addIssue({
          code: 'custom',
          message: `Lookalike "${l.name}" tasoa ${l.dangerLevel}: beginnerFriendly täytyy olla false`,
        })
      }
    }
  }
})

export type Plant = z.infer<typeof PlantSchema>
export type Lookalike = z.infer<typeof Lookalike>
export type Source = z.infer<typeof Source>
export type Month = z.infer<typeof Month>
export type Tag = z.infer<typeof Tag>
export type DangerLevel = z.infer<typeof DangerLevel>
export type Difficulty = z.infer<typeof Difficulty>
```

- [ ] **Step 6.5: Run, verify pass**

```bash
pnpm test tests/plant.schema.test.ts
```

Expected: 7 passing.

- [ ] **Step 6.6: Commit**

```bash
git add src/data/plant.schema.ts tests/plant.schema.test.ts tests/fixtures/plant.ts
git commit -m "feat: add Plant Zod schema with type and basic invariants"
```

---

## Task 7: Schema invariants #5 and #6 deeper coverage

**Files:**
- Modify: `tests/plant.schema.test.ts`

- [ ] **Step 7.1: Add tests**

Append to `tests/plant.schema.test.ts`:

```ts
describe('Invariant #5: beginnerFriendly requires difficulty=easy and no high/deadly lookalikes', () => {
  it('rejects beginnerFriendly=true with difficulty=medium', () => {
    expect(() =>
      PlantSchema.parse({ ...validPlantInput, beginnerFriendly: true, difficulty: 'medium' })
    ).toThrow(/difficulty=easy/)
  })

  it('rejects beginnerFriendly=true with korkea-tason lookalike', () => {
    expect(() =>
      PlantSchema.parse({
        ...validPlantInput,
        beginnerFriendly: true,
        lookalikes: [{ name: 'Vaarallinen', dangerLevel: 'korkea', howToDifferentiate: 'erilainen' }],
      })
    ).toThrow(/beginnerFriendly=true ei sallittu/)
  })

  it('rejects beginnerFriendly=true with kuolettava-tason lookalike', () => {
    expect(() =>
      PlantSchema.parse({
        ...validPlantInput,
        beginnerFriendly: true,
        lookalikes: [{ name: 'Tappava', dangerLevel: 'kuolettava', howToDifferentiate: 'erilainen' }],
      })
    ).toThrow(/beginnerFriendly=true ei sallittu/)
  })

  it('accepts beginnerFriendly=true with matala/keskitaso lookalikes', () => {
    expect(() =>
      PlantSchema.parse({
        ...validPlantInput,
        beginnerFriendly: true,
        lookalikes: [{ name: 'Sukulainen', dangerLevel: 'keskitaso', howToDifferentiate: 'eri muoto' }],
      })
    ).not.toThrow()
  })
})

describe('Invariant #6: korkea/kuolettava lookalike requires howToDifferentiate and beginnerFriendly=false', () => {
  it('rejects korkea-tason lookalike with empty howToDifferentiate', () => {
    expect(() =>
      PlantSchema.parse({
        ...validPlantInput,
        beginnerFriendly: false,
        lookalikes: [{ name: 'X', dangerLevel: 'korkea', howToDifferentiate: '' }],
      })
    ).toThrow()
  })

  it('accepts kuolettava-tason lookalike with howToDifferentiate when beginnerFriendly=false', () => {
    expect(() =>
      PlantSchema.parse({
        ...validPlantInput,
        beginnerFriendly: false,
        lookalikes: [{ name: 'Tappava', dangerLevel: 'kuolettava', howToDifferentiate: 'eri kasvutapa' }],
      })
    ).not.toThrow()
  })
})
```

- [ ] **Step 7.2: Run, verify pass**

```bash
pnpm test tests/plant.schema.test.ts
```

Expected: 13 passing.

- [ ] **Step 7.3: Commit**

```bash
git add tests/plant.schema.test.ts
git commit -m "test: add invariant #5 and #6 coverage"
```

---

# Section 3 — Invarianttitestit

## Task 8: Empty plants.ts + invariant tests file

**Files:**
- Create: `src/data/plants.ts`, `tests/plants.invariants.test.ts`, `assets/plants/.gitkeep`

- [ ] **Step 8.1: Create empty plants module**

Create `src/data/plants.ts`:

```ts
import type { Plant } from '@/data/plant.schema'

// Real plants are added in Task 25 (gated by Riku setting reviewStatus: approved
// in docs/plant-content-review.md). Until then this list stays empty so
// invariant tests pass trivially. Dev fixtures are added in Task 14 to drive UI work.
export const plants: Plant[] = []
```

- [ ] **Step 8.2: Create assets directory placeholder**

```bash
mkdir -p assets/plants
touch assets/plants/.gitkeep
```

- [ ] **Step 8.3: Write invariant tests**

Create `tests/plants.invariants.test.ts`:

```ts
import { existsSync } from 'fs'
import path from 'path'
import { plants } from '@/data/plants'
import { PlantSchema } from '@/data/plant.schema'

const ASSETS_DIR = path.join(__dirname, '..', 'assets')

describe('plants.ts invariants', () => {
  it('every plant parses against PlantSchema (#1, #3, #5, #6, #8)', () => {
    for (const p of plants) {
      expect(() => PlantSchema.parse(p)).not.toThrow()
    }
  })

  it('Invariant #2: every image path resolves to a file', () => {
    for (const p of plants) {
      const fullPath = path.join(ASSETS_DIR, p.image)
      expect(existsSync(fullPath)).toBe(true)
    }
  })

  it('Invariant #4: ids are unique', () => {
    const ids = plants.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('Invariant #10: every plant has at least one non-Wikipedia source', () => {
    for (const p of plants) {
      const nonWiki = p.sources.filter((s) => !s.url.includes('wikipedia.org'))
      expect(nonWiki.length).toBeGreaterThan(0)
    }
  })

  it('Invariant #11: medical-warning plants must include a trusted medical source', () => {
    const medicalKeywords = [
      'allergi','raskaud','imet','munuais','aspiriin','salisylaat','verenohennu',
      'NSAID','diabete','oksaalihap','kihti','fytoestrogeeni','sappi','sedatiiv',
      'hormon','lääke','astm','myrk','reuma','tukkeum','reye','syövä',
    ]
    const trustedDomains = [
      'laaketietokeskus.fi','myrkytystietokeskus.fi','thl.fi','duodecim.fi','helda.helsinki.fi',
    ]
    for (const p of plants) {
      const blob = p.warnings.join(' ').toLocaleLowerCase('fi-FI')
      const hasMedical = medicalKeywords.some((k) => blob.includes(k))
      if (hasMedical) {
        const hasTrusted = p.sources.some((s) =>
          trustedDomains.some((d) => s.url.includes(d))
        )
        expect(hasTrusted).toBe(true)
      }
    }
  })

  it('Invariant #7 (heuristic warning): plants with medical warnings should mention them in safetyNote', () => {
    const medicalKeywords = [
      'allergi','raskaud','imet','munuais','aspiriin','salisylaat','verenohennu',
      'NSAID','diabete','oksaalihap','kihti','fytoestrogeeni','sappi','sedatiiv',
      'hormon','lääke','astm','myrk','reuma','tukkeum','reye','syövä',
    ]
    const flagged: string[] = []
    for (const p of plants) {
      const warnBlob = p.warnings.join(' ').toLocaleLowerCase('fi-FI')
      const safetyBlob = p.safetyNote.toLocaleLowerCase('fi-FI')
      const triggered = medicalKeywords.filter((k) => warnBlob.includes(k))
      const missing = triggered.filter((k) => !safetyBlob.includes(k))
      if (missing.length > 0) {
        flagged.push(`${p.id}: missing in safetyNote: ${missing.join(', ')}`)
      }
    }
    if (flagged.length > 0) {
      console.warn('Invariant #7 heuristic flagged plants:\n  ' + flagged.join('\n  '))
    }
    expect(true).toBe(true) // Heuristic, never fails build
  })
})
```

- [ ] **Step 8.4: Run, verify pass (empty array makes everything trivial)**

```bash
pnpm test tests/plants.invariants.test.ts
```

Expected: 6 passing.

- [ ] **Step 8.5: Commit**

```bash
git add src/data/plants.ts tests/plants.invariants.test.ts assets/plants/.gitkeep
git commit -m "test: add invariant tests file and empty plants.ts placeholder"
```

---

# Section 4 — Lib helpers + state

## Task 9: Months helper (TDD)

**Files:**
- Create: `src/lib/months.ts`, `tests/months.test.ts`

- [ ] **Step 9.1: Failing tests**

Create `tests/months.test.ts`:

```ts
import { allMonths, currentMonth, capitalize, monthIndex } from '@/lib/months'

describe('months', () => {
  it('lists 12 finnish months in order', () => {
    expect(allMonths).toEqual([
      'tammikuu','helmikuu','maaliskuu','huhtikuu','toukokuu','kesäkuu',
      'heinäkuu','elokuu','syyskuu','lokakuu','marraskuu','joulukuu',
    ])
  })

  it('returns finnish month for a Date', () => {
    expect(currentMonth(new Date('2026-05-09'))).toBe('toukokuu')
    expect(currentMonth(new Date('2026-07-15'))).toBe('heinäkuu')
    expect(currentMonth(new Date('2026-12-31'))).toBe('joulukuu')
    expect(currentMonth(new Date('2026-01-01'))).toBe('tammikuu')
  })

  it('capitalizes a finnish month', () => {
    expect(capitalize('toukokuu')).toBe('Toukokuu')
    expect(capitalize('kesäkuu')).toBe('Kesäkuu')
  })

  it('returns the index for a finnish month', () => {
    expect(monthIndex('tammikuu')).toBe(0)
    expect(monthIndex('joulukuu')).toBe(11)
    expect(monthIndex('kesäkuu')).toBe(5)
  })
})
```

- [ ] **Step 9.2: Run, verify failure**

```bash
pnpm test tests/months.test.ts
```

Expected: fails with module not found.

- [ ] **Step 9.3: Implement**

Create `src/lib/months.ts`:

```ts
import type { Month } from '@/data/plant.schema'

export const allMonths: Month[] = [
  'tammikuu','helmikuu','maaliskuu','huhtikuu','toukokuu','kesäkuu',
  'heinäkuu','elokuu','syyskuu','lokakuu','marraskuu','joulukuu',
]

export function currentMonth(now: Date = new Date()): Month {
  const idx = now.getMonth()
  const month = allMonths[idx]
  if (!month) throw new Error(`unreachable: month index ${idx}`)
  return month
}

export function capitalize(month: Month): string {
  return month.charAt(0).toUpperCase() + month.slice(1)
}

export function monthIndex(month: Month): number {
  return allMonths.indexOf(month)
}
```

- [ ] **Step 9.4: Run, verify pass**

```bash
pnpm test tests/months.test.ts
```

Expected: 4 passing.

- [ ] **Step 9.5: Commit**

```bash
git add src/lib/months.ts tests/months.test.ts
git commit -m "feat: add finnish months helper"
```

---

## Task 10: Search function (TDD)

**Files:**
- Create: `src/lib/search.ts`, `tests/search.test.ts`

- [ ] **Step 10.1: Failing tests**

Create `tests/search.test.ts`:

```ts
import { searchPlants } from '@/lib/search'
import { validPlantInput } from './fixtures/plant'
import type { Plant } from '@/data/plant.schema'

const plants: Plant[] = [
  { ...validPlantInput, id: 'nokkonen', finnishName: 'Nokkonen', latinName: 'Urtica dioica', shortDescription: 'Polttava lehti' },
  { ...validPlantInput, id: 'voikukka', finnishName: 'Voikukka', latinName: 'Taraxacum officinale', shortDescription: 'Keltainen kukka' },
  { ...validPlantInput, id: 'mustikka', finnishName: 'Mustikka', latinName: 'Vaccinium myrtillus', shortDescription: 'Sinimusta marja', tags: ['marja','syötävä'] },
]

describe('searchPlants', () => {
  it('returns all plants for empty query', () => {
    expect(searchPlants(plants, '').length).toBe(3)
  })

  it('matches finnishName case-insensitively', () => {
    expect(searchPlants(plants, 'nokk').map((p) => p.id)).toEqual(['nokkonen'])
    expect(searchPlants(plants, 'NOKK').map((p) => p.id)).toEqual(['nokkonen'])
  })

  it('matches latinName', () => {
    expect(searchPlants(plants, 'urtica').map((p) => p.id)).toEqual(['nokkonen'])
  })

  it('matches shortDescription', () => {
    expect(searchPlants(plants, 'sinimust').map((p) => p.id)).toEqual(['mustikka'])
  })

  it('matches tags', () => {
    expect(searchPlants(plants, 'marja').map((p) => p.id)).toEqual(['mustikka'])
  })

  it('handles ä/ö correctly with locale-aware lowercase', () => {
    const withUmlaut: Plant[] = [
      { ...validPlantInput, id: 'koivu', finnishName: 'Koivunlehti', latinName: 'Betula pendula' },
      { ...validPlantInput, id: 'kataja', finnishName: 'Kataja', latinName: 'Juniperus communis' },
    ]
    expect(searchPlants(withUmlaut, 'KOIVUN').map((p) => p.id)).toEqual(['koivu'])
  })

  it('returns empty array for no matches', () => {
    expect(searchPlants(plants, 'xyz123').length).toBe(0)
  })
})
```

- [ ] **Step 10.2: Run, verify failure**

```bash
pnpm test tests/search.test.ts
```

Expected: fails with module not found.

- [ ] **Step 10.3: Implement**

Create `src/lib/search.ts`:

```ts
import type { Plant } from '@/data/plant.schema'

const lower = (s: string) => s.toLocaleLowerCase('fi-FI')

export function searchPlants(plants: Plant[], query: string): Plant[] {
  const q = lower(query.trim())
  if (!q) return plants
  return plants.filter((p) => {
    const haystack = [
      p.finnishName,
      p.latinName,
      p.shortDescription,
      ...p.tags,
    ].map(lower).join('|')
    return haystack.includes(q)
  })
}
```

- [ ] **Step 10.4: Run, verify pass**

```bash
pnpm test tests/search.test.ts
```

Expected: 7 passing.

- [ ] **Step 10.5: Commit**

```bash
git add src/lib/search.ts tests/search.test.ts
git commit -m "feat: add locale-aware substring search across plant fields"
```

---

## Task 11: Filter function (TDD)

**Files:**
- Create: `src/lib/filter.ts`, `tests/filter.test.ts`

- [ ] **Step 11.1: Failing tests**

Create `tests/filter.test.ts`:

```ts
import { filterPlants, emptyFilters } from '@/lib/filter'
import { validPlantInput } from './fixtures/plant'
import type { Plant } from '@/data/plant.schema'

const plants: Plant[] = [
  { ...validPlantInput, id: 'a', months: ['kesäkuu','heinäkuu'], difficulty: 'easy', tags: ['syötävä','lehti'], beginnerFriendly: true },
  { ...validPlantInput, id: 'b', months: ['heinäkuu'], difficulty: 'medium', tags: ['teekasvi'], beginnerFriendly: false },
  { ...validPlantInput, id: 'c', months: ['toukokuu','kesäkuu'], difficulty: 'easy', tags: ['marja','syötävä'], beginnerFriendly: true },
]

describe('filterPlants', () => {
  it('returns all plants for empty filters', () => {
    expect(filterPlants(plants, emptyFilters()).length).toBe(3)
  })

  it('filters by months (intersection)', () => {
    expect(filterPlants(plants, { ...emptyFilters(), months: ['heinäkuu'] }).map((p) => p.id)).toEqual(['a','b'])
  })

  it('filters by difficulty', () => {
    expect(filterPlants(plants, { ...emptyFilters(), difficulty: ['easy'] }).map((p) => p.id)).toEqual(['a','c'])
  })

  it('filters by tags (all selected tags must be present)', () => {
    expect(filterPlants(plants, { ...emptyFilters(), tags: ['syötävä'] }).map((p) => p.id)).toEqual(['a','c'])
    expect(filterPlants(plants, { ...emptyFilters(), tags: ['syötävä','lehti'] }).map((p) => p.id)).toEqual(['a'])
  })

  it('filters by beginnerFriendlyOnly', () => {
    expect(filterPlants(plants, { ...emptyFilters(), beginnerFriendlyOnly: true }).map((p) => p.id)).toEqual(['a','c'])
  })

  it('combines filters with AND logic', () => {
    expect(
      filterPlants(plants, {
        months: ['kesäkuu'],
        difficulty: ['easy'],
        tags: ['syötävä'],
        beginnerFriendlyOnly: true,
      }).map((p) => p.id)
    ).toEqual(['a','c'])
  })
})
```

- [ ] **Step 11.2: Run, verify failure**

```bash
pnpm test tests/filter.test.ts
```

- [ ] **Step 11.3: Implement**

Create `src/lib/filter.ts`:

```ts
import type { Plant, Month, Difficulty, Tag } from '@/data/plant.schema'

export type Filters = {
  months: Month[]
  difficulty: Difficulty[]
  tags: Tag[]
  beginnerFriendlyOnly: boolean
}

export const emptyFilters = (): Filters => ({
  months: [],
  difficulty: [],
  tags: [],
  beginnerFriendlyOnly: false,
})

export function filterPlants(plants: Plant[], f: Filters): Plant[] {
  return plants.filter((p) => {
    if (f.beginnerFriendlyOnly && !p.beginnerFriendly) return false
    if (f.months.length > 0 && !p.months.some((m) => f.months.includes(m))) return false
    if (f.difficulty.length > 0 && !f.difficulty.includes(p.difficulty)) return false
    if (f.tags.length > 0 && !f.tags.every((t) => p.tags.includes(t))) return false
    return true
  })
}
```

- [ ] **Step 11.4: Run, verify pass**

```bash
pnpm test tests/filter.test.ts
```

Expected: 6 passing.

- [ ] **Step 11.5: Commit**

```bash
git add src/lib/filter.ts tests/filter.test.ts
git commit -m "feat: add AND-logic filterPlants with month/difficulty/tag/beginner predicates"
```

---

## Task 12: Categories function (TDD)

**Files:**
- Create: `src/data/categories.ts`, `tests/categories.test.ts`

- [ ] **Step 12.1: Failing tests**

Create `tests/categories.test.ts`:

```ts
import { categories } from '@/data/categories'
import { validPlantInput } from './fixtures/plant'
import type { Plant } from '@/data/plant.schema'

const plants: Plant[] = [
  { ...validPlantInput, id: 'beginner', beginnerFriendly: true, edibleParts: ['lehdet'], tags: ['syötävä'], habitats: ['niityt'] },
  { ...validPlantInput, id: 'tea', beginnerFriendly: false, edibleParts: [], tags: ['teekasvi'], habitats: ['ojanvarret'] },
  { ...validPlantInput, id: 'forest', beginnerFriendly: true, edibleParts: ['marjat'], tags: ['marja'], habitats: ['vanhat metsät'] },
  { ...validPlantInput, id: 'yard', beginnerFriendly: true, edibleParts: ['lehdet'], tags: ['lehti'], habitats: ['pihat','niityt'] },
]

describe('categories', () => {
  it('Helppo aloittelijalle = beginnerFriendly', () => {
    expect(categories.helppo(plants).map((p) => p.id)).toEqual(['beginner','forest','yard'])
  })

  it('Syötävät = edibleParts.length > 0 OR tags includes syötävä', () => {
    expect(categories.syotavat(plants).map((p) => p.id)).toEqual(['beginner','forest','yard'])
  })

  it('Teekasvit = tags includes teekasvi', () => {
    expect(categories.teekasvit(plants).map((p) => p.id)).toEqual(['tea'])
  })

  it('Metsä = habitats includes "metsä"', () => {
    expect(categories.metsa(plants).map((p) => p.id)).toEqual(['forest'])
  })

  it('Piha = habitats includes piha/niitty/pelto', () => {
    expect(categories.piha(plants).map((p) => p.id)).toEqual(['beginner','yard'])
  })
})
```

- [ ] **Step 12.2: Run, verify failure**

```bash
pnpm test tests/categories.test.ts
```

- [ ] **Step 12.3: Implement**

Create `src/data/categories.ts`:

```ts
import type { Plant } from '@/data/plant.schema'

const hasHabitat = (plant: Plant, needle: string): boolean =>
  plant.habitats.some((h) => h.toLocaleLowerCase('fi-FI').includes(needle))

export const categories = {
  helppo: (plants: Plant[]) => plants.filter((p) => p.beginnerFriendly),
  syotavat: (plants: Plant[]) =>
    plants.filter((p) => p.edibleParts.length > 0 || p.tags.includes('syötävä')),
  teekasvit: (plants: Plant[]) => plants.filter((p) => p.tags.includes('teekasvi')),
  metsa: (plants: Plant[]) => plants.filter((p) => hasHabitat(p, 'metsä')),
  piha: (plants: Plant[]) =>
    plants.filter((p) => hasHabitat(p, 'piha') || hasHabitat(p, 'niitty') || hasHabitat(p, 'pelto')),
}

export const categoryLabels = {
  helppo: 'Helppo aloittelijalle',
  syotavat: 'Syötävät',
  teekasvit: 'Teekasvit',
  metsa: 'Metsä',
  piha: 'Piha',
} as const
```

- [ ] **Step 12.4: Run, verify pass**

```bash
pnpm test tests/categories.test.ts
```

Expected: 5 passing.

- [ ] **Step 12.5: Commit**

```bash
git add src/data/categories.ts tests/categories.test.ts
git commit -m "feat: add quick-category predicates"
```

---

## Task 13: Zustand store (TDD)

**Files:**
- Create: `src/store/useAppStore.ts`, `tests/store.test.ts`

- [ ] **Step 13.1: Failing tests**

Create `tests/store.test.ts`:

```ts
import { useAppStore } from '@/store/useAppStore'

describe('useAppStore', () => {
  beforeEach(() => {
    useAppStore.getState().resetFilters()
    useAppStore.getState().setSearchQuery('')
  })

  it('starts with empty search and empty filters', () => {
    const s = useAppStore.getState()
    expect(s.searchQuery).toBe('')
    expect(s.filters.months).toEqual([])
    expect(s.filters.difficulty).toEqual([])
    expect(s.filters.tags).toEqual([])
    expect(s.filters.beginnerFriendlyOnly).toBe(false)
  })

  it('sets and clears search query', () => {
    useAppStore.getState().setSearchQuery('nokk')
    expect(useAppStore.getState().searchQuery).toBe('nokk')
    useAppStore.getState().setSearchQuery('')
    expect(useAppStore.getState().searchQuery).toBe('')
  })

  it('toggles a month filter', () => {
    useAppStore.getState().toggleMonth('kesäkuu')
    expect(useAppStore.getState().filters.months).toEqual(['kesäkuu'])
    useAppStore.getState().toggleMonth('heinäkuu')
    expect(useAppStore.getState().filters.months).toEqual(['kesäkuu','heinäkuu'])
    useAppStore.getState().toggleMonth('kesäkuu')
    expect(useAppStore.getState().filters.months).toEqual(['heinäkuu'])
  })

  it('toggles difficulty', () => {
    useAppStore.getState().toggleDifficulty('easy')
    expect(useAppStore.getState().filters.difficulty).toEqual(['easy'])
    useAppStore.getState().toggleDifficulty('easy')
    expect(useAppStore.getState().filters.difficulty).toEqual([])
  })

  it('toggles a tag', () => {
    useAppStore.getState().toggleTag('syötävä')
    expect(useAppStore.getState().filters.tags).toEqual(['syötävä'])
  })

  it('sets beginnerFriendlyOnly', () => {
    useAppStore.getState().setBeginnerOnly(true)
    expect(useAppStore.getState().filters.beginnerFriendlyOnly).toBe(true)
  })

  it('resets filters', () => {
    useAppStore.getState().toggleMonth('kesäkuu')
    useAppStore.getState().setBeginnerOnly(true)
    useAppStore.getState().resetFilters()
    expect(useAppStore.getState().filters.months).toEqual([])
    expect(useAppStore.getState().filters.beginnerFriendlyOnly).toBe(false)
  })
})
```

- [ ] **Step 13.2: Run, verify failure**

```bash
pnpm test tests/store.test.ts
```

- [ ] **Step 13.3: Implement**

Create `src/store/useAppStore.ts`:

```ts
import { create } from 'zustand'
import type { Month, Difficulty, Tag } from '@/data/plant.schema'
import { emptyFilters, type Filters } from '@/lib/filter'

type AppState = {
  searchQuery: string
  setSearchQuery: (q: string) => void

  filters: Filters
  toggleMonth: (m: Month) => void
  toggleDifficulty: (d: Difficulty) => void
  toggleTag: (t: Tag) => void
  setBeginnerOnly: (v: boolean) => void
  resetFilters: () => void
}

const toggle = <T>(arr: T[], item: T): T[] =>
  arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item]

export const useAppStore = create<AppState>((set) => ({
  searchQuery: '',
  setSearchQuery: (q) => set({ searchQuery: q }),

  filters: emptyFilters(),
  toggleMonth: (m) => set((s) => ({ filters: { ...s.filters, months: toggle(s.filters.months, m) } })),
  toggleDifficulty: (d) => set((s) => ({ filters: { ...s.filters, difficulty: toggle(s.filters.difficulty, d) } })),
  toggleTag: (t) => set((s) => ({ filters: { ...s.filters, tags: toggle(s.filters.tags, t) } })),
  setBeginnerOnly: (v) => set((s) => ({ filters: { ...s.filters, beginnerFriendlyOnly: v } })),
  resetFilters: () => set({ filters: emptyFilters() }),
}))
```

- [ ] **Step 13.4: Run, verify pass**

```bash
pnpm test tests/store.test.ts
```

Expected: 7 passing.

- [ ] **Step 13.5: Commit**

```bash
git add src/store/useAppStore.ts tests/store.test.ts
git commit -m "feat: add Zustand store for search query and filters"
```

---

# Section 5 — UI components

## Task 14: Theme tokens module + dev fixtures

**Files:**
- Create: `src/theme/colors.ts`, `src/theme/typography.ts`, `src/data/imageMap.ts`
- Replace: `src/data/plants.ts` (3 dev fixtures)
- Add: `assets/plants/fixture-*.webp` (3 placeholder images)

- [ ] **Step 14.1: Theme tokens**

Create `src/theme/colors.ts`:

```ts
export const colors = {
  light: {
    canvas: '#FAF8F5', surface: '#FFFFFF', primary: '#4A6741', accent: '#A87344',
    ink: '#1F2419', muted: '#5A6151', danger: '#C8341B', warn: '#D4A012',
  },
  dark: {
    canvas: '#0F1410', surface: '#1A1F1A', primary: '#9CB89A', accent: '#C49870',
    ink: '#E8E5DD', muted: '#9CA092', danger: '#C8341B', warn: '#D4A012',
  },
} as const

export type ThemeMode = 'light' | 'dark'
```

Create `src/theme/typography.ts`:

```ts
export const typography = {
  hero: 'font-serifBold text-[32px] leading-[1.3]',
  h1: 'font-serif text-[24px] leading-[1.3]',
  h2: 'font-sansSemibold text-[18px] leading-[1.3]',
  body: 'font-sans text-[16px] leading-[1.5]',
  small: 'font-sans text-[14px] leading-[1.5]',
  caption: 'font-sans text-[12px] leading-[1.5]',
} as const
```

- [ ] **Step 14.2: Generate 3 placeholder webp files**

```bash
node -e "const fs=require('fs');const buf=Buffer.from('UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA','base64');for(const id of ['fixture-nokkonen','fixture-maitohorsma','fixture-kuusenkerkat']) fs.writeFileSync(\`assets/plants/\${id}.webp\`, buf);"
```

(These are 1×1 px placeholders. Real fixture images can be hand-dropped from any source as JPEG converted to webp later — for development work the 1×1 is enough.)

- [ ] **Step 14.3: Image map**

Create `src/data/imageMap.ts`:

```ts
export const imageMap: Record<string, ReturnType<typeof require>> = {
  'plants/fixture-nokkonen.webp': require('../../assets/plants/fixture-nokkonen.webp'),
  'plants/fixture-maitohorsma.webp': require('../../assets/plants/fixture-maitohorsma.webp'),
  'plants/fixture-kuusenkerkat.webp': require('../../assets/plants/fixture-kuusenkerkat.webp'),
}
```

- [ ] **Step 14.4: Replace `src/data/plants.ts` with 3 dev fixtures**

```ts
import type { Plant } from '@/data/plant.schema'
import { PlantSchema } from '@/data/plant.schema'

const raw: Plant[] = [
  {
    id: 'fixture-nokkonen',
    finnishName: 'Nokkonen (kehitysfixture)',
    latinName: 'Urtica dioica',
    shortDescription: 'Polttava lehti, ravintorikas — kuumenna ennen syöntiä.',
    description: 'Pystykasvuinen ruohovartinen monivuotinen, vastakkaiset sahalaitaiset lehdet, polttokarvat. Yleinen ravinteikkaalla maalla. Korvataan oikealla sisällöllä Task 25:ssä.',
    months: ['toukokuu','kesäkuu','heinäkuu','elokuu','syyskuu'],
    habitats: ['ravinteinen multainen maa','pihat','pellonpiennat'],
    edibleParts: ['nuoret versot','nuoret lehdet'],
    uses: ['keitto','smoothie','tee'],
    tags: ['syötävä','lehti','teekasvi'],
    difficulty: 'easy',
    beginnerFriendly: true,
    safetyNote: 'Käytä käsineitä keräillessä — polttokarvat kirvelevät. Munuaissairaat: konsultoi lääkäriä.',
    warnings: ['Polttokarvat: käytä käsineitä','Munuaissairaus, diureettilääkitys: konsultoi lääkäriä'],
    lookalikes: [
      { name: 'Valkopeippi (Lamium album)', dangerLevel: 'matala', howToDifferentiate: 'Ei polttokarvoja, valkoiset huulikukat.' },
    ],
    image: 'plants/fixture-nokkonen.webp',
    imageCredit: 'Placeholder — korvataan',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:placeholder.jpg',
    sources: [
      { title: 'Pinkka virtuaalikasvio', url: 'https://pinkka.helsinki.fi/virtuaalikasvio/', publisher: 'Helsingin yliopisto' },
      { title: 'Lääketietokeskus', url: 'https://www.laaketietokeskus.fi/', publisher: 'Lääketietokeskus' },
    ],
  },
  {
    id: 'fixture-maitohorsma',
    finnishName: 'Maitohorsma (kehitysfixture)',
    latinName: 'Chamaenerion angustifolium',
    shortDescription: 'Vaaleanpunaiset terttukukat heinäkuussa, pajunmaiset lehdet.',
    description: 'Korkea pystykasvuinen kasvi paloalueilla ja hakkuuaukioilla. Korvataan oikealla sisällöllä.',
    months: ['kesäkuu','heinäkuu','elokuu'],
    habitats: ['paloalueet','hakkuuaukiot','metsänreunat'],
    edibleParts: ['nuoret versot','lehdet','kukat'],
    uses: ['parsa','tee','salaatti'],
    tags: ['syötävä','teekasvi','kukka'],
    difficulty: 'easy',
    beginnerFriendly: true,
    safetyNote: 'Helposti tunnistettava kukinnan aikana. Vältä saastuneilta paloalueilta.',
    warnings: [],
    lookalikes: [],
    image: 'plants/fixture-maitohorsma.webp',
    imageCredit: 'Placeholder — korvataan',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:placeholder.jpg',
    sources: [
      { title: 'Pinkka virtuaalikasvio', url: 'https://pinkka.helsinki.fi/virtuaalikasvio/', publisher: 'Helsingin yliopisto' },
    ],
  },
  {
    id: 'fixture-kuusenkerkat',
    finnishName: 'Kuusenkerkät (kehitysfixture)',
    latinName: 'Picea abies',
    shortDescription: 'Vaaleanvihreät uudet kasvut alkukesän aikana.',
    description: 'Kerkät tuoreita touko-kesäkuussa. Marjakuusen sekoittaminen vaarallista. Korvataan oikealla sisällöllä.',
    months: ['toukokuu','kesäkuu'],
    habitats: ['havumetsät','metsänreunat'],
    edibleParts: ['kerkät'],
    uses: ['siirappi','tee','salaatti'],
    tags: ['mauste','versopuoli'],
    difficulty: 'easy',
    beginnerFriendly: false,
    safetyNote: 'Varmista että kasvi on KUUSI, ei marjakuusi (Taxus baccata, ERITTÄIN myrkyllinen). Kerää vain metsän luonnonvaraisesta korkeasta kuusesta, ei puutarhasta.',
    warnings: ['Marjakuusi-vaara: kerää vain metsästä, ei puutarhasta','Suuret määrät: terpeenit voivat ärsyttää vatsaa'],
    lookalikes: [
      {
        name: 'Marjakuusi (Taxus baccata)',
        dangerLevel: 'kuolettava',
        howToDifferentiate: 'Marjakuusi on tiheäoksainen pensas tai pieni puu (alle 10 m), litteät pehmeät neulaset kahteen tasoon, punainen lihava marja. Kuusi on korkea kapea havupuu metsässä, neulaset 4-tahkoisia ja teräviä, kierreasemaisesti oksassa.',
      },
    ],
    image: 'plants/fixture-kuusenkerkat.webp',
    imageCredit: 'Placeholder — korvataan',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:placeholder.jpg',
    sources: [
      { title: 'Pinkka virtuaalikasvio', url: 'https://pinkka.helsinki.fi/virtuaalikasvio/', publisher: 'Helsingin yliopisto' },
      { title: 'Suomen myrkytystietokeskus', url: 'https://www.myrkytystietokeskus.fi/', publisher: 'Myrkytystietokeskus' },
    ],
  },
]

export const plants: Plant[] = raw.map((p) => PlantSchema.parse(p))
```

- [ ] **Step 14.5: Run all tests**

```bash
pnpm test
```

Expected: all passing — including invariants (each fixture passes #5/#6/#10/#11).

- [ ] **Step 14.6: Commit**

```bash
git add src/theme/ src/data/plants.ts src/data/imageMap.ts assets/plants/
git commit -m "feat: add theme tokens and 3 development plant fixtures"
```

---

## Task 15: usePlants hook (TDD)

**Files:**
- Create: `src/hooks/usePlants.ts`, `tests/usePlants.test.tsx`

- [ ] **Step 15.1: Failing tests**

Create `tests/usePlants.test.tsx`:

```ts
import { renderHook, act } from '@testing-library/react-native'
import { usePlants } from '@/hooks/usePlants'
import { useAppStore } from '@/store/useAppStore'
import { validPlantInput } from './fixtures/plant'
import type { Plant } from '@/data/plant.schema'

const testPlants: Plant[] = [
  { ...validPlantInput, id: 'a', months: ['kesäkuu'], difficulty: 'easy', beginnerFriendly: true, finnishName: 'Aurinkokukka' },
  { ...validPlantInput, id: 'b', months: ['heinäkuu'], difficulty: 'medium', beginnerFriendly: false, finnishName: 'Beegonia' },
  { ...validPlantInput, id: 'c', months: ['kesäkuu','heinäkuu'], difficulty: 'easy', beginnerFriendly: true, finnishName: 'Cikoria' },
]

jest.mock('@/data/plants', () => ({ plants: testPlants }))

describe('usePlants', () => {
  beforeEach(() => {
    useAppStore.getState().resetFilters()
    useAppStore.getState().setSearchQuery('')
  })

  it('returns all plants when no filter or search', () => {
    const { result } = renderHook(() => usePlants(new Date('2026-06-15')))
    expect(result.current.filtered.map((p) => p.id)).toEqual(['a','b','c'])
  })

  it('returns featured for currentMonth (kesäkuu)', () => {
    const { result } = renderHook(() => usePlants(new Date('2026-06-15')))
    expect(result.current.featured.map((p) => p.id)).toEqual(['a','c'])
  })

  it('combines filters with search query', () => {
    const { result } = renderHook(() => usePlants(new Date('2026-06-15')))
    act(() => useAppStore.getState().setSearchQuery('aur'))
    expect(result.current.filtered.map((p) => p.id)).toEqual(['a'])
  })

  it('caps featured at 6', () => {
    const { result } = renderHook(() => usePlants(new Date('2026-06-15')))
    expect(result.current.featured.length).toBeLessThanOrEqual(6)
  })
})
```

- [ ] **Step 15.2: Run, verify failure**

```bash
pnpm test tests/usePlants.test.tsx
```

- [ ] **Step 15.3: Implement**

Create `src/hooks/usePlants.ts`:

```ts
import { useMemo } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { plants } from '@/data/plants'
import { searchPlants } from '@/lib/search'
import { filterPlants } from '@/lib/filter'
import { currentMonth } from '@/lib/months'
import type { Plant } from '@/data/plant.schema'

const FEATURED_CAP = 6

const sortFeatured = (a: Plant, b: Plant): number => {
  if (a.beginnerFriendly !== b.beginnerFriendly) return a.beginnerFriendly ? -1 : 1
  const order: Record<Plant['difficulty'], number> = { easy: 0, medium: 1, hard: 2 }
  if (a.difficulty !== b.difficulty) return order[a.difficulty] - order[b.difficulty]
  return a.finnishName.localeCompare(b.finnishName, 'fi-FI')
}

export function usePlants(now: Date = new Date()) {
  const searchQuery = useAppStore((s) => s.searchQuery)
  const filters = useAppStore((s) => s.filters)

  return useMemo(() => {
    const month = currentMonth(now)
    const filtered = searchPlants(filterPlants(plants, filters), searchQuery)
    const featured = plants
      .filter((p) => p.months.includes(month))
      .sort(sortFeatured)
      .slice(0, FEATURED_CAP)
    return { filtered, featured, currentMonth: month }
  }, [searchQuery, filters, now])
}
```

- [ ] **Step 15.4: Run, verify pass**

```bash
pnpm test tests/usePlants.test.tsx
```

Expected: 4 passing.

- [ ] **Step 15.5: Commit**

```bash
git add src/hooks/usePlants.ts tests/usePlants.test.tsx
git commit -m "feat: add usePlants hook combining filters, search, featured-by-month"
```

---

## Task 16: PlantCard

**Files:**
- Create: `src/components/PlantCard.tsx`

- [ ] **Step 16.1: Implement**

Create `src/components/PlantCard.tsx`:

```tsx
import { Pressable, Text, View } from 'react-native'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { AlertTriangle } from 'lucide-react-native'
import type { Plant } from '@/data/plant.schema'
import { imageMap } from '@/data/imageMap'

type Props = {
  plant: Plant
  variant?: 'list' | 'featured'
}

export function PlantCard({ plant, variant = 'list' }: Props) {
  const dangerous = plant.lookalikes.some(
    (l) => l.dangerLevel === 'korkea' || l.dangerLevel === 'kuolettava'
  )
  const widthClass = variant === 'featured' ? 'w-64' : 'w-full'

  return (
    <Link href={`/plants/${plant.id}`} asChild>
      <Pressable
        className={`${widthClass} bg-surface dark:bg-surface-dark rounded-card overflow-hidden border border-transparent dark:border-zinc-800 active:scale-[0.98]`}
      >
        <View className="aspect-[4/3] bg-canvas dark:bg-canvas-dark">
          <Image
            source={imageMap[plant.image]}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
            placeholder={plant.blurhash}
            transition={200}
          />
          {dangerous && (
            <View className="absolute top-2 right-2 bg-danger rounded-full p-1.5">
              <AlertTriangle size={14} color="#FFFFFF" />
            </View>
          )}
        </View>
        <View className="p-4 gap-1">
          <Text className="font-serif text-[18px] text-ink dark:text-ink-dark">
            {plant.finnishName}
          </Text>
          <Text className="font-sans text-[12px] italic text-muted dark:text-muted-dark">
            {plant.latinName}
          </Text>
          <Text className="font-sans text-[14px] text-ink dark:text-ink-dark mt-1" numberOfLines={2}>
            {plant.shortDescription}
          </Text>
        </View>
      </Pressable>
    </Link>
  )
}
```

- [ ] **Step 16.2: Commit**

```bash
git add src/components/PlantCard.tsx
git commit -m "feat: add PlantCard with list/featured variants and danger badge"
```

---

## Task 17: Badges + DangerCallout

**Files:**
- Create: `src/components/DifficultyBadge.tsx`, `src/components/BeginnerBadge.tsx`, `src/components/DangerCallout.tsx`

- [ ] **Step 17.1: DifficultyBadge**

Create `src/components/DifficultyBadge.tsx`:

```tsx
import { Text, View } from 'react-native'
import type { Difficulty } from '@/data/plant.schema'

const labels: Record<Difficulty, string> = {
  easy: 'Helppo',
  medium: 'Keskitaso',
  hard: 'Vaikea',
}

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <View className="px-3 h-7 rounded-btn justify-center bg-canvas dark:bg-surface-dark border border-zinc-200 dark:border-zinc-800">
      <Text className="font-sans text-[12px] text-ink dark:text-ink-dark">
        {labels[difficulty]}
      </Text>
    </View>
  )
}
```

- [ ] **Step 17.2: BeginnerBadge**

Create `src/components/BeginnerBadge.tsx`:

```tsx
import { Text, View } from 'react-native'
import { Sparkles } from 'lucide-react-native'

export function BeginnerBadge() {
  return (
    <View className="flex-row items-center gap-1 px-3 h-7 rounded-btn bg-primary/15 dark:bg-primary-dark/15">
      <Sparkles size={12} color="#4A6741" />
      <Text className="font-sans text-[12px] text-primary dark:text-primary-dark">
        Aloittelijalle
      </Text>
    </View>
  )
}
```

- [ ] **Step 17.3: DangerCallout**

Create `src/components/DangerCallout.tsx`:

```tsx
import { Text, View } from 'react-native'
import { AlertTriangle } from 'lucide-react-native'

export function DangerCallout({ children, severity = 'warn' }: { children: string; severity?: 'warn' | 'danger' }) {
  const color = severity === 'danger' ? '#C8341B' : '#D4A012'
  return (
    <View
      className="flex-row gap-3 p-4 rounded-card border-2"
      style={{ borderColor: color, backgroundColor: color + '14' }}
    >
      <AlertTriangle size={20} color={color} />
      <Text className="flex-1 font-sans text-[14px] text-ink dark:text-ink-dark leading-[1.5]">
        {children}
      </Text>
    </View>
  )
}
```

- [ ] **Step 17.4: Commit**

```bash
git add src/components/DifficultyBadge.tsx src/components/BeginnerBadge.tsx src/components/DangerCallout.tsx
git commit -m "feat: add DifficultyBadge, BeginnerBadge, DangerCallout"
```

---

## Task 18: CollapsibleSection + PlantHero + CategoryRow + EmptyState

**Files:**
- Create: `src/components/CollapsibleSection.tsx`, `src/components/PlantHero.tsx`, `src/components/CategoryRow.tsx`, `src/components/EmptyState.tsx`

- [ ] **Step 18.1: CollapsibleSection**

Create `src/components/CollapsibleSection.tsx`:

```tsx
import { Pressable, Text, View } from 'react-native'
import { ChevronDown } from 'lucide-react-native'
import { useState, type ReactNode } from 'react'
import Animated, { LinearTransition } from 'react-native-reanimated'

type Props = {
  title: string
  defaultOpen?: boolean
  children: ReactNode
}

export function CollapsibleSection({ title, defaultOpen = false, children }: Props) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <Animated.View layout={LinearTransition.duration(180)} className="border-b border-zinc-200 dark:border-zinc-800">
      <Pressable
        onPress={() => setOpen((o) => !o)}
        className="flex-row items-center justify-between py-4 min-h-touch"
      >
        <Text className="font-sansSemibold text-[18px] text-ink dark:text-ink-dark">
          {title}
        </Text>
        <View style={{ transform: [{ rotate: open ? '180deg' : '0deg' }] }}>
          <ChevronDown size={20} color="#5A6151" />
        </View>
      </Pressable>
      {open && <View className="pb-4">{children}</View>}
    </Animated.View>
  )
}
```

- [ ] **Step 18.2: PlantHero**

Create `src/components/PlantHero.tsx`:

```tsx
import { Text, View } from 'react-native'
import { Image } from 'expo-image'
import type { Plant } from '@/data/plant.schema'
import { imageMap } from '@/data/imageMap'

export function PlantHero({ plant }: { plant: Plant }) {
  return (
    <View>
      <View className="aspect-[16/9] bg-canvas dark:bg-canvas-dark">
        <Image
          source={imageMap[plant.image]}
          style={{ width: '100%', height: '100%' }}
          contentFit="cover"
          placeholder={plant.blurhash}
          transition={250}
        />
      </View>
      <View className="px-5 pt-5 gap-1">
        <Text className="font-serifBold text-[32px] text-ink dark:text-ink-dark leading-[1.15]">
          {plant.finnishName}
        </Text>
        <Text className="font-sans text-[14px] italic text-muted dark:text-muted-dark">
          {plant.latinName}
        </Text>
      </View>
      <Text className="px-5 pt-1 font-sans text-[10px] text-muted dark:text-muted-dark">
        {plant.imageCredit} · {plant.imageLicense}
      </Text>
    </View>
  )
}
```

- [ ] **Step 18.3: CategoryRow**

Create `src/components/CategoryRow.tsx`:

```tsx
import { ScrollView, Text, View } from 'react-native'
import type { Plant } from '@/data/plant.schema'
import { PlantCard } from './PlantCard'

export function CategoryRow({ title, plants }: { title: string; plants: Plant[] }) {
  if (plants.length === 0) return null
  return (
    <View className="gap-3">
      <Text className="font-sansSemibold text-[18px] text-ink dark:text-ink-dark px-5">
        {title}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
      >
        {plants.map((plant) => (
          <PlantCard key={plant.id} plant={plant} variant="featured" />
        ))}
      </ScrollView>
    </View>
  )
}
```

- [ ] **Step 18.4: EmptyState**

Create `src/components/EmptyState.tsx`:

```tsx
import { Pressable, Text, View } from 'react-native'
import { Leaf } from 'lucide-react-native'

type Props = {
  message: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({ message, actionLabel, onAction }: Props) {
  return (
    <View className="flex-1 items-center justify-center gap-4 p-10">
      <Leaf size={48} color="#5A6151" />
      <Text className="font-sans text-[16px] text-muted dark:text-muted-dark text-center">
        {message}
      </Text>
      {actionLabel && onAction && (
        <Pressable onPress={onAction} className="px-5 h-touch rounded-btn bg-primary dark:bg-primary-dark justify-center">
          <Text className="font-sansSemibold text-[14px] text-canvas">
            {actionLabel}
          </Text>
        </Pressable>
      )}
    </View>
  )
}
```

- [ ] **Step 18.5: Commit**

```bash
git add src/components/CollapsibleSection.tsx src/components/PlantHero.tsx src/components/CategoryRow.tsx src/components/EmptyState.tsx
git commit -m "feat: add CollapsibleSection, PlantHero, CategoryRow, EmptyState"
```

---

## Task 19: Load fonts in root layout

**Files:**
- Modify: `app/_layout.tsx`

- [ ] **Step 19.1: Update root layout**

Replace `app/_layout.tsx`:

```tsx
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'react-native'
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter'
import { Lora_400Regular, Lora_700Bold } from '@expo-google-fonts/lora'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import '../global.css'

SplashScreen.preventAutoHideAsync().catch(() => {})

export default function RootLayout() {
  const scheme = useColorScheme()
  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Lora_400Regular,
    Lora_700Bold,
  })

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync().catch(() => {})
  }, [loaded])

  if (!loaded) return null

  return (
    <>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: 'transparent' },
          headerTitleStyle: { fontFamily: 'Lora_400Regular', fontSize: 18 },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: scheme === 'dark' ? '#0F1410' : '#FAF8F5' },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="plants/index" options={{ title: 'Kasvit' }} />
        <Stack.Screen name="plants/[id]" options={{ title: '' }} />
      </Stack>
    </>
  )
}
```

- [ ] **Step 19.2: Commit**

```bash
git add app/_layout.tsx
git commit -m "feat: load Inter and Lora fonts with splash screen handoff"
```

---

# Section 6 — Home / List / Detail screens (without search/filter UI)

## Task 20: Home Screen (greeting + featured + category rows, no search bar yet)

**Files:**
- Modify: `app/index.tsx`

- [ ] **Step 20.1: Implement Home (without SearchBar)**

Replace `app/index.tsx`:

```tsx
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { plants } from '@/data/plants'
import { categories, categoryLabels } from '@/data/categories'
import { capitalize } from '@/lib/months'
import { usePlants } from '@/hooks/usePlants'
import { CategoryRow } from '@/components/CategoryRow'

export default function Home() {
  const { featured, currentMonth: month } = usePlants()

  return (
    <SafeAreaView className="flex-1 bg-canvas dark:bg-canvas-dark" edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <View className="px-5 pt-2 pb-6 gap-1">
          <Text className="font-serif text-[24px] text-ink dark:text-ink-dark leading-[1.3]">
            Mitä luonnosta löytyy {capitalize(month).toLowerCase()}ssa?
          </Text>
          <Text className="font-sans text-[14px] text-muted dark:text-muted-dark">
            {featured.length} kasvia juuri nyt
          </Text>
        </View>
        {featured.length > 0 ? (
          <View className="pb-8">
            <CategoryRow title="Juuri nyt" plants={featured} />
          </View>
        ) : (
          <View className="px-5 pb-8">
            <Text className="font-sans text-[14px] text-muted dark:text-muted-dark">
              Tällä kuukaudella ei ole listallamme kasveja — tutustu kuitenkin koko valikoimaan.
            </Text>
          </View>
        )}
        <View className="gap-8">
          <CategoryRow title={categoryLabels.helppo} plants={categories.helppo(plants)} />
          <CategoryRow title={categoryLabels.syotavat} plants={categories.syotavat(plants)} />
          <CategoryRow title={categoryLabels.teekasvit} plants={categories.teekasvit(plants)} />
          <CategoryRow title={categoryLabels.metsa} plants={categories.metsa(plants)} />
          <CategoryRow title={categoryLabels.piha} plants={categories.piha(plants)} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
```

- [ ] **Step 20.2: Verify on emulator**

```bash
pnpm exec expo start --android --clear &
```

Confirm Home shows greeting with current month, "Juuri nyt" row, and category rows (some may be empty due to fixtures). Stop server.

- [ ] **Step 20.3: Commit**

```bash
git add app/index.tsx
git commit -m "feat: add Home screen with greeting and category rows"
```

---

## Task 21: Plant List Screen (no SearchBar/FilterChips yet)

**Files:**
- Create: `app/plants/index.tsx`

- [ ] **Step 21.1: Implement**

Create `app/plants/index.tsx`:

```tsx
import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { plants } from '@/data/plants'
import { PlantCard } from '@/components/PlantCard'
import { EmptyState } from '@/components/EmptyState'

export default function PlantList() {
  return (
    <SafeAreaView className="flex-1 bg-canvas dark:bg-canvas-dark" edges={['bottom']}>
      <FlatList
        data={plants}
        keyExtractor={(p) => p.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 32, gap: 16 }}
        renderItem={({ item }) => <PlantCard plant={item} />}
        ListEmptyComponent={<EmptyState message="Listalla ei ole kasveja." />}
      />
    </SafeAreaView>
  )
}
```

- [ ] **Step 21.2: Verify on emulator**

Tap a featured card on Home → arrives at Detail. Verify back button works. From Home, navigate to /plants directly via deep link if needed (or tap a category card → Detail). Confirm flat list of all 3 fixtures works when accessed via deep link `villiyrtit://plants` — or temporarily add a button in Home.

(For MVP testing: open `/plants` via Expo dev tools URL bar.)

- [ ] **Step 21.3: Commit**

```bash
git add app/plants/index.tsx
git commit -m "feat: add Plant List screen rendering all plants"
```

---

## Task 22: Plant Detail Screen

**Files:**
- Create: `app/plants/[id].tsx`

- [ ] **Step 22.1: Implement**

Create `app/plants/[id].tsx`:

```tsx
import { ScrollView, Text, View } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect } from 'react'
import { plants } from '@/data/plants'
import { capitalize } from '@/lib/months'
import { PlantHero } from '@/components/PlantHero'
import { DangerCallout } from '@/components/DangerCallout'
import { DifficultyBadge } from '@/components/DifficultyBadge'
import { BeginnerBadge } from '@/components/BeginnerBadge'
import { CollapsibleSection } from '@/components/CollapsibleSection'

export default function PlantDetail() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const plant = plants.find((p) => p.id === id)

  useEffect(() => {
    if (!plant) router.replace('/+not-found')
  }, [plant, router])

  if (!plant) return null

  const dangerousLookalikes = plant.lookalikes.filter(
    (l) => l.dangerLevel === 'korkea' || l.dangerLevel === 'kuolettava'
  )

  return (
    <ScrollView className="bg-canvas dark:bg-canvas-dark" contentContainerStyle={{ paddingBottom: 48 }}>
      <PlantHero plant={plant} />

      <View className="px-5 pt-5">
        <DangerCallout severity="warn">{plant.safetyNote}</DangerCallout>
      </View>

      <View className="flex-row gap-2 px-5 py-4">
        <DifficultyBadge difficulty={plant.difficulty} />
        {plant.beginnerFriendly && <BeginnerBadge />}
      </View>

      <View className="px-5 pb-2">
        <Text className="font-sans text-[14px] text-muted dark:text-muted-dark">
          Löytyy: {plant.months.map((m) => capitalize(m)).join(', ')}
        </Text>
      </View>

      <View className="px-5 py-3">
        <Text className="font-sans text-[16px] text-ink dark:text-ink-dark leading-[1.5]">
          {plant.description}
        </Text>
      </View>

      <View className="px-5">
        <CollapsibleSection title="Tunnistus" defaultOpen>
          <Text className="font-sans text-[16px] text-ink dark:text-ink-dark leading-[1.5]">
            {plant.shortDescription}
          </Text>
        </CollapsibleSection>

        <CollapsibleSection title="Syötävät osat" defaultOpen>
          <View className="gap-1">
            {plant.edibleParts.map((part) => (
              <Text key={part} className="font-sans text-[16px] text-ink dark:text-ink-dark">· {part}</Text>
            ))}
            {plant.edibleParts.length === 0 && (
              <Text className="font-sans text-[14px] text-muted dark:text-muted-dark italic">Ei syötäviä osia.</Text>
            )}
          </View>
        </CollapsibleSection>

        <CollapsibleSection title="Käyttötavat">
          <View className="gap-1">
            {plant.uses.map((u) => (
              <Text key={u} className="font-sans text-[16px] text-ink dark:text-ink-dark">· {u}</Text>
            ))}
          </View>
        </CollapsibleSection>

        <CollapsibleSection title="Habitatit">
          <View className="gap-1">
            {plant.habitats.map((h) => (
              <Text key={h} className="font-sans text-[16px] text-ink dark:text-ink-dark">· {h}</Text>
            ))}
          </View>
        </CollapsibleSection>

        <CollapsibleSection title="Varoitukset" defaultOpen={plant.warnings.length > 0}>
          <View className="gap-2">
            {plant.warnings.map((w, i) => (
              <Text key={i} className="font-sans text-[16px] text-ink dark:text-ink-dark leading-[1.5]">· {w}</Text>
            ))}
            {plant.warnings.length === 0 && (
              <Text className="font-sans text-[14px] text-muted dark:text-muted-dark italic">Ei erityisiä varoituksia.</Text>
            )}
          </View>
        </CollapsibleSection>

        <CollapsibleSection title="Vaaralliset näköislajit" defaultOpen={dangerousLookalikes.length > 0}>
          <View className="gap-3">
            {plant.lookalikes.map((l, i) => {
              const isDangerous = l.dangerLevel === 'korkea' || l.dangerLevel === 'kuolettava'
              return (
                <View
                  key={i}
                  className={`p-3 rounded-card ${isDangerous ? 'border-2 border-danger bg-danger/10' : 'bg-surface dark:bg-surface-dark'}`}
                >
                  <Text className="font-sansSemibold text-[16px] text-ink dark:text-ink-dark">
                    {l.name}{' '}
                    <Text className="font-sans text-[12px] text-muted dark:text-muted-dark">({l.dangerLevel})</Text>
                  </Text>
                  <Text className="font-sans text-[14px] text-ink dark:text-ink-dark leading-[1.5] mt-1">
                    {l.howToDifferentiate}
                  </Text>
                </View>
              )
            })}
            {plant.lookalikes.length === 0 && (
              <Text className="font-sans text-[14px] text-muted dark:text-muted-dark italic">Ei tunnettuja näköislajeja.</Text>
            )}
          </View>
        </CollapsibleSection>
      </View>
    </ScrollView>
  )
}
```

- [ ] **Step 22.2: Verify on emulator**

Tap each fixture card from Home → Detail. Confirm:
- Hero image, finnishName, latinName visible
- safetyNote callout right after hero
- DifficultyBadge + (BeginnerBadge if applicable)
- Months row
- Collapsibles work — tap to open/close
- Kuusenkerkät detail: Marjakuusi-lookalike shown with red bordered callout, full howToDifferentiate text visible

- [ ] **Step 22.3: Commit**

```bash
git add app/plants/[id].tsx
git commit -m "feat: add Plant Detail screen with safety-first layout"
```

---

# Section 7 — Haku ja filterit

## Task 23: SearchBar component + Home integration

**Files:**
- Create: `src/components/SearchBar.tsx`
- Modify: `app/index.tsx`

- [ ] **Step 23.1: Implement SearchBar**

Create `src/components/SearchBar.tsx`:

```tsx
import { TextInput, View } from 'react-native'
import { Search } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import { useAppStore } from '@/store/useAppStore'

export function SearchBar() {
  const setSearchQuery = useAppStore((s) => s.setSearchQuery)
  const [local, setLocal] = useState('')

  useEffect(() => {
    const id = setTimeout(() => setSearchQuery(local), 200)
    return () => clearTimeout(id)
  }, [local, setSearchQuery])

  return (
    <View className="flex-row items-center bg-surface dark:bg-surface-dark rounded-btn px-3 h-12 gap-2 border border-zinc-200 dark:border-zinc-800">
      <Search size={18} color="#5A6151" />
      <TextInput
        className="flex-1 text-[16px] font-sans text-ink dark:text-ink-dark"
        placeholder="Etsi kasvia..."
        placeholderTextColor="#5A6151"
        value={local}
        onChangeText={setLocal}
        autoCorrect={false}
        autoCapitalize="none"
      />
    </View>
  )
}
```

- [ ] **Step 23.2: Wire SearchBar into Home; jump to /plants on input**

Update `app/index.tsx` — add SearchBar import and view block, plus router redirect when query is non-empty:

```tsx
// Add imports near top:
import { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { SearchBar } from '@/components/SearchBar'
import { useAppStore } from '@/store/useAppStore'

// Inside Home component, before return:
const router = useRouter()
const searchQuery = useAppStore((s) => s.searchQuery)
useEffect(() => {
  if (searchQuery.length > 0) router.push('/plants')
}, [searchQuery, router])

// In JSX, add after the greeting block, before featured:
<View className="px-5 pb-6">
  <SearchBar />
</View>
```

The full updated `app/index.tsx`:

```tsx
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { plants } from '@/data/plants'
import { categories, categoryLabels } from '@/data/categories'
import { capitalize } from '@/lib/months'
import { usePlants } from '@/hooks/usePlants'
import { CategoryRow } from '@/components/CategoryRow'
import { SearchBar } from '@/components/SearchBar'
import { useAppStore } from '@/store/useAppStore'

export default function Home() {
  const router = useRouter()
  const { featured, currentMonth: month } = usePlants()
  const searchQuery = useAppStore((s) => s.searchQuery)

  useEffect(() => {
    if (searchQuery.length > 0) router.push('/plants')
  }, [searchQuery, router])

  return (
    <SafeAreaView className="flex-1 bg-canvas dark:bg-canvas-dark" edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <View className="px-5 pt-2 pb-6 gap-1">
          <Text className="font-serif text-[24px] text-ink dark:text-ink-dark leading-[1.3]">
            Mitä luonnosta löytyy {capitalize(month).toLowerCase()}ssa?
          </Text>
          <Text className="font-sans text-[14px] text-muted dark:text-muted-dark">
            {featured.length} kasvia juuri nyt
          </Text>
        </View>
        <View className="px-5 pb-6">
          <SearchBar />
        </View>
        {featured.length > 0 ? (
          <View className="pb-8">
            <CategoryRow title="Juuri nyt" plants={featured} />
          </View>
        ) : (
          <View className="px-5 pb-8">
            <Text className="font-sans text-[14px] text-muted dark:text-muted-dark">
              Tällä kuukaudella ei ole listallamme kasveja — tutustu kuitenkin koko valikoimaan.
            </Text>
          </View>
        )}
        <View className="gap-8">
          <CategoryRow title={categoryLabels.helppo} plants={categories.helppo(plants)} />
          <CategoryRow title={categoryLabels.syotavat} plants={categories.syotavat(plants)} />
          <CategoryRow title={categoryLabels.teekasvit} plants={categories.teekasvit(plants)} />
          <CategoryRow title={categoryLabels.metsa} plants={categories.metsa(plants)} />
          <CategoryRow title={categoryLabels.piha} plants={categories.piha(plants)} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
```

- [ ] **Step 23.3: Verify on emulator — type into search → goes to /plants**

Restart server. Type "nokk" in search bar → app navigates to Plant List. Stop server.

- [ ] **Step 23.4: Commit**

```bash
git add src/components/SearchBar.tsx app/index.tsx
git commit -m "feat: add SearchBar with debouncing and Home → List redirect on input"
```

---

## Task 24: FilterChips component + List integration

**Files:**
- Create: `src/components/FilterChips.tsx`
- Modify: `app/plants/index.tsx`

- [ ] **Step 24.1: Implement FilterChips**

Create `src/components/FilterChips.tsx`:

```tsx
import { Pressable, ScrollView, Text } from 'react-native'
import { useAppStore } from '@/store/useAppStore'

type Chip =
  | { kind: 'month'; label: string; value: 'kesäkuu' | 'heinäkuu' }
  | { kind: 'difficulty'; label: string; value: 'easy' }
  | { kind: 'tag'; label: string; value: 'syötävä' | 'teekasvi' }
  | { kind: 'beginner'; label: string }

const chips: Chip[] = [
  { kind: 'month', label: 'Kesäkuu', value: 'kesäkuu' },
  { kind: 'month', label: 'Heinäkuu', value: 'heinäkuu' },
  { kind: 'difficulty', label: 'Helppo', value: 'easy' },
  { kind: 'tag', label: 'Syötävä', value: 'syötävä' },
  { kind: 'tag', label: 'Teekasvi', value: 'teekasvi' },
  { kind: 'beginner', label: 'Aloittelijalle' },
]

export function FilterChips() {
  const filters = useAppStore((s) => s.filters)
  const toggleMonth = useAppStore((s) => s.toggleMonth)
  const toggleDifficulty = useAppStore((s) => s.toggleDifficulty)
  const toggleTag = useAppStore((s) => s.toggleTag)
  const setBeginnerOnly = useAppStore((s) => s.setBeginnerOnly)
  const resetFilters = useAppStore((s) => s.resetFilters)

  const isActive = (chip: Chip): boolean => {
    if (chip.kind === 'month') return filters.months.includes(chip.value)
    if (chip.kind === 'difficulty') return filters.difficulty.includes(chip.value)
    if (chip.kind === 'tag') return filters.tags.includes(chip.value)
    return filters.beginnerFriendlyOnly
  }

  const onPress = (chip: Chip) => {
    if (chip.kind === 'month') toggleMonth(chip.value)
    else if (chip.kind === 'difficulty') toggleDifficulty(chip.value)
    else if (chip.kind === 'tag') toggleTag(chip.value)
    else setBeginnerOnly(!filters.beginnerFriendlyOnly)
  }

  const anyActive =
    filters.months.length > 0 ||
    filters.difficulty.length > 0 ||
    filters.tags.length > 0 ||
    filters.beginnerFriendlyOnly

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
    >
      {chips.map((chip) => {
        const active = isActive(chip)
        return (
          <Pressable
            key={chip.kind + ('value' in chip ? chip.value : '')}
            onPress={() => onPress(chip)}
            className={`h-10 px-4 rounded-btn justify-center ${active ? 'bg-primary dark:bg-primary-dark' : 'bg-surface dark:bg-surface-dark border border-zinc-200 dark:border-zinc-800'}`}
          >
            <Text
              className={`font-sans text-[14px] ${active ? 'text-canvas dark:text-canvas-dark' : 'text-ink dark:text-ink-dark'}`}
            >
              {chip.label}
            </Text>
          </Pressable>
        )
      })}
      {anyActive && (
        <Pressable onPress={resetFilters} className="h-10 px-4 rounded-btn justify-center">
          <Text className="font-sans text-[14px] text-accent dark:text-accent-dark underline">Tyhjennä</Text>
        </Pressable>
      )}
    </ScrollView>
  )
}
```

- [ ] **Step 24.2: Wire SearchBar + FilterChips + filtered data into Plant List**

Replace `app/plants/index.tsx`:

```tsx
import { FlatList, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { usePlants } from '@/hooks/usePlants'
import { useAppStore } from '@/store/useAppStore'
import { SearchBar } from '@/components/SearchBar'
import { FilterChips } from '@/components/FilterChips'
import { PlantCard } from '@/components/PlantCard'
import { EmptyState } from '@/components/EmptyState'

export default function PlantList() {
  const { filtered } = usePlants()
  const resetFilters = useAppStore((s) => s.resetFilters)
  const setSearchQuery = useAppStore((s) => s.setSearchQuery)

  return (
    <SafeAreaView className="flex-1 bg-canvas dark:bg-canvas-dark" edges={['bottom']}>
      <View className="px-5 py-3">
        <SearchBar />
      </View>
      <View className="pb-3">
        <FilterChips />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(p) => p.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32, gap: 16 }}
        renderItem={({ item }) => <PlantCard plant={item} />}
        ListEmptyComponent={
          <EmptyState
            message="Ei tuloksia näillä ehdoilla."
            actionLabel="Tyhjennä filterit"
            onAction={() => {
              resetFilters()
              setSearchQuery('')
            }}
          />
        }
      />
    </SafeAreaView>
  )
}
```

- [ ] **Step 24.3: Verify integration on emulator**

Test scenarios:
- Type "maito" in SearchBar (List view) → only Maitohorsma shows
- Tap "Heinäkuu" chip → only kesäkuu/heinäkuu plants
- Tap "Aloittelijalle" → only beginnerFriendly plants (Kuusenkerkät disappears)
- Tap "Tyhjennä" → all plants return
- Combine: "Heinäkuu" + "Syötävä" → intersection
- Empty result: "Heinäkuu" + "Teekasvi" with current fixtures → EmptyState shows

- [ ] **Step 24.4: Commit**

```bash
git add src/components/FilterChips.tsx app/plants/index.tsx
git commit -m "feat: wire FilterChips + SearchBar into Plant List with empty state"
```

---

# Section 8 — Dark mode + visuaalinen viimeistely

## Task 25: Visual polish review and fixes

This is a dedicated review pass — no big new code, just adjustments based on emulator inspection in light + dark.

- [ ] **Step 25.1: Test both themes**

Restart emulator. Toggle Android system theme (Settings → Display → Dark theme). Check every screen:
- Home: greeting, SearchBar, "Juuri nyt" row, all category rows
- List: SearchBar, FilterChips, plant cards, empty state
- Detail: hero, safetyNote callout, badges, all collapsibles, danger callouts

- [ ] **Step 25.2: Capture issues, then fix inline**

Document each issue and fix it in the same commit. Common issues to look for:
- Contrast: text on backgrounds in dark mode
- Borders showing in dark mode that shouldn't (or vice versa)
- StatusBar color in light vs dark
- Touch target sizes (chips, badges, links)
- Image aspect ratios (4:3 list cards, 16:9 hero)
- Font weights rendering correctly (Inter vs Lora)

- [ ] **Step 25.3: Add subtle entry animations to PlantCard list**

In `src/components/PlantCard.tsx`, wrap the outer `Pressable` in `Animated.View` with `entering={FadeIn.delay(idx * 50)}` if performance allows. Skip if fixtures already animate via FlatList default.

- [ ] **Step 25.4: Commit fixes**

```bash
git add -A
git commit -m "fix: dark-mode contrast and visual polish from manual review"
```

---

# Section 9 — Sisällön konversio

## Task 26: Convert reviewed plants from review doc to plants.ts

**Gating:** Riku must update `docs/plant-content-review.md` so each plant's `reviewStatus` is `approved` (or `rejected` to skip). Riku confirms invariants #10 and #11 are satisfied: every approved plant has at least one non-Wikipedia source, and (for medical-warning plants) a trusted medical/poison source.

**Files:**
- Replace: `src/data/plants.ts`
- Update: `src/data/imageMap.ts`
- Add: `assets/plants/<id>.webp` for each approved plant

- [ ] **Step 26.1: List approved plant IDs**

Open `docs/plant-content-review.md`, list plants with `reviewStatus: approved`. Confirm with Riku.

- [ ] **Step 26.2: Manually prepare images for each approved plant**

For each plant:
1. Open `imageSourceUrl` (the Wikimedia URL noted in the review doc) in a browser
2. Download the highest-res version available on the Wikimedia file page
3. Convert to WebP at quality 80, max 1200×800 px. Tools: GIMP (Export As → WebP), online converters (e.g., squoosh.app), or `magick input.jpg -resize 1200x800 -quality 80 output.webp` if ImageMagick installed
4. Save as `assets/plants/<plant-id>.webp` (e.g., `assets/plants/nokkonen.webp`)

Note: `blurhash` field can be omitted for MVP — `expo-image` falls back to a tiny color placeholder. v2 can compute blurhashes via a one-shot `scripts/blurhash.ts` if needed.

- [ ] **Step 26.3: Replace `src/data/plants.ts`**

For each approved plant in the review doc, create a Plant object matching `PlantSchema`. Replace the entire content of `src/data/plants.ts`:

```ts
import type { Plant } from '@/data/plant.schema'
import { PlantSchema } from '@/data/plant.schema'

const raw: Plant[] = [
  {
    id: 'nokkonen',
    finnishName: 'Nokkonen',
    latinName: 'Urtica dioica',
    shortDescription: '... (from review doc, ≤120 chars)',
    description: '... (from review doc)',
    months: ['toukokuu','kesäkuu','heinäkuu','elokuu','syyskuu'],
    habitats: ['ravinteinen multainen maa', 'pihat', /* ... */],
    edibleParts: ['nuoret versot','nuoret lehdet'],
    uses: ['nokkoskeitto', /* ... */],
    tags: ['syötävä','lehti','teekasvi'],
    difficulty: 'easy',
    beginnerFriendly: true,
    safetyNote: '... (from review doc)',
    warnings: [
      'Polttokarvat: käytä käsineitä',
      /* ... */
    ],
    lookalikes: [
      {
        name: 'Valkopeippi (Lamium album)',
        dangerLevel: 'matala',
        howToDifferentiate: '... (from review doc)',
      },
    ],
    image: 'plants/nokkonen.webp',
    imageCredit: '... (from Wikimedia file page)',
    imageLicense: 'CC BY-SA 4.0',
    imageSourceUrl: 'https://commons.wikimedia.org/wiki/File:Urtica_dioica_001.jpg',
    sources: [
      { title: 'Pinkka virtuaalikasvio', url: 'https://pinkka.helsinki.fi/...', publisher: 'Helsingin yliopisto' },
      { title: 'Lääketietokeskus: munuaiset', url: 'https://www.laaketietokeskus.fi/...', publisher: 'Lääketietokeskus' },
      // — invariant #10: at least one non-Wikipedia
      // — invariant #11: trusted medical source if warnings include medical keywords
    ],
  },
  // ... repeat for each approved plant
]

export const plants: Plant[] = raw.map((p) => PlantSchema.parse(p))
```

- [ ] **Step 26.4: Update `src/data/imageMap.ts`**

Replace contents:

```ts
export const imageMap: Record<string, ReturnType<typeof require>> = {
  'plants/nokkonen.webp': require('../../assets/plants/nokkonen.webp'),
  'plants/voikukka.webp': require('../../assets/plants/voikukka.webp'),
  // ... one entry per approved plant
}
```

- [ ] **Step 26.5: Run all tests**

```bash
pnpm test
```

Expected: all passing.

If invariants fail, fix the **data** (not the tests):
- #10: Plant has only Wikipedia sources → add Pinkka/SLL/Luontoportti/etc.
- #11: Plant has medical warnings but no trusted medical source → add Lääketietokeskus/Myrkytystietokeskus
- Schema: `safetyNote` empty, `imageSourceUrl` not a URL, `shortDescription` >120 chars, etc.

- [ ] **Step 26.6: Smoke-test on emulator**

```bash
pnpm exec expo start --android --clear &
```

Open every approved plant's detail screen. Verify image loads, safetyNote correct, lookalikes render correctly (especially kuusenkerkät's marjakuusi if approved).

- [ ] **Step 26.7: Commit**

```bash
git add src/data/plants.ts src/data/imageMap.ts assets/plants/
git commit -m "feat: convert N approved plants from review doc into plants.ts"
```

(Replace N with actual approved count.)

---

# Section 10 — Android preview build

## Task 27: EAS Build setup + preview APK

**Files:**
- Create: `eas.json`
- Modify: `app.json`

- [ ] **Step 27.1: Install EAS CLI globally (one-time per machine)**

```bash
pnpm add -g eas-cli
```

- [ ] **Step 27.2: Login to Expo (Riku does this — interactive)**

```bash
eas login
```

This requires Riku to enter Expo account credentials. If no account exists, sign up at expo.dev first.

- [ ] **Step 27.3: Configure project for EAS**

```bash
eas init --id-only
```

This adds an EAS project ID to `app.json` under `extra.eas.projectId`.

- [ ] **Step 27.4: Create `eas.json`**

```json
{
  "cli": { "version": ">= 3.0.0" },
  "build": {
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  },
  "submit": { "production": {} }
}
```

- [ ] **Step 27.5: Set Android package name in `app.json`**

In `app.json` under `expo.android`:

```json
"android": {
  "package": "fi.villiyrtit.app",
  "adaptiveIcon": {
    "foregroundImage": "./assets/adaptive-icon.png",
    "backgroundColor": "#FAF8F5"
  }
}
```

- [ ] **Step 27.6: Build preview APK**

```bash
eas build --profile preview --platform android
```

This runs in the cloud (Expo's build servers). Takes 5–15 min. Riku monitors via the URL printed.

- [ ] **Step 27.7: Download APK and install on Android device**

Once build finishes, EAS provides a download URL. Download APK to phone (e.g., via email or Drive), enable "Install unknown apps" for the source, install. Open the app.

- [ ] **Step 27.8: Verify on physical device**

Same checks as emulator: Home, List, Detail, search, filters, dark mode toggle. Confirm no crashes, no missing fonts/images, performance acceptable.

- [ ] **Step 27.9: Commit configuration**

```bash
git add eas.json app.json
git commit -m "chore: configure EAS Build with Android preview APK profile"
```

---

# Section 11 — Manual QA + release

## Task 28: README and final QA checklist

**Files:**
- Create: `README.md`, `docs/qa-checklist.md`

- [ ] **Step 28.1: Write README**

Create `README.md`:

```markdown
# Villiyrtit

Suomalainen villiyrttisovellus kesä–heinäkuun yleisimmille kasveille. Offline-first, Android-painotteinen.

## Kehitys

```bash
pnpm install
pnpm exec expo start --android
```

## Testaus

```bash
pnpm test
pnpm typecheck
```

## Sisällön päivitys

1. Muokkaa `docs/plant-content-review.md` ja aseta `reviewStatus: approved` kasville.
2. Lataa kasvin Wikimedia-kuva, konvertoi WebP-muotoon (max 1200×800, Q80), tallenna `assets/plants/<id>.webp`.
3. Lisää kasvi käsin `src/data/plants.ts`-tiedostoon noudattaen `PlantSchema`-rakennetta.
4. Lisää kuva-merkintä `src/data/imageMap.ts`-tiedostoon.
5. Aja `pnpm test` — invariantit (mm. #10 ja #11) varmistavat sisällön laadun.

## Build (Android preview APK)

```bash
eas build --profile preview --platform android
```

## Dokumentit

- `docs/superpowers/specs/2026-05-09-villiyrttisovellus-design.md` — design
- `docs/plant-content-review.md` — kasvisisällön review
- `docs/superpowers/plans/2026-05-09-villiyrttisovellus-mvp.md` — implementation plan
- `docs/qa-checklist.md` — QA-tarkistuslista

## Lisenssi

Kasvikuvat: kunkin kasvin metadata kentässä `imageCredit` / `imageLicense`. Sovelluskoodi: lisenssi vahvistetaan ennen julkaisua.
```

- [ ] **Step 28.2: Write QA checklist**

Create `docs/qa-checklist.md`:

```markdown
# Manual QA checklist

Käy läpi ennen julkaisua jokaisesta merkittävästä muutoksesta. Suorita Android-emulaattorissa **ja** fyysisellä laitteella.

## Asennus & ensimmäinen käynnistys
- [ ] APK asentuu Android-laitteelle ilman virheitä
- [ ] Splash screen näkyy, sitten Home-näkymä
- [ ] Fontit (Inter, Lora) latautuvat oikein

## Home Screen
- [ ] Tervehdys näyttää oikean kuukauden ("Mitä luonnosta löytyy {kuukausi}ssa?")
- [ ] Kasvimäärä-rivi näyttää oikean luvun
- [ ] SearchBar näkyy, focus toimii
- [ ] "Juuri nyt" -rivi näyttää currentMonth-osumat (jos olemassa)
- [ ] Tyhjä-currentMonth-tila näyttää sopivan viestin
- [ ] Kategoriarivit näkyvät, tyhjät kategoriat piilossa
- [ ] Horisontaalinen scroll toimii sulavasti jokaisessa rivissä

## SearchBar
- [ ] Kirjoittaminen Home-näkymässä → ohjautuu /plants
- [ ] Debouncing: noin 200 ms viive ennen tulosten päivittymistä
- [ ] Suomalaiset merkit (ä, ö) toimivat sekä syötteessä että hakuosumissa
- [ ] Tyhjä haku näyttää kaikki kasvit

## Plant List
- [ ] Kaikki kasvit näkyvät kortteina
- [ ] FilterChips näkyvät, vaakatason scroll
- [ ] Kuukausi-chip toggle toimii (klikki aktivoi, uudelleen klikki poistaa)
- [ ] Vaikeustaso-chip toimii
- [ ] Tag-chipit (Syötävä, Teekasvi) toimivat
- [ ] Aloittelijalle-chip suodattaa beginnerFriendly=true-kasveihin
- [ ] Yhdistelmäfiltterit toimivat AND-logiikalla
- [ ] "Tyhjennä"-nappi näkyy vain aktiivisten filttereiden kanssa, palauttaa kaiken
- [ ] Empty state näkyy filttereiden tuottaessa nolla osumaa, "Tyhjennä filterit"-nappi toimii

## Plant Detail
- [ ] Hero-kuva latautuu (blurhash placeholder ennen latausta)
- [ ] Suomalainen nimi (Lora 32px) ja latinankielinen nimi (italic) näkyvät
- [ ] Kuvalisenssi-kreditti näkyy hero-kuvan alla pienellä
- [ ] safetyNote-callout näkyy heti hero-kuvan jälkeen, varoitusvärityksellä
- [ ] DifficultyBadge näkyy, oikealla värityksellä
- [ ] BeginnerBadge näkyy vain beginnerFriendly=true-kasveille
- [ ] Kuukaudet-rivi näyttää löytymisajat
- [ ] Kuvaus-teksti näkyy
- [ ] Kaikki collapsiblet (Tunnistus, Syötävät osat, Käyttötavat, Habitatit, Varoitukset, Vaaralliset näköislajit) avautuvat ja sulkeutuvat sulavalla animaatiolla
- [ ] Vaaralliset näköislajit (korkea/kuolettava) renderöityvät punaisella reunalla, howToDifferentiate täysimittaisena näkyvillä
- [ ] Tyhjät kentät (esim. "Ei syötäviä osia") näyttävät italicized fallbackin

## Vaaralliset kasvit
- [ ] Kuusenkerkät: Marjakuusi-näköislaji näkyy punaisena callouttina, koko howToDifferentiate-teksti luettavissa
- [ ] PlantCardissa pieni varoitusikoni näkyy kasveille joilla on korkea/kuolettava-tason näköislaji

## Dark mode
- [ ] OS-tason teemavaihto (Android Settings → Display → Dark theme) heijastuu sovellukseen heti
- [ ] StatusBar-väri vaihtuu (light/dark)
- [ ] Light: kerma-tausta, valkoiset kortit
- [ ] Dark: tumma metsä-tausta, hieman vaaleampi pinta korteille
- [ ] Tekstien kontrasti riittävä molemmissa
- [ ] Varoitusvärit (#C8341B, #D4A012) näkyvät selvästi molemmissa
- [ ] Border-erottelut näkyvät kortteissa dark-modessa

## Navigaatio
- [ ] Home → Plant List (kategoriasta tai SearchBar-kirjoituksesta)
- [ ] Home → Plant Detail (featured-kortin klikkaus)
- [ ] List → Plant Detail (kortin klikkaus)
- [ ] Header back-nappi vie edelliseen näkymään
- [ ] Olematon ID URL:ssa (`villiyrtit://plant/foo`) → +not-found tai redirect

## Suorituskyky
- [ ] Käynnistysaika alle 3 s
- [ ] Listan scroll sulava (60 fps)
- [ ] Detail-näkymän hero-kuva latautuu nopeasti (oletettu pakattu webp)
- [ ] Ei muistitukoksia useamman näkymän selaamisessa

## Saavutettavuus
- [ ] Touch targetit vähintään 48×48 px
- [ ] Tekstien koot riittävät (16 px leipä, 14 px small)
- [ ] Sisällön kontrasti AA-tasolla minimissä
- [ ] Suomenkieliset alt-tekstit kuville (jos toteutettu — v2)

## Asennus & säilyvyys
- [ ] Sovellus ei kaadu ensimmäisellä käynnistyksellä
- [ ] Filtteritila resetoituu joka käynnistyksessä (ei persistoidu MVP:ssä — odotettu käytös)
```

- [ ] **Step 28.3: Run full QA**

Walk through every checkbox in the checklist on both Android emulator and physical device. Mark off each item.

- [ ] **Step 28.4: Commit + tag**

```bash
git add README.md docs/qa-checklist.md
git commit -m "docs: add README and manual QA checklist"
git tag v0.1.0-mvp
```

---

# Self-review

**Spec coverage:**
- §2 Stack — Tasks 1, 3, 4, 5, 19 ✓
- §3 Tiedostorakenne — covered across tasks ✓
- §4 Datamalli — Tasks 6, 7 ✓
- §5 Sisältöprosessi & reviewStatus — Task 26 (manual conversion gated by reviewStatus) ✓
- §6 Navigaatio — Task 3 + Task 19 ✓
- §7 State — Task 13 ✓
- §8 Haku ja filterit — Tasks 10, 11, 23, 24 ✓
- §9 Tyyli, typografia, dark mode — Tasks 4, 14, 19 + components, polished in Task 25 ✓
- §10 Virhetilat — Task 3.6 (+not-found), Task 18 (EmptyState), Task 22 (redirect missing id) ✓
- §11 Testaus — Tasks 6, 7, 8, 9, 10, 11, 12, 13, 15 ✓
- §12 Build pipeline — Task 27 (EAS Build) ✓
- §13 Roadmap v2 — out of scope (per spec) ✓

**Invariants 1–11:**
- #1 (safetyNote): Zod (Task 6); covered in tests
- #2 (image file exists): Task 8
- #3 (image license fields): Zod (Task 6)
- #4 (id unique): Task 8
- #5 (beginnerFriendly logic): Task 7
- #6 (dangerous lookalike): Task 7
- #7 (heuristic safetyNote keywords): Task 8
- #8 (sources non-empty + valid URLs): Zod (Task 6); covered in tests
- #9 (approved status requires sources): manual review-portti at Task 26.1; documented
- #10 (non-Wikipedia source): Task 8
- #11 (trusted medical source for medical warnings): Task 8

**Type consistency check:** `Plant`, `Lookalike`, `Source`, `Filters`, `Month`, `Tag`, `DangerLevel`, `Difficulty` — single source of truth in `src/data/plant.schema.ts` and `src/lib/filter.ts`. All component props derive from these.

**Placeholder scan:** No "TBD"/"TODO"/"implement later" lines except in Task 26 plant-data examples where Riku fills in actual content from the review doc — these are explicit "(from review doc)" markers, not placeholders for the engineer.

**No build-time image automation in MVP** (per Riku's directive): Task 26.2 instructs manual webp conversion. v2 may add `scripts/blurhash.ts` or full `scripts/fetch-images.ts`.
