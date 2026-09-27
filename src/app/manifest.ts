import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nitish Kumar Gupta — Portfolio",
    short_name: "Nitish Gupta",
    description: "Portfolio, notes, and experiments by Nitish Kumar Gupta, a software developer.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#3b5bdb",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
