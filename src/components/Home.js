import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import styled from 'styled-components';
import homebg from '../assets/Homebackground/homebg.jpg';

const CenterSection = styled(Box)`
  min-height: 100vh;
  background: url(${homebg}) no-repeat center center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  @media (max-width: 479px) {
    min-height: 60vh;
    padding: 0.5rem 0.1rem;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    min-height: 70vh;
    padding: 1rem 0.2rem;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    min-height: 80vh;
    padding: 1.5rem 0.5rem;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    min-height: 90vh;
    padding: 2rem 1rem;
  }
  @media (min-width: 1200px) {
    min-height: 100vh;
    padding: 0;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(8, 46, 4, 0.45);
    z-index: 1;
  }
`;

const Name = styled(Typography)`
  && {
    font-family: 'SAFIRA MARCH';
    font-size: 6.5rem;
    font-weight: 1000;
    color: #D71768;
    text-align: center;
    margin-bottom: 0rem;
    position: relative;
    z-index: 2;
    text-shadow:
      2px 2px 8px rgba(0,0,0,0.35),
      0 0 2px rgb(0, 0, 0);
    @media (max-width: 479px) {
      font-size: 3.5rem;
    }
    @media (min-width: 480px) and (max-width: 767px) {
      font-size: 4.5rem;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      font-size: 4.6rem;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
      font-size: 5rem;
    }
    @media (min-width: 1200px) {
      font-size: 6rem;
      margin-bottom: -0.5rem !important;
    }
  }
`;

const Title = styled(Typography)`
  && {
    font-family: 'SAFIRA MARCH';
    font-size: 3.5rem;
    font-weight: 500;
    font-style: italic;
    color: #F7B6CF;
    text-align: center;
    margin-bottom: -1.5rem !important;
    position: relative;
    z-index: 2;
    @media (max-width: 479px) {
      font-size: 2rem;
      margin-bottom: -0.2rem !important;
    }
    @media (min-width: 480px) and (max-width: 767px) {
      font-size: 2.5rem;
      margin-bottom: -0.4rem !important;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      font-size: 2.8em;
      margin-bottom: -0.7rem !important;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
      font-size: 3rem;
      margin-bottom: -1rem !important;
    }
    @media (min-width: 1200px) {
      font-size: 3.5rem;
      margin-bottom: -1.5rem !important;
    }
  }
`;

const Quote = styled(Typography)`
  && {
    font-family: 'Didact Gothic';
    font-size: 1.3rem;
    color:#F7B6CF;
    width: 100%;
    text-align: center;
    margin-top: 0.55rem;
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: center;

    span {
      padding: 0.2em 0.7em;
      border-radius: 0.5em;
      display: inline-block;
      box-decoration-break: clone;
      -webkit-box-decoration-break: clone;
    }

    @media (max-width: 479px) {
      font-size: 0.65rem;
      margin-top: 1rem;
      padding: 0 0.1rem;
    }
    @media (min-width: 480px) and (max-width: 767px) {
      font-size: 0.75rem;
      margin-top: 2.7rem;
      padding: 0 0.2rem;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      font-size: 0.85rem;
      margin-top: 2rem;
      padding: 0 0.7rem;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
      font-size: 0.85rem;
      margin-top: 2rem;
      padding: 0 0.7rem;
    }
    @media (min-width: 1200px) {
      font-size: 1.1rem;
      margin-top: 2rem;
      padding: 0;
    }
  }
`;

const Home = () => {
  return (
    <CenterSection>
      <Container maxWidth="md">
      <Quote variant="body1"><span>"YOU FOCUS ON YOUR BUSINESS. I'LL BUILD YOUR BRAND ONLINE"</span></Quote>
      <Name variant="h1">Jana Virtuales</Name>
      <Title variant="h5">Social Media Manager</Title>
        
      </Container>
    </CenterSection>
  );
};

export default Home; 