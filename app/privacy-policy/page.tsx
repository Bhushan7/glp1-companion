import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy — GLP Coach',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <Link href="/" className="text-sm text-[#1D9E75] hover:underline">← Back to GLP Coach</Link>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="mt-1 text-sm text-gray-500">Effective Date: June 2026 · Last Updated: June 2026</p>
          <p className="mt-2 text-sm text-gray-600">This Policy applies to all users, including those in the United States, European Union, and elsewhere.</p>
        </div>

        <div className="prose-policy">

          <Section title="1. Introduction">
            <p>GLP Coach ("we," "us," "our," or "Company") operates glpcoach.us ("Website") and the GLP Coach application ("Service"). We are committed to protecting your privacy. This Privacy Policy explains our data practices and your rights.</p>
          </Section>

          <Section title="2. Information We Collect">
            <SubSection title="2.1 Information You Provide Directly">
              <ul>
                <li><strong>Account Information:</strong> Name, email address, password</li>
                <li><strong>Health Data:</strong> Weight, medication type, dose, side effects, protein intake, water consumption, energy levels, food types, injection times, notes, food-noise ratings</li>
                <li><strong>Profile Information:</strong> Medication name, start date, current weight, goal weight, other health markers</li>
                <li><strong>Payment Information:</strong> Processed through Paddle (we do not store credit card details)</li>
                <li><strong>Communications:</strong> Emails, support requests, feedback</li>
              </ul>
            </SubSection>
            <SubSection title="2.2 Information Collected Automatically">
              <ul>
                <li><strong>Usage Data:</strong> Pages visited, features used, time spent, clicks, searches</li>
                <li><strong>Device Information:</strong> Device type, operating system, browser type, IP address</li>
                <li><strong>Cookies &amp; Tracking:</strong> Session cookies, analytics cookies (Google Analytics)</li>
                <li><strong>Location Data:</strong> Approximate location based on IP address (not precise)</li>
              </ul>
            </SubSection>
            <SubSection title="2.3 Third-Party Data">
              <ul>
                <li><strong>Google OAuth:</strong> If you sign in with Google, we receive your Google account email and basic profile info</li>
                <li><strong>Payment Processor:</strong> Paddle collects payment and billing information</li>
              </ul>
            </SubSection>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>We use collected information for:</p>
            <ul>
              <li><strong>Service Delivery:</strong> Generating AI insights, creating your health dashboard, sending weekly emails</li>
              <li><strong>Account Management:</strong> Creating/maintaining your account, authentication, password recovery</li>
              <li><strong>Communication:</strong> Sending service updates, newsletters, support responses</li>
              <li><strong>Analytics:</strong> Understanding user behavior to improve the Service</li>
              <li><strong>Legal Compliance:</strong> Fulfilling legal obligations, fraud prevention, security</li>
              <li><strong>AI Training:</strong> Training our Claude AI models on your anonymized health data patterns (with your consent)</li>
            </ul>
            <Callout variant="green"><strong>We do NOT sell your personal data to third parties.</strong></Callout>
          </Section>

          <Section title="4. How We Share Your Information">
            <SubSection title="4.1 Service Providers">
              <p>We share information with:</p>
              <ul>
                <li><strong>Supabase:</strong> Database and authentication hosting</li>
                <li><strong>Vercel:</strong> App hosting and CDN</li>
                <li><strong>Anthropic (Claude API):</strong> AI insight generation (data processed to generate insights, not stored by Anthropic)</li>
                <li><strong>Paddle:</strong> Payment processing</li>
                <li><strong>Google Analytics:</strong> Usage analytics</li>
                <li><strong>Loops:</strong> Email service (for weekly insights)</li>
              </ul>
              <p>Each provider has contractual obligations to protect your data.</p>
            </SubSection>
            <SubSection title="4.2 Legal Requirements">
              <p>We may disclose information if required by law, court order, or government request.</p>
            </SubSection>
            <SubSection title="4.3 Business Transfer">
              <p>If GLP Coach is acquired or merged, your data may be transferred as part of that transaction. We will notify you of any such change.</p>
            </SubSection>
            <SubSection title="4.4 No Third-Party Sharing">
              <Callout variant="green"><strong>We do NOT share your health data with healthcare providers, insurance companies, employers, or other third parties without your explicit written consent.</strong></Callout>
            </SubSection>
          </Section>

          <Section title="5. Data Security">
            <p>We implement industry-standard security measures:</p>
            <ul>
              <li><strong>Encryption:</strong> HTTPS encryption in transit, encrypted storage at rest</li>
              <li><strong>Access Controls:</strong> Role-based access, API keys with restricted permissions</li>
              <li><strong>Monitoring:</strong> Regular security audits and threat monitoring</li>
              <li><strong>Backup:</strong> Regular backups with encrypted storage</li>
            </ul>
            <p>However, no system is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.</p>
          </Section>

          <Section title="6. Data Retention">
            <ul>
              <li><strong>Account Data:</strong> Retained while your account is active and for 90 days after deletion</li>
              <li><strong>Health Logs:</strong> Retained as long as your account exists, permanently deleted upon account deletion (at your request)</li>
              <li><strong>Backups:</strong> May be retained for up to 180 days for disaster recovery</li>
              <li><strong>Cookies:</strong> Session cookies expire when you log out; persistent cookies last up to 1 year</li>
            </ul>
            <p>You may request deletion of your data at any time.</p>
          </Section>

          <Section title="7. Your Rights and Choices">
            <SubSection title="7.1 Access and Portability">
              <p>You have the right to:</p>
              <ul>
                <li>Access all personal data we hold about you</li>
                <li>Download your data in a portable format</li>
                <li>Request a copy of your health logs</li>
              </ul>
              <p>Request data access: <a href="mailto:legal@glpcoach.us" className="text-[#1D9E75] hover:underline">legal@glpcoach.us</a></p>
            </SubSection>
            <SubSection title="7.2 Correction and Deletion">
              <p>You may:</p>
              <ul>
                <li>Correct inaccurate information in your account</li>
                <li>Delete your account and associated health data at any time</li>
                <li>Request erasure of specific data</li>
              </ul>
              <p><strong>Deletion is permanent.</strong> Once deleted, we cannot recover your data.</p>
            </SubSection>
            <SubSection title="7.3 Opt-Out of Communications">
              <p>You may unsubscribe from marketing emails by clicking the unsubscribe link. Transactional emails (account confirmations, password resets, service notices) cannot be disabled.</p>
            </SubSection>
            <SubSection title="7.4 Cookie Management">
              <p>Most browsers allow you to refuse cookies or alert you when cookies are being sent. Disabling cookies may affect Service functionality.</p>
            </SubSection>
            <SubSection title="7.5 Do Not Track">
              <p>We respect Do Not Track (DNT) signals and do not track you across other websites when DNT is enabled.</p>
            </SubSection>
          </Section>

          <Section title="8. Privacy Rights by Jurisdiction">
            <SubSection title="8.1 European Union (GDPR)">
              <p>If you are in the EU, you have additional rights under GDPR:</p>
              <ul>
                <li><strong>Right to Access:</strong> Request what personal data we hold</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
                <li><strong>Right to Rectification:</strong> Correct inaccurate data</li>
                <li><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
                <li><strong>Right to Data Portability:</strong> Receive your data in a portable format</li>
                <li><strong>Right to Object:</strong> Object to processing for marketing or other purposes</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time</li>
              </ul>
              <p>EU Representative: <a href="mailto:legal@glpcoach.us" className="text-[#1D9E75] hover:underline">legal@glpcoach.us</a></p>
            </SubSection>
            <SubSection title="8.2 California (CCPA)">
              <p>If you are a California resident, you have the right to:</p>
              <ul>
                <li><strong>Know:</strong> What personal data is collected, used, and shared</li>
                <li><strong>Delete:</strong> Request deletion of personal data (with exceptions)</li>
                <li><strong>Opt-Out:</strong> Opt out of the sale or sharing of personal data</li>
                <li><strong>Non-Discrimination:</strong> Not be discriminated against for exercising these rights</li>
              </ul>
              <p>California residents may submit requests: <a href="mailto:privacy@glpcoach.us" className="text-[#1D9E75] hover:underline">privacy@glpcoach.us</a></p>
            </SubSection>
          </Section>

          <Section title="9. Children's Privacy">
            <p>The Service is not directed to individuals under the age of 13 (or the equivalent minimum age in your jurisdiction). We do not knowingly collect personal data from children. If we learn that a child has provided us with personal data, we will delete such information promptly.</p>
          </Section>

          <Section title="10. Third-Party Links">
            <p>The Service may contain links to third-party websites. We are not responsible for the privacy practices of those websites. We encourage you to review their privacy policies before providing information.</p>
          </Section>

          <Section title="11. International Data Transfers">
            <p>Your data may be transferred to, stored in, and processed in countries other than your country of residence (including India and the United States), which may have different data protection laws.</p>
            <p><strong>By using the Service, you consent to such transfers.</strong> For EU residents, we rely on Standard Contractual Clauses (SCCs) to ensure appropriate safeguards.</p>
          </Section>

          <Section title="12. California Consumer Rights Notice">
            <p>Under California law, we must disclose:</p>
            <ul>
              <li><strong>Categories of personal information:</strong> Identifiers, commercial information, biometric information (health data), internet activity, geolocation, and inferences</li>
              <li><strong>Purpose of collection:</strong> Service delivery, analytics, legal compliance</li>
              <li><strong>Sharing:</strong> With service providers (Supabase, Vercel, Anthropic, Paddle, Loops)</li>
              <li><strong>Retention period:</strong> See Data Retention section above</li>
              <li><strong>Your rights:</strong> Access, deletion, opt-out of sale/sharing (we do not sell data)</li>
            </ul>
          </Section>

          <Section title="13. Data Breaches">
            <p>In the event of a confirmed data breach affecting personal information, we will notify affected individuals without unreasonable delay (and in compliance with applicable laws).</p>
            <p>Report a breach: <a href="mailto:security@glpcoach.us" className="text-[#1D9E75] hover:underline">security@glpcoach.us</a></p>
          </Section>

          <Section title="14. Changes to This Policy">
            <p>We may update this Privacy Policy periodically. Changes will be posted on this page with an updated "Last Updated" date. Continued use of the Service constitutes acceptance of changes.</p>
            <p><strong>For material changes, we will provide notice (e.g., email or prominent website notice).</strong></p>
          </Section>

          <Section title="15. Contact Information">
            <p>For questions about this Privacy Policy or to exercise your rights:</p>
            <ContactBlock>
              <strong>GLP Coach</strong><br />
              Email: <a href="mailto:legal@glpcoach.us" className="text-[#1D9E75] hover:underline">legal@glpcoach.us</a><br />
              Website: glpcoach.us<br /><br />
              <strong>For EU/GDPR inquiries:</strong><br />
              Email: <a href="mailto:gdpr@glpcoach.us" className="text-[#1D9E75] hover:underline">gdpr@glpcoach.us</a><br /><br />
              <strong>For California/CCPA inquiries:</strong><br />
              Email: <a href="mailto:privacy@glpcoach.us" className="text-[#1D9E75] hover:underline">privacy@glpcoach.us</a>
            </ContactBlock>
          </Section>

        </div>

        <p className="mt-12 text-xs text-gray-400 border-t border-gray-100 pt-6">Last Updated: June 2026</p>
      </div>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-100">{title}</h2>
      <div className="space-y-3 text-sm text-gray-700 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">
        {children}
      </div>
    </section>
  )
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-semibold text-gray-800 mb-2">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function Callout({ children, variant = 'amber' }: { children: React.ReactNode; variant?: 'amber' | 'green' }) {
  const styles = variant === 'green'
    ? 'bg-[#E3F5EE] border-[#b2e0cf] text-[#156b50]'
    : 'bg-amber-50 border-amber-100 text-amber-800'
  return (
    <div className={`rounded-xl border px-4 py-3 text-sm font-medium my-2 ${styles}`}>
      {children}
    </div>
  )
}

function ContactBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-gray-50 border border-gray-100 px-4 py-3 text-sm text-gray-700 leading-relaxed mt-2">
      {children}
    </div>
  )
}
