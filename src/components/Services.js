import React, { useRef, useState, useEffect } from 'react';
import { Typography, Box, IconButton, LinearProgress } from '@mui/material';
import styled from 'styled-components';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import InsightsIcon from '@mui/icons-material/Insights';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import EventNoteIcon from '@mui/icons-material/EventNote';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import BrushIcon from '@mui/icons-material/Brush';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ForumIcon from '@mui/icons-material/Forum';
import BarChartIcon from '@mui/icons-material/BarChart';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const servicesData = [
  {
    icon: <LaptopMacIcon fontSize="inherit" />, 
    title: 'Social Media Management',
    desc: `Complete handling of social media accounts, including planning, posting, and growth strategies.`
  },
  {
    icon: <InsightsIcon fontSize="inherit" />, 
    title: 'Market Research',
    desc: `Research on audience interests and competitor activity to guide effective content and strategy.`
  },
  {
    icon: <SearchIcon fontSize="inherit" />, 
    title: 'Social Media Audit',
    desc: `A full review of current social media pages to identify strengths, weaknesses, and improvement areas.`
  },
  {
    icon: <TuneIcon fontSize="inherit" />, 
    title: 'Page Optimization',
    desc: `Updating and improving profiles to look more professional and attract the right audience.`
  },
  {
    icon: <EventNoteIcon fontSize="inherit" />, 
    title: 'Monthly Content Calendar',
    desc: `A full month of content planned in advance, aligned with business goals and key dates.`
  },
  {
    icon: <VideoLibraryIcon fontSize="inherit" />, 
    title: 'Basic Video Editing',
    desc: `Simple, polished edits that improve video quality and make content more engaging.`
  },
  {
    icon: <BrushIcon fontSize="inherit" />, 
    title: 'Graphic Design',
    desc: `Custom graphics designed to match brand style and catch attention on social feeds.`
  },
  {
    icon: <EditNoteIcon fontSize="inherit" />, 
    title: 'Content Curation & Caption Writing',
    desc: `Relevant content selected and paired with well-written captions tailored to the brand voice.`
  },
  {
    icon: <ScheduleIcon fontSize="inherit" />, 
    title: 'Content Scheduling & Publishing',
    desc: `Posts scheduled and published at optimal times for better reach and consistency.`
  },
  {
    icon: <ForumIcon fontSize="inherit" />, 
    title: 'Community Engagement',
    desc: `Responding to comments and messages to keep followers engaged and connected.`
  },
  {
    icon: <BarChartIcon fontSize="inherit" />, 
    title: 'Data Analytics',
    desc: `Clear reports on page performance to track growth and adjust strategies as needed.`
  },
];

const CARD_WIDTH = 340;
const CARD_HEIGHT = 250;
const CARD_GAP = 32;

const ServicesSection = styled(Box)`
  width: 100%;
  background:#D9E4D7;
  padding: 5rem 0 5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 600px) {
    padding: 2.5rem 0 2.5rem 0;
  }
  @media (max-width: 414px) {
    padding: 1.2rem 0 1.2rem 0;
  }
  @media (max-width: 340px) {
    padding: 0.7rem 0 0.7rem 0;
  }
`;

const SectionTitle = styled(Typography)`
  && {
    font-size: 4.5rem;
    font-weight: 800;
    color:#D71768;
    font-family: 'SAFIRA MARCH';
    margin-bottom: 0.5rem;
    text-align: center;
    
    @media (max-width: 479px) {
    font-size: 1.8rem;
    margin-bottom: 0.1rem;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 2.5rem;
    margin-bottom: 0.2rem;
    margin-top: -2.7rem;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 3rem;
    margin-bottom: 0.3rem;
    margin-top: -2.7rem;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    font-size: 3rem;
    margin-bottom: 0.4rem;
  }
  @media (min-width: 1200px) {
    font-size: 4rem;
    margin-bottom: -0.5rem;
    margin-top: -2rem;
  }
`;

const SectionIntro = styled(Typography)`
  && {
    font-size: 2rem;
    color: #D71768;
    font-family: 'SAFIRA MARCH';
    margin-bottom: 3rem;
    text-align: center;
    max-width: 600px;
   @media (max-width: 479px) {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 1.5rem;
    margin-bottom: 1.4rem;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 2.5rem;
    margin-bottom: 0.3rem;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    font-size: 2.7rem;
    margin-bottom: 0.4rem;
  }
  @media (min-width: 1200px) {
    font-size: 2.7rem;
    margin-bottom: 2rem;
  }
  }
`;

