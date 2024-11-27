import { Document, model, models, Schema } from "mongoose";

export interface ITestimonial extends Document {
  collectionId: Schema.Types.ObjectId;
  testimonial: string;
  rating: number;
  attachments: string[];
  authorName: string;
  authorEmail: string;
  authorPhoto: string;
  isTweet: boolean;
  tweetUrl?: string;
  tweetId?: string;
  tweetEmbedCode?: string;
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
    },
    attachments: {
      type: [String],
    },
    authorName: {
      type: String,
    },
    authorEmail: {
      type: String,
    },
    authorPhoto: {
      type: String,
    },
    isTweet: {
      type: Boolean,
      default: false,
    },
    tweetUrl: {
      type: String,
    },
    tweetId: {
      type: String,
    },
    tweetEmbedCode: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Testimonial =
  models?.Testimonial || model<ITestimonial>("Testimonial", testimonialSchema);
