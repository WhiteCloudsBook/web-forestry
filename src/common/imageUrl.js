const BASE_PARAMS = [["q", "auto"], ["f", "auto"]];

const removeExt = (path) => path.replace(/\.(\w+)$/,"");

const getImageUrlWithParams = (base, path, params, extra) =>
  `${base}${params.map((p) => `${p[0]}_${p[1]}`)}${extra ? `,${extra}` : ""}${removeExt(path)}`;

const getImageUrl = (base, path, width = 0, addDpr = false, extraTransformation) =>
  getImageUrlWithParams(base, path,
    BASE_PARAMS
      .concat(width ? [["w", width]] : [])
      .concat(addDpr ? [["dpr", "2.0"]] : []),
    extraTransformation);

const getSourceSrcset = (base, path, width = 0, addDpr = false, extraTransformation) => {
  const srcSet = [addDpr ?
    getImageUrl(base, path, width, addDpr, extraTransformation) + ` ${width}w` :
    getImageUrl(base, path, width, false,extraTransformation) + ` ${width}w`
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

const fixBannerPath = (path) =>
  "/" + path.replace(/\.\.\//g, "");

export {
  getImageUrlWithParams,
  getImageUrl,
  getSourceSrcset,
  getResponsiveImageProps,
  fixBannerPath,
};
