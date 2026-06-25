import type { Metadata } from 'next'
import LegalDoc from '@/components/LegalDoc'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'The terms that govern your use of the Krim website at krim.ai. Use of the KrimOS product is governed by a separate written agreement.',
  alternates: { canonical: 'https://krim.ai/terms' },
}

const EFFECTIVE = 'Last updated: 25 June 2026'

const INTRO = `These Terms of Use ("Terms") govern your access to and use of the Krim website at krim.ai (the "Site"), operated by Krim AI Inc. ("Krim", "we", "us", "our"), registered at 169 Madison Ave, STE 15775, New York, NY 10016, United States.

By accessing or using the Site, you agree to these Terms. If you do not agree, please do not use the Site.`

const SECTIONS = [
  {
    heading: 'The Site, and our products',
    body: `The Site is a marketing and informational website. It describes Krim and our product, KrimOS. It has no accounts, logins, or payments, and nothing is sold or delivered through it. You can read about Krim and request a demo.

Use of the KrimOS product is separate. Any access to or use of KrimOS or any other Krim product or service is governed by a separate written agreement between Krim and the relevant customer. These Terms do not grant you any right or licence to use any Krim product, and nothing on the Site creates a contract for the product or forms part of that separate agreement.`,
  },
  {
    heading: 'Informational only',
    body: `Content on the Site is provided for general information about Krim and KrimOS. Nothing on the Site is an offer, a solicitation, a recommendation, or a binding commitment, and nothing on it is legal, regulatory, financial, investment, lending, or other professional advice.

You should not rely on the Site as the sole basis for any decision, or as a substitute for professional advice or for the terms of any agreement with Krim. Product descriptions, capabilities, and timelines may change without notice and do not form part of any contract.`,
  },
  {
    heading: 'Forward-looking statements and research direction',
    body: `The Site describes KrimOS and related work, including the World Lending Model and our research toward an AI underwriter. Some of what we describe reflects current plans, capabilities under development, and the direction of our research, rather than features that are generally available today.

These descriptions may change, and we do not guarantee that any particular feature will be offered, or will perform exactly as described, in any specific deployment. Forward-looking statements involve assumptions, risks, and uncertainties, and actual products and outcomes may differ. We are not obliged to update them. Any deployment is defined by the applicable written agreement.`,
  },
  {
    heading: 'Who may use the Site',
    body: `The Site is intended for business and professional users who are at least the age of majority where they live and able to enter into a binding agreement. By using the Site, you confirm this is the case and that you will use the Site in compliance with applicable laws.`,
  },
  {
    heading: 'Acceptable use',
    body: `You agree to use the Site lawfully and not to:

- use it for any unlawful purpose or in a way that infringes others' rights
- attempt to gain unauthorised access to the Site, its servers, or related systems, or probe, scan, or test their security
- interfere with or disrupt the Site, or introduce malicious code
- scrape, harvest, or collect data from the Site by automated means, except for standard search-engine indexing or with our written consent
- misuse the contact form, for example by submitting false information, another person's details without authority, or unsolicited or bulk messages
- copy, reproduce, frame, or republish the Site or its content except as these Terms allow
- use the Site or its content to build or train a competing product or a machine-learning model

When you submit information through our contact form, you confirm that it is accurate and that you are entitled to provide it.`,
  },
  {
    heading: 'Your submissions',
    body: `If you send us information through the Site, for example through the contact form or by email, you grant us a non-exclusive, worldwide, royalty-free licence to use that information to respond to you, to follow up about your enquiry, and to operate and improve the Site, consistent with our Privacy Policy.

Please do not send confidential, sensitive, or regulated information through the Site, including customer or borrower data, financial account details, or government identifiers. The form is not a secure channel for that kind of information. If a conversation needs it, we will set up an appropriate, secure channel.`,
  },
  {
    heading: 'Intellectual property and trademarks',
    body: `The Site and its content, including text, graphics, design, logos, and software, are owned by or licensed to Krim and are protected by intellectual-property laws. We grant you a limited, personal, non-exclusive, non-transferable, revocable licence to view the Site for your own informational and business-evaluation purposes. You may not copy, reproduce, republish, modify, distribute, or create derivative works from the Site without our prior written permission, except as allowed by law. All rights not expressly granted are reserved.

"Krim" and "KrimOS", together with the Krim logo and related names and marks, are trademarks of Krim AI Inc. You may not use them without our prior written permission, except to refer to Krim fairly and accurately. Other names and marks are the property of their respective owners.`,
  },
  {
    heading: 'Third-party links and services',
    body: `The Site may link to or embed third-party sites and services, for example our scheduling tool. We do not control those services and are not responsible for their content, products, or practices, and a link is not an endorsement. Your use of a third-party service is governed by that third party's own terms and privacy policy, and is at your own risk.`,
  },
  {
    heading: 'No warranty',
    body: `The Site and its content are provided "as is" and "as available", without warranties of any kind, whether express or implied, including any implied warranties of merchantability, fitness for a particular purpose, accuracy, and non-infringement.

We do not warrant that the Site will be uninterrupted, error-free, secure, or free of harmful components, or that its content is complete, current, or accurate. Some jurisdictions do not allow the exclusion of certain warranties, so some of these exclusions may not apply to you.`,
  },
  {
    heading: 'Limitation of liability',
    body: `To the fullest extent permitted by law, Krim and its affiliates, officers, employees, agents, and suppliers will not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of profits, revenue, data, goodwill, or business, arising out of or relating to your use of (or inability to use) the Site, even if we have been advised of the possibility of such damages.

To the fullest extent permitted by law, our total aggregate liability arising out of or relating to the Site will not exceed one hundred US dollars (US$100).

Nothing in these Terms excludes or limits any liability that cannot lawfully be excluded or limited, such as liability for death or personal injury caused by negligence, or for fraud.`,
  },
  {
    heading: 'Indemnity',
    body: `You agree to indemnify and hold Krim harmless from any claims, losses, and reasonable expenses (including reasonable legal fees) arising from your misuse of the Site, your breach of these Terms, or your violation of applicable law or the rights of others, to the extent permitted by applicable law.`,
  },
  {
    heading: 'Privacy',
    body: `Our handling of personal information through the Site is described in our Privacy Policy (/privacy), which forms part of these Terms.`,
  },
  {
    heading: 'Changes to the Site and these Terms',
    body: `We may change, suspend, or discontinue the Site or any part of it at any time. We may also update these Terms from time to time. When we do, we will revise the "Last updated" date above, and material changes take effect when posted. Your continued use of the Site after changes are posted means you accept the updated Terms.`,
  },
  {
    heading: 'Suspension and termination of access',
    body: `We may suspend or terminate your access to the Site at any time if we reasonably believe you have breached these Terms, or to protect the Site or other users. The sections that by their nature should survive, including intellectual property, disclaimers, limitation of liability, indemnity, and governing law, will continue to apply.`,
  },
  {
    heading: 'Governing law and disputes',
    body: `These Terms, and any dispute arising out of or relating to them or the Site, are governed by the laws of the State of Delaware, United States, without regard to conflict-of-laws rules.

You and Krim agree that the courts located in the State of Delaware will have non-exclusive jurisdiction over any dispute relating to the Site or these Terms, except where mandatory local law gives you the right to bring proceedings elsewhere. Nothing here affects any mandatory consumer-protection rights you may have where you live.`,
  },
  {
    heading: 'General',
    body: `If any provision of these Terms is found unenforceable, the rest remain in effect, and the unenforceable provision will be applied as closely as possible to its intent. Our failure to enforce a provision is not a waiver of it.

You may not assign these Terms without our consent; we may assign them in connection with a reorganisation, merger, acquisition, or sale of assets. These Terms, together with the Privacy Policy and any notices we post, are the entire agreement between you and Krim regarding your use of the Site, and supersede any prior understanding about the Site. Use of KrimOS is governed by its separate agreement.`,
  },
  {
    heading: 'Contact',
    body: `Questions about these Terms:

- legal@krim.ai
- Krim AI Inc.
- 169 Madison Ave, STE 15775, New York, NY 10016, United States`,
  },
]

export default function TermsPage() {
  return <LegalDoc title="Terms of Use" effectiveNote={EFFECTIVE} intro={INTRO} sections={SECTIONS} />
}
