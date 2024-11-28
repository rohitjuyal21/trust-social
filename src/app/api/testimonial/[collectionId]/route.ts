import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import { Collection } from "@/models/collection";
import { Testimonial } from "@/models/testimonial";

export async function GET(
  req: Request,
  { params }: { params: { collectionId: string } }
) {
  try {
    await dbConnect();

    const { collectionId } = await params;

    const collections = await Collection.find({ collectionId })
      .populate({
        path: "testimonials",
        model: Testimonial,
      })
      .exec();

    if (!collections || collections.length === 0) {
      return Response.json(
        { message: "No collections found" },
        { status: 404 }
      );
    }

    const testimonials = collections.flatMap(
      (collection) => collection.testimonials
    );

    return Response.json(testimonials, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: `Internal server error, ${error}` },
      { status: 500 }
    );
  }
}
