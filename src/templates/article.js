import React from "react";
import Picture from "../components/Picture";
import { MainSection } from "../common/styles";
import withLayoutAndData from "./generic/withLayoutAndData";
import { graphql } from "gatsby";

const ArticlePageTemplate = (props) => {
  const { page } = props;

  return <>
    <Picture path={page.banner}/>

    <MainSection>

    </MainSection>
  </>;
};

export const pageQuery = graphql`
    query ArticlePageTemplate($id: String!) {
        markdownRemark(id: { eq: $id }) {
            frontmatter {
                title
                description
                banner
            }
            html
        }
        articles: allMarkdownRemark(sort: {order: [DESC, DESC], fields: [frontmatter___featured, frontmatter___date]}, filter: {frontmatter: {type: {eq: "article"}}}, limit: 3) {
            edges {
                ...ArticleListItem
            }
        }
    }`;


export default withLayoutAndData()(ArticlePageTemplate);