// @flow strict
import React from 'react';
import Meta from '../Meta';
import './Content.scss';

type Props = {
  body: string,
  title: string,
  date: string,
  readingTimeText: string,
};

// eslint-disable-next-line object-curly-newline
const Content = ({ body, title, date, readingTimeText }: Props) => (
  <div className='content'>
    <h1 className='content__title'>{title}</h1>
    <div className='content__datereadline'>
      <Meta date={date} /> • {readingTimeText}
    </div>
    <div className='content__body' dangerouslySetInnerHTML={{ __html: body }} />
  </div>
);

export default Content;
