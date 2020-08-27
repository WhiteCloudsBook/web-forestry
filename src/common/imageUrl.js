const BASE_PARAMS = [["q", "auto"], ["f", "auto"]];

const getImageUrlWithParams = (base, path, params, extra) =>
  `${base}${params.map((p) => `${p[0]}_${p[1]}`)}${extra ? `,${extra}` : ""}${path}`;

const getImageUrl = (base, path, width = 0, addDpr = false, extraTransformation) =>
  getImageUrlWithParams(base, path,
    BASE_PARAMS
      .concat(width ? [["w", width]] : [])
      .concat(addDpr ? [["dpr", "2.0"]] : []),
    extraTransformation);

const getSourceSrcset = (base, path, width = 0, addDpr = false, extraTransformation) => {
  const srcSet = [
    getImageUrl(base, path, width, extraTransformation) + ` ${width}w`,
    addDpr ? getImageUrl(base, path, width, addDpr, extraTransformation) + ` ${width}w` : null,
  ];

  return srcSet.filter(Boolean)
    .join(",");
};

const getResponsiveImageProps = (base, path, sizes, extraTransformation) => {
  const srcSetVals = [],
    sizesVals = [];

  Object.entries(sizes).forEach(([key, width]) => {
    srcSetVals.push(getSourceSrcset(base, path, width, extraTransformation));
    sizesVals.push(`${key} ${width}px`);
  });

  return {
    srcSet: srcSetVals.join(","),
    sizes: sizesVals.join(","),
  };
};

export {
  getImageUrlWithParams,
  getImageUrl,
  getSourceSrcset,
  getResponsiveImageProps,
};