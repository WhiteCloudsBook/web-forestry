import React, { memo } from "react";
import { graphql, Link } from "gatsby";
import styled from "styled-components";
import { Text, Heading } from "grommet";
import { breakpoint, color } from "../theme";
import { pageBoxShadow } from "../common/styles";
import Image from "./Image";

export const ArticleListItemFragment = graphql`
    fragment ArticleListItem on MarkdownRemarkEdge {
        node {
            fields {
                slug
                pagePath
            }
            frontmatter {
                title
                description
                date(formatString: "MMMM DD, YYYY")
                banner
            }
        }
    }`;

const ArticleContainer = styled(Link)`
    width: 100%;
    max-width: 600px;
    position: relative;  
    overflow: hidden;
    min-height: 240px;
    min-width: 320px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 16px;
    border-radius: 5px 5px 0 0;
    
    ${color("white")}
    
    &:visited {
      ${color("white")}
    }   
    
    ${pageBoxShadow}
    
    ${breakpoint("tablet", true)`
      width: 30%;
      margin-right: 5px;		       	
		`}
    
    ${breakpoint("tablet")`
      justify-content: space-between;    
    `}
`;

const ArticleTextOverlay = styled.div`
  ${color("brand-bg-overlay-transparent", "bg")}
  ${color("black")}
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  padding: 6px;
  
  height: 70px; 
`;

const StyledImage = styled(Image)`

  ${breakpoint("tablet")`
    position: absolute;
    top: 0;
   `}
`;

const ArticleText = styled(Text)`
  font-weight: bold;
`;

const ArticleTitleWrapper = styled.div`
  height: 24px;
 
   ${color("light-grey", "bg")}
   ${color("black")}
   z-index: 1;    
    width: 100%;
    text-align: center;          
    
`;

const ArticleTitle = styled(Heading)`
max-width: 100%;
`;

export default memo(({ image, title, pagePath, description }) => {
  return <ArticleContainer to={pagePath}>
    <ArticleTitleWrapper>
      <ArticleTitle level={4} margin="none">{title}</ArticleTitle>
    </ArticleTitleWrapper>
    <StyledImage path={image} sizes={{
      "(max-width: 900px)": "600",
      "(min-width: 900px)": "900",
    }} alt={title}/>
    <ArticleTextOverlay>
      <ArticleText size="small">{description}</ArticleText>
    </ArticleTextOverlay>
  </ArticleContainer>;
});
