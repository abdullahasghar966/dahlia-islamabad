import { LenisProvider } from "@/components/motion/LenisProvider";
import { PageTransition } from "@/components/motion/PageTransition";
import { ThemeController } from "@/components/motion/ThemeController";
import { Cursor } from "@/components/layout/Cursor";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ReserveProvider } from "@/components/layout/ReserveProvider";
import { ReserveDrawer } from "@/components/layout/ReserveDrawer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { SkipLink } from "@/components/ui/SkipLink";

/** The frame (10-PROJECT-STRUCTURE.md · key files). Order matters. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReserveProvider>
      <LenisProvider>
        <ThemeController />
        <Cursor />
        <SkipLink />
        <Header />
        <main id="content">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <ReserveDrawer />
        <CookieBanner />
      </LenisProvider>
    </ReserveProvider>
  );
}
