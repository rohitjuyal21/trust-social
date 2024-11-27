import React from "react";

export default function Grid() {
  return (
    <svg
      fill="hsl(var(--muted))"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 480 480"
    >
      <rect x="10" y="10" width="150" height="100" />
      <rect x="10" y="130" width="150" height="150" />
      <rect x="10" y="300" width="150" height="120" />

      <rect x="180" y="10" width="150" height="130" />
      <rect x="180" y="160" width="150" height="180" />

      <rect x="350" y="10" width="150" height="200" />
      <rect x="350" y="230" width="150" height="100" />
      <rect x="350" y="350" width="150" height="120" />
    </svg>
  );
}
