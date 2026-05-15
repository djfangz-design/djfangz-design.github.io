import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import {
  Hammer, Droplets, Zap, Wrench, Flame, Grid3x3, Package,
  CheckCircle2, ArrowRight, Send,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SITE, whatsappLink } from "@/lib/site";

const SITE_URL = "https://nyeneng-builds-futures.lovable.app";
const SERVICES_URL = `${SITE_URL}/services`;
const SERVICES_TITLE = "Construction, Boreholes, Plumbing & Electrical Services in Rustenburg | Nyeneng";
const SERVICES_DESC = "Trusted Rustenburg builders for new homes, borehole drilling, JoJo tanks, plumbing, electrical (COC), welding, tiling & materials supply across the North West. Get a free WhatsApp quote.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: SERVICES_TITLE },
      { name: "description", content: SERVICES_DESC },
      { name: "keywords", content: "construction Rustenburg, borehole drilling North West, JoJo tank installation, plumber Rustenburg, electrician COC, welding fabrication, tiling, building materials" },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Nyeneng Trading & Projects" },
      { property: "og:title", content: SERVICES_TITLE },
      { property: "og:description", content: SERVICES_DESC },
      { property: "og:url", content: SERVICES_URL },
      { property: "og:locale", content: "en_ZA" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SERVICES_TITLE },
      { name: "twitter:description", content: SERVICES_DESC },
    ],
    links: [{ rel: "canonical", href: SERVICES_URL }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Nyeneng Services",
        itemListElement: [
          "Residential Construction", "Water Security Solutions", "Electrical Services",
          "Plumbing", "Welding & Fabrication", "Tiling & Finishing", "Materials Supply",
        ].map((name, i) => ({
          "@type": "ListItem", position: i + 1,
          item: { "@type": "Service", name, areaServed: "Rustenburg, North West, South Africa", provider: { "@type": "LocalBusiness", name: "Nyeneng Trading & Projects" } },
        })),
      }),
    }],
  }),
  component: ServicesPage,
});

const SERVICES = [
  {
    icon: Hammer, slug: "construction", title: "Residential Construction",
    desc: "Turnkey home building from foundation to finishes — managed end-to-end by our site team.",
    items: ["New house builds", "Extensions & additions", "Renovations & remodels", "Roofing", "Brickwork & plastering", "Full project management"],
  },
  {
    icon: Droplets, slug: "water", title: "Water Security Solutions",
    desc: "Total water independence for homes, farms and businesses across the North West.",
    items: ["Borehole drilling & equipping", "JoJo tank supply & installation", "Rainwater harvesting", "Water reticulation", "Pumps & pressure systems"],
  },
  {
    icon: Zap, slug: "electrical", title: "Electrical Services",
    desc: "Safe, compliant residential electrical work with COC certification.",
    items: ["Residential wiring", "DB board installations", "Solar backup systems", "Outdoor & security lighting", "Certificates of Compliance"],
  },
  {
    icon: Wrench, slug: "plumbing", title: "Plumbing",
    desc: "From a leaking tap to a full sewer connection — done right the first time.",
    items: ["Geyser supply & install", "Drain laying", "Leak detection & repair", "Sewer connections", "Water reticulation"],
  },
  {
    icon: Flame, slug: "welding", title: "Welding & Fabrication",
    desc: "Custom steelwork built to last in tough South African conditions.",
    items: ["Driveway & pedestrian gates", "Burglar bars & window guards", "Carports & shade structures", "Steel repairs", "Staircases & railings"],
  },
  {
    icon: Grid3x3, slug: "tiling", title: "Tiling & Finishing",
    desc: "Precision finishes that lift any room — neat lines, level surfaces, no shortcuts.",
    items: ["Floor & wall tiling", "Bathroom waterproofing", "Paving", "Surface preparation", "Grouting & sealing"],
  },
  {
    icon: Package, slug: "materials", title: "Materials Supply",
    desc: "Genuine products at fair prices, with quick delivery around Rustenburg.",
    items: ["Building materials", "Plumbing materials", "Electrical products", "Steel products", "Genuine JoJo tanks"],
  },
];

