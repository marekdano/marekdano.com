// @flow strict
import React from 'react';
import classNames from 'classnames';
import './Icon.scss';

type Props = {
  name: string,
  icon: {
    viewBox?: string,
    path?: string,
  },
  large?: boolean,
};

const Icon = ({ name, icon, large = false }: Props) => (
  <svg className={classNames('icon', { 'icon-large': large })} viewBox={icon.viewBox}>
    <title>{name}</title>
    <path d={icon.path} />
  </svg>
);

export default Icon;
