import './App.scss';
import { FC, useEffect, useState } from 'react';
import Confetti from 'react-confetti';

// Components
import { Header } from '../Header/Header';
import { Tinder } from '../Tinder/Tinder';
import { fetchProducts } from '../../store/reducers/products';
import { useAppDispatch, useAppSelector } from '../../hooks/store';

const App: FC = () => {
  const [runConfetti, setRunConfetti] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const confettiConfig = {
    width: window.innerWidth,
    height: window.innerHeight,
    recycle: false,
    gravity: 0.5,
    wind: -1,
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     setRunConfetti(true);
  //   }, 2000);
  // }, []);

  return (
    <div className="app">
      <div className="app__content">
        <Header />
        <Tinder />
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          confettiSource={{
            w: 1,
            h: 1,
            x: window.innerWidth / 2,
            y: window.innerHeight,
          }}
          numberOfPieces={200}
          recycle={false}
          run={runConfetti}
          initialVelocityX={10}
          initialVelocityY={20}
        />
      </div>
    </div>
  );
};

export { App };

// https://www.technodom.kz/under/techno-tinder/
