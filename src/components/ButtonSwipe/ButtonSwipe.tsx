import { FC } from 'react';

// Types
import { IProps } from './types';

const ButtonSwipe: FC<IProps> = ({ type, handlerSwipe, hoverOnMouseOver }) => {
  return (
    <button
      className={`tinder__button tinder__button_${type}`}
      onClick={() => handlerSwipe(type)}
      onMouseOver={() => hoverOnMouseOver(type)}
      onMouseLeave={() => hoverOnMouseOver(null)}
    />
  );
};

export { ButtonSwipe };
