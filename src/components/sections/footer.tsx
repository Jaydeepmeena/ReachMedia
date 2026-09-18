import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { LogoLockupDark } from "@/components/ui/logo";
import { site, nav, services, specialities } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-ink-900">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/60 to-transparent"
      />
      <Container className="relative">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 py-16 sm:grid-cols-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10 lg:py-20">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <LogoLockupDark />
            <p className="mt-6 max-w-xs text-[14px] leading-relaxed text-white/50 text-pretty">
              Healthcare social media management that helps patients understand,
              trust and contact your clinic.
            </p>

            <ul className="mt-5.5">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2.5 py-1.5 text-[14px] text-white/60 transition-colors hover:text-brand-300"
                >
                  <Mail className="size-4 shrink-0" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2.5 py-1.5 text-[14px] text-white/60 transition-colors hover:text-brand-300"
                >
                  <Phone className="size-4 shrink-0" />
                  {site.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5 py-1.5 text-[14px] text-white/60">
                <MapPin className="size-4 shrink-0" />
                {site.city}
              </li>
            </ul>
          </div>

          <FooterCol
            title="Specialities"
            links={specialities.map((s) => ({
              label: s.name,
              href: "#specialities",
            }))}
          />
          <FooterCol
            title="Services"
            links={services.map((s) => ({ label: s.title, href: "#services" }))}
          />
          <FooterCol
            title="Company"
            links={[
              ...nav.filter((n) => ["#results", "#process", "#work", "#faqs"].includes(n.href)),
              { label: "Get a free audit", href: "#audit" },
            ]}
          />
        </div>

        <div className="flex flex-col gap-5 border-t border-white/8 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-white/55">
            © {year} {site.name}. An initiative by{" "}
            <span className="font-semibold text-white/65">{site.parent}</span>.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1 py-1.5 text-[13px] font-medium text-white/60 transition-colors hover:text-brand-300"
              >
                {s.label}
                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="font-display text-[12px] font-bold uppercase tracking-[0.16em] text-white/55">
        {title}
      </h3>
      <ul className="mt-3.5">
        {links.map((l) => (
          <li key={l.label + l.href}>
            <a
              href={l.href}
              className="inline-block py-1.5 text-[14px] text-white/60 transition-colors hover:text-brand-300"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
