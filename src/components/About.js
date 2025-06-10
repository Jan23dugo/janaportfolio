import React from 'react';
import { Typography, Box } from '@mui/material';
import styled, { css } from 'styled-components';
import profileImg from '../assets/Aboutbackground/aboutpic.png';

const AboutSection = styled(Box)`
  min-height: 100vh;
  padding-top: 6.5rem;
  padding-bottom: 2rem;
  background: #082E04;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  box-sizing: border-box;
  @media (max-width: 479px) {
    padding-top: 0.5rem;
    padding-bottom: 0.2rem;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    padding-top: 1.2rem;
    padding-bottom: 0.5rem;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    padding-top: 2.5rem;
    padding-bottom: 1rem;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    padding-top: 4rem;
    padding-bottom: 1.5rem;
  }
  @media (min-width: 1200px) {
    padding-top: 6.5rem;
    padding-bottom: 2rem;
  }
`;

const ContentRow = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 3.5rem;
  padding: 0 3rem;
  gap: 3.5rem;
  @media (max-width: 900px) {
    flex-direction: column;
    padding: 0 1rem;
    align-items: center;
    gap: 2rem;
  }
  @media (max-width: 414px) {
    padding: 0 0.3rem;
    gap: 1.2rem;
    margin-bottom: 1.2rem;
  }
`;

const PhoneMockup = styled(Box)`
  width: 90vw;
  max-width: 350px;
  aspect-ratio: 4 / 5;
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 4px 32px rgba(0,0,0,0.10);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem auto;
  overflow: hidden;
`;

const PhoneImg = styled('img')`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  border-radius: 1.2rem;
`;

const RightContent = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 0;
  text-align: center;
  @media (max-width: 900px) {
    width: 100%;
    margin: 0 auto;
  }
`;

const Headline = styled(Typography)`
  && {
    font-size: 2rem;
    font-weight: 100;
    margin-bottom: 3rem;
    color: #F7B6CF;
    font-family: 'SAFIRA MARCH' !important;
    line-height: 1.1;
    max-width: 700px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    @media (max-width: 479px) {
      font-size: 1rem;
      margin-bottom: 0.7rem;
      padding: 0 0.1rem;
    }
    @media (min-width: 480px) and (max-width: 767px) {
      font-size: 1.2rem;
      margin-bottom: 1rem;
      padding: 0 2rem;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      font-size: 1.4rem;
      margin-bottom: 1.5rem;
      padding: 0 0.5rem;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
      font-size: 1.5rem;
      margin-bottom: 2rem;
      padding: 0 0.7rem;
    }
    @media (min-width: 1200px) {
      font-size: 2rem;
      margin-bottom: 3rem;
      padding: 0;
    }
  }
`;

const Subheadline = styled(Typography)`
  && {
    font-size: 1.3rem;
    color: #F7B6CF;
    margin-bottom: 2.2rem;
    font-family: 'Didact Gothic' !important;
    line-height: 1.1;
    max-width: 700px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    @media (max-width: 479px) {
      font-size: 1rem;
      margin-bottom: 0.5rem;
      padding: 0 0.1rem;
    }
    @media (min-width: 480px) and (max-width: 767px) {
      font-size: 1.1rem;
      margin-bottom: 0.8rem;
      padding: 0 2rem;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      font-size: 1.4rem;
      margin-bottom: 1.2rem;
      padding: 0 0.5rem;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
      font-size: 1.4rem;
      margin-bottom: 1.7rem;
      padding: 0 0.7rem;
    }
    @media (min-width: 1200px) {
      font-size: 1.8rem;
      margin-bottom: 2.2rem;
      padding: 0;
    }
  }
`;

const BottomBox = styled(Box)`
  width: 100%;
  background: #D9E4D7;
  color: #fff;
  padding: 3rem 1.5rem 3.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -3rem;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  @media (max-width: 479px) {
    padding: 0.7rem 0.1rem 0.8rem 0.1rem;
    border-radius: 0 0 3px 3px;
    margin-top: -0.5rem;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    padding: 1rem 0.2rem 1.2rem 0.2rem;
    border-radius: 0 0 6px 6px;
    margin-top: -1rem;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    padding: 1.5rem 0.5rem 2rem 0.5rem;
    border-radius: 0 0 10px 10px;
    margin-top: -1.5rem;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    padding: 2rem 1rem 2.5rem 1rem;
    border-radius: 0 0 13px 13px;
    margin-top: -2rem;
  }
  @media (min-width: 1200px) {
    padding: 3rem 1.5rem 3.5rem 1.5rem;
    border-radius: 0 0 16px 16px;
    margin-top: -3rem;
  }
`;


