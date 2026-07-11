import { State } from "@/app/src/types/postTypes";

interface SetNewPostProps {
    state: State;
    user: any;
    city:number;
}
type CityId = "tehran" | "tabriz";

export async function setNewPost({ state, user, city }: SetNewPostProps) {
    const formData = new FormData();

    formData.append("title", state.title);
    formData.append("description", state.description);
    formData.append("category", state.category);
    formData.append("address", state.address || "");
    if (state.area !== undefined) formData.append("area", String(state.area));
    if (state.floor !== undefined) formData.append("floor", String(state.floor));
    if (state.totalFloors !== undefined) formData.append("totalFloors", String(state.totalFloors));
    if (state.yearBuilt !== undefined) formData.append("yearBuilt", String(state.yearBuilt));
    formData.append("hasElevator", String(state.hasElevator));
    formData.append("hasParking", String(state.hasParking));
    formData.append("hasWarehouse", String(state.hasWarehouse));
    if (state.ram !== undefined) formData.append("ram", String(state.ram));
    if (state.storage !== undefined) formData.append("storage", String(state.storage));
    formData.append("color", state.color || "");
    
formData.append("cityId", String(city))
formData.append("price", String(state.price));
    formData.append("warranty", String(state.warranty));
    if (state.batteryHealth !== undefined) formData.append("batteryHealth", String(state.batteryHealth));
    formData.append("brand", state.brand || "");
    formData.append("model", state.model || "");
    if (state.vehicleYear !== undefined) formData.append("vehicleYear", String(state.vehicleYear));
    if (state.mileage !== undefined) formData.append("mileage", String(state.mileage));
    formData.append("gearbox", state.gearbox || "");
    formData.append("fuelType", state.fuelType || "");
    if (state.allImages.length > 0) {
        formData.append("coverImage", state.allImages[0]);
    }

    state.allImages.forEach((file, index) => {
        formData.append(`image_${index}`, file);
    });

    if (user.phone) {
        formData.append("owner", user.phone);
    }

    const response = await fetch("/api/new", {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "خطا در ارسال آگهی");
    }

    const result = await response.json();
    return result;
}