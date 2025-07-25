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
  Switch,
  FormControlLabel,
  Fab,
  Tooltip,
  Chip
} from '@mui/material';
import {
  Save,
  Add,
  Edit,
  Delete,
  CloudUpload,
  PhotoCamera,
  Title,
  Description,
  CompareArrows
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

const ResultsGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const ResultCard = styled(Card)`
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

const ImageContainer = styled(Box)`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px 8px 0 0;
`;

const BeforeAfterImage = styled('img')`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 6px;
  border: 2px solid #e2e8f0;
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

const ResultsEditor = ({
  results = [],
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
  const [editingResult, setEditingResult] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    before_image: '',
    after_image: '',
    display_order: 0,
    is_active: true
  });
  const [beforeImagePreview, setBeforeImagePreview] = useState(null);
  const [afterImagePreview, setAfterImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const beforeFileInputRef = React.useRef(null);
  const afterFileInputRef = React.useRef(null);

  // Helper function to get Supabase storage URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/300x200?text=No+Image';
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http')) return imagePath;
    
    // If it's a local asset path (starts with /assets), return as is
    if (imagePath.startsWith('/assets')) return imagePath;
    
    // It's a Supabase storage filename, convert to full URL
    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
    return `${supabaseUrl}/storage/v1/object/public/results-images/${imagePath}`;
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

  const handleFileSelect = async (file, imageType) => {
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
    await handleImageUpload(file, imageType);
  };

  const handleImageUpload = async (file, imageType) => {
    setUploading(true);
    try {
      const result = await onImageUpload(file);
      if (result.success) {
        setFormData({
          ...formData,
          [imageType]: result.fileName
        });
        
        if (imageType === 'before_image') {
          setBeforeImagePreview(result.publicUrl);
        } else {
          setAfterImagePreview(result.publicUrl);
        }
        
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
      }
    } catch (error) {
      setNotification({
        open: true,
        message: `Failed to upload image: ${error.message}`,
        severity: 'error'
      });
    } finally {
      setUploading(false);
    }
  };

  const handleFileInputChange = (event, imageType) => {
    const file = event.target.files[0];
    if (file) {
      handleFileSelect(file, imageType);
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

  const handleDrop = (event, imageType) => {
    event.preventDefault();
    setIsDragging(false);
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0], imageType);
    }
  };

  const handleRemoveImage = (imageType) => {
    if (imageType === 'before_image') {
      setBeforeImagePreview(null);
      setFormData({
        ...formData,
        before_image: ''
      });
      if (beforeFileInputRef.current) {
        beforeFileInputRef.current.value = '';
      }
    } else {
      setAfterImagePreview(null);
      setFormData({
        ...formData,
        after_image: ''
      });
      if (afterFileInputRef.current) {
        afterFileInputRef.current.value = '';
      }
    }
  };

  const handleUploadClick = (imageType) => {
    if (imageType === 'before_image') {
      beforeFileInputRef.current?.click();
    } else {
      afterFileInputRef.current?.click();
    }
  };

  const handleAddResult = () => {
    setEditingResult(null);
    setFormData({
      title: '',
      description: '',
      before_image: '',
      after_image: '',
      display_order: results.length + 1,
      is_active: true
    });
    setBeforeImagePreview(null);
    setAfterImagePreview(null);
    setDialogOpen(true);
  };

  const handleEditResult = (result) => {
    console.log('Editing result:', result);
    setEditingResult(result);
    setFormData({
      title: result.title,
      description: result.description,
      before_image: result.before_image,
      after_image: result.after_image,
      display_order: result.display_order,
      is_active: result.is_active
    });
    
    // Set image previews using helper function
    setBeforeImagePreview(getImageUrl(result.before_image));
    setAfterImagePreview(getImageUrl(result.after_image));
    
    setDialogOpen(true);
  };

  const handleDeleteResult = async (id) => {
    if (!window.confirm('Are you sure you want to delete this result?')) return;
    try {
      const result = await onDelete(id);
      if (result.success) {
        setNotification({
          open: true,
          message: 'Result deleted successfully!',
          severity: 'success'
        });
      } else {
        setNotification({
          open: true,
          message: result.error || 'Failed to delete result',
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

  const handleSaveResult = async () => {
    if (!formData.title || !formData.before_image || !formData.after_image) {
      setNotification({
        open: true,
        message: 'Title, before image, and after image are required',
        severity: 'error'
      });
      return;
    }
    setSaving(true);
    try {
      let result;
      if (editingResult) {
        console.log('Saving edited result:', editingResult);
        console.log('Form data being sent:', formData);
        result = await onUpdate(editingResult.id, formData);
      } else {
        console.log('Creating new result with data:', formData);
        result = await onCreate(formData);
      }
      if (result.success) {
        setDialogOpen(false);
        setNotification({
          open: true,
          message: `Result ${editingResult ? 'updated' : 'created'} successfully!`,
          severity: 'success'
        });
      } else {
        setNotification({
          open: true,
          message: result.error || 'Failed to save result',
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
    setEditingResult(null);
    setFormData({
      title: '',
      description: '',
      before_image: '',
      after_image: '',
      display_order: 0,
      is_active: true
    });
    setBeforeImagePreview(null);
    setAfterImagePreview(null);
  };

  return (
    <>
      <EditorSection>
        <SectionHeader>
          <SectionTitle>
            <CompareArrows />
            Results Management
          </SectionTitle>
          <Typography variant="body2" color="textSecondary">
            {results.length} results
          </Typography>
        </SectionHeader>

        <FormContainer>
          <ResultsGrid>
            {results.map((result) => (
              <ResultCard key={result.id}>
                <ImageContainer>
                  <Box flex={1}>
                    <Typography variant="caption" color="textSecondary" display="block" mb={1}>
                      Before
                    </Typography>
                    <BeforeAfterImage
                      src={getImageUrl(result.before_image)}
                      alt={`Before ${result.title}`}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/150x120?text=Before';
                      }}
                    />
                  </Box>
                  <Box flex={1}>
                    <Typography variant="caption" color="textSecondary" display="block" mb={1}>
                      After
                    </Typography>
                    <BeforeAfterImage
                      src={getImageUrl(result.after_image)}
                      alt={`After ${result.title}`}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/150x120?text=After';
                      }}
                    />
                  </Box>
                </ImageContainer>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {result.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {result.description || 'No description'}
                  </Typography>
                  <Box display="flex" gap={1} flexWrap="wrap" mt={1}>
                    <Chip 
                      label={result.is_active ? 'Active' : 'Inactive'} 
                      size="small" 
                      color={result.is_active ? 'success' : 'default'}
                    />
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<Edit />}
                    onClick={() => handleEditResult(result)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => handleDeleteResult(result.id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </ResultCard>
            ))}
          </ResultsGrid>
        </FormContainer>
      </EditorSection>

      <Tooltip title="Add New Result">
        <AddButton
          color="primary"
          onClick={handleAddResult}
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
          {editingResult ? 'Edit Result' : 'Add New Result'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                label="Result Title"
                value={formData.title}
                onChange={handleInputChange('title')}
                InputProps={{
                  startAdornment: <Title sx={{ mr: 1, color: '#64748b' }} />
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
                Before Image
              </Typography>
              
              <ImageUploadSection
                className={isDragging ? 'dragging' : ''}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, 'before_image')}
                onClick={() => handleUploadClick('before_image')}
              >
                <input
                  ref={beforeFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileInputChange(e, 'before_image')}
                  style={{ display: 'none' }}
                />
                
                {beforeImagePreview ? (
                  <Box>
                    <img
                      src={beforeImagePreview}
                      alt="Before preview"
                      style={{
                        width: '100%',
                        maxWidth: '200px',
                        height: '120px',
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }}
                    />
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleRemoveImage('before_image')}
                      sx={{ mt: 1 }}
                    >
                      Remove Image
                    </Button>
                  </Box>
                ) : (
                  <Box>
                    <CloudUpload sx={{ fontSize: 48, color: '#64748b', mb: 2 }} />
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                      {uploading ? 'Uploading...' : 'Click or drag to upload before image'}
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
            
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CloudUpload sx={{ color: '#64748b' }} />
                After Image
              </Typography>
              
              <ImageUploadSection
                className={isDragging ? 'dragging' : ''}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, 'after_image')}
                onClick={() => handleUploadClick('after_image')}
              >
                <input
                  ref={afterFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileInputChange(e, 'after_image')}
                  style={{ display: 'none' }}
                />
                
                {afterImagePreview ? (
                  <Box>
                    <img
                      src={afterImagePreview}
                      alt="After preview"
                      style={{
                        width: '100%',
                        maxWidth: '200px',
                        height: '120px',
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }}
                    />
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleRemoveImage('after_image')}
                      sx={{ mt: 1 }}
                    >
                      Remove Image
                    </Button>
                  </Box>
                ) : (
                  <Box>
                    <CloudUpload sx={{ fontSize: 48, color: '#64748b', mb: 2 }} />
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                      {uploading ? 'Uploading...' : 'Click or drag to upload after image'}
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
            onClick={handleSaveResult}
            disabled={saving}
            startIcon={saving ? <CircularProgress size={20} /> : <Save />}
          >
            {saving ? 'Saving...' : 'Save Result'}
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

export default ResultsEditor; 