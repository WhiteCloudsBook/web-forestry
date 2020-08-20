import React from "react";
import styled from "styled-components";
import { FacebookOption, Twitter } from "grommet-icons";
import { pageWidthCss } from "../common/styles";
import useSiteMetadata from "./useSiteMetadata";

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  ${pageWidthCss}
  margin: 10px 0;
`;

const ICONS = {
  // "youtube": Youtube,
  "twitter": Twitter,
  // "instagram": Instagram,
  "facebook": FacebookOption,
};

const SERVICES = {
  "facebook": "facebookPageUrl",
  "twitter": "twitterUserUrl",
};

export default ({ className }) => {
  const siteMetadata = useSiteMetadata();

  return <Container className={className}>
    {Object.entries(SERVICES).map(([name, config]) => {
      const Icon = ICONS[name];

      console.log("!!!!!!!! ", siteMetadata);
      return <a key={config} target="_blank" href={siteMetadata[config]} rel="noopener noreferrer">
        <Icon color="white" />
      </a>;
    })}
  </Container>;
};
