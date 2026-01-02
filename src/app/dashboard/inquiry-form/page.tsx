export const dynamic = "force-dynamic";

import { getInquiries } from "@/lib/actions/inquiryForms";
import { SectionHeader } from "../components/SectionHeader";
import IquiryFormTable from "./IquiryFormTable";

export default async function InquiryForm() {
  const inquiries = await getInquiries();
  console.log(inquiries);
  return (
    <>
      <div className="mb-10">
        <SectionHeader headerName="Inquiry Form" />
      </div>
      <IquiryFormTable data={inquiries} />
    </>
  );
}
