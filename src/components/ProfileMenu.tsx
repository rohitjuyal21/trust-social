"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { LayoutDashboard, LogOut, Settings } from "lucide-react";

const ProfileMenu = () => {
  const { data: session } = useSession();

  const user = session?.user;

  const handleSignOut = async () => {
    await signOut({ redirectTo: "/sign-in" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
          <AvatarFallback>
            {user?.name?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52" align="end">
        <Link href={"/dashboard"}>
          <DropdownMenuItem className="cursor-pointer">
            <LayoutDashboard />
            Dashboard
          </DropdownMenuItem>
        </Link>
        <Link href={"/settings"}>
          <DropdownMenuItem className="cursor-pointer">
            <Settings />
            Settings
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
          <LogOut /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ProfileMenu;
