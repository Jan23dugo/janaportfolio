import React, { useState } from 'react';
import { Container, Typography, Box, Modal, IconButton } from '@mui/material';
import styled from 'styled-components';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';

const results = [
  {
    before: '/assets/Results/BEFORE (1).png',
    after: '/assets/Results/AFTER (1).png',
  },
  {
    before: '/assets/Results/BEFORE (3).png',
    after: '/assets/Results/AFTER (3).png',
  },
  {
    before: '/assets/Results/BEFORE (2).png',
    after: '/assets/Results/AFTER (2).png',
  },

];

const ResultsSection = styled(Box)`
  background: #D9E4D7;
  padding: 2.5rem 0;
  @media (max-width: 479px) {
    padding: 1rem 0 0.8rem 0;
  }
`;

const ResultsGrid = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 1.5rem;
  
  @media (max-width: 479px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
    margin-top: 0.8rem;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    grid-template-columns: 1fr 1fr;
    gap: 0.8rem;
    margin-top: 1rem;
    
    /* Center the last item when there are odd number of items */
    & > :nth-child(3n) {
      grid-column: 1 / -1;
      justify-self: center;
      width: calc((100% - 0.8rem) / 2);
    }
  }
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    
    /* Center the last item when there are odd number of items */
    & > :nth-child(3n) {
      grid-column: 1 / -1;
      justify-self: center;
      width: calc((100% - 1.5rem) / 2);
    }
  }
`;

const ResultCard = styled(Box)`
  background: linear-gradient(135deg, #fff 0%, #fefefe 100%);
  border-radius: 12px;
  border: 2px solid #F7B6CF;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  padding: 1.2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
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
    background: linear-gradient(135deg, rgba(247, 182, 207, 0.03) 0%, rgba(215, 23, 104, 0.03) 100%);
    border-radius: 10px;
    z-index: 1;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 28px rgba(215, 23, 104, 0.1), 0 3px 12px rgba(247, 182, 207, 0.06);
    border-color: #D71768;
  }
  
  & > * {
    position: relative;
    z-index: 2;
  }
  
  @media (max-width: 479px) {
    flex-direction: row;
    padding: 0.3rem;
    gap: 2rem;
    border-radius: 6px;
    
    &::before {
      border-radius: 4px;
    }
  }
  @media (min-width: 480px) and (max-width: 767px) {
    flex-direction: row;
    padding: 0.6rem;
    gap: 0.5rem;
    border-radius: 10px;
    
    &::before {
      border-radius: 8px;
    }
  }
  @media (min-width: 768px) and (max-width: 991px) {
    padding: 1.1rem;
    gap: 0.8rem;
    border-radius: 10px;
    
    &::before {
      border-radius: 8px;
    }
  }
`;

const ImageContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  max-width: 180px;
  
  @media (max-width: 479px) {
    max-width: 140px;
    flex: 1;
    width: 100%;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    max-width: 120px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    max-width: 140px;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    max-width: 160px;
  }
  @media (min-width: 1200px) {
    max-width: 220px;
  }
`;

const ResultImage = styled('img')`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: contain;
  object-position: center;
  border-radius: 8px;
  background: #f8f9fa;
  margin-top: 0.4rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 0.2rem;
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 16px rgba(215, 23, 104, 0.1);
    border-radius: 10px;
  }
  
  @media (max-width: 479px) {
    border-radius: 4px;
    margin-top: 0.1rem;
    padding: 0.05rem;
    
    &:hover {
      border-radius: 6px;
    }
  }
  @media (min-width: 480px) and (max-width: 767px) {
    border-radius: 6px;
    margin-top: 0.15rem;
    padding: 0.15rem;
    
    &:hover {
      border-radius: 8px;
    }
  }
`;

