import { devFixturePlants } from '@/dev/dev-fixtures'
import type { Plant } from '@/data/plant.schema'

// DEVELOPMENT FIXTURES — replaced by real plant data in Task 26 (gated by reviewStatus=approved
// in docs/plant-content-review.md). Until then the app uses 3 placeholder fixtures so UI work
// can proceed in Section 5+. See src/dev/dev-fixtures.ts.
//
// When Task 26 runs, this file's contents are replaced with the real Plant[] array
// and src/dev/dev-fixtures.ts can be deleted.
export const plants: Plant[] = devFixturePlants
