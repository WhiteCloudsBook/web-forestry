import React from "react";
import styled from "styled-components";
import { color } from "../theme";
import useSiteMetadata from "./useSiteMetadata";
import Image from "./Image";

const AuthorImage = styled(Image)`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0 2px 2px ${color("brand-dark", false)};
    opacity: 0.5;
    
    &:hover {
     opacity: 1;
    }
`;

export default () => {
  const { authorPhoto } = useSiteMetadata();

  return <AuthorImage path={authorPhoto}/>;
};