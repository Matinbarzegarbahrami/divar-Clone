'use client';
import { X } from "lucide-react";
import { useState } from "react";

const Button = ({ number }) => {
  const handleOnclick = async (e) => {
    e.preventDefault()
    try {
      const x = await fetch('api/register', {
        method: 'POST',
        body: JSON.stringify({
          number: number
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
    } catch (e) {
      return console.log(e)
    }
  }

  return (
    <button className="bg-primary py-2 px-8 rounded-sm" onClick={(e) => handleOnclick(e)}>
      ورود
    </button>
  )
}

const Modal = () => {
  const [number, setNumber] = useState('');

  return (

    <div>
      <div>
        <div>ورود به حساب</div>
        <span><X /></span>
      </div>
      <div>
        <p>شمارهٔ موبایل خود را وارد کنید</p>
        <p>یک کد برای شما ارسال میشود</p>

        <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} />
        <p>با ورود به دیوار،  استفاده و سیاست نامهٔ <span className="text-primary">حریم خصوصی</span> , <span className="text-primary">شرایط و قوانین</span> را می‌پذیرم.</p>
        <Button number={number} />
      </div>
    </div>
  )
}

export default Modal
