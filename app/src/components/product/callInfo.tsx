'use client';

import { useState } from "react";

export default function CallInfo({ phone }: { phone: string | null }) {
  const [showPhone, setShowPhone] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      {!showPhone ? (
        <button
          onClick={() => setShowPhone(true)}
          className="bg-red-500 hover:bg-red-600 transition-colors text-white text-sm font-bold px-6 py-2.5 rounded-lg"
        >
          اطلاعات تماس
        </button>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="bg-zinc-800 rounded-lg px-4 py-3 flex items-center justify-between">
            <span className="text-sm text-zinc-400">شماره تلفن</span>
            <span className="text-red-400 font-bold tracking-wide" dir="ltr">{phone}</span>
          </div>
          <p className="text-white leading-6 bg-zinc-600 rounded-lg p-2">
            درخواست بیعانه، از نشانه‌های کلاهبرداری <br /> برای هر نوع پرداخت از «پرداخت امن» استفاده کنید.
          </p>
        </div>
      )}
    </div>
  );
}