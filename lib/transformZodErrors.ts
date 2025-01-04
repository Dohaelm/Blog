import { ZodError } from 'zod';


export function transformZodErrors(error: ZodError): string {
    return error.errors.map(err => err.message).join('\n');
  }