const AboutHeader = styled(Typography)`
  && {
    font-family: 'SAFIRA MARCH' !important;
    font-size: 4.4rem;
    color: #F7B6CF;
    text-align: center;
    margin-bottom: 2.5rem;
    margin-top: 2.5rem;
    width: 100%;
    @media (max-width: 479px) {
      font-size: 1.8rem;
      margin-bottom: 0.4rem;
      margin-top: -1rem;
    }
    @media (min-width: 480px) and (max-width: 767px) {
      font-size: 2rem;
      margin-bottom: 0.7rem;
      margin-top: -1rem;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      font-size: 2.5rem;
      margin-bottom: 1.2rem;
      margin-top: -1rem;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
      font-size: 3rem;
      margin-bottom: 1.7rem;
      margin-top: 1.7rem;
    }
    @media (min-width: 1200px) {
      font-size: 4.4rem;
      margin-bottom: 2.5rem;
      margin-top: 2.5rem;
    }
  }
`;


const ScriptFont = styled('span')`
  font-family: 'SAFIRA MARCH' !important;
  font-size: 1.8rem;
  color:rgb(0, 0, 0);
  max-width: 1100px;
  display: block;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.2;
  @media (max-width: 479px) {
    font-size: 1rem;
    padding: 0 1rem;
    
  }
  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 1.1rem;
    padding: 0 2rem;
    margin-bottom: -1rem;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 1.5rem;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    font-size: 1.5rem;
    padding: 0 0.8rem;
    margin-bottom: -1rem;
  }
  @media (min-width: 1200px) {
    font-size: 1.8rem;
  }
`;

const responsiveH5 = css`
  font-size: 1.7rem;
  font-weight: 400;
  text-align: center;
  font-family: 'Didact Gothic';
  color: black;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2rem;
  margin-bottom: 0.5rem;

  &:not(:first-of-type) {
    margin-top: 0;
  }

  @media (max-width: 479px) {
    font-size: 0.9rem;
    margin-top: 1rem;
    margin-bottom: 0.3rem;
    padding: 0 1rem;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 1rem;
    margin-top: 1.3rem;
    margin-bottom: 0.5rem;
    padding: 0 2rem;
  } 
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 1.1rem;
    padding: 0 0.5rem;
    margin-top: 1.2rem;
    margin-bottom: 0.5rem;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    font-size: 1.4rem;
    margin-top: 1.7rem;
    margin-bottom: 0.7rem;
    padding: 0 0.7rem;
  }
  @media (min-width: 1200px) {
    font-size: 1.7rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    padding: 0;
  }
`;

const About = () => {
  return (
    <>
      <AboutSection>
        <ContentRow>
          <PhoneMockup>
            <PhoneImg src={profileImg} alt="Profile" />
          </PhoneMockup>
          <RightContent>
            <AboutHeader variant="h1">About Me</AboutHeader>
            <Headline>I'm a self-driven Social Media Manager helping  beauty, health, and wellness brands rise above the noise and attract the right clients!</Headline>
            <Subheadline>
              From content that connects to growth tactics that actually work, everything I do is guided by one goal: to help your business grow with purpose without you wasting time and effort.
            </Subheadline>
          </RightContent>
        </ContentRow>
      </AboutSection>
      <BottomBox>
        <ScriptFont>Let's be honest, running your business is overwhelming. You can't do everything all at once, and the sooner you realize that, the better.
        </ScriptFont>
        <Typography variant="h5" sx={responsiveH5}>
          Building your social media takes time, strategy, and consistency. Without the right help, you're leaving growth, visibility, and potential clients on the table.
        </Typography>
        <Typography variant="h5" sx={responsiveH5}>
        You don't have to do it all. You just need the right support. It's time to move smart.
        </Typography>
      </BottomBox>
    </>
  );
};

export default About;
