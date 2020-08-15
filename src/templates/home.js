import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import { color } from "../theme";
import Layout from "../components/Layout";
import Picture from "../components/Picture";
import withLayoutAndData from "./generic/withLayoutAndData";

const CrowdFundingBox = styled.div`
  background: url("https://res.cloudinary.com/whiteclouds/image/upload/w_1000/v1597496828/site/stars-people_av6uaw.png") no-repeat;
  background-size: cover;
  width: 80%;
  max-width: 600px;
  min-width: 400px;
  margin: 20px 0;
  height: 200px;    
`;

const CrowdFundingText = styled.div`
  font-size: 32px;
  ${color("white")}
  max-width: 220px;
  line-height: 38px;
  text-align: center;
  background-color: #46464673;
  height: 100%;
`;

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
      <CrowdFundingBox>
        <CrowdFundingText>
          {props.page.crowdFundingText}
        </CrowdFundingText>
      </CrowdFundingBox>
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
