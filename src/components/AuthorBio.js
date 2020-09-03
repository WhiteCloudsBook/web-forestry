import React from "react";
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby";
import { color } from "../theme";
import { HTMLContent } from "./Content";
import AuthorPhoto from "./AuthorPhoto";

const Container = styled.article`
    width: 100%;
    padding: 40px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    ${AuthorPhoto} {
      display: block;
      z-index: 1;
    }
`;

const PhotoLine = styled.div`
 width: 100%;
 text-align: center;
 display: flex;
 align-items: center;
 justify-content: center;
    
 &:before {
  content: "";
  display: block;
  width: 50%;
  left: 50%;
  top: 70px;
  position: absolute;
  transform: translateX(-50%);
  height: 1px;
  box-shadow: 0 2px 2px ${color("border.light", false)};
 }
`;


const AuthorBio = () => {
  const bioData = useStaticQuery(graphql`
      query AuthorBioQuery {
        allMarkdownRemark(filter: {fields: {slug: {eq: "authorBio"}}}, limit: 1) {
            edges {
                node {
                    html
              }
          }
        }
      }`);

  return <Container>
    <PhotoLine>
      <AuthorPhoto size={60} opacity={0.8}/>
    </PhotoLine>

    <HTMLContent content={bioData.allMarkdownRemark.edges[0].node.html}/>
  </Container>;
};

export default AuthorBio;