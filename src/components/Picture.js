import React from "react"
import useSiteMetadata from "./useSiteMetadata"
import { getImageUrl, getImageSrcset } from "../common/imageUrl"

const Image = ({ src, alt, ...rest }) => {
  // const sizesAttr = sizes ?
  //   Object.entries(sizes)
  //     .map(([key,val])=>`${key} ${val}px`)
  //     .join(",") :
  //   undefined;

  return <img src={src} alt={alt} {...rest}/>
}

export default ({ responsive = true, path, alt, ...rest }) => {
  const { cloudinaryBase } = useSiteMetadata();

  // const baseSrc = `${cloudinaryBase}q_auto,f_auto`

  const sizes = {
    "(max-width: 500px)": "500",
    "(max-width: 600px)": "600",
    "(max-width: 900px)": "900",
    "(min-width: 900px)": "1200",
  }

  return responsive ?
    <picture>
      {Object.entries(sizes).map(([key, width]) =>
        <source srcSet={getImageSrcset(cloudinaryBase, path, width, true)}
                media={key}
                key={key}
        />)}
      <Image src={getImageUrl(cloudinaryBase, path)} alt={alt} {...rest}/>
    </picture> :
    <Image src={getImageUrl(cloudinaryBase, path)} alt={alt} {...rest}/>
};