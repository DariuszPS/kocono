import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy – Kocono',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <Link href="/" className="text-sm text-muted-foreground underline hover:text-foreground transition-colors">
          ← Back to Kocono
        </Link>

        <h1 className="mt-8 text-3xl font-bold">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: April 2026</p>

        <section className="mt-8 space-y-4 text-sm leading-relaxed">
          <h2 className="text-lg font-semibold">1. Who we are</h2>
          <p>
            Kocono (<a href="https://kocono.com" className="underline">kocono.com</a>) is a tool for
            exporting Kobo highlights, created by{' '}
            <a href="https://designariusz.com" className="underline">Designariusz</a>.
          </p>
        </section>

        <section className="mt-6 space-y-4 text-sm leading-relaxed">
          <h2 className="text-lg font-semibold">2. What data we collect</h2>
          <p>
            When you subscribe to our newsletter, we collect your <strong>email address</strong>.
            We do not collect any other personal data.
          </p>
          <p>
            Kocono processes your book files entirely in your browser. No file content is ever
            sent to our servers.
          </p>
        </section>

        <section className="mt-6 space-y-4 text-sm leading-relaxed">
          <h2 className="text-lg font-semibold">3. Why we collect it</h2>
          <p>
            Your email address is used solely to notify you when new features are released.
            We do not share it with third parties, use it for advertising, or sell it.
          </p>
        </section>

        <section className="mt-6 space-y-4 text-sm leading-relaxed">
          <h2 className="text-lg font-semibold">4. Legal basis (GDPR)</h2>
          <p>
            We process your email address based on your <strong>explicit consent</strong> given
            when you click "Subscribe". You can withdraw this consent at any time.
          </p>
        </section>

        <section className="mt-6 space-y-4 text-sm leading-relaxed">
          <h2 className="text-lg font-semibold">5. How long we keep your data</h2>
          <p>
            We keep your email address until you unsubscribe or request deletion.
          </p>
        </section>

        <section className="mt-6 space-y-4 text-sm leading-relaxed">
          <h2 className="text-lg font-semibold">6. Your rights</h2>
          <p>Under GDPR you have the right to:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Access the data we hold about you</li>
            <li>Request deletion of your data ("right to be forgotten")</li>
            <li>Withdraw your consent at any time</li>
          </ul>
          <p>
            To exercise these rights, email us at{' '}
            <a href="mailto:hello@designariusz.com" className="underline">
              hello@designariusz.com
            </a>
            .
          </p>
        </section>

        <section className="mt-6 space-y-4 text-sm leading-relaxed">
          <h2 className="text-lg font-semibold">7. Data storage</h2>
          <p>
            Email addresses are stored securely in a{' '}
            <a href="https://supabase.com" className="underline" target="_blank" rel="noopener noreferrer">
              Supabase
            </a>{' '}
            database (EU region).
          </p>
        </section>
      </div>
    </div>
  )
}
