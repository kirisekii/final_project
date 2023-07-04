import PropTypes from "prop-types";
import { StyledButton } from "./Button.css";

const Button = ({ children, fontSize, onClick, type }) => {
  return (
    <StyledButton type={type} fontSize={fontSize} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  fontSize: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

export default Button;
