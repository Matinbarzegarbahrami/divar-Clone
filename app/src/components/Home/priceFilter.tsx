'use client';
import { useEffect, useState } from "react";
import SetPrice from "./setDilay";
import { useRouter } from "next/navigation";

export default function PriceFilter() {
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')

    const router = useRouter()
    useEffect(() => {
        if (!minPrice && !maxPrice) return;

        const query = new URLSearchParams();

        if (minPrice) query.set("price", `${minPrice}-${maxPrice || ""}`);

        router.push(`?${query.toString()}`);
    }, [minPrice, maxPrice]);
    return (
        <>
            <p>قیمت</p>
            <SetPrice setNewValue={setMinPrice} />
            <SetPrice setNewValue={setMaxPrice} />
        </>
    )
}