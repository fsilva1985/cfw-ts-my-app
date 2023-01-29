import { z } from 'zod'

export const schema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  age: z.number()
})

export class User {
  id: number
  firstName: string
  lastName: string
  age: number
}