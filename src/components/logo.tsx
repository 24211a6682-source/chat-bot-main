import * as React from 'react';

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 20"
      aria-labelledby="logo-title"
      role="img"
      {...props}
    >
      <title id="logo-title">Order Responder</title>
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <text
        x="0"
        y="15"
        fontFamily="Inter, sans-serif"
        fontSize="16"
        fontWeight="bold"
        fill="url(#logo-gradient)"
      >
        Order Responder
      </text>
    </svg>
  );
}
