/* Four-point sparkle mark (concave sides), Honda brand red.
   Pass `animated` for a subtle spin-then-blink loop (used on the composer icon). */
export default function Sparkle({
  size = 16,
  color = "#CC0000",
  className,
  animated = false,
}: {
  size?: number;
  color?: string;
  className?: string;
  animated?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`${animated ? "sparkle-anim " : ""}${className ?? ""}`.trim() || undefined}
    >
      <path
        d="M12 1Q12 12 23 12Q12 12 12 23Q12 12 1 12Q12 12 12 1Z"
        fill={color}
      />
    </svg>
  );
}
