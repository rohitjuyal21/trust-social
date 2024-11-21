import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import { Collection } from "@/models/collection";
import { Testimonial } from "@/models/testimonial";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const session = await auth();
    if (!session || !session.user) {
      return Response.json({ message: "User doesn't exist" }, { status: 401 });
    }

    const body = await req.json();
    const testimonial = await Testimonial.create({
      ...body,
    });

    await testimonial.save();

    return Response.json(testimonial, { status: 201 });
  } catch (error) {
    return Response.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect();

    const session = await auth();
    if (!session || !session.user) {
      return Response.json({ message: "User doesn't exist" }, { status: 401 });
    }

    const collections = await Collection.find({
      createdBy: session.user.id,
    })
      .populate({
        path: "testimonials",
        model: "Testimonial",
      })
      .exec();

    const testimonials = collections.flatMap(
      (collection) => collection.testimonials
    );

    console.log(collections.length);

    return Response.json(testimonials, { status: 201 });
  } catch (error) {
    return Response.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
