// @flow strict
import React from 'react';
import { withPrefix, Link } from 'gatsby';
import './Author.scss';

type Props = {
  author: {
    name: string,
    bio: string,
    photo: string,
  },
  isIndex: ?boolean,
};

const Author = ({ author, isIndex }: Props) => (
  <div className='author'>
    <Link to='/'>
      <img src={withPrefix(author.photo)} className='author__photo' width='75' height='75' alt={author.name} />
    </Link>

    {isIndex === true ? (
      <h1 className='author__title'>
        <Link className='author__title-link' to='/'>
          {author.name}
        </Link>
      </h1>
    ) : (
      <h2 className='author__title'>
        <Link className='author__title-link' to='/'>
          {author.name}
        </Link>
      </h2>
    )}
    <p className='author__subtitle'>{author.bio[0]}</p>
    <p className='author__subtitle'>
      <i>{author.bio[1]}</i>
    </p>
  </div>
);

export default Author;
