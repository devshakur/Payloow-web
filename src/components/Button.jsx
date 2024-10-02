import React from "react";
import PropTypes from "prop-types";

const Button = ({ onClick, className, text }) => {
  return (
    <button
      onClick={onClick}
      className={`${className} w-full md:py-4 py-3 rounded-lg md:text-base text-sm`}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  text: PropTypes.node.isRequired,
};

Button.defaultProps = {
  className: "",
};

export default Button;
