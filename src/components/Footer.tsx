import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

const Facebook = (props: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={props.className}>
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
  </svg>
);
const Instagram = (props: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={props.className}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
import { NAV, SITE, whatsappLink } from "@/lib/site";
import logoIcon from "@/assets/logo-icon.png";

const SERVICES = [
  "Residential Construction",
  "Water Security Solutions",
  "Electrical Services",
  "Plumbing",
  "Welding & Fabrication",
  "Tiling & Finishing",
  "Materials Supply",
];

export function Footer() {
  return (
    <footer className="mt-24 bg-[var(--brand-dark)] text-[var(--brand-cream)]">
      <div className="h-1.5 bg-gradient-bar" />
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img src={logoIcon} alt="" width={48} height={48} className="h-12 w-12 rounded-full bg-[var(--brand-cream)]" />
            <div>
              <div className="font-display text-lg font-extrabold tracking-wide">NYENENG</div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[var(--brand-copper)]">Trading & Projects</div>
            </div>
          </div>
          <p className="mt-4 text-sm italic text-[var(--brand-cream)]/70">"{SITE.tagline}"</p>
          <p className="mt-2 text-sm text-[var(--brand-cream)]/70">
            Multi-trade construction & infrastructure since {SITE.established}.
          </p>
          <div className="mt-4 flex gap-3">
            <a aria-label="Facebook" href="#" className="rounded-full bg-white/10 p-2 hover:bg-white/20">
              <Facebook className="h-4 w-4" />
            </a>
            <a aria-label="Instagram" href="#" className="rounded-full bg-white/10 p-2 hover:bg-white/20">
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-accent-foreground/60">
            Quick Links
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-primary-foreground hover:underline">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-accent-foreground/60">
            Services
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {SERVICES.map((s) => (
              <li key={s} className="text-accent-foreground/80">{s}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-accent-foreground/60">
            Contact
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0" /><a href={`tel:${SITE.phone}`}>{SITE.phone}</a></li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 shrink-0" /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" /><span>{SITE.address}</span></li>
          </ul>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener"
            className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[oklch(0.66_0.18_145)] px-4 py-2 text-sm font-semibold text-white"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-accent-foreground/60">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </div>
    </footer>
  );
}
