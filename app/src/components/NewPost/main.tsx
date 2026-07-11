'use client';
import { useReducer, useState } from "react";
import { CategoryStep } from "./CategoryPost";
import { TextFields } from "./TextFields";
import { ImageUploader } from "./ImagePost";
import { State } from "@/app/src/types/postTypes";
import { reducer } from "./mainReducer";
import { useRouter } from "next/navigation";
import { setNewPost } from "./setNewPost";
import { useUser } from "../../store/userStore";
import { useCity } from "../../store/cityStore";

const initialState: State = {
    id:'',
    createdAt:'',
    coverImage: null,
    allImages: [],
    title: "",
    description: "",
    category: "",
    address: "",
    area: undefined,
    floor: undefined,
    totalFloors: undefined,
    yearBuilt: undefined,
    hasElevator: false,
    hasParking: false,
    hasWarehouse: false,
    ram: undefined,
    storage: undefined,
    color: "",
    warranty: false,
    batteryHealth: undefined,
    brand: "",
    model: "",
    vehicleYear: undefined,
    mileage: undefined,
    gearbox: undefined,
    fuelType: undefined,
    city:null,
    location:null,
    price:0,
    owner:{
        phone: null
    }
};

export default function MainNewPost() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const { user } = useUser();
    const { city } = useCity();
    const nextStepHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (step === 1) {
            if (!state.title || !state.description || !state.allImages.length) return;
            setLoading(true);
            setTimeout(() => {
                setStep((p) => p + 1);
                setLoading(false);
            }, 300);
            return;
        }

        if (step === 2) {
            setLoading(true);
            try {
                const props = {
                    state: state,
                    city:city.id,
                    user: user
                };
                await setNewPost(props);
                router.push('/my-divar');
            } catch (error) {
                console.error("ارسال با خطا مواجه شد:", error);
                alert("خطا در ثبت آگهی. دوباره تلاش کنید.");
                setLoading(false);
            }
            return;
        }

        if (step > 2) {
            router.push('/');
        }

    };

    const step1Valid = state.title && state.description && state.allImages.length;
    const step2Valid = state.category;

    return (
        <div className="mx-auto mt-4 w-full max-w-lg p-4 pb-20">
            <form className="flex flex-col gap-4">
                <p className="font-bold">ثبت آگهی</p>

                {step === 1 && (
                    <>
                        <ImageUploader state={state} dispatch={dispatch} />
                        <TextFields state={state} dispatch={dispatch} />
                    </>
                )}

                {step === 2 && (
                    <CategoryStep state={state} dispatch={dispatch} />
                )}

                <button
                    type="button"
                    onClick={nextStepHandler}
                    disabled={loading}
                    className={`bg-primary text-white p-2 rounded ${(step === 1 && !step1Valid) || (step === 2 && !step2Valid)
                        ? "hidden"
                        : "block"
                        }`}
                >
                    {loading ? "در حال بارگذاری..." : "مرحله بعد"}
                </button>
            </form>
        </div>
    );
}