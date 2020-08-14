import React from "react"
import useSiteMetadata from "./useSiteMetadata"

const Image = () => {

}

export default ({ responsive = true, path, alt }) => {

  const { cloudinaryBase } = useSiteMetadata()

  const baseSrc = `${cloudinaryBase}`


  return responsive ? <picture>

  </picture> : <Image src={src} alt={alt}/>
};