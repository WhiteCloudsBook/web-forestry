import React from "react";
import styled from "styled-components";
import { transformEdgesNodes } from "../common/graphqlUtils";
import ArticleListItem from "./ArticleListItem";
import { pageWidthCss } from "../common/styles";


const ArticlesContainer = styled.section`
  ${pageWidthCss}
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export default (props) => {
  const articles = transformEdgesNodes(props.articles);

  console.log("!!!!!!!! ARTICLES ", articles);

  return <ArticlesContainer>
    {articles.map((article) => <ArticleListItem {...article} key={article.title} />)}
  </ArticlesContainer>;
};