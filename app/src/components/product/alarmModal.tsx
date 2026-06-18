'use client'

import { useState } from "react";

export default function AlarmModal() {
  const [modal, setModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setModal(true)}
        className="w-full border-b border-zinc-600/40 pb-2"
      >
        <div className="flex justify-between items-center text-zinc-300/30">
          <p>زنگ خطر معامله</p>
          <span>{">"}</span>
        </div>
      </button>

      {modal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
          onClick={() => setModal(false)}
        >
          <div
            className="w-[90%] max-w-md rounded-2xl bg-zinc-700 p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">
                زنگ خطر معامله
              </h2>

              <button
                onClick={() => setModal(false)}
                className="text-2xl text-zinc-500 hover:text-black"
              >
                ×
              </button>
            </div>
            <div className="space-y-6 text-right">
              <h2 className="text-xl font-bold">
                زنگ خطرهای قبل از معامله
              </h2>

              <div>
                <h3 className="font-semibold mb-3 text-red-600">
                  روش‌های رایج کلاهبرداری
                </h3>

                <ul className="space-y-2 text-white">
                  <li>• دریافت بیعانه</li>
                  <li>• دریافت پول به بهانهٔ هزینهٔ ارسال</li>
                  <li>• تحویل کالای تقلبی یا معیوب</li>
                  <li>• درخواست اطلاعات بانکی یا هویتی</li>
                  <li>• درخواست «کد تأیید ۶ رقمی ورود به حساب دیوار»</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-orange-600">
                  در این موارد به شدت احتیاط کنید
                </h3>

                <ul className="space-y-3 text-white">
                  <li className="flex gap-2">
                    <span className="text-orange-500">⚠️</span>
                    <span>آگهی‌گذار درخواست بیعانه دارد</span>
                  </li>

                  <li className="flex gap-2">
                    <span className="text-orange-500">⚠️</span>
                    <span>قیمت کالا پایین و وسوسه‌کننده است</span>
                  </li>

                  <li className="flex gap-2">
                    <span className="text-orange-500">⚠️</span>
                    <span>آگهی‌گذار معاملهٔ حضوری را رد می‌کند</span>
                  </li>

                  <li className="flex gap-2">
                    <span className="text-orange-500">⚠️</span>
                    <span>
                      آگهی‌گذار به جای چت دیوار، مکالمه در خارج دیوار را پیشنهاد می‌کند
                    </span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setModal(false)}
                className="w-full rounded-xl bg-red-600 py-3 text-white font-medium"
              >
                متوجه شدم
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}