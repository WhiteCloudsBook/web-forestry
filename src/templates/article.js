import React from "react";
import { Heading } from "grommet";
import { MainSection, pageWidthCss } from "../common/styles";
import withLayoutAndData, { getPropsForPage } from "./generic/withLayoutAndData";
import { graphql } from "gatsby";
import SocialLinks from "../components/SocialLinks";
import PageSeparator from "../components/PageSeparator";
// import PageTextBox from "../components/PageTextBox";
import EmailRegForm from "../components/EmailRegForm";
import PageBanner from "../components/PageBanner";
import { HTMLContent } from "../components/Content";
import styled from "styled-components";
import CallsToAction from "../components/CallsToAction";


const PageContent = styled(HTMLContent)`
  ${pageWidthCss}
`;


const ArticlePageTemplate = (props) => {
  const { page, home } = props;

  return <>
    <PageBanner page={page} text="WCB Blog"/>

    <MainSection>
      <SocialLinks/>
      <PageSeparator/>

      <Heading level={2}>{page.title}</Heading>

      <PageContent content={page.html}/>

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
            }
            html
        }
        home: markdownRemark(frontmatter: {type: {eq: "home"}}) {
            ...HomeContent
        }
    }`;


export default withLayoutAndData((props)=>({
  ...getPropsForPage(props),
  home: props.data.home.frontmatter,
}))(ArticlePageTemplate);