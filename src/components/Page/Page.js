import React, { useRef, useEffect } from 'react';
import './Page.scss';

type Props = {
  title?: string,
  children: React.Node,
};

const Page = ({ title, children }: Props) => {
  const pageRef = useRef();

  useEffect(() => {
    pageRef.current.scrollIntoView();
  });

  return (
    <div ref={pageRef} className='page'>
      <div className='page__inner'>
        {title && <h1 className='page__title'>{title}</h1>}
        <div className='page__body'>{children}</div>
      </div>
    </div>
  );
};

export default Page;
