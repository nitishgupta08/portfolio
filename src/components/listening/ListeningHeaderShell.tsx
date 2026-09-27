import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";

export function ListeningHeaderShell() {
  return (
    <>
      <PageBreadcrumb items={[{ label: "Listening" }]} />
      <header className="py-6">
        <p className="editorial-kicker editorial-kicker--lg">Live from Last.fm</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
          Listening
        </h1>
      </header>
    </>
  );
}
