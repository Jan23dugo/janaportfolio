import React, { useState, useEffect } from 'react';
import { Typography, Box, CircularProgress, Alert } from '@mui/material';
import styled, { css } from 'styled-components';
import profileImg from '../assets/Aboutbackground/aboutpic.png';
import { createClient } from '@supabase/supabase-js';

const AboutSection = styled(Box)`
  
  padding-bottom: 1rem;
  background: #082E04;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  box-sizing: border-box;
  @media (max-width: 479px) {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    padding-top: 1.2rem;
    padding-bottom: 0.5rem;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    padding-top: 2.5rem;
    padding-bottom: 0.8rem;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    padding-top: 4rem;
    padding-bottom: 1rem;
  }
  @media (min-width: 1200px) {
    padding-top: 6.5rem;
    padding-bottom: 1rem;
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
  margin-bottom: 6rem;
  margin-top: -4rem;
  padding: 0 3rem;
  gap: 3.5rem;

  @media (max-width: 479px) {
    padding: 0 0.3rem;
    gap: 1.2rem;
    margin-bottom: 2rem;
    margin-top: 2rem;
  }
    
  @media (min-width: 480px) and (max-width: 767px) {
    padding: 0 0.3rem;
    gap: 1.2rem;
    margin-bottom: 2.7rem;
    margin-top: 1rem;
  }

  @media (min-width: 768px) and (max-width: 991px) {
    padding: 0 0.3rem;
    gap: 1.2rem;
    margin-bottom: 2.5rem;
    margin-top: -0.85rem;
  }

  @media (min-width: 992px) and (max-width: 1199px) {
    padding: 0 0.3rem;
    gap: 1.2rem;
    margin-bottom: 4rem;
    margin-top: -1rem;
  }

  @media (min-width: 1200px) {
    padding: 0 0.3rem;
    gap: 1.2rem;
    margin-bottom: 3.5rem;
    margin-top: -5rem;
  }
`;

const PhoneMockup = styled(Box)`
  width: 350px;
  max-width: 350px;
  aspect-ratio: 4 / 5;
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 4px 32px rgba(0,0,0,0.10);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  overflow: hidden;
  flex-shrink: 0;
  @media (max-width: 900px) {
    width: 250px;
    max-width: 250px;
  }
  @media (max-width: 600px) {
    width: 200px;
    max-width: 200px;
  }
  @media (max-width: 480px) {
    width: 150px;
    max-width: 150px;
  }
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
  padding-left: 1rem;
  @media (max-width: 900px) {
    padding-left: 0.5rem;
  }
  @media (max-width: 600px) {
    padding-left: 0.3rem;
  }
`;

const Headline = styled(Typography)`
  && {
    font-size: 2rem;
    font-weight: 100;
    margin-bottom: 3rem;
    color: #F7B6CF;
    font-family: 'SAFIRA MARCH' !important;
    line-height: 1.2;
    max-width: 700px;
    text-align: left;
    margin-left: auto;
    margin-right: auto;
    @media (max-width: 479px) {
      font-size: 0.85rem;
      margin-bottom: 0.8rem;
      padding: 0 0.2rem;
      line-height: 1.3;
    }
    @media (min-width: 480px) and (max-width: 767px) {
      font-size: 1.1rem;
      margin-bottom: 1.2rem;
      padding: 0 0.5rem;
      line-height: 1.25;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      font-size: 1.65rem;
      margin-bottom: 1.5rem;
      padding: 0 0.5rem;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
      font-size: 1.8rem;
      margin-bottom: 2rem;
      padding: 0 0.7rem;
    }
    @media (min-width: 1200px) {
      font-size: 1.8rem;
      margin-bottom: 2rem;
      padding: 0;
    }
  }
`;

