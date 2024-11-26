import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Extract the tweet URL from the query string
  const { searchParams } = new URL(request.url);
  const tweetUrl = searchParams.get("tweetUrl");

  if (!tweetUrl) {
    return NextResponse.json(
      { error: "Tweet URL is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://publish.twitter.com/oembed?url=${encodeURIComponent(tweetUrl)}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch the tweet embed data");
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong while fetching the embed data" },
      { status: 500 }
    );
  }
}
