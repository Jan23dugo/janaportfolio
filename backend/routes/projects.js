const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

// Get all projects (public)
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true })
      .eq('is_active', true);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all projects (admin - including inactive)
router.get('/admin', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get project categories
router.get('/categories', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('project_categories')
      .select('*')
      .eq('is_active', true)
      .order('name', { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new project
router.post('/', async (req, res) => {
  try {
    const { title, description, image_path, category, display_order } = req.body;
    
    const { data, error } = await supabase
      .from('projects')
      .insert([
        { 
          title,
          description,
          image_path,
          category,
          display_order: display_order || 0
        }
      ])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update project
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image_path, category, display_order, is_active } = req.body;
    
    const { data, error } = await supabase
      .from('projects')
      .update({ 
        title,
        description,
        image_path,
        category,
        display_order,
        is_active,
        updated_at: new Date()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete project
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Bulk update project order
router.put('/reorder', async (req, res) => {
  try {
    const { projects } = req.body; // Array of { id, display_order }
    
    if (!Array.isArray(projects)) {
      return res.status(400).json({ error: 'Projects array is required' });
    }

    const updates = projects.map(project => ({
      id: project.id,
      display_order: project.display_order,
      updated_at: new Date()
    }));

    const { error } = await supabase
      .from('projects')
      .upsert(updates, { onConflict: 'id' });

    if (error) throw error;
    res.json({ message: 'Projects reordered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upload project image
router.post('/upload-image', async (req, res) => {
  try {
    const { fileName, fileData, contentType } = req.body;
    
    if (!fileName || !fileData) {
      return res.status(400).json({ error: 'File name and data are required' });
    }

    // Convert base64 to buffer
    const buffer = Buffer.from(fileData, 'base64');
    
    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('project-images')
      .upload(fileName, buffer, {
        contentType: contentType || 'image/jpeg',
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('project-images')
      .getPublicUrl(fileName);

    res.json({ 
      success: true, 
      fileName, 
      publicUrl 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete project image
router.delete('/image/:fileName', async (req, res) => {
  try {
    const { fileName } = req.params;
    
    const { error } = await supabase.storage
      .from('project-images')
      .remove([fileName]);

    if (error) throw error;
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;