import './App.scss';
import { FC, useEffect } from 'react';

// Components
import { Header } from '../Header/Header';
import { Tinder } from '../Tinder/Tinder';
import { fetchProducts } from '../../store/reducers/products';
import { useAppDispatch } from '../../hooks/store';

// window.localStorage.setItem('locale', 'ru');
// window.localStorage.setItem(
//   'cityMagentoId',
//   JSON.stringify({ data: '10', expiration: 604800, createdAt: 1748789961090 })
// );

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="app app_bg-left-top app_bg-center">
      <div className="app__content">
        <Header />
        <Tinder />
      </div>
      <div className="app__decor-fire-wrapper">
        <img
          className="app__decor-fire"
          src="https://www.technodom.kz/under/techno-tinder/decor-fire.png"
          alt=""
          width="214px"
          height="250px"
        />
      </div>
      <div className="app__decor-smile-wrapper">
        <img
          className="app__decor-smile"
          src="https://www.technodom.kz/under/techno-tinder/decor-smile.png"
          alt=""
          width="184px"
          height="184px"
        />
      </div>
    </div>
  );
};

export { App };

// https://www.technodom.kz/under/techno-tinder/
