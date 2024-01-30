import './App.scss';
import { FC } from 'react';

// Components
import { Header } from '../Header/Header';
import { Tinder } from '../Tinder/Tinder';

const App: FC = () => {
  return (
    <div className="app">
      <div className="app__content">
        <Header />
        <Tinder />
      </div>
    </div>
  );
};

export { App };

// https://www.technodom.kz/under/techno-tinder/
