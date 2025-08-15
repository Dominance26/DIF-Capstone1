import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="Navbar">
      <div className="Navbar-logo">
        <Link to="/">
          <img src="/logo192.png" alt="DIF Logo" />
        </Link>
      </div>

      <ul className="Navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/search">Search</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/ordersummary">orders</Link></li>
        <li><Link to="/Register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