const CarouselOuter = styled(Box)`
  width: 100%;
  max-width: 1200px;
  position: relative;
  margin: 0 auto -1rem auto;
`;

const CardsRow = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: ${CARD_GAP}px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding-bottom: 1.5rem;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 600px) {
    gap: 16px;
    padding-bottom: 0.7rem;
  }
  @media (max-width: 414px) {
    gap: 10px;
    padding-bottom: 0.4rem;
  }
`;

const ServiceCard = styled(Box)`
  background: linear-gradient(135deg, #fff 0%, #fefefe 100%);
  border-radius: 1.2rem;
  border: 2px solid #F7B6CF;
  box-shadow: 0 4px 16px rgba(0,0,0,0.10);
  padding: 2.5rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-width: ${CARD_WIDTH}px;
  max-width: ${CARD_WIDTH}px;
  min-height: ${CARD_HEIGHT}px;
  max-height: ${CARD_HEIGHT}px;
  flex: 0 0 ${CARD_WIDTH}px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(247, 182, 207, 0.05) 0%, rgba(215, 23, 104, 0.05) 100%);
    border-radius: 1.2rem;
    z-index: 1;
  }

  & > * {
    position: relative;
    z-index: 2;
  }
  @media (max-width: 479px) {
    min-width: 175px;
    max-width: 175px;
    min-height: 140px;
    max-height: 140px;
    padding: 0.7rem 0.3rem 0.5rem 0.5rem;
    border-radius: 0.5rem;
    margin-left: 0.5rem;
}
  @media (min-width: 480px) and (max-width: 767px) {
    min-width: 230px;
    max-width: 230px;
    min-height: 190px;
    max-height: 190px;
    padding: 1.2rem 0.7rem 1rem 0.7rem;
    border-radius: 0.8rem;
        
    &::before {
      border-radius: 0.8rem;
    }
  }

  @media (min-width: 768px) and (max-width: 991px) {
    min-width: 250px;
    max-width: 250px;
    min-height: 210px;
    max-height: 210px;
    padding: 1.2rem 0.7rem 1rem 0.7rem;
  }

  @media (min-width: 992px) and (max-width: 1199px) {
    min-width: 270px;
    max-width: 270px;
    min-height: 230px;
    max-height: 230px;
    padding: 1.2rem 0.7rem 1rem 0.7rem;
  }

  @media (min-width: 1200px) {
    min-width: 300px;
    max-width: 300px;
    min-height: 250px;
    max-height: 250px;
    padding: 1.2rem 0.7rem 1rem 0.7rem;
  }
`;

const ServiceIcon = styled(Box)`
  color: #D71768;
  font-size: 2.2rem;
  margin-top: 0.5rem;
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  @media (max-width: 479px) {
    font-size: 1rem;
    margin-top: 0.2rem;
    margin-bottom: 0.4rem;
    height: 1.2rem;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 1.3rem;
    margin-top: 0.3rem;
    margin-bottom: 0.5rem;
    height: 1.5rem;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 1.5rem;
    margin-top: 0.4rem;
    margin-bottom: 0.6rem;
    height: 2rem;
  }
