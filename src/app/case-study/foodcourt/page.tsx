import CaseStudyPage, { getCaseStudyMetadata } from "@/components/CaseStudyPage";

export const metadata = getCaseStudyMetadata("foodcourt");

export default function Page() {
  return <CaseStudyPage slug="foodcourt" />;
}
