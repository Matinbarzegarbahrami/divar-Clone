import { NextRequest, NextResponse } from "next/server";
import { validatePost } from "@/app/src/validation/postValidation";
import { validateImages } from "@/app/src/validation/imageValidation";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { ALLPOSTS } from "@/MOCKS/POSTS";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value;
        if (!token) {
            return Response.json({
                success: false, error: "invalid token"
            }
                , { status: 400 })
        }
        const user = jwt.verify(token, process.env.JWT_SECRET!)
        console.log(user)
        const formData = await request.formData();
        const newPost: any = {
            id: String(+(ALLPOSTS.length) + 1),
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            category: formData.get("category") as string,
            address: formData.get("address") as string,
            area: formData.get("area") ? Number(formData.get("area")) : undefined,
            floor: formData.get("floor") ? Number(formData.get("floor")) : undefined,
            totalFloors: formData.get("totalFloors") ? Number(formData.get("totalFloors")) : undefined,
            yearBuilt: formData.get("yearBuilt") ? Number(formData.get("yearBuilt")) : undefined,
            hasElevator: formData.get("hasElevator") === "true",
            hasParking: formData.get("hasParking") === "true",
            hasWarehouse: formData.get("hasWarehouse") === "true",
            ram: formData.get("ram") ? Number(formData.get("ram")) : undefined,
            storage: formData.get("storage") ? Number(formData.get("storage")) : undefined,
            color: formData.get("color") as string,
            warranty: formData.get("warranty") === "true",
            batteryHealth: formData.get("batteryHealth") ? Number(formData.get("batteryHealth")) : undefined,
            brand: formData.get("brand") as string,
            model: formData.get("model") as string,
            vehicleYear: formData.get("vehicleYear") ? Number(formData.get("vehicleYear")) : undefined,
            mileage: formData.get("mileage") ? Number(formData.get("mileage")) : undefined,
            gearbox: formData.get("gearbox") as string,
            fuelType: formData.get("fuelType") as string,
            owner: formData.get("owner") ? { phone: formData.get("owner") } : undefined,
            allImages: [],
        };

        const imageFiles: File[] = [];
        for (const [key, value] of formData.entries()) {
            if (key.startsWith("image_") && value instanceof File) {
                imageFiles.push(value);
            }
        }

        const savedImagePaths: string[] = [];


        const uploadDir = path.join(process.cwd(), "public/uploads");
        await mkdir(uploadDir, { recursive: true });
        for (const image of imageFiles) {
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const uniqueName = `${Date.now()}-${image.name}`;
            const filePath = path.join(uploadDir, uniqueName);
            await writeFile(filePath, buffer);
            savedImagePaths.push(`/uploads/${uniqueName}`);
        }
        newPost.allImages = savedImagePaths;


        newPost.allImages = imageFiles.map(f => f.name);
        const postValidation = validatePost(newPost);

        if (!postValidation.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: postValidation.error,
                },
                { status: 400 }
            );
        }

        const imageValidation =
            validateImages(imageFiles);

        if (!imageValidation.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: imageValidation.error,
                },
                { status: 400 }
            );
        }

        // ======== server simulation =========
        console.log(newPost)
        await new Promise((resolve) => setTimeout(resolve, 2000));
        ALLPOSTS.push(newPost)

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