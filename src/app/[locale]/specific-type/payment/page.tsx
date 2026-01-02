"use client";
import { useState, useEffect } from "react";
import { InfoPaymentDetail } from "@/app/components/InfoPaymentDetail";
import { InfoSakani } from "@/app/components/infoSakani";
import { StatInfo } from "@/app/components/StatInfo";
import { useTranslations } from "next-intl";
import { BankTable } from "./BankTable";
import { getUnitByUnitNumber } from "./getUnitByUnitNumber";
import { unitTypeAllData } from "@/schema/unitAllocation.schema";
import { getInstallmentFromDataBase } from "./getInstallment";
import { useParams } from "next/navigation";

export default function SpecificTypePayment() {
  const params = useParams();
  const t = useTranslations("payment");
  const [unitInfo, setUnitInfo] = useState<unitTypeAllData | null>(null);
  const [installmentYears, setInstallmentYears] = useState<number | null>(null);
  const [unitNumber, setUnitNumber] = useState<number | null>(null);

  function setUnitInformation(unit: unitTypeAllData | null) {
    setUnitInfo(unit);
  }

  function setInstallment(installment: number | null) {
    setInstallmentYears(installment);
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUnitNumber = localStorage.getItem("unit-number");
      if (storedUnitNumber) {
        setUnitNumber(JSON.parse(storedUnitNumber));
      }
    }
  }, []);

  useEffect(() => {
    if (unitNumber !== null) {
      getUnitByUnitNumber({
        unitNumber: unitNumber,
        setUnit: setUnitInformation,
      });
    }
  }, [unitNumber]);

  useEffect(() => {
    getInstallmentFromDataBase(setInstallment);
  }, [installmentYears]);

  return (
    <div className="h-[80%] max-[700px]:h-[78%]  flex items-center">
      <div className="  flex gap-[20rem] max-[1100px]:gap-[10rem] w-full h-[90%] max-[1100px]:flex-col">
        <img
          src="/assets/payment-image.png"
          className="max-[850px]:hidden w-1/3 h-full rounded-[1.5rem] max-[1100px]:w-full max-[700px]:h-[50rem] max-[1100px]:h-[50%] max-[1100px]:object-center max-[1100px]:object-cover"
        />
        <div className="w-full flex gap-[4rem] flex-col">
          <div className="w-full flex justify-start gap-[35rem] max-[850px]:gap-[2.1rem] max-[850px]:justify-between ">
            <div>
              <h1 className="dark:text-[#F9C28C] text-black text-[6.25rem] max-[1100px]:text-[9rem]  mb-[4rem]">
                {t("tilal")}
              </h1>
              <div id="information" className="flex flex-col gap-[1rem]">
                <InfoPaymentDetail
                  info={t("unit-number")}
                  desc={`${unitInfo?.unitNumber}`}
                />
                <InfoPaymentDetail
                  info={t("block-number")}
                  desc={`${unitInfo?.unitBlock}`}
                />
                <InfoPaymentDetail
                  info={t("property-type")}
                  desc={`${unitInfo?.unitType}`}
                />
                <InfoPaymentDetail
                  info={t("net-sellable-area")}
                  desc={unitInfo?.unitArea || 0}
                  unit={t("meter")}
                />
                <InfoPaymentDetail
                  info={t("finishing")}
                  desc={t("fully-furnished")}
                />
                <StatInfo bath={8} gust={4} type={t("villa")} />
              </div>
            </div>
            <div>
              <div className="flex  gap-5  items-center ">
                <a
                  target="_blank"
                  href="https://sakani.sa/app/offplan-projects/1491"
                  className="cursor-pointer w-[22rem] max-[1100px]:w-[30rem]"
                >
                  <img
                    src="/assets/Sakani.png"
                    className="mb-[4rem] hidden dark:block w-full"
                  />
                  <img
                    src="/assets/Sakani_light.png"
                    className="mb-[4rem] dark:hidden block w-full"
                  />
                </a>
                <p className="dark:text-white text-black font-medium text-[3rem]">
                  {t("to-buy")}
                </p>
              </div>
              <div className="flex flex-col gap-[2rem] ">
                <InfoSakani
                  info={t("market-price")}
                  desc={unitInfo?.marketPrice.toLocaleString() || ""}
                />
                <InfoSakani
                  info={t("moh-price")}
                  desc={unitInfo?.MOHPrice.toLocaleString() || ""}
                />
              </div>
            </div>
          </div>
          <div
            id="banks-information"
            className="h-fit w-full border-[0.8rem] border-[#A4A4A4] rounded-[1.25rem] overflow-hidden  text-white px-[4rem] py-[2rem]"
          >
            <div
              className={`flex w-full  items-center justify-between mb-[3rem] text-black dark:text-white ${
                params.locale === "ar" ? " AlmaraiFont " : ""
              }`}
            >
              <p className="text-[4rem] max-[1100px]:text-[5rem] font-semibold">
                {t("bank-partners")}
              </p>
              <p
                className={`text-[3rem] max-[1100px]:text-[5rem] font-semibold `}
              >
                {t("years")} {t("of-installment")} :{" "}
                <span className="GothamFont">{installmentYears}</span>
              </p>
            </div>
            <BankTable />
          </div>
        </div>
      </div>
    </div>
  );
}
