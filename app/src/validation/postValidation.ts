import { ValidationResult } from "../types/newPostValidationType";
import { State } from "../types/postTypes";

export function validatePost(
  post: State
): ValidationResult {
console.log(post)
  if (!post.title?.trim()) {
    return {
      success: false,
      error: "عنوان الزامی است",
    };
  }

  if (!post.description?.trim()) {
    return {
      success: false,
      error: "توضیحات الزامی است",
    };
  }

  if (!post.category?.trim()) {
    return {
      success: false,
      error: "دسته بندی الزامی است",
    };
  }

  if (!post.location?.trim()) {
    return {
      success: false,
      error: "آدرس الزامی است",
    };
  }

  if (
    post.area !== undefined &&
    (isNaN(post.area) || post.area <= 0)
  ) {
    return {
      success: false,
      error: "متراژ معتبر نیست",
    };
  }

  if (
    post.floor !== undefined &&
    (isNaN(post.floor) || post.floor < 0)
  ) {
    return {
      success: false,
      error: "طبقه معتبر نیست",
    };
  }

  if (
    post.totalFloors !== undefined &&
    (isNaN(post.totalFloors) || post.totalFloors < 1)
  ) {
    return {
      success: false,
      error: "تعداد طبقات معتبر نیست",
    };
  }

  if (
    post.yearBuilt !== undefined &&
    (post.yearBuilt < 1300 || post.yearBuilt > 1500)
  ) {
    return {
      success: false,
      error: "سال ساخت معتبر نیست",
    };
  }

  if (
    post.batteryHealth !== undefined &&
    (post.batteryHealth < 0 ||
      post.batteryHealth > 100)
  ) {
    return {
      success: false,
      error: "سلامت باتری معتبر نیست",
    };
  }

  if (
    post.vehicleYear !== undefined &&
    (post.vehicleYear < 1900 ||
      post.vehicleYear >
        new Date().getFullYear() + 1)
  ) {
    return {
      success: false,
      error: "سال خودرو معتبر نیست",
    };
  }

  if (
    post.mileage !== undefined &&
    post.mileage < 0
  ) {
    return {
      success: false,
      error: "کارکرد خودرو معتبر نیست",
    };
  }

  return { success: true };
}