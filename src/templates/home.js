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

      <PageTextBox text={page.crowdFundingText}
                   image="/v1597496828/site/stars-people_av6uaw.png"/>

      <EmailRegForm mainText={page.registerCtaText} subText={page.registerCtaSubText}/>

      <PageTextBox text={page.readBookText}
                   link={page.readBookUrl}
                   image="/v1598015134/site/jonathan-borba-3eC5n6gHwe8-unsplash.png"/>

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

export const pageQuery = graphql`
    query HomePageTemplate {
        markdownRemark(frontmatter: {type: {eq: "home" } }) {
            frontmatter {
                title
                description
                banner
                crowdFundingText
                readBookText
                readBookUrl
                registerCtaText
                registerCtaSubText
                bookBlurb
            }
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
