import { useQuery } from "@apollo/client";
import React from "react";
import { Fade } from "react-reveal";
//
import Container from "../../common/Container";
import HomeComponent from "../../components/Home/";

const Home = () => {
  return (
    <Container>
      <Fade bottom>
        <HomeComponent />
      </Fade>
    </Container>
  );
};

export default Home;
