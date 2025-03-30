import React from 'react';
import { useAppSelector } from '@/store';

export const Loader = () => {
  const isLoading = useAppSelector((state) => state.ui.isLoading);

  if (!isLoading) return null;

  return (
    <div
      className={'fixed top-0 left-0 w-full h-full z-10 flex justify-center items-center flex-col'}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
      }}
    >
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
