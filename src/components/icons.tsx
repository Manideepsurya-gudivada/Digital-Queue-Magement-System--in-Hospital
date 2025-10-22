import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M12.83 2.503a9.5 9.5 0 0 0-11.33 5.013A9.5 9.5 0 0 0 6.5 21.5a9.5 9.5 0 0 0 12.013-8.02" />
        <path d="M18.5 2.5a9.5 9.5 0 0 1 0 13.43" />
        <path d="M15.5 6.5v3h3" />
        <path d="M15.5 12.5v3h3" />
    </svg>
  );
}
