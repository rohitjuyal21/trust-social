import { model } from "mongoose";
import { models, Schema } from "mongoose";

interface IThankYouPage {
  thankYouPageTitle?: string;
  thankYouPageMessage?: string;
  thankYouPageImage?: string;
}

export interface ICollection extends Document {
  collectionName: string;
  publicUrl: string;
  collectionLogo: string;
  headerTitle: string;
  customMessage: string;
  questions: string[];
  collectStarRatings: boolean;
  customButtonColor?: string;
  thankYouPage?: IThankYouPage;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy: Schema.Types.ObjectId;
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
    publicUrl: {
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
    collectStarRatings: {
      type: Boolean,
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
  },
  { timestamps: true }
);

export const Collection =
  models?.Collection || model<ICollection>("Collection", collectionSchema);