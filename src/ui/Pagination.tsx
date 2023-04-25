import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

type Props = {
  page: number;
  pages: number;
  resultsPerPage: number;
  count: number;
  onChange: (page: number) => void;
};

export const repeat = (
  callback: (i: number, max: number) => any,
  max: number
) => {
  let arr = [];
  for (let i = 0; i < max; i++) {
    const returnValue = callback(i, max);
    if (returnValue) {
      arr.push(returnValue);
    }
  }
  return arr;
};

export default function Pagination({
  page,
  pages,
  resultsPerPage,
  count,
  onChange,
}: Props) {
  const isPrev = page > 0;
  const isNext = page < pages - 1;

  return (
    <div className="px-4 py-3">
      <div className="pb-3 text-center">
        <p className="text-sm text-white">
          Showing{" "}
          <span className="font-medium">{page * resultsPerPage + 1}</span> to{" "}
          <span className="font-medium">
            {page * resultsPerPage + resultsPerPage}
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
            <a
              href="#"
              className={
                isPrev
                  ? "relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-900 ring-1 ring-inset ring-gray-300"
                  : "relative inline-flex cursor-default items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300"
              }
              onClick={isPrev ? () => onChange(page - 1) : () => {}}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>

            {repeat(
              (i) => (
                <a
                  key={i + 1}
                  href="#"
                  aria-current="page"
                  className={
                    page === i
                      ? "relative z-10 inline-flex cursor-default items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"
                      : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300"
                  }
                  onClick={page !== i ? () => onChange(i) : () => {}}
                >
                  {i + 1}
                </a>
              ),
              pages
            )}

            {/* <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300">
              ...
            </span> */}

            <a
              href="#"
              className={
                isNext
                  ? "relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-900 ring-1 ring-inset ring-gray-300"
                  : "relative inline-flex cursor-default items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300"
              }
              onClick={isNext ? () => onChange(page + 1) : () => {}}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
