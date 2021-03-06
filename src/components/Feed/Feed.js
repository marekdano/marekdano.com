// @flow strict
import React from 'react';
import { Link } from 'gatsby';
import type { Edges } from '../../types';
import './Feed.scss';

type Props = {
  edges: Edges,
};

const Feed = ({ edges }: Props) => (
  <div className='feed'>
    {edges.map((edge) => (
      <div className='feed__item' key={edge.node.fields.slug}>
        <div className='feed__item-meta'>
          <span className='feed__item-meta-category'>
            <Link to={edge.node.fields.categorySlug} className='feed__item-meta-category-link'>
              {edge.node.frontmatter.category}
            </Link>
          </span>
        </div>
        <h2 className='feed__item-title'>
          <Link className='feed__item-title-link' to={edge.node.fields.slug}>
            {edge.node.frontmatter.title}
          </Link>
        </h2>
        <p className='feed__item-description'>{edge.node.frontmatter.description}</p>
        <Link className='feed__item-readmore' to={edge.node.fields.slug}>
          Read →
        </Link>
      </div>
    ))}
  </div>
);

export default Feed;
