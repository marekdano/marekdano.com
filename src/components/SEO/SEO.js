import React from 'react';
import { Helmet } from 'react-helmet';
import { withPrefix } from 'gatsby';
import { useSiteMetadata } from '../../hooks';
import favicon from '../../../static/favicon.ico';

const SEO = ({ title, description, socialImage }) => {
  const { author, url } = useSiteMetadata();
  const metaImage = socialImage != null ? socialImage : author.photo;
  const metaImageUrl = url + withPrefix(metaImage);

  return (
    <Helmet>
      <link rel='icon' href={favicon} />
      <html lang='en' />
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta property='og:site_name' content={title} />
      <meta property='og:image' content={metaImageUrl} />
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={metaImageUrl} />
      <meta name='author' content={author.name} />
    </Helmet>
  );
};

export default SEO;
