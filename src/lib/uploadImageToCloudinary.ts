export async function uploadImageToCloudinary(
  base64Image: string,
  folder: string = "default-folder"
) {
  const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

  try {
    const response = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: JSON.stringify({
        file: base64Image,
        upload_preset: process.env.NEXT_PUBLIC_UPLOAD_PRESET,
        folder: folder,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to upload image to Cloudinary");
    }

    const data = await response.json();
    return data.secure_url; // URL of the uploaded image
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
}
