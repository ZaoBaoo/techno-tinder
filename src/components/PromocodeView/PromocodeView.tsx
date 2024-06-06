import './PromocodeView.scss';
import { FC, useEffect, useState } from 'react';
import { IPromocodeView } from './types';
import formatNumber from '../../utils/formatNumber';
import { IProduct } from '../../types';

const PromocodeView: FC<IPromocodeView> = ({ className, handlerSwitchStage, activeProduct, products, index }) => {
  const [isButtonCopy, setIsButtonCopy] = useState(false);
  const [product, setProduct] = useState<IProduct>();

  const handlerButtonCopy = () => {
    let promocode;

    if (window.innerWidth > 1000) {
      promocode = products[index].promocode;
    } else {
      promocode = products[index - 1].promocode;
    }

    navigator.clipboard.writeText(promocode).then(() => {
      setIsButtonCopy(true);
    });

    if ('TechnoAndroid' in window) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.TechnoAndroid.copyToClipboard(promocode);
      setIsButtonCopy(true);
      return;
    }

    setTimeout(() => {
      setIsButtonCopy(false);
    }, 3000);
  };

  useEffect(() => {
    if (products) {
      if (window.innerWidth > 1000) {
        setProduct(products[index]);
      } else {
        setProduct(products[index - 1]);
      }
    }
  }, [products, index]);

  return (
    <div className={`promocodeView ${className}`}>
      <div className="promocodeView__product-mob">
        <img className="promocodeView__product-mob-image" src={product?.image} alt="" width="103px" height="103px" />
        <div className="promocodeView__product-mob-wrapper">
          <p className="promocodeView__product-mob-title">{product?.title}</p>
          <div className="promocodeView__product-mob-wrapper-text">
            <p className="promocodeView__product-mob-new-price">
              <span>{formatNumber(product?.newPrice)}</span> ₸
            </p>
            <p className="promocodeView__product-mob-old-price">
              <span>{formatNumber(product?.oldPrice)}</span> ₸
            </p>
          </div>
        </div>
      </div>
      <div className="promocodeView__content">
        <h2 className="promocodeView__title">твой промокод:</h2>
        <div className="promocodeView__place">
          <p className="promocodeView__title-mob">твой промокод:</p>
          <p className="promocodeView__inner">{product?.promocode}</p>
          <button
            className={`promocodeView__button ${isButtonCopy ? 'promocodeView__button_copy' : ''}`}
            onClick={handlerButtonCopy}
          >
            {isButtonCopy ? 'Скопировано!' : 'Скопировать'}
          </button>
        </div>
        <a
          className="promocodeView__link"
          href={`https://www.technodom.kz/p/${product?.uri}`}
          target="_blank"
          rel="noreferrer"
        >
          К товару
        </a>

        <button className="promocodeView__back" onClick={() => handlerSwitchStage('swipe')}>
          Искать новую пару
        </button>
      </div>
    </div>
  );
};

export { PromocodeView };
