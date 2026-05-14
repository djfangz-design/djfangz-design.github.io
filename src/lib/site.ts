export const SITE = {
  name: "Nyeneng Trading & Projects",
  short: "Nyeneng",
  tagline: "Building Communities, Transforming Lives",
  established: 2016,
  phone: "+27 72 129 6893",
  phoneRaw: "27721296893",
  email: "tlhabane2016@gmail.com",
  address: "556 Ngeneng Section, Lefaragatlha, Rustenburg, North West, 0336",
  city: "Rustenburg",
  hours: ["Mon – Fri: 08:00 – 17:00", "Sat: By Appointment", "Sun: Closed"],
  whatsappMsg: "Hi Nyeneng, I'd like to request a quote.",
};

export const whatsappLink = (msg = SITE.whatsappMsg) =>
  `https://wa.me/${SITE.phoneRaw}?text=${encodeURIComponent(msg)}`;

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
] as const;
