import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import { Collection } from "@/models/collection";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const session = await auth();
    if (!session || !session.user) {
      return Response.json({ message: "User doesn't exist" }, { status: 401 });
    }

    const body = await req.json();

    const collectionExist = await Collection.findOne({
      publicUrl: body.publicUrl,
    });

    if (collectionExist) {
      return Response.json(
        { message: "Public URL already exists" },
        { status: 400 }
      );
    }

    const collection = await Collection.create({
      ...body,
      createdBy: session.user.id,
    });

    await collection.save();

    return Response.json(
      { message: "Collection created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
