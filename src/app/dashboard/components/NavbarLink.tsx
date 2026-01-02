"use client";
import { usePathname, useRouter } from "next/navigation";

export function NavbarLink({ name, link }: { name: string; link: string }) {
  const navigate = useRouter();
  const pathName = usePathname();
  return (
    <div
      className={`px-[2rem] py-[1.5rem] text-[1rem] font-normal cursor-pointer rounded-[0.5rem] ${
        pathName.includes(link)
          ? " text-[#353535] bg-[#EEEBE8]"
          : " text-[#353535] bg-white "
      }`}
      onClick={() => navigate.push(`/dashboard/${link}`)}
    >
      {name}
    </div>
  );
}
