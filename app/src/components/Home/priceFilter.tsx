'use client';
import { useEffect, useState } from "react";
import SetPrice from "./setDilay";
import { useRouter, useSearchParams } from "next/navigation";

export default function PriceFilter() {
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.set(
      "price",
      `${minPrice || ""}-${maxPrice || ""}`
    );

    router.push(`?${params.toString()}`);
  }, [minPrice, maxPrice]);
  return (
    <div className="mt-5">
      <p className="">قیمت</p>
      <div className="flex flex-col gap-3 mt-2">
        <div className="flex gap-2 items-center">
          <label htmlFor="min">از</label>
          <SetPrice setNewValue={setMinPrice} label={'min'} />
        </div>
        <div className="flex gap-2 items-center">
          <label htmlFor="max">تا</label>
          <SetPrice setNewValue={setMinPrice} label={'max'} />
        </div>

      </div>

    </div>
  )
}