import { z } from 'zod';

export const zEntry = z.object({
  Id: z.string(),
  UserId: z.string(),
  Content: z.string(),
  Date: z.coerce.date(),
});

export const zEntries = z.array(zEntry);

export const zEntriesFetchByUserIdResponse = z.object({
  success: z.boolean(),
  data: z.object({
    userEntries: zEntries,
  }),
});

export type Entry = z.infer<typeof zEntry>;
export type Entries = z.infer<typeof zEntries>;
