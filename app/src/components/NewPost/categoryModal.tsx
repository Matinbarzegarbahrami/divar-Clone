import { CATEGORY_LIST } from "@/MOCKS/CATEGORY";
import { ChevronLeft, X } from "lucide-react";

export const CategoryModal = ({
    isOpen,
    onClose,
    selectedCategory,
    onSelectCategory,
}: {
    isOpen: boolean;
    onClose: () => void;
    selectedCategory?: string;
    onSelectCategory: (name: string) => void;
}) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/70 backdrop-blur-sm"
            onClick={() => onClose()}
        >
            <div className="bg-zinc-800 rounded-xl w-full max-w-md p-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">انتخاب دسته</h2>
                    {selectedCategory && (
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-full p-1 hover:bg-zinc-700 transition"
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>
                <div className="h-[1px] bg-zinc-700/40 mb-2" />
                <ul className="flex flex-col">
                    {CATEGORY_LIST.map((item) => {
                        const Icon = item.icon;
                        const isSelected = item.name === selectedCategory;
                        return (
                            <li key={item.id}>
                                <button
                                    type="button"
                                    onClick={() => onSelectCategory(item.name)}
                                    className={`w-full flex justify-between items-center p-3 border-b border-zinc-700 transition ${isSelected ? "text-white bg-zinc-700" : "hover:bg-zinc-700/50"
                                        }`}
                                >
                                    <div className="flex gap-2 items-center">
                                        <Icon size={18} />
                                        <span>{item.label}</span>
                                    </div>
                                    <ChevronLeft size={16} className="text-zinc-400" />
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};