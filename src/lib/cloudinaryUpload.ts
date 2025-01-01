import cloudinary from "@/lib/cloudinary";

export const uploadImageToCloudinary = async (
  image: string,
  folder: string
): Promise<string> => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder,
    });
    return uploadResponse.secure_url;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw new Error("Image upload failed");
  }
};
