"use client";
import React from "react";
import Sidebar from "./Sidebar";
import ProfileSection from "./ProfileSection";

export default function Settings() {
  return (
    <div className="h-full w-full py-8 px-6">
      <Sidebar />
      <div className="sm:ml-64 ml-20 h-full">
        <ProfileSection />
      </div>
    </div>
  );
}
