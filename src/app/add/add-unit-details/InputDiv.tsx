import { UseFormRegisterReturn } from "react-hook-form"; // Add this import for typing

export function InputDiv({
  label,
  type,
  placeholder,
  register,
  error,
}: {
  label: string;
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn; // This is the proper typing for the register props
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-2 w-[25rem]">
      <label className="font-medium text-[1.125rem] text-black">{label}</label>
      <input
        {...register} // Use register directly here
        type={type}
        step={0.1}
        placeholder={placeholder}
        className="w-full text-[1.125rem] font-medium placeholder:text-[#D1D1D1] text-black p-[1.5rem] border-[1px] border-[#D1D1D1] rounded-[0.375rem]"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
