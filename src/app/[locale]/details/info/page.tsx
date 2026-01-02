"use client";
import InfoComponent from "@/app/components/InfoComponent";
import VideoSlider from "./VideoSlider";
import { useEffect, useRef, useState } from "react";

export default function Info() {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [videoHeight, setVideoHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Get video height and handle responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (videoContainerRef.current) {
        setVideoHeight(videoContainerRef.current.clientHeight);
      }
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex max-[1100px]:flex-col max-[1100px]:gap-[10rem] max-[1100px]:my-[10rem] w-full py-16 gap-12  md:items-start max-[1100px]:h-full">
      {/* Video Section - reference for height */}
      <div
        ref={videoContainerRef}
        className="  max-[1100px]:w-full w-[62%] relative"
        style={{ aspectRatio: "16/9" }}
      >
        <VideoSlider />
      </div>

      {/* Info Cards Section - matches video height on desktop */}
      <div
        className="flex flex-col gap-12 w-full md:flex-1 h-[80%] max-[1100px]:gap-[8rem] max-[900px]:gap-[2rem] max-[700px]:gap-[8rem]"
        style={!isMobile ? { height: `${videoHeight}px` } : {}}
      >
        {/* First Row */}
        <div className="flex  gap-8 h-1/2 max-[900px]:gap-2 max-[700px]:gap-8 max-[1100px]:gap-[8rem]">
          <div className="hidden dark:block flex-1 h-full">
            <InfoComponent
              src="/assets/spacific_location_dark.png"
              phrase="parks"
            />
          </div>
          <div className="dark:hidden flex-1 h-full">
            <InfoComponent src="/assets/spacific_location.png" phrase="parks" />
          </div>

          <div className="hidden dark:block flex-1 h-full">
            <InfoComponent src="/assets/Units_dark.png" phrase="buildings" />
          </div>
          <div className="dark:hidden flex-1 h-full">
            <InfoComponent src="/assets/Units.png" phrase="buildings" />
          </div>
        </div>

        {/* Second Row */}
        <div className="flex  gap-8 h-1/2 max-[1100px]:gap-[8rem] max-[900px]:gap-2 max-[700px]:gap-8">
          <div className="hidden dark:block flex-1 h-full">
            <InfoComponent src="/assets/Location_dark.png" phrase="location" />
          </div>
          <div className="dark:hidden flex-1 h-full">
            <InfoComponent src="/assets/Location.png" phrase="location" />
          </div>

          <div className="hidden dark:block flex-1 h-full">
            <InfoComponent
              src="/assets/Facilities_dark.png"
              phrase="accessibility"
            />
          </div>
          <div className="dark:hidden flex-1 h-full">
            <InfoComponent
              src="/assets/Facilities.png"
              phrase="accessibility"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
