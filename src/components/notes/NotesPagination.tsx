import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface NotesPaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  extraQuery?: string;
}

export function NotesPagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  extraQuery = "",
}: NotesPaginationProps) {
  const pageHref = (pageNum: number) =>
    extraQuery ? `/notes?page=${pageNum}&${extraQuery}` : `/notes?page=${pageNum}`;

  // Same windowing as before: up to 5 visible page numbers.
  const getPaginationLinks = () => {
    const links = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(
      1,
      Math.min(currentPage - Math.floor(maxVisiblePages / 2), totalPages - maxVisiblePages + 1),
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      links.push(i);
    }
    return links;
  };

  const visiblePages = getPaginationLinks();
  const showFirst = visiblePages[0] > 1;
  const showFirstEllipsis = visiblePages[0] > 2;
  const showLast = visiblePages[visiblePages.length - 1] < totalPages;
  const showLastEllipsis = visiblePages[visiblePages.length - 1] < totalPages - 1;

  return (
    <Pagination className="mt-12">
      <PaginationContent className="flex-wrap justify-center gap-1">
        <PaginationItem>
          {hasPrevPage ? (
            <PaginationPrevious href={pageHref(currentPage - 1)} />
          ) : (
            <PaginationPrevious href={pageHref(1)} aria-disabled="true" className="pointer-events-none opacity-50" />
          )}
        </PaginationItem>

        {showFirst ? (
          <PaginationItem>
            <PaginationLink href={pageHref(1)}>1</PaginationLink>
          </PaginationItem>
        ) : null}
        {showFirstEllipsis ? (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        ) : null}

        {visiblePages.map((pageNum) => (
          <PaginationItem key={pageNum}>
            <PaginationLink href={pageHref(pageNum)} isActive={pageNum === currentPage}>
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        ))}

        {showLastEllipsis ? (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        ) : null}
        {showLast ? (
          <PaginationItem>
            <PaginationLink href={pageHref(totalPages)}>{totalPages}</PaginationLink>
          </PaginationItem>
        ) : null}

        <PaginationItem>
          {hasNextPage ? (
            <PaginationNext href={pageHref(currentPage + 1)} />
          ) : (
            <PaginationNext href={pageHref(totalPages)} aria-disabled="true" className="pointer-events-none opacity-50" />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
