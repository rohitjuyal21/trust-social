import MainLayout from "@/components/MainLayout";
import VisitorHeader from "@/components/VisitorHeader";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <MainLayout>
      <VisitorHeader />
      <div className="flex items-center justify-center h-full w-full">
        {children}
      </div>
    </MainLayout>
  );
}
