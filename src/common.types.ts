import { z } from 'zod';

export interface ServiceProps {
  userId: string | null;
  token: string | null;
}

export const zErrorResponse = z.object({
  success: z.boolean(),
  errorMessage: z.string(),
});
