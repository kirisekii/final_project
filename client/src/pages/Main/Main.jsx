import React from "react";
import Button from "../../components/Button/Button";
import { HeroWrap, HeroContent, Subtitle, Title } from "./Home.styled";
import { Link } from "react-router-dom";
import { PROJECTS_ROUTE } from "../../routes/const";

const Home = () => {
  return (
    <HeroWrap>
      <HeroContent>
        <Title>Hey, I'm Mindaugas Purvis</Title>
        <Subtitle>
          Elevating User Experiences through Innovative Frontend Solutions:
          Transforming Ideas into Seamless Digital Realities
        </Subtitle>
        <Link to={PROJECTS_ROUTE}>
          <Button>Projects</Button>
        </Link>
      </HeroContent>
    </HeroWrap>
  );
};

export default Home;
