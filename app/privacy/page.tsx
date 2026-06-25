import type { Metadata } from 'next'
import LegalDoc from '@/components/LegalDoc'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Krim handles personal information collected through the krim.ai website — what we collect, why, who we share it with, and your rights.',
  alternates: { canonical: 'https://krim.ai/privacy' },
}

const EFFECTIVE = 'Effective date: [PLACEHOLDER: effective date] · Last updated: [PLACEHOLDER: last-updated date]'

const INTRO = `This Privacy Policy explains how Krim handles personal information collected through our website at krim.ai (the "Site"). It applies to the Site only.

Krim is a B2B enterprise-software company. Our product, KrimOS, is sold to banks, non-bank lenders, and government bodies. This Site is our marketing and informational website. You cannot create an account, log in, buy anything, or use the KrimOS product through it. The only personal information we collect here is what you choose to send us through our demo and contact form, along with the email follow-up that may result from it.

This policy does not cover any personal data we may process inside the KrimOS product or under a separate written agreement with a customer. That data is governed by that agreement and any related data-processing terms, not by this policy.

In this policy, "Krim", "we", "us", and "our" mean [PLACEHOLDER: registered legal entity name], a company registered at [PLACEHOLDER: registered address]. For privacy questions, you can reach us at [PLACEHOLDER: privacy contact email].`

