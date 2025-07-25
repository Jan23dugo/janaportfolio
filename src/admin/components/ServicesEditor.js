import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Snackbar,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon
} from '@mui/icons-material';

const iconOptions = [
  { value: 'LaptopMac', label: 'Laptop' },
  { value: 'Insights', label: 'Analytics' },
  { value: 'Search', label: 'Search' },
  { value: 'Tune', label: 'Settings' },
  { value: 'EventNote', label: 'Calendar' },
  { value: 'VideoLibrary', label: 'Video' },
  { value: 'Brush', label: 'Design' },
  { value: 'EditNote', label: 'Edit' },
  { value: 'Schedule', label: 'Schedule' },
  { value: 'Forum', label: 'Community' },
  { value: 'Facebook', label: 'Facebook' },
{ value: 'Instagram', label: 'Instagram' },
{ value: 'TikTok', label: 'TikTok' },
{ value: 'YouTube', label: 'YouTube' },
{ value: 'Pinterest', label: 'Pinterest' },
{ value: 'Twitter', label: 'Twitter' },
{ value: 'LinkedIn', label: 'LinkedIn' },
{ value: 'Mail', label: 'Mail' },
{ value: 'Phone', label: 'Phone' },
{ value: 'Star', label: 'Star' },
{ value: 'Favorite', label: 'Favorite' },
{ value: 'CheckCircle', label: 'Check Circle' },
{ value: 'Done', label: 'Done' },
{ value: 'Task', label: 'Task' },
{ value: 'Person', label: 'Person' },
{ value: 'People', label: 'People' },
{ value: 'Support', label: 'Support' },
{ value: 'Settings', label: 'Settings' },
{ value: 'Cloud', label: 'Cloud' },
{ value: 'Lock', label: 'Lock' },
  { value: 'BarChart', label: 'Charts' }
];

