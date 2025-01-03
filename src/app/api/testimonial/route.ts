import { auth } from "@/auth";
import { uploadImageToCloudinary } from "@/lib/cloudinaryUpload";
import dbConnect from "@/lib/dbConnect";
import { Collection } from "@/models/collection";
import { Testimonial } from "@/models/testimonial";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    const attachmentsUrl = await Promise.all(
      body.attachments.map((attachment: string) =>
        uploadImageToCloudinary(attachment, "testimonial-attachments")
      )
    );

    let authorPhotoUrl;
    if (body.authorPhoto) {
      authorPhotoUrl = await uploadImageToCloudinary(
        body.authorPhoto,
        "testimonial-author-photo"
      );
      body.authorPhoto = authorPhotoUrl;
    }

    const testimonial = await Testimonial.create({
      ...body,
      attachments: attachmentsUrl,
      authorPhoto: authorPhotoUrl,
    });

    const newTestimonial = await testimonial.save();

    const collection = await Collection.findById(body.collectionId);

    collection.testimonials.push(newTestimonial._id);

    await collection.save();

    return Response.json(testimonial, { status: 201 });
  } catch (error) {
    return Response.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();

    const session = await auth();
    if (!session || !session.user) {
      return Response.json({ message: "User doesn't exist" }, { status: 401 });
    }

    const collections = await Collection.find({
      createdBy: session.user.id,
    })
      .populate("testimonials")
      .exec();

    const testimonials = collections.flatMap(
      (collection) => collection.testimonials
    );

    return Response.json(testimonials, { status: 201 });
  } catch (error) {
    return Response.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
