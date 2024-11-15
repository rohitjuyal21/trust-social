import VisitorHeader from "@/components/VisitorHeader";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <VisitorHeader />
      {children}
    </>
  );
}
