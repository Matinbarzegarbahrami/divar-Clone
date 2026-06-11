'use client';

import { ALLPOSTS } from "@/MOCKS/POSTS";
import { useUser } from "@/app/src/store/userStore";

export default function MyPostList({ status }: { status: string }) {
    const { user } = useUser();

    const posts = ALLPOSTS
        .filter((item) => item.owner.phone === user.phone)
        .filter((item) => status === "all" ? true : item.status === status);

    return (
        <div className="space-y-3 flex gap-5 p-4 ">
            {posts.map((item) => (
                <div
                    key={item.id}
                    className="flex gap-3 bg-transparent h-40 border rounded-xl border-zinc-500/30 p-2 hover:shadow-md transition"
                >
                    <div className="relative w-32 h-24 flex-shrink-0">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute top-1 right-1 bg-black/70 text-white text-xs px-2 py-0.5 rounded-full">
                            📷 1
                        </div>
                    </div>

                    <div className="flex flex-col justify-between flex-1 text-right">
                        <div>
                            <h2 className="text-sm font-bold line-clamp-1">
                                {item.title}
                            </h2>

                            <p className="text-xs text-gray-500 mt-1">
                                {item.city}، {item.location}
                            </p>
                        </div>

                        <div className="mt-2 space-y-1">
                            <p className="text-sm font-semibold text-white">
                                ودیعه: {item.price.toLocaleString()} تومان
                            </p>

                            <p className="text-xs text-gray-500">
                                اجاره: {Math.round(item.price / 48).toLocaleString()} تومان
                            </p>

                            <p className="text-xs text-gray-400">
                                آژانس املاک کارن در تهران
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}