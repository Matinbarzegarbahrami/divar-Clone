import { State, Action } from "@/app/src/types/postTypes";

export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "SET_TITLE":
            return { ...state, title: action.payload };
        case "SET_DESCRIPTION":
            return { ...state, description: action.payload };
        case "SET_CITY":
            return { ...state, cityId: action.payload };
        case "ADD_IMAGES": {
            const images = [...state.allImages, ...action.payload];
            return {
                ...state,
                allImages: images,
                coverImage: state.coverImage ?? action.payload[0] ?? null,
            };
        }
        case "REMOVE_IMAGE": {
            const removed = state.allImages[action.payload];
            const images = state.allImages.filter((_, i) => i !== action.payload);
            return {
                ...state,
                allImages: images,
                coverImage:
                    state.coverImage === removed ? images[0] ?? null : state.coverImage,
            };
        }
        case "SET_COVER":
            return { ...state, coverImage: action.payload };
        case "SET_CATEGORY":
            return { ...state, category: action.payload };
        case "SET_ADDRESS":
            return { ...state, address: action.payload };
        case "SET_PRICE":
            return { ...state, price: Number(action.payload) };
        // ========== state fields ==========
        case "SET_AREA":
            return { ...state, area: action.payload };
        case "SET_FLOOR":
            return { ...state, floor: action.payload };
        case "SET_TOTAL_FLOORS":
            return { ...state, totalFloors: action.payload };
        case "SET_YEAR_BUILT":
            return { ...state, yearBuilt: action.payload };
        case "SET_HAS_ELEVATOR":
            return { ...state, hasElevator: action.payload };
        case "SET_HAS_PARKING":
            return { ...state, hasParking: action.payload };
        case "SET_HAS_WAREHOUSE":
            return { ...state, hasWarehouse: action.payload };
        // ========= mobile fields =========
        case "SET_RAM":
            return { ...state, ram: action.payload };
        case "SET_STORAGE":
            return { ...state, storage: action.payload };
        case "SET_COLOR":
            return { ...state, color: action.payload };
        case "SET_WARRANTY":
            return { ...state, warranty: action.payload };
        case "SET_BATTERY_HEALTH":
            return { ...state, batteryHealth: action.payload };
        // ========== vehicle fields ===========
        case "SET_BRAND":
            return { ...state, brand: action.payload };
        case "SET_MODEL":
            return { ...state, model: action.payload };
        case "SET_VEHICLE_YEAR":
            return { ...state, vehicleYear: action.payload };
        case "SET_MILEAGE":
            return { ...state, mileage: action.payload };
        case "SET_GEARBOX":
            return { ...state, gearbox: action.payload };
        case "SET_FUEL_TYPE":
            return { ...state, fuelType: action.payload };
        case "SET_RESET":
            return action.payload
        default:
            return state;
    }
}