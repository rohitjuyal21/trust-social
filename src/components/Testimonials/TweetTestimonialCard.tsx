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
  const { theme } = useTheme();
  const [embedTheme, setEmbedTheme] = useState<"dark" | "light">("light");
  const [key, setKey] = useState(0);
  useEffect(() => {
    if (paramsTheme) {
      const newTheme = paramsTheme === "dark" ? "dark" : "light";
      setEmbedTheme(newTheme);
      setKey((prev) => prev + 1);
      return;
    }
  }, [theme]);

  if (!tweetId) return null;

  return (
    <div className="lg:mb-6 mb-4 flex-1 break-inside-avoid">
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
          theme: embedTheme,
        }}
      />
    </div>
  );
}
