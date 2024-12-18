import Header from "@/components/Header";
import MainLayout from "@/components/MainLayout";
import React, { Suspense } from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <MainLayout>
      <Header />
      <Suspense>{children}</Suspense>
    </MainLayout>
  );
}
