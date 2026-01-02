import { useParams } from "next/navigation";

export function InfoSakani({ info, desc }: { info: string; desc: string }) {
  const params = useParams();
  return (
    <div className="flex flex-col text-black dark:text-white font-semibold">
      <p
        className={`  text-[4.5rem] font-normal max-[1100px]:text-[8rem] max-[600px]:text-[7rem] ${
          params.locale === "ar" ? " AlmaraiFont " : ""
        }`}
      >
        {info}
      </p>
      <div className="flex items-center gap-2">
        <img
          src="/assets/Saudi_Riyal_Symbol.png"
          alt="riyal"
          className="h-[5rem] hidden dark:block max-[1100px]:h-[8rem]"
        />
        <img
          src="/assets/Saudi_Riyal_Symbol_light.png"
          alt="riyal"
          className="h-[5rem] dark:hidden block max-[1100px]:h-[8rem]"
        />
        <p className="text-[6.5rem] max-[1100px]:text-[8rem] font-bold max-[600px]:font-medium GothamFont ">
          {desc}
        </p>
      </div>
    </div>
  );
}
