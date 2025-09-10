import React from "react";
import "./Footer.scss";

const Footer: FunctionComponent = () => {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        &copy; 2024 Rick & Morty App. All rights reserved.
      </p>
      <p className="footer__powered-by">
        Built with React, TypeScript, and Vite. Powered by The Rick and Morty
        API
      </p>
      <p className="footer__made-by">Made by Shon David</p>
    </footer>
  );
};

export default Footer;
