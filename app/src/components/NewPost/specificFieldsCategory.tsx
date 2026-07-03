import { Props } from "../../types/postTypes";
import { Checkbox, NumberInput, Select, TextInput } from "./TextFields";

export type FieldProps = Pick<Props, "state" | "dispatch">;

export const RealEstateFields = ({ state, dispatch }: FieldProps) => (
    <div className="flex flex-col gap-4 mt-4 border-t border-zinc-700 pt-4">
        <p className="text-lg">مشخصات ملک</p>
        <TextInput
            label="آدرس"
            value={state.address || ""}
            onChange={(e: any) => dispatch({ type: "SET_ADDRESS", payload: e.target.value })} />
        <NumberInput
            label="متراژ (متر مربع)"
            value={state.area || ""}
            onChange={(e: any) => dispatch({ type: "SET_AREA", payload: Number(e.target.value) })}
            placeholder="مثال: ۱۲۰"
        />
        <NumberInput
            label="طبقه"
            value={state.floor || ""}
            onChange={(e: any) => dispatch({ type: "SET_FLOOR", payload: Number(e.target.value) })}
        />
        <NumberInput
            label="تعداد طبقات کل"
            value={state.totalFloors || ""}
            onChange={(e: any) => dispatch({ type: "SET_TOTAL_FLOORS", payload: Number(e.target.value) })}
        />
        
        <Checkbox
            checked={state.hasElevator || false}
            onChange={(e: any) => dispatch({ type: "SET_HAS_ELEVATOR", payload: e.target.checked })}
            label="آسانسور دارد"
        />
        <Checkbox
            checked={state.hasParking || false}
            onChange={(e: any) => dispatch({ type: "SET_HAS_PARKING", payload: e.target.checked })}
            label="پارکینگ دارد"
        />
        <Checkbox
            checked={state.hasWarehouse || false}
            onChange={(e: any) => dispatch({ type: "SET_HAS_WAREHOUSE", payload: e.target.checked })}
            label="انباری دارد"
        />
    </div>
);

export const MobileFields = ({ state, dispatch }: FieldProps) => (
    <div className="flex flex-col gap-4 mt-4 border-t border-zinc-700 pt-4">
        <p className="text-lg">مشخصات موبایل</p>
        <TextInput
            label="آدرس"
            value={state.address || ""}
            onChange={(e: any) => dispatch({ type: "SET_ADDRESS", payload: e.target.value })} />

        <Select
            label="رم (گیگابایت)"
            value={state.ram || ""}
            onChange={(e: any) => dispatch({ type: "SET_RAM", payload: Number(e.target.value) })}
            options={[
                { value: 4, label: "۴ گیگ" },
                { value: 6, label: "۶ گیگ" },
                { value: 8, label: "۸ گیگ" },
                { value: 12, label: "۱۲ گیگ" },
            ]}
        />
        <Select
            label="حافظه داخلی (گیگابایت)"
            value={state.storage || ""}
            onChange={(e: any) => dispatch({ type: "SET_STORAGE", payload: Number(e.target.value) })}
            options={[
                { value: 64, label: "۶۴" },
                { value: 128, label: "۱۲۸" },
                { value: 256, label: "۲۵۶" },
                { value: 512, label: "۵۱۲" },
            ]}
        />
        <TextInput
            label="رنگ"
            value={state.color || ""}
            onChange={(e: any) => dispatch({ type: "SET_COLOR", payload: e.target.value })}
        />
        <Checkbox
            checked={state.warranty || false}
            onChange={(e: any) => dispatch({ type: "SET_WARRANTY", payload: e.target.checked })}
            label="دارای گارانتی"
        />
        
        <NumberInput
            label="سلامت باتری (%)"
            value={state.batteryHealth || ""}
            onChange={(e: any) => dispatch({ type: "SET_BATTERY_HEALTH", payload: Number(e.target.value) })}
            min={0}
            max={100}
        />
    </div>
);

export const VehicleFields = ({ state, dispatch }: FieldProps) => (
    <div className="flex flex-col gap-4 mt-4 border-t border-zinc-700 pt-4">
        <p className="text-lg">مشخصات وسیله نقلیه</p>
        <TextInput
            label="آدرس"
            value={state.address || ""}
            onChange={(e: any) => dispatch({ type: "SET_ADDRESS", payload: e.target.value })} />
        <TextInput
            label="برند"
            value={state.brand || ""}
            onChange={(e: any) => dispatch({ type: "SET_BRAND", payload: e.target.value })}
        />
        <TextInput
            label="مدل"
            value={state.model || ""}
            onChange={(e: any) => dispatch({ type: "SET_MODEL", payload: e.target.value })}
        />
        <NumberInput
            label="سال ساخت"
            value={state.vehicleYear || ""}
            onChange={(e: any) => dispatch({ type: "SET_VEHICLE_YEAR", payload: Number(e.target.value) })}
        />
        <NumberInput
            label="کارکرد (کیلومتر)"
            value={state.mileage || ""}
            onChange={(e: any) => dispatch({ type: "SET_MILEAGE", payload: Number(e.target.value) })}
        />
        <Select
            label="گیربکس"
            value={state.gearbox || ""}
            onChange={(e: any) => dispatch({ type: "SET_GEARBOX", payload: e.target.value })}
            options={[
                { value: "manual", label: "دنده دستی" },
                { value: "automatic", label: "اتوماتیک" },
            ]}
        />
        
        <Select
            label="نوع سوخت"
            value={state.fuelType || ""}
            onChange={(e: any) => dispatch({ type: "SET_FUEL_TYPE", payload: e.target.value })}
            options={[
                { value: "petrol", label: "بنزین" },
                { value: "diesel", label: "دیزل" },
                { value: "cng", label: "CNG" },
                { value: "hybrid", label: "هیبرید" },
            ]}
        />
    </div>
);