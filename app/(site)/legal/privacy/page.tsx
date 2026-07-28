import { PageHero } from "@/components/ui/PageHero";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { siteSettings } from "@/lib/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy",
  description: "How Dahlia Islamabad handles reservation, contact and newsletter data.",
  path: "/legal/privacy",
});

/**
 * TODO: legal review. This describes what the site as built actually does, but
 * it has not been checked by a lawyer and does not yet reference Pakistan's data
 * protection regime. The owner should have it reviewed before launch.
 */
export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" theme="bone" title="Privacy." />

      <Section theme="bone" className="pt-0">
        <Prose>
          <p>
            Short version: we collect the least we can, we do not sell anything to anyone, and
            nothing that tracks you loads until you say yes.
          </p>

          <h2>What we collect</h2>
          <p>
            <strong>Reservations.</strong> Your name, phone number, date, time, party size and any
            note you add. We use it to hold your table and to call you if something changes.
          </p>
          <p>
            <strong>Newsletter.</strong> Your email address, and only if you type it in. Every email
            has an unsubscribe link.
          </p>
          <p>
            <strong>Messages.</strong> Whatever you send us, so we can reply.
          </p>

          <h2>Analytics and cookies</h2>
          <p>
            The banner on your first visit defaults to declining anything non-essential. If you
            decline, no analytics or advertising scripts load at all. If you accept, we use
            aggregate analytics to see which pages people read. Your choice is stored in your own
            browser and you can clear it at any time.
          </p>

          <h2>Who sees it</h2>
          <p>
            Our staff, and the services that deliver the email. We do not sell or rent your details,
            and we do not share them for advertising.
          </p>

          <h2>How long we keep it</h2>
          <p>
            Reservation details are kept only as long as we need them to run the service.
            Newsletter subscriptions last until you unsubscribe.
          </p>

          <h2>Your choices</h2>
          <p>
            Ask us to show you what we hold, correct it, or delete it — call{" "}
            <a href={siteSettings.phoneHref}>{siteSettings.phone}</a> or message us on WhatsApp and
            we will sort it out.
          </p>

          <h2>Changes</h2>
          <p>
            If this page changes materially, we will say so here rather than quietly editing it.
          </p>
        </Prose>
      </Section>
    </>
  );
}
