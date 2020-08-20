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
      <PageTextBox text={page.crowdFundingText}
                   image="w_1000/v1597496828/site/stars-people_av6uaw.png"/>

      <EmailRegForm mainText={page.registerCtaText} subText={page.registerCtaSubText}/>

      <PageTextBox text={page.readBookText}
                   link={page.readBookUrl}
                   image="w_1000/v1597745087/site/jonathan-borba-3eC5n6gHwe8-unsplash_npjctj.png"/>

      <PageSeparator/>

      <Heading level={2} color="brand">Blurb</Heading>
      <Blurb content={page.bookBlurb}/>

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
        #        posts: allMarkdownRemark(sort: {order: [DESC, DESC], fields: [frontmatter___featuredpost, frontmatter___date]}, filter: {frontmatter: {templateKey: {eq: "blog-post"}}}, limit: 4) {
        #            edges {
        #                ...FeaturedContent
        #            }
        #        }
    }`;


export default withLayoutAndData()(HomePageTemplate);
