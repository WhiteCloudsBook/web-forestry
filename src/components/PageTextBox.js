import React from "react";
import styled, { css } from "styled-components";
import { color } from "../theme";
import useSiteMetadata from "./useSiteMetadata";

const widthCss = css`
  width: 80%;
  max-width: 600px;
  min-width: 400px;
`;

const Box = styled.div`
  ${({ image }) => `background: url("${image}") no-repeat;`}
  background-size: cover;
  margin: 20px 0;
  height: 200px;    
  ${({ link }) => !link && widthCss}
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
`;

const Link = styled.a`
  ${widthCss}
`;

const renderBox = ({ text, image, link }) => {
  return <Box image={image} link={!!link}>
    <Text>{text}</Text>
  </Box>;
};

export default (props) => {
  const { cloudinaryBase } = useSiteMetadata();
  const { link } = props;
  let { image } = props;

  if (!image.startsWith("http")) {
    image = `${cloudinaryBase}${image}`;
  }

  return link ?
    <Link href={link} target="_blank" rel="noreferrer">{renderBox({ ...props, image })}</Link> :
    renderBox({ ...props, image });
};