`;

const ServiceTitle = styled(Typography)`
  && {
    font-size: 1.4rem;
    font-weight: 700;
    color: #232323;
    font-family: 'SAFIRA MARCH', serif;
    margin-bottom: 0.7rem;
    text-align: center;
    
    @media (max-width: 479px) {
    font-size: 0.8rem;
    margin-bottom: 0.1rem;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 1rem;
    margin-bottom: -0.25rem;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 1.1rem;
    margin-bottom: 0.3rem;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    font-size: 1.2rem;
    margin-bottom: 0.4rem;
  }
  @media (min-width: 1200px) {
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
  }
`;

const ServiceDesc = styled(Typography)`
  && {
    font-size: 1.2rem;
    color: #444;
    font-family: 'Didact Gothic', sans-serif;
    text-align: center;
    line-height: 1.5;
    
        @media (max-width: 479px) {
    font-size: 0.7rem;
    margin-bottom: 0.1rem;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 0.95rem;
    margin-bottom: 0.2rem;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 1rem;
    margin-bottom: 0.3rem;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    font-size: 1.1rem;
    margin-bottom: 0.4rem;
  }
  @media (min-width: 1200px) {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
`;

const CarouselNav = styled(Box)`
  position: absolute;
  right: 0.5rem;
  bottom: 0.2rem;
  z-index: 2;
  display: flex;
  gap: 0.5rem;
  @media (max-width: 600px) {
    gap: 0.3rem;
    right: 0.2rem;
    bottom: 0.1rem;
  }
  @media (max-width: 414px) {
    gap: 0.15rem;
    right: 0.1rem;
    bottom: 0.05rem;
  }
`;

const CarouselButton = styled(IconButton)`
  && {
    background: linear-gradient(135deg, #fff 0%, #fafafa 100%);
    color: #D71768;
    border: 2px solid #F7B6CF;
    border-radius: 50%;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, #F7B6CF 0%, #D71768 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
      border-radius: 50%;
    }
    
    &:hover {
      transform: scale(1.1);
      border-color: #D71768;
      box-shadow: 0 4px 16px rgba(215, 23, 104, 0.25);
      
      &::before {
        opacity: 1;
      }
    }
    
    &:active {
      transform: scale(0.95);
    }
    
    & > svg {
      position: relative;
      z-index: 2;
      transition: color 0.3s ease;
    }
    
    &:hover > svg {
      color: #fff;
    }
    
    font-size: 1.5rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.07);
    @media (max-width: 600px) {
      font-size: 1.1rem;
      width: 32px;
      height: 32px;
    }
    @media (max-width: 414px) {
      font-size: 0.9rem;
      width: 26px;
      height: 26px;
    }
    @media (max-width: 340px) {
      font-size: 0.7rem;
      width: 20px;
      height: 20px;
    }
  }
`;

const ProgressBarWrapper = styled(Box)`
  width: 100%;
  margin-top: -1.2rem;
  margin-bottom: 1.5rem;
  @media (max-width: 600px) {
    margin-top: -0.7rem;
    margin-bottom: 0.7rem;
  }
  @media (max-width: 414px) {
    margin-top: -0.4rem;
    margin-bottom: 0.4rem;
  }
  @media (max-width: 340px) {
    margin-top: -0.2rem;
    margin-bottom: 0.2rem;
  }
`;

const Services = () => {
  const rowRef = useRef();
  const [scroll, setScroll] = useState(0);
  const [maxScroll, setMaxScroll] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (!rowRef.current) return;
      setScroll(rowRef.current.scrollLeft);
      setMaxScroll(rowRef.current.scrollWidth - rowRef.current.clientWidth);
    };
    const row = rowRef.current;
    if (row) {
      row.addEventListener('scroll', handleScroll);
      setMaxScroll(row.scrollWidth - row.clientWidth);
    }
    return () => row && row.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll by one card
  const scrollByCard = (dir) => {
    if (!rowRef.current) return;
    const scrollAmount = CARD_WIDTH + CARD_GAP;
    rowRef.current.scrollBy({ left: dir * scrollAmount, behavior: 'smooth' });
  };

  const progress = maxScroll > 0 ? (scroll / maxScroll) * 100 : 0;

  return (
    <ServicesSection>
      <SectionTitle>My Service Inclusions</SectionTitle>
      <SectionIntro>
      HOW CAN I HELP?
      </SectionIntro>
      <CarouselOuter>
        <CardsRow ref={rowRef}>
          {servicesData.map((service, idx) => (
            <ServiceCard key={idx}>
              <ServiceIcon>{service.icon}</ServiceIcon>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDesc>{service.desc}</ServiceDesc>
            </ServiceCard>
          ))}
        </CardsRow>
        <CarouselNav>
          <CarouselButton onClick={() => scrollByCard(-1)} aria-label="Previous Services">
            <ArrowBackIosNewIcon fontSize="inherit" />
          </CarouselButton>
          <CarouselButton onClick={() => scrollByCard(1)} aria-label="Next Services">
            <ArrowForwardIosIcon fontSize="inherit" />
          </CarouselButton>
        </CarouselNav>
        <ProgressBarWrapper>
          <LinearProgress variant="determinate" value={progress} sx={{ height: 4, borderRadius: 2, background: '#eee', '& .MuiLinearProgress-bar': { background: '#D71768' } }} />
        </ProgressBarWrapper>
      </CarouselOuter>
    </ServicesSection>
  );
};

export default Services; 
