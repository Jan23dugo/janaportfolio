const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

// Get all services (public)
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('display_order', { ascending: true })
      .eq('is_active', true);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all services (admin - including inactive)
router.get('/admin', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new service
router.post('/', async (req, res) => {
  try {
    const { icon_name, title, description, display_order } = req.body;
    
    const { data, error } = await supabase
      .from('services')
      .insert([
        { 
          icon_name,
          title,
          description,
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

// Update service
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { icon_name, title, description, display_order, is_active } = req.body;
    
    const { data, error } = await supabase
      .from('services')
      .update({ 
        icon_name,
        title,
        description,
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

// Delete service
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update display order
router.put('/order/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { new_order } = req.body;
    
    const { data, error } = await supabase
      .from('services')
      .update({ 
        display_order: new_order,
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

module.exports = router; 