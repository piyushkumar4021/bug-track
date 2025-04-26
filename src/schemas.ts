import { z } from 'zod';

export const bugSchema = z.object({
  title: z
    .string({ message: 'This field is required.' })
    .min(3, 'Title must contain at least 3 character(s)')
    .max(255, 'Title must contain at most 255 character(s)'),
  description: z
    .string({ message: 'This field is required.' })
    .min(5, 'Desciption must contain at least 3 character(s)'),
});
