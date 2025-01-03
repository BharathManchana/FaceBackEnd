import { v2 as cloudinary } from 'cloudinary';
import type { UploadApiResponse } from 'cloudinary';
import fs from 'fs';


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (
  localFilePath: string
): Promise<UploadApiResponse | null> => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });


    console.log('File is uploaded on Cloudinary:', response.url);
    fs.unlinkSync(localFilePath); // Delete the local file after upload
    return response;
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath); 
    }
    return null;
  }
};

export { uploadOnCloudinary };
