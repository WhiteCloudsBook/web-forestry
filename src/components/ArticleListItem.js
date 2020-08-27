import React, { memo } from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import { Text } from "grommet";
import { breakpoint, color } from "../theme";
import { pageWidthCss } from "../common/styles";
import Image from "./Image";

export const ArticleListItemFragment = graphql`
    fragment ArticleListItem on MarkdownRemarkEdge {
        node {
            fields {
                slug
            }
            frontmatter {
                title
                description
                date(formatString: "MMMM DD, YYYY")
                banner
            }
        }
    }`;

const ArticleContainer = styled.article`
    width: 80%;
    position: relative;  
    overflow: hidden;
    height: 200px;
    min-width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 20px;
    justify-content: flex-end;
    
    ${breakpoint("tablet", true)`
      width: 30%;
      margin-right: 10px;			
		`}
`;

const ArticleTextOverlay = styled.div`
  ${color("overlay-bg-transparent", "bg")}
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  padding: 6px 0;
  
  ${breakpoint("tablet", true)`
    flex-grow: 1;
  `}
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

export default memo(({ banner, title }) => {
  return <ArticleContainer>
    <StyledImage path={banner} sizes={{
      "(max-width: 900px)": "600",
      "(min-width: 900px)": "900",
    }}/>
    <ArticleTextOverlay>
      <ArticleText>{title}</ArticleText>
    </ArticleTextOverlay>
  </ArticleContainer>;
});