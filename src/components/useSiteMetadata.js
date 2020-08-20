import { graphql, useStaticQuery } from "gatsby";

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
        query SITE_METADATA_QUERY {
            site {
                siteMetadata {
                    domain
                    title
                    description
                    fbPageId
                    cloudinaryBase
                    facebookPageUrl
                    twitterUserUrl
#                    social{
#                        twitter
#                        facebook
#                        instagram
#                        youtube
#                    }
                }
            }
        }
    `);

  return site.siteMetadata;
};

export default useSiteMetadata;
