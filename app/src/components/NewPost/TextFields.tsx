import { Action, State } from "@/app/src/types/postTypes";
import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
export const TextInput = ({ label, value, onChange, placeholder }: any) => (
    <div className="flex flex-col gap-1">
        <label className="text-sm text-zinc-400">{label}</label>
        <input
            type="text"
            value={value}
            onChange={onChange}
            className="bg-transparent rounded-sm p-2 text-white border border-zinc-700 focus:border-blue-500"
            placeholder={placeholder}
        />
    </div>
);

export const NumberInput = ({ label, value, onChange, min, max, placeholder }: any) => {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm text-zinc-400">{label}</label>

            <input
                type="number"
                value={value}
                onChange={(e) => {
                    let val = e.target.value;

                    // اگر خالی شد اجازه بده
                    if (val === "") {
                        onChange(e);
                        return;
                    }

                    const num = Number(val);

                    if (max !== undefined && num > max) return;
                    if (min !== undefined && num < min) return;

                    onChange(e);
                }}
                className="bg-transparent rounded-sm p-2 text-white border border-zinc-700 focus:border-blue-500"
                placeholder={placeholder}
            />
        </div>
    );
};

export const Select = ({ label, value, onChange, options }: any) => {
    const [open, setOpen] = useState(false);

    const selected = options.find((o: any) => o.value === value);

    return (
        <div className="flex flex-col gap-1 w-full relative">
            <label className="text-sm text-zinc-400">{label}</label>

            {/* Trigger */}
            <div
                onClick={() => setOpen(!open)}
                className="
          w-full
          bg-zinc-900/40
          border border-zinc-700
          rounded-md
          px-3 py-2
          text-white
          flex items-center justify-between
          cursor-pointer
          select-none
          hover:border-zinc-500
          transition
        "
            >
                <span className={selected ? "text-white" : "text-zinc-500"}>
                    {selected ? selected.label : "انتخاب کنید"}
                </span>

                <ChevronDown
                    className={`w-4 h-4 transition ${open ? "rotate-180" : ""}`}
                />
            </div>

            {/* Dropdown */}
            {open && (
                <div
                    className="
            absolute top-full mt-1
            w-full
            bg-zinc-900
            border border-zinc-700
            rounded-md
            overflow-hidden
            z-50
          "
                >
                    {options.map((opt: any) => (
                        <div
                            key={opt.value}
                            onClick={() => {
                                onChange({ target: { value: opt.value } });
                                setOpen(false);
                            }}
                            className="
                px-3 py-2
                text-white
                hover:bg-zinc-800
                cursor-pointer
                flex items-center justify-between
              "
                        >
                            <span>{opt.label}</span>

                            {value === opt.value && (
                                <Check className="w-4 h-4 text-blue-500" />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


export const Checkbox = ({ checked, onChange, label }: any) => (
    <div className="flex items-center gap-2">
        <input type="checkbox" checked={checked} onChange={onChange} className="w-4 h-4" />
        <label>{label}</label>
    </div>
);

export function TextFields({ state, dispatch }: { state: State, dispatch: (action: Action) => void }) {
    return (
        <>
            <div className="flex flex-col gap-2">
                <p>عنوان آگهی <span className="text-red-600">*</span></p>
                <input
                    className="p-2 border rounded  border-zinc-500/40"
                    value={state.title}
                    onChange={(e) =>
                        dispatch({ type: "SET_TITLE", payload: e.target.value })
                    }
                />
            </div>

            <div className="flex flex-col gap-2">
                <p>توضیحات آگهی <span className="text-red-600">*</span></p>
                <textarea
                    className="p-2 border rounded h-32 resize-none border-zinc-500/40"
                    value={state.description}
                    onChange={(e) =>
                        dispatch({ type: "SET_DESCRIPTION", payload: e.target.value })
                    }
                />
            </div>
        </>
    );
}
