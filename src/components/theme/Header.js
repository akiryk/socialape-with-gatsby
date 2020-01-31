import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const H1 = styled.h1`
  font-weight: 400;
  font-size: 18px;
  letter-spacing: 2px;
`;

const Button = styled.button`
  border: 0;
  outline: 0;
  padding: 0;
  cursor: pointer;
  &:hover {
    color: blue;
  }
`;

const Header = ({ siteTitle, isLoggedIn, logout }) => (
  <header>
    <H1>
      <Link to="/">{siteTitle}</Link>
    </H1>
    <nav>
      <ul>
        <li>
          <Link to="/app/login">Log in</Link>
        </li>
        <li>
          <Link to="/app/register">Sign up</Link>
        </li>
        <li>
          <Link to="/app/screams">Screams</Link>
        </li>
        <li>
          <Link to="/app/add-scream">Create Scream</Link>
        </li>
        {isLoggedIn && (
          <Button type="submit" onClick={logout}>
            Logout
          </Button>
        )}
      </ul>
    </nav>
  </header>
);

export default Header;
