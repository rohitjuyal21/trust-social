import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import { Collection } from "@/models/collection";
import { Testimonial } from "@/models/testimonial";
import { User } from "@/models/user";

export async function PUT(req: Request) {
  try {
    await dbConnect();

    const session = await auth();
    if (!session || !session.user) {
      return Response.json({ message: "User doesn't exist" }, { status: 401 });
    }

    const body = await req.json();

    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      {
        ...body,
      },
      { new: true }
    );

    await updatedUser.save();

    return Response.json(updatedUser, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: `Internal server error: ${error}` },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    await dbConnect();

    const session = await auth();
    if (!session || !session.user) {
      return Response.json({ message: "User doesn't exist" }, { status: 401 });
    }

    const userCollections = await Collection.find({
      createdBy: session.user.id,
    });

    for (const collection of userCollections) {
      await Testimonial.deleteMany({ collectionId: collection._id });
    }

    await Collection.deleteMany({ createdBy: session.user.id });

    await User.findByIdAndDelete(session.user.id);

    return Response.json(
      { message: "Account and all associated data deleted" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: `Internal server error: ${error}` },
      { status: 500 }
    );
  }
}
