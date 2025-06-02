import './ButtonSwipe.scss';
import { FC, useEffect, useState } from 'react';

// Types
import { IProps } from './types';

const ButtonSwipe: FC<IProps> = ({ type, handlerSwipe, hoverOnMouseOver, className = '', disabled = false }) => {
  const [isButtonActive, setIsButtonActive] = useState(true);

  const handlerClick = () => {
    handlerSwipe(type);
    setIsButtonActive(false);

    setTimeout(() => {
      setIsButtonActive(true);
    }, 500);
  };

  return (
    <button
      disabled={disabled || !isButtonActive}
      className={`buttonSwiper buttonSwiper_${type} ${className}`}
      onClick={handlerClick}
      onMouseOver={() => hoverOnMouseOver(type)}
      onMouseLeave={() => hoverOnMouseOver(null)}
      style={{ willChange: 'transform' }}
    />
  );
};

export { ButtonSwipe };
