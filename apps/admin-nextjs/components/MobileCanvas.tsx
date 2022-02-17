import React from 'react';
import { useDrop } from 'react-dnd';
import { palleteMap } from '../constants';
import { useAppContext } from '../pages/context';
import { ModuleA } from './ModuleA';
import { ModuleB } from './ModuleB';
import { ModuleC } from './ModuleC';
import { Container } from './Container';

export const MobileCanvas = () => {
  const { state, dispatch } = useAppContext();
  const [, drop] = useDrop(() => ({
    accept: palleteMap.filter((type) => {
      const isContainer =
        type === 'vertical container' || type === 'horizontal container';
      return !isContainer;
    }),

    drop: (item, monitor) => {
      const isOver = monitor.isOver({ shallow: true });
      if (!isOver) return;

      dispatch({
        type: 'dropItem',
        payload: {
          id: item.id,
        },
      });
    },
  }));

  // the first element is a container, so look directly at its contents
  const elements = state.json.content;
  // look at the flow of the first root
  const flow = state.json.config.flow;

  const horizontalFlowStyles =
    flow === 'horizontal'
      ? {
          display: 'flex',
        }
      : {};

  return (
    <div
      style={{
        background: 'tan',
        width: '75%',
        zIndex: 0,
        ...horizontalFlowStyles,
      }}
      ref={drop}
    >
      {elements.map((el, index) => {
        const isContainer = el.contentType === 'container';

        if (isContainer) {
          return (
            <Container
              contentPayload={el.content}
              layer={1}
              position={index}
              key={index}
              {...el}
            >
              container
            </Container>
          );
        } else {
          switch (el.moduleType) {
            case 'moduleA':
              return <ModuleA key={index} />;

            case 'moduleB':
              return <ModuleB key={index} />;

            case 'moduleC':
              return <ModuleC key={index} />;

            default:
              throw new Error('nope');
          }
        }
      })}
    </div>
  );
};
