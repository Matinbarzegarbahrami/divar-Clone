import { ValidationResult } from "../types/newPostValidationType";

const validImageMimes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/bmp",
];

const MAX_SIZE = 5 * 1024 * 1024;

export function validateImages(
  imageFiles: File[]
): ValidationResult {
  if (imageFiles.length === 0) {
    return {
      success: false,
      error: "حداقل یک تصویر باید آپلود شود",
    };
  }

  if (imageFiles.length > 10) {
    return {
      success: false,
      error: "حداکثر 10 تصویر مجاز است",
    };
  }

  for (const file of imageFiles) {
    if (!validImageMimes.includes(file.type)) {
      return {
        success: false,
        error: `${file.name} فرمت معتبری ندارد`,
      };
    }

    if (file.size > MAX_SIZE) {
      return {
        success: false,
        error: `${file.name} بیشتر از 5 مگابایت است`,
      };
    }
  }

  return { success: true };
}