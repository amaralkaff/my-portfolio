import React from "react";
import PropTypes from "prop-types";

const FormInput = ({ label, name, type, placeholder, value, onChange }) => (
  <div>
    <label
      className="text-sm font-bold text-text-light dark:text-text-dark"
      htmlFor={name}
    >
      {label}
    </label>
    <input
      className="w-full p-3 mt-1 text-text-light bg-gray-200 dark:bg-secondary-dark border rounded-lg focus:outline-none focus:bg-white dark:focus:bg-secondary-light focus:border-primary-light"
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FormInput;
