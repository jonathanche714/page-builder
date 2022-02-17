import styles from './index.module.scss';
import dynamic from 'next/dynamic';
import { useAppContext } from './context';
import { Canvas } from '../components/Canvas';
import { Pallete } from '../components/Pallete';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { MobileCanvas } from '../components/MobileCanvas';

const BrowserReactJsonView = dynamic(() => import('react-json-view'), {
  ssr: false,
});

const LandingPageBuilder = () => {
  const { state, dispatch, pageType, setPageType, platform, setPlatform } =
    useAppContext();

  const onChange = (e) => {
    const val = e.target.value;
    setPageType(val);
    dispatch({ type: 'updatePageType', pageType: val, platform });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <label>
        Choose a page and platform to build, currently building:{' '}
        <b>
          pageType {pageType}, platform: {platform}
        </b>
        <div style={{ paddingTop: 20 }}>
          <select onChange={onChange}>
            <option value={'home page'}>home page</option>
            <option value={'category page'}>category page</option>
            <option value={'product page'}>product page</option>
          </select>
        </div>
        <div style={{ paddingTop: 20 }}>
          <select
            onChange={(e) => {
              setPlatform(e.target.value);
              dispatch({
                type: 'updatePlatformType',
                platform: e.target.value,
                pageType,
              });
            }}
          >
            <option value={'desktop'}>desktop</option>
            <option value={'mobile'}>mobile</option>
          </select>
        </div>
      </label>
      <main className={styles.main}>
        {platform === 'mobile' ? <MobileCanvas /> : <Canvas />}
        <Pallete />
      </main>
      <div>
        <button
          style={{ height: 50, width: 200 }}
          onClick={() => {
            fetch('/api/layout', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(Object.assign({ platform }, state.json)),
            });
          }}
        >
          send to database
        </button>
      </div>
      {Object.keys(state.json).length > 0 && (
        <BrowserReactJsonView src={state.json} />
      )}
    </DndProvider>
  );
};

export default LandingPageBuilder;
