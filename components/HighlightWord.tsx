'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { HIGHLIGHT_COLORS } from '@/lib/highlight-colors';

interface HighlightWordProps {
  children: string;
  delay?: number;
}

export function HighlightWord({ children, delay = 0.9 }: HighlightWordProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [color, setColor] = useState<{ bg: string; text: string } | null>(null);

  useEffect(() => {
    const idx = Math.floor(Math.random() * HIGHLIGHT_COLORS.length);
    setColor(HIGHLIGHT_COLORS[idx]);
  }, []);

  return (
    <span ref={ref} className="relative inline-block px-1">
      <motion.span
        aria-hidden
        className="absolute inset-0"
        style={{ backgroundColor: color?.bg ?? 'transparent' }}
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={{ clipPath: isInView && color ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)' }}
        transition={{ delay, duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.span
        className="relative"
        initial={{ color: '#0a0a0a' }}
        animate={{ color: isInView && color ? color.text : '#0a0a0a' }}
        transition={{ delay: delay + 0.35, duration: 0.2 }}
      >
        {children}
      </motion.span>
    </span>
  );
}
