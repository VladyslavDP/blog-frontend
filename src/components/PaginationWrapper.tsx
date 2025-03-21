import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { onEnterOrSpaceKeyDown } from '@/utils';

type PaginationWrapperType = {
  totalPages: number;
  page: number;
  onChange: (page: number) => void;
};

export default function PaginationWrapper({ totalPages, page, onChange }: PaginationWrapperType) {
  if (page < 0 || totalPages < 0) throw new Error(`count or page could not be negative`);
  if (page > totalPages) throw new Error('Page could not be more than count'); // here trouble

  const displayLastPages = totalPages - page <= 3;

  function generateArrayAroundNumber(page: number) {
    const range = 1;
    return Array.from({ length: range * 2 + 1 }, (_, i) => page - range + i);
  }

  function generateArrayLastNumber() {
    const startValue = totalPages - 4;
    const arr: number[] = [];
    for (let i = startValue; i <= totalPages; i++) {
      arr.push(i);
    }
    return arr;
  }

  return (
    <>
      <div>count: {totalPages}</div>
      <div>page: {page}</div>
      <Pagination>
        <PaginationContent>
          <PaginationItem className={'focus-ring hover-primary cursor-pointer'}>
            <PaginationPrevious
              className={page === 1 ? 'disabled-pagination ' : ''}
              onClick={() => {
                if (page > 1) onChange(page - 1);
              }}
              onKeyDown={onEnterOrSpaceKeyDown(() => {
                if (page > 1) onChange(page - 1);
              })}
            />
          </PaginationItem>

          <PaginationItem key={1}>
            <PaginationLink
              className="focus-ring hover-primary"
              isActive={page === 1}
              href="#"
              tabIndex={0}
              onClick={() => {
                if (typeof onChange === 'function') {
                  onChange.apply(this, [1]);
                }
              }}
            >
              {1}
            </PaginationLink>
          </PaginationItem>

          {totalPages <= 7 ? (
            Array.from({ length: totalPages - 1 }, (_, i) => i + 2).map((i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  className="focus-ring hover-primary"
                  isActive={i === page}
                  href="#"
                  tabIndex={0}
                  onClick={() => {
                    if (typeof onChange === 'function') {
                      onChange(i);
                    }
                  }}
                >
                  {i}
                </PaginationLink>
              </PaginationItem>
            ))
          ) : page < 5 ? (
            <>
              {Array.from({ length: 4 }, (_, i) => i + 2).map((i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    className="focus-ring hover-primary"
                    isActive={i === page}
                    href="#"
                    tabIndex={0}
                    onClick={() => {
                      if (typeof onChange === 'function') {
                        onChange.apply(this, [i]);
                      }
                    }}
                  >
                    {i}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem key={totalPages}>
                <PaginationLink
                  className="focus-ring hover-primary"
                  isActive={false}
                  href="#"
                  tabIndex={0}
                  onClick={() => {
                    if (typeof onChange === 'function') {
                      onChange.apply(this, [totalPages]);
                    }
                  }}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          ) : !displayLastPages ? (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              {generateArrayAroundNumber(page).map((i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    className="focus-ring hover-primary"
                    isActive={i === page}
                    href="#"
                    tabIndex={0}
                    onClick={() => {
                      if (typeof onChange === 'function') {
                        onChange.apply(this, [i]);
                      }
                    }}
                  >
                    {i}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem key={totalPages}>
                <PaginationLink
                  className="focus-ring hover-primary"
                  isActive={false}
                  href="#"
                  tabIndex={0}
                  onClick={() => {
                    if (typeof onChange === 'function') {
                      onChange.apply(this, [totalPages]);
                    }
                  }}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          ) : (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>

              {generateArrayLastNumber().map((i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    className="focus-ring hover-primary"
                    isActive={i === page}
                    href="#"
                    tabIndex={0}
                    onClick={() => {
                      if (typeof onChange === 'function') {
                        onChange.apply(this, [i]);
                      }
                    }}
                  >
                    {i}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </>
          )}

          <PaginationItem className={'focus-ring hover-primary cursor-pointer'}>
            <PaginationNext
              className={page === totalPages ? 'disabled-pagination' : ''}
              onClick={() => {
                if (page !== totalPages) onChange(page + 1);
              }}
              onKeyDown={onEnterOrSpaceKeyDown(() => {
                if (page !== totalPages) onChange(page + 1);
              })}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
