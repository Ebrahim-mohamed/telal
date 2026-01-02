"use client";
import { usePathname, useRouter } from "next/navigation";

export function GalleryHeaderButton({
  name,
  curr,
}: {
  name: string;
  curr: string;
}) {
  const router = useRouter();
  const path = usePathname();
  return (
    <button
      className={`!text-[1.5rem]  cursor-pointer ${
        name === curr
          ? " text-black underline underline-offset-4 "
          : " text-[#00000080] "
      }`}
      onClick={() => router.push(`${path}?image-type=${name}`)}
    >
      {name}
    </button>
  );
}
