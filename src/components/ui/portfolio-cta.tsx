import Image from "next/image";
import { ArrowUpRight, Download, FileText } from "lucide-react";
import { ButtonLink } from "@/components/ui/primitives";
import { portfolio } from "@/lib/content";

/**
 * The full portfolio deck, offered beneath the work samples.
 *
 * Both actions point at the same file: one opens it in the browser's PDF
 * viewer, the other downloads it. `download` on a cross-origin file is
 * ignored, but this is served from our own domain, so it works.
 */
export function PortfolioCta() {
  return (
    <div className="mt-9 overflow-hidden rounded-4xl border border-ink-200/70 bg-ink-50 shadow-soft lg:mt-14">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
        <a
          href={portfolio.file}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block aspect-[16/9] w-full self-center overflow-hidden border-b border-ink-200/70 bg-white lg:border-b-0 lg:border-r"
          aria-label={`Open ${portfolio.title}`}
        >
          <Image
            src={portfolio.cover}
            alt={`Cover of ${portfolio.title}`}
            fill
            sizes="(max-width: 1024px) 100vw, 22rem"
            className="object-contain transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-ink-900/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            <FileText className="size-3" />
            PDF · {portfolio.pages} pages
          </span>
        </a>

        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-700">
            Full portfolio
          </span>

          <h3 className="mt-4 font-display text-[clamp(1.35rem,2.6vw,1.9rem)] font-extrabold leading-tight tracking-tight text-ink-900 text-balance">
            {portfolio.title}
          </h3>
          <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-ink-500 text-pretty">
            {portfolio.description}
          </p>

          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
            {portfolio.highlights.map((h) => (
              <li key={h.label} className="min-w-0">
                <span className="block font-display text-lg font-extrabold tabular-nums text-brand-700">
                  {h.value}
                </span>
                <span className="block text-[11.5px] font-medium text-ink-400">
                  {h.label}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href={portfolio.file}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
            >
              View the portfolio
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink
              href={portfolio.file}
              download
              variant="secondary"
              size="lg"
            >
              <Download className="size-4" />
              Download PDF
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
