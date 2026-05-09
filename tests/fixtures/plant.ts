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
