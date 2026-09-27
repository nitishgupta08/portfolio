"use client";

import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { getClientMarkdownRenderOptions } from "@/lib/markdown/renderMarkdown";
import { notesMarkdownComponents } from "@/components/notes/markdown/components";

interface AppMarkdownProps {
  content: string;
  className?: string;
}

export default function AppMarkdown({ content, className }: AppMarkdownProps) {
  const { remarkPlugins, rehypePlugins } = getClientMarkdownRenderOptions();

  return (
    <article className={cn("notes-md", className)}>
      <ReactMarkdown
        skipHtml
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
        components={notesMarkdownComponents}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
