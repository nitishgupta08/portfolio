// Central feature flags (12-factor: code defaults, env override per flag).
//
// Toggle with e.g. NEXT_PUBLIC_FEATURE_GALLERY=true. Gallery ships disabled
// (no Firebase Storage / Blaze plan needed); everything else is enabled.
// Gate points read isFeatureEnabled() — never process.env directly.

function parseFlag(raw: string | undefined, defaultValue: boolean): boolean {
  if (raw === undefined) return defaultValue;
  return raw.trim().toLowerCase() === "true";
}

// NOTE: process.env.NEXT_PUBLIC_* must be referenced with a static literal
// key so Next.js inlines the value into the client bundle. Do not refactor
// this into readEnvFlag("NAME") — dynamic process.env[name] lookup returns
// undefined on the client, causing server/client hydration mismatches.
export const FEATURES = {
  gallery: parseFlag(process.env.NEXT_PUBLIC_FEATURE_GALLERY, false),
  notes: parseFlag(process.env.NEXT_PUBLIC_FEATURE_NOTES, true),
  projects: parseFlag(process.env.NEXT_PUBLIC_FEATURE_PROJECTS, true),
  experiences: parseFlag(process.env.NEXT_PUBLIC_FEATURE_EXPERIENCES, true),
  quotes: parseFlag(process.env.NEXT_PUBLIC_FEATURE_QUOTES, true),
  listening: parseFlag(process.env.NEXT_PUBLIC_FEATURE_LISTENING, true),
} as const;

export type FeatureName = keyof typeof FEATURES;

export function isFeatureEnabled(feature: FeatureName): boolean {
  return FEATURES[feature];
}
