"use client";
import { useTranslations } from "next-intl";
import { useParams, usePathname, useRouter } from "next/navigation";
import InquiryFormDialog from "./InquiryFormDialog";
import ShareDialog from "./ShareDialog";
import { useState } from "react";

export function MainNavBarTab({
  newRoute,
  isType = false,
  isSec = false,
  name,
  setSelected,
}: {
  newRoute: string;
  isType?: boolean;
  isSec?: boolean;
  name?: string;
  setSelected?: (name: string) => void;
}) {
  const [hover, setHover] = useState<string>("");
  const t = useTranslations("NavBars");
  const tt = useTranslations("floor");
  const router = useRouter();
  const pathName = usePathname();
  const params = useParams();
  if (newRoute === "inquiry-form") {
    return <InquiryFormDialog content="inquiry-form" />;
  }
  if (newRoute === "share") {
    return <ShareDialog content="share" />;
  }
  return (
    <button
      onMouseEnter={() => setHover(newRoute)}
      onMouseLeave={() => setHover("")}
      className={`  max-[1100px]:min-w-[75rem] max-[900px]:text-[4.6rem] max-[400px]:text-[4rem] max-[900px]:min-w-[45rem] max-[1100px]:text-[8rem] max-[700px]:min-w-[43rem] max-[400px]:min-w-[35rem] max-[700px]:text-[5rem] flex items-center justify-center gap-8 text-[4.5rem] w-full font-semibold ${
        isSec ? " py-[5rem] " : " py-[6rem] "
      }  :rounded-[1rem] rounded-[2.5rem]  :border-2 border-[0.8rem]  dark:border-white border-[#1F1F1F] border-solid flex-1 dark:hover:bg-white hover:bg-[#1F1F1F] dark:hover:text-black hover:text-white hover:cursor-pointer ${
        pathName.includes(newRoute) || newRoute === name
          ? "dark:bg-white dark:text-black bg-[#1F1F1F] text-white"
          : "dark:text-white text-[#1F1F1F]"
      }`}
      onClick={() => {
        if (!isSec)
          router.push(
            `/${params.locale}/${
              isType ? "specific-type" : "details"
            }/${newRoute}`
          );
        else {
          if (name !== newRoute && setSelected) {
            setSelected(newRoute);
            return;
          }
          if (setSelected) setSelected("");
        }
      }}
    >
      {!isSec && (
        <div>
          <img
            src={
              pathName.includes(newRoute) || hover === newRoute
                ? `/assets/navBar-icons/${newRoute}-black.svg`
                : `/assets/navBar-icons/${newRoute}.svg`
            }
            className="w-[6rem] h-[6rem] hidden dark:block"
          />
          <img
            src={
              pathName.includes(newRoute) || hover === newRoute
                ? `/assets/navBar-icons/${newRoute}.svg`
                : `/assets/navBar-icons/${newRoute}-black.svg`
            }
            className="w-[6rem] h-[6rem] dark:hidden block"
          />
        </div>
      )}
      {newRoute === "floor-plans" && isType
        ? tt(`${newRoute}`)
        : t(`${newRoute}`)}
    </button>
  );
}
