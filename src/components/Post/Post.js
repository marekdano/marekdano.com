import React from 'react';
import { Link } from 'gatsby';
import Content from './Content';
import Tags from './Tags';
// import type { Node } from '../../types';
import { useSiteMetadata } from '../../hooks';
import { getIcon } from '../../utils';
import Icon from '../Icon';
import Pagination from '../Pagination';
import './Post.scss';

const Post = ({ post, pageContext }) => {
  const { html } = post;
  const {
    tagSlugs,
    readingTime: { text: readingTimeText },
  } = post.fields;
  const { tags, title, date } = post.frontmatter;
  const { author } = useSiteMetadata();

  return (
    <div className='post'>
      <Link className='post__home-button' to='/'>
        All Articles
      </Link>

      <div className='post__content'>
        <Content body={html} title={title} date={date} readingTimeText={readingTimeText} />
      </div>

      <div className='post__footer'>
        {tags && tagSlugs && <Tags tags={tags} tagSlugs={tagSlugs} />}
        <p className='post__footer-text'>
          Reach me with comments on{' '}
          <a href={`https://twitter.com/${author.contacts.twitter}`} target='_blank' rel='noopener noreferrer'>
            <Icon name='twitter' icon={getIcon('twitter')} large />
          </a>
        </p>

        <Pagination {...pageContext} />
      </div>
      {/* <div className='post__comments'>
        <Comments postSlug={slug} postTitle={post.frontmatter.title} />
      </div> */}
    </div>
  );
};

export default Post;
