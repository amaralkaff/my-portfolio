// src/components/common/ImageComponent.jsx
import PropTypes from "prop-types";

const ImageComponent = ({ src, alt, width, height, className }) => (
  <img
    src={src}
    alt={alt}
    width={width}
    height={height}
    className={`object-cover rounded-full ${className}`}
  />
);

ImageComponent.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
};

export default ImageComponent;
