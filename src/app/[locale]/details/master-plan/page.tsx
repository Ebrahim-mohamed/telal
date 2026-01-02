"use client";
import { useEffect, useRef } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";

export default function MasterPlan() {
  const router = useRouter();
  const params = useParams();
  const path = usePathname();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("prePath", path);
  }, [path]);
  return (
    <div className="relative h-full overflow-y-auto rounded-[2.5rem] w-full flex items-end ">
      <div
        className="h-full overflow-y-auto w-full max-[1200px]:flex max-[1200px]:items-center"
        ref={scrollRef}
      >
        <div className="relative">
          <div className="flex-grow h-full overflow-y-auto rounded-[2.5rem]">
            <div className="flex flex-col gap-4">
              <img
                src="/assets/master_plan_2.avif"
                alt="Master Plan"
                className="w-full h-auto object-contain"
              />
              <img
                src="/assets/master_plan_1.avif"
                alt="Master Plan"
                className="w-full h-auto object-contain"
              />
              <img
                src="/assets/master_plan_3.avif"
                alt="Master Plan"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          <button
            className="absolute bottom-[10%] left-[26%] bg-white rounded-[1rem] py-[0.5rem] px-[4rem] shadow-2xl cursor-pointer"
            onClick={() =>
              router.push(`/${params.locale}/master-plans-catagory`)
            }
          >
            <img
              src="/assets/Tilal_Hwadi_gold.png"
              className="w-[15rem] h-[15rem]"
              alt="Tilal Hwadi"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
