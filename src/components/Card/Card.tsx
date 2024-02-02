import './Card.scss';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { useAppSelector } from '../../hooks/store';

const Card = (props: any) => {
  const { setIndex, index = 0, drag, frontCard, products } = props;
  const [exitX, setExitX] = useState(0);
  const { swipeType, swipeIndex } = useAppSelector((state) => state.app);

  const x = useMotionValue(0);
  const scale = useTransform(x, [-484, 0, 484], [0.5, 1, 0.5]);
  const rotate = useTransform(x, [-484, 0, 484], [-45, 0, 45], {
    clamp: false,
  });

  const variantsFrontCard = {
    animate: { scale: 1, y: 0, opacity: 1, transition: { duration: 0.8 } },
    exit: (custom: any) => ({
      x: custom,
      opacity: 0,
      scale: 0.5,
      transition: { duration: 0.7 },
    }),
  };
  const variantsBackCard = {
    initial: { scale: 0, y: 105, opacity: 1 },
    animate: { scale: 0.75, y: 30, opacity: 1 },
  };

  function handleDragEnd(_: any, info: PanInfo): void {
    if (info.offset.x < -100) {
      setExitX(-250);
      setIndex(index + 1);
    }
    if (info.offset.x > 100) {
      setExitX(250);
      setIndex(index + 1);
    }
  }

  useEffect(() => {
    if (swipeType && setIndex) {
      if (swipeType === 'left') {
        setExitX(-250);
        setIndex(index + 1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swipeType, swipeIndex]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: 0,
        x,
        rotate,
        cursor: 'grab',
      }}
      whileTap={{ cursor: 'grabbing' }}
      // Dragging
      drag={drag}
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      onDragEnd={handleDragEnd}
      // Animation
      variants={frontCard ? variantsFrontCard : variantsBackCard}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={exitX}
      transition={
        frontCard
          ? { type: 'spring', stiffness: 300, damping: 20 }
          : { scale: { duration: 2.2 }, opacity: { duration: 2.4 } }
      }
    >
      <motion.div>
        <div className="card">
          <div className="card__place">
            <img className="card__image" src={products[index].image} alt="" />
          </div>

          <p className="card__text">{products[index].title}</p>

          <div className="card__footer">
            <p className="card__text-price">цена по промокоду:</p>
            <div className="card__wrapper-price">
              <p className="card__price">
                <span>{products[index].newPrice}</span> ₸
              </p>
              <p className="card__old-price">
                <span>{products[index].oldPrice}</span> ₸
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export { Card };
