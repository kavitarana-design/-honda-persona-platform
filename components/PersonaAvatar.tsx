import Image from "next/image";

/* Round persona avatar backed by the character illustration in /public/personas. */
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
      className={`relative inline-block shrink-0 overflow-hidden rounded-full bg-[#F4F4F5] ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={`/personas/${slug}.jpg`}
        alt=""
        fill
        sizes={`${size}px`}
        className="object-cover object-top"
      />
    </span>
  );
}
