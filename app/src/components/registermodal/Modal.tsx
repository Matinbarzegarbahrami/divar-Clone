'use client';
import { X } from "lucide-react";
import { useState } from "react";
import { useUser } from "@/app/src/store/userStore";

interface User {
  phone: string;
}

type SendCodeButtonProps = {
  number: string;
  onCodeSent: (sent: boolean) => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

type VerifyButtonProps = {
  phone: string;
  code: string;
  onSuccess: (user: User) => void;
  onClose: (open: boolean) => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

type ModalProps = {
  isOpen: boolean;
  onClose: (open: boolean) => void;
};

const SendCodeButton = ({ number, onCodeSent, setIsLoading } : SendCodeButtonProps) => {
  
  const handleOnclick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (!number || number.length !== 11) {
      alert('لطفاً شماره موبایل 11 رقمی وارد کنید');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({ number: number }),
        headers: { "Content-Type": "application/json" }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        console.log('Code sent:', data.verifyCode);
        onCodeSent(true);
        alert('کد تأیید برای شما ارسال شد');
      } else {
        alert(data.message || 'خطا در ارسال کد');
      }
    } catch (e) {
      console.log(e);
      alert('خطا در ارتباط با سرور');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      className="bg-primary py-2 px-8 rounded-sm text-white"
      onClick={handleOnclick}
    >
      ارسال کد
    </button>
  );
};

const VerifyButton = ({ phone, code, onSuccess, onClose, setIsLoading } : VerifyButtonProps) => {
  const { login } = useUser();
  const handleVerify = async (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (!code || code.length !== 6) {
      alert('لطفاً کد 6 رقمی را وارد کنید');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        body: JSON.stringify({ phone, code }),
        headers: { "Content-Type": "application/json" }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        onSuccess(data.user);
        onClose(false);
        login(phone)
        window.location.href = '/my-divar';
      } else {
        alert(data.message || 'کد نامعتبر است');
      }
    } catch (e) {
      console.log(e);
      alert('خطا در ارتباط با سرور');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      className="bg-primary py-2 px-8 rounded-sm text-white cursor-pointer"
      onClick={handleVerify}
    >
      تأیید و ورود
    </button>
  );
};

const Modal = ({ isOpen, onClose } : ModalProps) => {
  const [number, setNumber] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' or 'code'
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleCodeSent = (sent : boolean) => {
    if (sent) {
      setStep('code');
    }
  };

  const handleVerifySuccess = (user :User) => {
    console.log('User logged in:', user);
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-surface  shadow-sm shadow-white/20 rounded-lg p-6 w-full max-w-md relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {step === 'phone' ? 'ورود به حساب' : 'تأیید کد'}
          </h2>
          <button onClick={() => onClose(false)} className="p-1 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          {step === 'phone' ? (
            <>
              <p className="text-gray-700">شمارهٔ موبایل خود را وارد کنید</p>
              <p className="text-sm text-gray-500">یک کد برای شما ارسال میشود</p>
              
              <input 
                type="tel" 
                className="w-full border rounded-md p-2 text-left dir-ltr"
                placeholder="09123456789"
                value={number} 
                onChange={(e) => setNumber(e.target.value)}
                dir="ltr"
              />
              
              <p className="text-xs text-gray-500">
                با ورود به دیوار، استفاده و سیاست نامهٔ 
                <span className="text-primary mx-1">حریم خصوصی</span>، 
                <span className="text-primary mx-1">شرایط و قوانین</span>
                را می‌پذیرم.
              </p>
              
              <SendCodeButton 
                number={number} 
                onCodeSent={handleCodeSent}
                setIsLoading={setIsLoading}
              />
            </>
          ) : (
            <>
              <p className="text-white">کد تأیید برای شماره {number} ارسال شد</p>
              <p className="text-sm text-gray-400">کد 6 رقمی را وارد کنید</p>
              
              <input 
                type="text" 
                className="w-full border rounded-md p-2 text-center text-2xl tracking-widest dir-ltr"
                placeholder="------"
                maxLength={6}
                value={code} 
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                dir="ltr"
              />
              
              <div className="flex flex-row justify-between">
              <button 
                className="text-primary text-sm"
                onClick={() => setStep('phone')}
              >
                ویرایش شماره موبایل
              </button>
              
              <VerifyButton 
                phone={number}
                code={code}
                onSuccess={handleVerifySuccess}
                onClose={onClose}
                setIsLoading={setIsLoading}
              />
              </div>
            </>
          )}
          
          {isLoading && (
            <div className="text-center text-gray-500">
              در حال پردازش...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;