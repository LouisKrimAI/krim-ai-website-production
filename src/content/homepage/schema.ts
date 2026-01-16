/**
 * KRIM AI - HOMEPAGE COPY SCHEMA
 * Build-time validation for copy.json using Zod
 */

import { z } from 'zod';

export const CopySchema = z.object({
  hero: z.object({
    headline: z.string(),
    headlineBreak: z.string(),
    subline: z.string(),
    primaryCta: z.object({ label: z.string(), href: z.string() }),
    secondaryCta: z.object({ label: z.string(), href: z.string() })
  }),
  problem: z.object({
    headline: z.string(),
    subline: z.string(),
    cards: z.array(z.object({ title: z.string(), line1: z.string(), line2: z.string() })),
    footer: z.string()
  }),
  krimos: z.object({
    kicker: z.string(),
    headline: z.string(),
    subline: z.string()
  }),
  pillars: z.object({
    pillarsTag: z.string(),
    pillars: z.array(z.object({ title: z.string(), body: z.string() }))
  }),
  kupa: z.any().optional(),
  kula: z.any().optional(),
  karta: z.any().optional(),
  emergent: z.any().optional(),
  security: z.any().optional(),
  deployment: z.any().optional(),
  integrations: z.any().optional(),
  closing: z.any().optional()
});

export type CopyType = z.infer<typeof CopySchema>;
