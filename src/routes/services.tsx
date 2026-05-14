import { createFileRoute, Link } from "@tanstack/react-router";
import { Hammer, Droplets, Zap, Wrench, Flame, Grid3x3, Package, CheckCircle2, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | Construction, Boreholes, Plumbing, Electrical — Nyeneng" },
      { name: "description", content: "Residential construction, borehole drilling, JoJo tanks, plumbing, electrical, welding, tiling & material supply across Rustenburg & North West." },
      { property: "og:title", content: "Our Services — Nyeneng Trading & Projects" },
      { property: "og:description", content: "Seven core trades, one reliable partner. Rustenburg, North West." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const SERVICES = [
  {
    icon: Hammer, slug: "construction", title: "Residential Construction",
    desc: "Turnkey home building from foundation to finishes.",
    items: ["New house builds", "Extensions", "Renovations", "Roofing", "Brickwork", "Plastering", "Full project management"],
  },
  {
    icon: Droplets, slug: "water", title: "Water Security Solutions",
    desc: "Total water independence for homes and businesses.",
    items: ["Borehole drilling", "JoJo tank installations", "Rainwater harvesting", "Water reticulation", "Pump systems"],
  },
  {
    icon: Zap, slug: "electrical", title: "Electrical Services",
    desc: "Safe, compliant residential electrical work.",
    items: ["Residential wiring", "DB board installations", "Solar backup systems", "Outdoor lighting", "Certificates of Compliance"],
  },
  {
    icon: Wrench, slug: "plumbing", title: "Plumbing",
    desc: "From leak detection to full sewer connections.",
    items: ["Geysers", "Drain laying", "Leak detection", "Sewer connections", "Water reticulation"],
  },
  {
    icon: Flame, slug: "welding", title: "Welding & Fabrication",
    desc: "Custom steelwork built to last.",
    items: ["Gates", "Burglar bars", "Carports", "Steel repairs", "Staircases"],
  },
  {
    icon: Grid3x3, slug: "tiling", title: "Tiling & Finishing",
    desc: "Precision finishes that lift any space.",
    items: ["Floor tiling", "Wall tiling", "Waterproofing", "Paving", "Surface preparation"],
  },
  {
    icon: Package, slug: "materials", title: "Materials Supply",
    desc: "Genuine products, fair pricing, quick delivery.",
    items: ["Building materials", "Plumbing materials", "Electrical products", "Steel products", "Genuine JoJo tanks"],
  },
];

function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Services"
        title="Seven core trades. One accountable team."
        subtitle="Whether you're building a new home, securing your water supply, or upgrading a single room — Nyeneng covers it end-to-end."
      />

      <section className="container-x py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((s) => (
            <article id={s.slug} key={s.slug} className="rounded-3xl border bg-card p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-soft">
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
                <a href={whatsappLink(`Hi Nyeneng, I'd like a quote for ${s.title}.`)} target="_blank" rel="noopener"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                  Quote on WhatsApp <ArrowRight className="h-4 w-4" />
                </a>
                <Link to="/contact" className="inline-flex items-center rounded-full border border-border px-4 py-2 text-sm font-semibold text-accent hover:bg-secondary">
                  Send enquiry
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
