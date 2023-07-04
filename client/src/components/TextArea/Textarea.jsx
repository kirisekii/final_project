import PropTypes from "prop-types";
import { ContactTextArea, TextareaContainer } from "./TextareaInput.styled";
import { InputLabel } from "../Input/Input.styled";

const TextareaInput = ({ label, placeholder }) => {
  return (
    <TextareaContainer>
      <InputLabel>{label}</InputLabel>
      <ContactTextArea name="message" rows="5" placeholder={placeholder} />
    </TextareaContainer>
  );
};

TextareaInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default TextareaInput;
