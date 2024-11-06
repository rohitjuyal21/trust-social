import React from "react";

export default function CustomPing() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="inline-flex absolute w-full h-full bg-green-500 rounded-full animate-ping"></span>
      <span className="inline-flex absolute w-full h-full bg-green-500 rounded-full"></span>
    </span>
  );
}
