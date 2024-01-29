import { FC } from 'react';
import style from './App.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { setIsPopupOpenAction } from '../../store/reducers/popup';

const App: FC = () => {
  const { isPopupOpen, popupType } = useAppSelector((state) => state.popupData);
  const dispatch = useAppDispatch();

  const handlerOpenPopup = () => {
    dispatch(setIsPopupOpenAction(true));
  };
  return (
    <>
      <div className={style.app}>Main</div>
      <div>Popup status: {isPopupOpen ? 'true' : 'false'}</div>
      <button type="button" onClick={handlerOpenPopup}>
        click
      </button>
    </>
  );
};

export { App };
