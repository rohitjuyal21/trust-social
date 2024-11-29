import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mt-[72px] w-full flex items-center justify-center bg-background">
      {children}
    </main>
  );
}
