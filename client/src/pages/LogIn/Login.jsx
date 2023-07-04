import Button from "../../components/Button/Button";
import TextareaInput from "../../components/TextArea/Textarea";
import Input from "../../components/Input/Input";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import { StyledContactForm, ContactWrapper } from "./Contact.styled";
import { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <ContactWrapper>
      <SectionHeading
        heading="Contact"
        subheading="Contact me by submitting the form below and I will get back to you as soon as possible"
      />
      <StyledContactForm
        action="https://formsubmit.co/mindaugas02@gmail.com"
        method="POST"
      >
        <Input
          inputName="Name"
          type="text"
          name="name"
          placeholder="Enter Your Name"
          value={name}
          onChange={handleNameChange}
          required
        />
        <Input
          inputName="Email"
          type="email"
          name="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <TextareaInput
          label="Message"
          placeholder="Enter Your Message"
          value={message}
          onChange={handleMessageChange}
          required
        />

        <Button fontSize="14" type="submit">
          Submit
        </Button>
      </StyledContactForm>
    </ContactWrapper>
  );
};

export default Contact;
