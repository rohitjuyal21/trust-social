import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
export default function Loader() {
  return <PacmanLoader color="hsl(var(--foreground))" size={16} />;
}
