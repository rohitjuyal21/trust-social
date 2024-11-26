export interface ICollection {
  _id: string;
  collectionName: string;
  collectionLogo: string;
  headerTitle: string;
  customMessage: string;
  questions: string[];
  collectStarRatings: boolean;
  customButtonColor?: string;
  thankYouPage: {
    thankYouPageTitle: string;
    thankYouPageMessage: string;
    thankYouPageImage: string;
  };
  collectionId: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  testimonials: Testimonial[];
  _V: number;
}

export interface Testimonial {
  _id: string;
  collectionId: string;
  testimonial: string;
  rating: number;
  attachments: string[];
  authorName: string;
  authorEmail: string;
  authorPhoto: string;
  createdAt: string;
  updatedAt: string;
  isTweet: boolean;
  tweetUrl?: string;
  tweetEmbedCode?: string;
  _V: number;
}

export interface ITwitterEmbed {
  author_name: string;
  author_url: string;
  cache_age: string;
  height: number | null;
  html: string;
  provider_name: string;
  provider_url: string;
  type: string;
  url: string;
  version: string;
  width: number;
}
