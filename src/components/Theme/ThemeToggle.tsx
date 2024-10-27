"use client";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <Button
        size="icon"
        variant="ghost"
        className={cn(theme === "dark" ? "flex" : "hidden", "rounded-full")}
        onClick={() => setTheme("light")}
      >
        <Sun className="size-5" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        className={cn(theme === "dark" ? "hidden" : "flex", "rounded-full")}
        onClick={() => setTheme("dark")}
      >
        <Moon className="size-5" />
      </Button>
    </div>
  );
}
