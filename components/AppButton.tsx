import { cn } from '@/lib/utils';

type Size = 'sm' | 'md' | 'lg';
type Variant = 'primary' | 'outline';

interface AppButtonProps {
  variant?: Variant;
  size?: Size;
  href?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-[6px] gap-1.5',
  md: 'px-4 py-2 text-sm rounded-[6px] gap-2',
  lg: 'px-5 py-2.5 text-sm rounded-[6px] gap-2',
};

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-primary text-primary-foreground hover:bg-primary/90',
  outline:
    'border border-foreground text-foreground bg-transparent hover:bg-foreground hover:text-background',
};

export function AppButton({
  variant = 'primary',
  size = 'md',
  href,
  icon,
  children,
  onClick,
  className,
  target,
  rel,
  type = 'button',
}: AppButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center font-medium whitespace-nowrap transition-colors',
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={classes}>
        {icon && <span className="shrink-0 flex items-center">{icon}</span>}
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {icon && <span className="shrink-0 flex items-center">{icon}</span>}
      {children}
    </button>
  );
}
