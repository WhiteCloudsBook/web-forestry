import React from "react";
import styled from "styled-components";
import { transformEdgesNodes } from "../common/graphqlUtils";
import ArticleListItem from "./ArticleListItem";
import { breakpoint } from "../theme";
import { pageWidthCss } from "../common/styles";

const ArticlesContainer = styled.section`
  
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  
  ${breakpoint("tablet")`
    ${pageWidthCss}
  `}
`;

export default (props) => {
  const articles = transformEdgesNodes(props.articles);

  return <ArticlesContainer>
    {articles.map((article) => <ArticleListItem {...article} key={article.title} />)}
  </ArticlesContainer>;
};
