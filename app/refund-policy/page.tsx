import Link from 'next/link'

export const metadata = {
  title: 'Refund Policy — GLP Coach',
}

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <Link href="/" className="text-sm text-[#1D9E75] hover:underline">← Back to GLP Coach</Link>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Refund Policy</h1>
          <p className="mt-1 text-sm text-gray-500">Effective Date: June 2026 · Last Updated: June 2026</p>
        </div>

        <div className="prose-policy">

          <Section title="1. Overview">
            <p>At GLP Coach, we want you to be satisfied with your subscription. This Refund Policy explains how refunds work and how to cancel your subscription.</p>
          </Section>

          <Section title="2. Refund Eligibility">
            <SubSection title="2.1 30-Day Money-Back Guarantee">
              <Callout variant="green">
                <strong>If you are not satisfied with your Pro subscription for any reason, you are eligible for a full refund within 30 days of your first purchase.</strong>
              </Callout>
              <p>This applies to:</p>
              <ul>
                <li><strong>Pro Annual ($59.99/year)</strong> — Full refund within 30 days of purchase</li>
                <li><strong>Pro Monthly ($8.99/month)</strong> — Full refund within 30 days of first charge</li>
              </ul>
            </SubSection>
            <SubSection title="2.2 Refund Conditions">
              <p>Refunds are available for:</p>
              <ul>
                <li>Unused or minimally used subscriptions</li>
                <li>Subscriptions cancelled within 30 days of purchase</li>
                <li>Subscriptions that do not meet your needs</li>
              </ul>
              <p>Refunds will <strong>NOT</strong> be issued for:</p>
              <ul>
                <li>Subscriptions purchased more than 30 days ago</li>
                <li>Users who received significant value from the Service</li>
                <li>Refunds requested after cancellation has taken effect</li>
              </ul>
            </SubSection>
          </Section>

          <Section title="3. How to Request a Refund">
            <p>To request a refund:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>Email us within 30 days of purchase:</strong><br />
                Email: <a href="mailto:support@glpcoach.us" className="text-[#1D9E75] hover:underline">support@glpcoach.us</a><br />
                Subject: "Refund Request"
              </li>
              <li>
                <strong>Provide the following information:</strong>
                <ul className="mt-1">
                  <li>Your account email address</li>
                  <li>Date of purchase</li>
                  <li>Reason for refund request (optional, but helpful)</li>
                </ul>
              </li>
              <li><strong>We will respond within 5 business days</strong> with a decision and next steps.</li>
            </ol>
          </Section>

          <Section title="4. Refund Processing">
            <ul>
              <li><strong>Decision Timeline:</strong> We review refund requests within 5 business days of receipt</li>
              <li><strong>Processing Time:</strong> Approved refunds are processed within 5–10 business days after approval</li>
              <li><strong>Refund Method:</strong> Refunds are issued to your original payment method</li>
              <li><strong>Refund Amount:</strong> The full subscription price, minus any applicable taxes paid</li>
            </ul>
          </Section>

          <Section title="5. Pro-Rata Refunds for Annual Plans">
            <p>If you have used the Service and wish to cancel your annual subscription:</p>
            <ul>
              <li><strong>Within 30 days:</strong> Full refund available (see Refund Eligibility)</li>
              <li><strong>After 30 days:</strong> Pro-rata refund may be available at our discretion</li>
            </ul>
            <p>For example: If you purchased a $59.99/year annual plan 6 months ago, a pro-rata refund of approximately $29.99 may be issued. We will calculate this on a case-by-case basis.</p>
          </Section>

          <Section title="6. Cancellation Without Refund">
            <p>If you wish to cancel your subscription without requesting a refund (i.e., after the 30-day refund window):</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Log into your account at glpcoach.us</li>
              <li>Go to <strong>Settings → Billing → Cancel Subscription</strong></li>
              <li>Your subscription will end at the end of your current billing cycle</li>
              <li>No further charges will be made</li>
              <li>You retain access to the Service until the end of the billing period</li>
            </ol>
          </Section>

          <Section title="7. Monthly vs. Annual Subscriptions">
            <SubSection title="7.1 Monthly ($8.99/month)">
              <ul>
                <li><strong>Refund Window:</strong> 30 days from initial charge</li>
                <li><strong>Cancellation:</strong> Cancel anytime; current month is not refunded, but no future charges occur</li>
                <li><strong>Example:</strong> If charged on June 1, you may refund until July 1. After July 1, the month is non-refundable, but you can cancel to prevent future charges.</li>
              </ul>
            </SubSection>
            <SubSection title="7.2 Annual ($59.99/year)">
              <ul>
                <li><strong>Refund Window:</strong> 30 days from purchase</li>
                <li><strong>Cancellation:</strong> Cancel anytime; after 30 days, a pro-rata refund may be available</li>
                <li><strong>Example:</strong> If charged on June 1, 2026, full refund available until July 1, 2026. After that, a pro-rata refund for unused months may be offered.</li>
              </ul>
            </SubSection>
          </Section>

          <Section title="8. Refunds for Free Trial">
            <p>If you signed up for a <strong>free trial:</strong></p>
            <ul>
              <li>The trial is free and requires no payment</li>
              <li>If you are charged during the trial, contact us immediately at <a href="mailto:support@glpcoach.us" className="text-[#1D9E75] hover:underline">support@glpcoach.us</a></li>
              <li>You are entitled to a full refund of any erroneous charges</li>
            </ul>
          </Section>

          <Section title="9. Failed Payments">
            <p>If your payment fails:</p>
            <ul>
              <li>We will notify you via email</li>
              <li>You have the opportunity to update your payment method</li>
              <li>Repeated failed payments may result in subscription suspension</li>
            </ul>
            <p>No refund is issued for failed payments unless you were charged multiple times for the same subscription.</p>
          </Section>

          <Section title="10. Chargebacks and Disputes">
            <p>If you dispute a charge with your credit card company or payment processor:</p>
            <ul>
              <li>Your subscription may be suspended or terminated</li>
              <li>You may not be eligible for further refunds</li>
              <li>We reserve the right to pursue collection action for chargeback fees</li>
            </ul>
            <p>To avoid disputes, please request a refund directly from us first using the process in Section 3.</p>
          </Section>

          <Section title="11. Gift Subscriptions">
            <p>Subscriptions purchased as gifts are <strong>non-refundable</strong> once the gift code has been redeemed or the subscription has been activated on the recipient's account.</p>
            <p>If a gift subscription was purchased but not yet redeemed, a refund may be available within 30 days of purchase.</p>
          </Section>

          <Section title="12. Special Circumstances">
            <p>GLP Coach may issue refunds in special circumstances, including:</p>
            <ul>
              <li>Service outages lasting more than 7 days</li>
              <li>Significant unresolved technical issues preventing use of the Service</li>
              <li>Unauthorized charges to your account</li>
            </ul>
            <p>Contact <a href="mailto:support@glpcoach.us" className="text-[#1D9E75] hover:underline">support@glpcoach.us</a> to discuss your situation.</p>
          </Section>

          <Section title="13. Changes to Refund Policy">
            <p>GLP Coach reserves the right to modify this Refund Policy at any time. Changes will be posted on this page with an updated "Last Updated" date.</p>
          </Section>

          <Section title="14. Contact Information">
            <p>For refund requests, cancellations, or questions about this policy:</p>
            <ContactBlock>
              <strong>GLP Coach Support</strong><br />
              Email: <a href="mailto:support@glpcoach.us" className="text-[#1D9E75] hover:underline">support@glpcoach.us</a><br />
              Website: glpcoach.us<br />
              Response time: Within 24–48 hours (Monday–Friday, EST)
            </ContactBlock>
          </Section>

          <Section title="15. No Refund of Free Tiers">
            <p>The free tier of GLP Coach is complimentary and non-refundable (as it is free).</p>
          </Section>

        </div>

        <p className="mt-12 text-xs text-gray-400 border-t border-gray-100 pt-6">
          By subscribing to GLP Coach Pro, you agree to this Refund Policy. Last Updated: June 2026.
        </p>
      </div>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-100">{title}</h2>
      <div className="space-y-3 text-sm text-gray-700 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ol]:space-y-1.5">
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
