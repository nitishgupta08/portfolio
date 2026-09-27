import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Nitish Kumar Gupta — Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function DefaultOpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1a1a2e",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              fontSize: 60,
              fontWeight: "bold",
              marginBottom: 16,
            }}
          >
            Nitish Kumar Gupta
          </div>
          <div
            style={{
              fontSize: 28,
              opacity: 0.7,
              textAlign: "center",
            }}
          >
            Portfolio, notes, and experiments
          </div>
        </div>
      </div>
    ),
    size
  );
}
