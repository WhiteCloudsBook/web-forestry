import React from "react";
import styled, { } from "styled-components";
import { color } from "../theme";
import useSiteMetadata from "./useSiteMetadata";
import Image from "./Image";

const AuthorImage = styled(Image)`
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    border-radius: 50%;
    box-shadow: 0 2px 2px ${color("brand-dark", false)};
    opacity: ${({ opacity }) => opacity};
    
    &:hover {
     opacity: 1;
    }
`;

const AuthorPhoto = ({ className, size = 40, opacity = 0.5 }) => {
  const { authorPhoto } = useSiteMetadata();

  return <AuthorImage className={className} size={size} opacity={opacity} path={authorPhoto}/>;
};

export default styled(AuthorPhoto)``;