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
import * as React from 'react';
import { cn } from '@/lib/utils';

type PaginationWrapperType = React.ComponentProps<'div'> & {
  totalPages: number;
  page: number;
  onPageChange: (page: number) => void;
};

function generateArrayAroundNumber(page: number) {
  const range = 1;
  return Array.from({ length: range * 2 + 1 }, (_, i) => page - range + i);
}

function generateArrayLastNumber(totalPages: number) {
  const startValue = totalPages - 4;
  const arr: number[] = [];
  for (let i = startValue; i <= totalPages; i++) {
    arr.push(i);
  }
  return arr;
}

export default function PaginationWrapper({
  totalPages,
  page,
  onPageChange,
  className,
  ...props
}: PaginationWrapperType) {
  if (page < 0 || totalPages < 0) throw new Error(`count or page could not be negative`);
  if (page > totalPages) throw new Error('Page could not be more than count'); // here trouble

  const displayFirstPages = page < 5;
  const displayMiddlePages = !(totalPages - page <= 3);

  return (
    <div className={cn('', className)} {...props}>
      <Pagination>
        <PaginationContent>
          <PaginationItem className={'focus-ring hover-primary cursor-pointer'}>
            <PaginationPrevious
              className={page === 1 ? 'disabled-pagination ' : ''}
              onClick={() => {
                if (page > 1) onPageChange(page - 1);
              }}
              onKeyDown={onEnterOrSpaceKeyDown(() => {
                if (page > 1) onPageChange(page - 1);
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
                if (typeof onPageChange === 'function') {
                  onPageChange.apply(this, [1]);
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
                    if (typeof onPageChange === 'function') {
                      onPageChange(i);
                    }
                  }}
                >
                  {i}
                </PaginationLink>
              </PaginationItem>
            ))
          ) : displayFirstPages ? (
            <>
              {Array.from({ length: 4 }, (_, i) => i + 2).map((i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    className="focus-ring hover-primary"
                    isActive={i === page}
                    href="#"
                    tabIndex={0}
                    onClick={() => {
                      if (typeof onPageChange === 'function') {
                        onPageChange.apply(this, [i]);
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
                    if (typeof onPageChange === 'function') {
                      onPageChange.apply(this, [totalPages]);
                    }
                  }}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          ) : displayMiddlePages ? (
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
                      if (typeof onPageChange === 'function') {
                        onPageChange.apply(this, [i]);
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
                    if (typeof onPageChange === 'function') {
                      onPageChange.apply(this, [totalPages]);
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

              {generateArrayLastNumber(totalPages).map((i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    className="focus-ring hover-primary"
                    isActive={i === page}
                    href="#"
                    tabIndex={0}
                    onClick={() => {
                      if (typeof onPageChange === 'function') {
                        onPageChange.apply(this, [i]);
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
                if (page !== totalPages) onPageChange(page + 1);
              }}
              onKeyDown={onEnterOrSpaceKeyDown(() => {
                if (page !== totalPages) onPageChange(page + 1);
              })}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
