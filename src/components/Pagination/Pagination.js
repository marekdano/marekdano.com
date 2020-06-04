import React from 'react';
import classNames from 'classnames';
import { Link } from 'gatsby';
import './Pagination.scss';

const Pagination = ({
  prevPagePath,
  nextPagePath,
  hasNextPage,
  hasPrevPage,
  prevPageTitle = 'Previous',
  nextPageTitle = 'Next',
}) => {
  const prevClassName = classNames({
    'pagination__prev-link': true,
    'pagination__prev-link--disable': !hasPrevPage,
  });

  const nextClassName = classNames({
    'pagination__next-link': true,
    'pagination__next-link--disable': !hasNextPage,
  });

  return (
    <div className='pagination'>
      <div className='pagination__prev'>
        {prevPagePath && (
          <Link rel='prev' to={prevPagePath} className={prevClassName}>
            ← {prevPageTitle}
          </Link>
        )}
      </div>
      <div className='pagination__next'>
        {nextPagePath && (
          <Link rel='next' to={hasNextPage ? nextPagePath : '/'} className={nextClassName}>
            → {nextPageTitle}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Pagination;
