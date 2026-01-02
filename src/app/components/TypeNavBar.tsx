import { MainNavBarTab } from "./MainNavBarTab";

export function TypeNavBar() {
  return (
    <div className="flex items-center flex-wrap  gap-[2rem] w-full mt-[3rem] max-[700px]:mt-0 ">
      <MainNavBarTab newRoute="gallery" isType={true} />
      <MainNavBarTab newRoute="floor-plans" isType={true} />
      <MainNavBarTab newRoute="payment" isType={true} />
      <MainNavBarTab newRoute="inquiry-form" isType={true} />
      <MainNavBarTab newRoute="share" isType={true} />
    </div>
  );
}
