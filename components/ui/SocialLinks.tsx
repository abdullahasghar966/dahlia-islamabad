import { Instagram } from "lucide-react";
import { siteSettings } from "@/lib/content/site";
import { cn } from "@/lib/utils";

export function SocialLinks({ className }: { className?: string }) {
  const { socials } = siteSettings;

  const links = [
    { href: socials.instagram, label: "Instagram", icon: Instagram },
    socials.threads ? { href: socials.threads, label: "Threads", icon: Instagram } : null,
    socials.facebook ? { href: socials.facebook, label: "Facebook", icon: Instagram } : null,
  ].filter(Boolean) as { href: string; label: string; icon: typeof Instagram }[];

  return (
    <ul className={cn("flex flex-wrap items-center gap-3", className)}>
      {links.map(({ href, label, icon: Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            data-cursor="hover"
            className="inline-flex h-11 w-11 items-center justify-center rounded-pill border border-current/25 transition-colors hover:bg-current/10"
          >
            <Icon size={18} aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}
