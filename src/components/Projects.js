import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, Tabs, Tab, Pagination, Modal } from '@mui/material';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const ProjectsSection = styled(Box)`
  background:#D9E4D7 ;
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
    grid-template-columns: 1fr;
    gap: 0.2rem;
    margin-bottom: 0.2rem;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 0.4rem;
    margin-bottom: 0.5rem;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 0.7rem;
    margin-bottom: 1rem;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1.2rem;
    margin-bottom: 1.5rem;
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
  }
`;

const ProjectsTitle = styled(Typography)`
&& {
color: #D71768;
  margin-bottom: 2rem !important;
  text-align: center;
  font-family: 'SAFIRA MARCH' !important;
  font-weight: 700;
  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 2rem;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 2.7rem;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    font-size: 3.5rem;
  }
  @media (min-width: 1200px) {
    font-size: 4.4rem;
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
      if (window.innerWidth <= 700) {
        setProjectsPerPage(8);
      } else {
        setProjectsPerPage(10);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
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

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Tabs
              value={selectedCategory}
              onChange={handleCategoryChange}
              textColor="primary"
              indicatorColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                background: '#F7B6CF',
                borderRadius: '8px',
                minHeight: { xs: '38px', sm: '42px', md: '45px', lg: '48px', xl: '52px' },
                padding: { xs: '0 2px', sm: '0 10px', md: '0 30px', lg: '0 50px', xl: '0 80px' },
                '& .MuiTab-root': { 
                  color: '#D71768', 
                  fontWeight: 950, 
                  fontFamily: 'Didact Gothic',
                  fontSize: { xs: '0.85rem', sm: '1rem', md: '1.15rem', lg: '1.25rem', xl: '1.35rem' },
                  minHeight: { xs: '38px', sm: '42px', md: '45px', lg: '48px', xl: '52px' },
                  padding: { xs: '7px 6px', sm: '9px 12px', md: '13px 25px', lg: '15px 32px', xl: '18px 40px' },
                  letterSpacing: '1px',
                },
                '& .Mui-selected': { color: '#fff !important' },
                '& .MuiTabs-indicator': { backgroundColor: '#fff !important'},
              }}
            >
              {categories.map((cat) => (
                <Tab key={cat} label={cat} value={cat} />
              ))}
            </Tabs>
          </Box>

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
                  '& .Mui-selected': {
                    backgroundColor: '#F7B6CF !important', // active page color
                    color: '#222 !important',
                    borderRadius: '8px'
                  },
                  '& .MuiPaginationItem-root': {
                    color: '#222', // normal page color
                    fontWeight: 600,
                    borderRadius: '8px'
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
