import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Snackbar,
  Alert,
  CircularProgress,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Chip,
  Fab,
  Tooltip,
  Pagination
} from '@mui/material';
import {
  Save,
  Add,
  Edit,
  Delete,
  CloudUpload,
  PhotoCamera,
  Category,
  Title,
  Description
} from '@mui/icons-material';
import styled from 'styled-components';

const EditorSection = styled(Paper)`
  && {
    padding: 0;
    border-radius: 12px;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    overflow: hidden;
  }
`;

const SectionHeader = styled(Box)`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e2e8f0;
  background: linear-gradient(to right, #fafafa, #ffffff);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionTitle = styled(Typography)`
  && {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1e293b;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const FormContainer = styled(Box)`
  padding: 2rem;
`;

const ProjectsGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const ProjectCard = styled(Card)`
  && {
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }
  }
`;

const ProjectImage = styled('img')`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
`;

const StyledTextField = styled(TextField)`
  && {
    .MuiOutlinedInput-root {
      border-radius: 8px;
      transition: all 0.2s;
      
      &:hover .MuiOutlinedInput-notchedOutline {
        border-color: #D71768;
      }
      
      &.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: #D71768;
        box-shadow: 0 0 0 3px rgb(215 23 104 / 0.1);
      }
    }
    
    .MuiInputLabel-root.Mui-focused {
      color: #D71768;
    }
  }
`;

const SaveButton = styled(Button)`
  && {
    background: #D71768;
    color: white;
    text-transform: none;
    border-radius: 8px;
    padding: 0.75rem 2rem;
    font-weight: 500;
    font-size: 0.875rem;
    transition: all 0.2s;
    
    &:hover {
      background: #b91557;
      transform: translateY(-1px);
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    }
    
    &:disabled {
      background: #94a3b8;
      transform: none;
      box-shadow: none;
    }
  }
`;

const AddButton = styled(Fab)`
  && {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: #D71768;
    color: white;
    
    &:hover {
      background: #b91557;
    }
  }
`;

const ImageUploadSection = styled(Box)`
  border: 2px dashed #e2e8f0;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  transition: all 0.2s;
  cursor: pointer;
  
  &:hover {
    border-color: #D71768;
    background: rgba(215, 23, 104, 0.02);
  }
  
  &.dragging {
    border-color: #D71768;
    background: rgba(215, 23, 104, 0.05);
  }
`;

const ProjectsEditor = ({
  projects = [],
  categories = [],
  onCreate,
  onUpdate,
  onDelete,
  onReorder,
  onImageUpload
}) => {
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_path: '',
    category: categories[0]?.name || 'FEED LAYOUT',
    display_order: 0,
    is_active: true
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = React.useRef(null);

  // PAGINATION STATE
  const [page, setPage] = useState(1);
  const projectsPerPage = 10;
  const pageCount = Math.ceil(projects.length / projectsPerPage);
  const paginatedProjects = projects.slice((page - 1) * projectsPerPage, page * projectsPerPage);

  // Helper function to get Supabase storage URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/300x200?text=No+Image';
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http')) return imagePath;
    
    // If it's a local asset path (starts with /assets), return as is
    if (imagePath.startsWith('/assets')) return imagePath;
    
    // It's a Supabase storage filename, convert to full URL
    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
    return `${supabaseUrl}/storage/v1/object/public/project-images/${imagePath}`;
  };

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleSwitchChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.checked
    });
  };

  const handleFileSelect = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setNotification({
        open: true,
        message: 'Please select a valid image file',
        severity: 'error'
      });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setNotification({
        open: true,
        message: 'Image size must be less than 5MB',
        severity: 'error'
      });
      return;
    }
    handleImageUpload(file);
  };

  const handleImageUpload = async (file) => {
    setUploading(true);
    try {
      const result = await onImageUpload(file);
      if (result.success) {
        setFormData({
          ...formData,
          image_path: result.fileName
        });
        setImagePreview(result.publicUrl);
        setNotification({
          open: true,
          message: 'Image uploaded successfully!',
          severity: 'success'
        });
      } else {
        setNotification({
          open: true,
          message: result.error || 'Failed to upload image',
          severity: 'error'
        });
        setImagePreview(null);
      }
    } catch (error) {
      setNotification({
        open: true,
        message: `Failed to upload image: ${error.message}`,
        severity: 'error'
      });
      setImagePreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setFormData({
      ...formData,
      image_path: ''
    });
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      image_path: '',
      category: categories[0]?.name || 'FEED LAYOUT',
      display_order: projects.length + 1,
      is_active: true
    });
    setImagePreview(null);
    setDialogOpen(true);
  };

  const handleEditProject = (project) => {
    console.log('Editing project:', project);
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      image_path: project.image_path,
      category: project.category,
      display_order: project.display_order,
      is_active: project.is_active
    });
    
    // Set image preview using helper function
    setImagePreview(getImageUrl(project.image_path));
    
    setDialogOpen(true);
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      const result = await onDelete(id);
      if (result.success) {
        setNotification({
          open: true,
          message: 'Project deleted successfully!',
          severity: 'success'
        });
      } else {
        setNotification({
          open: true,
          message: result.error || 'Failed to delete project',
          severity: 'error'
        });
      }
    } catch (error) {
      setNotification({
        open: true,
        message: 'An unexpected error occurred',
        severity: 'error'
      });
    }
  };

  const handleSaveProject = async () => {
    if (!formData.title || !formData.image_path) {
      setNotification({
        open: true,
        message: 'Title and image are required',
        severity: 'error'
      });
      return;
    }
    setSaving(true);
    try {
      let result;
      if (editingProject) {
        console.log('Saving edited project:', editingProject);
        console.log('Form data being sent:', formData);
        result = await onUpdate(editingProject.id, formData);
      } else {
        console.log('Creating new project with data:', formData);
        result = await onCreate(formData);
      }
      if (result.success) {
        setDialogOpen(false);
        setNotification({
          open: true,
          message: `Project ${editingProject ? 'updated' : 'created'} successfully!`,
          severity: 'success'
        });
      } else {
        setNotification({
          open: true,
          message: result.error || 'Failed to save project',
          severity: 'error'
        });
      }
    } catch (error) {
      setNotification({
        open: true,
        message: 'An unexpected error occurred',
        severity: 'error'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      image_path: '',
      category: categories[0]?.name || 'FEED LAYOUT',
      display_order: 0,
      is_active: true
    });
    setImagePreview(null);
  };

  return (
    <>
      <EditorSection>
        <SectionHeader>
          <SectionTitle>
            <PhotoCamera />
            Projects Management
          </SectionTitle>
          <Typography variant="body2" color="textSecondary">
            {projects.length} projects
          </Typography>
        </SectionHeader>

        <FormContainer>
          <ProjectsGrid>
            {paginatedProjects.map((project) => (
              <ProjectCard key={project.id}>
                <ProjectImage
                  src={getImageUrl(project.image_path)}
                  alt={project.title}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                  }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {project.description || 'No description'}
                  </Typography>
                  <Box display="flex" gap={1} flexWrap="wrap" mt={1}>
                    <Chip 
                      label={project.category} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                    />
                    <Chip 
                      label={project.is_active ? 'Active' : 'Inactive'} 
                      size="small" 
                      color={project.is_active ? 'success' : 'default'}
                    />
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<Edit />}
                    onClick={() => handleEditProject(project)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </ProjectCard>
            ))}
          </ProjectsGrid>
          {/* PAGINATION CONTROL */}
          {pageCount > 1 && (
            <Box display="flex" justifyContent="center" mt={5} mb={2}>
              <Pagination
                count={pageCount}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
                shape="rounded"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </FormContainer>
      </EditorSection>

      <Tooltip title="Add New Project">
        <AddButton
          color="primary"
          onClick={handleAddProject}
        >
          <Add />
        </AddButton>
      </Tooltip>

      <Dialog 
        open={dialogOpen} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editingProject ? 'Edit Project' : 'Add New Project'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                label="Project Title"
                value={formData.title}
                onChange={handleInputChange('title')}
                InputProps={{
                  startAdornment: <Title sx={{ mr: 1, color: '#64748b' }} />
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  onChange={handleInputChange('category')}
                  startAdornment={<Category sx={{ mr: 1, color: '#64748b' }} />}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.name} value={category.name}>
                      {category.display_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={formData.description}
                onChange={handleInputChange('description')}
                InputProps={{
                  startAdornment: <Description sx={{ mr: 1, color: '#64748b' }} />
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                label="Display Order"
                type="number"
                value={formData.display_order}
                onChange={handleInputChange('display_order')}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.is_active}
                    onChange={handleSwitchChange('is_active')}
                    color="primary"
                  />
                }
                label="Active"
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CloudUpload sx={{ color: '#64748b' }} />
                Project Image
              </Typography>
              
              <ImageUploadSection
                className={isDragging ? 'dragging' : ''}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleUploadClick}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  style={{ display: 'none' }}
                />
                
                {imagePreview ? (
                  <Box>
                    <img
                      src={imagePreview}
                      alt="Project preview"
                      style={{
                        width: '100%',
                        maxWidth: '300px',
                        height: '200px',
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }}
                    />
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={handleRemoveImage}
                      sx={{ mt: 1 }}
                    >
                      Remove Image
                    </Button>
                  </Box>
                ) : (
                  <Box>
                    <CloudUpload sx={{ fontSize: 48, color: '#64748b', mb: 2 }} />
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                      {uploading ? 'Uploading...' : 'Click or drag to upload project image'}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Supports: JPG, PNG, GIF, WebP (Max 5MB)
                    </Typography>
                  </Box>
                )}
                
                {uploading && (
                  <Box sx={{ mt: 2 }}>
                    <CircularProgress size={24} />
                  </Box>
                )}
              </ImageUploadSection>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <SaveButton
            onClick={handleSaveProject}
            disabled={saving}
            startIcon={saving ? <CircularProgress size={20} /> : <Save />}
          >
            {saving ? 'Saving...' : 'Save Project'}
          </SaveButton>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={notification.open}
        autoHideDuration={5000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProjectsEditor; 