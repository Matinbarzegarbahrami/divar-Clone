'use client';
import { useEffect, useState } from "react"

const SetPrice = ({ setNewValue, label }: { setNewValue: (price: string) => void, label:string }) => {
    const [price, setPrice] = useState('')
    useEffect(() => {
        const timeout = setTimeout(() => {
            setNewValue(price)
        }, 1000)

        return () => clearTimeout(timeout)
    }, [price])
    return (
        <div className="border border-zinc-700/30 relative ">
            <input type="number" id={label} className="w-full p-2.5 focus:ring-1 focus:ring-primary outline-none" value={price} onChange={(e) => setPrice(e.target.value)} />
        <span className="absolute left-4 bottom-2.5 text-zinc-400/20">تومان</span>
        </div>
    )
}

export default SetPrice
