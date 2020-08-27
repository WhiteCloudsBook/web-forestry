
const transformEdgesNodes = (items, moreTransform = null) => {
  const edges = items.edges || items;

  return edges.length &&
    (edges[0].node ? edges.map((edge) => ({
      ...edge.node.fields,
      ...edge.node.frontmatter,
      content: edge.node.html,
      image: edge.node.frontmatter.banner || edge.node.frontmatter.image || edge.node.image,
      ...(moreTransform ? moreTransform(edge.node) : {})
    })) : edges);
};

export {
  transformEdgesNodes,
};