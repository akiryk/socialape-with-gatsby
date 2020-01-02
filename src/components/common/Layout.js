import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Header from 'components/theme/Header';

const Layout = ({ children, isLoggedIn, logout }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );

  return (
    <>
      <Header
        siteTitle={site.siteMetadata.title}
        isLoggedIn={isLoggedIn}
        logout={logout}
      />
      <main>{children}</main>
    </>
  );
};

export default Layout;
