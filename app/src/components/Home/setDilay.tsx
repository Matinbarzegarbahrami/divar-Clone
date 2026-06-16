'use client';
import { useEffect, useState } from "react"

const SetPrice = ({ setNewValue }: {setNewValue: (price:string)=>void}) => {
    const [price, setPrice] = useState('')
    useEffect(() => {
        const timeout = setTimeout(() => {
            setNewValue(price)
        }, 1000)

        return () => clearTimeout(timeout)
    }, [price])
    return (
        <div>
            <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} />
        </div>
    )
}

export default SetPrice
