import type { AvatarKit } from '../data/tweets';

interface Props {
  kit: AvatarKit;
  /** Rendered size in CSS px (the SVG is otherwise fluid). */
  size?: number;
  /** Informative images pass a description; avatars are decorative by default. */
  title?: string;
  className?: string;
}

/**
 * A pepe head drawn from primitives, "armed" with one piece of AI kit.
 * Colors come from CSS custom properties so the same SVG recolors with the
 * theme: --pepe-skin, --pepe-ink, --pepe-glow, --pepe-eye.
 */
export function PepeAvatar({ kit, size, title, className }: Props) {
  const decorative = title === undefined;
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative ? true : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {/* head */}
      <ellipse cx="50" cy="60" rx="37" ry="29" fill="var(--pepe-skin)" />
      {/* eye bulbs */}
      <ellipse cx="31" cy="35" rx="15" ry="12" fill="var(--pepe-skin)" />
      <ellipse cx="69" cy="35" rx="15" ry="12" fill="var(--pepe-skin)" />
      {/* eye whites + pupils */}
      <ellipse cx="31" cy="37" rx="10" ry="7" fill="var(--pepe-eye)" />
      <ellipse cx="69" cy="37" rx="10" ry="7" fill="var(--pepe-eye)" />
      <circle cx="34" cy="38" r="3.4" fill="var(--pepe-ink)" />
      <circle cx="72" cy="38" r="3.4" fill="var(--pepe-ink)" />
      {/* heavy eyelids */}
      <path d="M20 33 Q31 24 42 33 L42 30 Q31 19 20 30 Z" fill="var(--pepe-skin)" />
      <path d="M58 33 Q69 24 80 33 L80 30 Q69 19 58 30 Z" fill="var(--pepe-skin)" />
      <path d="M21 35 Q31 30 41 35" stroke="var(--pepe-ink)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M59 35 Q69 30 79 35" stroke="var(--pepe-ink)" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* smirk */}
      <path d="M22 66 Q50 86 80 64" stroke="var(--pepe-ink)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M27 73 Q50 90 77 71" stroke="var(--pepe-ink)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
      {/* nostrils */}
      <circle cx="46" cy="54" r="1.6" fill="var(--pepe-ink)" />
      <circle cx="54" cy="54" r="1.6" fill="var(--pepe-ink)" />
      {kit === 'visor' && (
        <g>
          <rect x="13" y="30" width="74" height="14" rx="7" fill="var(--pepe-ink)" />
          <rect x="17" y="34" width="66" height="6" rx="3" fill="var(--pepe-glow)" />
          <rect x="20" y="35" width="18" height="2" rx="1" fill="var(--pepe-eye)" opacity="0.8" />
        </g>
      )}
      {kit === 'antenna' && (
        <g>
          <path d="M50 31 V9" stroke="var(--pepe-ink)" strokeWidth="4" strokeLinecap="round" />
          <circle cx="50" cy="8" r="5" fill="var(--pepe-glow)" />
          <circle cx="50" cy="8" r="9" fill="none" stroke="var(--pepe-glow)" strokeWidth="1.5" opacity="0.5" />
          <rect x="44" y="28" width="12" height="6" rx="2" fill="var(--pepe-ink)" />
        </g>
      )}
      {kit === 'headset' && (
        <g>
          <path d="M14 48 Q14 10 50 10 Q86 10 86 48" stroke="var(--pepe-ink)" strokeWidth="5" fill="none" strokeLinecap="round" />
          <rect x="8" y="42" width="12" height="20" rx="4" fill="var(--pepe-ink)" />
          <rect x="80" y="42" width="12" height="20" rx="4" fill="var(--pepe-ink)" />
          <rect x="10" y="46" width="8" height="12" rx="2" fill="var(--pepe-glow)" />
          <rect x="82" y="46" width="8" height="12" rx="2" fill="var(--pepe-glow)" />
          <path d="M18 62 Q20 78 36 80" stroke="var(--pepe-ink)" strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="38" cy="80" r="3.5" fill="var(--pepe-glow)" />
        </g>
      )}
      {kit === 'chip' && (
        <g>
          <rect x="60" y="56" width="18" height="14" rx="2" fill="var(--pepe-ink)" />
          <rect x="64" y="59" width="10" height="8" rx="1" fill="var(--pepe-glow)" />
          <path d="M60 59 H56 M60 63 H56 M60 67 H56 M78 59 H82 M78 63 H82 M78 67 H82" stroke="var(--pepe-ink)" strokeWidth="2" />
          <path d="M56 59 H50 V48 M82 67 H88 V80" stroke="var(--pepe-glow)" strokeWidth="1.5" fill="none" />
          <circle cx="50" cy="47" r="2" fill="var(--pepe-glow)" />
          <circle cx="88" cy="81" r="2" fill="var(--pepe-glow)" />
        </g>
      )}
      {kit === 'goggles' && (
        <g>
          <circle cx="31" cy="36" r="13" fill="none" stroke="var(--pepe-ink)" strokeWidth="4" />
          <circle cx="69" cy="36" r="13" fill="none" stroke="var(--pepe-ink)" strokeWidth="4" />
          <circle cx="31" cy="36" r="11" fill="var(--pepe-glow)" opacity="0.55" />
          <circle cx="69" cy="36" r="11" fill="var(--pepe-glow)" opacity="0.55" />
          <path d="M44 36 H56" stroke="var(--pepe-ink)" strokeWidth="4" strokeLinecap="round" />
          <path d="M18 36 Q14 26 24 22 M82 36 Q86 26 76 22" stroke="var(--pepe-ink)" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}
