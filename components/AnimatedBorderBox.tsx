'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { cn } from '@/lib/utils';
import { HIGHLIGHT_COLORS } from '@/lib/highlight-colors';

interface AnimatedBorderBoxProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  strokeWidth?: number;
  radius?: number;
  duration?: number;
  delay?: number;
}

export function AnimatedBorderBox({
  children,
  className,
  color,
  strokeWidth = 5,
  radius = 16,
  duration = 1.4,
  delay = 0.1,
}: AnimatedBorderBoxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [resolvedColor, setResolvedColor] = useState(color ?? '#8b7099');

  useEffect(() => {
    if (!color) {
      const idx = Math.floor(Math.random() * HIGHLIGHT_COLORS.length);
      setResolvedColor(HIGHLIGHT_COLORS[idx].bg);
    }
  }, [color]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setDims({ w: el.offsetWidth, h: el.offsetHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const sw2 = strokeWidth / 2;
  const w = dims.w;
  const h = dims.h;

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      {children}
      {w > 0 && h > 0 && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${w} ${h}`}
          fill="none"
          aria-hidden
        >
          <motion.rect
            x={sw2}
            y={sw2}
            width={w - strokeWidth}
            height={h - strokeWidth}
            rx={radius}
            stroke={resolvedColor}
            strokeWidth={strokeWidth}
            initial={{ pathLength: 0, opacity: 1 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 1 }}
            transition={{ duration, delay, ease: 'easeInOut' }}
          />
        </svg>
      )}
    </div>
  );
}
