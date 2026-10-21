import CaseStudyPage, { getCaseStudyMetadata } from "@/components/CaseStudyPage";

export const metadata = getCaseStudyMetadata("spacebook");

export default function Page() {
  return <CaseStudyPage slug="spacebook" />;
}
