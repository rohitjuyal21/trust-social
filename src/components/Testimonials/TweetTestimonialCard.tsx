import Script from "next/script";
import React from "react";
import "../../styles/twitterCard.css";

export default function TweetTestimonialCard({
  tweetEmbedCode,
}: {
  tweetEmbedCode: string | undefined;
}) {
  if (tweetEmbedCode)
    return (
      <div className="lg:mb-6 mb-4">
        <div
          dangerouslySetInnerHTML={{ __html: tweetEmbedCode }}
          style={{ borderRadius: "12px", overflow: "hidden" }}
        />
        <Script
          src="https://platform.twitter.com/widgets.js"
          strategy="lazyOnload"
        />
      </div>
    );
}
