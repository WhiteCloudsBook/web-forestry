import React from "react";
import styled from "styled-components";
import Picture from "./Picture";
import { color } from "../theme";

const Banner = styled(Picture)` 
  display: block;
  
  img {
    width: 100%;
    max-height: 100%;
  }
`;

const Container = styled.div`
  width: 100%;
  position: relative;
`;

const BannerText = styled.span`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  left: 0;
  font-size: 36px;
  line-height: 40px;
  
  text-shadow: 4px 2px 12px ${color("brand", false)};
`;

export default ({ page, text, className, ...props }) => {
  return <Container>
    <Banner className={className}
            path={page.banner}
            extraTransformation={page.bannerTransformation}
            alt={page.title}
            height="300"
            {...props} />
    <BannerText>{text}</BannerText>
  </Container>;
};