const Label = styled(Typography)`
  font-size: 0.85rem !important;
  font-weight: 700;
  color: #D71768;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'Didact Gothic', sans-serif;
  text-align: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 24px;
    height: 2px;
    background: linear-gradient(135deg, #F7B6CF 0%, #D71768 100%);
    border-radius: 1px;
  }
  
  @media (max-width: 479px) {
    font-size: 0.7rem !important;
    letter-spacing: 0.5px;
    
    &::after {
      width: 18px;
      height: 1px;
    }
  }
  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 0.8rem !important;
    
    &::after {
      width: 22px;
    }
  }
`;

const ArrowSeparator = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #D71768 0%, #F7B6CF 100%);
  border-radius: 50%;
  width: 35px;
  height: 35px;
  color: #fff;
  box-shadow: 0 2px 10px rgba(215, 23, 104, 0.18);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  
  ${ResultCard}:hover & {
    transform: scale(1.05);
    box-shadow: 0 3px 14px rgba(215, 23, 104, 0.22);
  }
  
  & .MuiSvgIcon-root {
    font-size: 1.1rem;
  }
  
  @media (max-width: 479px) {
    width: 21px;
    height: 21px;
    
    & .MuiSvgIcon-root {
      font-size: 0.55rem;
    }
  }
  @media (min-width: 480px) and (max-width: 767px) {
    width: 24px;
    height: 24px;
    
    & .MuiSvgIcon-root {
      font-size: 0.8rem;
    }
  }
  @media (min-width: 768px) and (max-width: 991px) {
    width: 32px;
    height: 32px;
    
    & .MuiSvgIcon-root {
      font-size: 1rem;
    }
  }
`;

const ModalImage = styled('img')`
  max-width: 90vw;
  max-height: 85vh;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled(IconButton)`
  && {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.9);
    color: #D71768;
    backdrop-filter: blur(10px);
    border: 2px solid #F7B6CF;
    transition: all 0.3s ease;
    
    &:hover {
      background: #D71768;
      color: #fff;
      transform: scale(1.1);
    }
  }
`;

const ResultsTitle = styled(Typography)`
  && {
    color: #D71768;
    margin-bottom: 1rem;
    margin-top: 1.2rem;
    text-align: center;
    font-family: 'SAFIRA MARCH';
    
    @media (max-width: 479px) {
      font-size: 1.8rem;
    }
    @media (min-width: 480px) and (max-width: 767px) {
      font-size: 2.5rem;
      margin-top: 1rem;
      margin-bottom: 1.7rem;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      font-size: 3rem;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
      font-size: 3rem;
    }
    @media (min-width: 1200px) {
      font-size: 4.5rem;
    }
  }
`;

const Results = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const handleImageClick = (imageUrl) => {
    setModalImage(imageUrl);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalImage(null);
  };

  return (
    <ResultsSection>
      <Container maxWidth="lg">
        <ResultsTitle variant="h2">
          Results
        </ResultsTitle>
        
        <ResultsGrid>
          {results.map((result, index) => (
            <ResultCard key={index}>
              <ImageContainer>
                <Label>Before</Label>
                <ResultImage 
                  src={result.before} 
                  alt={`Before result ${index + 1}`}
                  onClick={() => handleImageClick(result.before)}
                />
              </ImageContainer>
              
              <ArrowSeparator>
                <ArrowForwardIcon fontSize="large" />
              </ArrowSeparator>
              
              <ImageContainer>
                <Label>After</Label>
                <ResultImage 
                  src={result.after} 
                  alt={`After result ${index + 1}`}
                  onClick={() => handleImageClick(result.after)}
                />
              </ImageContainer>
            </ResultCard>
          ))}
        </ResultsGrid>
        
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            p: 2
          }}
        >
          <Box sx={{ position: 'relative', outline: 'none' }}>
            <CloseButton onClick={handleCloseModal}>
              <CloseIcon />
            </CloseButton>
            {modalImage && (
              <ModalImage 
                src={modalImage} 
                alt="Full size result" 
              />
            )}
          </Box>
        </Modal>
      </Container>
    </ResultsSection>
  );
};

export default Results;
