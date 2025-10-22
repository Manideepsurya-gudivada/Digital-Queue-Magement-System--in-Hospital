import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="1em"
      height="1em"
      fill="currentColor"
      {...props}
    >
      <path d="M128 24a104 104 0 10104 104A104.11 104.11 0 00128 24zm-8 152v-40H80a8 8 0 010-16h40v-40a8 8 0 0116 0v40h40a8 8 0 010 16h-40v40a8 8 0 01-16 0z" />
    </svg>
  );
}
