import CaseStudyPage, { getCaseStudyMetadata } from "@/components/CaseStudyPage";

export const metadata = getCaseStudyMetadata("afroszn");

export default function Page() {
  return <CaseStudyPage slug="afroszn" />;
}
