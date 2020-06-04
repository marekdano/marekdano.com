// @flow strict
import React from 'react';
import useDarkMode from 'use-dark-mode';

import sunIcon from '../../../static/media/sun.svg';
import moonIcon from '../../../static/media/moon.svg';
import './style.scss';

const DarkModeToggle = () => {
  const darkMode = useDarkMode(false);

  return (
    <div className='toggle-container'>
      <div onClick={darkMode.toggle}>
        {darkMode.value ? (
          <span className='toggle-icon moon'>
            <img src={moonIcon} />
          </span>
        ) : (
          <span className='toggle-icon sun'>
            <img src={sunIcon} />
          </span>
        )}
      </div>
    </div>
  );
};

export default DarkModeToggle;
