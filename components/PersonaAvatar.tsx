import Image from "next/image";

/* Round persona avatar backed by the character illustration in /public/personas.
   Static — no animation, no background. */
export default function PersonaAvatar({
  slug,
  size,
  className = "",
}: {
  slug: string;
  size: number;
  className?: string;
}) {
  return (
    <span
      className={`relative inline-block shrink-0 overflow-hidden rounded-full ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={`/personas/${slug}-2.jpg`}
        alt=""
        fill
        sizes={`${size}px`}
        className="object-cover object-top"
      />
    </span>
  );
}
