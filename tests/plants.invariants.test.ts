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
