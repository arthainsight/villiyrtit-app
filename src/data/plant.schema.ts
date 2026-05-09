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
  // Invariantti #5: beginnerFriendly true ⇒ difficulty=easy ja lookalikes ei sisällä korkea/kuolettava
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
  // Invariantti #6: korkea/kuolettava-lookalike ⇒ howToDifferentiate ei tyhjä JA beginnerFriendly=false
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
