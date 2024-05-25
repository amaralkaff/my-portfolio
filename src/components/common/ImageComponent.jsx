// src/components/common/ImageComponent.jsx
import React from "react";

const ImageComponent = ({ src, alt, width, height, className }) => (
  <img
    src={src}
    alt={alt}
    width={width}
    height={height}
    className={`object-cover rounded-full ${className}`}
  />
);

export default ImageComponent;
