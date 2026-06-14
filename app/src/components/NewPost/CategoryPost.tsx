"use client";

import { useEffect, useState } from "react";
import { CATEGORY_LIST } from "@/MOCKS/CATEGORY";
import { X, ChevronLeft } from "lucide-react";
import { Props } from "../../types/postTypes";
import { FieldProps, MobileFields, RealEstateFields, VehicleFields } from "./specificFieldsCategory";
import { CategoryModal } from "./categoryModal";

const FIELD_COMPONENTS: Record<string, React.ComponentType<FieldProps>> = {
    realEstate: RealEstateFields,
    mobile: MobileFields,
    vehicle: VehicleFields,
};



export function CategoryStep({ state, dispatch }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const selectedCategory = CATEGORY_LIST.find((c) => c.name === state.category);

    useEffect(() => {
        if (!state.category) setIsModalOpen(true);
    }, [state.category]);

    const handleSelectCategory = (categoryName: string) => {
        dispatch({ type: "SET_CATEGORY", payload: categoryName });
        setIsModalOpen(false);
    };

    const DynamicFields = state.category ? FIELD_COMPONENTS[state.category] : null;

    return (
        <>
            <div className="flex flex-col gap-3">
                <p className="text-xl">دسته</p>
                <div className="w-full h-[1px] bg-zinc-600/40 my-3" />
                <div className="flex justify-between items-center">
                    <span className="text-zinc-300">
                        {selectedCategory?.label ?? "هیچ دسته‌ای انتخاب نشده"}
                    </span>
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-300 transition"
                    >
                        {selectedCategory ? "تغییر دسته" : "انتخاب دسته"}
                        <ChevronLeft size={16} />
                    </button>
                </div>
            </div>

            {DynamicFields && <DynamicFields state={state} dispatch={dispatch} />}

            <CategoryModal
                isOpen={isModalOpen}
                onClose={() => {
                    if (state.category) setIsModalOpen(false);
                }}
                selectedCategory={state.category}
                onSelectCategory={handleSelectCategory}
            />
        </>
    );
}