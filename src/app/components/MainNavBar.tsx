import { MainNavBarTab } from "./MainNavBarTab";

export function MainNavBar() {
  return (
    <div>
      <div className="flex items-start flex-wrap  gap-[2rem] w-full mt-[2rem]">
        <MainNavBarTab newRoute="info" />
        <MainNavBarTab newRoute="location" />
        <MainNavBarTab newRoute="facilities" />
        <MainNavBarTab newRoute="gallery" />
        <MainNavBarTab newRoute="master-plan" />
        <MainNavBarTab newRoute="floor-plans" />
      </div>
    </div>
  );
}
