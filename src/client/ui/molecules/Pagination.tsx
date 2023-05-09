import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import { repeat } from "@/utils/array";
import IconButton from "@/client/ui/atoms/IconButton";

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
    <div className="flex w-full flex-col justify-center px-4 py-3">
      <p className="pb-3 text-center text-sm text-white">
        {pages === 0 && (
          <>
            <span className="font-medium">No</span> results found
          </>
        )}
        {pages === 1 && (
          <>
            Showing <span className="font-medium">all</span> results
          </>
        )}
        {pages > 1 && (
          <>
            Showing{" "}
            <span className="font-medium">{page * resultsPerPage + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(count, page * resultsPerPage + resultsPerPage)}
            </span>{" "}
            of <span className="font-medium">{count}</span> results
          </>
        )}
      </p>
      {pages > 1 && (
        <nav
          className="grid grid-cols-10 justify-items-center overflow-hidden rounded-md bg-white shadow-sm"
          aria-label="Pagination"
        >
          <IconButton
            position="left"
            intent={isFirst ? "disable" : "enable"}
            onClick={() => onChange(page - 1)}
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </IconButton>

          {repeat((i) => {
            return (
              <IconButton
                aria-current="page"
                key={i + 1}
                position="center"
                intent={page === i ? "highlight" : "enable"}
                onClick={() => onChange(i)}
              >
                {i + 1}
              </IconButton>
            );
          }, pages)}

          <IconButton
            position="right"
            intent={isLast ? "disable" : "enable"}
            onClick={() => onChange(page + 1)}
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </IconButton>
        </nav>
      )}
    </div>
  );
}
