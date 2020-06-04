// @flow strict
import React from 'react';
import './Meta.scss';

type Props = {
  date: string,
};

const calendar = {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
};

const formatDate = (dateString) => {
  const dateObj = new Date(dateString);
  const monthName = calendar.months[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  const date = dateObj.getDate();
  return `${monthName} ${date}, ${year}`;
};

const Meta = ({ date }: Props) => <span className='meta__date'>{formatDate(date)}</span>;

export default Meta;
