const BASE_PARAMS = [["q", "auto"], ["f", "auto"]];

const getImageUrlWithParams = (base, path, params) =>
  `${base}${params.map((p) => `${p[0]}_${p[1]}`)}${path}`;

const getImageUrl = (base, path, width = 0, addDpr = false) =>
  getImageUrlWithParams(base, path,
    BASE_PARAMS
      .concat(width ? [["w", width]] : [])
      .concat(addDpr ? [["dpr", "2.0"]] : []));

const getSourceSrcset = (base, path, width = 0, addDpr = false) => {
  const srcSet = [
    getImageUrl(base, path, width) + ` ${width}w`,
    addDpr ? getImageUrl(base, path, width, addDpr) + ` ${width}w` : null,
  ];

  return srcSet.filter(Boolean)
    .join(",");
};

const getResponsiveImageProps = (base, path, sizes) => {
  const srcSetVals = [],
    sizesVals = [];

  Object.entries(sizes).forEach(([key, width]) => {
    srcSetVals.push(getSourceSrcset(base, path, width));
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