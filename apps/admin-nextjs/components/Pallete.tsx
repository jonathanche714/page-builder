import React from 'react';
import { PalleteItem } from './PalleteItem';
import { palleteMap } from '../constants';
import { useAppContext } from '../pages/context';

export const Pallete = () => {
  const { dispatch, pageType, platform } = useAppContext();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxHeight: 400,
      }}
    >
      {palleteMap.map((item) => {
        return <PalleteItem item={item} key={item} />;
      })}
      <button onClick={() => dispatch({ type: 'flush', pageType, platform })}>
        flush
      </button>
    </div>
  );
};
