"use client";

import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import Image from "next/image";

export default function TypeComponent({ content }: { content: string }) {
  const t = useTranslations("types");
  const url = `/assets/models/${content}.avif`;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="h-full grow flex items-center text-white justify-center w-full text-[6.25rem] bg-cover bg-bottom rounded-[2.5rem] shadow-[0px_4px_50px_0px_rgba(0,0,0,0.50)] font-black relative"
          style={{ backgroundImage: `url(${url})` }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[#00000050]"></div>
          <p className="z-10">{t(content)}</p>
        </button>
      </DialogTrigger>
      <DialogContent className=" !w-[90%] !h-[90%] rounded-[2.5rem] !max-w-none flex flex-col justify-center items-center bg-white   [button[data-slot='dialog-close']]:w-20 ">
        <DialogHeader>
          <DialogTitle className="text-8xl font-bold ">
            Floor Plan ({content})
          </DialogTitle>
        </DialogHeader>

        <div className="w-full h-full overflow-hidden flex items-center justify-center">
          <TransformWrapper
            initialScale={
              window.innerWidth >= 3000 ? 0.8 : screen.width >= 1000 ? 0.4 : 1
            }
            minScale={
              window.innerWidth >= 3000 ? 0.8 : screen.width >= 1000 ? 0.4 : 1
            }
            maxScale={6}
            wheel={{ step: 0.1 }}
            doubleClick={{ disabled: false }}
            pinch={{ step: 5 }}
          >
            <TransformComponent>
              <div
                className="relative"
                style={{ width: "100%", height: "100%" }}
              >
                <Image
                  src={`/assets/floor_plans/${content}-hoz.avif`}
                  width={900}
                  height={900}
                  alt="model floor plan image"
                  className="h-[95%]"
                />
              </div>
            </TransformComponent>
          </TransformWrapper>
        </div>
      </DialogContent>
    </Dialog>
  );
}
