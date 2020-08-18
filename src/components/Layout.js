import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import { Grommet } from "grommet";
import useSiteMetadata from "./useSiteMetadata";
import Footer from "./Footer";
// import Navbar from "../NavBar/Navbar";
import GlobalStyles from "./GlobalStyles";
import OpenGraph from "./OpenGraph";
// import SocialFollowUs from "../SocialFollowUs/SocialFollowUs";
// import NotificationProvider from "../Notifications/NotificationProvider";
import theme, { color } from "../theme.js";

export const Main = styled.main`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  ${color("main-bg", "background-color")}
  box-shadow: 0px 5px 10px 0px ${color("border.light", false)};
`;

const Layout = (props) => {

  console.log("!!!! RENDERING PAGE LAYOUT - ", props);

  const { title, description } = useSiteMetadata();

  const titleTemplate = props.titleTemplateOverride ?
    props.titleTemplateOverride :
    `${props.titleTemplate ? props.titleTemplate : "%s"} | ${title}`;

  return (
    <Grommet theme={theme}>
      <GlobalStyles />
      <div>
        <Helmet titleTemplate={titleTemplate}>
          <title>{`${props.title} - ${title}`}</title>

          <link rel="preconnect" href="https://www.google-analytics.com" crossorigin="use-credentials" />
          {/*<link rel="preconnect" href="https://adservice.google.com" crossorigin="use-credentials" />*/}
          <link rel="preconnect" href="https://www.googletagmanager.com" crossorigin="use-credentials" />

          <meta name="description" content={props.description || description} />

          <meta name="apple-mobile-web-app-capable" content="no" />
          <meta name="mobile-web-app-capable" content="yes" />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="https://res.cloudinary.com/whiteclouds/image/upload/w_180/v1558535359/cover/cover-eye.jpg"
          />
          <link
            rel="apple-touch-icon"
            sizes="192x192"
            href="https://res.cloudinary.com/whiteclouds/image/upload/w_192/v1558535359/cover/cover-eye.jpg"
          />
          <link
            rel="icon"
            type="image/png"
            href="https://res.cloudinary.com/whiteclouds/image/upload/w_192/v1558535359/cover/cover-eye.jpg"
            sizes="192x192"
          />
          <link
            rel="icon"
            type="image/png"
            href="https://res.cloudinary.com/whiteclouds/image/upload/w_92/v1558535359/cover/cover-eye.jpg"
            sizes="92x92"
          />
          <link
            rel="icon"
            type="image/png"
            href="https://res.cloudinary.com/whiteclouds/image/upload/w_64/v1558535359/cover/cover-eye.jpg"
            sizes="64x64"
          />
          <link
            rel="icon"
            type="image/png"
            href="https://res.cloudinary.com/whiteclouds/image/upload/w_32/v1558535359/cover/cover-eye.jpg"
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href="https://res.cloudinary.com/whiteclouds/image/upload/w_16/v1558535359/cover/cover-eye.jpg"
            sizes="16x16"
          />

          <link
            rel="mask-icon"
            href="https://res.cloudinary.com/whiteclouds/image/upload/w_92/v1558535359/cover/cover-eye.jpg"
            color="#ff4400"
          />

          <meta name="theme-color" content="#22d640" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="apple-mobile-web-app-status-bar-style" content="#22d640" />

          <link href="https://fonts.googleapis.com/css?family=Amatic+SC:400,700|Frank+Ruhl+Libre:400,700&display=swap" rel="stylesheet" />

          <link href="/manifest.json" rel="manifest" />
        </Helmet>
        <OpenGraph tags={props.ogTags} />

        <Main>
            {props.children}
        </Main>
        <Footer />
      </div>
    </Grommet>
  );
};

export default Layout;








// import React from "react"
// import Header from "./Header"
// import Helmet from "react-helmet"
// import useSiteMetadata from "../static_queries/useSiteMetadata"
// import layoutStyles from "../styles/components/layout.module.scss"
//
// export default function Layout(props) {
//   const { title, description } = useSiteMetadata()
//   return (
//     <section
//       className={`${layoutStyles.layout} ${
//         props.page === "info" &&
//         layoutStyles.info_page}`}
//       style={{
//         backgroundColor: props.bgColor,
//       }}
//     >
//       <Helmet>
//         <html lang="en" />
//         <title>{title}</title>
//         <meta name="description" content={description} />
//       </Helmet>
//       <Header page={props.page} title={title} />
//       <div className={layoutStyles.content}>{props.children}</div>
//     </section>
//   )
// }