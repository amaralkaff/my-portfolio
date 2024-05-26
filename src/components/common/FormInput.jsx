// src/components/common/FormInput.jsx
import PropTypes from "prop-types";

const FormInput = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  className,
}) => (
  <div className={`form-input ${className}`}>
    <label
      htmlFor={name}
      className="block text-gray-700 dark:text-gray-300 mb-2"
    >
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-gray-100"
    />
  </div>
);

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default FormInput;
