import React from "react"
import { graphql } from "gatsby";
import Layout from "../components/Layout"
import Picture from "../components/Picture"
import withLayoutAndData from "./generic/withLayoutAndData";

const HomePageTemplate = (props) => {

  console.log("!!!!!! rendering home page ", props);

  return <Layout>


    <h1>Home</h1>
  </Layout>
};

export const pageQuery = graphql`
    query HomePageTemplate {
        markdownRemark(frontmatter: {type: {eq: "home" } }) {
            frontmatter {
                title
                description
                banner
                crowd_funding_text
                read_book_text
                read_book_url
                book_blurb
            }
        }
#        posts: allMarkdownRemark(sort: {order: [DESC, DESC], fields: [frontmatter___featuredpost, frontmatter___date]}, filter: {frontmatter: {templateKey: {eq: "blog-post"}}}, limit: 4) {
#            edges {
#                ...FeaturedContent
#            }
#        }
    }`;


export default withLayoutAndData(
  // ({ data }) => ({
  //   page: {
  //     ...data.markdownRemark.frontmatter,
  //     slug: "/"
  //   },
  //   posts: data.posts,
  //   products: data.products,
  //   libraryItems: data.library,
  //   testimonials: data.testimonials,
  //   highlightedEvents: data.highlightedEvents,
  // }), () => ({
  //   ogTags: { title: "הבית של מונטסורי בייבי" },
  //   titleTemplateOverride: "%s"
  // })
)(HomePageTemplate);
