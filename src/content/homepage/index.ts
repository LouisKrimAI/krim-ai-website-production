/**
 * KRIM AI - HOMEPAGE COPY LOADER
 * Validates copy.json at build time using Zod schema
 */

import raw from './copy.json';
import { CopySchema, type CopyType } from './schema';

let validated: CopyType;

try {
  validated = CopySchema.parse(raw);
} catch (e) {
  console.error('Invalid homepage copy.json', e);
  throw e;
}

export function getHomeCopy() {
  return validated;
}

export type HomeCopy = CopyType;
