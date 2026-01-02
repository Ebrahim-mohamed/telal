import React from "react";

export function FormInput({
  placeholder,
  type,
  isInq,
  prop,
  error,
}: {
  placeholder?: string;
  type: string;
  isInq?: boolean;
  prop?: React.InputHTMLAttributes<HTMLInputElement>;
  error?: string;
}) {
  return (
    <div className={`w-full relative ${error ? "mb-[1rem]" : ""}`}>
      <input
        {...prop}
        placeholder={placeholder}
        type={type}
        className={`placeholder:text-[5rem] placeholder:text-[#CBCBCB] placeholder:font-semibold w-full text-[5rem] text-black px-[6rem] border-[0.8rem] rounded-[2.5rem] ${
          isInq ? "py-[5rem]" : "py-[7rem]"
        } ${error ? "border-red-500" : "border-black"}`}
      />
      {error && (
        <p className="text-red-500 text-[3.5rem] mt-[1rem] absolute">{error}</p>
      )}
    </div>
  );
}
