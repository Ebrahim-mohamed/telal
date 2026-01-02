import { MainNavBar } from "@/app/components/MainNavBar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col py-5 h-screen overflow-hidden">
      <div className="flex gap-[4rem] items-center justify-center w-full h-[80%] max-[500px]:h-[70%] max-[900px]:h-[78%] max-[1200px]:h-[85%] py-[4rem] max-[900px]:py-0 max-[700px]:py-[4rem]">
        {children}
      </div>
      <MainNavBar />
    </div>
  );
}
