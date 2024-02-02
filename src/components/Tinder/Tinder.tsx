import './Tinder.scss';
import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { setStageAction, setSwipeIndexAction, setSwipeTypeAction } from '../../store/reducers/app';
import { useAppDispatch, useAppSelector } from '../../hooks/store';

// Types
import type { IHoverOnMouse, IStage } from '../../types';

// Components
import { Card } from '../Card/Card';
import { ButtonSwipe } from '../ButtonSwipe/ButtonSwipe';
import { PromocodeView } from '../PromocodeView/PromocodeView';
import { LoaderTinder } from '../LoaderTinder/LoaderTinder';

const Tinder: FC = () => {
  const [index, setIndex] = useState(0);
  const [typeHover, setTypeHover] = useState<IHoverOnMouse>(null);
  const [isLoaderView, setIsLoaderView] = useState(true);

  const { stage } = useAppSelector((state) => state.app);
  const { isProductsRequest, products } = useAppSelector((state) => state.products);

  const dispatch = useAppDispatch();

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

  const handlerSwipe = (value: IHoverOnMouse) => {
    if (value === 'right') {
      dispatch(setStageAction('view'));
      hoverOnMouseOver(null);
    } else {
      dispatch(setSwipeTypeAction(value));
      dispatch(setSwipeIndexAction(index));
    }
  };

  const handlerSwitchStage = (value: IStage) => {
    dispatch(setStageAction('swipe'));
  };

  return (
    <div className="tinder">
      <LoaderTinder isLoaderView={isLoaderView} />
      {isProductsRequest || (
        <div className="tinder__control" style={{ opacity: isLoaderView ? '0' : '1' }}>
          <ButtonSwipe
            type="left"
            handlerSwipe={handlerSwipe}
            hoverOnMouseOver={hoverOnMouseOver}
            className={stage === 'swipe' ? 'fadeIn' : 'fadeOut'}
          />

          <div
            className={`tinder__wrapper-inner-card ${
              stage === 'swipe' ? 'tinder__wrapper-inner-card_default' : 'tinder__wrapper-inner-card_absolute'
            }`}
          >
            <div className={`tinder__inner-card hover-target-element hover-rotate-animate-${typeHover}`}>
              <motion.div style={{ position: 'relative' }}>
                <AnimatePresence initial={false}>
                  <Card key={index + 1} frontCard={false} products={products} />
                  <Card
                    key={index}
                    frontCard
                    index={index}
                    setIndex={setIndex}
                    drag={window.innerWidth < 1000}
                    products={products}
                  />
                </AnimatePresence>
              </motion.div>
            </div>
            <div className={`tinder__dislike ${stage === 'swipe' ? 'fadeIn' : 'fadeOut'}`}>
              <img
                className={`tinder__image ${handlerAnimate('left')}`}
                src="https://www.technodom.kz/under/techno-tinder/sticker-dislike.png"
                alt=""
              />
            </div>

            <div
              className={`tinder__like ${stage === 'swipe' ? 'fadeIn' : 'fadeOut'}`}
              onAnimationEnd={() => setIsLoaderView(false)}
            >
              <img
                className={`tinder__image ${handlerAnimate('right')}`}
                src="https://www.technodom.kz/under/techno-tinder/sticker-like.png"
                alt=""
              />
            </div>
          </div>

          <PromocodeView
            className={stage === 'swipe' ? 'fadeOut' : 'fadeIn'}
            handlerSwitchStage={handlerSwitchStage}
            activeProduct={products[index || 0]}
          />

          <ButtonSwipe
            type="right"
            handlerSwipe={handlerSwipe}
            hoverOnMouseOver={hoverOnMouseOver}
            className={stage === 'swipe' ? 'fadeIn' : 'fadeOut'}
          />
        </div>
      )}
    </div>
  );
};

export { Tinder };
