import dbConnect from "@/lib/dbConnect";
import { Collection } from "@/models/collection";

export async function POST(req: Request) {
  await dbConnect();

  const { collectionId } = await req.json();

  try {
    const existingCollection = await Collection.findOne({ collectionId });

    if (existingCollection) {
      return Response.json({ exists: true }, { status: 200 });
    } else {
      return Response.json({ exists: false }, { status: 200 });
    }
  } catch (error) {
    return Response.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
