import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, Pagination, Modal } from '@mui/material';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const ProjectsSection = styled(Box)`
  background:#082E04 ;
  min-height: 100vh;
  padding: 6rem 0 2rem 0;
  @media (max-width: 479px) {
    padding: 1.2rem 0 0.7rem 0;
    min-height: 70vh;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    padding: 2.5rem 0 1rem 0;
    min-height: 80vh;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    padding: 4rem 0 1.5rem 0;
    min-height: 90vh;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    padding: 5rem 0 2rem 0;
    min-height: 95vh;
  }
  @media (min-width: 1200px) {
    padding: 6rem 0 2rem 0;
    min-height: 100vh;
  }
`;

const GalleryContainer = styled(Container)`
  max-width: 1200px;
  margin: 0 auto;
  @media (max-width: 479px) {
    padding-left: 0.1rem !important;
    padding-right: 0.1rem !important;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    padding-left: 0.5rem !important;
    padding-right: 0.5rem !important;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    padding-left: 1.2rem !important;
    padding-right: 1.2rem !important;
  }
  @media (min-width: 1200px) {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
`;

const ProjectCard = styled(Card)`
  && {
    background: none;
    box-shadow: none;
    border: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    width: 100%;
    height: auto;
    overflow: visible;
    @media (max-width: 479px) {
      border-radius: 0.3rem;
    }
    @media (min-width: 480px) and (max-width: 767px) {
      border-radius: 0.5rem;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      border-radius: 0.8rem;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
      border-radius: 1rem;
    }
    @media (min-width: 1200px) {
      border-radius: 1.2rem;
    }
  }
`;

const ProjectImage = styled('img')`
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
  max-width: 100%;
  max-height: 320px;
  margin: 0 auto;
  border-radius: 8px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
  }
  
  @media (max-width: 479px) {
    max-height: 180px;
    border-radius: 4px;
  }
  
  @media (min-width: 480px) and (max-width: 767px) {
    max-height: 220px;
    border-radius: 6px;
  }
  
  @media (min-width: 768px) and (max-width: 991px) {
    max-height: 260px;
  }
  
  @media (min-width: 992px) and (max-width: 1199px) {
    max-height: 290px;
  }
`;

const categories = [
  'All',
  'FEED LAYOUT',
  'GRAPHICS',
];

const projects = [
  {
    title: 'Feed Layout 1',
    description: '',
    image: '/assets/SampleWorks/feedlayout1.png',
    technologies: [],
    github: '',
    live: '',
    category: 'FEED LAYOUT',
  },
  {
    title: 'Aesthetic Buildings',
    description: '',
    image: '/assets/SampleWorks/feedlayout2.png',
    technologies: [],
    github: '',
    live: '',
    category: 'FEED LAYOUT',
  },
  {
    title: 'Curved Modern Architecture',
    description: 'Gallery',
    image: '/assets/SampleWorks/feedlayout3.png',
    technologies: [],
    github: '',
    live: '',
    category: 'FEED LAYOUT',
  },
  {
    title: 'Abstract Angles',
    description: '',
    image: '/assets/Graphics/graphics1.png',
    technologies: [],
    github: '',
    live: '',
    category: 'GRAPHICS',
  },
  {
    title: 'Minimalist Tower',
    description: 'Link',
    image: '/assets/Graphics/graphics2.png',
    technologies: [],
    github: '',
    live: '',
    category: 'GRAPHICS',
  },
  {
    title: 'White Lines',
    description: 'Image',
    image: '/assets/Graphics/graphics3.png',
    technologies: [],
    github: '',
    live: '',
    category: 'GRAPHICS',
  },
  {
    title: 'Urban Minimalism',
    description: '',
    image: '/assets/SampleWorks/feedlayout4.png',
    technologies: [],
    github: '',
    live: '',
    category: 'FEED LAYOUT',
  },
  {
    title: 'Symmetry in Design',
    description: '',
    image: '/assets/SampleWorks/feedlayout5.png',
    technologies: [],
    github: '',
    live: '',
    category: 'FEED LAYOUT',
  },
  {
    title: 'Modern Facade',
    description: '',
    image: '/assets/SampleWorks/feedlayout6.png',
    technologies: [],
    github: '',
    live: '',
    category: 'FEED LAYOUT',
  },
  {
    title: 'Geometric Patterns',
    description: '',
    image: '/assets/SampleWorks/feedlayout7.png',
    technologies: [],
    github: '',
    live: '',
    category: 'FEED LAYOUT',
  },
  {
    title: 'Blue Skies',
    description: '',
    image: '/assets/SampleWorks/feedlayout8.png',
    technologies: [],
    github: '',
    live: '',
    category: 'FEED LAYOUT',
  },
  
  {
    title: 'Sky High',
    description: 'Gallery',
    image: '/assets/Graphics/graphics4.png',
    technologies: [],
    github: '',
    live: '',
    category: 'GRAPHICS',
  },
  {
    title: 'Sky High',
    description: 'Gallery',
    image: '/assets/Graphics/graphics5.png',
    technologies: [],
    github: '',
    live: '',
    category: 'GRAPHICS',
  },
  {
    title: 'Sky High',
    description: 'Gallery',
    image: '/assets/Graphics/graphics6.png',
    technologies: [],
    github: '',
    live: '',
    category: 'GRAPHICS',
  },
  {
    title: 'Sky High',
    description: 'Gallery',
    image: '/assets/Graphics/graphics7.png',
    technologies: [],
    github: '',
    live: '',
    category: 'GRAPHICS',
  },
  {
    title: 'Sky High',
    description: 'Gallery',
    image: '/assets/Graphics/graphics8.png',
    technologies: [],
    github: '',
    live: '',
    category: 'GRAPHICS',
  },
  {
    title: 'Sky High',
    description: 'Gallery',
    image: '/assets/Graphics/graphics9.png',
    technologies: [],
    github: '',
    live: '',
    category: 'GRAPHICS',
  },
  {
    title: 'Sky High',
    description: 'Gallery',
    image: '/assets/Graphics/graphics10.png',
    technologies: [],
    github: '',
    live: '',
    category: 'GRAPHICS',
  },
  {
    title: 'Sky High',
    description: 'Gallery',
    image: '/assets/Graphics/graphics11.png',
    technologies: [],
    github: '',
    live: '',
    category: 'GRAPHICS',
  },
];

