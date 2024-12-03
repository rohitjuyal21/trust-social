import { model } from "mongoose";
import { models, Schema } from "mongoose";

interface IThankYouPage {
  thankYouPageTitle?: string;
  thankYouPageMessage?: string;
  thankYouPageImage?: string;
}

export interface ICollection extends Document {
  collectionName: string;
  collectionId: string;
  collectionLogo: string;
  headerTitle: string;
  customMessage: string;
  questions: string[];
  customButtonColor?: string;
  thankYouPage?: IThankYouPage;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy: Schema.Types.ObjectId;
  testimonials: Schema.Types.ObjectId[];
}

const thankYouPageSchema = new Schema<IThankYouPage>({
  thankYouPageTitle: {
    type: String,
  },
  thankYouPageMessage: {
    type: String,
  },
  thankYouPageImage: {
    type: String,
  },
});

const collectionSchema = new Schema<ICollection>(
  {
    collectionName: {
      type: String,
      required: true,
    },
    collectionId: {
      type: String,
      required: true,
      unique: true,
    },
    collectionLogo: {
      type: String,
      required: true,
    },
    headerTitle: {
      type: String,
      required: true,
    },
    customMessage: {
      type: String,
      required: true,
    },
    questions: {
      type: [String],
      required: true,
    },
    customButtonColor: {
      type: String,
    },
    thankYouPage: {
      type: thankYouPageSchema,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    testimonials: [
      {
        type: Schema.Types.ObjectId,
        ref: "Testimonial",
      },
    ],
  },
  { timestamps: true }
);

export const Collection =
  models?.Collection || model<ICollection>("Collection", collectionSchema);
