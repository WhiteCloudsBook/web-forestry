import React, { useMemo } from "react";
import styled from "styled-components";
import { Heading } from "grommet";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { MainSection, pageWidthCss } from "../common/styles";
import withLayoutAndData, { getPropsForPage } from "./generic/withLayoutAndData";
import { graphql } from "gatsby";
import { color } from "../theme";
import SocialLinks from "../components/SocialLinks";
import PageSeparator from "../components/PageSeparator";
import PageBanner from "../components/PageBanner";
import { HTMLContent } from "../components/Content";
import CallsToAction from "../components/CallsToAction";
import AuthorSpeechBubble from "../components/AuthorSpeechBubble";

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");

const PageContent = styled(HTMLContent)`
  ${pageWidthCss}
`;

const ArticleSeparator = styled.hr`
  width: 15%;
  border: 1px dashed ${color("border.light", false)};
  margin-bottom: 20px;
`;

const ArticleBanner = styled(PageBanner)`
  height: calc(100vw / 1.5);
  max-height: 300px;
`;

const ArticlePageTemplate = (props) => {
  const { page, home } = props;

  const articleDateAgo = useMemo(() => timeAgo.format(new Date(page.date)), [page.date]);
  const articleDate = useMemo(() => {
    const d = new Date(page.date);
    return d.toLocaleString();
  }, [page.date]);

  return <>
    <ArticleBanner page={page} text="WCB Blog"/>

    <MainSection>
      <SocialLinks/>
      <PageSeparator/>

      <Heading level={2}>{page.title}</Heading>

      <PageContent content={page.html}/>
      <ArticleSeparator/>

      <AuthorSpeechBubble>
        <p>
          Posted by {page.author} <span style={{ fontWeight: "bold", display: "inline" }}
                                        title={articleDate}>{articleDateAgo}</span>
        </p>
      </AuthorSpeechBubble>
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
                date
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