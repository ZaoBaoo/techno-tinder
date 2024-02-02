import './PromocodeView.scss';
import { FC, useState } from 'react';
import { IPromocodeView } from './types';

const PromocodeView: FC<IPromocodeView> = ({ className, handlerSwitchStage, activeProduct }) => {
  const [isButtonCopy, setIsButtonCopy] = useState(false);

  const handlerButtonCopy = () => {
    setIsButtonCopy(true);

    setTimeout(() => {
      setIsButtonCopy(false);
    }, 3000);
  };

  return (
    <div className={`promocodeView ${className}`}>
      <h2 className="promocodeView__title">твой промокод:</h2>

      <div className="promocodeView__place">
        <p className="promocodeView__inner">{activeProduct.promocode}</p>
        <button
          className={`promocodeView__button ${isButtonCopy ? 'promocodeView__button_copy' : ''}`}
          onClick={handlerButtonCopy}
        >
          {isButtonCopy ? 'Скопировано!' : 'Скопировать'}
        </button>
      </div>
      <a className="promocodeView__link" href="#">
        К товару
      </a>

      <button className="promocodeView__back" onClick={() => handlerSwitchStage('swipe')}>
        Искать новую пару
      </button>
    </div>
  );
};

export { PromocodeView };
