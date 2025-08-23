const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`;

/**
 * Upload one or multiple images to Cloudinary
 * @param {File|File[]} images - A single File or an array of Files
 * @param {string} preset - Cloudinary upload preset (e.g., "club_images", "milestone_images", "event_images")
 * @returns {Promise<Object|Object[]>} - Cloudinary response(s) containing secure_url
 */
const uploadImage = async (images, preset = "mern_product") => {
  try {
    // Handle single image
    if (!Array.isArray(images)) {
      const formData = new FormData();
      formData.append("file", images);
      formData.append("upload_preset", preset);

      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      return data; // single upload response
    }

    // Handle multiple images
    const uploadPromises = images.map(async (image) => {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", preset);

      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      return response.json();
    });

    const results = await Promise.all(uploadPromises);
    return results; // array of upload responses
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};

export default uploadImage;
