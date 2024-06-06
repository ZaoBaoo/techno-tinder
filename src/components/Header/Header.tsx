import './Header.scss';
import { FC } from 'react';

const Header: FC = () => {
  return (
    <div className="header">
      <picture>
        <source
          srcSet="https://www.technodom.kz/under/techno-tinder/header-title-m.svg"
          media="(max-width: 700px)"
          width="248px"
          height="30px"
        />
        <img
          className="header__image"
          src="https://www.technodom.kz/under/techno-tinder/header-title.svg"
          alt="header"
          width="400px"
          height="50px"
        />
      </picture>

      <h1 className="header__title">
        Выбирай себе пару и забирай <br /> промокод со скидкой!
      </h1>
    </div>
  );
};

export { Header };
