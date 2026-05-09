import type { Plant } from '@/data/plant.schema'

// Real plants are added in a later task (gated by Riku setting reviewStatus: approved
// in docs/plant-content-review.md). Until then this list stays empty so
// invariant tests pass trivially. Dev fixtures are added in Task 14 to drive UI work.
export const plants: Plant[] = []
