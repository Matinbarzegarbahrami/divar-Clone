import { NextRequest, NextResponse } from "next/server";
import { validatePost } from "@/app/src/validation/postValidation";
import { validateImages } from "@/app/src/validation/imageValidation";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import jwt from "jsonwebtoken";
import prisma from "@/app/src/lib/prisma";
import { Category, Gearbox, FuelType, Status } from "@prisma/client"; // فرض بر این است که Prisma Client این Enum‌ها را صادر می‌کند

export async function POST(request: NextRequest) {
  try {
    // ۱. احراز هویت
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: "توکن نامعتبر" },
        { status: 401 }
      );
    }

    let userId: number;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
      userId = decoded.id;
    } catch {
      return NextResponse.json(
        { success: false, error: "توکن نامعتبر" },
        { status: 401 }
      );
    }

    // ۲. دریافت داده‌های فرم
    const formData = await request.formData();

    // ۳. دریافت فیلدهای ضروری
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string; // باید یکی از مقادیر Enum باشد
    const location = formData.get("address")  || "asd"
    const price = Number(formData.get("price"));
    const cityId = Number(formData.get("cityId"));
    console.log(price)
    // ۴. دریافت فیلدهای اختیاری بر اساس دسته‌بندی
    const optionalFields: any = {};

    // فیلدهای مشترک
    if (formData.get("area")) optionalFields.area = Number(formData.get("area"));
    if (formData.get("floor")) optionalFields.floor = Number(formData.get("floor"));
    if (formData.get("totalFloors")) optionalFields.totalFloors = Number(formData.get("totalFloors"));
    if (formData.get("yearBuilt")) optionalFields.yearBuilt = Number(formData.get("yearBuilt"));
    if (formData.get("hasElevator")) optionalFields.hasElevator = formData.get("hasElevator") === "true";
    if (formData.get("hasParking")) optionalFields.hasParking = formData.get("hasParking") === "true";
    if (formData.get("hasWarehouse")) optionalFields.hasWarehouse = formData.get("hasWarehouse") === "true";

    // موبایل
    if (formData.get("ram")) optionalFields.ram = Number(formData.get("ram"));
    if (formData.get("storage")) optionalFields.storage = Number(formData.get("storage"));
    if (formData.get("color")) optionalFields.color = formData.get("color") as string;
    if (formData.get("warranty")) optionalFields.warranty = formData.get("warranty") === "true";
    if (formData.get("batteryHealth")) optionalFields.batteryHealth = Number(formData.get("batteryHealth"));

    // وسایل نقلیه
    if (formData.get("brand")) optionalFields.brand = formData.get("brand") as string;
    if (formData.get("model")) optionalFields.model = formData.get("model") as string;
    if (formData.get("vehicleYear")) optionalFields.vehicleYear = Number(formData.get("vehicleYear"));
    if (formData.get("mileage")) optionalFields.mileage = Number(formData.get("mileage"));
    if (formData.get("gearbox")) optionalFields.gearbox = formData.get("gearbox") as Gearbox;
    if (formData.get("fuelType")) optionalFields.fuelType = formData.get("fuelType") as FuelType;

    // ۵. پردازش تصاویر
    const imageFiles: File[] = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("image_") && value instanceof File) {
        imageFiles.push(value);
      }
    }

    // اعتبارسنجی تصاویر (در صورت نیاز)
    const imageValidation = validateImages(imageFiles);
    if (!imageValidation.success) {
      return NextResponse.json(
        { success: false, error: imageValidation.error },
        { status: 400 }
      );
    }

    // ذخیره تصاویر در سرور
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await mkdir(uploadDir, { recursive: true });

    const savedImagePaths: string[] = [];
    for (const image of imageFiles) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uniqueName = `${Date.now()}-${image.name}`;
      const filePath = path.join(uploadDir, uniqueName);
      await writeFile(filePath, buffer);
      savedImagePaths.push(`/uploads/${uniqueName}`);
    }

    const coverImage = savedImagePaths.length > 0 ? savedImagePaths[0] : null;
    const allImages = savedImagePaths; // به‌صورت Json ذخیره می‌شود

    // ۶. ساخت شیء داده برای Prisma
    const postData = {
      title,
      description,
      category: category as Category,
      location,
      price,
      coverImage,
      allImages,
      status: "SEMI_ACTIVE", // یا هر وضعیت پیش‌فرض دیگری
      userId,
      cityId,
      ...optionalFields,
    };

    console.log("post data:", postData.cityId)
    // ۷. اعتبارسنجی نهایی (با استفاده از Zod یا هر کتابخانه‌ای)
    const postValidation = validatePost(postData);
    if (!postValidation.success) {
      return NextResponse.json(
        { success: false, error: postValidation.error },
        { status: 400 }
      );
    }
    console.log("[post data] : ", postData)
    const newPost = await prisma.post.create({
      data: postData,
    });

    return NextResponse.json({
      success: true,
      post: newPost,
    });

  } catch (error) {
    console.error("Error in POST /api/posts:", error);
    return NextResponse.json(
      { success: false, error: "خطای داخلی سرور" },
      { status: 500 }
    );
  }
}