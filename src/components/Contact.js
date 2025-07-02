import React from 'react';
import { Container, Typography, Box, Grid, Link } from '@mui/material';
import styled from 'styled-components';

const ContactSection = styled(Box)`
  min-height: 60vh;
  padding: 4rem 0 2rem 0;
  background: #D9E4D7;
  display: flex;
  align-items: center;
  
  @media (max-width: 479px) {
    min-height: 40vh;
    padding: 1rem 0 1rem 0;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    min-height: 45vh;
    padding: 1rem 0 2rem 0;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    min-height: 58vh;
    padding: 3.5rem 0 1.8rem 0;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    min-height: 60vh;
    padding: 4rem 0 2rem 0;
  }
  @media (min-width: 1200px) {
    min-height: 30vh;
    padding: 2rem 0 2.5rem 0;
  }
`;

const BigHeading = styled(Typography)`
  && {
  font-family: 'SAFIRA MARCH' !important;
  font-size: 3rem;
  font-weight: 900;
  color: #D71768;
  text-align: center;
  letter-spacing: 2px;
  margin-bottom: 1.5rem;
  @media (max-width: 479px) {
    font-size: 1.3rem;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 1.9em;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 2.2rem;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    font-size: 2.6rem;
  }
  @media (min-width: 1200px) {
    font-size: 3rem;
  }
}
`;

const SubHeading = styled(Typography)`
  && {
font-family: 'Didact Gothic' !important;
  font-size: 2rem;
  font-weight: 700;
  color: #D71768;
  text-align: center;
  margin-bottom: 2.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  @media (max-width: 479px) {
    font-size: 0.9rem;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 1.1rem;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 1.4rem;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    font-size: 1.8rem;
  }
  @media (min-width: 1200px) {
    font-size: 1.8rem;
  }
}
`;

const ContactRow = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  margin-top: 2.5rem;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const ContactItem = styled(Box)`
&& {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  color: #D71768;
  font-size: 1.5rem;
  @media (max-width: 479px) {
    font-size: 0.5rem;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 1rem;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 1.2rem;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    font-size: 1.3rem;
  }
  @media (min-width: 1200px) {
    font-size: 1.5rem;
  }
}
`;

const LogoImage = styled.img`
  width: 48px;
  height: 48px;
  object-fit: contain;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
  
  @media (max-width: 599px) {
    width: 32px;
    height: 32px;
  }
  @media (min-width: 600px) and (max-width: 899px) {
    width: 40px;
    height: 40px;
  }
  @media (min-width: 900px) {
    width: 48px;
    height: 48px;
  }
`;

const ContactLink = styled(Link)`
  && {
  color: #D71768 !important;
  font-size: 2rem;
  font-weight: 500;
  text-decoration: underline;
  &:hover {
    color: #D71768;
    opacity: 0.8;
    text-decoration: underline;
  }
  @media (max-width: 479px) {
    font-size: 1rem;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 1.2rem;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 1.4rem;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    font-size: 1.7rem;
  }
  @media (min-width: 1200px) {
    font-size: 2rem;
  }
}
`;

const Contact = () => (
  <ContactSection>
    <Container maxWidth="lg">
      <BigHeading variant="h1">
        READY FOR YOUR GROWTH?
      </BigHeading>
      <SubHeading>
        SEND ME A MESSAGE AND LET'S GET STARTED!
      </SubHeading>
      <ContactRow container spacing={4}>
        <Grid item xs={12} md={4}>
          <ContactItem>
            <LogoImage 
              src="/assets/Tools/facebook-logo.png" 
              alt="Facebook Logo"
            />
            <ContactLink href="https://www.facebook.com/jana.virtuales?mibextid=wwXIfr&mibextid=wwXIfr" target="_blank" underline="always">
              Jana Virtuales
            </ContactLink>
          </ContactItem>
        </Grid>
        <Grid item xs={12} md={4}>
          <ContactItem>
            <LogoImage 
              src="/assets/Tools/instagram-logo.png" 
              alt="Instagram Logo"
            />
            <ContactLink href="https://www.instagram.com/janavirtuales?igsh=MTdpZzRncTB3M2xuNg%3D%3D&utm_source=qr" target="_blank" underline="always">
              janavirtuales
            </ContactLink>
          </ContactItem>
        </Grid>
        <Grid item xs={12} md={4}>
          <ContactItem>
            <LogoImage 
              src="/assets/Tools/gmail-logo.png" 
              alt="Email Logo"
            />
            <ContactLink href="https://mail.google.com/mail/?view=cm&source=mailto&to=janavirtuales@gmail.com" underline="always">
              janavirtuales@gmail.com
            </ContactLink>
          </ContactItem>
        </Grid>
      </ContactRow>
    </Container>
  </ContactSection>
);

export default Contact; 