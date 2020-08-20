import React, { memo } from "react";
import { graphql } from "gatsby";
import styled from "styled-components";


export const ArticleListItemFragment = graphql`
    fragment ArticleListItem on MarkdownRemarkEdge {
        node {
            fields {
                slug
            }
            frontmatter {
                title
                description
                date(formatString: "MMMM DD, YYYY")
                banner
            }
        }
    }`;
