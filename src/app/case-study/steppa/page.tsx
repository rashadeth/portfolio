import CaseStudyPage, { getCaseStudyMetadata } from "@/components/CaseStudyPage";

export const metadata = getCaseStudyMetadata("steppa");

export default function Page() {
  return <CaseStudyPage slug="steppa" />;
}
