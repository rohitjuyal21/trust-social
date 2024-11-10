import React from "react";
import { Button } from "./ui/button";
import ClipLoader from "react-spinners/ClipLoader";

interface LoadingButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function LoadingButton({
  isLoading,
  children,
  className,
}: LoadingButtonProps) {
  return (
    <Button disabled={isLoading} className={className}>
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
