import React from "react";
import styled from "styled-components";
import { color } from "../theme";
import useSiteMetadata from "./useSiteMetadata";
import Image from "./Image";
import { pageWidthCss } from "../common/styles";

const AuthorWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  
  ${pageWidthCss}
`;

const AuthorText = styled.p`
  font-size: 12px;
  font-weight: bold;
  font-style: italic;
  margin-right: 10px
`;

const AuthorImage = styled(Image)`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0 2px 2px ${color("brand-dark", false)};
`;

export default ({ name }) => {
  const { authorPhoto } = useSiteMetadata();

  return <AuthorWrapper>
    <AuthorText>Posted by {name}</AuthorText>
    <AuthorImage path={authorPhoto}/>
  </AuthorWrapper>;
};