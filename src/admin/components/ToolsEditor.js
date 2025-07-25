import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  CardActions,
  Fab,
  Tooltip,
  Paper,
  Pagination
} from '@mui/material';
import { Add, Edit, Delete, Build } from '@mui/icons-material';
import styled from 'styled-components';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const getIconUrl = (icon_filename) => {
  if (!icon_filename) return 'https://via.placeholder.com/40x40?text=No+Icon';
  if (icon_filename.startsWith('http')) return icon_filename;
  return `${supabaseUrl}/storage/v1/object/public/tools-images/${icon_filename}`;
};
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

const ToolsGrid = styled(Box)`
    padding: 2rem 2.5rem 2.5rem 2.5rem;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 2.5rem;
`;

const ToolCard = styled(Card)`
  && {
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    padding: 1.5rem 1rem 1rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(215, 23, 104, 0.12);
    }
  }
`;

const IconBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 0 1rem 0;
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

const ToolsEditor = ({ tools, loading, onAdd, onUpdate, onDelete, onUploadIcon }) => {
  const [form, setForm] = useState({ name: '', icon_filename: '', sort_order: 1 });
  const [iconFile, setIconFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = useState(1);
  const toolsPerPage = 10;
  const pageCount = Math.ceil(tools.length / toolsPerPage);
  const paginatedTools = tools.slice((page - 1) * toolsPerPage, page * toolsPerPage);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setIconFile(e.target.files[0]);

  const handleOpenDialog = () => {
    setForm({ name: '', icon_filename: '', sort_order: tools.length + 1 });
    setIconFile(null);
    setEditingId(null);
    setError(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setForm({ name: '', icon_filename: '', sort_order: 1 });
    setIconFile(null);
    setEditingId(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    let icon_filename = form.icon_filename;
    if (iconFile) {
      const uploadResult = await onUploadIcon(iconFile);
      if (!uploadResult.success) {
        setError(uploadResult.error || 'Icon upload failed');
        setSubmitting(false);
        return;
      }
      icon_filename = uploadResult.fileName;
    }
    let result;
    if (editingId) {
      result = await onUpdate(editingId, { ...form, icon_filename });
      if (result.success) {
        setSnackbar({ open: true, message: 'Tool updated successfully', severity: 'success' });
      }
    } else {
      result = await onAdd({ ...form, icon_filename });
      if (result.success) {
        setSnackbar({ open: true, message: 'Tool added successfully', severity: 'success' });
      }
    }
    if (!result.success) {
      setError(result.error || 'Operation failed');
      setSnackbar({ open: true, message: result.error || 'Operation failed', severity: 'error' });
      setSubmitting(false);
      return;
    }
    setForm({ name: '', icon_filename: '', sort_order: 1 });
    setIconFile(null);
    setEditingId(null);
    setSubmitting(false);
    setOpenDialog(false);
  };

  const handleEdit = (tool) => {
    setForm({ name: tool.name, icon_filename: tool.icon_filename, sort_order: tool.sort_order });
    setEditingId(tool.id);
    setIconFile(null);
    setError(null);
    setOpenDialog(true);
  };

  const handleCancel = () => {
    setForm({ name: '', icon_filename: '', sort_order: 1 });
    setIconFile(null);
    setEditingId(null);
    setError(null);
    setOpenDialog(false);
  };

  const handleDelete = async (id) => {
    setSubmitting(true);
    setError(null);
    const result = await onDelete(id);
    if (!result.success) {
      setError(result.error || 'Delete failed');
      setSnackbar({ open: true, message: result.error || 'Delete failed', severity: 'error' });
    } else {
      setSnackbar({ open: true, message: 'Tool deleted successfully', severity: 'success' });
    }
    setSubmitting(false);
  };

  return (
    <>
      <EditorSection>
        <SectionHeader>
          <SectionTitle>
            <Build sx={{ mr: 1 }} />
            Tools Management
          </SectionTitle>
          <Typography variant="body2" color="textSecondary">
            {tools.length} tools
          </Typography>
        </SectionHeader>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <ToolsGrid>
              {paginatedTools.map((tool) => (
                <ToolCard key={tool.id}>
                  <IconBox>
                    <img
                      src={getIconUrl(tool.icon_filename)}
                      alt={tool.name}
                      style={{ width: 48, height: 48, borderRadius: 8, background: '#f8f9fa', objectFit: 'contain' }}
                    />
                  </IconBox>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>{tool.name}</Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Sort Order: {tool.sort_order}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      variant="text"
                      color="primary"
                      startIcon={<Edit />}
                      onClick={() => handleEdit(tool)}
                      disabled={submitting || loading}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      variant="text"
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => handleDelete(tool.id)}
                      disabled={submitting || loading}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </ToolCard>
              ))}
            </ToolsGrid>
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
          </>
        )}
      </EditorSection>
      <Tooltip title="Add New Tool">
        <AddButton color="primary" onClick={handleOpenDialog}>
          <Add />
        </AddButton>
      </Tooltip>
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
        <DialogTitle>{editingId ? 'Edit Tool' : 'Add Tool'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField label="Name" name="name" value={form.name} onChange={handleChange} required fullWidth margin="normal" disabled={submitting || loading} />
            <TextField label="Sort Order" name="sort_order" type="number" value={form.sort_order} onChange={handleChange} required fullWidth margin="normal" disabled={submitting || loading} />
            <input type="file" accept="image/*" onChange={handleFileChange} disabled={submitting || loading} style={{ marginTop: 16 }} />
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} disabled={submitting || loading}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary" disabled={submitting || loading}>
              {submitting ? <CircularProgress size={20} /> : editingId ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ToolsEditor; 