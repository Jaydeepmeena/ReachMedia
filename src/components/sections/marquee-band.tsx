import {
  HeartPulse,
  Eye,
  Toothbrush,
  Hospital,
  Syringe,
  Baby,
  Bone,
  Brain,
} from "lucide-react";

const items = [
  { icon: HeartPulse, label: "IVF & Fertility" },
  { icon: Eye, label: "Eye Hospitals" },
  { icon: Toothbrush, label: "Dental Clinics" },
  { icon: Hospital, label: "Multi-Speciality" },
  { icon: Syringe, label: "Cosmetology" },
  { icon: Baby, label: "Paediatrics" },
  { icon: Bone, label: "Orthopaedics" },
  { icon: Brain, label: "Neurology" },
];

export function MarqueeBand() {
  return (
    <div className="relative overflow-hidden border-y border-ink-200/70 bg-white py-5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-28"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-28"
      />

      <div className="flex w-max animate-marquee items-center gap-10 pr-10 sm:gap-14 sm:pr-14">
        {[0, 1].map((dup) => (
          <div
            key={dup}
            className="flex items-center gap-10 sm:gap-14"
            aria-hidden={dup === 1}
          >
            {items.map((item) => (
              <span
                key={item.label}
                className="flex shrink-0 items-center gap-2.5 whitespace-nowrap text-[13.5px] font-semibold text-ink-400 sm:text-sm"
              >
                <item.icon className="size-4.5 text-brand-500" strokeWidth={2} />
                {item.label}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
