import Image from "next/image";
import Link from "next/link";
import type { Components } from "react-markdown";

export const notesMarkdownComponents: Components = {
  a: ({ href = "", children, ...props }) => {
    const isInternal = href.startsWith("/");
    if (isInternal) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
  img: ({ src = "", alt = "", ...props }) => {
    const imageSrc = typeof src === "string" ? src : "";
    if (!imageSrc) return null;

    if (imageSrc.startsWith("/")) {
      return (
        <span className="notes-md-image-wrap">
          <Image
            src={imageSrc}
            alt={alt}
            width={1200}
            height={675}
            loading="lazy"
            className="notes-md-image"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </span>
      );
    }

    return (
      <span className="notes-md-image-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="notes-md-image"
          {...props}
        />
      </span>
    );
  },
  table: ({ children, ...props }) => (
    <div className="notes-md-table-wrap">
      <table {...props}>{children}</table>
    </div>
  ),
  pre: ({ children, ...props }) => (
    <div className="notes-md-pre-wrap">
      <pre {...props}>{children}</pre>
    </div>
  ),
  code: ({ className, children, ...props }) => {
    const content = String(children ?? "");
    const isInline =
      !className?.includes("language-") &&
      !content.includes("\n") &&
      !className?.includes("shiki");

    if (isInline) {
      return (
        <code className="notes-md-inline-code" {...props}>
          {children}
        </code>
      );
    }

    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};
