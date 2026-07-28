import { PageHero } from "@/components/ui/PageHero";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { siteSettings } from "@/lib/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Café policy",
  description: "House rules at Dahlia Islamabad — reservations, seating, and the plants.",
  path: "/legal/cafe-policy",
});

/**
 * The five numbered guidelines below are the owner's own published policy,
 * transcribed in `Dahlia-Website-Spec/02b §1` from the "Cafe Policy" Instagram
 * highlight (dated 1 Sep 2023). Wording is kept faithful to the original —
 * these are house rules, not marketing copy, so they should not be rewritten
 * for tone. The same numbers drive the reserve form's logic.
 */
export default function CafePolicyPage() {
  const { policy } = siteSettings;

  return (
    <>
      <PageHero
        eyebrow="House rules"
        theme="clay"
        title="Please be informed of the following guidelines."
        lead="The short list that keeps a busy room pleasant for everybody in it."
      />

      <Section theme="clay" className="pt-0">
        <Prose>
          <h2>Seating &amp; reservations</h2>
          <ul>
            <li>
              We operate on a <strong>walk-in policy</strong>. Some space is kept for reservations
              across the week for tables of <strong>{policy.reservableFromPartySize} or more</strong>.
            </li>
            <li>Any seating requests are duly noted and entertained on a first-serve basis.</li>
            <li>
              The maximum holding period is <strong>{policy.holdMinutes} minutes</strong>. Arrive
              later than the designated time and the reservation guarantee no longer applies.
            </li>
          </ul>

          <h2>Dining time</h2>
          <ul>
            <li>
              Tables of 2–6 guests: <strong>1 hour 45 minutes</strong>.
            </li>
            <li>
              Tables of {policy.reservableFromPartySize}+:{" "}
              <strong>{Math.round(policy.diningMinutes.large / 60)} hours</strong>.
            </li>
          </ul>

          <h2>Service charge</h2>
          <p>
            A discretionary <strong>{policy.serviceChargePercent}% service charge</strong> is added
            to all tables of {policy.serviceChargeFromPartySize} or more. Menu prices are exclusive
            of GST.
          </p>

          <h2>Anything else</h2>
          <p>
            Ask a member of staff, or call <a href={siteSettings.phoneHref}>{siteSettings.phone}</a>.
          </p>
        </Prose>
      </Section>
    </>
  );
}
