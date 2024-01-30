import './Tinder.scss';
import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';

// Components
import { Card } from '../Card/Card';
import { setSwipeIndexAction, setSwipeTypeAction } from '../../store/reducers/popup';

const Tinder: FC = () => {
  const [index, setIndex] = useState(0);

  const dispatch = useDispatch();

  const handlerSwipeRight = () => {
    dispatch(setSwipeTypeAction('right'));
    dispatch(setSwipeIndexAction(index));
  };

  const handlerSwipeLeft = () => {
    dispatch(setSwipeTypeAction('left'));
    dispatch(setSwipeIndexAction(index));
  };

  return (
    <div className="tinder">
      <div className="tinder__control">
        <button className="tinder__button tinder__button_cancel" onClick={handlerSwipeLeft} />
        <div className="tinder__inner-card">
          <motion.div style={{ position: 'relative' }}>
            <AnimatePresence initial={false}>
              <Card key={index + 1} frontCard={false} />
              <Card key={index} frontCard index={index} setIndex={setIndex} drag={false} />
            </AnimatePresence>
          </motion.div>

          <img
            className="tinder__dislike"
            src="https://www.technodom.kz/under/techno-tinder/sticker-dislike.png"
            alt=""
          />

          <img className="tinder__like" src="https://www.technodom.kz/under/techno-tinder/sticker-like.png" alt="" />
        </div>
        <button className="tinder__button tinder__button_like" onClick={handlerSwipeRight} />
      </div>
    </div>
  );
};

export { Tinder };
