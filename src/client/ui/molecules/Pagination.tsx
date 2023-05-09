import { cx } from "class-variance-authority";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import { repeat } from "@/utils/array";
import IconButton from "@/client/ui/atoms/IconButton";

type Props = {
  className?: string;
  page: number;
  pages: number;
  resultsPerPage: number;
  count: number;
  onChange: (page: number) => void;
};

export default function Pagination({
  className,
  page,
  pages,
  resultsPerPage,
  count,
  onChange,
}: Props) {
  const isFirst = page === 0;
  const isLast = page === pages - 1;

  return (
    <div
      className={cx(
        "flex w-full flex-col justify-center px-sm py-xs",
        className
      )}
    >
      <p className="pb-xs text-center text-sm text-white">
        {pages === 0 && (
          <>
            <b>No</b> results found
          </>
        )}
        {pages === 1 && (
          <>
            Showing <b>all</b> results
          </>
        )}
        {pages > 1 && (
          <>
            Showing <b>{page * resultsPerPage + 1}</b> to{" "}
            <b>{Math.min(count, page * resultsPerPage + resultsPerPage)}</b> of{" "}
            <b>{count}</b> results
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
            size="lg"
            intent={isFirst ? "disable" : "enable"}
            onClick={() => onChange(page - 1)}
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-md w-md" aria-hidden="true" />
          </IconButton>

          {repeat((i) => {
            return (
              <IconButton
                size="lg"
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
            size="lg"
            intent={isLast ? "disable" : "enable"}
            onClick={() => onChange(page + 1)}
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-md w-md" aria-hidden="true" />
          </IconButton>
        </nav>
      )}
    </div>
  );
}
