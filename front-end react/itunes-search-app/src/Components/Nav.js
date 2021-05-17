import React, { Component } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <h4 className="main-label">Itunes Search</h4>
      <h5 className="made-by"> Made by Sharon Pais</h5>
      <ul className="nav-links">
        <Link to="/topten">
          <li>Top10</li>
        </Link>
        <Link to="/search">
          <li>Search</li>
        </Link>
        <Link to="about">
          <li>About</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;
