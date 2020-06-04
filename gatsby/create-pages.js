'use strict';

const path = require('path');
const _ = require('lodash');
const createCategoriesPages = require('./pagination/create-categories-pages.js');
const createTagsPages = require('./pagination/create-tags-pages.js');
const createPostsPages = require('./pagination/create-posts-pages.js');

const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // 404
  createPage({
    path: '/404',
    component: path.resolve('./src/templates/not-found-template.js'),
  });

  // Tags list
  createPage({
    path: '/tags',
    component: path.resolve('./src/templates/tags-list-template.js'),
  });

  // Categories list
  createPage({
    path: '/categories',
    component: path.resolve('./src/templates/categories-list-template.js'),
  });

  // Posts and pages from markdown
  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { draft: { ne: true } } }
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            frontmatter {
              template
              title
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  const { edges } = result.data.allMarkdownRemark;

  _.each(edges, (edge, index) => {
    if (_.get(edge, 'node.frontmatter.template') === 'page') {
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve('./src/templates/page-template.js'),
        context: { slug: edge.node.fields.slug },
      });
    } else if (_.get(edge, 'node.frontmatter.template') === 'post') {
      const isPreviousBlogPost = _.get(edges[index - 1], 'node.frontmatter.template') === 'post';
      // eslint-disable-next-line operator-linebreak
      const isNextBlogPost =
        _.get(edges[index + 1], 'node.frontmatter.template') === 'post' && index + 1 < edges.length;
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve('./src/templates/post-template.js'),
        context: {
          slug: edge.node.fields.slug,
          prevPagePath: isPreviousBlogPost ? edges[index - 1].node.fields.slug : null,
          nextPagePath: isNextBlogPost ? edges[index + 1].node.fields.slug : null,
          hasPrevPage: isPreviousBlogPost,
          hasNextPage: isNextBlogPost,
          prevPageTitle: isPreviousBlogPost && edges[index - 1].node.frontmatter.title,
          nextPageTitle: isNextBlogPost && edges[index + 1].node.frontmatter.title,
        },
      });
    }
  });

  // Feeds
  await createTagsPages(graphql, actions);
  await createCategoriesPages(graphql, actions);
  await createPostsPages(graphql, actions);
};

module.exports = createPages;