const Subheadline = styled(Typography)`
  && {
    font-size: 2rem;
    color: #F7B6CF;
    margin-bottom: 2.2rem;
    font-family: 'SAFIRA MARCH' !important;
    line-height: 1.3;
    max-width: 700px;
    text-align: left;
    margin-left: auto;
    margin-right: auto;
    @media (max-width: 479px) {
      font-size: 0.85rem;
      margin-bottom: 0.5rem;
      padding: 0 0.2rem;
      line-height: 1.3;
    }
    @media (min-width: 480px) and (max-width: 767px) {
      font-size: 1.1rem;
      margin-bottom: 1.2rem;
      padding: 0 0.5rem;
      line-height: 1.25;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      font-size: 1.65rem;
      margin-bottom: 1.2rem;
      padding: 0 0.5rem;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
      font-size: 1.8rem;
      margin-bottom: 1.8rem;
      padding: 0 0.7rem;
    }
    @media (min-width: 1200px) {
      font-size: 1.8rem;
      margin-bottom: 2.2rem;
      padding: 0;
    }
  }
`;


const AboutHeader = styled(Typography)`
  && {
    font-family: 'SAFIRA MARCH' !important;
    font-size: 4rem;
    color: #F7B6CF;
    text-align: center;
    margin-bottom: 2.5rem;
    margin-top: 2.5rem;
    width: 100%;
    @media (max-width: 479px) {
      font-size: 1.8rem;
      margin-bottom: 0.5rem;
      margin-top: 0;
    }
    @media (min-width: 480px) and (max-width: 767px) {
      font-size: 2.5rem;
      margin-bottom: 0.7rem;
      margin-top: 0.5;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      font-size: 3rem;
      margin-bottom: 1.2rem;
      margin-top: 0.5rem;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
      font-size: 3rem;
      margin-bottom: 1.7rem;
      margin-top: 1.7rem;
    }
    @media (min-width: 1200px) {
      font-size: 4rem;
      margin-bottom: 2.5rem;
      margin-top: 2.5rem;
    }
  }
`;


const BottomBox = styled(Box)`
  width: 90%;
  max-width: 800px;
  margin-top: -5rem;
  margin-bottom: 2rem;
  background: #2F5233;
  color: #D9E4D7;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.15);
  
  @media (max-width: 479px) {
    width: 85%;
    max-width: 330px;
    padding: 1rem 1rem;
    border-radius: 12px;
    margin-top: 0.3rem;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    width: 88%;
    max-width: 460px;
    padding: 1rem 1.5rem;
    border-radius: 15px;
    margin-top: 0.3rem;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    width: 90%;
    max-width: 600px;
    padding: 2.5rem 1.5rem;
    border-radius: 18px;
    margin-top: 0.4rem;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    width: 90%;
    max-width: 700px;
    padding: 3rem 2rem;
    border-radius: 20px;
    margin-top: 0.5rem;
  }
  @media (min-width: 1200px) {
    width: 90%;
    max-width: 800px;
    padding: 3rem 2rem;
    border-radius: 20px;
    margin-top: -2rem;
  }
`;

const TitleRow = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 479px) {
    gap: 0.5rem;
    margin-bottom: -0.2rem;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    gap: 0.7rem;
    margin-bottom: -0.1rem;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    gap: 0.8rem;
    margin-bottom: 1.5rem;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    gap: 0.9rem;
    margin-bottom: 1.8rem;
  }
`;

const CloudIcon = styled('div')`
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  &::before {
    content: '💭';
  }
  
  @media (max-width: 479px) {
    font-size: 2rem;
  }
  
  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 2.5rem;
  }
  
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 2.8rem;
  }
  
  @media (min-width: 992px) and (max-width: 1199px) {
    font-size: 3rem;
  }
`;

const HonestTitle = styled('h2')`
  font-family: 'SAFIRA MARCH' !important;
  font-size: 2.5rem;
  color: #F7B6CF;
  text-align: center;
  margin: 0;
  font-weight: normal;
  
  @media (max-width: 479px) {
    font-size: 1.5rem;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 1.8rem;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 2rem;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    font-size: 2.2rem;
  }
`;

const HonestText = styled('p')`
  font-family: 'Didact Gothic', sans-serif;
  font-size: 1.2rem;
  color: #F7B6CF;
  text-align: center;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
  max-width: 900px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 479px) {
    font-size: 0.8rem;
    margin-bottom: 0.8rem;
    line-height: 1.5;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 1.1rem;
    margin-bottom: 1.3rem;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    font-size: 1.15rem;
    margin-bottom: 1.4rem;
  }