const ProjectsGrid = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
  justify-items: center;

  @media (max-width: 479px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 0.8rem;
    margin-bottom: 1.2rem;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1.5rem;
    margin-bottom: 1.8rem;
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
  }
`;

const ProjectsTitle = styled(Typography)`
&& {
  color: #F7B6CF;
margin-bottom: 1rem;
text-align: center;
font-family: 'SAFIRA MARCH' !important;
 width: 100%;

@media (max-width: 479px) {
  font-size: 1.9rem;
  margin-bottom: 1.5rem;
  margin-top: 1rem;
}

@media (min-width: 480px) and (max-width: 767px) {
  font-size: 2.5rem;
  margin-bottom: 1.7rem;
  margin-top: 1rem;
}

@media (min-width: 768px) and (max-width: 991px) {
  font-size: 3rem;
  margin-bottom: 1.7rem;
  margin-top: -1rem;
}

@media (min-width: 992px) and (max-width: 1199px) {
  font-size: 3rem;
  margin-bottom: 1.7rem;
  margin-top: 1.7rem;
}

@media (min-width: 1200px) {
  font-size: 4rem;
  margin-bottom: 2.5rem;
  margin-top: -1.2rem;
}
}
`;

const TabContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  
  @media (max-width: 479px) {
    gap: 0.5rem;
    margin-bottom: 1.2rem;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    gap: 0.7rem;
    margin-bottom: 2rem;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    gap: 0.8rem;
    margin-bottom: 2.5rem;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    gap: 0.9rem;
    margin-bottom: 2.8rem;
  }
`;

