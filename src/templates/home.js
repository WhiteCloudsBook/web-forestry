import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import { color } from "../theme";
import Layout from "../components/Layout";
import Picture from "../components/Picture";
import PageTextBox from "../components/PageTextBox";
import withLayoutAndData from "./generic/withLayoutAndData";
import EmailRegForm from "../components/EmailRegForm";


const MainSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HomePageTemplate = (props) => {

  console.log("!!!!!! rendering home page ", props);

  return <Layout>
    <Picture path={props.page.banner}/>

    <MainSection>
      <PageTextBox text={props.page.crowdFundingText}
                   image="w_1000/v1597496828/site/stars-people_av6uaw.png"/>

      <EmailRegForm mainText={props.page.registerCtaText} subText={props.page.registerCtaSubText}/>

      <PageTextBox text={props.page.readBookText}
                   link={props.page.readBookUrl}
                   image="w_1000/v1597745087/site/jonathan-borba-3eC5n6gHwe8-unsplash_npjctj.png"/>
    </MainSection>
  </Layout>;
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
