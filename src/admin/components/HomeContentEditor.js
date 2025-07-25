import React, { useState, useEffect, useRef } from 'react';
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
  Avatar
} from '@mui/material';
import { Save, Home, FormatQuote, Person, Work, Image, CloudUpload, Delete } from '@mui/icons-material';
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
`;

const PreviewBackground = styled(Box)`
  background: linear-gradient(135deg, #082e04, #0f4a08);
  padding: 3rem 2rem;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(8, 46, 4, 0.45);
  }
`;

const PreviewContent = styled(Box)`
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
`;

const PreviewQuote = styled(Typography)`
  && {
    font-size: 1.125rem;
    margin-bottom: 1rem;
    color: #F7B6CF;
    font-weight: 400;
  }
`;

const PreviewName = styled(Typography)`
  && {
    font-size: 1.875rem;
    font-weight: 700;
    color: #D71768;
    margin-bottom: 0.25rem;
    text-shadow: 2px 2px 8px rgba(0,0,0,0.35);
  }
`;

const PreviewJobTitle = styled(Typography)`
  && {
    font-size: 1.25rem;
    color: #F7B6CF;
    font-style: italic;
    font-weight: 500;
  }
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

const UploadButton = styled(Button)`
  && {
    background: #D71768;
    color: white;
    text-transform: none;
    border-radius: 8px;
    padding: 0.75rem 1.5rem;
    font-weight: 500;
    margin-top: 1rem;
    
    &:hover {
      background: #b91557;
    }
  }
`;

const HiddenFileInput = styled('input')`
  display: none;
`;

const HomeContentEditor = ({ content, onUpdate }) => {
  const [formData, setFormData] = useState({
    quote: '',
    name: '',
    title: '',
    background_image: ''
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Update form when content changes
  useEffect(() => {
    if (content) {
      setFormData({
        quote: content.quote || '',
        name: content.name || '',
        title: content.title || '',
        background_image: content.background_image || ''
      });
      
      // Set image preview if background_image exists
      if (content.background_image) {
        // Check if it's a new Supabase storage file or old local file
        if (content.background_image.includes('-') && content.background_image.includes('.')) {
          // New Supabase storage file
          const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
          setImagePreview(`${supabaseUrl}/storage/v1/object/public/home-backgrounds/${content.background_image}`);
        } else {
          // Old local file
          setImagePreview(`/assets/Homebackground/${content.background_image}`);
        }
      }
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
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setNotification({
        open: true,
        message: 'Please select a valid image file',
        severity: 'error'
      });
      return;
    }
    
    // Validate file size (5MB limit)
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
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      
      // Initialize Supabase client
      const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
      const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Supabase configuration missing');
      }
      
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('home-backgrounds')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (uploadError) {
        throw uploadError;
      }
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('home-backgrounds')
        .getPublicUrl(fileName);
      
      // Update form data with new image filename
      setFormData({
        ...formData,
        background_image: fileName
      });
      
      setNotification({
        open: true,
        message: 'Image uploaded successfully!',
        severity: 'success'
      });
      
    } catch (error) {
      console.error('Upload error:', error);
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
      background_image: ''
    });
    
    // Clear file input
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

  // Handle keyboard shortcut (Ctrl+S)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        handleSave();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [formData, handleSave]);

  return (
    <>
      <EditorSection>
        <SectionHeader>
          <SectionTitle>
            <Home />
            Home Content
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
            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                label="Hero Quote"
                placeholder="Enter the hero section quote..."
                multiline
                rows={3}
                value={formData.quote}
                onChange={handleInputChange('quote')}
                InputProps={{
                  startAdornment: <FormatQuote sx={{ mr: 1, color: '#64748b' }} />
                }}
                helperText="This appears as the main quote on your home page"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                label="Full Name"
                placeholder="Enter your full name..."
                value={formData.name}
                onChange={handleInputChange('name')}
                InputProps={{
                  startAdornment: <Person sx={{ mr: 1, color: '#64748b' }} />
                }}
                helperText="Your professional name displayed prominently"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                label="Professional Title"
                placeholder="Enter your professional title..."
                value={formData.title}
                onChange={handleInputChange('title')}
                InputProps={{
                  startAdornment: <Work sx={{ mr: 1, color: '#64748b' }} />
                }}
                helperText="Your job title or professional description"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Image sx={{ color: '#64748b' }} />
                Background Image
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
                    <img
                      src={imagePreview}
                      alt="Background preview"
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
                      {uploading ? 'Uploading...' : 'Click or drag to upload background image'}
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
              
              <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                Current image: {formData.background_image || 'No image selected'}
              </Typography>
            </Grid>
          </Grid>
        </FormContainer>

        <PreviewSection>
          <PreviewTitle>
            👁️ Live Preview
          </PreviewTitle>
          <PreviewContainer>
            <PreviewBackground
              sx={{
                backgroundImage: imagePreview 
                  ? `url(${imagePreview})` 
                  : formData.background_image 
                    ? formData.background_image.includes('-') && formData.background_image.includes('.')
                      ? `url(${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/home-backgrounds/${formData.background_image})`
                      : `url(/assets/Homebackground/${formData.background_image})`
                    : 'linear-gradient(135deg, #082e04, #0f4a08)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <PreviewContent>
                <PreviewQuote>
                  "{formData.quote || 'YOUR QUOTE HERE'}"
                </PreviewQuote>
                <PreviewName>
                  {formData.name || 'Your Name'}
                </PreviewName>
                <PreviewJobTitle>
                  {formData.title || 'Your Title'}
                </PreviewJobTitle>
              </PreviewContent>
            </PreviewBackground>
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

export default HomeContentEditor; 