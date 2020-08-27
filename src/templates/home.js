import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import { Heading } from "grommet";
import PageTextBox from "../components/PageTextBox";
import EmailRegForm from "../components/EmailRegForm";
import PageSeparator from "../components/PageSeparator";
import { HTMLContent } from "../components/Content";
import { MainSection, pageWidthCss } from "../common/styles";
import withLayoutAndData, { getPropsForPage } from "./generic/withLayoutAndData";
import SocialLinks from "../components/SocialLinks";
import ArticleList from "../components/ArticleList";
import PageBanner from "../components/PageBanner";
import CallsToAction from "../components/CallsToAction";

const Blurb = styled(HTMLContent)`
  ${pageWidthCss}
`;

const HomePageTemplate = (props) => {
  const { page } = props;

  return <>
    <PageBanner page={page} />

    <MainSection>
      <SocialLinks/>
      <PageSeparator/>

      <CallsToAction {...page} />

      <Heading level={2} color="brand">Blurb</Heading>
      <Blurb content={page.bookBlurb}/>
      <p>Start reading the book <a style={{ textDecoration: "underline" }} href={page.readBookUrl}
                                   target="_blank" rel="noreferrer"><strong>here</strong></a>.</p>

      <PageSeparator/>

      <Heading level={2} color="brand">WCB Blog</Heading>
      <ArticleList {...props}/>

      <PageSeparator/>
      <EmailRegForm mainText={page.registerCtaText} subText={page.registerCtaSubText}/>
    </MainSection>
  </>;
};

export const HomeContentFragment = graphql`
    fragment HomeContent on MarkdownRemark {
        frontmatter {
            crowdFundingText
            readBookText
            readBookUrl
            registerCtaText
            registerCtaSubText
        }
    }`;

export const pageQuery = graphql`
    query HomePageTemplate {
        markdownRemark(frontmatter: {type: {eq: "home" } }) {
            frontmatter {
                title
                description
                banner
                bookBlurb
            }
            ...HomeContent
        }
        articles: allMarkdownRemark(sort: {order: [DESC, DESC], fields: [frontmatter___featured, frontmatter___date]}, filter: {frontmatter: {type: {eq: "article"}}}, limit: 3) {
            edges {
                ...ArticleListItem
            }
        }
    }`;

export default withLayoutAndData((props) => ({
    articles: props.data.articles,
    ...getPropsForPage(props),
  }),
  { noHeader: true }
)(HomePageTemplate);
