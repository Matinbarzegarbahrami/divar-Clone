"use client";

import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";

async function isSaveToBookMark(id: string | number) {
    try {
        const res = await fetch(`/api/posts/${id}/bookmark`);
        console.log(res)
        if (res.status === 401) {
            const item = localStorage.getItem("BookMark");
            const items = JSON.parse(item || "[]");

            return items.includes(id);
        }
        const data = await res.json()
        console.log(data)
        if (data.message == "notBook"){
            return false
        }
        return true;
    } catch {
        return false;
    }
}

async function saveToBookMark(id: number | string) {
    try {
        const res = await fetch(`/api/posts/${id}/bookmark`, {
            method: "POST",
        });

        if (res.status === 401) {
            const item = localStorage.getItem("BookMark");
            const items = JSON.parse(item || "[]");

            if (!items.includes(id)) {
                items.push(id);
            }

            localStorage.setItem(
                "BookMark",
                JSON.stringify(items)
            );

            return;
        }

        console.log(await res.json());
    } catch (err) {
        console.error(err);
    }
}

export default function SaveBookMarkButton({
    id,
}: {
    id: string | number;
}) {
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        isSaveToBookMark(id).then(setSaved);
    }, [id]);

    return (
        <button
            className={`hover:text-white transition-colors ${
                saved ? "bg-amber-50" : "bg-transparent"
            }`}
            onClick={() => saveToBookMark(id)}
        >
            <Bookmark size={18} />
        </button>
    );
}