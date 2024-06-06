import './Tinder.scss';
import { FC, useEffect, useState } from 'react';
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

import { fetchProducts, setIsRepeatedRequest } from '../../store/reducers/products';

const Tinder: FC = () => {
  const [index, setIndex] = useState(0);
  const [typeHover, setTypeHover] = useState<IHoverOnMouse>(null);
  const [isLoaderView, setIsLoaderView] = useState(true);
  const [startMatchAnimate, setStartMatchAnimate] = useState(false);
  const [isShowTips, setIsShowTips] = useState(true);
  const [isDragActive, setIsDragActive] = useState(true);
  const [isBlurActive, setIsBlurActive] = useState(false);

  const { stage } = useAppSelector((state) => state.app);
  const { isProductsRequest, isRepeatedRequest, products } = useAppSelector((state) => state.products);

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

  const disableTooltips = () => {
    setIsShowTips(false);
  };

  const hoverOnMouseOver = (type: IHoverOnMouse) => {
    setTypeHover(type);
  };

  const handlerMatch = () => {
    dispatch(setStageAction('view'));
    setStartMatchAnimate(false);
  };

  const setBlur = (value: boolean) => {
    setIsBlurActive(value);
  };

  const handlerSwipe = (value: IHoverOnMouse) => {
    if (value === 'right') {
      setStartMatchAnimate(true);
      hoverOnMouseOver(null);
      if (window.innerWidth < 700) {
        setBlur(true);
      }
    } else {
      dispatch(setSwipeTypeAction(value));
      dispatch(setSwipeIndexAction(index));
    }
  };

  const handlerSwitchStage = (value: IStage) => {
    dispatch(setStageAction(value));
  };

  useEffect(() => {
    if (index > products.length - 8) {
      dispatch(setIsRepeatedRequest(true));
      dispatch(fetchProducts());
    }
  }, [index, products, dispatch]);

  useEffect(() => {
    setBlur(false);
  }, [stage]);

  useEffect(() => {
    setIsDragActive(window.innerWidth < 1000);

    if (isRepeatedRequest) {
      setIsDragActive(false);
    } else {
      setIsDragActive(true);
    }
  }, [isRepeatedRequest]);

  return (
    <div className="tinder">
      <LoaderTinder isLoaderView={isLoaderView} />
      <picture>
        <source srcSet="https://www.technodom.kz/under/techno-tinder/match-mobile.png" media="(max-width: 700px)" />
        <img
          className={`tinder__match ${startMatchAnimate && 'tinder__match_animate'}`}
          src="https://www.technodom.kz/under/techno-tinder/match.png"
          alt=""
          onAnimationEnd={handlerMatch}
        />
      </picture>

      {isProductsRequest || (
        <div className="tinder__control" style={{ opacity: isLoaderView ? '0' : '1' }}>
          <ButtonSwipe
            type="left"
            handlerSwipe={handlerSwipe}
            hoverOnMouseOver={hoverOnMouseOver}
            className={stage === 'swipe' ? 'fadeIn' : 'fadeOut'}
            disabled={isRepeatedRequest}
          />

          <div
            className={`tinder__wrapper-inner-card ${
              stage === 'swipe' ? 'tinder__wrapper-inner-card_default' : 'tinder__wrapper-inner-card_absolute'
            }`}
            onAnimationEnd={() => setIsLoaderView(false)}
          >
            <div className={`tinder__inner-card hover-target-element hover-rotate-animate-${typeHover}`}>
              <motion.div style={{ position: 'relative' }}>
                <AnimatePresence initial={false}>
                  <Card key={index + 1} frontCard={false} products={products} index={index + 1} />
                  <Card
                    key={index}
                    frontCard
                    index={index}
                    setIndex={setIndex}
                    drag={window.innerWidth < 1000 && !isRepeatedRequest}
                    products={products}
                    handlerSwipe={handlerSwipe}
                    className={isShowTips ? 'jump' : ''}
                    disableTooltips={disableTooltips}
                    isBlurActive={isBlurActive}
                    setBlur={setBlur}
                  />
                </AnimatePresence>
              </motion.div>
            </div>
            <img
              className={`tinder__decor tinder__decor_right ${stage === 'swipe' ? 'fadeIn' : 'fadeOut'}`}
              src="https://www.technodom.kz/under/techno-tinder/sticker-like-m.png"
              alt=""
            />
            <img
              className={`tinder__decor tinder__decor_left ${stage === 'swipe' ? 'fadeIn' : 'fadeOut'}`}
              src="https://www.technodom.kz/under/techno-tinder/sticker-dislike-m.png"
              alt=""
            />
            <div className={`tinder__dislike ${stage === 'swipe' ? 'fadeIn' : 'fadeOut'}`}>
              <img
                className={`tinder__image ${handlerAnimate('left')}`}
                src="https://www.technodom.kz/under/techno-tinder/sticker-dislike.png"
                alt=""
              />
            </div>

            <div className={`tinder__like ${stage === 'swipe' ? 'fadeIn' : 'fadeOut'}`}>
              <img
                className={`tinder__image ${handlerAnimate('right')}`}
                src="https://www.technodom.kz/under/techno-tinder/sticker-like.png"
                alt=""
              />
            </div>
          </div>

          <PromocodeView
            // className={stage === 'swipe' ? 'fadeOut' : 'fadeIn'}
            className={stage === 'swipe' ? 'fadeOutPromocodeView' : 'fadeInPromocodeView'}
            handlerSwitchStage={handlerSwitchStage}
            activeProduct={products[index || 0]}
            products={products}
            index={index}
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
