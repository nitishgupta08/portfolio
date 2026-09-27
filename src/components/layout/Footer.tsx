import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from "@/components/icons";
import { SITE_CONFIG, getGitHubReleaseUrl } from "@/lib/config";

export default function Footer() {
  const releaseUrl = getGitHubReleaseUrl(SITE_CONFIG.version || "latest");
  const commitSha = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;
  const commitShort = commitSha ? commitSha.slice(0, 7) : null;

  return (
    <footer className="py-8">
      <div className="container mx-auto px-4">
        <div className="rounded-[calc(var(--radius)+4px)] border border-border/80 bg-card px-6 py-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div id="socials" className="scroll-mt-24">
              <p className="editorial-kicker">Find me online</p>
              <div className="mt-3">
                <Socials />
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>built with next.js & shadcn </p>
              <div className="mt-2 flex flex-wrap gap-4">
                {SITE_CONFIG.version ? (
                  <a
                    href={releaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-foreground"
                    aria-label={`Open release ${SITE_CONFIG.version}`}
                  >
                    v{SITE_CONFIG.version}
                  </a>
                ) : null}

                {commitShort ? (
                  <a
                    href={`https://github.com/${SITE_CONFIG.github.username}/${SITE_CONFIG.github.repo}/commit/${commitSha}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-foreground font-mono text-xs"
                    aria-label={`View commit ${commitShort}`}
                  >
                    {commitShort}
                  </a>
                ) : null}

                {SITE_CONFIG.previousVersions.map((version) => (
                  <a
                    key={version.version}
                    href={version.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-foreground"
                    aria-label={`Open ${version.label} version`}
                  >
                    {version.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Socials() {
  const socialLinks = [
    { name: "GitHub", url: "https://github.com/nitishgupta08", icon: GithubIcon },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/nitishgupta24/",
      icon: LinkedinIcon,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/_nitishgupta/",
      icon: InstagramIcon,
    },
    {
      name: "X",
      url: "https://x.com/_nitishgupta",
      icon: TwitterIcon,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {socialLinks.map((social) => {
        const IconComponent = social.icon;
        return (
          <Link
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
          >
            <IconComponent className="size-4" aria-hidden="true" />
            {social.name}
          </Link>
        );
      })}
      <Link
        href={`mailto:${SITE_CONFIG.contactEmail}`}
        aria-label="Email"
        className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
      >
        <Mail className="size-4" aria-hidden="true" />
        Mail
      </Link>
    </div>
  );
}
