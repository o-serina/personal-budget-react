import React from 'react';
import { Link } from "react-router-dom";


function Menu() {
  return (
    <nav className="menu" aria-label="Main Navigation">
        <ul>
          <li>
            <Link itemProp="url" to="/">
              {" "}
              Home{" "}
            </Link>
          </li>
          <li>
            <Link itemProp="url" to="/about">
              {" "}
              About{" "}
            </Link>
          </li>
          <li>
            <Link itemProp="url" to="/login">
              {" "}
              Login{" "}
            </Link>
          </li>
        </ul>
      </nav>
  );
}

export default Menu;
