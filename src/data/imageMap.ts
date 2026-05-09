// Static image map. Each plant.image path → require() of the bundled asset.
// Updated whenever a new plant is added in Task 26 (real plants).
export const imageMap: Record<string, ReturnType<typeof require>> = {
  'plants/fixture-nokkonen.webp': require('../../assets/plants/fixture-nokkonen.webp'),
  'plants/fixture-maitohorsma.webp': require('../../assets/plants/fixture-maitohorsma.webp'),
  'plants/fixture-kuusenkerkat.webp': require('../../assets/plants/fixture-kuusenkerkat.webp'),
}
