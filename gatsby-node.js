const path = require("path")

module.exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === "MarkdownRemark") {
    const slug = path.basename(node.fileAbsolutePath, ".md")

    createNodeField({
      //same as node: node
      node,
      name: "slug",
      value: slug,
    })
  }
}

const getFilePublicPath = (filePath, type, slug) => {
  const m = /content\/([\w\d\/\-\.]+)/
    .exec(filePath)

  const path = m && m[1] ?
    m[1].split("/")
      .slice(0, -1)
      .join("/") : ""

  return `/${path}${type !== "home" ? `/${slug}` : ""}`
}

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const response = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            id
            fileAbsolutePath
            fields {
              slug
            }
            frontmatter {
              type
            }
          }
        }
      }
    }
  `)

  response.data.allMarkdownRemark.edges.forEach((edge) => {
    const id = edge.node.id,
      fm = edge.node.frontmatter,
      type = fm.type,
      filePath = edge.node.fileAbsolutePath,
      slug = edge.node.fields.slug,
      pagePath = getFilePublicPath(filePath, type, slug);

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
    }

    createPage(pageData)
  })
}
