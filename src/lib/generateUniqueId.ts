import { nanoid } from "nanoid";

export const generateUniqueId = async () => {
  let uniqueId = nanoid();
  let collectionExists = true;

  while (collectionExists) {
    try {
      const response = await fetch(`/api/collection/${uniqueId}`);
      if (!response.ok) {
        collectionExists = false;
      } else {
        uniqueId = nanoid();
      }
    } catch (error) {
      console.error("Error checking for unique ID:", error);
      collectionExists = false;
    }
  }

  return uniqueId;
};