const TabButton = styled.button`
  background: ${props => props.active ? 
    'linear-gradient(135deg, #D71768 0%, #F7B6CF 100%)' : 
    'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)'};
  color: ${props => props.active ? '#fff' : '#D71768'};
  border: 2px solid ${props => props.active ? '#D71768' : '#F7B6CF'};
  border-radius: 25px;
  padding: 0.8rem 2rem;
  font-family: 'Didact Gothic', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: ${props => props.active ? 
    '0 4px 16px rgba(215, 23, 104, 0.25)' : 
    '0 2px 8px rgba(0, 0, 0, 0.08)'};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #D71768 0%, #F7B6CF 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 23px;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.active ? 
      '0 6px 20px rgba(215, 23, 104, 0.35)' : 
      '0 4px 16px rgba(247, 182, 207, 0.25)'};
    border-color: #D71768;
    
    &::before {
      opacity: ${props => props.active ? '0' : '1'};
    }
  }
  
  &:hover:not([data-active="true"]) {
    color: #fff;
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  & > span {
    position: relative;
    z-index: 2;
  }
  
  @media (max-width: 479px) {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    border-radius: 20px;
    
    &::before {
      border-radius: 18px;
    }
  }
  @media (min-width: 480px) and (max-width: 767px) {
    padding: 0.6rem 1.3rem;
    font-size: 0.8rem;
    border-radius: 22px;
    
    &::before {
      border-radius: 20px;
    }
  }
  @media (min-width: 768px) and (max-width: 991px) {
    padding: 0.6rem 1.5rem;
    font-size: 1rem;
    border-radius: 24px;
    
    &::before {
      border-radius: 22px;
    }
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    padding: 0.8rem 1.9rem;
    font-size: 1.05rem;
    border-radius: 25px;
    
    &::before {
      border-radius: 23px;
    }
  }
  @media (min-width: 1200px) {
    padding: 0.8rem 2rem;
    font-size: 1.1rem;
    border-radius: 25px;
    
    &::before {
      border-radius: 23px;
    }
  }
`;

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [projectsPerPage, setProjectsPerPage] = useState(6);
  const [openModal, setOpenModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 479) {
        setProjectsPerPage(4); // Show 4 projects on mobile for better viewing
      } else if (window.innerWidth <= 767) {
        setProjectsPerPage(8);
      } else if (window.innerWidth <= 991) {
        setProjectsPerPage(8);
      } else if (window.innerWidth <= 1199) {
        setProjectsPerPage(8);
      } else {
        setProjectsPerPage(10);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleImageClick = (imgSrc) => {
    setModalImage(imgSrc);
    setOpenModal(true);
  };

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const pageCount = Math.ceil(filteredProjects.length / projectsPerPage);
  const paginatedProjects = filteredProjects.slice(
    (page - 1) * projectsPerPage,
    page * projectsPerPage
  );

  return (
    <ProjectsSection>
      <GalleryContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProjectsTitle variant="h2">
            My Projects
          </ProjectsTitle>

          <TabContainer>
            {categories.map((category) => (
              <TabButton
                key={category}
                active={selectedCategory === category}
                data-active={selectedCategory === category}
                onClick={() => handleCategoryChange(category)}
              >
                <span>{category}</span>
              </TabButton>
            ))}
          </TabContainer>

          <ProjectsGrid>
            {paginatedProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ width: '100%', height: '100%' }}
              >
                <ProjectCard>
                  <ProjectImage
                    src={project.image}
                    alt={project.title}
                    onClick={() => handleImageClick(project.image)}
                    style={{ cursor: 'pointer' }}
                  />
                </ProjectCard>
              </motion.div>
            ))}
          </ProjectsGrid>

          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Box
              sx={{
                outline: 'none',
                maxWidth: '90vw',
                maxHeight: '90vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 24,
                p: 1,
              }}
            >
              <img
                src={modalImage}
                alt="Full Size"
                style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: '8px' }}
              />
            </Box>
          </Modal>

          {pageCount > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={pageCount}
                page={page}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
                siblingCount={1}
                boundaryCount={1}
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: '#D71768',
                    fontWeight: 600,
                    fontFamily: 'Didact Gothic, sans-serif',
                    fontSize: '1rem',
                    margin: '0 0.3rem',
                    minWidth: '40px',
                    height: '40px',
                    borderRadius: '20px',
                    border: '2px solid #F7B6CF',
                    background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #D71768 0%, #F7B6CF 100%)',
                      color: '#fff',
                      borderColor: '#D71768',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 16px rgba(247, 182, 207, 0.25)',
                    },
                    '&.Mui-disabled': {
                      background: 'linear-gradient(135deg, #f1f3f4 0%, #e8eaed 100%)',
                      color: '#9aa0a6',
                      borderColor: '#e8eaed',
                      opacity: 0.6,
                    }
                  },
                  '& .Mui-selected': {
                    backgroundColor: 'transparent !important',
                    background: 'linear-gradient(135deg, #D71768 0%, #F7B6CF 100%) !important',
                    color: '#fff !important',
                    borderColor: '#D71768 !important',
                    boxShadow: '0 4px 16px rgba(215, 23, 104, 0.25) !important',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #D71768 0%, #F7B6CF 100%) !important',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 6px 20px rgba(215, 23, 104, 0.35) !important',
                    }
                  },
                  '& .MuiPaginationItem-previousNext': {
                    borderRadius: '20px',
                    minWidth: '40px',
                    fontSize: '1.1rem',
                    '& .MuiSvgIcon-root': {
                      fontSize: '1.2rem',
                    }
                  },
                  '@media (max-width: 479px)': {
                    '& .MuiPaginationItem-root': {
                      minWidth: '32px',
                      height: '32px',
                      fontSize: '0.85rem',
                      margin: '0 0.2rem',
                      borderRadius: '16px',
                    },
                    '& .MuiPaginationItem-previousNext': {
                      borderRadius: '16px',
                      minWidth: '32px',
                      '& .MuiSvgIcon-root': {
                        fontSize: '1rem',
                      }
                    }
                  },
                  '@media (min-width: 480px) and (max-width: 767px)': {
                    '& .MuiPaginationItem-root': {
                      minWidth: '36px',
                      height: '36px',
                      fontSize: '0.9rem',
                      margin: '0 0.25rem',
                      borderRadius: '18px',
                    },
                    '& .MuiPaginationItem-previousNext': {
                      borderRadius: '18px',
                      minWidth: '36px',
                      '& .MuiSvgIcon-root': {
                        fontSize: '1.1rem',
                      }
                    }
                  },
                  '@media (min-width: 768px) and (max-width: 991px)': {
                    '& .MuiPaginationItem-root': {
                      minWidth: '38px',
                      height: '38px',
                      fontSize: '0.95rem',
                      margin: '0 0.28rem',
                      borderRadius: '19px',
                    },
                    '& .MuiPaginationItem-previousNext': {
                      borderRadius: '19px',
                      minWidth: '38px',
                      '& .MuiSvgIcon-root': {
                        fontSize: '1.15rem',
                      }
                    }
                  }
                }}
              />
            </Box>
          )}
        </motion.div>
      </GalleryContainer>
    </ProjectsSection>
  );
};

export default Projects;
