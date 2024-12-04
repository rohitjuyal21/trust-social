import { cn } from "@/lib/utils";
import { LogOut, User2 } from "lucide-react";
import React from "react";

import { signOut } from "next-auth/react";
import { toast } from "sonner";

export default function Sidebar() {
  const handleSignOut = async () => {
    try {
      await signOut({ redirectTo: "/sign-in" });
      toast.success("Logged out successfully");
    } catch {
      toast.error("Failed to logout");
    }
  };

  return (
    <aside className="sm:w-64 w-20 border-r h-full fixed top-[72px] left-0">
      <div className="flex flex-col gap-2 px-4 py-8">
        <div
          className={cn(
            "flex items-center sm:gap-2 sm:px-4 py-2 bg-muted justify-center sm:justify-start cursor-pointer rounded-lg border"
          )}
        >
          <User2 className="w-5 h-5 " />
          <span className="hidden sm:inline">Profile</span>
        </div>
        <div
          onClick={handleSignOut}
          className={cn(
            "flex items-center sm:gap-2 sm:px-4 py-2 justify-center sm:justify-start hover:bg-muted/50  cursor-pointer rounded-lg border-transparent"
          )}
        >
          <LogOut className="w-5 h-5" />
          <span className="hidden sm:inline">Logout</span>
        </div>
      </div>
    </aside>
  );
}