const ServicesEditor = ({ services, supabase, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const [formData, setFormData] = useState({
    icon_name: '',
    title: '',
    description: '',
    is_active: true
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpenDialog = (service = null) => {
    if (service) {
      setEditingService(service);
      setFormData({
        icon_name: service.icon_name,
        title: service.title,
        description: service.description,
        is_active: service.is_active
      });
    } else {
      setEditingService(null);
      setFormData({
        icon_name: '',
        title: '',
        description: '',
        is_active: true
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingService(null);
    setFormData({
      icon_name: '',
      title: '',
      description: '',
      is_active: true
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (editingService) {
        const { error } = await supabase
          .from('services')
          .update({
            ...formData,
            updated_at: new Date()
          })
          .eq('id', editingService.id);

        if (error) throw error;
        setSnackbar({
          open: true,
          message: 'Service updated successfully',
          severity: 'success'
        });
      } else {
        const { error } = await supabase
          .from('services')
          .insert([{
            ...formData,
            display_order: services.length
          }]);

        if (error) throw error;
        setSnackbar({
          open: true,
          message: 'Service created successfully',
          severity: 'success'
        });
      }

      handleCloseDialog();
      // Trigger parent to refetch services
      if (onUpdate) {
        setTimeout(() => {
          onUpdate();
        }, 300); // 300ms delay
      }
    } catch (err) {
      console.error('Error saving service:', err);
      setSnackbar({
        open: true,
        message: 'Error saving service',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (service) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;

    try {
      setLoading(true);
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', service.id);

      if (error) throw error;

      setSnackbar({
        open: true,
        message: 'Service deleted successfully',
        severity: 'success'
      });
      
      // Trigger parent to refetch services
      if (onUpdate) {
        await onUpdate();
      }
    } catch (err) {
      console.error('Error deleting service:', err);
      setSnackbar({
        open: true,
        message: 'Error deleting service',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMoveService = async (service, direction) => {
    const currentIndex = services.findIndex(s => s.id === service.id);
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    if (newIndex < 0 || newIndex >= services.length) return;

    const serviceToSwap = services[newIndex];

    try {
      setLoading(true);

      // Use a 3-step swap to avoid unique constraint conflicts
      // Step 1: Move first service to a temporary value
      const tempOrder = Math.max(...services.map(s => s.display_order)) + 1;
      const step1 = await supabase
        .from('services')
        .update({ display_order: tempOrder })
        .eq('id', service.id);

      if (step1.error) throw step1.error;

      // Step 2: Move second service to first service's original position
      const step2 = await supabase
        .from('services')
        .update({ display_order: service.display_order })
        .eq('id', serviceToSwap.id);

      if (step2.error) throw step2.error;

      // Step 3: Move first service to second service's original position
      const step3 = await supabase
        .from('services')
        .update({ display_order: serviceToSwap.display_order })
        .eq('id', service.id);

      if (step3.error) throw step3.error;

      // Refetch with a delay
      if (onUpdate) {
        setTimeout(async () => {
          await onUpdate();
        }, 300);
      }
    } catch (err) {
      console.error('Error reordering services:', err);
      setSnackbar({
        open: true,
        message: 'Error reordering services',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  if (!Array.isArray(services)) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box p={isMobile ? 1 : 3}>
      <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} justifyContent={isMobile ? 'flex-start' : 'space-between'} alignItems={isMobile ? 'stretch' : 'center'} mb={3} gap={isMobile ? 2 : 0}>
        <Typography variant={isMobile ? 'h6' : 'h5'} component="h2">
          Manage Services
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          disabled={loading}
          size={isMobile ? 'medium' : 'large'}
          sx={isMobile ? { width: '100%' } : {}}
        >
          Add Service
        </Button>
      </Box>

      {/* Responsive: Table on desktop, Cards on mobile */}
      {!isMobile ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order</TableCell>
                <TableCell>Icon</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services.map((service, index) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <IconButton
                        size="small"
                        onClick={() => handleMoveService(service, 'up')}
                        disabled={index === 0 || loading}
                      >
                        <ArrowUpIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleMoveService(service, 'down')}
                        disabled={index === services.length - 1 || loading}
                      >
                        <ArrowDownIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell>{service.icon_name}</TableCell>
                  <TableCell>{service.title}</TableCell>
                  <TableCell>{service.description}</TableCell>
                  <TableCell>{service.is_active ? 'Active' : 'Inactive'}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(service)}
                      color="primary"
                      disabled={loading}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(service)}
                      color="error"
                      disabled={loading}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box display="flex" flexDirection="column" gap={2}>
          {services.map((service, index) => (
            <Paper key={service.id} sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1" fontWeight={600}>{service.title}</Typography>
                <Box>
                  <IconButton
                    size="small"
                    onClick={() => handleMoveService(service, 'up')}
                    disabled={index === 0 || loading}
                  >
                    <ArrowUpIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleMoveService(service, 'down')}
                    disabled={index === services.length - 1 || loading}
                  >
                    <ArrowDownIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(service)}
                    color="primary"
                    disabled={loading}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(service)}
                    color="error"
                    disabled={loading}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{service.description}</Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="caption" color="text.secondary">Icon:</Typography>
                <Typography variant="caption">{service.icon_name}</Typography>
                <Typography variant="caption" color={service.is_active ? 'success.main' : 'error.main'} sx={{ ml: 2 }}>
                  {service.is_active ? 'Active' : 'Inactive'}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth fullScreen={isMobile}>
        <DialogTitle>
          {editingService ? 'Edit Service' : 'Add New Service'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              select
              fullWidth
              label="Icon"
              value={formData.icon_name}
              onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
              margin="normal"
              required
              disabled={loading}
            >
              {iconOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              margin="normal"
              required
              disabled={loading}
            />
            <TextField
              fullWidth
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              margin="normal"
              multiline
              rows={4}
              required
              disabled={loading}
            />
            <TextField
              select
              fullWidth
              label="Status"
              value={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.value })}
              margin="normal"
              disabled={loading}
            >
              <MenuItem value={true}>Active</MenuItem>
              <MenuItem value={false}>Inactive</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} disabled={loading} fullWidth={isMobile}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth={isMobile}>
              {loading ? <CircularProgress size={20} /> : (editingService ? 'Update' : 'Create')}
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
    </Box>
  );
};

export default ServicesEditor; 