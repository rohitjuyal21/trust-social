import { Document, model, models, Schema } from "mongoose";

export interface ITestimonial extends Document {
  collectionId: Schema.Types.ObjectId;
  testimonial: string;
  rating: number;
  attachments: string[];
  authorName: string;
  authorEmail: string;
  authorPhoto: string;
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    collectionId: {
      type: Schema.Types.ObjectId,
      ref: "Collection",
    },
    testimonial: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    attachments: {
      type: [String],
    },
    authorName: {
      type: String,
      required: true,
    },
    authorEmail: {
      type: String,
      required: true,
    },
    authorPhoto: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Testimonial =
  models?.Testimonial || model<ITestimonial>("Testimonial", testimonialSchema);
