import cx from 'classnames';
import { Fragment, useMemo } from 'react';

import Field from '@/components/Field';

import type { PaginationProps } from './typings';
import usePagination from './usePagination';

export const PlainPagination = ({
  // skip those from internal hook
  children: _children,
  pageSize: _pageSize,
  count: _count,
  onChange: _onChange,
  setParams: _setParams,
  setPageSize: _setPageSize,
  pageSizes: _pageSizes,
  first: _first,
  last: _last,
  // necessary props
  className,
  itemClassName,
  activeItemClassName,
  disabledItemClassName,
  page,
  pageNumbers,
  maxPage,
  onPageNumberClick,
  isRollover,
  isPrevPossible,
  goPrevious,
  isNextPossible,
  goNext,
  goTo,
  showAllPages = false,
  // DOM-only props
  ...props
}: PaginationProps) => {
  const callbacks = useMemo(
    () => ({
      goFirst: () => goTo(1),
      goLast: () => goTo(maxPage),
      set: (v: unknown) => {
        const newV = pageNumbers.find((x) => x === Number(v)) ?? pageNumbers[0];
        goTo(newV);
        return newV;
      }
    }),
    [goTo, maxPage, pageNumbers]
  );

  return (
    <Fragment>
      {maxPage <= 1 && null}
      {maxPage > 1 && (
        <div
          className={cx(
            'my-4',
            'flex flex-gap-2',
            'w-fit mx-auto',
            'children:(p-2 cursor-pointer transition-all-200)',
            className
          )}
          {...props}
        >
          <button
            key="first"
            tabIndex={0}
            onClick={callbacks.goFirst}
            disabled={!isPrevPossible && !isRollover}
            className={cx(
              'btn btn-secondary',
              !isPrevPossible && !isRollover && cx('disabled opacity-30', disabledItemClassName),
              itemClassName
            )}
          >
            {'<<'}
          </button>
          <button
            key="prev"
            tabIndex={0}
            onClick={goPrevious}
            disabled={!isPrevPossible && !isRollover}
            className={cx(
              'btn btn-secondary',
              !isPrevPossible && !isRollover && cx('disabled opacity-30', disabledItemClassName),
              itemClassName
            )}
          >
            {'<'}
          </button>
          {!showAllPages && (
            <Field
              name="--pagination-page"
              value={String(page)}
              title={`Page 1..${maxPage}`}
              displayValue={(v) => `${v} / ${maxPage}`}
              set={callbacks.set}
              className={cx(
                'uno-layer-o:(py-0 hover-none inline-block)',
                'uno-layer-o:(my-auto w-fit)'
              )}
              inputClassName="uno-layer-o:w-15ch"
              readOnlyClassName=""
            />
          )}
          {showAllPages &&
            pageNumbers.map((v) => (
              <button
                key={v}
                tabIndex={0}
                data-id={v}
                onClick={onPageNumberClick}
                disabled={v === page}
                className={cx(
                  'btn btn-secondary',
                  v === page && cx('bg-secondary disabled', activeItemClassName),
                  itemClassName
                )}
              >
                {v}
              </button>
            ))}
          <button
            key="next"
            tabIndex={0}
            onClick={goNext}
            disabled={!isNextPossible && !isRollover}
            className={cx(
              'btn btn-secondary',
              !isNextPossible && !isRollover && cx('disabled opacity-30', disabledItemClassName),
              itemClassName
            )}
          >
            {'>'}
          </button>
          <button
            key="last"
            tabIndex={0}
            onClick={callbacks.goLast}
            disabled={!isNextPossible && !isRollover}
            className={cx(
              'btn btn-secondary',
              !isNextPossible && !isRollover && cx('disabled opacity-30', disabledItemClassName),
              itemClassName
            )}
          >
            {'>>'}
          </button>
        </div>
      )}
    </Fragment>
  );
};

const Pagination = (props: PaginationProps) => {
  const extraProps = usePagination(props);

  return <PlainPagination {...props} {...extraProps} />;
};

export default Pagination;
