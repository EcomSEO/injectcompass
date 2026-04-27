import type { Metadata } from "next";
import { TrustPageTemplate } from "@/components/templates/TrustPageTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Medical Disclaimer",
  description:
    "InjectCompass publishes educational content about GLP-1 medications. This page explains what that does and doesn't mean.",
  path: "/medical-disclaimer",
});

export default function MedicalDisclaimerPage() {
  return (
    <TrustPageTemplate title="Medical Disclaimer">
      <p>
        Information on InjectCompass is for <strong>educational purposes only</strong>.
        It is not medical advice, diagnosis, or treatment. InjectCompass is not a
        clinic and does not have a doctor-patient relationship with any reader.
      </p>

      <h2>What we do</h2>
      <p>
        We publish educational content that describes what FDA-approved drug
        labels, published trials, and manufacturer documents say about GLP-1
        medications. We cite every claim so you can verify it yourself.
      </p>

      <h2>What we don&apos;t do</h2>
      <ul>
        <li>We do not diagnose any condition</li>
        <li>We do not prescribe medications</li>
        <li>We do not tell you to start, stop, or change any medication</li>
        <li>We do not recommend specific telehealth providers or clinics</li>
        <li>We do not accept payment from drug manufacturers</li>
      </ul>

      <h2>Always talk to your healthcare provider</h2>
      <p>
        Before starting, stopping, or changing any medication, including a
        GLP-1, consult your physician, endocrinologist, or prescribing nurse
        practitioner. They have your medical history, your lab results, and
        the clinical context we don&apos;t have.
      </p>
      <p>
        If you are experiencing a serious side effect, contact your provider
        or emergency services immediately. Do not rely on information from
        this website (or any website) to make acute medical decisions.
      </p>

      <h2>Red flags, call your doctor</h2>
      <p>Reach out to your healthcare provider right away if you experience:</p>
      <ul>
        <li>Severe or persistent abdominal pain</li>
        <li>Yellowing of the skin or eyes</li>
        <li>Vision changes</li>
        <li>A rapid heartbeat that doesn&apos;t subside</li>
        <li>Signs of an allergic reaction, swelling of the face, lips, or throat; trouble breathing</li>
        <li>Persistent vomiting or severe dehydration</li>
        <li>Symptoms suggesting pancreatitis, gallbladder problems, or thyroid issues</li>
      </ul>
      <p>
        This is not an exhaustive list. When in doubt, call your provider or
        the poison control line at 1-800-222-1222 (US).
      </p>

      <h2>Content accuracy</h2>
      <p>
        GLP-1 research is moving quickly. InjectCompass updates posts as new trials
        publish and new regulatory guidance emerges. We timestamp every
        revision. However, we cannot guarantee that any post reflects the
        latest state of science at the moment you read it.
      </p>

      <h2>Your responsibility</h2>
      <p>
        By using InjectCompass, you acknowledge that you will not use content on this
        site as a substitute for professional medical care, and that any health
        decisions you make are your own.
      </p>

      <p className="text-sm text-charcoal/60">Last updated: April 21, 2026.</p>
    </TrustPageTemplate>
  );
}
