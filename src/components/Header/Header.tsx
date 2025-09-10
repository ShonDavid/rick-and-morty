import { type FunctionComponent } from "react";
import RickAndMortyIcon from "../../assets/icon.svg?react";
import "./Header.scss";

const Header: FunctionComponent = () => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <RickAndMortyIcon className="header__icon" />
          <span>Rick & Morty</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
