import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import { repeat } from "@/utils/isomorphic/array";
import PaginationButton from "@/ui/atoms/PaginationButton";

type Props = {
  page: number;
  pages: number;
  resultsPerPage: number;
  count: number;
  onChange: (page: number) => void;
};

export default function Pagination({
  page,
  pages,
  resultsPerPage,
  count,
  onChange,
}: Props) {
  const isFirst = page === 0;
  const isLast = page === pages - 1;

  return (
    <div className="px-4 py-3">
      <div className="pb-3 text-center">
        <p className="text-sm text-white">
          Showing{" "}
          <span className="font-medium">{page * resultsPerPage + 1}</span> to{" "}
          <span className="font-medium">
            {Math.min(count, page * resultsPerPage + resultsPerPage)}
          </span>{" "}
          of <span className="font-medium">{count}</span> results
        </p>
      </div>
      <div className="flex flex-1 items-center justify-between">
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md bg-white shadow-sm "
            aria-label="Pagination"
          >
            <PaginationButton
              position="left"
              intent={isFirst ? "disable" : "enable"}
              onClick={() => onChange(page - 1)}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </PaginationButton>

            {repeat((i) => {
              return (
                <PaginationButton
                  aria-current="page"
                  key={i + 1}
                  position="center"
                  intent={page === i ? "highlight" : "enable"}
                  onClick={() => onChange(i)}
                >
                  {i + 1}
                </PaginationButton>
              );
            }, pages)}

            {/* <PaginationButton position="center" intent="disable">
              {"..."}
            </PaginationButton> */}

            <PaginationButton
              position="right"
              intent={isLast ? "disable" : "enable"}
              onClick={() => onChange(page + 1)}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </PaginationButton>
          </nav>
        </div>
      </div>
    </div>
  );
}
