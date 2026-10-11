import React, { useState, useEffect, useRef } from "react";
import Typed from "typed.js";
import Video from "../../videos/video1.mp4";
import drVideo from "../../videos/video2.mp4";
import {
  HeroContainer,
  HeroBg,
  VideoBg,
  HeroContent,
  HeroBtnWrapper,
  HeroH1,
  HeroP,
  ArrowForward,
  ArrowRight,
} from "./HeroElements";
import { Button } from "../ButtonElements";
import { Link } from "react-router-dom";

const HeroSection = ({ setIsDoctorLoggedIn, isDoctorLoggedIn, isLoggedIn }) => {
  console.log("Im where I should be", isLoggedIn, isDoctorLoggedIn);
  const [hover, setHover] = useState(false);
  const el = useRef(null);

  useEffect(() => {
    if (isDoctorLoggedIn) {
      const typed = new Typed(el.current, {
        strings: ["Your dedication saves lives and cultivates hope."],
        typeSpeed: 50,
        backSpeed: 50,
        loop: true,
        showCursor: false,
      });
      return () => {
        typed.destroy();
      };
    } else {
      const typed = new Typed(el.current, {
        strings: ["Make your life more blissful"],
        typeSpeed: 50,
        backSpeed: 50,
        loop: true,
        showCursor: false,
      });
      return () => {
        typed.destroy();
      };
    }
  }, []);

  const onHover = () => {
    setHover(!hover);
  };

  return (
    <HeroContainer id="home">
      {!isDoctorLoggedIn ? (
        <HeroBg>
          <VideoBg autoPlay loop muted src={Video} type="video/mp4" />
        </HeroBg>
      ) : (
        <HeroBg>
          <VideoBg autoPlay loop muted src={drVideo} type="video/mp4" />
        </HeroBg>
      )}
      <HeroContent
        whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
        transition={{ duration: 0.8 }}
      >
        <HeroH1>
          <span ref={el} style={{ display: "inline-block" }} />
        </HeroH1>

        <HeroP>Register today and seize a fresh start for your life!</HeroP>
        <HeroBtnWrapper>
          {!isLoggedIn ? (
            <Button
              as={Link}
              to="/signup"
              onMouseEnter={onHover}
              onMouseLeave={onHover}
              primary="true"
              dark="true"
              style={{ textDecoration: "none" }}
            >
              Take the first step {hover ? <ArrowForward /> : <ArrowRight />}
            </Button>
          ) : (
            <Button
              as={Link}
              to="/"
              onMouseEnter={onHover}
              onMouseLeave={onHover}
              primary="true"
              dark="true"
              style={{ textDecoration: "none" }}
            >
              Explore {hover ? <ArrowForward /> : <ArrowRight />}
            </Button>
          )}
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
