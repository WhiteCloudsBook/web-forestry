import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import { Heading } from "grommet";
import Picture from "../components/Picture";
import PageTextBox from "../components/PageTextBox";
import EmailRegForm from "../components/EmailRegForm";
import PageSeparator from "../components/PageSeparator";
import { HTMLContent } from "../components/Content";
import { pageWidthCss } from "../common/styles";
import withLayoutAndData from "./generic/withLayoutAndData";
import SocialLinks from "../components/SocialLinks";

const MainSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Blurb = styled(HTMLContent)`
  ${pageWidthCss}
`;

const HomePageTemplate = ({ page }) => {
  return <>
    <Picture path={page.banner}/>

    <MainSection>
      <SocialLinks/>
      <PageSeparator/>

      <PageTextBox text={page.crowdFundingText}
                   image="/v1597496828/site/stars-people_av6uaw.png"/>

      <EmailRegForm mainText={page.registerCtaText} subText={page.registerCtaSubText}/>

      <PageTextBox text={page.readBookText}
                   link={page.readBookUrl}
                   image="/v1597745087/site/jonathan-borba-3eC5n6gHwe8-unsplash_npjctj.png"/>

      <Heading level={2} color="brand">Blurb</Heading>
      <Blurb content={page.bookBlurb}/>

      <PageSeparator/>

      <Heading level={2} color="brand">Articles</Heading>
      {/*<ArticleList articles={}/>*/}

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
        posts: allMarkdownRemark(sort: {order: [DESC, DESC], fields: [frontmatter___featured, frontmatter___date]}, filter: {frontmatter: {type: {eq: "article"}}}, limit: 3) {
            edges {
                ...ArticleListItem
            }
        }
    }`;


export default withLayoutAndData()(HomePageTemplate);
