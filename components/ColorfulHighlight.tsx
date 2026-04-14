'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { HIGHLIGHT_COLORS } from '@/lib/highlight-colors';

export function ColorfulHighlight() {
  const [color, setColor] = useState<{ bg: string; text: string } | null>(null);

  useEffect(() => {
    const idx = Math.floor(Math.random() * HIGHLIGHT_COLORS.length);
    setColor(HIGHLIGHT_COLORS[idx]);
  }, []);

  return (
    <span className="relative inline-block px-1">
      <motion.span
        aria-hidden
        className="absolute inset-0"
        style={{ backgroundColor: color?.bg ?? '#8B7099' }}
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={color ? { clipPath: 'inset(0 0% 0 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
        transition={{ delay: 2, duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.span
        className="relative"
        initial={{ color: '#0a0a0a' }}
        animate={color ? { color: color.text } : { color: '#0a0a0a' }}
        transition={{ delay: 2.35, duration: 0.2 }}
      >
        colorful
      </motion.span>
    </span>
  );
}
