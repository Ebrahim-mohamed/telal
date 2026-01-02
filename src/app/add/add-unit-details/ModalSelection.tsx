import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ModalSelection({
  name,
  control,
  error,
}: {
  name: string;
  control: any;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-2 w-[25rem]">
      <label className="font-medium text-[1.125rem] text-black">
        Select Model
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="w-full">
            <Select
              value={field.value}
              onValueChange={field.onChange} // onValueChange instead of onChange
            >
              <div className="w-full text-[1.125rem] font-medium placeholder:text-[#D1D1D1] text-black p-[1.5rem] border-[1px] border-[#D1D1D1] rounded-[0.375rem]">
                <SelectTrigger>
                  <SelectValue placeholder="Select Model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="model-1">Model 1</SelectItem>
                  <SelectItem value="model-2">Model 2</SelectItem>
                  <SelectItem value="model-3">Model 3</SelectItem>
                  <SelectItem value="model-4">Model 4</SelectItem>
                </SelectContent>
              </div>
            </Select>
          </div>
        )}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
