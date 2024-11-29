import React, { useState, useEffect } from "react";
import "../../styles/twitterCard.css";
import { TwitterTweetEmbed } from "react-twitter-embed";
import ClipLoader from "react-spinners/ClipLoader";
import { useTheme } from "next-themes";

interface TweetTestimonialCardProps {
  tweetId: string | undefined;
  paramsTheme?: string;
}

export default function TweetTestimonialCard({
  tweetId,
  paramsTheme,
}: TweetTestimonialCardProps) {
  const { theme } = useTheme(); // Access current theme
  const [embedTheme, setEmbedTheme] = useState<"dark" | "light">("light");
  const [key, setKey] = useState(0); // Add a key to force re-render

  useEffect(() => {
    if (paramsTheme) {
      const newTheme = paramsTheme === "dark" ? "dark" : "light";
      setEmbedTheme(newTheme);
      setKey((prev) => prev + 1);
      return;
    }
    // Function to update theme for "system"
    const updateSystemTheme = () => {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const newTheme = systemPrefersDark ? "dark" : "light";
      setEmbedTheme(newTheme);
      setKey((prev) => prev + 1); // Increment key to re-render
    };

    // Handle theme changes
    if (theme === "system") {
      updateSystemTheme();
      // Add listener for system theme changes
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", updateSystemTheme);

      // Cleanup listener
      return () => {
        mediaQuery.removeEventListener("change", updateSystemTheme);
      };
    } else {
      const newTheme = theme === "dark" ? "dark" : "light";
      setEmbedTheme(newTheme);
      setKey((prev) => prev + 1); // Increment key to re-render
    }
  }, [theme]);

  if (!tweetId) return null;

  return (
    <div className="lg:mb-6 mb-4">
      {/* Use the key prop to force re-render */}
      <TwitterTweetEmbed
        key={key} // Re-render on theme change
        onLoad={() => {}}
        placeholder={
          <div className="flex justify-center items-center">
            <ClipLoader
              color="hsl(var(--foreground))"
              size={20}
              className="text-foreground"
            />
          </div>
        }
        tweetId={tweetId}
        options={{
          theme: embedTheme, // Dynamically set theme
        }}
      />
    </div>
  );
}
