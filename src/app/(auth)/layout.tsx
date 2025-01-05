import Header from "@/components/Header";
import MainLayout from "@/components/MainLayout";
import React, { Suspense } from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <MainLayout>
      <Header />
      <div className="h-full  w-full flex items-center justify-center">
        <Suspense>{children}</Suspense>
      </div>
    </MainLayout>
  );
}
