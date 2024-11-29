import Header from "@/components/Header";
import MainLayout from "@/components/MainLayout";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MainLayout>
      <Header />
      {children}
    </MainLayout>
  );
}
