/**
 * The five encoded-and-enforced markets — the single source of truth for both the
 * Trust page and the Lending compliance section, so the two never drift.
 * Order: USA · UK · India · Nigeria · Brazil. Surfaced through
 * components/trust/JurisdictionTabs.
 */

import type { Jurisdiction } from '@/components/trust/JurisdictionTabs'

export const JURISDICTIONS: Jurisdiction[] = [
  { region: 'United States', short: 'USA', frameworks: ['FDCPA', 'Reg F', 'TCPA', 'FCRA', 'ECOA / Reg B', 'TILA / Reg Z', 'SCRA', 'GLBA', 'UDAAP'] },
  { region: 'United Kingdom', short: 'UK', frameworks: ['FCA Consumer Duty', 'CONC sourcebook', 'Consumer Credit Act 1974', 'FCA Principles', 'DISP (complaints)', 'UK GDPR / DPA 2018', 'PECR', 'MLR 2017'] },
  { region: 'India', short: 'India', frameworks: ['RBI Digital Lending Guidelines', 'Fair Practices Code', 'KYC Master Direction', 'SARFAESI Act', 'DPDP Act 2023', 'TRAI TCCCPR', 'CIC reporting (CICRA)', 'PMLA / AML', 'RBI recovery-agent norms'] },
  { region: 'Nigeria', short: 'Nigeria', frameworks: ['CBN Prudential Guidelines', 'BOFIA 2020', 'FCCPC Digital Lending Regulations', 'NDPA 2023 (NDPC)', 'CBN Consumer Protection Framework', 'Credit Reporting Act 2017', 'CBN AML/CFT Regulations'] },
  { region: 'Brazil', short: 'Brazil', frameworks: ['LGPD (ANPD)', 'Código de Defesa do Consumidor (CDC)', 'Lei do Superendividamento', 'CMN / BCB resolutions', 'Cadastro Positivo', 'SCR credit reporting', 'COAF / Law 9.613'] },
]
