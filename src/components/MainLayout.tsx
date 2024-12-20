import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full flex flex-col items-center md:px-6 lg:px-8 px-4 py-6">
      {children}
    </main>
  );
}
