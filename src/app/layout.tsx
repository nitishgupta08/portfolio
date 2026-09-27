import type { Metadata } from "next";
import { AppProviders } from "@/components/providers/AppProviders";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ThemeSeedScript from "@/components/theme/ThemeSeedScript";
import "@/styles/global.css";

export const metadata: Metadata = {
  title: {
    default: "Nitish Kumar Gupta | Portfolio",
    template: "%s | Nitish Kumar Gupta",
  },
  description:
    "Portfolio, notes, and experiments by Nitish Kumar Gupta, a software developer.",
  applicationName: "Nitish Kumar Gupta",
  creator: "Nitish Kumar Gupta",
  keywords: ["Nitish Kumar Gupta", "software developer", "portfolio", "web development"],
  icons: "/logo.svg",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Nitish Kumar Gupta",
    title: "Nitish Kumar Gupta | Portfolio",
    description:
      "Portfolio, notes, and experiments by Nitish Kumar Gupta, a software developer.",
    images: ["/logo.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nitish Kumar Gupta | Portfolio",
    description:
      "Portfolio, notes, and experiments by Nitish Kumar Gupta, a software developer.",
    images: ["/logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeSeedScript />
      </head>
      <body className="font-sans antialiased">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <AppProviders>
          <Navbar />
          <main id="main-content" className="pt-16">
            {children}
          </main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
