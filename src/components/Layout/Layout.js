// @flow strict
import React from 'react';
import type { Node as ReactNode } from 'react';
import DarkModeToggle from '../DarkModeToggle';
import SEO from '../SEO';
import styles from './Layout.module.scss';

type Props = {
  children: ReactNode,
  title: string,
  description?: string,
  socialImage?: string,
};

// eslint-disable-next-line object-curly-newline
const Layout = ({ children, title, description, socialImage }: Props) => (
  <div className={styles.layout}>
    <SEO title={title} description={description} socialImage={socialImage} />
    <DarkModeToggle />
    {children}
  </div>
);

export default Layout;