const SERVICE_TITLES = SERVICES.map((s) => s.title);

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  contact: z.string().trim().min(7, "Phone or email required").max(100),
  service: z.string().min(1, "Please choose a service"),
  location: z.string().trim().min(2, "Where is the project?").max(120),
  details: z.string().trim().max(600).optional().or(z.literal("")),
});

function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Services"
        title="Seven core trades. One accountable team."
        subtitle="Whether you're building a new home, securing your water supply, or upgrading a single room — Nyeneng covers it end-to-end."
      />

      <section className="container-x py-12 md:py-16">
        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {SERVICES.map((s) => (
            <article
              id={s.slug}
              key={s.slug}
              className="rounded-3xl border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-soft md:p-7"
            >
              <div className="flex items-start gap-4">
                <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                  <s.icon className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-accent">{s.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </div>
              <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {s.items.map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {i}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={whatsappLink(`Hi Nyeneng, I'd like a quote for ${s.title}.`)}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft hover:opacity-95"
                >
                  Request a quote <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#quote"
                  className="inline-flex items-center rounded-full border border-border px-4 py-2 text-sm font-semibold text-accent hover:bg-secondary"
                >
                  Use form
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <QuoteForm services={SERVICE_TITLES} />
    </>
  );
}

function QuoteForm({ services }: { services: string[] }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd) as Record<string, string>;
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    const msg =
      `Hi Nyeneng, I'd like a quote.\n\n` +
      `Name: ${r.data.name}\n` +
      `Contact: ${r.data.contact}\n` +
      `Service: ${r.data.service}\n` +
      `Location: ${r.data.location}` +
      (r.data.details ? `\n\nDetails: ${r.data.details}` : "");
    window.open(whatsappLink(msg), "_blank", "noopener");
    setSent(true);
  };

  return (
    <section id="quote" className="border-t bg-secondary/40">
      <div className="container-x py-14 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Free quote
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold text-accent md:text-4xl">
            Tell us about your project
          </h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            Submit the form and we'll continue the conversation on WhatsApp — usually within a few hours.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="mx-auto mt-8 grid max-w-2xl gap-4 rounded-3xl border bg-card p-5 shadow-card md:mt-10 md:grid-cols-2 md:p-8"
        >
          <FormField label="Full name" name="name" placeholder="Your name" error={errors.name} required />
          <FormField label="Phone or email" name="contact" placeholder="072 123 4567" error={errors.contact} required />
          <div className="flex flex-col gap-1.5 md:col-span-1">
            <label className="text-sm font-medium text-accent">
              Service <span className="text-destructive">*</span>
            </label>
            <select
              name="service"
              defaultValue=""
              className="h-11 rounded-xl border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="" disabled>Select a service…</option>
              {services.map((s) => <option key={s} value={s}>{s}</option>)}
              <option value="Other / Not sure">Other / Not sure</option>
            </select>
            {errors.service && <p className="text-xs text-destructive">{errors.service}</p>}
          </div>
          <FormField label="Project location" name="location" placeholder="e.g. Rustenburg, Tlhabane" error={errors.location} required />
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-medium text-accent">Project details (optional)</label>
            <textarea
              name="details"
              rows={4}
              maxLength={600}
              placeholder="Scope, size, timeline, anything else we should know…"
              className="rounded-xl border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              By submitting you agree to be contacted on WhatsApp at {SITE.phone}.
            </p>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:opacity-95"
            >
              <Send className="h-4 w-4" /> Send via WhatsApp
            </button>
          </div>
          {sent && (
            <div className="md:col-span-2 flex items-start gap-3 rounded-2xl bg-secondary p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
              <p className="text-sm text-accent">
                Thanks! Your enquiry is opening in WhatsApp. If nothing happened, call us on{" "}
                <a href={`tel:${SITE.phone}`} className="font-semibold underline">{SITE.phone}</a>.
              </p>
            </div>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Prefer the full contact page?{" "}
          <Link to="/contact" className="font-semibold text-primary hover:underline">
            Visit Contact →
          </Link>
        </p>
      </div>
    </section>
  );
}

function FormField({
  label, name, type = "text", placeholder, error, required,
}: {
  label: string; name: string; type?: string; placeholder?: string; error?: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-accent">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input
        name={name}
        type={type}
        maxLength={255}
        placeholder={placeholder}
        className="h-11 rounded-xl border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
