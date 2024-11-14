export const generateUniqueId = async (collectionId: string) => {
  let uniqueId = collectionId;
  let isUnique = false;

  while (!isUnique) {
    try {
      const response = await fetch(`/api/collection/${uniqueId}`);

      if (response.ok) {
        // Collection with this ID already exists, generate a new one
        uniqueId = `${collectionId}${Math.floor(Math.random() * 1000)}`;
      } else {
        // Collection with this ID doesn't exist, we can use it
        isUnique = true;
      }
    } catch (error) {
      console.error("Error checking for unique ID:", error);
      // If there's an error, assume the ID is unique and return it
      isUnique = true;
    }
  }

  return uniqueId;
};
