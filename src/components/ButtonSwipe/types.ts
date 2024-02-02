import { IHoverOnMouse } from '../../types';

export interface IProps {
  type: 'right' | 'left';
  handlerSwipe: (value: IHoverOnMouse) => void;
  hoverOnMouseOver: (value: IHoverOnMouse) => void;
  className?: string;
}
