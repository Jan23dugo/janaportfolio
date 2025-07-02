import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const ToolsSection = styled(Box)`
  min-height: 80vh;
  padding: 4rem 0;
  background: #082E04;
  display: flex;
  align-items: center;
  
  @media (max-width: 479px) {
    min-height: 60vh;
    padding: 2rem 0;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    min-height: 65vh;
    padding: 2.5rem 0;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    min-height: 75vh;
    padding: 3.5rem 0;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    min-height: 80vh;
    padding: 4rem 0;
  }
  @media (min-width: 1200px) {
    min-height: 85vh;
    padding: 5rem 0;
  }
`;

const BigHeading = styled(Typography)`
  && {
    font-family: 'SAFIRA MARCH' !important;
    font-size: 3rem;
    color: #F7B6CF;
    text-align: center;
    margin-bottom: 1rem;
    @media (max-width: 479px) {
      font-size: 1.8rem;
      margin-bottom: 0.5rem;
    }
    @media (min-width: 480px) and (max-width: 767px) {
      font-size: 2.5rem;
      margin-bottom: 0.7rem;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      font-size: 2.5rem;
      margin-bottom: 0.8rem;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
      font-size: 2.8rem;
      margin-bottom: 0.9rem;
    }
    @media (min-width: 1200px) {
      font-size: 4rem;
      margin-bottom: 1rem;
      margin-top: -0.5rem;
    }
  }
`;

const SubHeading = styled(Typography)`
  && {
    font-family: 'Didact Gothic' !important;
    font-size: 1.3rem;
    font-weight: 400;
    color: #F7B6CF;
    text-align: center;
    margin-bottom: 3rem;
    letter-spacing: 0.5px;
    @media (max-width: 479px) {
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
    }
    @media (min-width: 480px) and (max-width: 767px) {
      font-size: 1rem;
      margin-bottom: 2rem;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      font-size: 1.1rem;
      margin-bottom: 2.5rem;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
      font-size: 1.2rem;
      margin-bottom: 2.8rem;
    }
    @media (min-width: 1200px) {
      font-size: 1.2rem;
      margin-bottom: 3rem;
    }
  }
`;

const ToolItem = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  padding: 0.5rem;
  max-width: 100%;
  min-width: 0;
  
  &:hover {
    transform: translateY(-3px);
    
    .brand-logo {
      transform: scale(1.05);
    }
    
    .tool-name {
      color: #E8458B;
    }
  }
  
  @media (max-width: 479px) {
    padding: 0.3rem;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    padding: 0.4rem;
  }
`;

const ToolIcon = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .brand-logo {
    width: 40px;
    height: 40px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    transition: all 0.3s ease;
  }
  
  @media (max-width: 479px) {
    margin-bottom: 0.3rem;
    
    .brand-logo {
      width: 28px;
      height: 28px;
    }
  }
  @media (min-width: 480px) and (max-width: 767px) {
    margin-bottom: 0.4rem;
    
    .brand-logo {
      width: 32px;
      height: 32px;
    }
  }
  @media (min-width: 768px) and (max-width: 1199px) {
    margin-bottom: 0.4rem;
    
    .brand-logo {
      width: 36px;
      height: 36px;
    }
  }
  @media (min-width: 1200px) {
    margin-bottom: 0.5rem;
    
    .brand-logo {
      width: 48px;
      height: 48px;
    }
  }
`;

const ToolName = styled(Typography)`
  && {
    font-family: 'Didact Gothic' !important;
    font-size: 0.9rem;
    font-weight: 600;
    color: #fff;
    transition: all 0.3s ease;
    
    @media (max-width: 479px) {
      font-size: 0.7rem;
    }
    @media (min-width: 480px) and (max-width: 767px) {
      font-size: 0.75rem;
    }
    @media (min-width: 768px) and (max-width: 1199px) {
      font-size: 0.8rem;
    }
    @media (min-width: 1200px) {
      font-size: 0.95rem;
    }
  }
`;

const MobileSwiperContainer = styled.div`
  @media (max-width: 479px) {
    position: relative;
    width: 100%;
    overflow: hidden;
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 30px;
      height: 100%;
      background: linear-gradient(to left, rgba(8, 46, 4, 0.8), transparent);
      z-index: 2;
      pointer-events: none;
    }
    
    .swiper {
      width: 100%;
      height: auto;
      padding-bottom: 2rem;
    }
    
    .swiper-pagination {
      bottom: 0;
      
      .swiper-pagination-bullet {
        background: #F7B6CF;
        opacity: 0.5;
        width: 8px;
        height: 8px;
      }
      
      .swiper-pagination-bullet-active {
        opacity: 1;
        background: #E8458B;
      }
    }
  }
  
  @media (min-width: 480px) {
    display: none;
  }
`;

const MobileSlideGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 0.8rem;
  justify-items: center;
  width: 100%;
  padding: 0 1rem;
  box-sizing: border-box;
`;

const DesktopToolsGrid = styled.div`
  display: none;
  
  @media (min-width: 480px) and (max-width: 767px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.8rem;
    justify-items: center;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }
  
  @media (min-width: 768px) and (max-width: 1199px) {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.8rem;
    justify-items: center;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }
  
  @media (min-width: 1200px) {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 1rem;
    justify-items: center;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }
`;

const tools = [
  {
    name: 'Canva',
    iconSrc: '/assets/Tools/canva-logo.png'
  },
  {
    name: 'Capcut',
    iconSrc: '/assets/Tools/capcut-logo.png'
  },
  {
    name: 'Inshot',
    iconSrc: '/assets/Tools/inshot-logo.png'
  },
  {
    name: 'Freepik',
    iconSrc: '/assets/Tools/freepik-logo.png'
  },
  {
    name: 'Pixabay',
    iconSrc: '/assets/Tools/pixabay-logo.png'
  },
  {
    name: 'Notion',
    iconSrc: '/assets/Tools/notion-logo.png'
  },
  {
    name: 'Trello',
    iconSrc: '/assets/Tools/trelo-logo.png'
  },
  {
    name: 'Asana',
    iconSrc: '/assets/Tools/asana-logo.png'
  },
  {
    name: 'Metricool',
    iconSrc: '/assets/Tools/metricool-logo.png'
  },
  {
    name: 'Meta Business Suite',
    iconSrc: '/assets/Tools/Meta-logo.png'
  },
  {
    name: 'GDocs',
    iconSrc: '/assets/Tools/gdoc-logo.png'
  },
  {
    name: 'Google Sheets',
    iconSrc: '/assets/Tools/gsheets-logo.png'
  },
  {
    name: 'ChatGPT',
    iconSrc: '/assets/Tools/chatgpt-logo.png'
  },
  {
    name: 'Facebook',
    iconSrc: '/assets/Tools/facebook-logo.png'
  },
  {
    name: 'Instagram',
    iconSrc: '/assets/Tools/instagram-logo.png'
  },
  {
    name: 'Tiktok',
    iconSrc: '/assets/Tools/tiktok-logo.png'
  }
];

// Create chunks of 8 tools for mobile slides (2 rows x 4 icons)
const createMobileSlides = (toolsArray) => {
  const slides = [];
  for (let i = 0; i < toolsArray.length; i += 8) {
    slides.push(toolsArray.slice(i, i + 8));
  }
  return slides;
};

const Tools = () => {
  const mobileSlides = createMobileSlides(tools);
  
  return (
    <ToolsSection id="tools">
      <Container maxWidth="xl" sx={{ padding: '0 1rem', overflow: 'hidden' }}>
        <BigHeading variant="h1">
          My Toolkit
        </BigHeading>
        <SubHeading>
          The essential tools I use to deliver exceptional results
        </SubHeading>
        
        {/* Mobile Swiper (max-width: 479px) */}
        <MobileSwiperContainer>
          <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ 
              clickable: true,
              dynamicBullets: true 
            }}
            touchRatio={1}
            threshold={10}
            longSwipesRatio={0.5}
            longSwipesMs={300}
            followFinger={true}
            grabCursor={true}
          >
            {mobileSlides.map((slideTools, slideIndex) => (
              <SwiperSlide key={slideIndex}>
                <MobileSlideGrid>
                  {slideTools.map((tool, toolIndex) => (
                    <ToolItem key={`${slideIndex}-${toolIndex}`}>
                      <ToolIcon>
                        <div 
                          className="brand-logo"
                          style={{ backgroundImage: `url(${tool.iconSrc})` }}
                        />
                      </ToolIcon>
                      <ToolName variant="h6" className="tool-name">
                        {tool.name}
                      </ToolName>
                    </ToolItem>
                  ))}
                </MobileSlideGrid>
              </SwiperSlide>
            ))}
          </Swiper>
        </MobileSwiperContainer>
        
        {/* Desktop Grid (min-width: 480px) */}
        <DesktopToolsGrid>
          {tools.map((tool, index) => (
            <ToolItem key={index}>
              <ToolIcon>
                <div 
                  className="brand-logo"
                  style={{ backgroundImage: `url(${tool.iconSrc})` }}
                />
              </ToolIcon>
              <ToolName variant="h6" className="tool-name">
                {tool.name}
              </ToolName>
            </ToolItem>
          ))}
        </DesktopToolsGrid>
      </Container>
    </ToolsSection>
  );
};

export default Tools; 