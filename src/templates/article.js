import React from "react";
import { Heading } from "grommet";
// import Picture from "../components/Picture";
import { MainSection, pageWidthCss } from "../common/styles";
import withLayoutAndData from "./generic/withLayoutAndData";
import { graphql } from "gatsby";
import SocialLinks from "../components/SocialLinks";
import PageSeparator from "../components/PageSeparator";
// import PageTextBox from "../components/PageTextBox";
import EmailRegForm from "../components/EmailRegForm";
import PageBanner from "../components/PageBanner";
import { HTMLContent } from "../components/Content";
import styled from "styled-components";


const PageContent = styled(HTMLContent)`
  ${pageWidthCss}
`;


const ArticlePageTemplate = (props) => {
  const { page } = props;

  return <>
    <PageBanner page={page} text="WCB Blog"/>

    <MainSection>
      <SocialLinks/>
      <PageSeparator/>

      <Heading level={2}>{page.title}</Heading>

      <PageContent content={page.html}/>

      <EmailRegForm mainText={page.registerCtaText} subText={page.registerCtaSubText}/>
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