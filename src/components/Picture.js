import React from "react";
import useSiteMetadata from "./useSiteMetadata";
import { getImageUrl, getSourceSrcset } from "../common/imageUrl";
import Image from "./Image";

const SIZES = {
  "(max-width: 500px)": "500",
  "(max-width: 600px)": "600",
  "(max-width: 900px)": "900",
  "(min-width: 900px)": "1200",
};

export default ({ responsive = true, sizes, path, alt, className, ...rest }) => {
  const { cloudinaryBase } = useSiteMetadata();

  sizes = sizes || SIZES;

  return responsive ?
    <picture className={className}>
      {Object.entries(sizes).map(([key, width]) =>
        <source srcSet={getSourceSrcset(cloudinaryBase, path, width, true)}
                media={key}
                key={key}
        />)}
      <Image src={getImageUrl(cloudinaryBase, path)} alt={alt} {...rest}/>
    </picture> :
    <Image className={className} src={getImageUrl(cloudinaryBase, path)} alt={alt} {...rest}/>;
};