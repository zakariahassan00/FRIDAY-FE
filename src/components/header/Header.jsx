import React from "react";
import { Link } from "react-router-dom";
import './header.scss'

const Header = () => {
  return <div className="header">
    <div className="header__brand">
      <Link to="/">
        <h2>FRI:DAY</h2>
      </Link>
      </div>
  </div>;
};

export default Header;