`;

const ScriptFont = styled('span')`
  font-family: 'SAFIRA MARCH' !important;
  font-size: 1.8rem;
  color:F7B6CF;
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

const LoadingContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  position: relative;
  z-index: 2;
`;

const ErrorContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  position: relative;
  z-index: 2;
  padding: 2rem;
`;

const About = () => {
  const [content, setContent] = useState({
    headline: "I'm a self-driven Social Media Manager helping beauty, health, and wellness brands rise above the noise and attract the right clients!",
    subheadline: "From content that connects to growth tactics that actually work, everything I do is guided by one goal: to help your business grow with purpose without you wasting time and effort.",
    profile_image: "aboutpic.png",
    honest_title: "Let's Be Honest...",
    honest_text_1: "Running your business is overwhelming. You can't do everything all at once, and the sooner you realize that, the better.",
    honest_text_2: "Building your social media takes time, strategy, and consistency. Without the right help, you're leaving growth, visibility, and potential clients on the table.",
    honest_text_3: "You don't have to do it all. You just need the right support. It's time to move smart."
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Initialize Supabase client
        const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
        const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
        
        if (!supabaseUrl || !supabaseAnonKey) {
          throw new Error('Supabase configuration missing');
        }
        
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        
        // Fetch from Supabase
        const { data, error: supabaseError } = await supabase
          .from('about_content')
          .select('*')
          .single();
        
        if (supabaseError) {
          throw supabaseError;
        }
        
        // Update content with fetched data, keeping defaults if data is empty
        setContent({
          headline: data.headline || "I'm a self-driven Social Media Manager helping beauty, health, and wellness brands rise above the noise and attract the right clients!",
          subheadline: data.subheadline || "From content that connects to growth tactics that actually work, everything I do is guided by one goal: to help your business grow with purpose without you wasting time and effort.",
          profile_image: data.profile_image || "aboutpic.png",
          honest_title: data.honest_title || "Let's Be Honest...",
          honest_text_1: data.honest_text_1 || "Running your business is overwhelming. You can't do everything all at once, and the sooner you realize that, the better.",
          honest_text_2: data.honest_text_2 || "Building your social media takes time, strategy, and consistency. Without the right help, you're leaving growth, visibility, and potential clients on the table.",
          honest_text_3: data.honest_text_3 || "You don't have to do it all. You just need the right support. It's time to move smart."
        });
        
      } catch (err) {
        console.error('Error fetching about content:', err);
        setError('Failed to load content. Using default values.');
      } finally {
        setLoading(false);
      }
    };

    fetchAboutContent();
  }, []);

  // Construct profile image URL
  const profileImageUrl = content.profile_image 
    ? content.profile_image.includes('-') && content.profile_image.includes('.')
      ? `${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/about-images/${content.profile_image}`
      : `/assets/Aboutbackground/${content.profile_image}`
    : profileImg;

  if (loading) {
    return (
      <AboutSection>
        <LoadingContainer>
          <CircularProgress size={60} sx={{ color: '#D71768', mb: 2 }} />
          <Typography variant="h6" sx={{ color: '#F7B6CF' }}>
            Loading...
          </Typography>
        </LoadingContainer>
      </AboutSection>
    );
  }

  return (
    <>
      <AboutSection>
        <ContentRow>
          <PhoneMockup>
            <PhoneImg src={profileImageUrl} alt="Profile" />
          </PhoneMockup>
          <RightContent>
            <AboutHeader variant="h1">About Me</AboutHeader>
            <Headline>{content.headline}</Headline>
            <Subheadline>
              {content.subheadline}
            </Subheadline>
          </RightContent>
        </ContentRow>
        <BottomBox>
          <TitleRow>
            <CloudIcon />
            <HonestTitle>{content.honest_title}</HonestTitle>
          </TitleRow>
          <HonestText>
            {content.honest_text_1}
          </HonestText>
          <HonestText>
            {content.honest_text_2}
          </HonestText>
          <HonestText>
            {content.honest_text_3}
          </HonestText>
        </BottomBox>
        {error && (
          <ErrorContainer>
            <Alert severity="warning" sx={{ mb: 2 }}>
              {error}
            </Alert>
          </ErrorContainer>
        )}
      </AboutSection>
    </>
  );
};

export default About;
