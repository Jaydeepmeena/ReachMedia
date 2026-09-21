import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { site } from "@/lib/content";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Healthcare Social Media for IVF, Eye, Dental & Hospitals`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "healthcare social media agency",
    "IVF clinic marketing",
    "eye hospital social media",
    "dental clinic marketing",
    "multi speciality hospital marketing",
    "medical video production India",
    "Reinvent Digital",
  ],
  applicationName: site.name,
  authors: [{ name: site.parent }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1f9440",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  slogan: site.tagline,
  description: site.description,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  // Only real profiles — placeholder URLs would point search engines nowhere.
  sameAs: site.socials
    .map((s) => s.href)
    .filter((href) => new URL(href).pathname.length > 1),
  parentOrganization: { "@type": "Organization", name: site.parent },
  areaServed: "IN",
  serviceType: [
    "Social media management",
    "Healthcare content marketing",
    "Graphic design",
    "Video production",
  ],
  knowsAbout: [
    "IVF and fertility clinic marketing",
    "Eye hospital marketing",
    "Dental clinic marketing",
    "Multi-speciality hospital marketing",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
