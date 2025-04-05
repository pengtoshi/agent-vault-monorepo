// Environment
export const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_MEDIA_BASE_URL;
export const VIDEO_BASE_URL = process.env.NEXT_PUBLIC_VIDEO_BASE_URL;
export const IS_PRODUCTION = process.env.NEXT_PUBLIC_STAGE === "prod";

// File Upload
export const UPLOAD_FILE_SIZE_LIMIT = 10 * 1024 * 1024;

// Shared Image
export const SKELETON_IMAGE_PATH = "/shared/images/skeleton.svg";
