import { NavbarLink } from "./NavbarLink";

export function DashboardNavbar() {
  return (
    <div className="flex flex-col w-[20%] px-10">
      <NavbarLink name="Unit Allocation" link="unit-allocation" />
      <NavbarLink name="Create Phase" link="create-phase" />
      <NavbarLink name="Gallery" link="gallery" />
      <NavbarLink name="Payment" link="payment" />
      <NavbarLink name="Inquiry Form" link="inquiry-form" />
      <NavbarLink name="Share Module" link="share-module" />
    </div>
  );
}
