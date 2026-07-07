"use client";

import { useRef } from "react";
import useEyeTracking from "@/components/useEyeTracking";

/* The Persona character (from Persona Character/77.svg), given the login-bunny's
   behaviors: the pupils track the cursor, drift in a gentle idle "look-around" when
   the mouse is still, and blink. Eye-tracking + idle drift come from useEyeTracking
   (one rAF loop translating the shared eye group); blinking is a CSS keyframe (pcBlink)
   on each eye so it doesn't collide with the JS transform. Honors prefers-reduced-motion. */

export default function PersonaCharacter({
  size = 160,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const eyesRef = useRef<SVGGElement | null>(null);

  useEyeTracking(svgRef, eyesRef, { trackX: 9, trackY: 6, idleX: 5, idleY: 1.5 });

  const blink = { transformBox: "fill-box", transformOrigin: "center" } as const;

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox="0 0 886 908"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path d="M0 908C6.5 855 48.4737 746.711 148 686C298 594.5 345 686 328 454.5H547C537 646.5 540 612.5 731.5 686C800.328 712.417 876 835 886 908H0Z" fill="#D78C6C" />
      <path d="M464.55 612.182C392.828 632.907 342.843 534.836 326.815 483.21L543.183 477.015C546.856 513.435 536.272 591.456 464.55 612.182Z" fill="#CC6252" />
      <path d="M273 638.5C345 688 531.5 683.5 591 638.5" stroke="black" strokeWidth="8" strokeLinecap="round" />
      <path d="M229 648.5C317.528 718.302 546.841 711.956 620 648.5" stroke="#CEC9C9" strokeWidth="2" strokeLinecap="round" />
      <path d="M64.5 767L821 767.496" stroke="#CEC9C9" strokeWidth="3" strokeLinecap="round" />
      <path d="M15.5 857.5H867.5" stroke="black" strokeWidth="3" strokeLinecap="round" />
      <path d="M629.732 258.645C613.332 255.445 593.965 276.349 591.232 291.145L583.232 385.145C621.232 398.145 649.732 330.145 655.232 295.645C657.232 273.145 646.132 261.845 629.732 258.645Z" fill="#D88C6C" />
      <path d="M637.465 301.349C631.98 301.349 624.929 304.357 618.507 308.349M601.965 323.349C604.137 319.222 610.878 313.091 618.507 308.349M618.507 308.349C622.493 320.182 628.965 343.549 622.965 342.349" stroke="#C96452" strokeWidth="4" />
      <path d="M294.236 452.613C269.811 400.177 263.569 222.947 264.236 138.613C379.569 138.613 610.636 140.313 612.236 147.113C614.236 155.613 588.817 405.376 564.736 452.613C496.424 586.613 348.733 569.613 294.236 452.613Z" fill="#E8C09C" />
      <path d="M417.232 293.613V362.113C422.232 373.613 440.232 376.113 452.732 366.113" stroke="#C96452" strokeWidth="4" />
      <path d="M277.734 116.113C221.233 136.113 249.233 251.613 271.234 290.113C288.833 264.912 299.9 176.946 303.234 136.113C376.734 172.113 473.234 197.613 564.734 179.613C557.534 209.613 582.067 272.78 595.234 300.613C615.234 241.113 626.734 191.113 615.234 142.113C644.434 112.113 635.067 67.613 626.734 49.1128C573.234 -61.3872 367.234 52.1128 368.234 44.6128C369.034 38.6128 368.234 27.1133 360.234 15.1128C289.434 27.1128 275.734 87.446 277.734 116.113Z" fill="#19191B" stroke="black" />

      {/* Eyes — shared group is translated by JS for cursor tracking / idle look-around;
          each pupil blinks (scaleY) independently around its own center. */}
      <g ref={eyesRef}>
        <g className="pc-blink" style={blink}>
          <circle cx="503.232" cy="276.113" r="16" fill="#1E1C1C" />
        </g>
        <g className="pc-blink" style={blink}>
          <circle cx="353.232" cy="276.113" r="16" fill="#1E1C1C" />
        </g>
      </g>

      <path d="M448.232 212.112C475.732 194.613 530.232 201.614 549.232 230.112C526.732 222.613 477.232 210.613 448.232 212.112Z" fill="#19191B" />
      <path d="M403.232 212.112C375.732 194.613 321.232 201.614 302.232 230.112C324.732 222.613 374.232 210.613 403.232 212.112Z" fill="#19191B" />
      <path d="M230.733 258.645C247.133 255.445 266.5 276.349 269.233 291.145L277.233 385.145C239.232 398.145 210.732 330.145 205.233 295.645C203.233 273.145 214.333 261.845 230.733 258.645Z" fill="#D88C6C" />
      <path d="M223 301.349C228.485 301.349 235.536 304.357 241.958 308.349M258.5 323.349C256.328 319.222 249.587 313.091 241.958 308.349M241.958 308.349C237.972 320.182 231.5 343.549 237.5 342.349" stroke="#C96452" strokeWidth="4" />
      <ellipse cx="349.232" cy="339.113" rx="33" ry="20" fill="#D88C6C" />
      <ellipse cx="503.232" cy="339.113" rx="33" ry="20" fill="#D88C6C" />
      <path d="M351.732 400.613C388.232 420.113 485.732 415.813 507.732 400.613" stroke="#C96452" strokeWidth="4" />
    </svg>
  );
}
