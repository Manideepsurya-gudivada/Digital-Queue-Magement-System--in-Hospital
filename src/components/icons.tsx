import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
        <path d="M20 8l-8-7-8 7v11a2 2 0 002 2h12a2 2 0 002-2V8z" fill="#fff" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M13 16h-2v-3H8v-2h3V8h2v3h3v2h-3v3z" fill="currentColor" stroke="none" />
    </svg>
  );
}
