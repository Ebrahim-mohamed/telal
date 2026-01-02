"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

export function BankRow({
  bankName,
  bankRate,
  image,
}: {
  bankName: string;
  bankRate: number;
  image: string;
}) {
  const params = useParams();
  const logoUrl = `data:image/png;base64,${image}`;
  return (
    <tr>
      <td className="text-start flex gap-3 items-center mb-[2rem]">
        <div className="rounded-full w-[3rem] h-[3rem]">
          <Image
            src={logoUrl}
            alt="bank logo"
            width={20}
            height={20}
            className="w-full h-full rounded-full"
          ></Image>
        </div>
        <p className={`${params.locale === "ar" ? " AlmaraiFont " : ""}`}>
          {bankName}
        </p>
      </td>
      <td className="GothamFont">{bankRate} %</td>
    </tr>
  );
}
