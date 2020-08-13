import { graphql, useStaticQuery } from "gatsby";

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
        query SITE_METADATA_QUERY {
            site {
                siteMetadata {
                    title
                    description
#                    imageUrl
#                    siteUrl
#                    email
#                    fbAppId
#                    fbPageId
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
