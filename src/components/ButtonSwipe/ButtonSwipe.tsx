import './ButtonSwipe.scss';
import { FC } from 'react';

// Types
import { IProps } from './types';

const ButtonSwipe: FC<IProps> = ({ type, handlerSwipe, hoverOnMouseOver, className = '' }) => {
  return (
    <button
      className={`buttonSwiper buttonSwiper_${type} ${className}`}
      onClick={() => handlerSwipe(type)}
      onMouseOver={() => hoverOnMouseOver(type)}
      onMouseLeave={() => hoverOnMouseOver(null)}
    />
  );
};

export { ButtonSwipe };
