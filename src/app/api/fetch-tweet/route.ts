import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { tweetUrl } = await req.json();

    // Extract tweet ID from the URL
    const match = tweetUrl.match(/status\/(\d+)/);
    if (!match) {
      return NextResponse.json(
        { message: "Invalid tweet URL" },
        { status: 400 }
      );
    }
    const tweetId = match[1];

    const token = process.env.TWITTER_BEARER_TOKEN;
    const apiUrl = `https://api.twitter.com/2/tweets/${tweetId}?tweet.fields=author_id,text,created_at`;

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data, { status: 200 });
    } else {
      const error = await response.json();
      return NextResponse.json(
        { message: "Error fetching tweet", error },
        { status: response.status }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
