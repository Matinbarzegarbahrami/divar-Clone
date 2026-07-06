import { cityT } from "../store/cityStore";

export type State = {
    id:string | number
    coverImage: File | null | string;
    allImages: File[];
    title: string;
    description: string;
    category: string;
    address: string;
    location: string | null;
    city:string | null;
    cityId?:"tabriz" | "tehran" | cityT | null;
    price: number;
    createdAt:string;
    // ============ state ==============
    area?: number;
    floor?: number;
    totalFloors?: number;
    yearBuilt?: number;
    hasElevator?: boolean;
    hasParking?: boolean;
    hasWarehouse?: boolean;
    // ============= mobile =============
    ram?: number;
    storage?: number;
    color?: string;
    warranty?: boolean;
    batteryHealth?: number;
    // ============= vehicle =============
    brand?: string;
    model?: string;
    vehicleYear?: number;
    mileage?: number;
    gearbox?: "manual" | "automatic";
    fuelType?: "petrol" | "diesel" | "cng" | "hybrid";
    owner:{
        phone:string | null
    }
};


export type Action =
    | { type: "SET_TITLE"; payload: string }
    | { type: "SET_DESCRIPTION"; payload: string }
    | { type: "ADD_IMAGES"; payload: File[] }
    | { type: "REMOVE_IMAGE"; payload: number }
    | { type: "SET_COVER"; payload: File | null | string}
    | { type: "SET_CATEGORY"; payload: string }
    | { type: "SET_ADDRESS"; payload: string }
    | { type: "SET_PRICE"; payload: string }
    // =============== state ============
    | { type: "SET_AREA"; payload: number }
    | { type: "SET_FLOOR"; payload: number }
    | { type: "SET_TOTAL_FLOORS"; payload: number }
    | { type: "SET_YEAR_BUILT"; payload: number }
    | { type: "SET_HAS_ELEVATOR"; payload: boolean }
    | { type: "SET_HAS_PARKING"; payload: boolean }
    | { type: "SET_HAS_WAREHOUSE"; payload: boolean }
    // =============== mobile =============
    | { type: "SET_RAM"; payload: number }
    | { type: "SET_STORAGE"; payload: number }
    | { type: "SET_COLOR"; payload: string }
    | { type: "SET_WARRANTY"; payload: boolean }
    | { type: "SET_BATTERY_HEALTH"; payload: number }
    // ============== vehicle ==============
    | { type: "SET_BRAND"; payload: string }
    | { type: "SET_MODEL"; payload: string }
    | { type: "SET_VEHICLE_YEAR"; payload: number }
    | { type: "SET_MILEAGE"; payload: number }
    | { type: "SET_GEARBOX"; payload: "manual" | "automatic" }
    | { type: "SET_RESET"; payload: State }
    | { type: "SET_FUEL_TYPE"; payload: "petrol" | "diesel" | "cng" | "hybrid" };

    
export type Props = {
    state: State;
    dispatch: (action: Action) => void;
};
