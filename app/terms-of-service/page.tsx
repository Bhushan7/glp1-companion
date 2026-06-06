import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service — GLP-1 Companion',
}

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <Link href="/" className="text-sm text-[#1D9E75] hover:underline">← Back to GLP-1 Companion</Link>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Terms of Service</h1>
          <p className="mt-1 text-sm text-gray-500">Effective Date: June 2026 · Last Updated: June 2026</p>
        </div>

        <div className="prose-policy">

          <Section title="1. Agreement to Terms">
            <p>By accessing and using glpcoach.us ("Website") and the GLP-1 Companion application ("Service"), you agree to be bound by these Terms of Service ("Agreement"). If you do not agree to abide by the above, please do not use this service.</p>
          </Section>

          <Section title="2. Important Disclaimer — NOT Medical Advice">
            <Callout>
              GLP-1 Companion is a personal health tracking journal, NOT a medical device, medical service, or substitute for professional medical advice.
            </Callout>
            <ul>
              <li>We do not diagnose, treat, cure, or prevent any disease or medical condition.</li>
              <li>All content, insights, and recommendations are for informational and educational purposes only.</li>
              <li>You must always consult with your healthcare provider before making any medical decisions, changes to your medication, or lifestyle adjustments.</li>
              <li>Our AI-generated insights are based on data you log and should never replace professional medical judgment.</li>
            </ul>
            <p><strong>You assume all responsibility for your health decisions.</strong> GLP-1 Companion is provided "as-is" for wellness tracking only.</p>
          </Section>

          <Section title="3. Use License">
            <p>Permission is granted to temporarily download one copy of the materials on glpcoach.us for personal, non-commercial transitory viewing only. Under this license you may not:</p>
            <ul>
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to decompile or reverse engineer any software contained on the Service</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              <li>Scrape, crawl, or use automated tools to access the Service without permission</li>
            </ul>
          </Section>

          <Section title="4. Disclaimer of Warranties">
            <p>The materials on glpcoach.us are provided on an 'as is' basis. GLP-1 Companion makes no warranties, expressed or implied, and hereby disclaims all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            <p>Further, GLP-1 Companion does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its Website.</p>
          </Section>

          <Section title="5. Limitations of Liability">
            <p><strong>In no event shall GLP-1 Companion or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on glpcoach.us, even if GLP-1 Companion or an authorized representative has been notified orally or in writing of the possibility of such damage.</strong></p>
            <p>Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.</p>
          </Section>

          <Section title="6. Accuracy of Materials">
            <p>The materials appearing on glpcoach.us could include technical, typographical, or photographic errors. GLP-1 Companion does not warrant that any of the materials on its Website are accurate, complete, or current. GLP-1 Companion may make changes to the materials at any time without notice.</p>
          </Section>

          <Section title="7. Materials and Content">
            <p>GLP-1 Companion does not endorse any content or materials linked to or available through the Service. You agree to protect and indemnify GLP-1 Companion from and against any claims, liability, damages, loss, and expense, including attorney's fees, arising out of your use or misuse of the Website or any content appearing on it.</p>
          </Section>

          <Section title="8. User Accounts and Passwords">
            <p>If you create an account on glpcoach.us, you are responsible for maintaining the confidentiality of your account information and password. You agree to accept responsibility for all activities that occur under your account. You must notify us immediately of any unauthorized uses of your account.</p>
            <p>GLP-1 Companion will not be liable for any loss or damage arising from your failure to maintain the security of your account.</p>
          </Section>

          <Section title="9. User-Generated Health Data">
            <ul>
              <li>You own all health data you log into the Service.</li>
              <li>By using the Service, you grant GLP-1 Companion a non-exclusive license to use your data to generate insights, improve the Service, and train our AI models (only within your individual account, not shared with third parties).</li>
              <li>You may request deletion of your data at any time. See our <Link href="/privacy-policy" className="text-[#1D9E75] hover:underline">Privacy Policy</Link> for details.</li>
              <li>You are responsible for the accuracy of all information you provide.</li>
            </ul>
          </Section>

          <Section title="10. Payment Terms and Billing">
            <ul>
              <li>Subscription fees are billed according to the plan you select (annual or monthly).</li>
              <li>Billing occurs at the start of your subscription and at the renewal date.</li>
              <li>All fees are exclusive of applicable taxes, which will be added where required by law.</li>
              <li>Payment is processed through Paddle, our payment processor.</li>
              <li>You authorize GLP-1 Companion to charge your payment method for recurring subscription fees.</li>
            </ul>
          </Section>

          <Section title="11. Refund and Cancellation Policy">
            <ul>
              <li><strong>Free Trial:</strong> If applicable, the free trial period is 7 days. After the trial ends, your subscription will be charged unless you cancel before the end of the trial.</li>
              <li><strong>Refunds:</strong> Refunds are available within 30 days of purchase. After 30 days, no refunds are available, but you may cancel to stop future charges.</li>
              <li><strong>Cancellation:</strong> You may cancel your subscription at any time through your account settings or by contacting <a href="mailto:support@glpcoach.us" className="text-[#1D9E75] hover:underline">support@glpcoach.us</a>.</li>
              <li><strong>Pro-Rata Refunds:</strong> If you cancel an annual plan mid-year, a pro-rata refund for unused months may be issued at our discretion.</li>
            </ul>
            <p>See our separate <Link href="/refund-policy" className="text-[#1D9E75] hover:underline">Refund Policy</Link> for additional details.</p>
          </Section>

          <Section title="12. Modifications to Terms">
            <p>GLP-1 Companion may revise these terms of service for the Website at any time without notice. By using this Website, you are agreeing to be bound by the then current version of these terms of service.</p>
          </Section>

          <Section title="13. Governing Law">
            <p>These and all related agreements may be governed by and construed in accordance with the laws of India, without regard to its conflicting laws on conflicts of law. You agree that any legal action or proceeding relating to your use of the Service shall be brought exclusively in the courts of India.</p>
            <p><strong>However, for US residents:</strong> These Terms shall be governed by and construed in accordance with the laws of the State of California. Any dispute shall be resolved through binding arbitration in accordance with the American Arbitration Association (AAA) Commercial Arbitration Rules.</p>
          </Section>

          <Section title="14. Limitation Period">
            <p>You agree that regardless of any statute or law to the contrary, any claim or cause of action arising out of or related to use of the Website must be filed within one (1) year after such claim or cause of action arose or be forever barred.</p>
          </Section>

          <Section title="15. Contact Information">
            <p>For questions about these Terms of Service, please contact:</p>
            <ContactBlock>
              <strong>GLP-1 Companion</strong><br />
              Email: <a href="mailto:legal@glpcoach.us" className="text-[#1D9E75] hover:underline">legal@glpcoach.us</a><br />
              Website: glpcoach.us
            </ContactBlock>
          </Section>

        </div>

        <p className="mt-12 text-xs text-gray-400 border-t border-gray-100 pt-6">
          By using glpcoach.us, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. Last Updated: June 2026.
        </p>
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

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 text-sm text-amber-800 font-medium mb-3">
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
