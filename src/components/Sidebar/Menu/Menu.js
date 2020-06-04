// @flow strict
import React from 'react';
import { Link } from 'gatsby';
import './Menu.scss';

type Props = {
  menu: {
    label: string,
    path: string,
  }[],
};

const Menu = ({ menu }: Props) => (
  <nav className='menu'>
    <ul className='menu__list'>
      {menu.map((item) => (
        <li className='menu__list-item' key={item.path}>
          <Link to={item.path} className='menu__list-item-link' activeClassName='menu__list-item-link--active'>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default Menu;
