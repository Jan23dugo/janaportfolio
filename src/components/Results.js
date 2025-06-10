import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import styled from 'styled-components';

const results = [
  {
    before: '/assets/Results/BEFORE (1).png',
    after: '/assets/Results/AFTER (1).png',
  },
  {
    before: '/assets/Results/BEFORE (2).png',
    after: '/assets/Results/AFTER (2).png',
  },
  {
    before: '/assets/Results/BEFORE (3).png',
    after: '/assets/Results/AFTER (3).png',
  },
];

const ResultsSection = styled(Box)`
  background: #D9E4D7;
  padding: 2rem 0;
  @media (max-width: 479px) {
    padding: 1rem 0;
  }
`;

const Row = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  @media (max-width: 479px) {
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
`;

const Pair = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1rem;
  @media (max-width: 479px) {
    gap: 0.5rem;
  }
`;

const ImageBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 280px;
  @media (max-width: 479px) {
    max-width: 140px;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    max-width: 180px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    max-width: 220px;
  }
`;

const ResultImage = styled('img')`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 8px;
  background: #e0e0e0;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.02);
  }
  
  @media (max-width: 479px) {
    border-radius: 4px;
    margin-bottom: 0.2rem;
  }
`;

const Label = styled(Typography)`
  font-size: 1rem !important;
  font-weight: 700;
  color: #D71768;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  @media (max-width: 479px) {
    font-size: 0.6rem !important;
    margin-bottom: 0.2rem;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 0.7rem !important;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 0.8rem !important;
  }
`;

// Helper to chunk pairs into rows of 2
function chunkPairs(arr, size) {
  const res = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
}

const Results = () => {
  const pairRows = chunkPairs(results, 2);

  const handleImageClick = (imageUrl) => {
    window.open(imageUrl, '_blank');
  };

  return (
    <ResultsSection>
      <Container maxWidth="md">
        <Typography
          variant="h2"
          sx={{
            color: '#D71768',
            marginBottom: '1rem',
            textAlign: 'center',
            fontFamily: 'SAFIRA MARCH',
            fontSize: {
              xs: '1.8rem',
              sm: '2.2rem',
              md: '2.6rem',
              lg: '3rem',
              xl: '4.5rem',
            },
          }}
        >
          Results
        </Typography>
        {pairRows.map((row, rowIdx) => (
          <Row key={rowIdx}>
            {row.map((pair, idx) => (
              <Pair key={idx}>
                <ImageBox>
                  <Label>Before</Label>
                  <ResultImage 
                    src={pair.before} 
                    alt={`Before result ${rowIdx * 2 + idx + 1}`}
                    onClick={() => handleImageClick(pair.before)}
                  />
                </ImageBox>
                <ImageBox>
                  <Label>After</Label>
                  <ResultImage 
                    src={pair.after} 
                    alt={`After result ${rowIdx * 2 + idx + 1}`}
                    onClick={() => handleImageClick(pair.after)}
                  />
                </ImageBox>
              </Pair>
            ))}
          </Row>
        ))}
      </Container>
    </ResultsSection>
  );
};

export default Results;
