import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects & Gallery | Nyeneng Construction Rustenburg" },
      { name: "description", content: "Explore Nyeneng's portfolio: residential construction, borehole installations, electrical, plumbing, tiling and welding projects across Rustenburg." },
      { property: "og:title", content: "Projects — Nyeneng Trading & Projects" },
      { property: "og:description", content: "Construction, water, electrical, plumbing, tiling and welding work delivered across the North West." },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

type Cat = "All" | "Construction" | "Water" | "Electrical" | "Plumbing" | "Tiling" | "Welding";
const CATS: Cat[] = ["All", "Construction", "Water", "Electrical", "Plumbing", "Tiling", "Welding"];

const u = (id: string, w = 1200, h = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=70`;

const PROJECTS: { id: number; cat: Exclude<Cat, "All">; title: string; img: string; tall?: boolean }[] = [
  { id: 1, cat: "Construction", title: "4-Bedroom Family Home, Tlhabane", img: u("photo-1503387762-592deb58ef4e"), tall: true },
  { id: 2, cat: "Water", title: "Borehole + 2× JoJo Tanks, Boitekong", img: u("photo-1581094271901-8022df4466f9") },
  { id: 3, cat: "Electrical", title: "DB Board Upgrade & CoC", img: u("photo-1565608438257-fac3c27beb36") },
  { id: 4, cat: "Plumbing", title: "Full Plumbing Reticulation", img: u("photo-1585704032915-c3400ca199e7") },
  { id: 5, cat: "Tiling", title: "Bathroom Renovation, Rustenburg", img: u("photo-1552321554-5fefe8c9ef14"), tall: true },
  { id: 6, cat: "Welding", title: "Custom Driveway Gate", img: u("photo-1558618666-fcd25c85cd64") },
  { id: 7, cat: "Construction", title: "Home Extension & Roofing", img: u("photo-1503594384566-461fe158e797") },
  { id: 8, cat: "Water", title: "Rainwater Harvesting System", img: u("photo-1589939705384-5185137a7f0f") },
  { id: 9, cat: "Tiling", title: "Living Area Floor Tiling", img: u("photo-1600585154340-be6161a56a0c") },
  { id: 10, cat: "Welding", title: "Steel Carport Installation", img: u("photo-1597047084897-51e81819a499") },
  { id: 11, cat: "Construction", title: "New Build — Slab to Roof", img: u("photo-1504307651254-35680f356dfd"), tall: true },
  { id: 12, cat: "Electrical", title: "Solar Backup Installation", img: u("photo-1509391366360-2e959784a276") },
];

function ProjectsPage() {
  const [cat, setCat] = useState<Cat>("All");
  const [open, setOpen] = useState<typeof PROJECTS[number] | null>(null);
  const list = cat === "All" ? PROJECTS : PROJECTS.filter((p) => p.cat === cat);

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Real work. Real homes. Real communities."
        subtitle="A snapshot of what we've delivered across Rustenburg and the wider North West."
      />

      <section className="container-x py-12">
        <div className="flex flex-wrap gap-2">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                cat === c ? "bg-primary text-primary-foreground" : "bg-secondary text-accent hover:bg-secondary/70"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {list.map((p) => (
            <button
              key={p.id}
              onClick={() => setOpen(p)}
              className={`group relative overflow-hidden rounded-2xl shadow-card ${p.tall ? "row-span-2 aspect-[3/4]" : "aspect-square"}`}
            >
              <img
                src={p.img}
                alt={p.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 p-4 text-left text-white">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-white/80">{p.cat}</div>
                <div className="mt-1 text-sm font-semibold leading-tight">{p.title}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-14 rounded-3xl border bg-secondary/50 p-8 text-center">
          <h2 className="font-display text-2xl font-bold text-accent md:text-3xl">Have a project in mind?</h2>
          <p className="mt-2 text-muted-foreground">Get a transparent quote within 24 hours.</p>
          <Link to="/contact" className="mt-5 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
            Request a Quote
          </Link>
        </div>
      </section>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setOpen(null)}>
          <button aria-label="Close" className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white">
            <X className="h-6 w-6" />
          </button>
          <figure className="max-h-[90vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img src={open.img.replace(/w=\d+&h=\d+/, "w=1600&h=1200")} alt={open.title} className="max-h-[80vh] w-full rounded-2xl object-contain" />
            <figcaption className="mt-3 text-center text-white">
              <div className="text-xs uppercase tracking-widest text-white/60">{open.cat}</div>
              <div className="mt-1 font-semibold">{open.title}</div>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
