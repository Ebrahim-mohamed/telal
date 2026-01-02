import { LocationPageGoogleMapComponent } from "@/app/components/LocationPageMap";

export default function Location() {
  return (
    <div className="grow w-full flex items-center justify-center max-[700px]:items-start max-[700px]:my-[20rem]">
      <LocationPageGoogleMapComponent />
    </div>
  );
}
