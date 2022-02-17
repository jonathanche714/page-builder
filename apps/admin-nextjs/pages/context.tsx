import React, { useReducer, useState } from 'react';

const getInitialState = (pageType, platform) => {
  // assumption is that mobile layout only displays a stack layout
  if (platform === 'mobile') {
    return {
      json: {
        contentType: 'container',
        config: {
          flow: 'vertical',
        },
        content: [],
      },
    };
  }

  // page type to provide default template for homepage, category page, and product page
  // based on previous meeting
  switch (pageType) {
    case 'product page':
      return {
        json: {
          contentType: 'container',
          config: {
            flow: 'vertical',
          },
          content: [
            {
              contentType: 'container',
              config: {
                flow: 'horizontal',
              },
              content: [],
            },
          ],
        },
      };

    case 'category page':
      return {
        json: {
          contentType: 'container',
          config: {
            flow: 'horizontal',
          },
          content: [
            {
              contentType: 'container',
              config: {
                flow: 'vertical',
              },
              content: [],
            },
            {
              contentType: 'container',
              config: {
                flow: 'vertical',
              },
              content: [],
            },
          ],
        },
      };

    case 'home page':
      return {
        json: {
          contentType: 'container',
          config: {
            flow: 'vertical',
          },
          content: [],
        },
      };
    default:
      return {
        json: {
          contentType: 'container',
          config: {
            flow: 'vertical',
          },
          content: [],
        },
      };
  }
};

/**
 * helper function to generate container json
 */
const getContainerJsonTemplate = (flow = 'vertical') => ({
  contentType: 'container',
  config: {
    flow,
  },
  content: [],
});

/**
 * helper function to generate module json
 */
const getModuleJsonTemplate = (type) => ({
  contentType: 'module',
  moduleType: type,
});

const reducer = (state, action) => {
  switch (action.type) {
    case 'dropItem': {
      const { id } = action.payload;

      const json =
        id === 'vertical container' || id === 'horizontal container'
          ? getContainerJsonTemplate(id.split(' ')[0]) // this gets vertical or horizontal
          : getModuleJsonTemplate(id);

      const newState = {
        ...state,
        json: {
          ...state.json,
          content: [...state.json.content, json],
        },
      };

      return { ...newState };
    }
    // this assumes a layout only two layers deep
    case 'appendContentToContainer': {
      const { id, position } = action.payload;

      const moduleTemplate = getModuleJsonTemplate(id);
      const container = state.json.content[position];

      // this handles the logic for the very first container
      if (position === 0) {
        return {
          ...state,
          json: {
            ...state.json,
            content: [
              {
                ...container,
                content: [...container.content, moduleTemplate],
              },
              ...state.json.content.slice(1),
            ],
          },
        };
      }

      // this builds the new state for other containers that aren't the very first
      const newState = {
        ...state,
        json: {
          ...state.json,
          content: [
            ...state.json.content.slice(0, position),
            {
              ...container,
              content: [...container.content, moduleTemplate],
            },
            ...state.json.content.slice(position + 1),
          ],
        },
      };

      return newState;
    }

    // probably can make this into just "reset"
    case 'updatePlatformType':
    case 'flush':
    case 'updatePageType':
      return getInitialState(action.pageType, action.platform);

    default:
      return state;
  }
};

const AppContext = React.createContext({});
export const useAppContext = () => {
  return React.useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  // kept these separate from the reducer for separation of concerns
  const [pageType, setPageType] = useState('home page');
  const [platform, setPlatform] = useState('desktop');
  // reducer only cares about building the json
  const [state, dispatch] = useReducer(
    reducer,
    getInitialState(pageType, platform)
  );

  return (
    <AppContext.Provider
      value={{ dispatch, state, pageType, setPageType, platform, setPlatform }}
    >
      {children}
    </AppContext.Provider>
  );
};