const SECTIONS = [
  {
    heading: 'Information we collect',
    body: `The Site has no accounts, logins, or payments. We collect personal information in two ways.

Information you give us. When you request a demo or contact us, we collect:

- your name
- your work email address (required)
- your organisation
- your role or job title
- the market or region you operate in
- what you would like to automate
- any message you write

If you book a meeting through our scheduling tool, you also provide the details needed to schedule it (see "Who we share information with").

Please do not include sensitive or confidential information in the free-text fields. They are meant for a short description of what you are trying to solve.

Information created as we follow up. If we email you in response to your enquiry, our email provider records standard delivery events, such as whether a message was delivered, opened, clicked, or bounced, and whether it was marked as spam. If you click a link to download a resource, such as our deck, we record that the download was requested. We keep a simple activity record so we can follow up appropriately and stop emailing you when you ask us to.

Technical information. Like most websites, our hosting provider processes basic technical data needed to deliver pages securely, such as IP address, browser type, and request timestamps, in server logs. We use these for security and troubleshooting and keep them for a short period.

We do not intentionally collect special-category or sensitive personal data through the Site, and we ask that you not submit it.`,
  },
  {
    heading: 'How we use your information, and our lawful basis',
    body: `We use your information to:

- respond to your enquiry and arrange a demo or meeting
- send you a confirmation and a short, related follow-up email sequence about your enquiry, which you can stop at any time
- send you a resource, such as a deck, that you have asked for
- carry out internal sales follow-up
- understand, in aggregate, how the Site is used and improve it
- keep the Site secure and prevent abuse
- comply with our legal obligations and protect our rights

Where the EU GDPR or UK GDPR applies, we rely on our legitimate interest in responding to business enquiries and telling interested organisations about Krim, on your consent where we ask for it, and on legal obligation where the law requires us to keep or disclose information. Where we rely on legitimate interests, you can object at any time.

Where India's Digital Personal Data Protection Act, 2023 applies, we process the personal data you provide on the basis of the consent you give when you submit the form, or for the legitimate uses the Act permits.

Every follow-up email includes a one-click unsubscribe link, and you can opt out at any time. We do not make decisions about you by solely automated means that produce legal or similarly significant effects.`,
  },
  {
    heading: 'Who we share information with',
    body: `We do not sell your personal information, and we do not share it for cross-context behavioural advertising or for third-party marketing.

We use a small number of trusted service providers (sub-processors) to run the Site. They process information only on our instructions and under contract:

- Vercel, for website hosting and delivery
- Supabase, for the database where enquiries and follow-up records are stored
- Resend, for sending and tracking the emails described above
- Plausible, for cookieless, aggregate website analytics
- Calendly, for demo scheduling. Calendly collects the details you provide to schedule a meeting and processes them under its own privacy policy.

We may add or change providers and will keep this list current. We may also disclose information if required by law, to enforce our terms, to protect the rights, safety, or property of Krim or others, or in connection with a corporate transaction such as a merger or acquisition, in which case we will require the recipient to honour this policy.`,
  },
  {
    heading: 'International transfers',
    body: `We and our providers operate in more than one country, and your information may be processed in the United States, the European Union, the United Kingdom, or India, depending on the provider involved.

Where we transfer personal data out of the UK, EEA, or India, we put appropriate safeguards in place as required by applicable law, such as [PLACEHOLDER: transfer mechanism, e.g. the European Commission's Standard Contractual Clauses, the UK International Data Transfer Addendum, or transfers to countries recognised as providing adequate protection]. You can ask us for more detail using the contact below.`,
  },
  {
    heading: 'Marketing email and unsubscribing',
    body: `If you submit the contact form, we may send you a short sequence of follow-up emails about your demo request and about Krim. Every one of these emails includes an unsubscribe link, and you can also reply or email us at any time to opt out.

Once you unsubscribe, we stop the follow-up sequence and suppress your address from future marketing. We may keep the minimum record needed to honour your opt-out. We will still send the transactional reply that confirms and handles your request, even if you have opted out of marketing.`,
  },
  {
    heading: 'How long we keep it',
    body: `We keep enquiry and follow-up records for as long as needed to handle your enquiry and for a reasonable period afterwards for our legitimate business and record-keeping purposes, and then we delete or anonymise them.

- Enquiry and follow-up records: [PLACEHOLDER: retention period, e.g. retained for X months after last contact]
- Email-engagement events: [PLACEHOLDER: retention period]
- Server logs: [PLACEHOLDER: short retention period, e.g. up to 30 to 90 days]

We may keep information longer where the law requires it or to establish, exercise, or defend legal claims. Aggregate analytics data is not tied to you.`,
  },
  {
    heading: 'Cookies and analytics',
    body: `The Site is designed to set minimal or no cookies. Our analytics provider, Plausible, is cookieless: it does not store cookies on your device, does not track you across other websites, and does not collect personal data. Because there is no tracking that requires it, the Site does not display a cookie-consent banner.

Our embedded scheduling tool, Calendly, may set its own cookies when it loads. That tool is governed by its provider's privacy policy.

[PLACEHOLDER: If a cookie-setting analytics tool such as Google Analytics is enabled in future, this section must be updated to describe those cookies, and any consent mechanism required by law must be implemented before they are used.]`,
  },
  {
    heading: 'How we protect your information',
    body: `We use reasonable technical and organisational measures to protect personal information, including encryption in transit and access controls that limit who can read stored enquiries. Our database is configured to deny public access, with administrative access restricted to authorised personnel.

No method of transmission or storage is completely secure, so we cannot guarantee absolute security, but we work to protect your information and to address any incident appropriately.`,
  },
  {
    heading: 'Your rights',
    body: `Depending on where you live, you have rights over your personal information. We honour these rights to the extent applicable law requires.

If you are in the EEA or UK (GDPR / UK GDPR), you can ask to:

- access a copy of your personal data
- correct inaccurate or incomplete data
- delete your data
- restrict or object to processing, including objecting to direct marketing and to processing based on legitimate interests
- receive your data in a portable format
- withdraw consent where we rely on it, without affecting processing already carried out

You also have the right to complain to your data protection authority. In the UK, that is the Information Commissioner's Office.

If you are in India (DPDP Act, 2023), as a Data Principal you can:

- access information about the personal data we process about you
- request correction, completion, updating, or erasure of your data
- nominate another person to exercise your rights in the event of death or incapacity
- raise a grievance with our Grievance Officer (see below)

If your concern is not resolved, you may approach the Data Protection Board of India.

If you are a California resident (CCPA / CPRA), you have the right to know what personal information we collect and how we use and disclose it, to access and obtain a copy of it, to correct it, to delete it, and not to be discriminated against for exercising your rights. We do not sell or share your personal information, so no opt-out of sale or sharing is needed.

How to exercise your rights. Email us at [PLACEHOLDER: privacy contact email]. We may need to verify your identity before acting, and we will respond within the timeframes required by applicable law. You may use an authorised agent where the law allows. We will not charge a fee unless your request is excessive or repetitive, as permitted by law.`,
  },
  {
    heading: 'Children',
    body: `The Site is intended for business users and is not directed at children. We do not knowingly collect personal information from children under the age of [PLACEHOLDER: applicable minimum age per jurisdiction, e.g. 16 (GDPR) / 18 (DPDP Act)].

If you believe a child has provided us personal information, please contact us and we will delete it.`,
  },
  {
    heading: 'Changes to this policy',
    body: `We may update this policy from time to time. When we do, we will revise the "Last updated" date above, and for material changes we will give more prominent notice where the law requires it. Please check back periodically.`,
  },
  {
    heading: 'Contact us',
    body: `For any privacy question, or to exercise your rights:

- Privacy contact: [PLACEHOLDER: privacy contact email]
- [PLACEHOLDER: registered legal entity name]
- [PLACEHOLDER: registered address]

Grievance Officer (India, DPDP Act). If you are in India, you may contact our Grievance Officer:

- [PLACEHOLDER: Grievance Officer name]
- [PLACEHOLDER: Grievance Officer contact email]
- [PLACEHOLDER: Grievance Officer contact address]

[PLACEHOLDER: If/when required, add UK/EU Representative or Data Protection Officer contact details here.]`,
  },
]

export default function PrivacyPage() {
  return <LegalDoc title="Privacy Policy" effectiveNote={EFFECTIVE} intro={INTRO} sections={SECTIONS} />
}
