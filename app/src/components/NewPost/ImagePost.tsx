import { X } from "lucide-react";
import Image from "next/image";
import { Action, State } from "@/app/src/types/postTypes";

export function ImageUploader({ state, dispatch }: { state: State, dispatch: (action: Action) => void }) {
    const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        if (!files.length) return;

        dispatch({ type: "ADD_IMAGES", payload: files });
        e.target.value = "";
    };

    return (
        <div className="flex flex-col gap-2">
            <p>افزودن عکس <span className="text-red-600">*</span></p>

            <label htmlFor="image" className="border-dashed border-2  border-zinc-500/40 p-2">
                افزودن تصویر
            </label>

            <input
                id="image"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handle}
            />

            <div className="flex gap-3">
                {state.allImages.map((file: File, index: number) => (
                    <div key={index} className="relative group">
                        <button
                            type="button"
                            onClick={() =>
                                dispatch({ type: "REMOVE_IMAGE", payload: index })
                            }
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
                        >
                            <X size={16} />
                        </button>

                        <Image
                            src={URL.createObjectURL(file)}
                            alt=""
                            width={120}
                            height={120}
                            className="rounded-lg"
                        />
                    </div>
                ))}
            </div>
            {state.allImages.length == 0 && <span className="text-red-800 text-sm">حداقل باید یک عکس انتخاب شود</span>}
        </div>
    );
}
