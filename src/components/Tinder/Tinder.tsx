import './Tinder.scss';
import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';

// Components
import { Card } from '../Card/Card';

// Types
import { IHoverOnMouse } from '../../types';
import { ButtonSwipe } from '../ButtonSwipe/ButtonSwipe';
import { setStageAction, setSwipeIndexAction, setSwipeTypeAction } from '../../store/reducers/app';

const Tinder: FC = () => {
  const [index, setIndex] = useState(0);
  const [typeHover, setTypeHover] = useState<IHoverOnMouse>(null);

  const handlerAnimate = (typeBlock: string) => {
    if (typeHover === 'right' && typeBlock === 'right') {
      return 'scale-small';
    }
    if (typeHover === 'left' && typeBlock === 'left') {
      return 'scale-small';
    }
    if (typeHover === 'left' && typeBlock === 'right') {
      return 'unscale';
    }
    if (typeHover === 'right' && typeBlock === 'left') {
      return 'unscale';
    }

    return '';
  };

  const hoverOnMouseOver = (type: IHoverOnMouse) => {
    setTypeHover(type);
  };

  const dispatch = useDispatch();

  const handlerSwipe = (value: IHoverOnMouse) => {
    if (value === 'right') {
      dispatch(setStageAction('view'));
    } else {
      dispatch(setSwipeTypeAction(value));
      dispatch(setSwipeIndexAction(index));
    }
  };

  return (
    <div className="tinder">
      <div className="tinder__control">
        <ButtonSwipe type="left" handlerSwipe={handlerSwipe} hoverOnMouseOver={hoverOnMouseOver} />
        <div className="tinder__wrapper-inner-card">
          <div className={`tinder__inner-card hover-target-element hover-rotate-animate-${typeHover}`}>
            <motion.div style={{ position: 'relative' }}>
              <AnimatePresence initial={false}>
                <Card key={index + 1} frontCard={false} />
                <Card key={index} frontCard index={index} setIndex={setIndex} drag={false} />
              </AnimatePresence>
            </motion.div>
          </div>
          <div className="tinder__dislike">
            <img
              className={`tinder__image ${handlerAnimate('left')}`}
              src="https://www.technodom.kz/under/techno-tinder/sticker-dislike.png"
              alt=""
            />
          </div>

          <div className="tinder__like">
            <img
              className={`tinder__image ${handlerAnimate('right')}`}
              src="https://www.technodom.kz/under/techno-tinder/sticker-like.png"
              alt=""
            />
          </div>
        </div>
        <ButtonSwipe type="right" handlerSwipe={handlerSwipe} hoverOnMouseOver={hoverOnMouseOver} />
      </div>
    </div>
  );
};

export { Tinder };
