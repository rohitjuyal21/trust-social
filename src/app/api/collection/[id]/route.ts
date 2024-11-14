import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import { Collection } from "@/models/collection";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const { id } = await params;

    const session = await auth();

    if (!session || !session.user) {
      return Response.json({ message: "User doesn't exist" }, { status: 401 });
    }

    const collection = await Collection.findOne({ collectionId: id });

    if (!collection) {
      return Response.json(
        { message: "Collection not found" },
        { status: 404 }
      );
    }

    return Response.json(collection, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
