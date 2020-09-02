const path = require("path");

module.exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const slug = path.basename(node.fileAbsolutePath, ".md");

    createNodeField({
      node,
      name: "slug",
      value: slug,
    });

    const filePath = node.fileAbsolutePath,
      type = node.frontmatter.type,
      pagePath = getFilePublicPath(filePath, type, slug);

    createNodeField({
      node,
      name: "pagePath",
      value: pagePath,
    });
  }
};

const getFilePublicPath = (filePath, type, slug) => {
  const m = /content\/([\w\d\/\-\.]+)/
    .exec(filePath);

  const path = m && m[1] ?
    m[1].split("/")
      .slice(0, -1)
      .join("/") : "";

  return `/${path}${type !== "home" ? `/${slug}` : ""}`;
};

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const response = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            id
            fileAbsolutePath
            fields {
              slug
              pagePath
            }
            frontmatter {
              type
            }
          }
        }
      }
    }
  `);

  response.data.allMarkdownRemark.edges.forEach((edge) => {
    const id = edge.node.id,
      fm = edge.node.frontmatter,
      type = fm.type,
      slug = edge.node.fields.slug,
      pagePath = edge.node.fields.pagePath;

    if (type) {
      const pageData = {
        component: path.resolve(
          `src/templates/${fm.type}.js`,
        ),
        path: pagePath,
        context: {
          id,
          slug,
          type,
          pagePath,
        },
      };

      createPage(pageData);
    }
  });
};
