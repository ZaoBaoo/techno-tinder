import { IProduct, IStage } from '../../types';

export interface IPromocodeView {
  className?: string;
  handlerSwitchStage: (value: IStage) => void;
  activeProduct: IProduct;
}
