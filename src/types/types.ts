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
  _V: number;
}
