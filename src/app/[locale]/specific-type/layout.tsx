import { TypeNavBar } from "@/app/components/TypeNavBar";
// import { UnitInfo } from "./UnitInfo";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full overflow-hidden relative max-[1100px]:mt-[5rem] max-[500px]:h-[80%]">
      {/* <UnitInfo /> */}
      {children}
      <TypeNavBar />
    </div>
  );
}
