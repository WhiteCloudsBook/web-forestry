import React from "react";
import styled from "styled-components";
import { Heading } from "grommet";
import { MainSection, pageWidthCss } from "../common/styles";
import withLayoutAndData, { getPropsForPage } from "./generic/withLayoutAndData";
import { graphql } from "gatsby";
import { color } from "../theme";
import SocialLinks from "../components/SocialLinks";
import PageSeparator from "../components/PageSeparator";
import PageBanner from "../components/PageBanner";
import { HTMLContent } from "../components/Content";
import CallsToAction from "../components/CallsToAction";
import Author from "../components/Author";

const PageContent = styled(HTMLContent)`
  ${pageWidthCss}
`;

const ArticleSeparator = styled.hr`
  width: 15%;
  border: 1px dashed ${color("border.light", false)};
`;

const ArticlePageTemplate = (props) => {
  const { page, home } = props;

  return <>
    <PageBanner page={page} text="WCB Blog" />

    <MainSection>
      <SocialLinks/>
      <PageSeparator/>

      <Heading level={2}>{page.title}</Heading>

      <PageContent content={page.html}/>
      <ArticleSeparator/>

      <Author name={page.author}/>

      <PageSeparator/>

      <CallsToAction {...home} />
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
                bannerTransformation
                author
            }
            html
        }
        home: markdownRemark(frontmatter: {type: {eq: "home"}}) {
            ...HomeContent
        }
    }`;


export default withLayoutAndData((props) => ({
  ...getPropsForPage(props),
  home: props.data.home.frontmatter,
}))(ArticlePageTemplate);