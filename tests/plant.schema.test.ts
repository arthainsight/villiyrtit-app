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
