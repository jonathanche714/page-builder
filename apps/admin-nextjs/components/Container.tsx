import React from 'react';
import { useDrop } from 'react-dnd';
import { palleteMap } from '../constants';
import { useAppContext } from '../pages/context';
import { ModuleA } from './ModuleA';
import { ModuleB } from './ModuleB';
import { ModuleC } from './ModuleC';

export const Container = ({ layer, contentPayload, position, ...rest }) => {
  if (layer > 1) {
    return <div>this is not supported</div>;
  }

  const { dispatch } = useAppContext();

  const [, drop] = useDrop(() => ({
    accept: palleteMap.filter((type) => {
      const isContainer =
        type === 'vertical container' || type === 'horizontal container';
      return !isContainer;
    }),
    drop: (item, monitor) => {
      dispatch({
        type: 'appendContentToContainer',
        payload: {
          position,
          id: item.id,
        },
      });
    },
  }));

  // look at the flow of the first root
  const flow = rest.config.flow;
  const horizontalFlowStyles =
    flow === 'horizontal'
      ? {
          display: 'flex',
        }
      : {};

  return (
    <div
      ref={drop}
      style={{
        background: 'white',
        margin: '0 auto',
        minHeight: 100,
        height: 'auto',
        width: 'auto',
        maxWidth: 400,
        zIndex: layer,
      }}
    >
      <h1>container</h1>
      <div style={{ ...horizontalFlowStyles }}>
        {contentPayload?.map((content, index) => {
          switch (content.moduleType) {
            case 'moduleA':
              return <ModuleA key={index} />;

            case 'moduleB':
              return <ModuleB key={index} />;

            case 'moduleC':
              return <ModuleC key={index} />;

            default:
              throw new Error('nope');
          }
        })}
      </div>
    </div>
  );
};
