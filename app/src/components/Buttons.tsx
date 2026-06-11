import React from 'react';

type Props = {
  text: string;
  icon: React.ReactNode;
  isMobile?: boolean;
  onClick?: () => void;
};

function Buttons({ text, icon, isMobile, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`flex h-10 items-center gap-2 rounded-md
        px-3 text-sm text-white/85
        transition-colors hover:bg-white/5
        cursor-pointer
        ${isMobile ? 'flex-col text-3xl' : ''}`}
    >
      <p className="flex items-center gap-1">{icon}</p>
      <span>{text}</span>
    </button>
  );
}

export default Buttons;