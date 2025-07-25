import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import {
  Save,
  Person,
  Description,
  CloudUpload,
  Delete,
  Comment
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

const PreviewSection = styled(Box)`
  padding: 2rem;
  border-top: 1px solid #e2e8f0;
  background: #fafafa;
`;

const PreviewTitle = styled(Typography)`
  && {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #1e293b;
  }
`;

const PreviewContainer = styled(Box)`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  background: #082E04;
  padding: 2rem;
`;

const PreviewContent = styled(Box)`
  color: #F7B6CF;
  text-align: center;
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

const ImagePreview = styled(Box)`
  position: relative;
  display: inline-block;
  border-radius: 8px;
  overflow: hidden;
  max-width: 200px;
  margin: 1rem 0;
`;

const ImageDeleteButton = styled(IconButton)`
  && {
    position: absolute;
    top: 8px;
    right: 8px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 4px;
    
    &:hover {
      background: rgba(0, 0, 0, 0.9);
    }
  }
`;

const HiddenFileInput = styled('input')`
  display: none;
`;

const AboutContentEditor = ({ content, onUpdate, onImageUpload, imagePreview }) => {
  const [formData, setFormData] = useState({
    headline: '',
    subheadline: '',
    profile_image: '',
    honest_title: '',
    honest_text_1: '',
    honest_text_2: '',
    honest_text_3: ''
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = React.useRef(null);

  useEffect(() => {
    if (content) {
      setFormData({
        headline: content.headline || '',
        subheadline: content.subheadline || '',
        profile_image: content.profile_image || '',
        honest_title: content.honest_title || '',
        honest_text_1: content.honest_text_1 || '',
        honest_text_2: content.honest_text_2 || '',
        honest_text_3: content.honest_text_3 || ''
      });
    }
  }, [content]);

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
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
      // Upload image using the wrapper's handler
      const result = await onImageUpload(file);
      if (result.success) {
        setFormData({
          ...formData,
          profile_image: result.fileName
        });
        // setImagePreview(result.publicUrl); // Removed
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
        // setImagePreview(null); // Removed
      }
    } catch (error) {
      setNotification({
        open: true,
        message: `Failed to upload image: ${error.message}`,
        severity: 'error'
      });
      // setImagePreview(null); // Removed
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
    // setImagePreview(null); // Removed
    setFormData({
      ...formData,
      profile_image: ''
    });
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = async () => {
    setSaving(true);
    
    try {
      const result = await onUpdate(formData);
      
      if (result.success) {
        setNotification({
          open: true,
          message: 'Content saved successfully!',
          severity: 'success'
        });
      } else {
        setNotification({
          open: true,
          message: result.error || 'Failed to save content',
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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        handleSave();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [formData]);

  return (
    <>
      <EditorSection>
        <SectionHeader>
          <SectionTitle>
            <Person />
            About Content
          </SectionTitle>
          <SaveButton
            onClick={handleSave}
            disabled={saving}
            startIcon={saving ? <CircularProgress size={20} /> : <Save />}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </SaveButton>
        </SectionHeader>

        <FormContainer>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Headline"
                multiline
                rows={3}
                value={formData.headline}
                onChange={handleInputChange('headline')}
                InputProps={{
                  startAdornment: <Description sx={{ mr: 1, color: '#64748b' }} />
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Subheadline"
                multiline
                rows={3}
                value={formData.subheadline}
                onChange={handleInputChange('subheadline')}
                InputProps={{
                  startAdornment: <Description sx={{ mr: 1, color: '#64748b' }} />
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CloudUpload sx={{ color: '#64748b' }} />
                Profile Image
              </Typography>
              
              <ImageUploadSection
                className={isDragging ? 'dragging' : ''}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleUploadClick}
              >
                <HiddenFileInput
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                />
                
                {imagePreview ? (
                  <ImagePreview>
                    {console.log('imagePreview', imagePreview)}
                    <img
                      src={imagePreview}
                      alt="Profile preview"
                      style={{
                        width: '100%',
                        height: '120px',
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }}
                    />
                    <ImageDeleteButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage();
                      }}
                      size="small"
                    >
                      <Delete fontSize="small" />
                    </ImageDeleteButton>
                  </ImagePreview>
                ) : (
                  <Box>
                    <CloudUpload sx={{ fontSize: 48, color: '#64748b', mb: 2 }} />
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                      {uploading ? 'Uploading...' : 'Click or drag to upload profile image'}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Supports: JPG, PNG, GIF (Max 5MB)
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
              <StyledTextField
                fullWidth
                label="Honest Title"
                value={formData.honest_title}
                onChange={handleInputChange('honest_title')}
                InputProps={{
                  startAdornment: <Comment sx={{ mr: 1, color: '#64748b' }} />
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Honest Text 1"
                multiline
                rows={2}
                value={formData.honest_text_1}
                onChange={handleInputChange('honest_text_1')}
                InputProps={{
                  startAdornment: <Comment sx={{ mr: 1, color: '#64748b' }} />
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Honest Text 2"
                multiline
                rows={2}
                value={formData.honest_text_2}
                onChange={handleInputChange('honest_text_2')}
                InputProps={{
                  startAdornment: <Comment sx={{ mr: 1, color: '#64748b' }} />
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Honest Text 3"
                multiline
                rows={2}
                value={formData.honest_text_3}
                onChange={handleInputChange('honest_text_3')}
                InputProps={{
                  startAdornment: <Comment sx={{ mr: 1, color: '#64748b' }} />
                }}
              />
            </Grid>
          </Grid>
        </FormContainer>

        <PreviewSection>
          <PreviewTitle>
            👁️ Live Preview
          </PreviewTitle>
          <PreviewContainer>
            <PreviewContent>
              <Typography variant="h4" sx={{ mb: 2, color: '#F7B6CF' }}>
                About Me
              </Typography>
              <Typography variant="h6" sx={{ mb: 2, color: '#F7B6CF' }}>
                {formData.headline}
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, color: '#F7B6CF' }}>
                {formData.subheadline}
              </Typography>
              <Typography variant="h5" sx={{ mb: 2, color: '#F7B6CF' }}>
                {formData.honest_title}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, color: '#F7B6CF' }}>
                {formData.honest_text_1}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, color: '#F7B6CF' }}>
                {formData.honest_text_2}
              </Typography>
              <Typography variant="body1" sx={{ color: '#F7B6CF' }}>
                {formData.honest_text_3}
              </Typography>
            </PreviewContent>
          </PreviewContainer>
        </PreviewSection>
      </EditorSection>

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

export default AboutContentEditor; 