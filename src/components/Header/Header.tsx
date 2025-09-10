import { type FunctionComponent } from "react";
import "./Header.scss";

const Header: FunctionComponent = () => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">Rick & Morty</div>
      </div>
    </header>
  );
};

export default Header;
