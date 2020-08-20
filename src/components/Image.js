import React from "react";
import useSiteMetadata from "./useSiteMetadata";
import { getImageUrl, getResponsiveImageProps } from "../common/imageUrl";

export default ({ src, path, sizes, alt, ...rest }) => {
  const { cloudinaryBase } = useSiteMetadata();
  src = src || getImageUrl(cloudinaryBase, path);

  let responsiveProps = {};

  if (path && sizes) {
    //responsive image
    responsiveProps = getResponsiveImageProps(cloudinaryBase, path, sizes);
  }

  return <img src={src} {...responsiveProps} alt={alt} {...rest}/>;
};


// const sizesAttr = sizes ?
//   Object.entries(sizes)
//     .map(([key,val])=>`${key} ${val}px`)
//     .join(",") :
//   undefined;
