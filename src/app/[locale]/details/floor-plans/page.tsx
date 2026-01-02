import TypeComponent from "@/app/components/TypeComponent";

export default function FloorPlan() {
  return (
    <div className="h-full w-full py-[5rem] flex flex-col gap-[5rem]">
      <div className="flex gap-[8rem] flex-1 grow max-[500px]:flex-col">
        <TypeComponent content="model-1" />
        <TypeComponent content="model-2" />
      </div>
      <div className="flex gap-[8rem] flex-1 grow max-[500px]:flex-col">
        <TypeComponent content="model-3" />
        <TypeComponent content="model-4" />
      </div>
    </div>
  );
}
