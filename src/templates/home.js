import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import { Heading } from "grommet";
import EmailRegForm from "../components/EmailRegForm";
import PageSeparator from "../components/PageSeparator";
import { HTMLContent } from "../components/Content";
import { MainSection, pageWidthCss } from "../common/styles";
import withLayoutAndData, { getPropsForPage } from "./generic/withLayoutAndData";
import SocialLinks from "../components/SocialLinks";
import ArticleList from "../components/ArticleList";
import PageBanner from "../components/PageBanner";
import CallsToAction from "../components/CallsToAction";
import AuthorSpeechBubble from "../components/AuthorSpeechBubble";
import Logline from "../components/Logline";

const PageContent = styled(HTMLContent)`
  ${pageWidthCss}
  font-family: 'Turret Road', cursive;
`;

const HomeBanner = styled(PageBanner)`
  height: calc(100vw / 4);
  max-height: 240px;
  margin-bottom: 10px;
`;

const HomePageTemplate = (props) => {
  const { page } = props;

  return <>
    <HomeBanner page={page} alt="home page banner"/>

    <MainSection>
      <SocialLinks/>

      <AuthorSpeechBubble text={page.welcomeText} />

      <Logline text={page.bookLogline}/>
      <PageSeparator/>

      <CallsToAction {...page} />

      <Heading level={2} color="brand">Blurb</Heading>
      <PageContent content={page.bookBlurb}/>
      <p><a style={{ textDecoration: "underline" }} href={page.readBookUrl}
            target="_blank" rel="noreferrer">Start reading the book on Wattpad.</a></p>

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
                welcomeText
                bookLogline
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
  { noHeader: true },
)(HomePageTemplate);
