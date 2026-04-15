'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimate } from 'motion/react';
import { KoconoUploader } from '@/components/KoconoUploader';
import { BooksPreview } from '@/components/BooksPreview';
import { FAQ } from '@/components/FAQ';
import { AppButton } from '@/components/AppButton';
import { GithubIcon } from '@/components/icons/GithubIcon';
import { ColorfulHighlight } from '@/components/ColorfulHighlight';
import { HighlightWord } from '@/components/HighlightWord';
import { cn } from '@/lib/utils';
import { AnimatedBorderBox } from '@/components/AnimatedBorderBox';
import { Moon, Sun } from 'lucide-react';

const GITHUB_URL = 'https://github.com/DariuszPS/kocono';

// Reusable animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const } },
};

const stagger = (delay = 0, children = 0.1) => ({
  hidden: {},
  visible: { transition: { staggerChildren: children, delayChildren: delay } },
});

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type SubscribeStatus = 'idle' | 'loading' | 'success' | 'duplicate' | 'invalid' | 'error';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [books, setBooks] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<SubscribeStatus>('idle');
  const [boxKey, setBoxKey] = useState(0);
  const [newsletterScope, animateNewsletter] = useAnimate();

  async function handleSubscribe() {
    if (!EMAIL_REGEX.test(email.trim())) {
      setSubscribeStatus('invalid');
      return;
    }
    setSubscribeStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubscribeStatus('success');
        setEmail('');
        setBoxKey(k => k + 1);
      } else if (res.status === 409) {
        setSubscribeStatus('duplicate');
      } else {
        setSubscribeStatus('error');
      }
    } catch {
      setSubscribeStatus('error');
    }
  }

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (subscribeStatus === 'invalid') {
      animateNewsletter(newsletterScope.current, { x: [0, -10, 10, -8, 8, -4, 4, 0] }, { duration: 0.45, ease: 'easeInOut' });
    }
  }, [subscribeStatus]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <div className="max-w-[1360px] mx-auto px-4">

        {/* ── Header ──────────────────────────────────────────── */}
        <motion.header
          className="flex items-center justify-between h-[70px] md:h-[85px]"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <a href="/"><img src="/logo.svg" alt="Kocono" className="h-[25px] w-auto dark:invert" /></a>
          <div className="flex items-center gap-3 ml-auto">
            <AppButton
              size="md"
              variant="outline"
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              icon={<GithubIcon />}
            >
              Star on GitHub
            </AppButton>
            <AppButton
              size="md"
              variant="outline"
              onClick={() => setDarkMode(!darkMode)}
              icon={darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            >
              {darkMode ? 'Light' : 'Dark'}
            </AppButton>
          </div>
        </motion.header>

        {/* ── Hero ────────────────────────────────────────────── */}
        <section className="flex flex-col-reverse items-center gap-8 py-10 md:flex-row md:justify-center md:gap-16 md:py-16">
          {/* Text column — stagger children one by one */}
          <motion.div
            className="w-full flex flex-col items-center text-center gap-4 md:w-[508px] md:items-start md:text-left"
            initial="hidden"
            animate="visible"
            variants={stagger(0.15)}
          >
            <motion.div variants={fadeUp}>
              <h1 className="font-playfair font-bold text-[42px] leading-[48px] tracking-[-1.26px] text-foreground md:text-[62px] md:leading-[66px] md:tracking-[-1.86px]">
                Keep your Kobo
                <br />
                highlights{' '}
                <ColorfulHighlight />
              </h1>
            </motion.div>

            <motion.p variants={fadeUp} className="text-muted-foreground text-base max-w-[420px] md:max-w-none">
              Export color-coded highlights from your Kobo e-reader to Apple Notes.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col gap-3 mt-1 w-full md:w-auto"
            >
              <div className="flex flex-col gap-2 w-full md:flex-row md:w-auto">
                <AppButton
                  size="md"
                  variant="primary"
                  className="w-full md:w-auto"
                  onClick={() => document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get started →
                </AppButton>
                <a
                  href="https://www.producthunt.com/products/kocono?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-kocono"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0"
                >
                  <img
                    alt="Kocono - Preserve Kobo Colour highlights in Apple Notes | Product Hunt"
                    width="200"
                    height="43"
                    src={
                      darkMode
                        ? 'https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1124316&theme=dark&t=1776251469515'
                        : 'https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1124316&theme=light&t=1776251725490'
                    }
                  />
                </a>
              </div>
            </motion.div>

          </motion.div>

          {/* Hero image */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <img
              src="/hero.png"
              alt="Kocono app preview showing color-coded highlights"
              className="w-[300px] h-auto block md:w-[597px]"
            />
          </motion.div>
        </section>

        {/* ── Upload + How it works ────────────────────────────── */}
        <motion.section
          id="upload"
          className="flex flex-col gap-8 pt-4 pb-16 md:flex-row md:gap-10 md:items-center md:pb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger(0, 0.15)}
        >
          <motion.div variants={fadeUp} className="w-full md:w-[650px] md:flex-shrink-0">
            {books ? (
              <BooksPreview books={books} onReset={() => setBooks(null)} />
            ) : (
              <KoconoUploader onBooksExtracted={setBooks} />
            )}
          </motion.div>
          <motion.div variants={fadeUp} className="flex-1">
            <h2 className="font-playfair font-medium text-[40px] leading-tight text-foreground mb-6">
              How it <HighlightWord delay={2.5}>works</HighlightWord>
            </h2>
            <div className="flex flex-col gap-5">
              {[
                { n: 1, title: 'Upload your database', desc: 'Connect your Kobo to Mac and locate KoboReader.sqlite in the .kobo folder' },
                { n: 2, title: 'Preview your highlights', desc: 'See all your books and color-coded highlights before exporting' },
                { n: 3, title: 'Download and run', desc: 'Open the AppleScript file in Script Editor (macOS) and click Run to import to Apple Notes' },
              ].map(({ n, title, desc }) => (
                <div key={n} className="flex gap-3 items-start text-base">
                  <span className="text-foreground flex-shrink-0 w-4 pt-px">{n}</span>
                  <div className="flex flex-col gap-0.5">
                    <p className="font-semibold text-foreground">{title}</p>
                    <p className="text-muted-foreground leading-snug">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* ── Why Kocono ──────────────────────────────────────── */}
        <motion.section
          className="flex flex-col items-center justify-center py-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger(0)}
        >
          <motion.h2 variants={fadeUp} className="font-playfair font-medium text-[40px] text-foreground mb-4">
            Why <HighlightWord>Kocono</HighlightWord>?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-foreground text-base max-w-[500px] leading-relaxed">
            Built for readers who color-code.
            <br />
            If you&apos;re using Kobo Colour to organize your highlights by color,
            <br className="hidden md:block" />
            that system shouldn&apos;t disappear when you export.{' '}
            <strong className="font-semibold">Kocono</strong> preserves it.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-6">
            <a
              href="https://www.producthunt.com/products/kocono?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-kocono"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                alt="Kocono - Preserve Kobo Colour highlights in Apple Notes | Product Hunt"
                width="200"
                height="43"
                src={
                  darkMode
                    ? 'https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1124316&theme=dark&t=1776251469515'
                    : 'https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1124316&theme=light&t=1776251725490'
                }
              />
            </a>
          </motion.div>
        </motion.section>

        {/* ── FAQ ─────────────────────────────────────────────── */}
        <motion.section
          className="relative flex flex-col items-center pb-16 overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger(0)}
        >
          <img
            src="/faq-left.png"
            alt=""
            className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-64 w-auto object-contain pointer-events-none select-none"
          />
          <img
            src="/faq-right.png"
            alt=""
            className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-64 w-auto object-contain pointer-events-none select-none"
          />
          <motion.h2 variants={fadeUp} className="font-playfair font-medium text-[40px] text-foreground mb-8 relative">
            FAQ
          </motion.h2>
          <motion.div variants={fadeUp} className="w-full max-w-[600px] relative">
            <FAQ />
          </motion.div>
        </motion.section>

        {/* ── Open Source ─────────────────────────────────────── */}
        <motion.section
          className="flex flex-col items-center py-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger(0)}
        >
          <motion.h2 variants={fadeUp} className="font-playfair font-medium text-[32px] text-foreground mb-2">
            <HighlightWord>Open Source</HighlightWord>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-foreground text-base mb-6 max-w-lg">
            Free and transparent. Code is on GitHub. Verify how it works, suggest improvements,
            or build your own version.
          </motion.p>
          <motion.div variants={fadeUp}>
            <AppButton variant="primary" size="md" href={GITHUB_URL} target="_blank" rel="noopener noreferrer" icon={<GithubIcon />}>
              Star on GitHub
            </AppButton>
          </motion.div>
        </motion.section>

        {/* ── Newsletter ──────────────────────────────────────── */}
        <motion.div
          ref={newsletterScope}
          className="flex justify-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <AnimatedBorderBox
            key={boxKey}
            color={subscribeStatus === 'success' ? '#A1C698' : undefined}
            className="w-full max-w-[924px] rounded-2xl overflow-hidden"
          >
            <section className="relative flex flex-col items-center gap-6 px-8 py-8 md:flex-row md:justify-center md:gap-10 md:px-10 min-h-[180px]">
              <AnimatePresence mode="wait">
                {subscribeStatus === 'success' ? (
                  <motion.img
                    key="success-img"
                    src="/newsletter-success.png"
                    alt=""
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="w-[220px] h-auto object-contain flex-shrink-0 md:w-[280px]"
                  />
                ) : (
                  <motion.img
                    key="contact-img"
                    src="/contact.png"
                    alt=""
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="w-[220px] h-auto object-contain flex-shrink-0 md:w-[280px]"
                  />
                )}
              </AnimatePresence>
              <div className="flex flex-col gap-3 w-full md:max-w-[460px] relative">
                <AnimatePresence mode="wait">
                  {subscribeStatus === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      className="flex flex-col gap-3"
                    >
                      <h2 className="font-playfair font-medium text-[32px] text-foreground">
                        You&apos;re in! 🎉
                      </h2>
                      <p className="text-base text-foreground">
                        We&apos;ll let you know when something ships. No spam, promise.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      className="flex flex-col gap-3"
                    >
                      <h2 className="font-playfair font-medium text-[32px] text-foreground">
                        Let&apos;s stay in touch!
                      </h2>
                      <p className="text-base text-foreground">
                        Get notified when new features launch (mobile support, new export formats)
                      </p>
                      <div className="flex gap-2 mt-1">
                        <input
                          type="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                          disabled={subscribeStatus === 'loading'}
                          className="flex-1 min-w-0 border border-input rounded-[6px] px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-[#8b7099] bg-background transition-colors disabled:opacity-50"
                        />
                        <AppButton
                          variant="primary"
                          size="md"
                          onClick={handleSubscribe}
                          disabled={subscribeStatus === 'loading'}
                        >
                          {subscribeStatus === 'loading' ? 'Sending…' : 'Subscribe'}
                        </AppButton>
                      </div>
                      <p className={cn(
                        'text-xs',
                        subscribeStatus === 'error' && 'text-red-600 dark:text-red-400',
                        subscribeStatus === 'invalid' && 'text-red-600 dark:text-red-400',
                        subscribeStatus === 'duplicate' && 'text-amber-600 dark:text-amber-400',
                        (subscribeStatus === 'idle' || subscribeStatus === 'loading') && 'text-muted-foreground',
                      )}>
                        {subscribeStatus === 'duplicate' && 'This email is already on the list.'}
                        {subscribeStatus === 'invalid' && 'Please enter a valid email address.'}
                        {subscribeStatus === 'error' && 'Something went wrong, please try again.'}
                        {(subscribeStatus === 'idle' || subscribeStatus === 'loading') && 'No spam. Unsubscribe anytime. Updates only when something ships.'}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>
          </AnimatedBorderBox>
        </motion.div>

        {/* ── Divider ─────────────────────────────────────────── */}
        <div className="h-px bg-border" />

        {/* ── Footer ──────────────────────────────────────────── */}
        <footer className="py-8 flex flex-col gap-1">
          <img src="/logo.svg" alt="Kocono" className="h-[25px] w-auto self-start mb-1 dark:invert" />
          <p className="text-xs text-muted-foreground">Export Kobo highlights with colors preserved</p>
          <p className="text-xs text-muted-foreground mt-2">
            Created by{' '}
            <a href="https://designariusz.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">
              Designariusz
            </a>
          </p>
          <p className="text-xs text-muted-foreground">© 2026 Kocono</p>
          <p className="text-xs text-muted-foreground">
            <a href="/privacy" className="underline hover:text-foreground transition-colors">Privacy Policy</a>
          </p>
        </footer>

      </div>
    </div>
  );
}
