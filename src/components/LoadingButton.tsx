import React from "react";
import { Button } from "./ui/button";
import ClipLoader from "react-spinners/ClipLoader";

interface LoadingButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
  onClick?: () => void;
}

export default function LoadingButton({
  isLoading,
  children,
  className,
  variant,
  onClick,
}: LoadingButtonProps) {
  return (
    <Button
      disabled={isLoading}
      className={className}
      variant={variant}
      onClick={onClick}
    >
      {isLoading ? (
        <ClipLoader
          color="white"
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
