const BASE_PARAMS = [["q", "auto"], ["f", "auto"]];

const getImageUrlWithParams = (base, path, params) =>
  `${base}${params.map((p) => `${p[0]}_${p[1]}`)}${path}`

const getImageUrl = (base, path, width = 0, addDpr = false) =>
  getImageUrlWithParams(base, path,
    BASE_PARAMS
      .concat(width ? [["w", width]] : [])
      .concat(addDpr ? [["dpr", "2.0"]] : []))

const getImageSrcset = (base, path, width = 0, addDpr = false) =>{
 //const url =   getImageUrl(base, path, width)
const srcSet = [
    getImageUrl(base, path, width) + ` ${width}w`,
    addDpr ? getImageUrl(base, path, width, addDpr) + ` ${width}w` : null,
  ]

  return srcSet.filter(Boolean)
    .join(",");
}

export {
  getImageUrlWithParams,
  getImageUrl,
  getImageSrcset,
}