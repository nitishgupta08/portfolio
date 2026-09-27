export const SITE_CONFIG = {
  version: process.env.APP_VERSION,
  name: "Nitish Kumar Gupta | Portfolio",
  description: "SWE",
  author: "Nitish Kumar Gupta",
  contactEmail: "nitishkg.88@gmail.com",
  github: {
    username: "nitishgupta08",
    repo: "portfolio-v3",
  },
  previousVersions: [
    {
      version: "2.0.0",
      url: "https://v2-nitishgupta.netlify.app/",
      label: "v2",
    },
    {
      version: "1.0.0",
      url: "https://v1-nitishgupta.netlify.app/",
      label: "v1",
    },
  ],
} as const;

// Helper function to get GitHub release URL
export const getGitHubReleaseUrl = (version: string) => {
  return `https://github.com/${SITE_CONFIG.github.username}/${SITE_CONFIG.github.repo}/releases/tag/${version}`;
};
