"use client";
import React from "react";
import Sidebar from "./Sidebar";
import ProfileSection from "./ProfileSection";

export default function Settings() {
  return (
    <div className="h-full w-full max-w-screen-xl mx-auto pt-8">
      <div className="border rounded-lg flex h-full">
        <Sidebar />
        <div className="py-8 px-6 h-full">
          <ProfileSection />
        </div>
      </div>
    </div>
  );
}
