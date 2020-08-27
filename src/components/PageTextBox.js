import React from "react";
import styled from "styled-components";
import { color } from "../theme";
import { pageBoxShadow, pageWidthCss } from "../common/styles";
import Image from "./Image";

const Box = styled.div`
  position: relative;  
  background-size: cover;
  margin: 20px 0;
  overflow: hidden;
  min-height: 200px;
  
  ${({ link }) => !link && pageWidthCss}
  
  ${pageBoxShadow}
`;

const Text = styled.div`
  font-size: 32px;
  ${color("white")}
  max-width: 235px;
  line-height: 38px;
  text-align: center;
  background-color: #46464673;
  height: 100%;
  display: flex;
  align-items: center;
  position: absolute;
`;

const Link = styled.a`
  ${pageWidthCss}
`;

const StyledImage = styled(Image)`
   position: absolute;
 `;

const renderBox = ({ text, image, link }) => {
  return <Box link={!!link}>
    <StyledImage path={image} sizes={{
      "(max-width: 900px)": "600",
      "(min-width: 900px)": "900",
    }} />
    <Text>{text}</Text>
  </Box>;
};

export default (props) => {
  const { link } = props;
  let { image } = props;

  return link ?
    <Link href={link} target="_blank" rel="noreferrer">{renderBox({ ...props, image })}</Link> :
    renderBox({ ...props, image });
};