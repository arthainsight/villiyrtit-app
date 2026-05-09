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
