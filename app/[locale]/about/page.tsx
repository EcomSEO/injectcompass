import type { Metadata } from "next";
import Link from "next/link";
import { TrustPageTemplate } from "@/components/templates/TrustPageTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About InjectCompass",
  description: "Who we are, what we do, and why we built this.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <TrustPageTemplate title="About InjectCompass">
      <p>InjectCompass is the friend who already went through it.</p>
      <p>
        We answer the questions that the prescribing doctor didn&apos;t have time to
        answer, the questions that feel too embarrassing to ask, and the
        questions that don&apos;t have great answers anywhere else on the internet
        right now.
      </p>
      <p>
        We are not selling a drug. We are not affiliated with any clinic. We
        are not trying to scare people away from GLP-1s and we are not trying
        to sell them as a miracle. We&apos;re trying to help the millions of people
        who are <em>already on these medications</em> navigate a year of their
        life that nobody prepared them for.
      </p>
      <p>
        The information is fragmented, often wrong, and split between scary
        medical journals and Reddit threads. InjectCompass is the third option: warm,
        accurate, calm, cited.
      </p>

      <h2>What we do</h2>
      <ul>
        <li><strong>We cite.</strong> Every claim on this site links to the FDA prescribing information, a peer-reviewed trial, or a manufacturer document you can check yourself.</li>
        <li><strong>We translate.</strong> Trial data and adverse event tables get rewritten into plain English without losing the numbers.</li>
        <li><strong>We update.</strong> GLP-1 research is moving fast. We revise posts as new trials publish, and we timestamp every revision.</li>
        <li><strong>We&apos;re specific.</strong> &quot;0.25mg in week 1, escalating to 0.5mg in week 5&quot;, not &quot;your doctor will gradually increase your dose.&quot;</li>
      </ul>

      <h2>What we don&apos;t do</h2>
      <ul>
        <li>We don&apos;t provide medical advice. We are not a clinic.</li>
        <li>We don&apos;t recommend specific telehealth providers.</li>
        <li>We don&apos;t accept payment from drug manufacturers.</li>
        <li>We don&apos;t accept payment from telehealth clinics for editorial coverage.</li>
        <li>We don&apos;t publish before/afters or weight-loss numbers.</li>
        <li>We don&apos;t use the word &quot;miracle.&quot;</li>
      </ul>

      <h2>How to get in touch</h2>
      <p>
        Found a mistake? We want to know. Have a question we haven&apos;t answered?
        Tell us. Write to us at <Link href="/contact">hello@injectcompass.com</Link>.
      </p>

      <p>The InjectCompass Editorial Team</p>
    </TrustPageTemplate>
  );
}
