// src/components/common/ImageComponent.jsx
import React from "react";

const ImageComponent = ({ src, alt, width, height }) => (
  <img
    src={src}
    alt={alt}
    width={width}
    height={height}
    className="w-full h-auto"
  />
);

export default ImageComponent;
