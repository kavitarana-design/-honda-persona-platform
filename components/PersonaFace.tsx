/* The friendly smiley avatar used on persona cards, ported from the design. */
export default function PersonaFace({
  bg,
  fg,
  size = 38,
  radius = 11,
}: {
  bg: string;
  fg: string;
  size?: number;
  radius?: number;
}) {
  return (
    <div
      className="flex shrink-0 items-center justify-center"
      style={{ width: size, height: size, backgroundColor: bg, borderRadius: radius }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8.5" cy="10.5" r="1.5" fill={fg} />
        <circle cx="15.5" cy="10.5" r="1.5" fill={fg} />
        <path d="M8 14.3 Q12 18 16 14.3" fill="none" stroke={fg} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </div>
  );
}
