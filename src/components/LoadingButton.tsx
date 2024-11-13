import React from "react";
import { Button } from "./ui/button";
import ClipLoader from "react-spinners/ClipLoader";

interface LoadingButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
}

export default function LoadingButton({
  isLoading,
  children,
  className,
  variant,
}: LoadingButtonProps) {
  return (
    <Button disabled={isLoading} className={className} variant={variant}>
      {isLoading ? (
        <ClipLoader
          color="hsl(var(--foreground))"
          size={28}
          loading={isLoading}
          className="text-foreground"
        />
      ) : (
        <>{children}</>
      )}
    </Button>
  );
}
