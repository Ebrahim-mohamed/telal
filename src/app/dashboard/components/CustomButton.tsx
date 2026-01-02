import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  name: string;
};

export function Button({ name, className, ...props }: ButtonProps) {
  return (
    <button
      className={`px-[3rem] py-[0.5rem] text-[#FFFAF5] text-[0.75rem] font-bold bg-[#57402B] rounded-[0.3rem] cursor-pointer ${className}`}
      {...props}
    >
      {name}
    </button>
  );
}
